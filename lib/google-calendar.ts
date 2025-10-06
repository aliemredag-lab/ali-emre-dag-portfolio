import { google } from 'googleapis'

// Initialize Google Calendar API
function getCalendarClient() {
  const credentials = {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }

  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ['https://www.googleapis.com/auth/calendar']
  )

  return google.calendar({ version: 'v3', auth })
}

export interface TimeSlot {
  start: string
  end: string
}

export interface BookingData {
  name: string
  email: string
  phone?: string
  company?: string
  meetingType: '15min' | '30min' | '60min'
  date: string
  time: string
  notes?: string
}

/**
 * Get available time slots for a specific date
 */
export async function getAvailableSlots(date: string, duration: number): Promise<TimeSlot[]> {
  const calendar = getCalendarClient()
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  // Set time range for the day
  const startOfDay = new Date(date)
  startOfDay.setHours(9, 0, 0, 0) // Start at 9 AM

  const endOfDay = new Date(date)
  endOfDay.setHours(18, 0, 0, 0) // End at 6 PM

  try {
    // Get existing events for the day
    const response = await calendar.events.list({
      calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    const busySlots = response.data.items || []

    // Generate all possible time slots
    const allSlots: TimeSlot[] = []
    const current = new Date(startOfDay)

    while (current < endOfDay) {
      const slotStart = new Date(current)
      const slotEnd = new Date(current)
      slotEnd.setMinutes(slotEnd.getMinutes() + duration)

      if (slotEnd <= endOfDay) {
        allSlots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
        })
      }

      current.setMinutes(current.getMinutes() + 30) // 30-minute intervals
    }

    // Filter out busy slots
    const availableSlots = allSlots.filter((slot) => {
      const slotStart = new Date(slot.start)
      const slotEnd = new Date(slot.end)

      // Check if slot overlaps with any busy event
      return !busySlots.some((event) => {
        if (!event.start?.dateTime || !event.end?.dateTime) return false

        const eventStart = new Date(event.start.dateTime)
        const eventEnd = new Date(event.end.dateTime)

        return (
          (slotStart >= eventStart && slotStart < eventEnd) ||
          (slotEnd > eventStart && slotEnd <= eventEnd) ||
          (slotStart <= eventStart && slotEnd >= eventEnd)
        )
      })
    })

    return availableSlots
  } catch (error) {
    console.error('Error fetching available slots:', error)
    throw new Error('Failed to fetch available time slots')
  }
}

/**
 * Create a calendar event
 */
export async function createCalendarEvent(booking: BookingData) {
  const calendar = getCalendarClient()
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  // Parse date and time
  const startDateTime = new Date(`${booking.date}T${booking.time}`)
  const durationMinutes = parseInt(booking.meetingType)
  const endDateTime = new Date(startDateTime)
  endDateTime.setMinutes(endDateTime.getMinutes() + durationMinutes)

  // Meeting type descriptions
  const meetingDescriptions = {
    '15min': 'Quick Introduction Call',
    '30min': 'Supply Chain Consultation',
    '60min': 'Strategy Workshop Session',
  }

  const event = {
    summary: `${meetingDescriptions[booking.meetingType]} - ${booking.name}`,
    description: `
Meeting with ${booking.name}
Email: ${booking.email}
${booking.phone ? `Phone: ${booking.phone}` : ''}
${booking.company ? `Company: ${booking.company}` : ''}

Notes: ${booking.notes || 'No additional notes'}

---
Booked via ali-emre-dag.com
    `.trim(),
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'Europe/Istanbul', // Türkiye timezone
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'Europe/Istanbul',
    },
    attendees: [
      { email: booking.email, displayName: booking.name },
    ],
    conferenceData: {
      createRequest: {
        requestId: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet', // Google Meet link
        },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 1 day before
        { method: 'popup', minutes: 30 }, // 30 minutes before
      ],
    },
  }

  try {
    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1, // Required for Google Meet
      sendUpdates: 'all', // Send email notifications
    })

    return {
      success: true,
      eventId: response.data.id,
      meetLink: response.data.hangoutLink,
      htmlLink: response.data.htmlLink,
    }
  } catch (error) {
    console.error('Error creating calendar event:', error)
    throw new Error('Failed to create calendar event')
  }
}

/**
 * Check if a time slot is available
 */
export async function isSlotAvailable(date: string, time: string, duration: number): Promise<boolean> {
  const calendar = getCalendarClient()
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  const startDateTime = new Date(`${date}T${time}`)
  const endDateTime = new Date(startDateTime)
  endDateTime.setMinutes(endDateTime.getMinutes() + duration)

  try {
    const response = await calendar.events.list({
      calendarId,
      timeMin: startDateTime.toISOString(),
      timeMax: endDateTime.toISOString(),
      singleEvents: true,
    })

    // If there are any events in this time range, slot is not available
    return (response.data.items?.length || 0) === 0
  } catch (error) {
    console.error('Error checking slot availability:', error)
    throw new Error('Failed to check slot availability')
  }
}
