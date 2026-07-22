"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

interface PriorityBarChartProps {
  low: number;
  medium: number;
  high: number;
}

export default function PriorityBarChart({
  low,
  medium,
  high,
}: PriorityBarChartProps) {
  const data = [
    { name: "Low", value: low, color: "#94a3a3" },
    { name: "Medium", value: medium, color: "#d69e2e" },
    { name: "High", value: high, color: "#c53030" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">
        Priority breakdown
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              fontSize: 13,
            }}
            formatter={(value) => {
              const num = typeof value === "number" ? value : Number(value);
              return [`${num} task${num === 1 ? "" : "s"}`, "Count"];
            }}
            labelFormatter={(label) => `${label} priority`}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}