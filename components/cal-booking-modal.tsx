"use client"

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Cal, { getCalApi } from '@calcom/embed-react'

interface CalBookingModalProps {
  isOpen: boolean
  onClose: () => void
  calLink: string
  meetingTitle: string
  meetingColor: string
}

export function CalBookingModal({ isOpen, onClose, calLink, meetingTitle, meetingColor }: CalBookingModalProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi()
      cal("ui", {
        "theme": "light",
        "styles": { "branding": { "brandColor": "#6366f1" } },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      })
    })()
  }, [])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          <Card className="p-6 relative">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 z-10"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{meetingTitle}</h2>
              <p className="text-muted-foreground">
                Select a convenient time for your consultation
              </p>
            </div>

            {/* Cal.com Embed */}
            <div className="min-h-[600px]">
              <Cal
                calLink={calLink}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{
                  layout: 'month_view',
                  theme: 'light'
                }}
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
