'use client';

import { useState } from 'react';
import type { TripFormData } from '@/types';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

const travelerOptions = ['一个人', '情侣', '朋友', '家庭亲子', '父母长辈'];
const budgetOptions = [
  { label: '5000以下', desc: '穷游背包客' },
  { label: '5000-10000', desc: '经济舒适' },
  { label: '10000-20000', desc: '品质出行' },
  { label: '20000以上', desc: '奢华体验' },
];
const interestOptions = ['美食', '拍照', '博物馆', '自然风光', '购物', '城市漫步', '亲子', '夜生活', '小众体验'];
const paceOptions = [
  { label: '轻松', desc: '每天3-4个安排', emoji: '🌿' },
  { label: '适中', desc: '每天4-5个安排', emoji: '🚶' },
  { label: '特种兵', desc: '每天5-7个安排', emoji: '🔥' },
];
const hotelOptions = ['市中心', '性价比', '景观好', '交通方便', '安静舒适'];
const foodPrefOptions = ['当地特色', '咖啡甜品', '米其林', '夜市小吃', '性价比餐厅'];

interface TripFormProps {
  onGenerate: (data: TripFormData) => void;
  loading: boolean;
  defaultDestination?: string;
}

export default function TripForm({ onGenerate, loading, defaultDestination }: TripFormProps) {
  const [form, setForm] = useState<TripFormData>({
    destination: defaultDestination || '',
    startDate: '',
    endDate: '',
    days: 5,
    travelers: '情侣',
    budget: '10000-20000',
    interests: ['美食', '拍照'],
    pace: '适中',
    hotelPreference: '市中心',
    foodPreferences: ['当地特色'],
  });

  const updateField = <K extends keyof TripFormData>(key: K, value: TripFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: 'interests' | 'foodPreferences', item: string) => {
    setForm((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="text-center pb-2">
        <h2 className="heading-card text-gray-900">告诉我你想怎么旅行</h2>
        <p className="caption mt-1">我来帮你整理成可执行攻略</p>
      </div>

      {/* Destination */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">目的地</label>
        <input
          type="text"
          value={form.destination}
          onChange={(e) => updateField('destination', e.target.value)}
          placeholder="巴黎、瑞士、意大利（多地用逗号分隔）"
          className="input-field"
        />
      </div>

      {/* Date & Days */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">出发日期</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => updateField('startDate', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">天数</label>
          <input
            type="number"
            min={1}
            max={30}
            value={form.days}
            onChange={(e) => updateField('days', Number(e.target.value))}
            className="input-field"
          />
        </div>
      </div>

      {/* Travelers */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">同行人</label>
        <div className="flex flex-wrap gap-2">
          {travelerOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => updateField('travelers', opt)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                form.travelers === opt
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">预算</label>
        <div className="grid grid-cols-2 gap-2">
          {budgetOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => updateField('budget', opt.label)}
              className={cn(
                'flex flex-col items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 border',
                form.budget === opt.label
                  ? 'bg-primary-50 border-primary-400 text-primary-700 shadow-sm'
                  : 'bg-white border-border text-gray-600 hover:border-primary-200 hover:bg-primary-50/50'
              )}
            >
              <span className="font-semibold">{opt.label}</span>
              <span className="text-xs text-muted-foreground mt-0.5">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">兴趣偏好（可多选）</label>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleArrayItem('interests', opt)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                form.interests.includes(opt)
                  ? 'bg-accent-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Pace */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">节奏</label>
        <div className="grid grid-cols-3 gap-2">
          {paceOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => updateField('pace', opt.label)}
              className={cn(
                'flex flex-col items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 border',
                form.pace === opt.label
                  ? 'bg-primary-50 border-primary-400 text-primary-700 shadow-sm'
                  : 'bg-white border-border text-gray-600 hover:border-primary-200 hover:bg-primary-50/50'
              )}
            >
              <span className="text-lg mb-0.5">{opt.emoji}</span>
              <span className="font-semibold">{opt.label}</span>
              <span className="text-xs text-muted-foreground mt-0.5">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hotel preference */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">住宿偏好</label>
        <div className="flex flex-wrap gap-2">
          {hotelOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => updateField('hotelPreference', opt)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                form.hotelPreference === opt
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Food preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">饮食偏好（可多选）</label>
        <div className="flex flex-wrap gap-2">
          {foodPrefOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleArrayItem('foodPreferences', opt)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                form.foodPreferences.includes(opt)
                  ? 'bg-accent-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={cn(
          'btn-primary w-full py-4 text-base flex items-center justify-center gap-2',
          loading && 'opacity-70 cursor-not-allowed'
        )}
      >
        <Sparkles className="w-5 h-5" />
        {loading ? '正在为您规划行程...' : '生成我的 AI 旅行攻略'}
      </button>
    </form>
  );
}
