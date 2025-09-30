"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const sessionToken = localStorage.getItem("admin-session")

      // Check if session token exists and has valid format
      if (sessionToken && sessionToken.startsWith("session-") && sessionToken.includes("-")) {
        // Additional validation: check if session is not too old (24 hours)
        const tokenParts = sessionToken.split("-")
        if (tokenParts.length >= 3) {
          const timestamp = parseInt(tokenParts[1])
          const now = Date.now()
          const hoursDiff = (now - timestamp) / (1000 * 60 * 60)

          if (hoursDiff < 24) { // Session valid for 24 hours
            setIsAuthenticated(true)
          } else {
            // Session expired
            localStorage.removeItem("admin-session")
            router.push("/admin/login")
          }
        } else {
          router.push("/admin/login")
        }
      } else {
        router.push("/admin/login")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}