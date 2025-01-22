"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function CreatePropertyButton() {
  return (
    <Button asChild>
      <Link href="/dashboard/properties/create">
        <Plus className="h-4 w-4 mr-2" />
        Add Property
      </Link>
    </Button>
  )
} 