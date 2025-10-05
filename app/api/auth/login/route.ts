import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

interface User {
  id: string
  email: string
  password: string
  name: string
  surname: string
  company: string
  position: string
  approved: boolean
  createdAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Read users
    let users: User[] = []
    try {
      const data = await fs.readFile(USERS_FILE, 'utf-8')
      users = JSON.parse(data)
    } catch (error) {
      return NextResponse.json(
        { error: 'No users found' },
        { status: 404 }
      )
    }

    // Find user
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if approved
    if (!user.approved) {
      return NextResponse.json(
        { error: 'Your account is pending admin approval' },
        { status: 403 }
      )
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      approved: user.approved
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(JWT_SECRET)

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        company: user.company,
        position: user.position
      }
    })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
