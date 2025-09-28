"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, User, Calendar, ExternalLink } from "lucide-react"
import { profileData } from "@/data/profile"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Get profile image from localStorage or use default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedImage = localStorage.getItem('profile-image')
      if (savedImage) {
        setProfileImage(savedImage)
      }
    }
  }, [])

  return (
    <Section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl floating-element"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-lg floating-element"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ animationDelay: "2s" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/5 blur-2xl floating-element"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ animationDelay: "4s" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content Left */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">

            <motion.h1
              className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl font-display"
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
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 backdrop-blur-sm">
                <span className="text-lg font-semibold text-primary">🌍 International Supply Chain Leader</span>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {profileData.title}
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
                  Contact Me
                </a>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild size="lg" className="neo-card px-8 py-6 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="mailto:aliemredag97@gmail.com?subject=Randevu%20Talep&body=Merhaba%20Ali%20Emre,%0A%0ARandevu%20almak%20istiyorum.%0A%0AAdınız:%0ATelefon:%0ATarih%20Tercihi:%0ASaat%20Tercihi:%0AKonu:">
                  <Calendar className="w-5 h-5 mr-2" />
                  Randevu Al
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
                  LinkedIn
                </a>
              </Button>
            </motion.div>
          </motion.div>
          </div>

          {/* Photo Right */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="w-[28rem] h-[24rem] md:w-[36rem] md:h-[32rem] rounded-2xl overflow-hidden border-4 border-primary/20 shadow-smooth-lg">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <User className="w-24 h-24 text-primary/40" />
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

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </Section>
  )
}