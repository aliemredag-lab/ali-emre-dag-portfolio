"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, User, Mail, Phone, Briefcase, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import type { TimeSlot } from '@/lib/google-calendar'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  meetingType: '15min' | '30min' | '60min'
  meetingTitle: string
  meetingColor: string
}

export function BookingModal({ isOpen, onClose, meetingType, meetingTitle, meetingColor }: BookingModalProps) {
  const [step, setStep] = useState<'date' | 'time' | 'details' | 'success'>('date')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [booking, setBooking] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  })

  const [error, setError] = useState('')
  const [meetLink, setMeetLink] = useState('')

  // Generate next 30 days (excluding weekends)
  const generateAvailableDates = () => {
    const dates: Date[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let daysAdded = 0
    let currentDay = 0

    while (daysAdded < 30) {
      const date = new Date(today)
      date.setDate(date.getDate() + currentDay)

      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date)
        daysAdded++
      }

      currentDay++
    }

    return dates
  }

  const availableDates = generateAvailableDates()

  // Fetch available time slots when date is selected
  useEffect(() => {
    if (selectedDate && step === 'time') {
      fetchAvailableSlots()
    }
  }, [selectedDate, step])

  const fetchAvailableSlots = async () => {
    setLoadingSlots(true)
    setError('')

    try {
      const duration = parseInt(meetingType)
      const response = await fetch(`/api/calendar/slots?date=${selectedDate}&duration=${duration}`)

      if (!response.ok) {
        throw new Error('Failed to fetch available slots')
      }

      const data = await response.json()
      setAvailableSlots(data.slots || [])
    } catch (err) {
      setError('Failed to load available time slots. Please try again.')
      console.error(err)
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleBooking = async () => {
    setError('')

    // Validation
    if (!formData.name || !formData.email) {
      setError('Please fill in all required fields')
      return
    }

    setBooking(true)

    try {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          meetingType,
          date: selectedDate,
          time: selectedTime,
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book meeting')
      }

      setMeetLink(data.meetLink || '')
      setStep('success')
    } catch (err: any) {
      setError(err.message || 'Failed to book meeting. Please try again.')
    } finally {
      setBooking(false)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const resetModal = () => {
    setStep('date')
    setSelectedDate('')
    setSelectedTime('')
    setFormData({ name: '', email: '', phone: '', company: '', notes: '' })
    setError('')
    setMeetLink('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <Card className="p-6 relative">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={resetModal}
              className="absolute top-4 right-4"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Header */}
            <div className="mb-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${meetingColor} text-white mb-4`}>
                <Clock className="h-4 w-4" />
                <span className="font-medium">{meetingType}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{meetingTitle}</h2>
              <p className="text-muted-foreground">
                {step === 'date' && 'Select a date for your meeting'}
                {step === 'time' && 'Choose your preferred time'}
                {step === 'details' && 'Enter your contact information'}
                {step === 'success' && 'Your meeting is confirmed!'}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2 mb-6">
              {['date', 'time', 'details', 'success'].map((s, idx) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`h-2 rounded-full flex-1 ${
                    step === s ? `bg-gradient-to-r ${meetingColor}` :
                    ['date', 'time', 'details', 'success'].indexOf(step) > idx ? 'bg-green-500' :
                    'bg-muted'
                  }`} />
                </div>
              ))}
            </div>

            {/* Date Selection */}
            {step === 'date' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {availableDates.map((date) => {
                    const dateString = date.toISOString().split('T')[0]
                    return (
                      <Button
                        key={dateString}
                        variant={selectedDate === dateString ? 'default' : 'outline'}
                        className="flex flex-col h-auto py-3"
                        onClick={() => {
                          setSelectedDate(dateString)
                          setStep('time')
                        }}
                      >
                        <span className="text-xs text-muted-foreground">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-lg font-bold">
                          {date.getDate()}
                        </span>
                        <span className="text-xs">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Time Selection */}
            {step === 'time' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    {selectedDate && formatDate(new Date(selectedDate))}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => setStep('date')}>
                    Change Date
                  </Button>
                </div>

                {loadingSlots ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No available slots for this date.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setStep('date')}>
                      Choose Another Date
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.start}
                        variant={selectedTime === slot.start.split('T')[1].substring(0, 5) ? 'default' : 'outline'}
                        onClick={() => {
                          setSelectedTime(slot.start.split('T')[1].substring(0, 5))
                          setStep('details')
                        }}
                      >
                        {formatTime(slot.start)}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Details Form */}
            {step === 'details' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    {selectedDate && formatDate(new Date(selectedDate))} at {selectedTime && formatTime(`${selectedDate}T${selectedTime}`)}
                  </span>
                  <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setStep('time')}>
                    Change
                  </Button>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="What would you like to discuss?"
                    rows={4}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep('time')} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handleBooking}
                    disabled={booking}
                    className={`flex-1 bg-gradient-to-r ${meetingColor}`}
                  >
                    {booking ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Success */}
            {step === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Meeting Confirmed!</h3>
                <p className="text-muted-foreground mb-6">
                  Your meeting has been scheduled for {selectedDate && formatDate(new Date(selectedDate))} at {selectedTime && formatTime(`${selectedDate}T${selectedTime}`)}
                </p>

                <div className="bg-muted p-4 rounded-lg mb-6 text-left">
                  <p className="text-sm font-medium mb-2">What's next?</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✅ Calendar invite sent to {formData.email}</li>
                    <li>✅ Google Meet link included in invite</li>
                    <li>✅ Reminder 24 hours before meeting</li>
                  </ul>
                </div>

                {meetLink && (
                  <Button asChild className="mb-4">
                    <a href={meetLink} target="_blank" rel="noopener noreferrer">
                      Open Google Meet Link
                    </a>
                  </Button>
                )}

                <Button variant="outline" onClick={resetModal} className="w-full">
                  Close
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
