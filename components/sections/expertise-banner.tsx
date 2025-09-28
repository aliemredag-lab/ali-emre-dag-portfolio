"use client"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Globe, TrendingUp, Users, Award } from "lucide-react"
import { motion } from "framer-motion"

export function ExpertiseBanner() {
  const achievements = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Leadership",
      description: "9 Countries Operations",
      highlight: "International Supply Chain Expert"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Cost Optimization",
      description: "€5.5M+ Savings Delivered",
      highlight: "Strategic Excellence"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Leadership",
      description: "Multinational Teams",
      highlight: "Cross-Cultural Management"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry Recognition",
      description: "Renault & Bosch Leader",
      highlight: "Proven Track Record"
    }
  ]

  return (
    <Section className="py-16 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 border-y border-primary/10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2 mb-4">
            🏆 International Supply Chain Leadership Excellence
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Transforming Global Operations Across Continents
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Leading complex supply chain transformations for multinational corporations with
            proven expertise in inventory optimization, strategic cost reduction, and international team leadership
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {achievement.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                    <p className="text-sm font-medium text-primary">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground">{achievement.highlight}</p>
                  </div>
                </div>

                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
            <span className="text-sm font-medium text-muted-foreground">
              Ready to optimize your global supply chain?
            </span>
            <Badge className="bg-primary text-primary-foreground">
              Let's Connect
            </Badge>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}