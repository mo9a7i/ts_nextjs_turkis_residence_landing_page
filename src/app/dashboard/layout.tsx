import { Suspense } from "react";
import { DashboardNav } from "@/components/dashboard/nav";
import { DashboardHeader } from "@/components/dashboard/header";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardNav />

        {/* Main Content */}
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            }>
              {children}
            </Suspense>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
} 