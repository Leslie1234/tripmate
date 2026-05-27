import type { TripReview } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { ThumbsUp, ThumbsDown, Compass } from 'lucide-react';

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
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary-500 to-accent-400 rounded-t-2xl" />

      <div className="p-6">
        {/* Destination + date header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="heading-card text-foreground">{review.destinationName}</h3>
          <span className="caption">{formattedDate}</span>
        </div>

        {/* Total expense */}
        <p className="text-2xl font-bold text-primary-600 mb-5">
          {formatCurrency(totalExpense)}
        </p>

        {/* Three highlight items */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {/* Recommend */}
          <div className="rounded-xl bg-green-50 px-3 py-2.5 text-center">
            <ThumbsUp className="w-4 h-4 text-green-500 mx-auto mb-1" />
            <p className="text-[11px] font-medium text-green-600 mb-0.5">推荐</p>
            <p className="text-xs font-semibold text-green-800 truncate">
              {topRecommendation?.name ?? '暂无'}
            </p>
          </div>

          {/* Avoid */}
          <div className="rounded-xl bg-red-50 px-3 py-2.5 text-center">
            <ThumbsDown className="w-4 h-4 text-red-400 mx-auto mb-1" />
            <p className="text-[11px] font-medium text-red-500 mb-0.5">踩雷</p>
            <p className="text-xs font-semibold text-red-800 truncate">
              {topAvoid?.name ?? '暂无'}
            </p>
          </div>

          {/* Discovery */}
          <div className="rounded-xl bg-amber-50 px-3 py-2.5 text-center">
            <Compass className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <p className="text-[11px] font-medium text-amber-600 mb-0.5">发现</p>
            <p className="text-xs font-semibold text-amber-800 truncate">
              {topDiscovery?.name ?? '暂无'}
            </p>
          </div>
        </div>

        {/* Summary */}
        {review.summary && (
          <p className="body-text line-clamp-2">{review.summary}</p>
        )}
      </div>
    </div>
  );
}
