export default function RouteSummary({ route }: { route: string }) {
  const stops = route.split(' → ');

  return (
    <div className="bg-gradient-to-r from-primary-50 to-white rounded-xl p-4 border border-primary-100">
      <h4 className="text-xs font-medium text-primary-700 mb-2">🗺️ 当日路线</h4>
      <div className="flex flex-wrap items-center gap-1.5">
        {stops.map((stop, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="bg-white px-2.5 py-1 rounded-lg text-xs font-medium text-gray-700 shadow-sm border border-gray-100">
              {stop}
            </span>
            {i < stops.length - 1 && (
              <span className="text-primary-400 text-xs">→</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
