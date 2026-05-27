import { Sparkles, MapPin, CloudSun, Route, CheckCircle, ArrowRight } from 'lucide-react';

export default function AIDemoSection() {
  return (
    <section className="section">
      <div className="text-center mb-12">
        <h2 className="heading-section mb-3">
          看看 AI 如何把一个模糊想法变成具体行程
        </h2>
        <p className="body-text">从一句话到完整攻略，只需要几秒钟</p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0">
        {/* Left card - User input */}
        <div className="flex-1 glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm font-semibold text-foreground">用户输入</span>
            <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
              原始想法
            </span>
          </div>

          {/* Quote block */}
          <blockquote className="border-l-4 border-primary-300 pl-4 py-2 mb-5">
            <p className="text-foreground leading-relaxed">
              &ldquo;国庆想去法国，5 天左右，喜欢拍照和美食，不想太累。&rdquo;
            </p>
          </blockquote>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['法国', '5天', '拍照', '美食', '轻松节奏'].map((tag) => (
              <span
                key={tag}
                className="tag bg-primary-50 text-primary-700 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow connector */}
        <div className="flex items-center justify-center lg:px-6 py-4 lg:py-0">
          <div className="hidden lg:flex w-12 h-12 rounded-full bg-primary-500 text-white items-center justify-center shadow-lg">
            <ArrowRight className="w-5 h-5" />
          </div>
          <div className="lg:hidden w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg rotate-90">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Right card - AI result */}
        <div className="flex-1 card rounded-2xl">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-semibold text-foreground">AI 生成结果</span>
          </div>

          <div className="space-y-5">
            {/* Result item 1 */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">推荐目的地：巴黎</p>
                <p className="caption mt-0.5">
                  10 月天气舒适，适合城市漫步和博物馆
                </p>
              </div>
            </div>

            {/* Result item 2 */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                <Route className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  路线逻辑：卢浮宫 → 奥赛 → 塞纳河 → 铁塔
                </p>
                <p className="caption mt-0.5">同一片区域，减少折返</p>
              </div>
            </div>

            {/* Result item 3 */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <CloudSun className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  季节提醒：秋季最佳
                </p>
                <p className="caption mt-0.5">
                  天气 15-22°C，适合户外
                </p>
              </div>
            </div>

            {/* Result item 4 */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">行前提醒</p>
                <p className="caption mt-0.5">
                  申根签证、博物馆预约、Navigo 交通卡、转换插头
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
