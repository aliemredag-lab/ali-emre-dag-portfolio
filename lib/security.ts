// Security utilities and validation functions

export const SECURITY_CONFIG = {
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  SESSION_TIMEOUT: 2 * 60 * 60 * 1000, // 2 hours
  ALLOWED_UPLOAD_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
    .trim()
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

// Phone validation
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/
  return phoneRegex.test(phone)
}

// Admin authentication check
export function isValidAdmin(credentials: { username: string; password: string }): boolean {
  // In production, this should use hashed passwords and database
  const adminCredentials = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123'
  }

  return credentials.username === adminCredentials.username &&
         credentials.password === adminCredentials.password
}

// Rate limiting check
export function checkRateLimit(identifier: string, action: string): boolean {
  if (typeof window === 'undefined') return true

  const key = `rateLimit_${action}_${identifier}`
  const attempts = JSON.parse(localStorage.getItem(key) || '[]') as number[]
  const now = Date.now()

  // Remove attempts older than 1 hour
  const recentAttempts = attempts.filter(time => now - time < 60 * 60 * 1000)

  // Check if exceeded limit (10 attempts per hour)
  if (recentAttempts.length >= 10) {
    return false
  }

  // Add current attempt
  recentAttempts.push(now)
  localStorage.setItem(key, JSON.stringify(recentAttempts))

  return true
}

// File validation
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!SECURITY_CONFIG.ALLOWED_UPLOAD_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'File type not allowed. Please upload JPEG, PNG, or WebP images only.'
    }
  }

  if (file.size > SECURITY_CONFIG.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File size too large. Maximum size is 5MB.'
    }
  }

  return { valid: true }
}

// Session management
export function isValidSession(): boolean {
  if (typeof window === 'undefined') return false

  const session = localStorage.getItem('admin-auth')
  if (!session) return false

  try {
    const sessionData = JSON.parse(session)
    const now = Date.now()

    // Check if session expired
    if (now > sessionData.expiresAt) {
      localStorage.removeItem('admin-auth')
      return false
    }

    return true
  } catch {
    localStorage.removeItem('admin-auth')
    return false
  }
}

// Create secure session
export function createSession(): void {
  const sessionData = {
    loginTime: Date.now(),
    expiresAt: Date.now() + SECURITY_CONFIG.SESSION_TIMEOUT,
    userId: 'admin'
  }

  localStorage.setItem('admin-auth', JSON.stringify(sessionData))
}

// Content Security Policy
export function getCSPHeader(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://www.google-analytics.com https://api.vercel.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'"
  ].join('; ')
}

// Error logging
export function logSecurityEvent(event: string, details: any): void {
  if (typeof window === 'undefined') return

  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    userAgent: navigator.userAgent,
    url: window.location.href
  }

  // In production, send to logging service
  console.warn('Security Event:', logEntry)

  // Store locally for debugging
  const logs = JSON.parse(localStorage.getItem('security-logs') || '[]')
  logs.push(logEntry)

  // Keep only last 100 logs
  if (logs.length > 100) {
    logs.splice(0, logs.length - 100)
  }

  localStorage.setItem('security-logs', JSON.stringify(logs))
}