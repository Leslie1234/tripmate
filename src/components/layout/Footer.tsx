export default function Footer() {
  return (
    <footer className="border-t border-border bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-lg text-primary-600">
            <span>✈️</span>
            <span>TripMate</span>
          </div>
          <p className="text-sm text-muted-foreground">
            用一份真正适合你的旅行攻略，开始下一次出发
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 TripMate · 智能旅行攻略生成器
          </p>
        </div>
      </div>
    </footer>
  );
}
