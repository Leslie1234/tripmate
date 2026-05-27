export interface Destination {
  id: string;
  name: string;
  nameEn: string;
  country: string;
  description: string;
  gradient: string;
  emoji: string;
  score: number;
  bestSeasons: string[];
  budgetRange: string;
  tags: string[];
  suitableFor: string[];
  highlights: string[];
  transportTips: string[];
  accommodationTips: string[];
  pitfalls: string[];
  lat: number;
  lon: number;
}

export type SeasonTag = '旺季' | '淡季' | '雨季' | '花期' | '枫叶季' | '烟花季' | '雪季' | '平季' | '台风季';

export interface SeasonMonth {
  month: number;
  destinationId: string;
  score: number;
  weather: string;
  highlights: string[];
  risks: string[];
  tags: SeasonTag[];
}

export interface Attraction {
  id: string;
  name: string;
  destinationId: string;
  rating: number;
  duration: string;
  bestTime: string;
  suitableFor: string[];
  needReservation: boolean;
  photoFriendly: boolean;
  tips: string;
}

export interface Food {
  id: string;
  name: string;
  destinationId: string;
  cuisine: string;
  priceRange: string;
  bestFor: string;
  reason: string;
  nearbyAttractions: string[];
}

export interface PhotoSpot {
  id: string;
  name: string;
  destinationId: string;
  target: string;
  bestTime: string;
  style: string;
  crowdLevel: string;
  nearbyAttractions: string[];
  tips: string;
}

export interface ChecklistItem {
  id: string;
  category: string;
  name: string;
  required: boolean;
}

export interface ScheduleItem {
  time: string;
  name: string;
  type: 'attraction' | 'food' | 'photo' | 'hotel' | 'transport' | 'shopping';
  duration: string;
  reason: string;
  needReservation?: boolean;
  nearbyRecommendation?: string;
}

export interface DayPlan {
  day: number;
  theme: string;
  intensity: string;
  estimatedCost: string;
  routeSummary: string;
  city: string;
  isTransitDay?: boolean;
  items: ScheduleItem[];
}

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  destinationId: string;
  tags: string[];
  summary: string;
  seasonTip: string;
  totalBudget: BudgetItem[];
  days: DayPlan[];
  attractions: Attraction[];
  foods: Food[];
  photoSpots: PhotoSpot[];
  createdAt: string;
}

export interface BudgetItem {
  category: string;
  amount: number;
  notes: string;
}

export interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  days: number;
  travelers: string;
  budget: string;
  interests: string[];
  pace: string;
  hotelPreference: string;
  foodPreferences: string[];
}

export interface ResolvedDestination {
  name: string;
  country: string;
  lat: number;
  lon: number;
  days: number;
  id: string;
}

export interface TripReview {
  id: string;
  itineraryId: string;
  destinationName: string;
  expenses: ExpenseRecord;
  recommendations: ReviewPlace[];
  avoidPlaces: ReviewPlace[];
  discoveries: ReviewPlace[];
  summary: string;
  createdAt: string;
}

export interface ExpenseRecord {
  flights: number;
  hotel: number;
  food: number;
  transport: number;
  tickets: number;
  shopping: number;
  other: number;
}

export interface ReviewPlace {
  name: string;
  type: string;
  reason: string;
  rating?: number;
  avoid?: boolean;
}
