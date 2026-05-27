import type { TripFormData, Itinerary, DayPlan, ScheduleItem, Attraction, Food, PhotoSpot, ResolvedDestination } from '@/types';
import { destinations, seasonInfo, attractions, foods, photoSpots } from '@/data';
import { generateId, getMonthFromDate } from './utils';
import { fetchPlaces, fetchWeather, searchDestinations, apiPlacesToAttractions, apiPlacesToFoods, apiPlacesToPhotoSpots } from './api-client';

const travelerDescriptions: Record<string, string> = {
  '一个人': '适合独自旅行者，注重自由度和城市漫步体验',
  '情侣': '浪漫双人旅行路线，兼顾氛围、美食和拍照',
  '朋友': '适合好友同行，体验丰富、拍照多、偏活力路线',
  '家庭亲子': '亲子友好路线，注重安全、轻松和交通便利',
  '父母长辈': '适合带父母出行，节奏舒缓、减少步行、注重舒适',
};

const paceConfig: Record<string, { min: number; max: number; label: string }> = {
  '轻松': { min: 3, max: 4, label: '轻松' },
  '适中': { min: 4, max: 5, label: '适中' },
  '特种兵': { min: 5, max: 7, label: '较高' },
};

const budgetMultiplier: Record<string, number> = {
  '5000以下': 0.5,
  '5000-10000': 0.8,
  '10000-20000': 1.2,
  '20000以上': 2.0,
};

const dayThemes = [
  '经典初印象', '文化艺术之旅', '浪漫街区探索', '深度体验日', '美食探索',
  '自然与拍照', '城市地标巡礼', '周边探索', '博物馆与艺术', '最后的时光',
];

