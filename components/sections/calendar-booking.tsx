"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Video, MessageSquare, CheckCircle2, Phone } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { CalBookingModal } from "@/components/cal-booking-modal"


interface MeetingType {
  title: string
  duration: string
  icon: any
  description: string
  features: string[]
  color: string
  calendlyUrl: string
}

export function CalendarBooking() {
  const { t } = useLanguage()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<{
    calLink: string
    title: string
    color: string
  } | null>(null)

  const meetingTypes: MeetingType[] = [
    {
      title: t('calendar.introCall'),
      duration: '15 min',
      icon: Phone,
      description: t('calendar.introDesc'),
      features: [
        t('calendar.intro1'),
        t('calendar.intro2'),
        t('calendar.intro3')
      ],
      color: 'from-blue-500 to-cyan-500',
      calendlyUrl: 'ali-emre-dag-8mspaz/15min' // Cal.com: 15dk event oluşturduktan sonra link buraya
    },
    {
      title: t('calendar.consultation'),
      duration: '30 min',
      icon: MessageSquare,
      description: t('calendar.consultDesc'),
      features: [
        t('calendar.consult1'),
        t('calendar.consult2'),
        t('calendar.consult3'),
        t('calendar.consult4')
      ],
      color: 'from-purple-500 to-pink-500',
      calendlyUrl: 'ali-emre-dag-8mspaz/30min' // Cal.com: https://cal.com/ali-emre-dag-8mspaz/30min ✅
    },
    {
      title: t('calendar.workshop'),
      duration: '60 min',
      icon: Video,
      description: t('calendar.workshopDesc'),
      features: [
        t('calendar.workshop1'),
        t('calendar.workshop2'),
        t('calendar.workshop3'),
        t('calendar.workshop4'),
        t('calendar.workshop5')
      ],
      color: 'from-orange-500 to-red-500',
      calendlyUrl: 'ali-emre-dag-8mspaz/60min' // Cal.com: 60dk event oluşturduktan sonra link buraya
    }
  ]

  return (
    <section id="book-consultation" className="py-20 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 text-sm px-4 py-1.5">
            <Calendar className="h-3 w-3 mr-2" />
            {t('calendar.badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('calendar.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('calendar.subtitle')}
          </p>
        </motion.div>

        {/* Meeting Types Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {meetingTypes.map((meeting, index) => {
            const Icon = meeting.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 group relative overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${meeting.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                  <div className="p-6 flex-1 flex flex-col relative z-10">
                    {/* Icon & Duration */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${meeting.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {meeting.duration}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {meeting.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-6">
                      {meeting.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6 flex-1">
                      {meeting.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => {
                        setSelectedMeeting({
                          calLink: meeting.calendlyUrl,
                          title: meeting.title,
                          color: meeting.color
                        })
                        setModalOpen(true)
                      }}
                      className={`w-full bg-gradient-to-r ${meeting.color} hover:opacity-90 text-white`}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {t('calendar.bookNow')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="inline-block p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                <span>{t('calendar.videoConference')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{t('calendar.flexible')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{t('calendar.noCharge')}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Alternative Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground mb-4">
            {t('calendar.preferEmail')}
          </p>
          <Button variant="outline" asChild>
            <a href="#contact">
              {t('calendar.contactForm')}
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Booking Modal */}
      {selectedMeeting && (
        <CalBookingModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setSelectedMeeting(null)
          }}
          calLink={selectedMeeting.calLink}
          meetingTitle={selectedMeeting.title}
          meetingColor={selectedMeeting.color}
        />
      )}
    </section>
  )
}
