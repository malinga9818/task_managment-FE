import OverviewCard from "./components/overviewCards";

export default function Page(){
    return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

      <OverviewCard
        title="Total active tasks"
        value={12}
        label="ACTIVE"
        labelColor="text-slate-600"
      />

      <OverviewCard
        title="Completed today"
        value={4}
        label="TODAY"
        labelColor="text-emerald-600"
      />

      <OverviewCard
        title="Tasks overdue"
        value={2}
        label="OVERDUE"
        labelColor="text-red-600"
      />

    </div>
  );
}