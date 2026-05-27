import { NextRequest, NextResponse } from 'next/server';
import { getCached, setCache } from '@/lib/api-cache';

const AMAP_KEY = process.env.AMAP_API_KEY;
const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY;

interface AmapGeocode {
  formatted_address: string;
  country: string;
  province: string;
  city: string | string[];
  location: string;
  adcode: string;
}

interface GeocodeResult {
  name?: string;
  country?: string;
  lat?: number;
  lon?: number;
  formatted?: string;
  place_id?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'q parameter required' }, { status: 400 });
  }

  const cacheKey = `geocode:${q}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json({ results: cached, source: 'cache' });
  }

  const isChinese = /[一-鿿]/.test(q) && !/巴黎|东京|曼谷|罗马|伦敦|纽约|悉尼|首尔|新加坡|吉隆坡|巴塞罗那|阿姆斯特丹|维也纳|布拉格|伊斯坦布尔|雅典|苏黎世/.test(q);

  // Chinese destinations: try Amap first
  if (isChinese && AMAP_KEY) {
    try {
      const url = `https://restapi.amap.com/v3/geocode/geo?key=${AMAP_KEY}&address=${encodeURIComponent(q)}&output=json`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const data = await res.json();
        if (data.status === '1' && data.geocodes && data.geocodes.length > 0) {
          const results = data.geocodes.map((g: AmapGeocode) => {
            const [lng, lat] = g.location.split(',').map(Number);
            const cityName = Array.isArray(g.city) ? g.province : (g.city || g.province);
            return {
              name: cityName || g.formatted_address,
              country: g.country || '中国',
              lat,
              lon: lng,
              formatted: g.formatted_address,
              source: 'amap',
            };
          });
          setCache(cacheKey, results);
          return NextResponse.json({ results, source: 'amap' });
        }
      }
    } catch { /* fall through to Geoapify */ }
  }

  // Fallback: Geoapify
  if (GEOAPIFY_KEY) {
    try {
      const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(q)}&type=city&format=json&limit=5&lang=zh&apiKey=${GEOAPIFY_KEY}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const data = await res.json();
        const results = (data.results || []).map((r: GeocodeResult) => ({
          name: r.name || r.formatted || q,
          country: r.country || '',
          lat: r.lat,
          lon: r.lon,
          formatted: r.formatted,
          source: 'geoapify',
        }));
        setCache(cacheKey, results);
        return NextResponse.json({ results, source: 'geoapify' });
      }
    } catch { /* fall through */ }
  }

  return NextResponse.json({ error: 'no_results', results: [] }, { status: 200 });
}
