import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 font-bold text-lg text-primary-700">
            <Compass className="w-5 h-5" />
            <span>TripMate</span>
          </div>
          <p className="body-text text-center">
            用一份真正适合你的旅行攻略，开始下一次出发
          </p>
          <p className="caption">© 2024 TripMate · AI Travel Studio</p>
        </div>
      </div>
    </footer>
  );
}
