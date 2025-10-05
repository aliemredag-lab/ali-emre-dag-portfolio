import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

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

// Get all users
export async function GET() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8')
    const users: User[] = JSON.parse(data)

    // Remove passwords from response
    const sanitizedUsers = users.map(({ password, ...user }) => user)

    return NextResponse.json({ users: sanitizedUsers })
  } catch (error) {
    return NextResponse.json({ users: [] })
  }
}

// Approve/Reject user
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, approved } = body

    if (!userId || typeof approved !== 'boolean') {
      return NextResponse.json(
        { error: 'userId and approved status required' },
        { status: 400 }
      )
    }

    const data = await fs.readFile(USERS_FILE, 'utf-8')
    let users: User[] = JSON.parse(data)

    const userIndex = users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    users[userIndex].approved = approved

    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))

    return NextResponse.json({
      success: true,
      user: {
        id: users[userIndex].id,
        email: users[userIndex].email,
        approved: users[userIndex].approved
      }
    })

  } catch (error) {
    console.error('User approval error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Delete user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId required' },
        { status: 400 }
      )
    }

    const data = await fs.readFile(USERS_FILE, 'utf-8')
    let users: User[] = JSON.parse(data)

    users = users.filter(u => u.id !== userId)

    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('User deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
