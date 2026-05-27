'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { DayPlan } from '@/types';
import DayPlanCard from './DayPlanCard';
import RouteSummary from './RouteSummary';

export default function DayTabs({ days }: { days: DayPlan[] }) {
  const [active, setActive] = useState(0);
  const day = days[active];

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">📅 每日行程</h3>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {days.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setActive(i)}
            className={cn(
              'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
              d.isTransitDay && active !== i ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' :
              active === i
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      {day && (
        <div className="animate-fade-in">
          {day.city && (
            <div className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3',
              day.isTransitDay ? 'bg-amber-50 text-amber-700' : 'bg-primary-50 text-primary-700'
            )}>
              {day.isTransitDay ? '🚄' : '📍'} {day.city}
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-medium text-gray-900">{day.theme}</div>
              <div className="text-xs text-muted-foreground">预计花费 {day.estimatedCost}</div>
            </div>
            <span className={cn(
              'tag text-xs',
              day.intensity === '轻松' ? 'bg-green-50 text-green-700' :
              day.intensity === '适中' ? 'bg-blue-50 text-blue-700' :
              'bg-orange-50 text-orange-700'
            )}>
              {day.intensity}强度
            </span>
          </div>

          <RouteSummary route={day.routeSummary} />

          <div className="space-y-3 mt-4">
            {day.items.map((item, i) => (
              <DayPlanCard key={i} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
