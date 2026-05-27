import { NextRequest, NextResponse } from 'next/server';
import { getCached, setCache } from '@/lib/api-cache';
import type { SeasonTag } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'lat and lon required' }, { status: 400 });
  }

  const cacheKey = `weather:${lat}:${lon}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json({ months: cached, source: 'cache' });
  }

  try {
    const url = `https://climate-api.open-meteo.com/v1/climate?latitude=${lat}&longitude=${lon}&start_date=2020-01-01&end_date=2024-12-31&models=EC_Earth3P_HR&daily=temperature_2m_mean,precipitation_sum`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });

    if (!res.ok) {
      return NextResponse.json({ error: 'api_error', months: null }, { status: 200 });
    }

    const data = await res.json();
    const daily = data.daily;

    if (!daily?.time || !daily?.temperature_2m_mean || !daily?.precipitation_sum) {
      return NextResponse.json({ error: 'invalid_data', months: null }, { status: 200 });
    }

    const monthlyAverages: { month: number; temp: number; precip: number }[] = [];
    for (let m = 1; m <= 12; m++) {
      const temps: number[] = [];
      let precipTotal = 0;
      let precipCount = 0;
      daily.time.forEach((t: string, i: number) => {
        const date = new Date(t);
        if (date.getMonth() + 1 === m) {
          if (daily.temperature_2m_mean[i] != null) temps.push(daily.temperature_2m_mean[i]);
          if (daily.precipitation_sum[i] != null) {
            precipTotal += daily.precipitation_sum[i];
            precipCount++;
          }
        }
      });
      const years = precipCount > 0 ? Math.ceil(precipCount / 30) : 1;
      monthlyAverages.push({
        month: m,
        temp: temps.length > 0 ? Math.round(temps.reduce((a, b) => a + b, 0) / temps.length * 10) / 10 : 0,
        precip: Math.round(precipTotal / years),
      });
    }

    const months = monthlyAverages.map(({ month, temp, precip }) => {
      const tags: SeasonTag[] = [];
      let score = 3;

      if (temp >= 15 && temp <= 28 && precip < 80) score = 5;
      else if (temp >= 10 && temp <= 32 && precip < 120) score = 4;
      else if (temp < 5 || temp > 35 || precip > 200) score = 2;

      if (precip > 150) tags.push('雨季');
      if (temp < 5) tags.push('雪季');
      if ([3, 4, 5].includes(month) && temp >= 10 && temp <= 25) tags.push('花期');
      if ([10, 11].includes(month) && temp >= 5 && temp <= 20) tags.push('枫叶季');

      if (score >= 4) tags.push('旺季');
      else if (score <= 2) tags.push('淡季');
      else tags.push('平季');

      const weatherDesc = `平均气温 ${temp}°C，月降水量 ${precip}mm`;

      return {
        month,
        score,
        weather: weatherDesc,
        temp,
        precip,
        tags,
      };
    });

    setCache(cacheKey, months);
    return NextResponse.json({ months, source: 'open-meteo' });
  } catch {
    return NextResponse.json({ error: 'fetch_failed', months: null }, { status: 200 });
  }
}
