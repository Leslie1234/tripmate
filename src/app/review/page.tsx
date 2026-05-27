'use client';

import { useState, useCallback } from 'react';
import type { TripReview } from '@/types';
import { getReviews, saveReview, getSavedTrips } from '@/lib/storage';
import ReviewForm from '@/components/review/ReviewForm';
import SavedTripCard from '@/components/review/SavedTripCard';
import Toast from '@/components/shared/Toast';
import EmptyState from '@/components/shared/EmptyState';

export default function ReviewPage() {
  const [reviews, setReviews] = useState<TripReview[]>(() => {
    if (typeof window === 'undefined') return [];
    return getReviews();
  });
  const [hasSavedTrips] = useState(() => {
    if (typeof window === 'undefined') return true;
    return getSavedTrips().length > 0;
  });
  const [toastVisible, setToastVisible] = useState(false);

  const handleSave = useCallback((review: TripReview) => {
    saveReview(review);
    setReviews(getReviews());
    setToastVisible(true);
  }, []);

  const handleToastClose = useCallback(() => {
    setToastVisible(false);
  }, []);

  const showEmptyState = reviews.length === 0 && !hasSavedTrips;

  return (
    <div className="section">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">旅行复盘</h1>
        <p className="text-muted-foreground">
          记录实际花费、推荐地点、踩雷地点和旅行心得
        </p>
      </div>

      {showEmptyState ? (
        <EmptyState
          icon="📝"
          title="还没有复盘记录"
          description="请先生成并保存一份旅行攻略，再来记录复盘"
        />
      ) : (
        <>
          {/* Review Form */}
          <ReviewForm onSave={handleSave} />

          {/* Saved reviews list */}
          {reviews.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">历史复盘</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {reviews.map((review) => (
                  <SavedTripCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <Toast
        message="复盘保存成功"
        visible={toastVisible}
        onClose={handleToastClose}
      />
    </div>
  );
}
