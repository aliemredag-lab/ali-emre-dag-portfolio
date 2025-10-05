"use client"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Quote, Star, Building2, User } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    {
      quote: t("testimonials.quote1"),
      author: t("testimonials.author1"),
      company: t("testimonials.company1"),
      rating: 5,
      highlight: t("testimonials.highlight1"),
      linkedinUrl: "https://www.linkedin.com/in/aliemredag/",
      linkedinPostUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7234567890123456789/"
    },
    {
      quote: t("testimonials.quote2"),
      author: t("testimonials.author2"),
      company: t("testimonials.company2"),
      rating: 5,
      highlight: t("testimonials.highlight2"),
      linkedinUrl: "https://www.linkedin.com/in/aliemredag/",
      linkedinPostUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7234567890123456790/"
    },
    {
      quote: t("testimonials.quote3"),
      author: t("testimonials.author3"),
      company: t("testimonials.company3"),
      rating: 5,
      highlight: t("testimonials.highlight3"),
      linkedinUrl: "https://www.linkedin.com/in/aliemredag/",
      linkedinPostUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7234567890123456791/"
    }
  ]

  return (
    <Section className="py-24 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
            <Star className="w-4 h-4 mr-2" />
            {t("testimonials.badge")}
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t("testimonials.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="relative overflow-hidden h-full border-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 group">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="relative p-8 z-10">
                  <div className="space-y-6">
                    {/* Modern header with floating elements */}
                    <div className="flex items-start justify-between">
                      <div className="relative">
                        <div className="absolute -top-1 -left-1 w-10 h-10 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500" />
                        <div className="relative p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 backdrop-blur-sm group-hover:border-primary/40 transition-all duration-500">
                          <Quote className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <div key={i} className="relative">
                            <Star className="w-4 h-4 fill-yellow-400/80 text-yellow-400 drop-shadow-sm group-hover:fill-yellow-400 group-hover:scale-110 transition-all duration-300" style={{ animationDelay: `${i * 100}ms` }} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Modern quote design */}
                    <div className="relative">
                      <div className="absolute -left-4 -top-2 text-6xl text-primary/10 font-serif select-none">"</div>
                      <blockquote className="relative text-foreground/90 leading-relaxed text-lg font-medium pl-6">
                        {testimonial.quote}
                      </blockquote>
                      <div className="absolute -right-2 -bottom-2 text-6xl text-primary/10 font-serif select-none">"</div>
                    </div>

                    {/* Modern highlight metric */}
                    <div className="relative p-4 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-purple-500/10 border border-primary/20 backdrop-blur-sm overflow-hidden group-hover:border-primary/30 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative text-center">
                        <div className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-1">
                          {testimonial.highlight}
                        </div>
                        <div className="text-xs font-medium text-primary/60 tracking-wider uppercase">Key Impact</div>
                      </div>
                      {/* Floating particles effect */}
                      <div className="absolute top-2 right-2 w-1 h-1 bg-primary/30 rounded-full animate-pulse" />
                      <div className="absolute bottom-3 left-3 w-1 h-1 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>

                    {/* Modern author info */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-sm" />
                          <div className="relative p-2.5 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 backdrop-blur-sm">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{testimonial.author}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Building2 className="w-3 h-3 text-primary/60" />
                            <span className="text-foreground/60">{testimonial.company}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-6">
                        {testimonial.linkedinPostUrl && (
                          <a
                            href={testimonial.linkedinPostUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 hover:from-blue-500/20 hover:to-blue-600/20 hover:border-blue-500/40 transition-all duration-300 text-sm font-medium backdrop-blur-sm overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <svg className="relative w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <span className="relative">{t("testimonials.originalPost")}</span>
                          </a>
                        )}

                        <a
                          href={testimonial.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-primary hover:from-primary/20 hover:to-purple-500/20 hover:border-primary/40 transition-all duration-300 text-sm font-medium backdrop-blur-sm overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <svg className="relative w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span className="relative">{t("testimonials.linkedinProfile")}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {t("testimonials.viewMore")}
              </span>
            </div>

            <a
              href="https://www.linkedin.com/in/aliemredag/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>{t("testimonials.viewProfile")}</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}