// Security utilities and validation functions
import DOMPurify from 'dompurify'
import validator from 'validator'

export const SECURITY_CONFIG = {
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  SESSION_TIMEOUT: 2 * 60 * 60 * 1000, // 2 hours
  ALLOWED_UPLOAD_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
}

// Advanced input sanitization with DOMPurify and validator
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return ''

  // Remove dangerous HTML/JavaScript
  let sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  })

  // Additional security checks
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/expression\s*\(/gi, '')
    .trim()

  return sanitized
}

// Enhanced input validation
export function validateAndSanitizeText(input: string, maxLength: number = 1000): string {
  if (!input) return ''

  // Validate length
  if (input.length > maxLength) {
    throw new Error(`Input too long. Maximum ${maxLength} characters allowed.`)
  }

  // Sanitize the input
  return sanitizeInput(input)
}

// Advanced email validation
export function validateEmailSecure(email: string): boolean {
  if (!email || typeof email !== 'string') return false

  // Use validator library for robust email validation
  return validator.isEmail(email, {
    allow_utf8_local_part: false,
    require_tld: true,
    allow_ip_domain: false
  }) && email.length <= 254
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

// Admin authentication - DEPRECATED - Use /api/admin/auth instead
// This function is kept for compatibility but should not be used for real authentication
export function isValidAdmin(credentials: { username: string; password: string }): boolean {
  console.warn('⚠️ DEPRECATED: isValidAdmin() should not be used. Use /api/admin/auth endpoint instead.')
  return false // Always return false for security
}

// Client-side rate limiting - DEPRECATED and INSECURE
// This function should NOT be used for security as it can be easily bypassed
// Use server-side rate limiting in API endpoints instead
export function checkRateLimit(identifier: string, action: string): boolean {
  console.warn('⚠️ SECURITY WARNING: Client-side rate limiting is insecure and can be bypassed!')
  console.warn('Use server-side rate limiting in API endpoints instead.')

  // Return true to not block legitimate users, as server-side protection is in place
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

// Content Security Policy - Secure configuration
export function getCSPHeader(): string {
  return [
    "default-src 'self'",
    // Remove unsafe-inline and unsafe-eval for better security
    "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com",
    // Only allow unsafe-inline for styles if absolutely necessary - consider using nonces
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://www.google-analytics.com https://api.vercel.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "media-src 'self'",
    // Add security headers
    "upgrade-insecure-requests"
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