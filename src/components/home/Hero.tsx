import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,160,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.06),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
        <div className="animate-fade-in">
          <span className="inline-block text-5xl mb-6">🌍</span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            用一份真正适合你的旅行攻略
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-400">
              开始下一次出发
            </span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            根据目的地、时间、预算、兴趣偏好和旅行节奏，自动生成包含景点、美食、拍照机位、季节提醒、顺路路线和行前清单的个性化攻略。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/planner" className="btn-primary text-base px-8 py-3.5">
              开始生成攻略
            </Link>
            <Link href="/destinations" className="btn-secondary text-base px-8 py-3.5">
              查看热门目的地
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
