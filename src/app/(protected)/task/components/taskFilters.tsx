"use client";

interface TasksFilterProps {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
}

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

const priorities = [
  { value: "all", label: "All Priorities" },
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

export default function TasksFilter({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
}: TasksFilterProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 transition-all duration-200 hover:border-gray-300 hover:-translate-y-0.5">
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 min-w-[200px] flex-1 text-sm"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded p-2 min-w-[180px] text-sm"
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded p-2 min-w-[180px] text-sm"
        >
          {priorities.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}