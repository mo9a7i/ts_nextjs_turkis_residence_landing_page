import { databases } from "@/lib/appwrite/config"
import { Query } from "appwrite"
import { notFound } from "next/navigation"

async function getProperty(slug: string) {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      'properties',
      [Query.equal('slug', slug)]
    )

    if (!response.documents.length) {
      return null
    }

    const property = response.documents[0]
    return {
      ...property,
      location: JSON.parse(property.location),
      seo: JSON.parse(property.seo),
      amenities: JSON.parse(property.amenities),
      images: JSON.parse(property.images),
    }
  } catch (error) {
    console.error('Error fetching property:', error)
    return null
  }
}

export default async function PropertyPage({
  params,
}: {
  params: { slug: string }
}) {
  const property = await getProperty(params.slug)

  if (!property) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{property.name}</h1>
      
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {property.images.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={`${property.name} - Image ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Location */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Location</h2>
        <p>{property.location.address}</p>
        <p>{property.location.city}</p>
      </div>

      {/* Amenities */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {property.amenities.map((amenity: string) => (
            <div
              key={amenity}
              className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow"
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 