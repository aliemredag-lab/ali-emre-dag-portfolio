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
import { MembershipGate } from "@/components/membership-gate"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <CursorEffect />
      <Navigation />
      <main>
        <HeroSection />
        <TestimonialsSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />

        {/* Members Only Content */}
        <MembershipGate>
          <ExpertiseBanner />
          <StatsSection />
          <CaseStudies />
          <ProjectsSection />
          <InsightsBlog />
          <CalendarBooking />
        </MembershipGate>

        <RegisterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}