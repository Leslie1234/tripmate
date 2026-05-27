import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}

export function getMonthFromDate(dateStr: string): number {
  if (!dateStr) return new Date().getMonth() + 1;
  return new Date(dateStr).getMonth() + 1;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function ratingStars(score: number): string {
  return '★'.repeat(score) + '☆'.repeat(5 - score);
}
