'use client';

import { useMemo, useState } from 'react';
import { checklistItems } from '@/data';
import { getChecklist, setChecklist, clearChecklist } from '@/lib/storage';
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
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            行前准备清单
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            根据目的地自动整理签证、保险、电话卡、交通、支付、衣物和预约事项
          </p>
        </div>

        {/* Progress */}
        <div className="card mb-6">
          <ProgressBar completed={completedCount} total={checklistItems.length} />
        </div>

        {/* Checklist Groups */}
        <div className="space-y-4">
          {Array.from(grouped.entries()).map(([category, items]) => (
            <ChecklistGroup
              key={category}
              category={category}
              items={items}
              checked={checked}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {/* Reset Button */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
          >
            一键重置
          </button>
        </div>
      </div>
    </section>
  );
}
