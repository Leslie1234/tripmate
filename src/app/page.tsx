import Hero from '@/components/home/Hero';
import BentoGrid from '@/components/home/BentoGrid';
import DestinationCard from '@/components/home/DestinationCard';
import AIDemoSection from '@/components/home/AIDemoSection';
import SeasonInspiration from '@/components/home/SeasonInspiration';
import { destinations } from '@/data';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Why TripMate */}
      <section className="section">
        <div className="text-center mb-12">
          <h2 className="heading-section mb-3">为什么选择 TripMate</h2>
          <p className="body-text">一站式解决旅行规划中的所有痛点</p>
        </div>
        <BentoGrid />
      </section>

      {/* Popular destinations */}
      <section className="section bg-gradient-to-b from-muted/50 to-background">
        <div className="text-center mb-12">
          <h2 className="heading-section mb-3">热门目的地</h2>
          <p className="body-text">精选全球最受欢迎的旅行目的地，点击查看详情</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} dest={dest} />
          ))}
        </div>
      </section>

      <AIDemoSection />

      <SeasonInspiration />
    </>
  );
}
