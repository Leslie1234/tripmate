import Link from 'next/link';
import { destinations, attractions, foods, photoSpots } from '@/data';
import SeasonCalendar from '@/components/destinations/SeasonCalendar';
import type { Attraction, Food, PhotoSpot } from '@/types';

const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY;

function renderStars(rating: number) {
  const stars: string[] = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? '★' : '☆');
  }
  return stars.join('');
}

interface ApiPlace {
  properties: {
    name?: string;
    formatted?: string;
    place_id?: string;
    categories?: string[];
  };
}

async function fetchPOI(lat: number, lon: number, categories: string, limit: number) {
  if (!GEOAPIFY_KEY) return [];
  try {
    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},5000&limit=${limit}&lang=zh&apiKey=${GEOAPIFY_KEY}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.features || [])
      .filter((f: ApiPlace) => f.properties.name)
      .map((f: ApiPlace, i: number) => ({
        name: f.properties.name!,
        address: f.properties.formatted || '',
        id: f.properties.place_id || `api-${i}`,
      }));
  } catch {
    return [];
  }
}

export default async function DestinationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const dest = destinations.find((d) => d.id === id);

  if (!dest) {
    return (
      <section className="section text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">目的地不存在</h1>
        <p className="text-muted-foreground mb-6">
          抱歉，没有找到该目的地的信息。
        </p>
        <Link href="/destinations" className="btn-primary">
          返回目的地列表
        </Link>
      </section>
    );
  }

  // Fetch real data from APIs (with fallback to mock)
  let destAttractions: Attraction[] = attractions.filter((a) => a.destinationId === id);
  let destFoods: Food[] = foods.filter((f) => f.destinationId === id);
  let destPhotoSpots: PhotoSpot[] = photoSpots.filter((p) => p.destinationId === id);

  if (GEOAPIFY_KEY) {
    const [apiAttractions, apiRestaurants, apiViewpoints] = await Promise.all([
      fetchPOI(dest.lat, dest.lon, 'tourism.sights,tourism.attraction,entertainment.museum,tourism.sights.tower,tourism.sights.place_of_worship', 10),
      fetchPOI(dest.lat, dest.lon, 'catering.restaurant,catering.cafe', 10),
      fetchPOI(dest.lat, dest.lon, 'tourism.attraction.viewpoint,natural,natural.peak', 6),
    ]);

    if (apiAttractions.length > 0) {
      destAttractions = apiAttractions.map((p: { name: string; address: string; id: string }, i: number) => ({
        id: p.id || `real-attr-${i}`,
        name: p.name,
        destinationId: id,
        rating: 4.5,
        duration: '1-2小时',
        bestTime: '全天',
        suitableFor: ['所有人'],
        needReservation: false,
        photoFriendly: true,
        tips: p.address,
      }));
    }

    if (apiRestaurants.length > 0) {
      destFoods = apiRestaurants.map((p: { name: string; address: string; id: string }, i: number) => ({
        id: p.id || `real-food-${i}`,
        name: p.name,
        destinationId: id,
        cuisine: '当地特色',
        priceRange: '¥50-200',
        bestFor: '午餐/晚餐',
        reason: p.address,
        nearbyAttractions: [],
      }));
    }

    if (apiViewpoints.length > 0) {
      destPhotoSpots = apiViewpoints.map((p: { name: string; address: string; id: string }, i: number) => ({
        id: p.id || `real-photo-${i}`,
        name: p.name,
        destinationId: id,
        target: p.name,
        bestTime: '日落时分',
        style: '风景',
        crowdLevel: '适中',
        nearbyAttractions: [],
        tips: p.address,
      }));
    }
  }

  return (
    <div>
      {/* 1. Hero */}
      <div
        className={`bg-gradient-to-br ${dest.gradient} py-16 px-4`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-7xl mb-4 block">{dest.emoji}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {dest.name}
          </h1>
          <p className="text-lg text-gray-700 mb-4">{dest.country}</p>
          <p className="max-w-2xl mx-auto text-gray-700 mb-6 leading-relaxed">
            {dest.description}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <span className="flex items-center gap-1">
              <span className="text-amber-500">{renderStars(Math.round(dest.score))}</span>
              <span className="font-medium text-gray-800">{dest.score}</span>
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-accent-500 font-medium">{dest.budgetRange}</span>
          </div>
        </div>
      </div>

      {/* 2. Best seasons badges */}
      <section className="section pb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🌤 最佳旅行季节</h2>
        <div className="flex flex-wrap gap-2">
          {dest.bestSeasons.map((season) => (
            <span
              key={season}
              className="tag bg-primary-50 text-primary-700"
            >
              {season}
            </span>
          ))}
        </div>
      </section>

      {/* 3. Season Calendar */}
      <section className="section py-8">
        <SeasonCalendar destinationId={id} />
      </section>

      {/* 4. Attractions */}
      {destAttractions.length > 0 && (
        <section className="section py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">🏛 必去景点</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destAttractions.map((attr) => (
              <div key={attr.id} className="card rounded-2xl">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{attr.name}</h3>
                  <span className="text-amber-500 text-sm shrink-0 ml-2">
                    {renderStars(attr.rating)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                    {attr.duration}
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                    {attr.bestTime}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {attr.tips}
                </p>
                <div className="flex flex-wrap gap-2">
                  {attr.needReservation && (
                    <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                      需预约
                    </span>
                  )}
                  {attr.photoFriendly && (
                    <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                      📸 拍照友好
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Food */}
      {destFoods.length > 0 && (
        <section className="section py-8 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 mb-6">🍜 美食推荐</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destFoods.map((food) => (
              <div key={food.id} className="card rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {food.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{food.cuisine}</p>
                <div className="flex items-center gap-3 text-sm mb-3">
                  <span className="text-accent-500 font-medium">
                    {food.priceRange}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-gray-600">{food.bestFor}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {food.reason}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Photo Spots */}
      {destPhotoSpots.length > 0 && (
        <section className="section py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📸 拍照机位</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destPhotoSpots.map((spot) => (
              <div key={spot.id} className="card rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {spot.name}
                </h3>
                <p className="text-sm text-primary-600 mb-2">{spot.target}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                    {spot.bestTime}
                  </span>
                  <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
                    {spot.style}
                  </span>
                  <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                    人流: {spot.crowdLevel}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {spot.tips}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Accommodation Tips */}
      {dest.accommodationTips.length > 0 && (
        <section className="section py-8 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🏨 住宿建议</h2>
          <div className="space-y-3">
            {dest.accommodationTips.map((tip, i) => (
              <div key={i} className="card rounded-2xl flex items-start gap-3">
                <span className="text-primary-500 mt-0.5 shrink-0">✓</span>
                <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Transport Tips */}
      {dest.transportTips.length > 0 && (
        <section className="section py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🚆 交通攻略</h2>
          <div className="space-y-3">
            {dest.transportTips.map((tip, i) => (
              <div key={i} className="card rounded-2xl flex items-start gap-3">
                <span className="text-primary-500 mt-0.5 shrink-0">✓</span>
                <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. Pitfalls */}
      {dest.pitfalls.length > 0 && (
        <section className="section py-8 bg-red-50/30">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⚠️ 避坑指南</h2>
          <div className="space-y-3">
            {dest.pitfalls.map((pitfall, i) => (
              <div
                key={i}
                className="card rounded-2xl border-red-100 flex items-start gap-3"
              >
                <span className="text-red-500 mt-0.5 shrink-0">⚠</span>
                <p className="text-sm text-gray-700 leading-relaxed">{pitfall}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. CTA */}
      <section className="section text-center">
        <Link
          href={`/planner?destination=${dest.id}`}
          className="btn-primary inline-block text-lg"
        >
          为{dest.name}生成专属攻略
        </Link>
      </section>
    </div>
  );
}
