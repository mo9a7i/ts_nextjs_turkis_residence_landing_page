import { Suspense } from "react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { PropertyList } from "@/components/dashboard/property-list";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Overview of your PropertyFlow account
        </p>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <StatsCards />
      </Suspense>

      <div className="grid gap-8 md:grid-cols-2">
        <Suspense fallback={<div>Loading activity...</div>}>
          <RecentActivity />
        </Suspense>

        <Suspense fallback={<div>Loading properties...</div>}>
          <PropertyList />
        </Suspense>
      </div>
    </div>
  );
} 