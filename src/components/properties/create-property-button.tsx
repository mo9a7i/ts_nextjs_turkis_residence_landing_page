"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function CreatePropertyButton() {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.push("/dashboard/properties/create")}
      className="flex items-center gap-2"
    >
      <Plus className="h-4 w-4" />
      Add Property
    </Button>
  )
} 