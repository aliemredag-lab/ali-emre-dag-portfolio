"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import { profileData } from "@/data/profile"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log('🔍 Login attempt started:', { password })

    try {
      console.log('📡 Sending request to API...')
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          password: password
        })
      })

      console.log('📨 Response received:', { status: response.status, ok: response.ok })

      const result = await response.json()
      console.log('📄 Response data:', result)

      if (result.success) {
        console.log('✅ Login successful!')
        localStorage.setItem("admin-auth", "true")
        router.push("/admin")
      } else {
        console.log('❌ Login failed:', result.message)
        alert(result.message || "Invalid credentials")
      }
    } catch (error) {
      console.error('💥 Login error:', error)
      alert("Login failed. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <Card className="neo-card">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Access the portfolio dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full glow-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  )
}