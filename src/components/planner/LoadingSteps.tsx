'use client';

import { useState, useEffect } from 'react';
import { Sparkles, CloudSun, Route, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { label: '正在识别你的旅行偏好', Icon: Sparkles },
  { label: '正在分析目的地季节', Icon: CloudSun },
  { label: '正在组合景点、美食和拍照机位', Icon: Route },
  { label: '正在生成顺路路线与行前清单', Icon: CheckCircle2 },
];

export default function LoadingSteps() {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (completedCount >= steps.length) return;

    const timer = setTimeout(() => {
      setCompletedCount((prev) => prev + 1);
    }, 400);

    return () => clearTimeout(timer);
  }, [completedCount]);

  return (
    <div className="flex items-center justify-center py-12">
      <div className="glass-strong rounded-2xl p-8 max-w-md w-full">
        <div className="flex items-center gap-2 mb-6">
          <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
          <span className="text-sm font-medium text-primary-700">AI 正在规划你的旅程</span>
        </div>

        <div className="space-y-4">
          {steps.map((step, idx) => {
            const done = idx < completedCount;
            const active = idx === completedCount;

            return (
              <div
                key={step.label}
                className={cn(
                  'flex items-center gap-3 transition-all duration-300',
                  done ? 'opacity-100' : active ? 'opacity-80' : 'opacity-40'
                )}
              >
                {done ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                ) : (
                  <step.Icon
                    className={cn(
                      'w-5 h-5 shrink-0',
                      active ? 'text-primary-500 animate-pulse-soft' : 'text-gray-400'
                    )}
                  />
                )}
                <span
                  className={cn(
                    'text-sm transition-colors duration-300',
                    done ? 'text-green-700 font-medium' : active ? 'text-gray-700' : 'text-gray-400'
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
