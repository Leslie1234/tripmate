import type { Food } from '@/types';

export default function FoodCard({ item }: { item: Food }) {
  return (
    <div className="card card-hover p-4">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        <span className="tag bg-orange-50 text-orange-700 text-xs">{item.priceRange}</span>
      </div>
      <div className="flex gap-2 mb-2 text-xs">
        <span className="tag bg-amber-50 text-amber-700">🍽️ {item.cuisine}</span>
        <span className="tag bg-gray-100 text-gray-600">🕐 {item.bestFor}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.reason}</p>
      {item.nearbyAttractions.length > 0 && (
        <div className="mt-2 text-xs text-muted-foreground">
          📍 附近：{item.nearbyAttractions.join('、')}
        </div>
      )}
    </div>
  );
}
