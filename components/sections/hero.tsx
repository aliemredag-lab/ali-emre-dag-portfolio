"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, User, Calendar, ExternalLink } from "lucide-react"
import { profileData } from "@/data/profile"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t } = useLanguage()
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Use static profile image from public folder
  useEffect(() => {
    // Always use the static profile.jpg from public folder
    setProfileImage('/profile.jpg')
  }, [])

  return (
    <Section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Floating geometric shapes - optimized with CSS animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl animate-spin-slow" />
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-lg animate-spin-slower" style={{ animationDirection: 'reverse', animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/5 blur-2xl animate-spin-slowest" style={{ animationDelay: '4s' }} />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[75vh] sm:min-h-[80vh] px-2 sm:px-4 lg:px-0">
          {/* Content Left */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-6">

            <motion.h1
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold tracking-tight font-display leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="shimmer-text">{profileData.name}</span>
            </motion.h1>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 backdrop-blur-sm">
                <span className="text-sm sm:text-lg font-semibold text-primary">🌍 {t("hero.title")}</span>
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 lg:px-0">
                {t("hero.description")}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild variant="outline" size="lg" className="neo-card px-8 py-6 text-lg rounded-2xl border-primary/20 hover:border-primary/40">
                <a href="#contact">
                  <Mail className="w-5 h-5 mr-2" />
                  {t("hero.contactMe")}
                </a>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild size="lg" className="neo-card px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="mailto:aliemredag@gmail.com?subject=Meeting%20Request&body=Hello%20Ali%20Emre,%0A%0AI%20would%20like%20to%20schedule%20a%20meeting.%0A%0AName:%0APhone:%0APreferred%20Date:%0APreferred%20Time:%0ATopic:">
                  <Calendar className="w-5 h-5 mr-2" />
                  {t("hero.scheduleMeeting")}
                </a>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild variant="outline" size="lg" className="neo-card px-8 py-6 text-lg rounded-2xl border-primary/20 hover:border-primary/40 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-blue-600">
                <a href="https://www.linkedin.com/in/aliemredag/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {t("hero.linkedin")}
                </a>
              </Button>
            </motion.div>
          </motion.div>
          </div>

          {/* Photo Right */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[24rem] xl:w-[36rem] xl:h-[32rem] rounded-2xl overflow-hidden border-4 border-primary/30 shadow-smooth-lg">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={profileData.name}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/25 to-primary/15 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/30 flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <p className="text-primary/70 text-xs sm:text-sm px-4 text-center">{t("hero.loadingPhoto")}</p>
                  </div>
                )}
              </div>
              {/* Floating animation border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 animate-pulse"></div>
              {/* Background glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-3xl blur-xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Enhanced Animated scroll indicator with text */}
      <motion.a
        href="#about"
        className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 cursor-pointer group z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Scroll text */}
          <motion.p
            className="text-sm font-medium text-primary/70 group-hover:text-primary transition-colors"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll Down
          </motion.p>

          {/* Mouse icon */}
          <motion.div
            className="w-7 h-11 border-2 border-primary/40 rounded-full flex justify-center p-2 group-hover:border-primary transition-colors"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-primary rounded-full"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Down arrow */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-6 h-6 text-primary/60 group-hover:text-primary transition-colors"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </motion.a>
    </Section>
  )
}