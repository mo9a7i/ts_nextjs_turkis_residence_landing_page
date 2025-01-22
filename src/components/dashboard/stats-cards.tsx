"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { getUserStats } from "@/lib/appwrite/queries";
import { Building2, Users, CreditCard } from "lucide-react";

export function StatsCards() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (user) {
      getUserStats(user.$id).then(setStats);
    }
  }, [user]);

  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <Building2 className="w-8 h-8 text-teal-500" />
          <div>
            <p className="text-2xl font-bold">{stats.totalProperties}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Properties</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <Users className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-2xl font-bold">{stats.totalVisits}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Visits (30 days)
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <CreditCard className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-2xl font-bold capitalize">
              {stats.subscription?.planId || "Free"}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Current Plan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 