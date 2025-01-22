"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth-store"
import { usePropertyStore } from "@/lib/store/property-store"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Button } from "../ui/button"
import { Separator } from "@/components/ui/separator"
import { ImageUpload } from "./image-upload"
import { AmenitiesField } from "./amenities-field"
import { useState, useEffect } from "react"
import { PropertyPreview } from "./property-preview"

const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be less than 255 characters")
    .regex(/^[\w\s-]+$/, "Name can only contain letters, numbers, spaces, and hyphens"),
  slug: z.string()
    .min(2, "Slug must be at least 2 characters")
    .max(255, "Slug must be less than 255 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
    .refine(s => !s.startsWith('-') && !s.endsWith('-'), "Slug cannot start or end with a hyphen"),
  location: z.object({
    address: z.string()
      .min(5, "Address must be at least 5 characters")
      .max(255, "Address must be less than 255 characters")
      .regex(/^[\w\s,.-]+$/, "Address contains invalid characters"),
    city: z.string()
      .min(2, "City must be at least 2 characters")
      .max(255, "City must be less than 255 characters")
      .regex(/^[a-zA-Z\s-]+$/, "City can only contain letters, spaces, and hyphens"),
  }),
  seo: z.object({
    title: z.string()
      .min(5, "Title must be at least 5 characters")
      .max(60, "Title must be less than 60 characters")
      .regex(/^[\w\s,.!?-]+$/, "Title contains invalid characters"),
    description: z.string()
      .min(50, "Description must be at least 50 characters")
      .max(160, "Description must be less than 160 characters")
      .regex(/^[\w\s,.!?-]+$/, "Description contains invalid characters"),
  }),
  amenities: z.array(z.string()
    .min(2, "Amenity must be at least 2 characters")
    .max(50, "Amenity must be less than 50 characters")
    .regex(/^[\w\s-]+$/, "Amenity can only contain letters, numbers, spaces, and hyphens")
  )
    .min(1, "Add at least one amenity")
    .max(20, "Maximum 20 amenities allowed"),
  images: z.array(z.string().url("Invalid image URL"))
    .min(1, "Add at least one image")
    .max(10, "Maximum 10 images allowed"),
})

type FormData = z.infer<typeof formSchema>

export function PropertyForm() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { createProperty, isLoading } = usePropertyStore()
  const { toast } = useToast()
  const [isPreview, setIsPreview] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      location: {
        address: "",
        city: "",
      },
      seo: {
        title: "",
        description: "",
      },
      amenities: [],
      images: [],
    },
    mode: "onChange",
  })

  useEffect(() => {
    const name = form.watch("name")
    if (name) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      form.setValue("slug", slug, { shouldValidate: true })

      const seoTitle = form.watch("seo.title")
      const seoDesc = form.watch("seo.description")
      
      if (!seoTitle) {
        form.setValue("seo.title", name, { shouldValidate: true })
      }
      if (!seoDesc) {
        form.setValue("seo.description", `Discover ${name} - a beautiful property located in the heart of the city.`, { shouldValidate: true })
      }
    }
  }, [form.watch("name")])

  async function onSubmit(data: FormData) {
    try {
      await createProperty(data, user!.$id)
      toast({
        title: "Success",
        description: "Property created successfully",
      })
      router.push("/dashboard/properties")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      {isPreview ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Preview</h2>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPreview(false)}
            >
              Edit
            </Button>
          </div>
          <PropertyPreview data={form.getValues()} />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Basic Information</h2>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Property name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="property-url-slug" 
                        {...field}
                        onChange={(e) => {
                          const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                          field.onChange(slug)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Location</h2>
              <FormField
                control={form.control}
                name="location.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Property address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">SEO</h2>
              <FormField
                control={form.control}
                name="seo.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Title</FormLabel>
                    <FormControl>
                      <Input placeholder="SEO title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seo.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="SEO description" 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Images</h2>
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Images</FormLabel>
                    <FormControl>
                      <ImageUpload 
                        value={field.value} 
                        onChange={field.onChange}
                        onRemove={(url) => {
                          field.onChange(field.value.filter((item) => item !== url))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Amenities</h2>
              <FormField
                control={form.control}
                name="amenities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Amenities</FormLabel>
                    <FormControl>
                      <AmenitiesField
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreview(true)}
              >
                Preview
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Property"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  )
} 