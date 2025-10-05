"use client"

import { motion } from "framer-motion"
import { CheckCircle2, TrendingUp, TrendingDown, Award, Target, Lightbulb, BarChart3, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { caseStudies, type CaseStudy } from "@/data/case-studies"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { ProtectedContent } from "@/components/protected-content"

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const { t } = useLanguage()
  const featuredCases = caseStudies.filter(cs => cs.featured)

  return (
    <ProtectedContent
      title="Exclusive Case Studies"
      description="Register to access detailed case studies and success stories"
    >
      <section id="case-studies" className="py-20 bg-gradient-to-b from-background via-background/50 to-background">
        <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 text-sm px-4 py-1.5">
            {t('caseStudies.badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('caseStudies.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('caseStudies.subtitle')}
          </p>
        </motion.div>

        {/* Case Study Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden border-2 hover:border-primary/50"
                onClick={() => setSelectedCase(caseStudy)}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-6 relative z-10">
                  {/* Company & Period */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-1">{caseStudy.company}</h3>
                      <p className="text-sm text-muted-foreground">{caseStudy.period}</p>
                    </div>
                    <Award className="h-6 w-6 text-yellow-500" />
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-semibold mb-4 group-hover:text-primary transition-colors">
                    {caseStudy.title}
                  </h4>

                  {/* Challenge Preview */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      <p className="text-sm font-semibold">{t('caseStudies.challenge')}</p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {caseStudy.challenge.description}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {caseStudy.results.metrics.slice(0, 2).map((metric, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-primary/5 to-purple-500/5 p-3 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          {metric.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-green-500" />
                          )}
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            {metric.change}
                          </span>
                        </div>
                        <p className="text-lg font-bold">{metric.value}</p>
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    {t('caseStudies.readMore')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed View Modal/Expanded Section */}
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          >
            <Card
              className="max-w-5xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Badge className="mb-3">{selectedCase.company}</Badge>
                    <h2 className="text-3xl font-bold mb-2">{selectedCase.title}</h2>
                    <p className="text-muted-foreground">{selectedCase.period}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCase(null)}
                    className="text-2xl"
                  >
                    ×
                  </Button>
                </div>

                {/* Challenge Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Target className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-bold">{selectedCase.challenge.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{selectedCase.challenge.description}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedCase.challenge.keyIssues.map((issue, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0" />
                        <p className="text-sm">{issue}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solution Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Lightbulb className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold">{selectedCase.solution.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{selectedCase.solution.description}</p>
                  <div className="space-y-3 mb-4">
                    {selectedCase.solution.approach.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                  {selectedCase.solution.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.solution.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Results Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold">{selectedCase.results.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{selectedCase.results.description}</p>

                  {/* Metrics Grid */}
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    {selectedCase.results.metrics.map((metric, idx) => (
                      <Card key={idx} className="p-4 bg-gradient-to-br from-primary/5 to-purple-500/5">
                        <div className="flex items-center gap-2 mb-2">
                          {metric.trend === 'up' ? (
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          ) : metric.trend === 'down' ? (
                            <TrendingDown className="h-5 w-5 text-green-500" />
                          ) : null}
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                            {metric.change}
                          </span>
                        </div>
                        <p className="text-3xl font-bold mb-1">{metric.value}</p>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                      </Card>
                    ))}
                  </div>

                  {/* Testimonial */}
                  {selectedCase.results.testimonial && (
                    <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-l-4 border-primary">
                      <p className="text-lg italic mb-4">"{selectedCase.results.testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold">{selectedCase.results.testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{selectedCase.results.testimonial.role}</p>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t">
                  {selectedCase.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
    </ProtectedContent>
  )
}
