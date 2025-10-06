"use client"

import { ReactNode, useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Lock, Mail, CheckCircle2, ArrowRight, Star, TrendingUp, Award, FileText, Calendar, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MembershipGateProps {
  children: ReactNode
}

export function MembershipGate({ children }: MembershipGateProps) {
  const { user, loading, login, register } = useAuth()
  const [mode, setMode] = useState<'preview' | 'login' | 'register'>('preview')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Allow access only if user is logged in (admin preview removed for security)
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

  const exclusiveFeatures = [
    {
      icon: TrendingUp,
      title: "Key Achievements & Stats",
      description: "Access detailed performance metrics and proven results across global operations"
    },
    {
      icon: Award,
      title: "Success Stories & Case Studies",
      description: "Explore in-depth case studies from Renault, Bosch, and Siemens projects"
    },
    {
      icon: Star,
      title: "Proven Impact & Expertise",
      description: "View comprehensive expertise breakdown and industry-specific achievements"
    },
    {
      icon: Briefcase,
      title: "Portfolio & Projects",
      description: "Browse detailed project portfolio with technologies, outcomes, and metrics"
    },
    {
      icon: FileText,
      title: "LinkedIn Insights & Articles",
      description: "Read exclusive thought leadership content and supply chain insights"
    },
    {
      icon: Calendar,
      title: "Direct Consultation Booking",
      description: "Schedule personalized meetings to discuss your supply chain challenges"
    }
  ]

  if (mode === 'preview') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-blue-500/5 to-background py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Exclusive Member Content
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Register now to unlock premium content, detailed case studies, and exclusive insights from a global supply chain leader
            </p>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Free Registration • Instant Access
            </Badge>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {exclusiveFeatures.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => setMode('register')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setMode('login')}
              className="text-lg px-8"
            >
              Already a Member? Login
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">Trusted by professionals from</p>
            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
              <span className="font-semibold">Renault</span>
              <span className="font-semibold">Bosch</span>
              <span className="font-semibold">Siemens</span>
              <span className="font-semibold">Samsung</span>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-blue-500/5 to-background flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 border-2">
          <div className="text-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMode('preview')}
              className="mb-4"
            >
              ← Back
            </Button>
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="text-muted-foreground">
              {mode === 'login'
                ? 'Login to access exclusive content'
                : 'Register to unlock all premium features'}
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
                  placeholder="Optional"
                />
              </div>

              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Optional"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Creating account...' : 'Create Account'}
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
  )
}
