import { NextRequest, NextResponse } from 'next/server';
import { getCached, setCache } from '@/lib/api-cache';

const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY;

interface GeocodeResult {
  name?: string;
  country?: string;
  lat?: number;
  lon?: number;
  formatted?: string;
  place_id?: string;
  result_type?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'q parameter required' }, { status: 400 });
  }

  if (!GEOAPIFY_KEY) {
    return NextResponse.json({ error: 'no_api_key', results: [] }, { status: 200 });
  }

  const cacheKey = `geocode:${q}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json({ results: cached, source: 'cache' });
  }

  try {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(q)}&type=city&format=json&limit=5&lang=zh&apiKey=${GEOAPIFY_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });

    if (!res.ok) {
      return NextResponse.json({ error: 'api_error', results: [] }, { status: 200 });
    }

    const data = await res.json();
    const results = (data.results || []).map((r: GeocodeResult) => ({
      name: r.name || r.formatted || q,
      country: r.country || '',
      lat: r.lat,
      lon: r.lon,
      formatted: r.formatted,
      placeId: r.place_id,
    }));

    setCache(cacheKey, results);
    return NextResponse.json({ results, source: 'geoapify' });
  } catch {
    return NextResponse.json({ error: 'fetch_failed', results: [] }, { status: 200 });
  }
}
