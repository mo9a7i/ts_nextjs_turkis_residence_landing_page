"use client"

import { PropertyForm } from "@/components/properties/property-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary"
import { ErrorBoundaryFallback } from "@/components/properties/error-boundary"
import { PropertyFormSkeleton } from "@/components/properties/property-form-skeleton"

export default function CreatePropertyPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/properties">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create Property</h1>
      </div>
      <ReactErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Suspense fallback={<PropertyFormSkeleton />}>
          <PropertyForm />
        </Suspense>
      </ReactErrorBoundary>
    </div>
  )
} 