'use client';

import { useEffect, useRef } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, 2800);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-primary-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium">
        ✅ {message}
      </div>
    </div>
  );
}
