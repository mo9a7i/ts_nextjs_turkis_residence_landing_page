import { Suspense } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/ui/logo";

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full border-b border-teal-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <Logo />
          <ModeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 pt-16 pb-8 md:pt-18">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        }>
          {children}
        </Suspense>
      </main>
    </div>
  );
} 