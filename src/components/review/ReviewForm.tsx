'use client';

import { useState } from 'react';
import type { TripReview, ReviewPlace, ExpenseRecord, Itinerary } from '@/types';
import { getSavedTrips } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import {
  Plane,
  Hotel,
  Utensils,
  Train,
  Ticket,
  ShoppingBag,
  MoreHorizontal,
  Plus,
  X,
  ThumbsUp,
  AlertTriangle,
  Compass,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ReviewFormProps {
  onSave: (review: TripReview) => void;
}

const EXPENSE_FIELDS: { key: keyof ExpenseRecord; label: string; icon: LucideIcon; color: string }[] = [
  { key: 'flights', label: '机票', icon: Plane, color: 'bg-blue-500' },
  { key: 'hotel', label: '酒店', icon: Hotel, color: 'bg-purple-500' },
  { key: 'food', label: '餐饮', icon: Utensils, color: 'bg-orange-500' },
  { key: 'transport', label: '市内交通', icon: Train, color: 'bg-teal-500' },
  { key: 'tickets', label: '门票', icon: Ticket, color: 'bg-pink-500' },
  { key: 'shopping', label: '购物', icon: ShoppingBag, color: 'bg-amber-500' },
  { key: 'other', label: '其他', icon: MoreHorizontal, color: 'bg-gray-400' },
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

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* 1. Trip selector */}
      <div className="card animate-slide-up stagger-1">
        <h3 className="heading-card mb-3">选择已保存的攻略</h3>
        {savedTrips.length === 0 ? (
          <p className="body-text">暂无已保存的攻略，请先生成并保存一份攻略</p>
        ) : (
          <select
            value={selectedTripId}
            onChange={(e) => setSelectedTripId(e.target.value)}
            className="input-field"
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

      {/* 2. Expenses */}
      <div className="card animate-slide-up stagger-2">
        <h3 className="heading-card mb-4">实际花费</h3>
        <div className="grid grid-cols-2 gap-4">
          {EXPENSE_FIELDS.map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="caption block mb-0.5">{label}</label>
                <input
                  type="number"
                  min={0}
                  value={expenses[key] || ''}
                  onChange={(e) => handleExpenseChange(key, e.target.value)}
                  placeholder="0"
                  className="input-field !py-2 !text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-5 text-center">
          <p className="caption mb-1">总计花费</p>
          <p className="text-3xl font-bold text-primary-600">
            ¥{totalExpense.toLocaleString()}
          </p>
        </div>

        {/* Expense proportion bar */}
        {totalExpense > 0 && (
          <div className="mt-4">
            <div className="flex h-3 rounded-full overflow-hidden">
              {EXPENSE_FIELDS.map(({ key, color }) => {
                const pct = (expenses[key] / totalExpense) * 100;
                if (pct <= 0) return null;
                return (
                  <div
                    key={key}
                    className={`${color} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                    title={`${EXPENSE_FIELDS.find((f) => f.key === key)?.label}: ${pct.toFixed(1)}%`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {EXPENSE_FIELDS.map(({ key, label, color }) => {
                const pct = totalExpense > 0 ? (expenses[key] / totalExpense) * 100 : 0;
                if (pct <= 0) return null;
                return (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${color}`} />
                    <span className="caption">{label} {pct.toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. Recommendations */}
      <div className="card animate-slide-up stagger-3">
        <div className="flex items-center gap-2 mb-4">
          <ThumbsUp className="w-5 h-5 text-green-500" />
          <h3 className="heading-card">推荐地点</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="caption block mb-1">名称</label>
            <input
              type="text"
              value={recName}
              onChange={(e) => setRecName(e.target.value)}
              placeholder="地点名称"
              className="input-field !py-2 !text-sm"
            />
          </div>
          <div>
            <label className="caption block mb-1">类型</label>
            <select
              value={recType}
              onChange={(e) => setRecType(e.target.value)}
              className="input-field !py-2 !text-sm"
            >
              {PLACE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="caption block mb-1">推荐理由</label>
            <input
              type="text"
              value={recReason}
              onChange={(e) => setRecReason(e.target.value)}
              placeholder="推荐理由"
              className="input-field !py-2 !text-sm"
            />
          </div>
          <button
            type="button"
            onClick={addRecommendation}
            className="btn-primary !py-2 text-sm inline-flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            添加
          </button>
        </div>
        {recommendations.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {recommendations.map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 rounded-xl bg-green-50 border border-green-100 px-3.5 py-2 text-sm"
              >
                <span className="font-medium text-green-800">{item.name}</span>
                <span className="text-green-400">·</span>
                <span className="text-green-600">{item.type}</span>
                {item.reason && (
                  <>
                    <span className="text-green-400">·</span>
                    <span className="text-green-600 max-w-[120px] truncate">{item.reason}</span>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => removeItem(recommendations, setRecommendations, i)}
                  className="ml-1 text-green-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Avoid places */}
      <div className="card animate-slide-up stagger-4">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="heading-card">踩雷地点</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="caption block mb-1">名称</label>
            <input
              type="text"
              value={avoidName}
              onChange={(e) => setAvoidName(e.target.value)}
              placeholder="地点名称"
              className="input-field !py-2 !text-sm"
            />
          </div>
          <div>
            <label className="caption block mb-1">类型</label>
            <select
              value={avoidType}
              onChange={(e) => setAvoidType(e.target.value)}
              className="input-field !py-2 !text-sm"
            >
              {PLACE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="caption block mb-1">不推荐原因</label>
            <input
              type="text"
              value={avoidReason}
              onChange={(e) => setAvoidReason(e.target.value)}
              placeholder="不推荐原因"
              className="input-field !py-2 !text-sm"
            />
          </div>
          <button
            type="button"
            onClick={addAvoidPlace}
            className="btn-primary !py-2 text-sm inline-flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            添加
          </button>
        </div>
        {avoidPlaces.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {avoidPlaces.map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-3.5 py-2 text-sm"
              >
                <span className="font-medium text-red-800">{item.name}</span>
                <span className="text-red-300">·</span>
                <span className="text-red-500">{item.type}</span>
                {item.reason && (
                  <>
                    <span className="text-red-300">·</span>
                    <span className="text-red-500 max-w-[120px] truncate">{item.reason}</span>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => removeItem(avoidPlaces, setAvoidPlaces, i)}
                  className="ml-1 text-red-300 hover:text-red-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Discoveries */}
      <div className="card animate-slide-up stagger-5">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-amber-500" />
          <h3 className="heading-card">新发现</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="caption block mb-1">名称</label>
            <input
              type="text"
              value={discName}
              onChange={(e) => setDiscName(e.target.value)}
              placeholder="地点 / 体验名称"
              className="input-field !py-2 !text-sm"
            />
          </div>
          <div>
            <label className="caption block mb-1">描述</label>
            <input
              type="text"
              value={discReason}
              onChange={(e) => setDiscReason(e.target.value)}
              placeholder="为什么值得一提"
              className="input-field !py-2 !text-sm"
            />
          </div>
          <button
            type="button"
            onClick={addDiscovery}
            className="btn-primary !py-2 text-sm inline-flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            添加
          </button>
        </div>
        {discoveries.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {discoveries.map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 px-3.5 py-2 text-sm"
              >
                <span className="font-medium text-amber-800">{item.name}</span>
                {item.reason && (
                  <>
                    <span className="text-amber-400">·</span>
                    <span className="text-amber-600 max-w-[160px] truncate">{item.reason}</span>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => removeItem(discoveries, setDiscoveries, i)}
                  className="ml-1 text-amber-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Summary */}
      <div className="card animate-slide-up stagger-6">
        <h3 className="heading-card mb-3">旅行总结</h3>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          placeholder="这次旅行整体体验如何？哪些安排合理？哪些地方下次可以优化？"
          className="input-field resize-none"
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
