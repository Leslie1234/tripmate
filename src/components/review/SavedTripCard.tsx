import type { TripReview } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface SavedTripCardProps {
  review: TripReview;
}

export default function SavedTripCard({ review }: SavedTripCardProps) {
  const totalExpense =
    review.expenses.flights +
    review.expenses.hotel +
    review.expenses.food +
    review.expenses.transport +
    review.expenses.tickets +
    review.expenses.shopping +
    review.expenses.other;

  const topRecommendation = review.recommendations[0];
  const topAvoid = review.avoidPlaces[0];
  const topDiscovery = review.discoveries[0];

  const formattedDate = new Date(review.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="card card-hover overflow-hidden p-0">
      {/* Gradient accent bar */}
      <div className="h-2 bg-gradient-to-r from-primary-500 via-primary-400 to-accent-400" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">
            {review.destinationName}
          </h3>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>

        {/* Total expense */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
          <span>总花费</span>
          <span className="text-base">{formatCurrency(totalExpense)}</span>
        </div>

        {/* Highlights grid */}
        <div className="grid gap-3 sm:grid-cols-3 mb-4">
          {topRecommendation && (
            <div className="rounded-xl bg-green-50 px-4 py-3">
              <p className="text-xs font-medium text-green-600 mb-1">推荐</p>
              <p className="text-sm font-semibold text-green-800 truncate">
                {topRecommendation.name}
              </p>
              <p className="text-xs text-green-600 truncate">
                {topRecommendation.reason}
              </p>
            </div>
          )}

          {topAvoid && (
            <div className="rounded-xl bg-red-50 px-4 py-3">
              <p className="text-xs font-medium text-red-500 mb-1">踩雷</p>
              <p className="text-sm font-semibold text-red-800 truncate">
                {topAvoid.name}
              </p>
              <p className="text-xs text-red-500 truncate">
                {topAvoid.reason}
              </p>
            </div>
          )}

          {topDiscovery && (
            <div className="rounded-xl bg-amber-50 px-4 py-3">
              <p className="text-xs font-medium text-amber-600 mb-1">新发现</p>
              <p className="text-sm font-semibold text-amber-800 truncate">
                {topDiscovery.name}
              </p>
              <p className="text-xs text-amber-600 truncate">
                {topDiscovery.reason}
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        {review.summary && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {review.summary}
          </p>
        )}
      </div>
    </div>
  );
}
