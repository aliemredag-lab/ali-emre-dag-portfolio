"use client"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, BookOpen, Calendar, MapPin, Sparkles, ChevronRight } from "lucide-react"
import { profileData } from "@/data/profile"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

export function EducationSection() {
  const { t } = useLanguage()

  // Translation mapping for degrees
  const translateDegree = (degree: string) => {
    if (degree.includes("Executive MBA")) return t("degree.executiveMBA")
    if (degree.includes("Industrial Engineering")) return t("degree.industrialEngineering")
    if (degree.includes("Mechatronics")) return t("degree.mechatronics")
    return degree
  }

  // Translation mapping for certification categories
  const translateCategory = (category: string) => {
    const categoryMap: Record<string, string> = {
      "Agile & Project Management": t("certCategory.agile"),
      "Operational Excellence & Lean": t("certCategory.lean"),
      "Digital & Analytics": t("certCategory.digital"),
      "Performance & Strategy": t("certCategory.performance")
    }
    return categoryMap[category] || category
  }

  // Translation mapping for individual certifications
  const translateCert = (certName: string) => {
    const certMap: Record<string, string> = {
      "Google Agile PM": t("cert.googleAgilePM"),
      "Scrum Fundamentals": t("cert.scrumFundamentals"),
      "Project Execution & Planning": t("cert.projectExecution"),
      "Operational Excellence Principles": t("cert.opExcellence"),
      "Lean Manufacturing": t("cert.leanManufacturing"),
      "5S": t("cert.5s"),
      "Six Sigma": t("cert.sixSigma"),
      "BPS Systematic": t("cert.bpsSystematic"),
      "Digital Transformation & Building Blocks": t("cert.digitalTransformation"),
      "Power BI Tools": t("cert.powerBI"),
      "Data Visualization": t("cert.dataVisualization"),
      "Performance Management": t("cert.performanceMgmt"),
      "KPI Setting": t("cert.kpiSetting"),
      "Strategy Execution": t("cert.strategyExecution")
    }
    return certMap[certName] || certName
  }

  const groupedCertifications = profileData.certifications.reduce((acc, cert) => {
    const translatedCategory = translateCategory(cert.category)
    if (!acc[translatedCategory]) {
      acc[translatedCategory] = []
    }
    acc[translatedCategory].push(translateCert(cert.name))
    return acc
  }, {} as Record<string, string[]>)

  return (
    <Section id="education" className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            {t("education.academicJourney")}
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t("education.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("education.description")}
          </p>
        </motion.div>

        {/* Education Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="space-y-6">
            {profileData.education.map((edu, index) => (
              <motion.div
                key={`edu-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="neo-card overflow-hidden hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-muted/20 to-muted/10 border-0">
                  <CardContent className="p-0">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-0">
                      {/* Left side - Institution info */}
                      <div className="lg:col-span-4 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-8 flex flex-col">
                        <div className="space-y-6">
                          {/* Institution Icon and Name */}
                          <div className="flex items-start gap-4">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <GraduationCap className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-foreground mb-2">
                                {edu.institution}
                              </h3>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{edu.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Period */}
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="font-medium text-primary">
                              {edu.period}
                            </span>
                          </div>

                          {/* GPA if available */}
                          {edu.gpa && (
                            <div className="mt-auto">
                              <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 px-4 py-2">
                                GPA: {edu.gpa}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right side - Degree details */}
                      <div className="lg:col-span-8 p-8 flex items-center">
                        <div className="w-full">
                          <h4 className="text-2xl font-bold text-foreground mb-4">
                            {translateDegree(edu.degree)}
                          </h4>
                          <p className="text-muted-foreground">
                            Specialized education in supply chain management and international business operations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        {Object.keys(groupedCertifications).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
                <Award className="w-4 h-4 mr-2" />
                {t("education.professionalCerts")}
              </Badge>
              <h3 className="text-3xl font-bold tracking-tight mb-4">
                {t("education.certsCredentials")}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(groupedCertifications).map(([category, certs], index) => (
                <motion.div
                  key={`cert-card-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="neo-card h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-muted/20 to-muted/10 border-0">
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        {/* Header with icon */}
                        <div className="flex items-center gap-4">
                          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-purple-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Award className="w-6 h-6" />
                          </div>
                          <h4 className="text-xl font-bold text-foreground">
                            {category}
                          </h4>
                        </div>

                        {/* Certifications list */}
                        <div className="space-y-3">
                          <h5 className="font-semibold text-foreground flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {t("education.credentials")}
                          </h5>
                          {certs.map((cert, certIndex) => (
                            <div key={certIndex} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm font-medium text-foreground">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </Container>
    </Section>
  )
}