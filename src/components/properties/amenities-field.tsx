"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface AmenitiesFieldProps {
  value: string[]
  onChange: (value: string[]) => void
}

export function AmenitiesField({ value, onChange }: AmenitiesFieldProps) {
  const [newAmenity, setNewAmenity] = useState("")

  const addAmenity = () => {
    if (newAmenity.trim() && !value.includes(newAmenity.trim())) {
      onChange([...value, newAmenity.trim()])
      setNewAmenity("")
    }
  }

  const removeAmenity = (amenity: string) => {
    onChange(value.filter(item => item !== amenity))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newAmenity}
          onChange={(e) => setNewAmenity(e.target.value)}
          placeholder="Add amenity"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addAmenity()
            }
          }}
        />
        <Button type="button" onClick={addAmenity}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
          >
            <span>{amenity}</span>
            <button
              type="button"
              onClick={() => removeAmenity(amenity)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 