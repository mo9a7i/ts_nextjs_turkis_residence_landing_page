"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { databases } from "@/lib/appwrite/config"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { usePropertyStore } from "@/lib/store/property-store"

interface Property {
  $id: string
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
  createdAt: string
}

export default function PropertyDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const { deleteProperty } = usePropertyStore()

  useEffect(() => {
    databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      'properties',
      params.id
    ).then(doc => {
      setProperty({
        ...doc,
        location: JSON.parse(doc.location),
        seo: JSON.parse(doc.seo),
        amenities: JSON.parse(doc.amenities),
        images: JSON.parse(doc.images),
      })
      setIsLoading(false)
    }).catch(() => {
      toast({
        title: "Error",
        description: "Property not found",
        variant: "destructive",
      })
      router.push("/dashboard/properties")
    })
  }, [params.id, router, toast])

  const handleDelete = async () => {
    if (!property) return
    
    try {
      await deleteProperty(property.$id)
      toast({
        title: "Success",
        description: "Property deleted successfully",
      })
      router.push("/dashboard/properties")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete property",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  if (!property) return null

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{property.name}</h1>
        </div>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={handleDelete}
          className="flex items-center gap-2"
        >
          <Trash className="h-4 w-4" />
          Delete Property
        </Button>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {property.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${property.name} - Image ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Location</h2>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
            <p>{property.location.address}</p>
            <p>{property.location.city}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">SEO</h2>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
            <p className="font-medium">{property.seo.title}</p>
            <p className="text-slate-600 dark:text-slate-300">{property.seo.description}</p>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {property.amenities.map((amenity) => (
            <div
              key={amenity}
              className="p-3 bg-white dark:bg-slate-800 rounded-lg"
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 