import type { Attraction } from '@/types';

export default function AttractionCard({ item }: { item: Attraction }) {
  return (
    <div className="card card-hover p-4">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        <span className="text-sm text-amber-500 shrink-0">{'★'.repeat(Math.round(item.rating))}{'☆'.repeat(5 - Math.round(item.rating))}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-2 text-xs">
        <span className="tag bg-blue-50 text-blue-700">⏱️ {item.duration}</span>
        <span className="tag bg-gray-100 text-gray-600">🕐 {item.bestTime}</span>
        {item.needReservation && <span className="tag bg-red-50 text-red-600">🎫 需预约</span>}
        {item.photoFriendly && <span className="tag bg-purple-50 text-purple-600">📸 适合拍照</span>}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.tips}</p>
      {item.suitableFor.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {item.suitableFor.map((s) => (
            <span key={s} className="text-xs text-muted-foreground">#{s}</span>
          ))}
        </div>
      )}
    </div>
  );
}
