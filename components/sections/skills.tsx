"use client"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { profileData } from "@/data/profile"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import {
  Brain,
  Settings2,
  Layers3,
  UsersRound,
  Globe2,
  Zap,
  Target,
  Award,
  CheckCircle2,
  Sparkles
} from "lucide-react"

export function SkillsSection() {
  const { t } = useLanguage()
  // Function to translate skills based on category
  const getTranslatedSkills = (category: string, skills: string[]) => {
    const translationMap: Record<string, Record<string, string>> = {
      core: {
        "Supply Chain Management": t("skills.core.supplyChain"),
        "Project Management": t("skills.core.projectMgmt"),
        "Budget Management": t("skills.core.budgetMgmt"),
        "KPI & Forecasting": t("skills.core.kpiForecasting"),
        "S&OP": t("skills.core.sop"),
        "Commercial Negotiation": t("skills.core.negotiation"),
        "Relationship Building": t("skills.core.relationship"),
        "Decision Making": t("skills.core.decisionMaking"),
        "Business Strategy": t("skills.core.businessStrategy"),
        "Key Account Management": t("skills.core.keyAccount"),
        "Change Management": t("skills.core.changeMgmt")
      },
      methods: {
        "Lean Manufacturing": t("skills.methods.lean"),
        "Six Sigma": t("skills.methods.sixSigma"),
        "5S": t("skills.methods.5s"),
        "Value Stream Mapping": t("skills.methods.valueStream")
      },
      tools: {
        "SAP ERP": t("skills.tools.sap"),
        "Power BI": t("skills.tools.powerbi")
      },
      soft: {
        "Leadership & team management": t("skills.soft.leadership"),
        "Customer service": t("skills.soft.customer"),
        "Market & sales analysis": t("skills.soft.market")
      }
    }

    return skills.map(skill => translationMap[category]?.[skill] || skill)
  }

  const skillCategories = [
    {
      title: t('skills.core.title'),
      skills: getTranslatedSkills('core', profileData.skills.core),
      icon: <Brain className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500",
      description: "Strategic supply chain management expertise"
    },
    {
      title: t('skills.methods.title'),
      skills: getTranslatedSkills('methods', profileData.skills.methods),
      icon: <Target className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-500",
      description: "Proven optimization frameworks"
    },
    {
      title: t('skills.tools.title'),
      skills: getTranslatedSkills('tools', profileData.skills.tools),
      icon: <Layers3 className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500",
      description: "Advanced technology stack"
    },
    {
      title: t('skills.soft.title'),
      skills: getTranslatedSkills('soft', profileData.skills.soft),
      icon: <UsersRound className="w-6 h-6" />,
      gradient: "from-orange-500 to-red-500",
      description: "Cross-cultural team management"
    }
  ]

  return (
    <Section id="skills" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
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
            <Zap className="w-4 h-4 mr-2" />
            Professional Expertise
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t('skills.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive skill set spanning strategic leadership to technical implementation
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="neo-card h-full bg-gradient-to-br from-muted/20 to-muted/10 border-0 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

                <CardContent className="p-8 relative z-10">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="neo-card bg-gradient-to-br from-primary/5 to-purple-500/5 border-0">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Languages</h3>
                </div>
                <p className="text-muted-foreground">
                  Multilingual communication for global operations
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {profileData.languages.map((language, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    <div className="p-6 rounded-2xl bg-background/50 hover:bg-background/80 transition-colors border border-border/50 hover:border-primary/20">
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-foreground">
                          {language.name}
                        </h4>
                        <Badge
                          className={`
                            ${language.level === 'Native' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : ''}
                            ${language.level === 'Fluent' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ''}
                            ${language.level === 'Conversational' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : ''}
                          `}
                        >
                          {language.level}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Let's leverage these skills to transform your operations
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}