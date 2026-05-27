import { NextRequest, NextResponse } from 'next/server';
import { getCached, setCache } from '@/lib/api-cache';

const AMAP_KEY = process.env.AMAP_API_KEY;
const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY;

const AMAP_TYPE_MAP: Record<string, string> = {
  attractions: '110000|110100|110200|110201|110202|110203|110204|110205|110206|110207|110208|110209|110210',
  food: '050000|050100|050200|050300|050400|050500|050600|050700|050800|050900',
  photo: '110000|110100|110200|110300|110301|110302|110303',
};

const GEOAPIFY_CATEGORY_MAP: Record<string, string> = {
  attractions: 'tourism.sights,tourism.attraction,entertainment.museum,entertainment.culture',
  food: 'catering.restaurant,catering.cafe,catering.fast_food',
  photo: 'tourism.attraction.viewpoint,natural,tourism.sights.tower',
};

interface AmapPoi {
  name: string;
  address: string;
  location: string;
  type: string;
  typecode: string;
  id: string;
  tel?: string;
  rating?: string;
  cityname?: string;
  adname?: string;
  photos?: Array<{ url: string }>;
  biz_ext?: { rating?: string; cost?: string };
}

interface GeoapifyFeature {
  properties: {
    name?: string;
    categories?: string[];
    formatted?: string;
    place_id?: string;
    lat?: number;
    lon?: number;
  };
}

async function fetchAmapPlaces(keyword: string, city: string, type: string, limit: number) {
  if (!AMAP_KEY) return [];
  try {
    const types = AMAP_TYPE_MAP[type] || AMAP_TYPE_MAP.attractions;
    const url = `https://restapi.amap.com/v3/place/text?key=${AMAP_KEY}&keywords=${encodeURIComponent(keyword)}&city=${encodeURIComponent(city)}&types=${types}&offset=${limit}&page=1&extensions=all`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== '1' || !data.pois) return [];

    return data.pois
      .filter((p: AmapPoi) => p.name && p.location)
      .map((p: AmapPoi) => {
        const [lng, lat] = p.location.split(',').map(Number);
        const rating = p.biz_ext?.rating ? parseFloat(p.biz_ext.rating) : (p.rating ? parseFloat(p.rating) : undefined);
        return {
          id: `amap-${p.id}`,
          name: p.name,
          address: typeof p.address === 'string' ? p.address : (p.cityname || '') + (p.adname || ''),
          latitude: lat,
          longitude: lng,
          rating: rating && rating > 0 ? rating : undefined,
          types: [p.type],
          source: 'amap',
          photo: p.photos?.[0]?.url,
          cost: p.biz_ext?.cost,
        };
      });
  } catch {
    return [];
  }
}

