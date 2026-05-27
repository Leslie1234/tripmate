import type { Itinerary } from '@/types';

export default function ItineraryHeader({ itinerary }: { itinerary: Itinerary }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{itinerary.title}</h2>
      <div className="flex flex-wrap gap-2 mb-3">
        {itinerary.tags.map((tag) => (
          <span key={tag} className="tag bg-primary-50 text-primary-700 text-xs">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{itinerary.summary}</p>
    </div>
  );
}
