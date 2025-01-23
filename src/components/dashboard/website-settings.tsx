"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuthStore } from "@/lib/store/auth-store"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  websiteName: z.string().min(2).max(255),
})

export function WebsiteSettings() {
  const { user, updateUser } = useAuthStore()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteName: user?.websiteName || 'Turkis Residence',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await updateUser(data)
      toast({
        title: "Success",
        description: "Website settings updated",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="websiteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  )
} 