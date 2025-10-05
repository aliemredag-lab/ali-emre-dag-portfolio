"use client"

import { ReactNode, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProtectedContentProps {
  children: ReactNode
  title?: string
  description?: string
}

export function ProtectedContent({ children, title, description }: ProtectedContentProps) {
  const { user, loading, login, register } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>
  }

  if (user) {
    return <>{children}</>
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const result = await login(email, password)

    if (!result.success) {
      setError(result.error || 'Login failed')
    }

    setSubmitting(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const result = await register({
      email,
      password,
      name,
      surname,
      company,
      position
    })

    if (result.success) {
      // Auto login after registration
      await login(email, password)
    } else {
      setError(result.error || 'Registration failed')
    }

    setSubmitting(false)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background via-blue-500/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <Card className="p-8 border-2">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {title || 'Members Only Content'}
              </h2>
              <p className="text-muted-foreground">
                {description || 'Please login or register to access this exclusive content'}
              </p>
            </div>

            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Logging in...' : 'Login'}
                </Button>

                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register')
                      setError('')
                    }}
                    className="text-primary hover:underline"
                  >
                    Don't have an account? Register here
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="surname">Surname *</Label>
                    <Input
                      id="surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reg-email">Email *</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="reg-password">Password *</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Registering...' : 'Register'}
                </Button>

                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login')
                      setError('')
                    }}
                    className="text-primary hover:underline"
                  >
                    Already have an account? Login here
                  </button>
                </div>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
