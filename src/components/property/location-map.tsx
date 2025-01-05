"use client"

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BaseCard } from "@/components/cards/base-card";
import type { Location } from "@/types/property";

interface LocationMapProps {
  location: Location;
  lang: "en" | "ar";
}

export function LocationMap({ location, lang }: LocationMapProps) {
  return (
    <BaseCard>
      <h2 className="text-xl font-semibold">Location</h2>
      <div className="overflow-hidden rounded-lg border border-teal-100/20 dark:border-slate-700/20 bg-white/60 dark:bg-slate-900/60">
        <a 
          href={location.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block aspect-video relative w-full max-h-[25vh] hover:opacity-95 transition-opacity"
        >
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.coordinates.lng-0.01}%2C${location.coordinates.lat-0.01}%2C${location.coordinates.lng+0.01}%2C${location.coordinates.lat+0.01}&layer=mapnik&marker=${location.coordinates.lat}%2C${location.coordinates.lng}`}
            style={{ border: 0, pointerEvents: 'none' }}
            className="absolute inset-0"
          />
        </a>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <span className="text-base text-slate-600 dark:text-slate-300">
              {location.address}
            </span>
          </div>
          <Button
            asChild
            variant="outline"
            className="ml-4 rounded-xl"
          >
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Get Directions
              <MapPin className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="px-4 pb-4 pt-2 border-t border-teal-100/20 dark:border-slate-700/20">
          <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
            {location.directions[lang]}
          </p>
        </div>
      </div>
    </BaseCard>
  );
} 