"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

interface FallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: "Error",
      description: error.message || "An error occurred",
      variant: "destructive",
    })
  }, [error, toast])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  )
} 