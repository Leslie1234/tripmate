'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Compass, Menu, X } from 'lucide-react';

const navItems = [
  { label: '首页', href: '/' },
  { label: '生成攻略', href: '/planner' },
  { label: '目的地', href: '/destinations' },
  { label: '行前清单', href: '/checklist' },
  { label: '旅行复盘', href: '/review' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-primary-700 hover:text-primary-600 transition-colors">
          <Compass className="w-6 h-6" />
          <span>TripMate</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                pathname === item.href
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/planner" className="ml-3 btn-primary text-sm px-5 py-2.5">
            生成我的攻略
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="菜单"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-surface/95 backdrop-blur-xl animate-slide-down">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                'block px-6 py-3.5 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-muted-foreground hover:bg-muted'
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 py-3">
            <Link href="/planner" onClick={() => setOpen(false)} className="btn-primary block text-center text-sm py-2.5">
              生成我的攻略
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
