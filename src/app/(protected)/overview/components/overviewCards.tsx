type OverviewCardProps = {
  title: string;
  value: number;
  label: string;
  labelColor?: string;
};

export default function OverviewCard({
  title,
  value,
  label,
  labelColor = "text-slate-500",
}: OverviewCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <span className={`text-xs font-medium ${labelColor}`}>
          {label}
        </span>

      </div>

      <h2 className="mt-3 text-4xl font-semibold text-slate-900">
        {value}
      </h2>
    </div>
  );
}