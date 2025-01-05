"use client"

import { BaseCard } from "@/components/cards/base-card";
import type { HouseRule } from "@/types/property";

interface HouseRulesProps {
  rules: HouseRule[];
}

export function HouseRules({ rules }: HouseRulesProps) {
  return (
    <BaseCard>
      <h2 className="text-xl font-semibold">House Rules</h2>
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rules.map((rule, index) => (
          <li key={index} className="flex items-start space-x-3 rounded-lg border border-teal-100/20 dark:border-slate-700/20 bg-white/60 dark:bg-slate-900/60 p-4">
            <span className="text-2xl">{rule.icon}</span>
            <div>
              <strong className="block">{rule.title}</strong>
              <span className="text-base text-slate-600 dark:text-slate-300">{rule.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </BaseCard>
  );
} 