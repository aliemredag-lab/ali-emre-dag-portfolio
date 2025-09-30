import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CONFIG_PATH = path.join(process.cwd(), 'data', 'admin-config.json')

interface AdminConfig {
  password: string
  lastChanged: string
  version: string
}

// Ensure config file exists - prioritize environment variable
function ensureConfigFile(): AdminConfig {
  // Always prioritize environment variable for production
  if (process.env.ADMIN_PASSWORD) {
    return {
      password: process.env.ADMIN_PASSWORD,
      lastChanged: new Date().toISOString(),
      version: '1.0'
    }
  }

  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      const defaultConfig: AdminConfig = {
        password: 'admin123',
        lastChanged: new Date().toISOString(),
        version: '1.0'
      }
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig, null, 2))
      return defaultConfig
    }

    const configData = fs.readFileSync(CONFIG_PATH, 'utf8')
    return JSON.parse(configData)
  } catch (error) {
    console.error('Config file error:', error)
    return {
      password: 'admin123',
      lastChanged: new Date().toISOString(),
      version: '1.0'
    }
  }
}

// Login endpoint
export async function POST(request: NextRequest) {
  try {
    const { password, action } = await request.json()
    const config = ensureConfigFile()

    console.log('Login attempt:', { action, receivedPassword: password, expectedPassword: config.password })

    if (action === 'login') {
      if (password === config.password) {
        console.log('Login successful')
        return NextResponse.json({
          success: true,
          message: 'Login successful'
        })
      } else {
        console.log('Password mismatch')
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
  try {
    const config = ensureConfigFile()
    return NextResponse.json({
      lastChanged: config.lastChanged,
      version: config.version
    })
  } catch (error) {
    console.error('Get config error:', error)
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 })
  }
}