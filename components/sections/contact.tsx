"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ContactCard } from "@/components/ui/contact-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Download, Linkedin } from "lucide-react"
import { profileData } from "@/data/profile"
import { useLanguage } from "@/lib/language-context"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactSection() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success && result.mailtoLink) {
        // Open mailto link
        window.location.href = result.mailtoLink

        setIsSubmitted(true)
        reset()

        // Reset success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000)
      } else {
        alert(result.message || 'Bir hata oluştu')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Mesaj gönderilemedi. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section id="contact" className="bg-slate-900 dark:bg-slate-900 text-white">
      <Container>
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Get In Touch
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-slate-300 max-w-2xl mx-auto">
            Ready to discuss your next supply chain challenge? Let's connect and explore how we can drive operational excellence together.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <ContactCard
                  icon={<Mail className="w-5 h-5" />}
                  title={t("contact.email")}
                  value={profileData.contact.email}
                  href={`mailto:${profileData.contact.email}`}
                />
                <ContactCard
                  icon={<Phone className="w-5 h-5" />}
                  title={t("contact.phone")}
                  value={profileData.contact.phone}
                  href={`tel:${profileData.contact.phone}`}
                />
                <ContactCard
                  icon={<MapPin className="w-5 h-5" />}
                  title={t("contact.location")}
                  value={profileData.contact.location}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Professional Network</h3>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="outline" className="border-slate-600 text-white hover:bg-slate-700 hover:text-white">
                  <a href="https://www.linkedin.com/in/aliemredag/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn Profile
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Message Sent!</h3>
                  <p className="text-slate-300">Your email client should open shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input
                      placeholder={t("contact.nameLabel")}
                      {...register("name")}
                      className={`bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder={t("contact.emailLabel")}
                      {...register("email")}
                      className={`bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Textarea
                      placeholder={t("contact.messageLabel")}
                      rows={5}
                      {...register("message")}
                      className={`bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 ${errors.message ? "border-red-500" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? t("contact.sending") : t("contact.sendMessage")}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  )
}