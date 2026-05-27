'use client';

import { useMemo, useState } from 'react';
import { checklistItems } from '@/data';
import { getChecklist, setChecklist, clearChecklist } from '@/lib/storage';
import { Sparkles, RotateCcw } from 'lucide-react';
import ProgressBar from '@/components/checklist/ProgressBar';
import ChecklistGroup from '@/components/checklist/ChecklistGroup';

export default function ChecklistPage() {
  const [checked, setCheckedState] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    return getChecklist();
  });

  const grouped = useMemo(() => {
    const map = new Map<string, typeof checklistItems>();
    for (const item of checklistItems) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return map;
  }, []);

  const completedCount = Object.values(checked).filter(Boolean).length;

  function handleToggle(id: string) {
    const next = { ...checked, [id]: !checked[id] };
    setCheckedState(next);
    setChecklist(next);
  }

  function handleReset() {
    setCheckedState({});
    clearChecklist();
  }

  return (
    <section className="section">
      <div className="max-w-4xl mx-auto">
        {/* Hero section */}
        <div className="relative text-center mb-12 animate-fade-in">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 -top-10 -z-10 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50/30 to-primary-100/40 opacity-70" />
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent-200/20 rounded-full blur-3xl" />
          </div>

          <div className="relative pt-8 pb-4">
            <h1 className="heading-page mb-3">
              <span className="gradient-text">行前准备工作台</span>
            </h1>
            <p className="body-text max-w-lg mx-auto">
              根据目的地自动整理签证、保险、电话卡、交通、支付、衣物和预约事项，
              轻松掌握出行前的每一个细节
            </p>
          </div>
        </div>

        {/* Circular progress */}
        <div className="flex justify-center mb-10 animate-slide-up stagger-1">
          <div className="card inline-block px-10 py-8">
            <ProgressBar completed={completedCount} total={checklistItems.length} />
          </div>
        </div>

        {/* AI tip card */}
        <div className="glass-strong rounded-2xl p-5 mb-10 animate-slide-up stagger-2">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">AI 出行建议</p>
              <p className="body-text">
                去巴黎建议提前确认申根签证、热门博物馆预约、转换插头和 Navigo 交通卡。
              </p>
            </div>
          </div>
        </div>

        {/* Checklist groups - 2 column grid */}
        <div className="grid gap-5 md:grid-cols-2 mb-10">
          {Array.from(grouped.entries()).map(([category, items], index) => (
            <div key={category} className={`animate-slide-up stagger-${Math.min(index + 1, 6)}`}>
              <ChecklistGroup
                category={category}
                items={items}
                checked={checked}
                onToggle={handleToggle}
              />
            </div>
          ))}
        </div>

        {/* Reset button */}
        <div className="text-center animate-fade-in">
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            一键重置
          </button>
        </div>
      </div>
    </section>
  );
}