async function fetchWikipediaPlaces(lat: number, lng: number, limit: number) {
  try {
    const offsets = [[0, 0], [0.015, 0.015], [-0.015, 0.015], [0.015, -0.015], [-0.015, -0.015]];
    const allPlaces: Array<{ pageid: number; title: string; lat: number; lon: number; dist: number }> = [];
    const seenIds = new Set<number>();

    const fetches = offsets.map(async ([dlat, dlng]) => {
      try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${lat + dlat}|${lng + dlng}&gsradius=5000&gslimit=20&format=json`;
        const res = await fetch(url, { signal: AbortSignal.timeout(5000), headers: { 'User-Agent': 'TripMateApp/1.0 (tripmate@example.com)' } });
        if (!res.ok) return;
        const data = await res.json();
        for (const p of data.query?.geosearch || []) {
          if (!seenIds.has(p.pageid)) { seenIds.add(p.pageid); allPlaces.push(p); }
        }
      } catch { /* skip */ }
    });
    await Promise.all(fetches);
    if (allPlaces.length === 0) return [];

    const excludeKeywords = /^\d{4}[\s_]|^Timeline|^History of|^List of|episode|battle of|siege of|massacre|commune|revolution|treaty|election|metro|métro|subway/i;
    const placeKeywords = /tower|museum|cathedral|church|palace|castle|bridge|garden|park|square|plaza|monument|temple|basilica|gallery|opera|theatre|fountain|gate|arch|zoo|stadium/i;

    // Get Chinese translations
    const zhNames: Record<string, string> = {};
    const batchSize = 50;
    for (let i = 0; i < allPlaces.length; i += batchSize) {
      const batch = allPlaces.slice(i, i + batchSize);
      const titles = encodeURIComponent(batch.map(r => r.title).join('|'));
      try {
        const langRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${titles}&prop=langlinks&lllang=zh&format=json&lllimit=50`, {
          signal: AbortSignal.timeout(5000), headers: { 'User-Agent': 'TripMateApp/1.0 (tripmate@example.com)' },
        });
        if (langRes.ok) {
          const langData = await langRes.json();
          for (const page of Object.values(langData.query?.pages || {}) as Array<{ title?: string; langlinks?: Array<{ '*': string }> }>) {
            if (page.title && page.langlinks?.[0]) zhNames[page.title] = page.langlinks[0]['*'];
          }
        }
      } catch { /* skip */ }
    }

    return allPlaces
      .filter(r => !excludeKeywords.test(r.title))
      .filter(r => {
        const zh = zhNames[r.title] || '';
        if (/站[)）\s]/.test(zh) && !/火车站|总站|火車站|總站/.test(zh)) return false;
        if (/地鐵|地铁/.test(zh)) return false;
        return true;
      })
      .map(r => ({ ...r, score: (zhNames[r.title] ? 3 : 0) + (placeKeywords.test(r.title) ? 2 : 0) + (r.title.length < 40 ? 1 : 0) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(r => ({
        id: `wiki-${r.pageid}`,
        name: zhNames[r.title] || r.title,
        address: `距中心 ${(r.dist / 1000).toFixed(1)}km · 维基百科`,
        latitude: r.lat,
        longitude: r.lon,
        rating: 4.5,
        types: ['landmark'],
        source: 'wikipedia',
      }));
  } catch {
    return [];
  }
}

async function fetchGeoapifyPlaces(type: string, lat: number, lng: number, limit: number) {
  if (!GEOAPIFY_KEY) return [];
  const categories = GEOAPIFY_CATEGORY_MAP[type] || GEOAPIFY_CATEGORY_MAP.attractions;
  try {
    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lng},${lat},10000&bias=proximity:${lng},${lat}&limit=${limit}&lang=zh&apiKey=${GEOAPIFY_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.features || [])
      .filter((f: GeoapifyFeature) => f.properties.name)
      .map((f: GeoapifyFeature, i: number) => ({
        id: f.properties.place_id || `geo-${i}`,
        name: f.properties.name!,
        address: f.properties.formatted || '',
        latitude: f.properties.lat || lat,
        longitude: f.properties.lon || lng,
        types: f.properties.categories || [],
        source: 'geoapify',
      }));
  } catch {
    return [];
  }
}

function isChinaDestination(destination: string, lat: number, lng: number): boolean {
  if (lat >= 18 && lat <= 54 && lng >= 73 && lng <= 135) return true;
  const cnKeywords = /中国|北京|上海|广州|深圳|成都|重庆|杭州|南京|西安|丽江|大理|香格里拉|云南|三亚|厦门|桂林|苏州|黄山|九寨沟|拉萨|青岛|武汉|长沙|哈尔滨/;
  return cnKeywords.test(destination);
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const destination = searchParams.get('destination') || '';
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng') || searchParams.get('lon');
  const type = searchParams.get('type') || searchParams.get('category') || 'attractions';
  const limit = parseInt(searchParams.get('limit') || '15', 10);

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 });
  }

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  const cacheKey = `places:${lat}:${lng}:${type}:${limit}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json({ places: cached, source: 'cache' });
  }

  const isChina = isChinaDestination(destination, latNum, lngNum);

  let places: unknown[] = [];
  let source = 'none';

  if (isChina && AMAP_KEY) {
    // Chinese destination: use Amap
    const typeKeyword = type === 'food' ? '美食' : type === 'photo' ? '景点' : '景点';
    places = await fetchAmapPlaces(typeKeyword, destination, type, limit);
    if (places.length > 0) source = 'amap';
  }

  if (places.length === 0 && (type === 'attractions' || type === 'photo')) {
    // International or Amap empty: use Wikipedia
    places = await fetchWikipediaPlaces(latNum, lngNum, limit);
    if (places.length > 0) source = 'wikipedia';
  }

  if (places.length === 0 && GEOAPIFY_KEY) {
    // Fallback: Geoapify
    places = await fetchGeoapifyPlaces(type, latNum, lngNum, limit);
    if (places.length > 0) source = 'geoapify';
  }

  setCache(cacheKey, places);
  return NextResponse.json({ places, source });
}
