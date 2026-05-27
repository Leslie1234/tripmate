'use client';

import { useState } from 'react';
import type { TripFormData } from '@/types';
import { cn } from '@/lib/utils';

const travelerOptions = ['一个人', '情侣', '朋友', '家庭亲子', '父母长辈'];
const budgetOptions = ['5000以下', '5000-10000', '10000-20000', '20000以上'];
const interestOptions = ['美食', '拍照', '博物馆', '自然风光', '购物', '城市漫步', '亲子', '夜生活', '小众体验'];
const paceOptions = ['轻松', '适中', '特种兵'];
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">目的地</label>
        <input
          type="text"
          value={form.destination}
          onChange={(e) => updateField('destination', e.target.value)}
          placeholder="例如：瑞士、法国巴黎 或 丽江、大理、香格里拉（多地用逗号分隔）"
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary-200 focus:border-primary-400 outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">出发日期</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => updateField('startDate', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary-200 focus:border-primary-400 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">出行天数</label>
          <input
            type="number"
            min={1}
            max={30}
            value={form.days}
            onChange={(e) => updateField('days', Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary-200 focus:border-primary-400 outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">同行人</label>
        <div className="flex flex-wrap gap-2">
          {travelerOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => updateField('travelers', opt)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                form.travelers === opt
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">预算范围</label>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => updateField('budget', opt)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                form.budget === opt
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              ¥{opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">兴趣偏好（可多选）</label>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleArrayItem('interests', opt)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                form.interests.includes(opt)
                  ? 'bg-accent-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">出行节奏</label>
        <div className="flex gap-2">
          {paceOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => updateField('pace', opt)}
              className={cn(
                'flex-1 py-2.5 rounded-xl text-sm font-medium transition-all text-center',
                form.pace === opt
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">住宿偏好</label>
        <div className="flex flex-wrap gap-2">
          {hotelOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => updateField('hotelPreference', opt)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                form.hotelPreference === opt
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">饮食偏好（可多选）</label>
        <div className="flex flex-wrap gap-2">
          {foodPrefOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleArrayItem('foodPreferences', opt)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                form.foodPreferences.includes(opt)
                  ? 'bg-accent-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full btn-primary py-3.5 text-base',
          loading && 'opacity-70 cursor-not-allowed'
        )}
      >
        {loading ? '正在为您规划行程...' : '✨ 生成我的旅行攻略'}
      </button>
    </form>
  );
}
