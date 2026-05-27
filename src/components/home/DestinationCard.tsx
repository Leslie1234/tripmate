import Link from 'next/link';
import type { Destination } from '@/types';

export default function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <Link href={`/destinations/${dest.id}`} className="block">
      <div className="card card-hover overflow-hidden p-0 group">
        <div className={`h-40 bg-gradient-to-br ${dest.gradient} flex items-center justify-center relative`}>
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
            {dest.emoji}
          </span>
          <div className="absolute top-3 right-3">
            <span className="bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full font-medium text-primary-700">
              {'★'.repeat(dest.score)}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1">{dest.name}</h3>
          <p className="text-xs text-muted-foreground mb-3">
            推荐季节：{dest.bestSeasons.join('、')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {dest.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tag bg-primary-50 text-primary-700 text-xs">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{dest.suitableFor.join(' · ')}</span>
            <span className="text-xs text-primary-500 font-medium group-hover:translate-x-1 transition-transform">
              查看详情 →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
