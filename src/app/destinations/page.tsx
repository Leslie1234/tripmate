'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { destinations } from '@/data';
import { MapPin, ArrowRight, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const filters = [
  { label: '全部', value: 'all' },
  { label: '春季适合', value: '春' },
  { label: '夏季适合', value: '夏' },
  { label: '秋季适合', value: '秋' },
  { label: '冬季适合', value: '冬' },
  { label: '适合拍照', value: '拍照' },
  { label: '适合美食', value: '美食' },
  { label: '适合亲子', value: '亲子' },
  { label: '自然风光', value: '自然' },
];

export default function DestinationsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return destinations;
    return destinations.filter(d =>
      d.bestSeasons.some(s => s.includes(activeFilter)) ||
      d.tags.some(t => t.includes(activeFilter)) ||
      d.suitableFor.some(s => s.includes(activeFilter))
    );
  }, [activeFilter]);

  return (
    <section className="section">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="heading-page mb-3">
          <span className="gradient-text">探索目的地</span>
        </h1>
        <p className="body-text max-w-lg mx-auto">
          精选全球最受欢迎的旅行目的地，发现你的下一站
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide animate-slide-up stagger-1">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={cn(
              'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
              activeFilter === f.value
                ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                : 'bg-surface text-muted-foreground border-border hover:border-primary-200 hover:bg-primary-50/50'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest, i) => {
          const fullStars = Math.floor(dest.score);
          const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);

          return (
            <Link
              key={dest.id}
              href={`/destinations/${dest.id}`}
              className={`block group animate-slide-up stagger-${Math.min(i + 1, 6)}`}
            >
              <div className="card card-hover overflow-hidden p-0">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-xl">{dest.name}</h3>
                    <div className="flex items-center gap-1.5 text-white/80 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      {dest.country}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="glass rounded-full px-2.5 py-1 text-xs font-medium text-amber-600">
                      {stars}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{dest.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>推荐季节：{dest.bestSeasons[0]}</span>
                    <span>{dest.budgetRange}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {dest.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="tag bg-primary-50 text-primary-700 text-xs">{tag}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-primary-600 font-medium group-hover:gap-2 transition-all">
                    查看详情 <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="body-text">没有符合筛选条件的目的地</p>
        </div>
      )}
    </section>
  );
}
