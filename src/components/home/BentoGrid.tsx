import { Sparkles, CloudSun, Route, Camera, CheckCircle, FileText } from 'lucide-react';

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Item 1: AI 个性化攻略生成 - large card */}
      <div className="lg:col-span-2 lg:row-span-2 card card-hover bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="flex flex-col h-full">
          <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="heading-card mb-2">AI 个性化攻略生成</h3>
          <p className="body-text mb-6">
            根据你的目的地、出行时间、预算、兴趣偏好和旅行节奏，自动生成包含景点、美食、拍照和路线的专属攻略。
          </p>
          {/* Mock mini-itinerary */}
          <div className="mt-auto space-y-2">
            {[
              { day: 'Day 1', place: '埃菲尔铁塔' },
              { day: 'Day 2', place: '卢浮宫' },
              { day: 'Day 3', place: '蒙马特' },
            ].map((item) => (
              <div
                key={item.day}
                className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2"
              >
                <span className="text-xs font-semibold text-primary-600 w-10">
                  {item.day}
                </span>
                <span className="text-sm text-foreground">{item.place}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Item 2: 目的地季节雷达 */}
      <div className="lg:col-span-2 card card-hover">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
          <CloudSun className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="heading-card mb-2">目的地季节雷达</h3>
        <p className="body-text mb-4">
          告诉你每个月份的推荐指数，避开雨季台风，抓住限定体验。
        </p>
        {/* Mock month badges */}
        <div className="flex flex-wrap gap-2">
          {[
            { month: '4月', stars: '★★★★★' },
            { month: '7月', stars: '★★★☆☆' },
            { month: '10月', stars: '★★★★★' },
            { month: '12月', stars: '★★★★☆' },
          ].map((item) => (
            <span
              key={item.month}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg"
            >
              {item.month} {item.stars}
            </span>
          ))}
        </div>
      </div>

      {/* Item 3: 景点美食顺路规划 */}
      <div className="card card-hover">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
          <Route className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="heading-card mb-2">景点美食顺路规划</h3>
        <p className="body-text mb-3">
          智能安排路线，减少折返，把时间留给真正的体验。
        </p>
        <div className="text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2 font-medium">
          卢浮宫 → 奥赛 → 铁塔
        </div>
      </div>

      {/* Item 4: 拍照机位推荐 */}
      <div className="card card-hover">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
          <Camera className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="heading-card mb-2">拍照机位推荐</h3>
        <p className="body-text mb-3">
          精选最佳拍摄时间和角度，轻松拍出大片。
        </p>
        <div className="text-xs text-purple-700 bg-purple-50 rounded-lg px-3 py-2 font-medium">
          20+ 精选机位
        </div>
      </div>

      {/* Item 5: 行前准备清单 */}
      <div className="card card-hover">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3">
          <CheckCircle className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="heading-card mb-2">行前准备清单</h3>
        <p className="body-text mb-3">
          签证、保险、电话卡、转换插头，一项都不遗漏。
        </p>
        {/* Mock progress bar at 75% */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>准备进度</span>
            <span>75%</span>
          </div>
          <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-amber-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Item 6: 旅行后复盘 */}
      <div className="card card-hover">
        <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mb-3">
          <FileText className="w-5 h-5 text-rose-600" />
        </div>
        <h3 className="heading-card mb-2">旅行后复盘</h3>
        <p className="body-text mb-3">
          记录实际花费、推荐和踩雷地点，让下次旅行更完美。
        </p>
        <div className="text-xs text-rose-700 bg-rose-50 rounded-lg px-3 py-2 font-medium">
          记录花费与发现
        </div>
      </div>
    </div>
  );
}
