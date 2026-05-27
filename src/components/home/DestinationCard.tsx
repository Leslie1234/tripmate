import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Destination } from '@/types';

export default function DestinationCard({ dest }: { dest: Destination }) {
  const fullStars = Math.floor(dest.score);
  const hasHalf = dest.score % 1 >= 0.5;
  const stars =
    '★'.repeat(fullStars) +
    (hasHalf ? '½' : '') +
    '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));

  return (
    <Link href={`/destinations/${dest.id}`} className="block group">
      <div className="card card-hover overflow-hidden p-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Image section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={dest.imageUrl}
            alt={dest.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Text on image */}
          <div className="absolute bottom-3 left-4">
            <h3 className="text-white font-bold text-lg">{dest.name}</h3>
            <span className="text-white/80 text-sm">{dest.country}</span>
          </div>
        </div>

        {/* Body section */}
        <div className="p-5">
          {/* Score and budget */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-amber-500 font-medium">{stars}</span>
            <span className="text-xs text-muted-foreground">{dest.budgetRange}</span>
          </div>

          {/* Best seasons */}
          <p className="text-xs text-muted-foreground mb-3">
            推荐季节：{dest.bestSeasons.join('、')}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {dest.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="tag bg-primary-50 text-primary-700 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Suitable for */}
          <p className="caption mb-3">{dest.suitableFor.join(' · ')}</p>

          {/* Detail link */}
          <span className="inline-flex items-center gap-1 text-sm text-primary-600 font-medium group-hover:gap-2 transition-all">
            查看详情
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
