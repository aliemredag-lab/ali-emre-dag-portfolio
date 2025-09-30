import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const CONFIG_PATH = path.join(process.cwd(), 'data', 'admin-config.json')

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
  if (process.env.NODE_ENV === 'development') {
    console.log('=== ADMIN AUTH API CALLED ===')
  }

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

        // Generate secure session token
        const timestamp = Date.now()
        const sessionToken = `session-${timestamp}-${Math.random().toString(36).substr(2, 9)}`

        return NextResponse.json({
          success: true,
          message: 'Login successful',
          token: sessionToken
        })
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