import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { ExpertiseBanner } from "@/components/sections/expertise-banner"
import { AboutSection } from "@/components/sections/about"
import { StatsSection } from "@/components/sections/stats"
import { CaseStudies } from "@/components/sections/case-studies"
import { InsightsBlog } from "@/components/sections/insights-blog"
import { CalendarBooking } from "@/components/sections/calendar-booking"
import { ExperienceSection } from "@/components/sections/experience"
import { SkillsSection } from "@/components/sections/skills"
import { ProjectsSection } from "@/components/sections/projects"
import { EducationSection } from "@/components/sections/education"
import { RegisterSection } from "@/components/sections/register"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { CursorEffect } from "@/components/ui/cursor-effect"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <CursorEffect />
      <Navigation />
      <main>
        <HeroSection />
        <TestimonialsSection />
        <ExpertiseBanner />
        <AboutSection />
        <StatsSection />
        <CaseStudies />
        <InsightsBlog />
        <CalendarBooking />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <RegisterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}