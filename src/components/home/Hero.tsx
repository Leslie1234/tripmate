import Link from 'next/link';
import { Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-background to-accent-50">
      {/* Decorative gradient circles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(10,157,135,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.08),transparent_50%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                AI 驱动的旅行规划
              </span>
            </div>

            <h1 className="heading-hero animate-slide-up stagger-1">
              把灵感、路线和准备事项
              <br />
              变成一份真正适合你的
              <br />
              <span className="gradient-text">旅行攻略</span>
            </h1>

            <p className="body-text max-w-lg mt-6 mb-8 animate-slide-up stagger-2 mx-auto lg:mx-0">
              TripMate 会根据你的目的地、时间、预算、兴趣偏好和旅行节奏，生成景点、美食、拍照机位、季节提醒、顺路路线和行前清单。
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 animate-slide-up stagger-3">
              <Link
                href="/planner"
                className="btn-primary inline-flex items-center gap-2 text-base"
              >
                <Sparkles className="w-4 h-4" />
                开始生成攻略
              </Link>
              <Link
                href="/destinations"
                className="btn-secondary inline-flex items-center gap-2 text-base"
              >
                <MapPin className="w-4 h-4" />
                探索目的地
              </Link>
            </div>
          </div>

          {/* Right side - AI planning demo card */}
          <div className="lg:w-1/2 relative animate-slide-up stagger-4">
            <div className="glass-strong rounded-3xl p-6">
              {/* Card header */}
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary-500" />
                <span className="font-semibold text-foreground">AI 正在为你规划...</span>
              </div>

              {/* Mock input line */}
              <div className="rounded-xl bg-muted px-4 py-3 mb-5">
                <p className="text-sm text-muted-foreground">
                  10 月 · 巴黎 · 5 天 · 情侣 · 美食 + 拍照
                </p>
              </div>

              {/* Step items */}
              <div className="space-y-3">
                {[
                  '分析季节与天气',
                  '匹配景点和美食',
                  '优化顺路路线',
                  '生成行前清单',
                ].map((step) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span>&#10003; {step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating stat badges */}
            <div className="absolute -top-3 -right-2 glass rounded-xl px-3 py-2 text-xs font-medium animate-float" style={{ animationDelay: '0s' }}>
              推荐指数 ★★★★★
            </div>
            <div className="absolute -bottom-3 -left-2 glass rounded-xl px-3 py-2 text-xs font-medium animate-float" style={{ animationDelay: '0.5s' }}>
              减少 3 次路线折返
            </div>
            <div className="absolute -bottom-3 -right-2 glass rounded-xl px-3 py-2 text-xs font-medium animate-float" style={{ animationDelay: '1s' }}>
              发现 5 个拍照机位
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
