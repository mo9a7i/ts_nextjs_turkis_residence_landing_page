"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, CreditCard, Settings, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: Building2,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Subscription",
    href: "/dashboard/subscription",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 min-h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link href="/dashboard" className="text-2xl font-bold">
            PropertyFlow
          </Link>
        </div>

        <div className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
                  pathname === item.href && "bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 