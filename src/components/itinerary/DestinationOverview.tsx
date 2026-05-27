import type { Itinerary } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function DestinationOverview({ itinerary }: { itinerary: Itinerary }) {
  const totalBudget = itinerary.totalBudget.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="card bg-gradient-to-br from-primary-50 to-white mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">📋 目的地概览</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-xs text-muted-foreground">目的地</div>
          <div className="font-medium text-gray-900">{itinerary.destination}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">行程天数</div>
          <div className="font-medium text-gray-900">{itinerary.days.length} 天</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">预计预算</div>
          <div className="font-medium text-primary-600">{formatCurrency(totalBudget)}</div>
        </div>
      </div>
      {itinerary.seasonTip && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
          🌤️ {itinerary.seasonTip}
        </div>
      )}
    </div>
  );
}
