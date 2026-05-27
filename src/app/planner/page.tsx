'use client';

import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import type { TripFormData, Itinerary } from '@/types';
import TripForm from '@/components/planner/TripForm';
import ItineraryPreview from '@/components/planner/ItineraryPreview';
import Toast from '@/components/shared/Toast';
import { generateTripPlan } from '@/lib/generateTripPlan';
import { saveTrip } from '@/lib/storage';

function PlannerContent() {
  const searchParams = useSearchParams();
  const defaultDest = searchParams.get('destination') || '';

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(false);

  const handleGenerate = useCallback(async (data: TripFormData) => {
    setLoading(true);
    setSaved(false);
    try {
      const result = await generateTripPlan(data);
      setItinerary(result);
    } catch {
      // fallback handled inside generateTripPlan
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSave = useCallback(() => {
    if (itinerary) {
      saveTrip(itinerary);
      setSaved(true);
      setToast(true);
    }
  }, [itinerary]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">生成你的旅行攻略</h1>
          <p className="text-muted-foreground">填写你的旅行偏好，我们为你量身定制完美行程</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-[420px] shrink-0">
            <div className="card sticky top-20">
              <h2 className="font-semibold text-gray-900 mb-4">📋 旅行偏好</h2>
              <TripForm
                onGenerate={handleGenerate}
                loading={loading}
                defaultDestination={defaultDest}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="card">
              <ItineraryPreview
                itinerary={itinerary}
                loading={loading}
                onSave={handleSave}
                saved={saved}
              />
            </div>
          </div>
        </div>
      </div>

      <Toast message="攻略保存成功！" visible={toast} onClose={() => setToast(false)} />
    </>
  );
}

export default function PlannerPage() {
  return (
    <Suspense>
      <PlannerContent />
    </Suspense>
  );
}
