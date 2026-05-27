import Hero from '@/components/home/Hero';
import FeatureCard from '@/components/home/FeatureCard';
import DestinationCard from '@/components/home/DestinationCard';
import SeasonInspiration from '@/components/home/SeasonInspiration';
import { destinations } from '@/data';

const features = [
  { icon: '🎯', title: '个性化攻略生成', description: '根据你的偏好自动生成专属行程，不再千篇一律' },
  { icon: '🌦️', title: '季节与雨季提醒', description: '告诉你最佳出行时间，避开雨季台风，抓住限定体验' },
  { icon: '🗺️', title: '景点美食顺路规划', description: '智能安排路线，减少折返，把时间留给真正的体验' },
  { icon: '📸', title: '拍照打卡机位推荐', description: '精选最佳拍摄时间和角度，轻松拍出大片' },
  { icon: '✅', title: '行前准备清单', description: '签证、保险、电话卡、转换插头，一项都不遗漏' },
  { icon: '📝', title: '旅行后复盘', description: '记录实际花费、推荐和踩雷地点，让下次旅行更完美' },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">为什么选择 TripMate</h2>
          <p className="text-muted-foreground">一站式解决旅行规划中的所有痛点</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      <section className="section bg-gray-50/50">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">热门目的地</h2>
          <p className="text-muted-foreground">精选全球最受欢迎的旅行目的地，点击查看详情</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} dest={dest} />
          ))}
        </div>
      </section>

      <SeasonInspiration />
    </>
  );
}
