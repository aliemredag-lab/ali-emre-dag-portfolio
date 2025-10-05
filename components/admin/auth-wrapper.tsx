"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check localStorage token (fallback)
        const localToken = localStorage.getItem("admin-session")

        // Verify token with server (checks both cookie and localStorage)
        const response = await fetch('/api/admin/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important: send cookies
          body: JSON.stringify({
            action: 'verify',
            token: localToken
          })
        })

        if (response.ok) {
          const result = await response.json()
          if (result.success && result.admin) {
            setIsAuthenticated(true)
          } else {
            // Invalid session
            localStorage.removeItem("admin-session")
            router.push("/admin/login")
          }
        } else {
          // Unauthorized
          localStorage.removeItem("admin-session")
          router.push("/admin/login")
        }
      } catch (error) {
        console.error('Auth check failed:', error)
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