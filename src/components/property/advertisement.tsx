"use client";

import { Button } from "@/components/ui/button";
import { ImageCard } from "@/components/cards/image-card";
import type { Advertisement as AdvertisementType } from "@/types/property";

interface AdvertisementProps {
    ad: AdvertisementType;
    lang: "en" | "ar";
}

export function Advertisement({ ad, lang }: AdvertisementProps) {
    return (
        <ImageCard image={ad.image}>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{ad.title[lang]}</h2>
            <p className="mb-4">{ad.description[lang]}</p>
            <Button asChild className="rounded-xl">
                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                </a>
            </Button>
        </ImageCard>
    );
}
