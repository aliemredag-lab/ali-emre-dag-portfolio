import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

const CONFIG_PATH = path.join(process.cwd(), 'data', 'admin-config.json')
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production-2024!'
const SESSION_DURATION = 24 * 60 * 60 // 24 hours in seconds

interface AdminConfig {
  passwordHash: string
  lastChanged: string
  version: string
}

// Ensure config file exists with secure hashed password
async function ensureConfigFile(): Promise<AdminConfig> {
  try {
    // Try to read existing config
    if (fs.existsSync(CONFIG_PATH)) {
      const configData = fs.readFileSync(CONFIG_PATH, 'utf8')
      const config = JSON.parse(configData)

      // If config has old plaintext password, convert to hash
      if (config.password && !config.passwordHash) {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔄 Converting plaintext password to hash...')
        }
        const passwordHash = await bcrypt.hash(config.password, 12)
        const newConfig = {
          passwordHash,
          lastChanged: new Date().toISOString(),
          version: '2.0'
        }
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(newConfig, null, 2))
        return newConfig
      }

      // Return existing hashed config
      if (config.passwordHash) {
        return config
      }
    }
  } catch (error) {
    console.log('Config file not found or corrupted, creating new one...')
  }

  // Create new config with secure default
  const defaultPassword = process.env.ADMIN_PASSWORD || 'SecureAdmin2024!'
  const passwordHash = await bcrypt.hash(defaultPassword, 12)

  const newConfig: AdminConfig = {
    passwordHash,
    lastChanged: new Date().toISOString(),
    version: '2.0'
  }

  // Ensure directory exists
  const configDir = path.dirname(CONFIG_PATH)
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true })
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(newConfig, null, 2))

  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Created secure config with hashed password')
  }
  return newConfig
}

// Enhanced in-memory rate limiting with progressive delays
const loginAttempts = new Map<string, { count: number; lastAttempt: number; blockedUntil?: number }>()

const checkRateLimit = (ip: string): { allowed: boolean; retryAfter?: number } => {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)

  if (!attempts) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now })
    return { allowed: true }
  }

  // Check if IP is temporarily blocked
  if (attempts.blockedUntil && now < attempts.blockedUntil) {
    const retryAfter = Math.ceil((attempts.blockedUntil - now) / 1000)
    return { allowed: false, retryAfter }
  }

  // Reset if last attempt was more than 15 minutes ago
  if (now - attempts.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now })
    return { allowed: true }
  }

  // Progressive blocking:
  // 5-10 attempts: 60 sec block
  // 10-15 attempts: 5 min block
  // 15+ attempts: 30 min block
  if (attempts.count >= 15) {
    const blockedUntil = now + (30 * 60 * 1000) // 30 minutes
    loginAttempts.set(ip, { ...attempts, blockedUntil })
    return { allowed: false, retryAfter: 1800 }
  } else if (attempts.count >= 10) {
    const blockedUntil = now + (5 * 60 * 1000) // 5 minutes
    loginAttempts.set(ip, { ...attempts, blockedUntil })
    return { allowed: false, retryAfter: 300 }
  } else if (attempts.count >= 5) {
    return { allowed: false, retryAfter: 60 }
  }

  attempts.count++
  attempts.lastAttempt = now
  return { allowed: true }
}

// Clean up old entries periodically (every hour)
setInterval(() => {
  const now = Date.now()
  const oneHourAgo = now - (60 * 60 * 1000)

  Array.from(loginAttempts.entries()).forEach(([ip, data]) => {
    if (data.lastAttempt < oneHourAgo && (!data.blockedUntil || data.blockedUntil < now)) {
      loginAttempts.delete(ip)
    }
  })
}, 60 * 60 * 1000) // Run every hour

