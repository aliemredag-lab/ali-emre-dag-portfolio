import { NextRequest, NextResponse } from 'next/server'
import { createCalendarEvent, isSlotAvailable, type BookingData } from '@/lib/google-calendar'

export async function POST(request: NextRequest) {
  try {
    const body: BookingData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.meetingType || !body.date || !body.time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate meeting type
    if (!['15min', '30min', '60min'].includes(body.meetingType)) {
      return NextResponse.json(
        { error: 'Invalid meeting type' },
        { status: 400 }
      )
    }

    // Check if slot is still available
    const duration = parseInt(body.meetingType)
    const available = await isSlotAvailable(body.date, body.time, duration)

    if (!available) {
      return NextResponse.json(
        { error: 'This time slot is no longer available. Please select another time.' },
        { status: 409 }
      )
    }

    // Create the calendar event
    const result = await createCalendarEvent(body)

    return NextResponse.json({
      success: true,
      message: 'Meeting booked successfully!',
      eventId: result.eventId,
      meetLink: result.meetLink,
      calendarLink: result.htmlLink,
    })
  } catch (error) {
    console.error('Error booking meeting:', error)
    return NextResponse.json(
      { error: 'Failed to book meeting. Please try again.' },
      { status: 500 }
    )
  }
}
