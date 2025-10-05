import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')

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
    const { email, password, name, surname, company, position } = body

    // Validation
    if (!email || !password || !name || !surname) {
      return NextResponse.json(
        { error: 'Email, password, name and surname are required' },
        { status: 400 }
      )
    }

    // Read existing users
    let users: User[] = []
    try {
      const data = await fs.readFile(USERS_FILE, 'utf-8')
      users = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet, start with empty array
      users = []
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      surname,
      company: company || '',
      position: position || '',
      approved: true, // Auto-approved
      createdAt: new Date().toISOString()
    }

    users.push(newUser)

    // Save to file
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Registration successful. You can now login.',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        approved: newUser.approved
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
