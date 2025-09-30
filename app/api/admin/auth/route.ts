import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CONFIG_PATH = path.join(process.cwd(), 'data', 'admin-config.json')

interface AdminConfig {
  password: string
  lastChanged: string
  version: string
}

// Ensure config file exists - use fallback password for production
function ensureConfigFile(): AdminConfig {
  // For production, use hardcoded password since environment variables might not work
  const productionPassword = 'admin123'

  // Try environment variable first, then fallback to hardcoded
  const password = process.env.ADMIN_PASSWORD || productionPassword

  console.log('Config check:', {
    hasEnvVar: !!process.env.ADMIN_PASSWORD,
    envValue: process.env.ADMIN_PASSWORD,
    finalPassword: password
  })

  // Always return the same structure for consistency
  return {
    password: password,
    lastChanged: new Date().toISOString(),
    version: '1.0'
  }
}

// Simple in-memory rate limiting
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)

  if (!attempts) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now })
    return true
  }

  // Reset if last attempt was more than 15 minutes ago
  if (now - attempts.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now })
    return true
  }

  // Allow max 5 attempts per 15 minutes
  if (attempts.count >= 5) {
    return false
  }

  attempts.count++
  attempts.lastAttempt = now
  return true
}

// Login endpoint
export async function POST(request: NextRequest) {
  console.log('=== ADMIN AUTH API CALLED ===')

  // Rate limiting
  const clientIP = request.ip || 'unknown'
  if (!checkRateLimit(clientIP)) {
    console.log('❌ Rate limit exceeded for IP:', clientIP)
    return NextResponse.json({
      success: false,
      message: 'Too many login attempts. Please try again later.'
    }, { status: 429 })
  }

  try {
    console.log('Parsing request body...')
    const body = await request.json()
    console.log('Request body:', body)

    const { password, action } = body
    console.log('Extracted:', { action, password })

    console.log('Getting config...')
    const config = ensureConfigFile()
    console.log('Config loaded:', config)

    console.log('Login attempt:', {
      action,
      receivedPassword: password,
      expectedPassword: config.password,
      match: password === config.password
    })

    if (action === 'login') {
      console.log('Processing login action...')
      if (password === config.password) {
        console.log('✅ Password match - Login successful')

        // Generate secure session token
        const timestamp = Date.now()
        const sessionToken = `session-${timestamp}-${Math.random().toString(36).substr(2, 9)}`

        return NextResponse.json({
          success: true,
          message: 'Login successful',
          token: sessionToken
        })
      } else {
        console.log('❌ Password mismatch')

        // Add delay to prevent brute force attacks
        await new Promise(resolve => setTimeout(resolve, 1000))

        return NextResponse.json({
          success: false,
          message: 'Invalid password'
        }, { status: 401 })
      }
    }

    if (action === 'change-password') {
      const { currentPassword, newPassword } = await request.json()

      if (currentPassword !== config.password) {
        return NextResponse.json({
          success: false,
          message: 'Current password is incorrect'
        }, { status: 401 })
      }

      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json({
          success: false,
          message: 'New password must be at least 6 characters'
        }, { status: 400 })
      }

      // Update password in config file
      const newConfig: AdminConfig = {
        ...config,
        password: newPassword,
        lastChanged: new Date().toISOString()
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
    const config = ensureConfigFile()
    console.log('Returning config info')
    return NextResponse.json({
      lastChanged: config.lastChanged,
      version: config.version,
      status: 'API is working',
      timestamp: new Date().toISOString()
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