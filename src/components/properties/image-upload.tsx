"use client"

import { useCallback, useState } from "react"
import { storage } from "@/lib/appwrite/config"
import { ID } from "appwrite"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash, X } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  value: string[]
  onChange: (value: string[]) => void
  onRemove: (url: string) => void
}

export function ImageUpload({
  value,
  onChange,
  onRemove
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const onUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true)
      const file = e.target.files?.[0]
      if (!file) return

      const fileId = ID.unique()
      const result = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        fileId,
        file
      )

      const url = storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        result.$id
      ).toString()

      onChange([...value, url])
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }, [onChange, value, toast])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {value.map((url) => (
          <div key={url} className="relative aspect-video group">
            <Image
              src={url}
              alt="Property"
              className="object-cover rounded-lg"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              quality={80}
            />
            <button
              onClick={() => onRemove(url)}
              className="absolute top-2 right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        disabled={isUploading}
        onClick={() => document.getElementById('image-upload')?.click()}
      >
        <ImagePlus className="h-4 w-4 mr-2" />
        {isUploading ? "Uploading..." : "Upload Image"}
      </Button>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onUpload}
      />
    </div>
  )
} 