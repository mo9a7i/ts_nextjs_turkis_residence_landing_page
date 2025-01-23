"use client"

import { useLanguageStore } from "@/lib/store/language-store"
import { Property } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Wifi } from "lucide-react"

interface PropertyDisplayProps {
  property: Property
}

export function PropertyDisplay({ property }: PropertyDisplayProps) {
  const { language } = useLanguageStore()
  const content = {
    name: property.name[language],
    welcomeMessage: property.welcomeMessage[language],
    directions: property.location.directions[language],
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{content.name}</h1>
      <p className="text-xl mb-8">{content.welcomeMessage}</p>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {property.images.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={`${content.name} - ${i + 1}`}
            className="rounded-lg object-cover h-64 w-full"
          />
        ))}
      </div>

      {/* Location */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location
        </h2>
        <p className="mb-4">{content.directions}</p>
        <Button asChild variant="outline">
          <a href={property.location.googleMapsUrl} target="_blank" rel="noopener">
            Open in Google Maps
          </a>
        </Button>
      </div>

      {/* Wifi */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          Wifi
        </h2>
        <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded font-mono">
          {property.wifi}
        </pre>
      </div>

      {/* Support */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Support
        </h2>
        <Button asChild variant="outline">
          <a href={`tel:${property.supportContact}`}>
            {property.supportContact}
          </a>
        </Button>
      </div>
    </div>
  )
} 