'use client';

import type { Itinerary } from '@/types';
import EmptyState from '@/components/shared/EmptyState';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ItineraryHeader from '@/components/itinerary/ItineraryHeader';
import DestinationOverview from '@/components/itinerary/DestinationOverview';
import DayTabs from '@/components/itinerary/DayTabs';
import BudgetBreakdown from '@/components/itinerary/BudgetBreakdown';
import AttractionCard from '@/components/itinerary/AttractionCard';
import FoodCard from '@/components/itinerary/FoodCard';
import PhotoSpotCard from '@/components/itinerary/PhotoSpotCard';

interface ItineraryPreviewProps {
  itinerary: Itinerary | null;
  loading: boolean;
  onSave: () => void;
  saved: boolean;
}

export default function ItineraryPreview({ itinerary, loading, onSave, saved }: ItineraryPreviewProps) {
  if (loading) {
    return <LoadingSpinner text="正在为您规划行程，请稍候..." />;
  }

  if (!itinerary) {
    return (
      <EmptyState
        icon="✨"
        title="填写左侧表单，生成你的专属攻略"
        description="根据你的目的地、出行时间、预算和兴趣偏好，为你量身定制旅行攻略"
      />
    );
  }

  return (
    <div className="animate-slide-up">
      <ItineraryHeader itinerary={itinerary} />
      <DestinationOverview itinerary={itinerary} />
      <DayTabs days={itinerary.days} />

      {itinerary.attractions.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">🏛️ 景点推荐</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {itinerary.attractions.slice(0, 4).map((a) => (
              <AttractionCard key={a.id} item={a} />
            ))}
          </div>
        </div>
      )}

      {itinerary.foods.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">🍜 美食推荐</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {itinerary.foods.slice(0, 4).map((f) => (
              <FoodCard key={f.id} item={f} />
            ))}
          </div>
        </div>
      )}

      {itinerary.photoSpots.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">📸 拍照机位推荐</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {itinerary.photoSpots.slice(0, 4).map((p) => (
              <PhotoSpotCard key={p.id} item={p} />
            ))}
          </div>
        </div>
      )}

      <BudgetBreakdown items={itinerary.totalBudget} />

      <button
        onClick={onSave}
        disabled={saved}
        className={`w-full py-3 rounded-xl font-medium transition-all ${
          saved
            ? 'bg-green-50 text-green-600 border border-green-200 cursor-default'
            : 'btn-primary'
        }`}
      >
        {saved ? '✅ 攻略已保存' : '💾 保存这份攻略'}
      </button>
    </div>
  );
}
