import type { PhotoSpot } from '@/types';

export default function PhotoSpotCard({ item }: { item: PhotoSpot }) {
  return (
    <div className="card card-hover p-4">
      <h4 className="font-medium text-gray-900 mb-2">{item.name}</h4>
      <div className="flex flex-wrap gap-2 mb-2 text-xs">
        <span className="tag bg-purple-50 text-purple-700">📸 {item.style}</span>
        <span className="tag bg-blue-50 text-blue-700">🕐 {item.bestTime}</span>
        <span className="tag bg-gray-100 text-gray-600">👥 人流{item.crowdLevel}</span>
      </div>
      <div className="text-xs text-muted-foreground mb-1.5">
        <span className="font-medium text-gray-600">拍摄对象：</span>{item.target}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.tips}</p>
      {item.nearbyAttractions.length > 0 && (
        <div className="mt-2 text-xs text-muted-foreground">
          📍 附近：{item.nearbyAttractions.join('、')}
        </div>
      )}
    </div>
  );
}
