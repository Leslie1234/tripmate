'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Itinerary } from '@/types';
import { getSavedTrips } from '@/lib/storage';
import EmptyState from '@/components/shared/EmptyState';
import ItineraryHeader from '@/components/itinerary/ItineraryHeader';
import DestinationOverview from '@/components/itinerary/DestinationOverview';
import DayTabs from '@/components/itinerary/DayTabs';
import BudgetBreakdown from '@/components/itinerary/BudgetBreakdown';
import AttractionCard from '@/components/itinerary/AttractionCard';
import FoodCard from '@/components/itinerary/FoodCard';
import PhotoSpotCard from '@/components/itinerary/PhotoSpotCard';

function getInitialTrips(): Itinerary[] {
  if (typeof window === 'undefined') return [];
  return getSavedTrips();
}

export default function ItineraryPage() {
  const [trips] = useState<Itinerary[]>(getInitialTrips);
  const [selected, setSelected] = useState<Itinerary | null>(() => {
    const t = getInitialTrips();
    return t.length > 0 ? t[0] : null;
  });

  if (trips.length === 0) {
    return (
      <div className="section">
        <EmptyState
          icon="📋"
          title="暂无已保存的攻略"
          description="先去生成一份旅行攻略并保存吧"
          action={
            <Link href="/planner" className="btn-primary">
              去生成攻略
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">我的旅行攻略</h1>

      {trips.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {trips.map((trip) => (
            <button
              key={trip.id}
              onClick={() => setSelected(trip)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selected?.id === trip.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {trip.title}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="card">
          <ItineraryHeader itinerary={selected} />
          <DestinationOverview itinerary={selected} />
          <DayTabs days={selected.days} />

          {selected.attractions.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">🏛️ 景点推荐</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {selected.attractions.map((a) => (
                  <AttractionCard key={a.id} item={a} />
                ))}
              </div>
            </div>
          )}

          {selected.foods.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">🍜 美食推荐</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {selected.foods.map((f) => (
                  <FoodCard key={f.id} item={f} />
                ))}
              </div>
            </div>
          )}

          {selected.photoSpots.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">📸 拍照机位</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {selected.photoSpots.map((p) => (
                  <PhotoSpotCard key={p.id} item={p} />
                ))}
              </div>
            </div>
          )}

          <BudgetBreakdown items={selected.totalBudget} />
        </div>
      )}
    </div>
  );
}
