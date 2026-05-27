'use client';

import { useState } from 'react';
import { Flower2, Sun, Leaf, Snowflake } from 'lucide-react';
import { cn } from '@/lib/utils';

const seasons = [
  {
    name: '春天',
    Icon: Flower2,
    gradient: 'from-pink-100 to-rose-50',
    activeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    iconColor: 'text-pink-500',
    items: [
      { place: '日本', highlight: '樱花季', desc: '3-4月满开樱花，目黑川、新宿御苑、上野公园' },
      { place: '荷兰', highlight: '郁金香花海', desc: '4-5月库肯霍夫花园，色彩斑斓的花田' },
      { place: '中国', highlight: '西藏林芝桃花', desc: '3-4月雅鲁藏布江畔，雪山与桃花共舞' },
    ],
  },
  {
    name: '夏天',
    Icon: Sun,
    gradient: 'from-blue-100 to-cyan-50',
    activeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    iconColor: 'text-blue-500',
    items: [
      { place: '日本', highlight: '花火大会', desc: '7-8月全国花火大会，夏日祭典和浴衣体验' },
      { place: '欧洲', highlight: '地中海海岸线', desc: '希腊圣托里尼、克罗地亚、意大利阿马尔菲' },
      { place: '冰岛', highlight: '极昼与冰川', desc: '6-8月午夜阳光，徒步和冰川探险' },
    ],
  },
  {
    name: '秋天',
    Icon: Leaf,
    gradient: 'from-orange-100 to-amber-50',
    activeColor: 'bg-orange-100 text-orange-700 border-orange-200',
    iconColor: 'text-orange-500',
    items: [
      { place: '日本京都', highlight: '枫叶季', desc: '11月红叶狩，岚山、东福寺、永观堂' },
      { place: '加拿大', highlight: '枫叶大道', desc: '9-10月魁北克到尼亚加拉，最美枫叶走廊' },
      { place: '新西兰', highlight: '春季花园', desc: '9-11月南半球春天，鲁冰花和樱花' },
    ],
  },
  {
    name: '冬天',
    Icon: Snowflake,
    gradient: 'from-indigo-100 to-blue-50',
    activeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    iconColor: 'text-indigo-500',
    items: [
      { place: '北海道', highlight: '雪景与温泉', desc: '12-2月粉雪滑雪、雪祭、露天温泉' },
      { place: '瑞士', highlight: '阿尔卑斯滑雪', desc: '12-3月少女峰、采尔马特，世界级雪场' },
      { place: '芬兰', highlight: '北极光', desc: '12-3月拉普兰追光，住玻璃穹顶屋' },
    ],
  },
];

export default function SeasonInspiration() {
  const [active, setActive] = useState(0);
  const season = seasons[active];
  const SeasonIcon = season.Icon;

  return (
    <section className="section">
      <div className="text-center mb-10">
        <h2 className="heading-section mb-3">季节旅行灵感</h2>
        <p className="body-text">
          不同的季节，不同的风景，找到属于你的最佳出行时间
        </p>
      </div>

      {/* Season tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {seasons.map((s, i) => {
          const TabIcon = s.Icon;
          return (
            <button
              key={s.name}
              onClick={() => setActive(i)}
              className={cn(
                'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border',
                active === i
                  ? s.activeColor
                  : 'bg-muted text-muted-foreground border-transparent hover:bg-muted/80'
              )}
            >
              <TabIcon className="w-4 h-4" />
              {s.name}
            </button>
          );
        })}
      </div>

      {/* Season content */}
      <div
        className={cn(
          'bg-gradient-to-br rounded-2xl p-6 md:p-8 transition-all duration-500',
          season.gradient
        )}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {season.items.map((item) => (
            <div
              key={item.place}
              className="glass rounded-xl p-5 hover:bg-white/90 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <SeasonIcon className={cn('w-4 h-4', season.iconColor)} />
                <span className="text-sm font-medium text-muted-foreground">
                  {item.place}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.highlight}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
