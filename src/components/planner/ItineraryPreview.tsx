'use client';

import { useState } from 'react';
import type { Itinerary } from '@/types';
import { cn, formatCurrency } from '@/lib/utils';
import {
  MapPin, Utensils, Camera, Hotel, Train, ShoppingBag,
  CloudSun, AlertTriangle, CheckCircle2, Save,
} from 'lucide-react';
import EmptyState from '@/components/shared/EmptyState';
import LoadingSteps from '@/components/planner/LoadingSteps';
import AttractionCard from '@/components/itinerary/AttractionCard';
import FoodCard from '@/components/itinerary/FoodCard';
import PhotoSpotCard from '@/components/itinerary/PhotoSpotCard';
import BudgetBreakdown from '@/components/itinerary/BudgetBreakdown';

interface ItineraryPreviewProps {
  itinerary: Itinerary | null;
  loading: boolean;
  onSave: () => void;
  saved: boolean;
}

const typeIcons: Record<string, React.ReactNode> = {
  attraction: <MapPin className="w-4 h-4 text-blue-500" />,
  food: <Utensils className="w-4 h-4 text-orange-500" />,
  photo: <Camera className="w-4 h-4 text-purple-500" />,
  hotel: <Hotel className="w-4 h-4 text-teal-500" />,
  transport: <Train className="w-4 h-4 text-amber-600" />,
  shopping: <ShoppingBag className="w-4 h-4 text-pink-500" />,
};

const typeBadgeColors: Record<string, string> = {
  attraction: 'bg-blue-50 text-blue-700',
  food: 'bg-orange-50 text-orange-700',
  photo: 'bg-purple-50 text-purple-700',
  hotel: 'bg-teal-50 text-teal-700',
  transport: 'bg-amber-50 text-amber-700',
  shopping: 'bg-pink-50 text-pink-700',
};

const typeLabels: Record<string, string> = {
  attraction: '景点',
  food: '美食',
  photo: '拍照',
  hotel: '住宿',
  transport: '交通',
  shopping: '购物',
};

export default function ItineraryPreview({ itinerary, loading, onSave, saved }: ItineraryPreviewProps) {
  const [activeDay, setActiveDay] = useState(0);

  if (loading) {
    return <LoadingSteps />;
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

  const totalBudget = itinerary.totalBudget.reduce((sum, b) => sum + b.amount, 0);
  const currentDay = itinerary.days[activeDay];
  const reservationCount = currentDay
    ? currentDay.items.filter((item) => item.needReservation).length
    : 0;

  return (
    <div className="animate-slide-up space-y-6">
      {/* Summary Card */}
      <div className="glass-strong rounded-2xl p-6">
        <h2 className="heading-card text-gray-900 mb-3">{itinerary.title}</h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {itinerary.tags.map((tag) => (
            <span key={tag} className="tag bg-primary-50 text-primary-700 text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-primary-50/70 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">推荐指数</p>
            <p className="font-bold text-primary-700 text-lg">4.8</p>
          </div>
          <div className="bg-blue-50/70 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">旅行强度</p>
            <p className="font-bold text-blue-700 text-lg">
              {itinerary.days[0]?.intensity || '适中'}
            </p>
          </div>
          <div className="bg-accent-50/70 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">预计预算</p>
            <p className="font-bold text-accent-500 text-lg">{formatCurrency(totalBudget)}</p>
          </div>
          <div className="bg-purple-50/70 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">行程天数</p>
            <p className="font-bold text-purple-700 text-lg">{itinerary.days.length}天</p>
          </div>
        </div>

        {/* Summary text */}
        <p className="body-text mb-4">{itinerary.summary}</p>

        {/* Season Tip */}
        {itinerary.seasonTip && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
            <CloudSun className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">{itinerary.seasonTip}</p>
          </div>
        )}
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {itinerary.days.map((day, idx) => (
          <button
            key={day.day}
            type="button"
            onClick={() => setActiveDay(idx)}
            className={cn(
              'shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border',
              activeDay === idx
                ? day.isTransitDay
                  ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-sm'
                  : 'bg-primary-600 text-white border-primary-600 shadow-md'
                : day.isTransitDay
                  ? 'bg-amber-50/50 text-amber-600 border-amber-200 hover:bg-amber-50'
                  : 'bg-white text-gray-600 border-border hover:border-primary-200 hover:bg-primary-50/50'
            )}
          >
            Day {day.day}
          </button>
        ))}
      </div>

      {/* Active Day Content */}
      {currentDay && (
        <div className="space-y-4">
          {/* City Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">
              {currentDay.isTransitDay ? '🚄' : '📍'} {currentDay.city}
            </span>
            <span className="text-xs text-muted-foreground">- {currentDay.theme}</span>
          </div>

          {/* Route Summary */}
          <div className="bg-primary-50/50 rounded-xl px-4 py-3 text-sm text-primary-800">
            <span className="font-medium">路线：</span>{currentDay.routeSummary}
          </div>

          {/* Daily Stats */}
          <div className="flex gap-3">
            <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 text-center">
              <p className="text-xs text-muted-foreground">今日预算</p>
              <p className="text-sm font-semibold text-gray-800">{currentDay.estimatedCost}</p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 text-center">
              <p className="text-xs text-muted-foreground">强度</p>
              <p className="text-sm font-semibold text-gray-800">{currentDay.intensity}</p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 text-center">
              <p className="text-xs text-muted-foreground">需预约项数</p>
              <p className="text-sm font-semibold text-gray-800">{reservationCount}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-6">
            {/* Connecting line */}
            <div className="absolute left-[9px] top-2 bottom-2 border-l-2 border-dashed border-primary-200" />

            <div className="space-y-4">
              {currentDay.items.map((item, idx) => (
                <div key={`${item.time}-${item.name}-${idx}`} className="relative flex gap-4">
                  {/* Dot */}
                  <div className="absolute -left-6 top-3 w-[18px] h-[18px] rounded-full bg-white border-2 border-primary-300 flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 card p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-primary-700">{item.time}</span>
                        <span className={cn('tag text-xs', typeBadgeColors[item.type] || 'bg-gray-100 text-gray-600')}>
                          {typeIcons[item.type]}
                          <span className="ml-1">{typeLabels[item.type] || item.type}</span>
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.duration}</span>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.reason}</p>

                    {item.needReservation && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-600 bg-amber-50 rounded-lg px-2.5 py-1.5 w-fit">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>建议提前预约</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {itinerary.attractions.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">🏛️ 景点推荐</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {itinerary.attractions.slice(0, 4).map((a) => (
              <AttractionCard key={a.id} item={a} />
            ))}
          </div>
        </div>
      )}

      {itinerary.foods.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">🍜 美食推荐</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {itinerary.foods.slice(0, 4).map((f) => (
              <FoodCard key={f.id} item={f} />
            ))}
          </div>
        </div>
      )}

      {itinerary.photoSpots.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">📸 拍照机位</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {itinerary.photoSpots.slice(0, 4).map((p) => (
              <PhotoSpotCard key={p.id} item={p} />
            ))}
          </div>
        </div>
      )}

      {/* Budget Breakdown */}
      <BudgetBreakdown items={itinerary.totalBudget} />

      {/* Save Button */}
      <button
        type="button"
        onClick={onSave}
        disabled={saved}
        className={cn(
          'w-full py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2',
          saved
            ? 'bg-green-50 text-green-600 border border-green-200 cursor-default'
            : 'btn-primary'
        )}
      >
        {saved ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            攻略已保存
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            保存这份攻略
          </>
        )}
      </button>
    </div>
  );
}
