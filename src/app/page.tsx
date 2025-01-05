"use client";

import Image from "next/image";
import Link from "next/link";
import properties from "@/data/properties.json";
import { BaseCard } from "@/components/cards/base-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {properties.properties.map((property) => (
                    <Card key={property.id} className="rounded-xl border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-xl border border-teal-100/20 dark:border-slate-700/20">
                    <div>
                        {/* Property Image */}
                        <div className="relative aspect-[16/9] rounded-t-xl overflow-hidden">
                            <Image src={property.images[0]} alt={property.name.en} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle>{property.name.en}</CardTitle>
                        <CardDescription>{property.seo.description.en}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {/* Quick Info */}
                        <div className="flex flex-wrap gap-3 text-sm">
                            {property.amenities.slice(0, 4).map((amenity) => (
                                <span key={amenity.id} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-teal-800">
                                    {amenity.title.en}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full rounded-xl">
                            <Link href={`/${property.id}`}>View Details</Link>
                        </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </div>
    );
}
