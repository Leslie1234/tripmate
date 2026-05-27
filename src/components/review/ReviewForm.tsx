'use client';

import { useState } from 'react';
import type { TripReview, ReviewPlace, ExpenseRecord, Itinerary } from '@/types';
import { getSavedTrips } from '@/lib/storage';
import { generateId } from '@/lib/utils';

interface ReviewFormProps {
  onSave: (review: TripReview) => void;
}

const EXPENSE_LABELS: { key: keyof ExpenseRecord; label: string }[] = [
  { key: 'flights', label: '机票' },
  { key: 'hotel', label: '酒店' },
  { key: 'food', label: '餐饮' },
  { key: 'transport', label: '市内交通' },
  { key: 'tickets', label: '门票' },
  { key: 'shopping', label: '购物' },
  { key: 'other', label: '其他' },
];

const PLACE_TYPES = ['景点', '美食', '拍照', '住宿', '其他'];

const emptyExpenses: ExpenseRecord = {
  flights: 0,
  hotel: 0,
  food: 0,
  transport: 0,
  tickets: 0,
  shopping: 0,
  other: 0,
};

export default function ReviewForm({ onSave }: ReviewFormProps) {
  const [savedTrips] = useState<Itinerary[]>(() => {
    if (typeof window === 'undefined') return [];
    return getSavedTrips();
  });
  const [selectedTripId, setSelectedTripId] = useState('');

  const [expenses, setExpenses] = useState<ExpenseRecord>({ ...emptyExpenses });

  const [recommendations, setRecommendations] = useState<ReviewPlace[]>([]);
  const [recName, setRecName] = useState('');
  const [recType, setRecType] = useState(PLACE_TYPES[0]);
  const [recReason, setRecReason] = useState('');

  const [avoidPlaces, setAvoidPlaces] = useState<ReviewPlace[]>([]);
  const [avoidName, setAvoidName] = useState('');
  const [avoidType, setAvoidType] = useState(PLACE_TYPES[0]);
  const [avoidReason, setAvoidReason] = useState('');

  const [discoveries, setDiscoveries] = useState<ReviewPlace[]>([]);
  const [discName, setDiscName] = useState('');
  const [discReason, setDiscReason] = useState('');

  const [summary, setSummary] = useState('');

  const totalExpense = Object.values(expenses).reduce((sum, v) => sum + v, 0);

  const handleExpenseChange = (key: keyof ExpenseRecord, value: string) => {
    const num = value === '' ? 0 : parseInt(value, 10);
    if (isNaN(num) || num < 0) return;
    setExpenses((prev) => ({ ...prev, [key]: num }));
  };

  const addRecommendation = () => {
    if (!recName.trim()) return;
    setRecommendations((prev) => [
      ...prev,
      { name: recName.trim(), type: recType, reason: recReason.trim() },
    ]);
    setRecName('');
    setRecReason('');
  };

  const addAvoidPlace = () => {
    if (!avoidName.trim()) return;
    setAvoidPlaces((prev) => [
      ...prev,
      { name: avoidName.trim(), type: avoidType, reason: avoidReason.trim(), avoid: true },
    ]);
    setAvoidName('');
    setAvoidReason('');
  };

  const addDiscovery = () => {
    if (!discName.trim()) return;
    setDiscoveries((prev) => [
      ...prev,
      { name: discName.trim(), type: '其他', reason: discReason.trim() },
    ]);
    setDiscName('');
    setDiscReason('');
  };

  const removeItem = (
    list: ReviewPlace[],
    setter: React.Dispatch<React.SetStateAction<ReviewPlace[]>>,
    index: number,
  ) => {
    setter(list.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const selectedTrip = savedTrips.find((t) => t.id === selectedTripId);
    if (!selectedTrip) return;

    const review: TripReview = {
      id: generateId(),
      itineraryId: selectedTrip.id,
      destinationName: selectedTrip.destination,
      expenses,
      recommendations,
      avoidPlaces,
      discoveries,
      summary,
      createdAt: new Date().toISOString(),
    };

    onSave(review);

    // Reset form
    setSelectedTripId('');
    setExpenses({ ...emptyExpenses });
    setRecommendations([]);
    setAvoidPlaces([]);
    setDiscoveries([]);
    setSummary('');
  };

  const inputClass =
    'w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-primary-200 focus:border-primary-400';

  return (
    <div className="space-y-6">
      {/* 1. Select saved trip */}
      <div className="card">
        <h3 className="text-base font-bold mb-3">选择已保存的攻略</h3>
        {savedTrips.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            暂无已保存的攻略，请先生成并保存一份攻略
          </p>
        ) : (
          <select
            value={selectedTripId}
            onChange={(e) => setSelectedTripId(e.target.value)}
            className={inputClass}
          >
            <option value="">请选择攻略</option>
            {savedTrips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {trip.destination} - {trip.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* 2. Actual expenses */}
      <div className="card">
        <h3 className="text-base font-bold mb-3">实际花费</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {EXPENSE_LABELS.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm text-muted-foreground mb-1">{label}</label>
              <input
                type="number"
                min={0}
                value={expenses[key] || ''}
                onChange={(e) => handleExpenseChange(key, e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            总计花费: ¥{totalExpense.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 3. Recommended places */}
      <div className="card">
        <h3 className="text-base font-bold mb-3">推荐地点</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">名称</label>
            <input
              type="text"
              value={recName}
              onChange={(e) => setRecName(e.target.value)}
              placeholder="地点名称"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">类型</label>
            <select
              value={recType}
              onChange={(e) => setRecType(e.target.value)}
              className={inputClass}
            >
              {PLACE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">推荐理由</label>
            <input
              type="text"
              value={recReason}
              onChange={(e) => setRecReason(e.target.value)}
              placeholder="推荐理由"
              className={inputClass}
            />
          </div>
          <button
            type="button"
            onClick={addRecommendation}
            className="btn-primary text-sm py-2"
          >
            添加
          </button>
        </div>
        {recommendations.length > 0 && (
          <ul className="mt-4 space-y-2">
            {recommendations.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg bg-green-50 px-4 py-2 text-sm"
              >
                <span>
                  <span className="font-medium text-green-800">{item.name}</span>
                  <span className="mx-2 text-green-400">|</span>
                  <span className="text-green-600">{item.type}</span>
                  {item.reason && (
                    <>
                      <span className="mx-2 text-green-400">|</span>
                      <span className="text-green-600">{item.reason}</span>
                    </>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(recommendations, setRecommendations, i)}
                  className="text-red-400 hover:text-red-600 ml-3"
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 4. Avoid places */}
      <div className="card">
        <h3 className="text-base font-bold mb-3">踩雷地点</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">名称</label>
            <input
              type="text"
              value={avoidName}
              onChange={(e) => setAvoidName(e.target.value)}
              placeholder="地点名称"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">类型</label>
            <select
              value={avoidType}
              onChange={(e) => setAvoidType(e.target.value)}
              className={inputClass}
            >
              {PLACE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">不推荐原因</label>
            <input
              type="text"
              value={avoidReason}
              onChange={(e) => setAvoidReason(e.target.value)}
              placeholder="不推荐原因"
              className={inputClass}
            />
          </div>
          <button
            type="button"
            onClick={addAvoidPlace}
            className="btn-primary text-sm py-2"
          >
            添加
          </button>
        </div>
        {avoidPlaces.length > 0 && (
          <ul className="mt-4 space-y-2">
            {avoidPlaces.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-2 text-sm"
              >
                <span>
                  <span className="font-medium text-red-800">{item.name}</span>
                  <span className="mx-2 text-red-300">|</span>
                  <span className="text-red-500">{item.type}</span>
                  {item.reason && (
                    <>
                      <span className="mx-2 text-red-300">|</span>
                      <span className="text-red-500">{item.reason}</span>
                    </>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(avoidPlaces, setAvoidPlaces, i)}
                  className="text-red-400 hover:text-red-600 ml-3"
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 5. Discoveries */}
      <div className="card">
        <h3 className="text-base font-bold mb-3">新发现</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">名称</label>
            <input
              type="text"
              value={discName}
              onChange={(e) => setDiscName(e.target.value)}
              placeholder="地点 / 体验名称"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">描述</label>
            <input
              type="text"
              value={discReason}
              onChange={(e) => setDiscReason(e.target.value)}
              placeholder="为什么值得一提"
              className={inputClass}
            />
          </div>
          <button
            type="button"
            onClick={addDiscovery}
            className="btn-primary text-sm py-2"
          >
            添加
          </button>
        </div>
        {discoveries.length > 0 && (
          <ul className="mt-4 space-y-2">
            {discoveries.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg bg-amber-50 px-4 py-2 text-sm"
              >
                <span>
                  <span className="font-medium text-amber-800">{item.name}</span>
                  {item.reason && (
                    <>
                      <span className="mx-2 text-amber-400">|</span>
                      <span className="text-amber-600">{item.reason}</span>
                    </>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(discoveries, setDiscoveries, i)}
                  className="text-red-400 hover:text-red-600 ml-3"
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 6. Summary */}
      <div className="card">
        <h3 className="text-base font-bold mb-3">旅行总结</h3>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          placeholder="这次旅行整体体验如何？哪些安排合理？哪些地方下次可以优化？"
          className={inputClass + ' resize-none'}
        />
      </div>

      {/* 7. Save button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={!selectedTripId}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          保存复盘
        </button>
      </div>
    </div>
  );
}
