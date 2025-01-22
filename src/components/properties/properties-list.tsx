"use client"

import { useEffect, useState } from "react"
import { databases } from "@/lib/appwrite/config"
import { Query } from "appwrite"
import { PropertyCard } from "./property-card"
import { useAuthStore } from "@/lib/store/auth-store"
import { Models } from "appwrite"

interface Property extends Models.Document {
  name: string
  slug: string
  images: string[]
  location: {
    address: string
    city: string
  }
}

export function PropertiesList() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuthStore()

  useEffect(() => {
    if (!user) return

    const fetchProperties = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          'properties',
          [Query.equal('userId', user.$id)]
        )
        setProperties(response.documents as unknown as Property[])
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [user])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (properties.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">No properties found. Create your first property!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.$id} property={property} />
      ))}
    </div>
  )
} 