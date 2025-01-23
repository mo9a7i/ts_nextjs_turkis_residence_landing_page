"use client"

import { PropertyForm } from "@/components/properties/property-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorBoundaryFallback } from "@/components/properties/error-boundary"
import { PropertyFormSkeleton } from "@/components/properties/property-form-skeleton"

export default function CreatePropertyPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Property</h1>
      </div>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Suspense fallback={<PropertyFormSkeleton />}>
          <PropertyForm />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
} 