"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth-store"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth().catch(() => {
      router.push("/auth/login")
    })
  }, [checkAuth, router])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return <>{children}</>
} 