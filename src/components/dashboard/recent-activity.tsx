"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { getRecentActivity } from "@/lib/appwrite/queries";
import { formatDistanceToNow } from "date-fns";
import { Activity, Globe, Home } from "lucide-react";

interface PageVisit {
  $id: string;
  pageType: 'marketing' | 'property' | 'admin';
  timestamp: string;
  visitorIp: string;
  userAgent: string;
}

export function RecentActivity() {
  const { user } = useAuthStore();
  const [activity, setActivity] = useState<PageVisit[]>([]);

  useEffect(() => {
    if (user) { 
      getRecentActivity(user.$id).then((activity) => {
        setActivity(activity as unknown as PageVisit[]);
      });
    }
  }, [user]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'marketing':
        return <Globe className="w-4 h-4" />;
      case 'property':
        return <Home className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-semibold">Recent Activity</h3>
      </div>
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {activity.length === 0 ? (
          <p className="p-6 text-center text-slate-500 dark:text-slate-400">
            No recent activity
          </p>
        ) : (
          activity.map((visit) => (
            <div key={visit.$id} className="p-4 flex items-center gap-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                {getIcon(visit.pageType)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium capitalize">
                  {visit.pageType} Page Visit
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {visit.visitorIp} • {visit.userAgent}
                </p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formatDistanceToNow(new Date(visit.timestamp), { addSuffix: true })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 