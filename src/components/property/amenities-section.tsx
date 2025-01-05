"use client";

import { BaseCard } from "@/components/cards/base-card";
import { Wifi, Tv, Car, UtensilsCrossed, Waves, Building2, Briefcase, Bath, Microwave, Loader2 } from "lucide-react";
import type { Amenity } from "@/types/property";

const iconMap: Record<string, React.ComponentType<any>> = {
  wifi: Wifi,
  tv: Tv,
  parking: Car,
  kitchen: UtensilsCrossed,
  pool: Waves,
  elevator: Building2,
  waterfront: Waves,
  workspace: Briefcase,
  bathroom: Bath,
  microwave: Microwave,
};

interface AmenitiesSectionProps {
  amenities: Amenity[];
  lang: "en" | "ar";
}

export function AmenitiesSection({ amenities, lang }: AmenitiesSectionProps) {
  return (
    <BaseCard>
      <h2 className="text-2xl font-semibold mb-6">
        {lang === "en" ? "What this place offers" : "ما يقدمه هذا المكان"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {amenities.map((amenity) => {
          const Icon = iconMap[amenity.id] || Loader2;
          return (
            <div key={amenity.id} className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-1 text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <div className="font-medium">{amenity.title[lang]}</div>
                {amenity.description && (
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    {amenity.description[lang]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </BaseCard>
  );
} 