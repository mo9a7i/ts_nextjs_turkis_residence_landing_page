import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface PropertyCardProps {
  property: {
    $id: string
    name: string
    slug: string
    images: string[]
    location: {
      address: string
      city: string
    }
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image
            src={property.images[0] || '/placeholder.jpg'}
            alt={property.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{property.name}</h3>
        <div className="flex items-center gap-2 text-muted-foreground mt-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{property.location.city}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild variant="outline">
          <Link href={`/dashboard/properties/${property.$id}`}>
            View Details
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/p/${property.slug}`} target="_blank">
            Preview
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 