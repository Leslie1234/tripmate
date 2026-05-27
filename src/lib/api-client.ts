import type { Attraction, Food, PhotoSpot } from '@/types';

interface PlaceResult {
  id: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  types?: string[];
  source: string;
  cost?: string;
  photo?: string;
}

export async function searchDestinations(query: string): Promise<{ name: string; country: string; lat: number; lon: number }[]> {
  try {
    const res = await fetch(`/api/destinations?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map((r: { name: string; country: string; lat: number; lon: number }) => ({
      name: r.name,
      country: r.country,
      lat: r.lat,
      lon: r.lon,
    }));
  } catch {
    return [];
  }
}

export async function fetchPlaces(lat: number, lon: number, category: string, limit = 15, destination = ''): Promise<PlaceResult[]> {
  try {
    const res = await fetch(`/api/places?lat=${lat}&lng=${lon}&type=${category}&limit=${limit}&destination=${encodeURIComponent(destination)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.places || [];
  } catch {
    return [];
  }
}

export async function fetchWeather(lat: number, lon: number) {
  try {
    const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.months || data;
  } catch {
    return null;
  }
}

export function apiPlacesToAttractions(places: PlaceResult[], destinationId: string): Attraction[] {
  return places.map((p, i) => ({
    id: p.id || `api-attr-${i}`,
    name: p.name,
    destinationId,
    rating: p.rating || 4,
    duration: '1-2小时',
    bestTime: '全天',
    suitableFor: ['所有人'],
    needReservation: false,
    photoFriendly: true,
    tips: p.address || `来源: ${p.source}`,
  }));
}

export function apiPlacesToFoods(places: PlaceResult[], destinationId: string): Food[] {
  return places.map((p, i) => ({
    id: p.id || `api-food-${i}`,
    name: p.name,
    destinationId,
    cuisine: '当地特色',
    priceRange: p.cost ? `¥${p.cost}` : '¥50-200',
    bestFor: '午餐',
    reason: p.address || `来源: ${p.source}`,
    nearbyAttractions: [],
  }));
}

export function apiPlacesToPhotoSpots(places: PlaceResult[], destinationId: string): PhotoSpot[] {
  return places.map((p, i) => ({
    id: p.id || `api-photo-${i}`,
    name: p.name,
    destinationId,
    target: p.name,
    bestTime: '日落时分',
    style: '风景',
    crowdLevel: '适中',
    nearbyAttractions: [],
    tips: p.address || `来源: ${p.source}`,
  }));
}
