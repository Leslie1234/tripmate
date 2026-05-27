import type { ScheduleItem } from '@/types';
import { cn } from '@/lib/utils';

const typeConfig: Record<string, { color: string; label: string }> = {
  attraction: { color: 'bg-teal-50 text-teal-700', label: '景点' },
  food: { color: 'bg-orange-50 text-orange-700', label: '美食' },
  photo: { color: 'bg-purple-50 text-purple-700', label: '拍照' },
  hotel: { color: 'bg-blue-50 text-blue-700', label: '住宿' },
  transport: { color: 'bg-gray-100 text-gray-600', label: '交通' },
  shopping: { color: 'bg-pink-50 text-pink-700', label: '购物' },
};

export default function DayPlanCard({ item }: { item: ScheduleItem }) {
  const config = typeConfig[item.type] || typeConfig.attraction;

  return (
    <div className="flex gap-3 group">
      <div className="flex flex-col items-center">
        <span className="text-xs font-mono text-muted-foreground w-12 text-right shrink-0">{item.time}</span>
        <div className="w-px flex-1 bg-gray-200 mt-1 group-last:hidden" />
      </div>
      <div className="card p-4 flex-1 group-hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
          <span className={cn('tag text-xs shrink-0', config.color)}>{config.label}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-1.5 leading-relaxed">{item.reason}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>⏱️ {item.duration}</span>
          {item.needReservation && (
            <span className="text-red-500 font-medium">🎫 需预约</span>
          )}
        </div>
      </div>
    </div>
  );
}
