import type { Attraction, Food, PhotoSpot } from '@/types';

interface PlaceResult {
  id: string;
  name: string;
  nameOriginal?: string;
  address: string;
  categories: string[];
  website?: string;
  openingHours?: string;
}

interface DestinationDetailResult {
  wikiDescription: string | null;
  apiAttractions: PlaceResult[];
  apiRestaurants: PlaceResult[];
  apiViewpoints: PlaceResult[];
  apiClimate: { month: number; temp: number; precip: number }[] | null;
}

export async function fetchDestinationDetail(id: string): Promise<DestinationDetailResult | null> {
  try {
    const res = await fetch(`/api/destinations/${id}`, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export async function fetchPlaces(lat: number, lon: number, category: string, limit = 10): Promise<PlaceResult[]> {
  try {
    const res = await fetch(`/api/places?lat=${lat}&lon=${lon}&category=${category}&limit=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.places || [];
  } catch {
    return [];
  }
}

export async function fetchWeather(lat: number, lon: number) {
  try {
    const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.months || null;
  } catch {
    return null;
  }
}

export async function searchDestinations(query: string) {
  try {
    const res = await fetch(`/api/destinations?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.results || [];
  } catch {
    return [];
  }
}

export function apiPlacesToAttractions(places: PlaceResult[], destinationId: string): Attraction[] {
  return places.map((p, i) => ({
    id: p.id || `api-attr-${i}`,
    name: p.name,
    destinationId,
    rating: 4,
    duration: '1-2小时',
    bestTime: '全天',
    suitableFor: ['所有人'],
    needReservation: false,
    photoFriendly: true,
    tips: p.address || '',
  }));
}

export function apiPlacesToFoods(places: PlaceResult[], destinationId: string): Food[] {
  return places.map((p, i) => ({
    id: p.id || `api-food-${i}`,
    name: p.name,
    destinationId,
    cuisine: '当地特色',
    priceRange: '¥50-200',
    bestFor: '午餐',
    reason: p.address || '',
    nearbyAttractions: [],
  }));
}

export function apiPlacesToPhotoSpots(places: PlaceResult[], destinationId: string): PhotoSpot[] {
  return places.map((p, i) => ({
    id: p.id || `api-photo-${i}`,
    name: p.name,
    destinationId,
    target: p.nameOriginal || p.name,
    bestTime: '日落时分',
    style: '风景',
    crowdLevel: '适中',
    nearbyAttractions: [],
    tips: p.address || '',
  }));
}
