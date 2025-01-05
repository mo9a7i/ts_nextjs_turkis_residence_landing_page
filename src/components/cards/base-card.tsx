"use client"

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
}

export function BaseCard({ children, className = "" }: BaseCardProps) {
  return (
    <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-4 border border-teal-100/20 dark:border-slate-700/20 ${className}`}>
      {children}
    </div>
  );
} 