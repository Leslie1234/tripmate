'use client';

import type { ChecklistItem } from '@/types';

interface ChecklistGroupProps {
  category: string;
  items: ChecklistItem[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}

const categoryEmojis: Record<string, string> = {
  '证件类': '📄',
  '支付类': '💳',
  '通信类': '📱',
  '交通类': '🚇',
  '保险类': '🛡️',
  '生活类': '🧳',
  '预约类': '🎫',
};

export default function ChecklistGroup({ category, items, checked, onToggle }: ChecklistGroupProps) {
  const emoji = categoryEmojis[category] ?? '📋';

  return (
    <div className="card">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
        <span className="text-xl">{emoji}</span>
        {category}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => {
          const isChecked = !!checked[item.id];

          return (
            <li key={item.id} className="flex items-center gap-3">
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => onToggle(item.id)}
                className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  isChecked
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {isChecked && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              <span
                className={`text-sm transition-all duration-200 ${
                  isChecked ? 'line-through text-gray-400' : 'text-gray-700'
                }`}
              >
                {item.name}
              </span>

              {item.required && (
                <span className="ml-auto flex-shrink-0 text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                  必备
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
