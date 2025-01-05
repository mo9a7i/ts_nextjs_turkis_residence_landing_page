"use client";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageCard } from "@/components/cards/image-card";
import type { NearbyAttraction } from "@/types/property";

interface NearbyAttractionsProps {
    attractions: NearbyAttraction[];
    lang: "en" | "ar";
}

export function NearbyAttractions({ attractions, lang }: NearbyAttractionsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {attractions.map((attraction, index) => (
                <ImageCard key={index} image={attraction.image}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">{attraction.title[lang]}</h2>
                    <p className="mb-2 text-base opacity-90">{attraction.description[lang]}</p>
                    <p className="text-base font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {attraction.distance[lang]}
                    </p>
                    <Button asChild variant="default" className="mt-3 bg-white hover:bg-white/20 border-none rounded-xl">
                        <a href={attraction.link} target="_blank" rel="noopener noreferrer">
                            Get Directions
                        </a>
                    </Button>
                </ImageCard>
            ))}
        </div>
    );
}