function shuffleAndPick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function parseDestinations(input: string): string[] {
  return input
    .split(/[,，、;；\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

// Map country names to their main tourist cities for better POI results
const countryToCityMap: Record<string, string> = {
  '瑞士': '苏黎世',
  '法国': '巴黎',
  '意大利': '罗马',
  '日本': '东京',
  '泰国': '曼谷',
  '英国': '伦敦',
  '德国': '柏林',
  '西班牙': '巴塞罗那',
  '美国': '纽约',
  '澳大利亚': '悉尼',
  '韩国': '首尔',
  '新加坡': '新加坡',
  '马来西亚': '吉隆坡',
  '越南': '河内',
  '印度尼西亚': '巴厘岛',
  '土耳其': '伊斯坦布尔',
  '希腊': '雅典',
  '荷兰': '阿姆斯特丹',
  '奥地利': '维也纳',
  '捷克': '布拉格',
};

function refineDestinationName(name: string): string {
  return countryToCityMap[name] || name;
}

async function resolveDestination(name: string): Promise<ResolvedDestination> {
  const matched = destinations.find(
    (d) => d.id === name || d.name.includes(name) || d.nameEn.toLowerCase().includes(name.toLowerCase())
  );

  if (matched) {
    return { name: matched.name, country: matched.country, lat: matched.lat, lon: matched.lon, days: 0, id: matched.id };
  }

  // If input is a country name, search for its main city but keep original name for display
  const searchName = refineDestinationName(name);
  const displayName = countryToCityMap[name] ? `${name}·${countryToCityMap[name]}` : name;

  try {
    const geoResults = await searchDestinations(searchName);
    if (geoResults.length > 0) {
      const geo = geoResults[0];
      return { name: displayName, country: geo.country || '', lat: geo.lat, lon: geo.lon, days: 0, id: 'custom' };
    }
  } catch {
    // geocoding failed
  }

  return { name: displayName, country: '', lat: 0, lon: 0, days: 0, id: 'unknown' };
}

function distributeDays(totalDays: number, destCount: number): number[] {
  const base = Math.floor(totalDays / destCount);
  const remainder = totalDays % destCount;
  return Array.from({ length: destCount }, (_, i) => base + (i < remainder ? 1 : 0));
}

function buildDayItems(
  destAttractions: Attraction[],
  destFoods: Food[],
  destPhotoSpots: PhotoSpot[],
  itemCount: number,
  dayIndex: number
): ScheduleItem[] {
  const items: ScheduleItem[] = [];
  const times = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00'];
  let timeIdx = 0;

  const dayAttr = shuffleAndPick(destAttractions, 3);
  const dayFood = shuffleAndPick(destFoods, 2);
  const dayPhoto = destPhotoSpots[dayIndex % Math.max(destPhotoSpots.length, 1)];

  if (dayAttr[0]) {
    items.push({ time: times[timeIdx++], name: dayAttr[0].name, type: 'attraction', duration: dayAttr[0].duration || '1-2小时', reason: dayAttr[0].tips || '热门景点', needReservation: dayAttr[0].needReservation });
  }
  if (dayAttr[1]) {
    items.push({ time: times[timeIdx++], name: dayAttr[1].name, type: 'attraction', duration: dayAttr[1].duration || '1-2小时', reason: dayAttr[1].tips || '值得一游', needReservation: dayAttr[1].needReservation });
  }
  if (dayFood[0]) {
    items.push({ time: times[timeIdx++] || '12:00', name: dayFood[0].name, type: 'food', duration: '1小时', reason: dayFood[0].reason || '当地美食' });
  }
  if (dayPhoto) {
    items.push({ time: times[timeIdx++] || '14:00', name: dayPhoto.name, type: 'photo', duration: '45分钟', reason: dayPhoto.tips || '绝佳拍照点' });
  }
  if (dayAttr[2] && itemCount > 4) {
    items.push({ time: times[timeIdx++] || '15:30', name: dayAttr[2].name, type: 'attraction', duration: dayAttr[2].duration || '1小时', reason: dayAttr[2].tips || '推荐景点', needReservation: dayAttr[2].needReservation });
  }
  if (dayFood[1]) {
    items.push({ time: times[timeIdx++] || '18:30', name: dayFood[1].name, type: 'food', duration: '1.5小时', reason: dayFood[1].reason || '晚餐推荐' });
  }
  if (itemCount >= 7) {
    items.push({ time: times[timeIdx++] || '20:00', name: '夜间自由活动', type: 'attraction', duration: '1-2小时', reason: '体验当地夜生活或夜景' });
  }

  return items.slice(0, itemCount);
}

export async function generateTripPlan(formData: TripFormData): Promise<Itinerary> {
  const destNames = parseDestinations(formData.destination);
  if (destNames.length === 0) destNames.push('巴黎');

  // Resolve all destinations in parallel
  const resolvedDests = await Promise.all(destNames.map(resolveDestination));

  // Distribute days: subtract transit days first, then distribute remaining
  const transitDays = resolvedDests.length > 1 ? resolvedDests.length - 1 : 0;
  const availableDays = Math.max(formData.days - transitDays, resolvedDests.length);
  const dayDistribution = distributeDays(availableDays, resolvedDests.length);
  resolvedDests.forEach((d, i) => { d.days = dayDistribution[i]; });

  const pace = paceConfig[formData.pace] || paceConfig['适中'];
  const multiplier = budgetMultiplier[formData.budget] || 1;
  const month = getMonthFromDate(formData.startDate);

  // Fetch POI and weather data for each destination in parallel
  const destDataPromises = resolvedDests.map(async (rd) => {
    let destAttractions: Attraction[] = [];
    let destFoods: Food[] = [];
    let destPhotoSpots: PhotoSpot[] = [];
    let seasonTip = '';

    // Try mock data first
    if (rd.id !== 'custom' && rd.id !== 'unknown') {
      destAttractions = attractions.filter(a => a.destinationId === rd.id);
      destFoods = foods.filter(f => f.destinationId === rd.id);
      destPhotoSpots = photoSpots.filter(p => p.destinationId === rd.id);
      const monthInfo = seasonInfo.find(s => s.destinationId === rd.id && s.month === month);
      if (monthInfo) {
        seasonTip = `${month}月的${rd.name}${monthInfo.weather}，${monthInfo.highlights.join('、')}。`;
      }
    }

    // Try API data (overrides mock if successful)
    if (rd.lat && rd.lon) {
      try {
        const [apiAttr, apiFood, apiPhoto, weather] = await Promise.all([
          fetchPlaces(rd.lat, rd.lon, 'attractions', 10, rd.name),
          fetchPlaces(rd.lat, rd.lon, 'food', 10, rd.name),
          fetchPlaces(rd.lat, rd.lon, 'photo', 6, rd.name),
          fetchWeather(rd.lat, rd.lon),
        ]);

        if (apiAttr.length > 0) destAttractions = apiPlacesToAttractions(apiAttr, rd.id);
        if (apiFood.length > 0) destFoods = apiPlacesToFoods(apiFood, rd.id);
        if (apiPhoto.length > 0) destPhotoSpots = apiPlacesToPhotoSpots(apiPhoto, rd.id);

        if (weather) {
          const mData = weather.find((w: { month: number; temp: number; precip: number }) => w.month === month);
          if (mData) {
            seasonTip = `${month}月的${rd.name}平均气温 ${mData.temp}°C，月降水量 ${mData.precip}mm。${mData.precip > 150 ? '注意降水较多。' : ''}`;
          }
        }
      } catch {
        // API failed, keep mock data
      }
    }

    // Fallback: generate placeholder items with correct destination name
    if (destAttractions.length === 0) {
      destAttractions = [
        { id: `${rd.id}-a1`, name: `${rd.name}城市中心`, destinationId: rd.id, rating: 4, duration: '2小时', bestTime: '上午', suitableFor: ['所有人'], needReservation: false, photoFriendly: true, tips: `${rd.name}的核心区域，适合漫步探索` },
        { id: `${rd.id}-a2`, name: `${rd.name}历史街区`, destinationId: rd.id, rating: 4, duration: '1.5小时', bestTime: '下午', suitableFor: ['所有人'], needReservation: false, photoFriendly: true, tips: '感受当地历史文化氛围' },
        { id: `${rd.id}-a3`, name: `${rd.name}地标建筑`, destinationId: rd.id, rating: 4.5, duration: '1小时', bestTime: '全天', suitableFor: ['所有人'], needReservation: false, photoFriendly: true, tips: '当地最具代表性的建筑' },
      ];
    }
    if (destFoods.length === 0) {
      destFoods = [
        { id: `${rd.id}-f1`, name: `${rd.name}当地餐厅`, destinationId: rd.id, cuisine: '当地特色', priceRange: '¥100-200', bestFor: '午餐', reason: `品尝${rd.name}正宗当地美食`, nearbyAttractions: [] },
        { id: `${rd.id}-f2`, name: `${rd.name}特色小吃`, destinationId: rd.id, cuisine: '街头美食', priceRange: '¥30-80', bestFor: '下午茶', reason: '体验当地街头美食文化', nearbyAttractions: [] },
      ];
    }
    if (destPhotoSpots.length === 0) {
      destPhotoSpots = [
        { id: `${rd.id}-p1`, name: `${rd.name}全景观景点`, destinationId: rd.id, target: '城市全景', bestTime: '日落时分', style: '风景', crowdLevel: '适中', nearbyAttractions: [], tips: '俯瞰城市全貌的最佳位置' },
      ];
    }

    return { rd, destAttractions, destFoods, destPhotoSpots, seasonTip };
  });

  const allDestData = await Promise.all(destDataPromises);

  // Build daily itinerary
  const days: DayPlan[] = [];
  let dayCounter = 1;
  const allAttractions: Attraction[] = [];
  const allFoods: Food[] = [];
  const allPhotoSpots: PhotoSpot[] = [];
  const seasonTips: string[] = [];

  for (let destIdx = 0; destIdx < allDestData.length; destIdx++) {
    const { rd, destAttractions, destFoods, destPhotoSpots, seasonTip } = allDestData[destIdx];
    allAttractions.push(...destAttractions);
    allFoods.push(...destFoods);
    allPhotoSpots.push(...destPhotoSpots);
    if (seasonTip) seasonTips.push(seasonTip);

    // Add transit day if switching cities (not the first destination)
    if (destIdx > 0) {
      const prevCity = allDestData[destIdx - 1].rd.name;
      days.push({
        day: dayCounter++,
        theme: `${prevCity} → ${rd.name} 移动日`,
        intensity: '轻松',
        estimatedCost: `¥${Math.round(500 * multiplier)}`,
        routeSummary: `从${prevCity}出发前往${rd.name}`,
        city: `${prevCity} → ${rd.name}`,
        isTransitDay: true,
        items: [
          { time: '09:00', name: `退房整理行李`, type: 'hotel', duration: '1小时', reason: '整理打包，退房' },
          { time: '10:00', name: `前往${rd.name}`, type: 'transport', duration: '2-4小时', reason: `从${prevCity}到${rd.name}的交通` },
          { time: '14:00', name: `抵达${rd.name}，办理入住`, type: 'hotel', duration: '1小时', reason: '安顿休息，适应新城市' },
          { time: '15:30', name: `${rd.name}周边简单逛逛`, type: 'attraction', duration: '2小时', reason: '熟悉住所周边环境' },
          { time: '18:00', name: `${rd.name}当地晚餐`, type: 'food', duration: '1.5小时', reason: '品尝当地美食，开启新城市体验' },
        ],
      });
    }

    // Build regular days for this destination
    for (let i = 0; i < rd.days; i++) {
      const itemCount = pace.min + Math.floor(Math.random() * (pace.max - pace.min + 1));
      const dayItems = buildDayItems(destAttractions, destFoods, destPhotoSpots, itemCount, i);
      const routeSummary = dayItems.map(it => it.name).join(' → ');

      days.push({
        day: dayCounter++,
        theme: `${rd.name} · ${dayThemes[(destIdx * 3 + i) % dayThemes.length]}`,
        intensity: i === rd.days - 1 ? '轻松' : pace.label,
        estimatedCost: `¥${Math.round((1000 + Math.random() * 500) * multiplier)}`,
        routeSummary,
        city: rd.name,
        items: dayItems,
      });
    }
  }

  // Build title
  const destNamesList = resolvedDests.map(d => d.name);
  const titleDests = destNamesList.length <= 3 ? destNamesList.join(' + ') : `${destNamesList[0]}等${destNamesList.length}地`;
  const totalDays = days.length;

  // Budget
  const baseBudgets = [
    { category: '机票', amount: Math.round(5000 * multiplier * (resolvedDests.length > 1 ? 1.3 : 1)), notes: resolvedDests.length > 1 ? '含城市间交通' : '往返含税' },
    { category: '酒店', amount: Math.round(800 * totalDays * multiplier), notes: `${totalDays - 1}晚住宿` },
    { category: '餐饮', amount: Math.round(300 * totalDays * multiplier), notes: '含正餐和小吃' },
    { category: '城市间交通', amount: Math.round(500 * (resolvedDests.length - 1) * multiplier), notes: resolvedDests.length > 1 ? `${resolvedDests.length - 1}次城市间移动` : '无' },
    { category: '市内交通', amount: Math.round(100 * totalDays * multiplier), notes: '地铁/出租' },
    { category: '门票', amount: Math.round(150 * totalDays * multiplier), notes: '景点门票' },
    { category: '购物及其他', amount: Math.round(2000 * multiplier), notes: '纪念品和伴手礼' },
  ];

  const seasonTipFull = seasonTips.length > 0 ? seasonTips.join(' ') : `${destNamesList[0]}是一个全年都适合旅行的目的地。`;
  const travelerDesc = travelerDescriptions[formData.travelers] || travelerDescriptions['情侣'];
  const multiCityNote = resolvedDests.length > 1 ? `途经${destNamesList.join('、')}，` : '';

  return {
    id: generateId(),
    title: `${titleDests} ${formData.days} 天 ${formData.days - 1} 晚旅行攻略`,
    destination: titleDests,
    destinationId: resolvedDests[0]?.id || 'custom',
    tags: [formData.travelers, ...formData.interests.slice(0, 3), `${formData.pace}节奏`, ...(resolvedDests.length > 1 ? ['多城市'] : [])],
    summary: `${travelerDesc}。${multiCityNote}路线尽量减少来回折返，兼顾景点体验和休息时间。`,
    seasonTip: seasonTipFull,
    totalBudget: baseBudgets,
    days,
    attractions: allAttractions.slice(0, 10),
    foods: allFoods.slice(0, 10),
    photoSpots: allPhotoSpots.slice(0, 8),
    createdAt: new Date().toISOString().split('T')[0],
  };
}
