"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface StatusDonutChartProps {
  todo: number;
  inprogress: number;
  completed: number;
}

export default function StatusDonutChart({
  todo,
  inprogress,
  completed,
}: StatusDonutChartProps) {
  const data = [
    { name: "To do", value: todo, color: "#94a3a3" },
    { name: "In progress", value: inprogress, color: "#2563eb" },
    { name: "Completed", value: completed, color: "#15803d" },
  ];

  const hasData = todo + inprogress + completed > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">
        Status distribution
      </h3>

      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={hasData ? data : [{ name: "No data", value: 1, color: "#e5e7eb" }]}
              dataKey="value"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={2}
            >
              {(hasData ? data : [{ color: "#e5e7eb" }]).map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

            {hasData && (
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  fontSize: 13,
                }}
                formatter={(value, name) => {
                  const num = typeof value === "number" ? value : Number(value);
                  return [`${num} task${num === 1 ? "" : "s"}`, name];
                }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>

        <div className="flex gap-4 mt-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-500">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}