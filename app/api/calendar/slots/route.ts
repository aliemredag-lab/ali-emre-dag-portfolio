import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/google-calendar'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date')
    const duration = searchParams.get('duration')

    if (!date || !duration) {
      return NextResponse.json(
        { error: 'Date and duration are required' },
        { status: 400 }
      )
    }

    const durationMinutes = parseInt(duration)
    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      return NextResponse.json(
        { error: 'Invalid duration' },
        { status: 400 }
      )
    }

    const slots = await getAvailableSlots(date, durationMinutes)

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('Error fetching slots:', error)
    return NextResponse.json(
      { error: 'Failed to fetch available time slots' },
      { status: 500 }
    )
  }
}
