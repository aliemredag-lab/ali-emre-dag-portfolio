"use client"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { profileData } from "@/data/profile"
import { motion } from "framer-motion"
import {
  CheckCircle,
  Globe,
  TrendingUp,
  Award,
  Users,
  Target,
  Linkedin,
  ArrowRight,
  Sparkles
} from "lucide-react"

export function AboutSection() {
  const achievements = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Operations",
      description: "Led supply chain operations across 9 international markets",
      metric: "9 Countries"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Cost Optimization",
      description: "Delivered strategic cost reductions through data-driven initiatives",
      metric: "€5.5M Saved"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Inventory Excellence",
      description: "Managed complex international inventory portfolios",
      metric: "€120M+ Managed"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Team Leadership",
      description: "Led cross-functional teams across multiple time zones",
      metric: "8+ Years"
    }
  ]

  const coreSkills = [
    "Supply Chain Strategy & Optimization",
    "International Operations Management",
    "Lean Six Sigma Implementation",
    "SAP ERP & Power BI Analytics",
    "Cross-Cultural Team Leadership",
    "Strategic Cost Reduction"
  ]

  return (
    <Section id="about" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            International Supply Chain Expertise
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transforming global supply chains through strategic leadership, innovation, and operational excellence
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Left side - Story & Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="neo-card border-0 bg-gradient-to-br from-background to-muted/10">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">My Journey</h3>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {profileData.about}
                  </p>

                  <div className="pt-4">
                    <Button asChild variant="outline" className="group">
                      <a href="https://www.linkedin.com/in/aliemredag/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        View LinkedIn Profile
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Core Skills */}
            <Card className="neo-card border-0 bg-gradient-to-br from-primary/5 to-purple-500/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  Core Expertise
                </h3>
                <div className="grid gap-3">
                  {coreSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right side - Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">
              Key Achievements
            </h3>

            <div className="grid gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="neo-card border-0 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group bg-gradient-to-br from-muted/20 to-muted/10">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          {achievement.icon}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-foreground">
                              {achievement.title}
                            </h4>
                            <Badge variant="secondary" className="text-xs">
                              {achievement.metric}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Card className="neo-card border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-2">Ready to Optimize Your Supply Chain?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Let's discuss how my international expertise can drive your operational excellence
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <a href="#contact" className="inline-flex items-center">
                      Let's Connect
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}