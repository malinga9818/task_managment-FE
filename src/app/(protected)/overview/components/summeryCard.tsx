interface SummaryCardsProps {
  totalActive: number;
  completedToday: number;
  overdue: number;
}

export default function SummaryCards({
  totalActive,
  completedToday,
  overdue,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Total active tasks</span>
          <span className="text-xs text-gray-400 tracking-wide">ACTIVE</span>
        </div>
        <p className="text-3xl font-bold text-slate-800">{totalActive}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Completed today</span>
          <span className="text-xs text-green-600 tracking-wide">TODAY</span>
        </div>
        <p className="text-3xl font-bold text-green-700">{completedToday}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Tasks overdue</span>
          <span className="text-xs text-orange-600 tracking-wide">OVERDUE</span>
        </div>
        <p className="text-3xl font-bold text-orange-700">{overdue}</p>
      </div>
    </div>
  );
}