// Login endpoint
export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    console.log('=== ADMIN AUTH API CALLED ===')
  }

  // Rate limiting
  const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const rateLimitResult = checkRateLimit(clientIP)

  if (!rateLimitResult.allowed) {
    console.log('❌ Rate limit exceeded for IP:', clientIP)
    const response = NextResponse.json({
      success: false,
      message: `Too many login attempts. Please try again in ${rateLimitResult.retryAfter} seconds.`,
      retryAfter: rateLimitResult.retryAfter
    }, { status: 429 })

    if (rateLimitResult.retryAfter) {
      response.headers.set('Retry-After', rateLimitResult.retryAfter.toString())
    }

    return response
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Parsing request body...')
    }
    const body = await request.json()
    if (process.env.NODE_ENV === 'development') {
      console.log('Request body received')
    }

    const { password, action } = body
    if (process.env.NODE_ENV === 'development') {
      console.log('Extracted:', { action, passwordLength: password?.length })
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Getting config...')
    }
    const config = await ensureConfigFile()
    if (process.env.NODE_ENV === 'development') {
      console.log('Config loaded (hash hidden for security)')
    }

    if (action === 'login') {
      if (process.env.NODE_ENV === 'development') {
        console.log('Processing login action...')
      }

      // Verify password against hash
      const isValidPassword = await bcrypt.compare(password, config.passwordHash)
      if (process.env.NODE_ENV === 'development') {
        console.log('Password verification result:', isValidPassword)
      }

      if (isValidPassword) {
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Password match - Login successful')
        }

        // Generate JWT token
        const token = jwt.sign(
          {
            admin: true,
            iat: Math.floor(Date.now() / 1000)
          },
          JWT_SECRET,
          { expiresIn: SESSION_DURATION }
        )

        // Create HTTP-only cookie
        const cookie = serialize('admin-token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: SESSION_DURATION,
          path: '/'
        })

        const response = NextResponse.json({
          success: true,
          message: 'Login successful',
          token // Still send token for localStorage fallback
        })

        response.headers.set('Set-Cookie', cookie)
        return response
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log('❌ Password mismatch')
        }

        // Add delay to prevent brute force attacks
        await new Promise(resolve => setTimeout(resolve, 1000))

        return NextResponse.json({
          success: false,
          message: 'Invalid password'
        }, { status: 401 })
      }
    }

    if (action === 'logout') {
      // Clear the cookie
      const cookie = serialize('admin-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      })

      const response = NextResponse.json({
        success: true,
        message: 'Logged out successfully'
      })

      response.headers.set('Set-Cookie', cookie)
      return response
    }

    if (action === 'verify') {
      // Check for token in cookies or body
      const cookieHeader = request.headers.get('cookie')
      let token = body.token

      if (cookieHeader) {
        const cookies = cookieHeader.split(';').map(c => c.trim())
        const adminCookie = cookies.find(c => c.startsWith('admin-token='))
        if (adminCookie) {
          token = adminCookie.split('=')[1]
        }
      }

      if (!token) {
        return NextResponse.json({
          success: false,
          message: 'No token provided'
        }, { status: 401 })
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { admin: boolean; iat: number }
        return NextResponse.json({
          success: true,
          message: 'Token is valid',
          admin: decoded.admin
        })
      } catch (error) {
        return NextResponse.json({
          success: false,
          message: 'Invalid or expired token'
        }, { status: 401 })
      }
    }

    if (action === 'change-password') {
      const { currentPassword, newPassword } = body

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, config.passwordHash)
      if (!isCurrentPasswordValid) {
        return NextResponse.json({
          success: false,
          message: 'Current password is incorrect'
        }, { status: 401 })
      }

      if (!newPassword || newPassword.length < 8) {
        return NextResponse.json({
          success: false,
          message: 'New password must be at least 8 characters'
        }, { status: 400 })
      }

      // Hash new password
      const newPasswordHash = await bcrypt.hash(newPassword, 12)

      // Update password in config file
      const newConfig: AdminConfig = {
        passwordHash: newPasswordHash,
        lastChanged: new Date().toISOString(),
        version: '2.0'
      }

      fs.writeFileSync(CONFIG_PATH, JSON.stringify(newConfig, null, 2))

      return NextResponse.json({
        success: true,
        message: 'Password changed successfully'
      })
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid action'
    }, { status: 400 })

  } catch (error) {
    console.error('Auth API error:', error)
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 })
  }
}

// Get current config (without password)
export async function GET() {
  console.log('=== GET CONFIG API CALLED ===')
  try {
    const config = await ensureConfigFile()
    console.log('Returning config info')
    return NextResponse.json({
      lastChanged: config.lastChanged,
      version: config.version,
      status: 'API is working',
      timestamp: new Date().toISOString(),
      security: 'bcrypt-enabled'
    })
  } catch (error) {
    console.error('Get config error:', error)
    return NextResponse.json({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}