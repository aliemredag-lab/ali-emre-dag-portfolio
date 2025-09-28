"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, Mail, User, Building } from "lucide-react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir email adresi girin"),
  company: z.string().min(2, "Şirket adı en az 2 karakter olmalı"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı"),
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true)

    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('portfolio-users') || '[]')
    const newUser = {
      id: Date.now(),
      ...data,
      registeredAt: new Date().toISOString()
    }
    users.push(newUser)
    localStorage.setItem('portfolio-users', JSON.stringify(users))

    // Create mailto link
    const subject = `Yeni Üye Kaydı: ${data.name}`
    const body = `Yeni üye kaydı alındı:\n\nİsim: ${data.name}\nEmail: ${data.email}\nŞirket: ${data.company}\n\nMesaj:\n${data.message}`
    const mailtoLink = `mailto:aliemredag97@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoLink

    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <Section id="register" className="bg-gradient-to-br from-primary/5 to-purple-500/5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Üye Ol
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Supply chain dünyasında en son gelişmeleri takip edin ve profesyonel ağınızı genişletin
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="neo-card">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                  <UserPlus className="w-6 h-6 text-primary" />
                  Profesyonel Ağımıza Katılın
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserPlus className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Kaydınız Alındı!</h3>
                    <p className="text-muted-foreground">
                      En kısa sürede sizinle iletişime geçeceğiz.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Adınız Soyadınız"
                            className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                            {...register("name")}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="Email Adresiniz"
                            className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                            {...register("email")}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Şirket/Kurum Adı"
                          className={`pl-10 ${errors.company ? "border-red-500" : ""}`}
                          {...register("company")}
                        />
                      </div>
                      {errors.company && (
                        <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                      )}
                    </div>

                    <div>
                      <Textarea
                        placeholder="İş birliği alanları ve beklentileriniz hakkında kısa bir açıklama..."
                        rows={4}
                        className={errors.message ? "border-red-500" : ""}
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                    >
                      {isSubmitting ? "Gönderiliyor..." : "Üye Ol"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}