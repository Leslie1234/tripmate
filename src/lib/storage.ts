const KEYS = {
  CHECKLIST: 'tripmate_checklist',
  SAVED_TRIPS: 'tripmate_saved_trips',
  REVIEWS: 'tripmate_reviews',
} as const;

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded, silently fail
  }
}

function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

export function getChecklist(): Record<string, boolean> {
  return getItem(KEYS.CHECKLIST, {});
}

export function setChecklist(data: Record<string, boolean>): void {
  setItem(KEYS.CHECKLIST, data);
}

export function clearChecklist(): void {
  removeItem(KEYS.CHECKLIST);
}

import type { Itinerary, TripReview } from '@/types';

export function getSavedTrips(): Itinerary[] {
  return getItem<Itinerary[]>(KEYS.SAVED_TRIPS, []);
}

export function saveTrip(trip: Itinerary): void {
  const trips = getSavedTrips();
  const exists = trips.findIndex(t => t.id === trip.id);
  if (exists >= 0) {
    trips[exists] = trip;
  } else {
    trips.unshift(trip);
  }
  setItem(KEYS.SAVED_TRIPS, trips);
}

export function getReviews(): TripReview[] {
  return getItem<TripReview[]>(KEYS.REVIEWS, []);
}

export function saveReview(review: TripReview): void {
  const reviews = getReviews();
  reviews.unshift(review);
  setItem(KEYS.REVIEWS, reviews);
}
