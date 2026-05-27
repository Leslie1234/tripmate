import { NextRequest, NextResponse } from 'next/server';
import { getCached, setCache } from '@/lib/api-cache';

const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY;

const CATEGORY_MAP: Record<string, string> = {
  attractions: 'tourism.sights,tourism.attraction,entertainment.museum,entertainment.culture',
  food: 'catering.restaurant,catering.cafe,catering.fast_food',
  photo: 'tourism.attraction.viewpoint,natural,tourism.sights.tower',
};

interface WikiGeoResult {
  pageid: number;
  title: string;
  lat: number;
  lon: number;
  dist: number;
}

interface GeoapifyFeature {
  properties: {
    name?: string;
    categories?: string[];
    formatted?: string;
    place_id?: string;
    website?: string;
    opening_hours?: string;
    distance?: number;
  };
}

async function fetchWikipediaPlaces(lat: string, lon: string, limit: number) {
  try {
    // Step 1: Get nearby places from English Wikipedia (zh.wikipedia blocked in some regions)
    const geoUrl = `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${lat}|${lon}&gsradius=10000&gslimit=${limit}&format=json`;
    const geoRes = await fetch(geoUrl, {
      signal: AbortSignal.timeout(5000),
      headers: { 'User-Agent': 'TripMateApp/1.0 (tripmate@example.com)' },
    });
    if (!geoRes.ok) return [];
    const geoData = await geoRes.json();
    const places: WikiGeoResult[] = geoData.query?.geosearch || [];
    if (places.length === 0) return [];

    // Step 2: Batch get Chinese translations via langlinks
    const titles = encodeURIComponent(places.map(r => r.title).join('|'));
    const langUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${titles}&prop=langlinks&lllang=zh&format=json&lllimit=50`;
    const langRes = await fetch(langUrl, {
      signal: AbortSignal.timeout(5000),
      headers: { 'User-Agent': 'TripMateApp/1.0 (tripmate@example.com)' },
    });

    const zhNames: Record<string, string> = {};
    if (langRes.ok) {
      const langData = await langRes.json();
      const pages = Object.values(langData.query?.pages || {}) as Array<{ title?: string; langlinks?: Array<{ '*': string }> }>;
      for (const page of pages) {
        if (page.title && page.langlinks && page.langlinks.length > 0) {
          zhNames[page.title] = page.langlinks[0]['*'];
        }
      }
    }

    return places
      .filter((r) => {
        // Filter out non-tourist entries (sports events, years, stations)
        if (/^\d{4}\s/.test(r.title)) return false;
        if (/railway station|bus stop/i.test(r.title) && !/main|central|hauptbahnhof/i.test(r.title)) return false;
        return true;
      })
      .map((r) => ({
        id: `wiki-${r.pageid}`,
        name: zhNames[r.title] || r.title,
        address: `距中心 ${(r.dist / 1000).toFixed(1)}km`,
        categories: ['wikipedia'],
      }));
  } catch {
    return [];
  }
}

async function fetchGeoapifyPlaces(lat: string, lon: string, categories: string, limit: number) {
  if (!GEOAPIFY_KEY) return [];
  try {
    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},10000&bias=proximity:${lon},${lat}&limit=${limit}&lang=zh&apiKey=${GEOAPIFY_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.features || [])
      .filter((f: GeoapifyFeature) => f.properties.name)
      .map((f: GeoapifyFeature, i: number) => ({
        id: f.properties.place_id || `geo-${i}`,
        name: f.properties.name!,
        address: f.properties.formatted || '',
        categories: f.properties.categories || [],
        website: f.properties.website,
        openingHours: f.properties.opening_hours,
      }));
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const category = searchParams.get('category') || 'attractions';
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  if (!lat || !lon) {
    return NextResponse.json({ error: 'lat and lon required' }, { status: 400 });
  }

  const cacheKey = `places:${lat}:${lon}:${category}:${limit}`;
  const cached = getCached<unknown[]>(cacheKey);
  if (cached) {
    return NextResponse.json({ places: cached, source: 'cache' });
  }

  const categories = CATEGORY_MAP[category] || CATEGORY_MAP.attractions;

  // For attractions and photo spots: use Chinese Wikipedia geosearch as primary
  // For food: use Geoapify only (Wikipedia doesn't have restaurant data)
  let places: { id: string; name: string; address: string; categories: string[]; website?: string; openingHours?: string }[] = [];

  if (category === 'food') {
    places = await fetchGeoapifyPlaces(lat, lon, categories, limit);
  } else {
    // Fetch from both sources in parallel
    const [wikiPlaces, geoPlaces] = await Promise.all([
      fetchWikipediaPlaces(lat, lon, limit),
      fetchGeoapifyPlaces(lat, lon, categories, Math.ceil(limit / 2)),
    ]);

    // Merge: Wikipedia results first (Chinese names), then Geoapify for extras
    const seenNames = new Set<string>();
    for (const p of wikiPlaces) {
      if (!seenNames.has(p.name)) {
        places.push(p);
        seenNames.add(p.name);
      }
    }
    for (const p of geoPlaces) {
      if (!seenNames.has(p.name) && places.length < limit) {
        places.push(p);
        seenNames.add(p.name);
      }
    }
  }

  setCache(cacheKey, places);
  return NextResponse.json({ places, source: 'wikipedia+geoapify' });
}
