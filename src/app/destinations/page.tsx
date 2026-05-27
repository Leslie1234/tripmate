import Link from 'next/link';
import { destinations } from '@/data';
import type { Destination } from '@/types';

export default function DestinationsPage() {
  return (
    <section className="section">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          热门目的地
        </h1>
        <p className="text-muted-foreground">
          精选全球最受欢迎的旅行目的地，发现你的下一站
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest: Destination) => (
          <div
            key={dest.id}
            className="card card-hover rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Gradient header with emoji */}
            <div
              className={`bg-gradient-to-br ${dest.gradient} h-36 flex items-center justify-center -mx-6 -mt-6 mb-4`}
            >
              <span className="text-6xl">{dest.emoji}</span>
            </div>

            {/* Name and country */}
            <div className="mb-2">
              <h2 className="text-xl font-bold text-gray-900">{dest.name}</h2>
              <span className="text-sm text-muted-foreground">{dest.country}</span>
            </div>

            {/* Description (truncated) */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {dest.description}
            </p>

            {/* Best seasons */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1">最佳季节</p>
              <div className="flex flex-wrap gap-1.5">
                {dest.bestSeasons.map((season) => (
                  <span
                    key={season}
                    className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full"
                  >
                    {season}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {dest.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {dest.tags.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{dest.tags.length - 4}
                </span>
              )}
            </div>

            {/* Budget */}
            <p className="text-sm text-accent-500 font-medium mb-4">
              {dest.budgetRange}
            </p>

            {/* CTA */}
            <div className="mt-auto">
              <Link
                href={`/destinations/${dest.id}`}
                className="text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
              >
                查看详情 →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
