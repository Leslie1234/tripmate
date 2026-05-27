'use client';

import type { ChecklistItem } from '@/types';
import {
  Shield,
  CreditCard,
  Smartphone,
  Train,
  ShieldCheck,
  Briefcase,
  Ticket,
  ClipboardList,
  Check,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ChecklistGroupProps {
  category: string;
  items: ChecklistItem[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}

const categoryIcons: Record<string, LucideIcon> = {
  '证件类': Shield,
  '支付类': CreditCard,
  '通信类': Smartphone,
  '交通类': Train,
  '保险类': ShieldCheck,
  '生活类': Briefcase,
  '预约类': Ticket,
};

export default function ChecklistGroup({ category, items, checked, onToggle }: ChecklistGroupProps) {
  const Icon = categoryIcons[category] ?? ClipboardList;
  const completedCount = items.filter((item) => !!checked[item.id]).length;

  return (
    <div className="card">
      {/* Category header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-50">
            <Icon className="w-4.5 h-4.5 text-primary-600" />
          </div>
          <h3 className="heading-card text-foreground">{category}</h3>
        </div>
        <span className="tag bg-primary-50 text-primary-700 text-xs">
          {completedCount}/{items.length}
        </span>
      </div>

      {/* Items */}
      <ul className="space-y-2">
        {items.map((item) => {
          const isChecked = !!checked[item.id];

          return (
            <li
              key={item.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors duration-200"
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => onToggle(item.id)}
                className={`flex-shrink-0 w-5.5 h-5.5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                  isChecked
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </button>

              <span
                className={`text-sm flex-1 transition-all duration-200 ${
                  isChecked ? 'line-through text-muted-foreground' : 'text-foreground'
                }`}
              >
                {item.name}
              </span>

              {item.required && (
                <span className="flex-shrink-0 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
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
