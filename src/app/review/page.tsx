'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import type { TripReview } from '@/types';
import { getReviews, saveReview, getSavedTrips } from '@/lib/storage';
import { FileText, ArrowRight } from 'lucide-react';
import ReviewForm from '@/components/review/ReviewForm';
import SavedTripCard from '@/components/review/SavedTripCard';
import Toast from '@/components/shared/Toast';

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
      {/* Hero */}
      <div className="relative text-center mb-12 animate-fade-in">
        <div className="absolute inset-0 -top-10 -z-10 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50/30 to-primary-100/40 opacity-70" />
          <div className="absolute top-0 left-1/3 w-56 h-56 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-44 h-44 bg-accent-200/20 rounded-full blur-3xl" />
        </div>
        <div className="relative pt-8 pb-4">
          <h1 className="heading-page mb-3">
            <span className="gradient-text">把这次旅行变成下一次更好的攻略</span>
          </h1>
          <p className="body-text max-w-lg mx-auto">
            记录实际花费、推荐地点、踩雷地点和旅行心得，为未来的旅程积累经验
          </p>
        </div>
      </div>

      {showEmptyState ? (
        /* Enhanced empty state */
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-slide-up">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-6">
            <FileText className="w-9 h-9 text-primary-500" />
          </div>
          <h3 className="heading-card text-foreground mb-2">还没有复盘记录</h3>
          <p className="body-text max-w-sm mb-8">
            请先生成并保存一份旅行攻略，完成旅行后回来记录复盘，让每次出行都更完美
          </p>
          <Link href="/planner" className="btn-primary inline-flex items-center gap-2">
            前往规划攻略
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <>
          {/* Review Form */}
          <ReviewForm onSave={handleSave} />

          {/* Saved reviews */}
          {reviews.length > 0 && (
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="heading-section mb-6">历史复盘</h2>
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
