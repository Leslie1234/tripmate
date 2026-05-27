import { NextRequest, NextResponse } from 'next/server';
import { destinations } from '@/data';
import { getCached, setCache } from '@/lib/api-cache';

const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY;

interface WikiPage {
  pageid: number;
  extract?: string;
}

async function fetchWikipediaIntro(cityName: string): Promise<string | null> {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(cityName)}&prop=extracts&exintro=true&format=json&explaintext=true`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = await res.json();
    const pages: Record<string, WikiPage> = data.query?.pages || {};
    const page = Object.values(pages)[0];
    if (page && page.extract) {
      return page.extract.slice(0, 500);
    }
    return null;
  } catch {
    return null;
  }
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

async function fetchPOI(lat: number, lon: number, categories: string, limit: number) {
  if (!GEOAPIFY_KEY) return [];
  try {
    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},5000&limit=${limit}&lang=zh&apiKey=${GEOAPIFY_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.features || [])
      .filter((f: GeoapifyFeature) => f.properties.name)
      .map((f: GeoapifyFeature, i: number) => ({
        id: f.properties.place_id || `poi-${i}`,
        name: f.properties.name,
        address: f.properties.formatted || '',
        categories: f.properties.categories || [],
        website: f.properties.website,
        openingHours: f.properties.opening_hours,
      }));
  } catch {
    return [];
  }
}

async function fetchClimate(lat: number, lon: number) {
  try {
    const url = `https://climate-api.open-meteo.com/v1/climate?latitude=${lat}&longitude=${lon}&start_date=2020-01-01&end_date=2024-12-31&models=EC_Earth3P_HR&daily=temperature_2m_mean,precipitation_sum`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const data = await res.json();
    const daily = data.daily;
    if (!daily?.time) return null;

    const result: { month: number; temp: number; precip: number }[] = [];
    for (let m = 1; m <= 12; m++) {
      const temps: number[] = [];
      let precipTotal = 0;
      let precipCount = 0;
      daily.time.forEach((t: string, i: number) => {
        if (new Date(t).getMonth() + 1 === m) {
          if (daily.temperature_2m_mean[i] != null) temps.push(daily.temperature_2m_mean[i]);
          if (daily.precipitation_sum[i] != null) {
            precipTotal += daily.precipitation_sum[i];
            precipCount++;
          }
        }
      });
      const years = precipCount > 0 ? Math.ceil(precipCount / 30) : 1;
      result.push({
        month: m,
        temp: temps.length ? Math.round(temps.reduce((a, b) => a + b, 0) / temps.length * 10) / 10 : 0,
        precip: Math.round(precipTotal / years),
      });
    }
    return result;
  } catch {
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dest = destinations.find(d => d.id === id);

  if (!dest) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const cacheKey = `dest-detail:${id}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json({ data: cached, source: 'cache' });
  }

  const [wikiIntro, attractions, restaurants, viewpoints, climate] = await Promise.all([
    fetchWikipediaIntro(dest.nameEn.split(',')[0]),
    fetchPOI(dest.lat, dest.lon, 'tourism.sights,tourism.attraction,entertainment.museum', 10),
    fetchPOI(dest.lat, dest.lon, 'catering.restaurant,catering.cafe', 10),
    fetchPOI(dest.lat, dest.lon, 'tourism.attraction.viewpoint,natural.peak', 8),
    fetchClimate(dest.lat, dest.lon),
  ]);

  const result = {
    ...dest,
    wikiDescription: wikiIntro,
    apiAttractions: attractions,
    apiRestaurants: restaurants,
    apiViewpoints: viewpoints,
    apiClimate: climate,
  };

  setCache(cacheKey, result);
  return NextResponse.json({ data: result, source: 'api' });
}
