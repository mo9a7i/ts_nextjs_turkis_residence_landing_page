"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SEOPreview } from "./seo-preview"

interface PropertyPreviewProps {
  data: {
    name: string
    slug: string
    location: {
      address: string
      city: string
    }
    seo: {
      title: string
      description: string
    }
    amenities: string[]
    images: string[]
  }
}

export function PropertyPreview({ data }: PropertyPreviewProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % data.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + data.images.length) % data.images.length)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="relative aspect-video">
          {data.images.length > 0 && (
            <>
              <Image
                src={data.images[currentImage]}
                alt={`${data.name} - Image ${currentImage + 1}`}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {data.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevImage}
                    className="rounded-full bg-white/80 hover:bg-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextImage}
                    className="rounded-full bg-white/80 hover:bg-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                {currentImage + 1} / {data.images.length}
              </div>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <MapPin className="h-4 w-4" />
              <span>{data.location.city}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Location</h2>
            <p>{data.location.address}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {data.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="bg-secondary px-2 py-1 rounded-md text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <SEOPreview
        title={data.seo.title}
        description={data.seo.description}
        url={`https://yourwebsite.com/p/${data.slug}`}
      />

      <div className="grid grid-cols-4 gap-4">
        {data.images.map((image, index) => (
          <div
            key={image}
            className={`relative aspect-video cursor-pointer rounded-lg overflow-hidden ${
              index === currentImage ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <Image
              src={image}
              alt={`${data.name} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 20vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
} 