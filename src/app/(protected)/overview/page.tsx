
"use client";

import { useEffect, useState } from "react";
import { analyticsAPI, AnalyticsData } from "@/lib/service/task";
import SummaryCards from "./components/summeryCard";
import StatusDonutChart from "./components/statusChart";
import PriorityBarChart from "./components/priorityCard";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      const result = await analyticsAPI();
      if (result.success) {
        setAnalytics(result.data!);
      }
    }
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return <div className="p-6 text-gray-500">Loading analytics...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50">
      <SummaryCards
        totalActive={analytics.summeryCard.totalActive}
        completedToday={analytics.summeryCard.completedToday}
        overdue={analytics.summeryCard.overdue}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusDonutChart
          todo={analytics.statusDistribution.todo}
          inprogress={analytics.statusDistribution.inprogress}
          completed={analytics.statusDistribution.completed}
        />

        <PriorityBarChart
          low={analytics.priorityDistribution.low}
          medium={analytics.priorityDistribution.medium}
          high={analytics.priorityDistribution.high}
        />
      </div>
    </div>
  );
}