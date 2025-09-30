"use client"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { profileData } from "@/data/profile"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import {
  TrendingUp,
  Globe,
  DollarSign,
  Calendar,
  Award,
  Target,
  Sparkles
} from "lucide-react"

export function StatsSection() {
  const { t } = useLanguage()
  const statsWithIcons = [
    {
      ...profileData.kpiStats[0],
      label: t('stats.yearsExp'),
      description: t('stats.yearsExpDesc'),
      icon: <Calendar className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      ...profileData.kpiStats[1],
      label: t('stats.costSaved'),
      description: t('stats.costSavedDesc'),
      icon: <DollarSign className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      ...profileData.kpiStats[2],
      label: t('stats.inventoryManaged'),
      description: t('stats.inventoryManagedDesc'),
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      ...profileData.kpiStats[3],
      label: t('stats.countriesCoverage'),
      description: t('stats.countriesCoverageDesc'),
      icon: <Globe className="w-6 h-6" />,
      gradient: "from-orange-500 to-red-500"
    }
  ]

  return (
    <Section className="py-24 bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
            <Award className="w-4 h-4 mr-2" />
            Proven Track Record
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Key Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Measurable impact across global supply chain operations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsWithIcons.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="relative neo-card h-full bg-gradient-to-br from-background to-muted/20 border-0 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <CardContent className="p-8 text-center relative z-10">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>

                    {/* Value */}
                    <div className="space-y-2">
                      <div className={`text-4xl font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {stat.label}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {stat.description}
                    </p>

                    {/* Sparkle effect */}
                    <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </CardContent>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
            <Target className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Ready to achieve similar results for your organization?
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}