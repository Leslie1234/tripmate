'use client';

import { seasonInfo } from '@/data';
import type { SeasonMonth, SeasonTag } from '@/types';

const monthNames = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月',
];

const tagColorMap: Record<SeasonTag, string> = {
  '旺季': 'bg-red-100 text-red-700',
  '淡季': 'bg-gray-100 text-gray-700',
  '雨季': 'bg-blue-100 text-blue-700',
  '花期': 'bg-pink-100 text-pink-700',
  '枫叶季': 'bg-orange-100 text-orange-700',
  '烟花季': 'bg-purple-100 text-purple-700',
  '雪季': 'bg-indigo-100 text-indigo-700',
  '台风季': 'bg-amber-100 text-amber-700',
  '平季': 'bg-gray-100 text-gray-600',
};

function renderStars(score: number) {
  const stars: string[] = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= score ? '★' : '☆');
  }
  return stars.join('');
}

export default function SeasonCalendar({ destinationId }: { destinationId: string }) {
  const months = seasonInfo.filter((s) => s.destinationId === destinationId);

  if (months.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-4">📅 月度旅行日历</h2>
      <div className="overflow-x-auto pb-4 -mx-2">
        <div className="flex gap-4 px-2" style={{ minWidth: 'max-content' }}>
          {months
            .sort((a, b) => a.month - b.month)
            .map((m: SeasonMonth) => (
              <div
                key={m.month}
                className="w-56 shrink-0 rounded-2xl border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Month header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    {monthNames[m.month - 1]}
                  </span>
                  <span className="text-amber-500 text-sm tracking-tight">
                    {renderStars(m.score)}
                  </span>
                </div>

                {/* Weather */}
                <p className="text-sm text-muted-foreground mb-3">{m.weather}</p>

                {/* Tags */}
                {m.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColorMap[tag] || 'bg-gray-100 text-gray-600'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Highlights */}
                {m.highlights.length > 0 && (
                  <ul className="text-sm text-gray-700 space-y-1 mb-3">
                    {m.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-primary-500 mt-0.5 shrink-0">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Risks */}
                {m.risks.length > 0 && (
                  <div className="space-y-1">
                    {m.risks.map((r, i) => (
                      <p key={i} className="text-xs text-red-500 flex items-start gap-1">
                        <span className="shrink-0">⚠</span>
                        <span>{r}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
