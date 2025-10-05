"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Globe, Building2, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface CountryData {
  name: string
  code: string
  coordinates: [number, number]
  projects: number
  companies: string[]
  keyMetrics: {
    label: string
    value: string
  }[]
  continent: string
}

const countriesData: CountryData[] = [
  {
    name: "Turkey",
    code: "TUR",
    coordinates: [35.2433, 38.9637],
    projects: 25,
    companies: ["Renault", "Bosch", "Siemens"],
    continent: "Europe/Asia",
    keyMetrics: [
      { label: "Supply Chain Optimization", value: "40% Efficiency Gain" },
      { label: "Cost Reduction", value: "€2.5M Annual Savings" }
    ]
  },
  {
    name: "Germany",
    code: "DEU",
    coordinates: [10.4515, 51.1657],
    projects: 18,
    companies: ["Bosch", "Siemens"],
    continent: "Europe",
    keyMetrics: [
      { label: "Process Automation", value: "60% Faster Processing" },
      { label: "Quality Improvement", value: "95% First-Pass Yield" }
    ]
  },
  {
    name: "South Korea",
    code: "KOR",
    coordinates: [127.7669, 35.9078],
    projects: 12,
    companies: ["Samsung", "LG"],
    continent: "Asia",
    keyMetrics: [
      { label: "Logistics Efficiency", value: "35% Time Reduction" },
      { label: "Inventory Optimization", value: "€1.8M Savings" }
    ]
  },
  {
    name: "China",
    code: "CHN",
    coordinates: [104.1954, 35.8617],
    projects: 20,
    companies: ["Bosch China", "Siemens China"],
    continent: "Asia",
    keyMetrics: [
      { label: "Production Scale", value: "2M+ Units/Year" },
      { label: "Lead Time Reduction", value: "45% Improvement" }
    ]
  },
  {
    name: "Algeria",
    code: "DZA",
    coordinates: [1.6596, 28.0339],
    projects: 8,
    companies: ["Renault Algeria"],
    continent: "Africa",
    keyMetrics: [
      { label: "Market Expansion", value: "3 New Facilities" },
      { label: "Local Sourcing", value: "55% Increase" }
    ]
  },
  {
    name: "Morocco",
    code: "MAR",
    coordinates: [-7.0926, 31.7917],
    projects: 10,
    companies: ["Renault Morocco"],
    continent: "Africa",
    keyMetrics: [
      { label: "Production Volume", value: "400K Units/Year" },
      { label: "Export Growth", value: "85% to EU Markets" }
    ]
  },
  {
    name: "Brazil",
    code: "BRA",
    coordinates: [-51.9253, -14.2350],
    projects: 15,
    companies: ["Renault Brazil"],
    continent: "South America",
    keyMetrics: [
      { label: "Regional Hub", value: "LATAM Operations" },
      { label: "Supply Chain Network", value: "200+ Suppliers" }
    ]
  },
  {
    name: "Argentina",
    code: "ARG",
    coordinates: [-63.6167, -38.4161],
    projects: 9,
    companies: ["Renault Argentina"],
    continent: "South America",
    keyMetrics: [
      { label: "Manufacturing Plants", value: "2 Facilities" },
      { label: "Annual Capacity", value: "150K Units" }
    ]
  },
  {
    name: "Colombia",
    code: "COL",
    coordinates: [-74.2973, 4.5709],
    projects: 7,
    companies: ["Renault Colombia"],
    continent: "South America",
    keyMetrics: [
      { label: "Market Share", value: "12% Growth" },
      { label: "Distribution Network", value: "80+ Dealers" }
    ]
  },
  {
    name: "Mexico",
    code: "MEX",
    coordinates: [-102.5528, 23.6345],
    projects: 14,
    companies: ["Bosch Mexico", "Renault Mexico"],
    continent: "North America",
    keyMetrics: [
      { label: "NAFTA Operations", value: "Strategic Hub" },
      { label: "Export Volumes", value: "65% to USA" }
    ]
  }
]

export function WorldMap() {
  const { t } = useLanguage()
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)

  const continents = {
    "Europe": countriesData.filter(c => c.continent.includes("Europe")),
    "Asia": countriesData.filter(c => c.continent === "Asia"),
    "Africa": countriesData.filter(c => c.continent === "Africa"),
    "Americas": countriesData.filter(c => c.continent.includes("America"))
  }

  return (
    <section id="world-map" className="py-20 bg-gradient-to-b from-background via-blue-500/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 text-sm px-4 py-1.5">
            <Globe className="h-3 w-3 mr-2" />
            {t('worldMap.badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('worldMap.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('worldMap.subtitle')}
          </p>
        </motion.div>

        {/* Interactive Map by Continents */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Continental Regions */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(continents).map(([continent, countries], idx) => (
                <motion.div
                  key={continent}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-bold">{continent}</h3>
                      <Badge variant="secondary" className="ml-auto">
                        {countries.length} {countries.length === 1 ? 'Country' : 'Countries'}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => setSelectedCountry(country)}
                          className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                            selectedCountry?.code === country.code
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50 hover:bg-accent'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="font-semibold">{country.name}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {country.projects} Projects
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedCountry ? (
                <motion.div
                  key={selectedCountry.code}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="p-6 sticky top-24 border-2 border-primary/50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{selectedCountry.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedCountry.continent}</p>
                      </div>
                      <Badge variant="secondary">{selectedCountry.projects} Projects</Badge>
                    </div>

                    {/* Companies */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="h-4 w-4 text-primary" />
                        <p className="font-semibold text-sm">{t('worldMap.companies')}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCountry.companies.map((company, idx) => (
                          <Badge key={idx} variant="outline">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <p className="font-semibold text-sm">{t('worldMap.keyMetrics')}</p>
                      </div>
                      <div className="space-y-3">
                        {selectedCountry.keyMetrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg"
                          >
                            <p className="text-2xl font-bold mb-1">{metric.value}</p>
                            <p className="text-xs text-muted-foreground">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="p-8 text-center sticky top-24">
                    <Globe className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold mb-2">
                      {t('worldMap.selectCountry')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('worldMap.clickMarkers')}
                    </p>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6 mt-12"
        >
          {[
            { label: t('worldMap.stat1'), value: "10" },
            { label: t('worldMap.stat2'), value: countriesData.reduce((acc, c) => acc + c.projects, 0).toString() },
            { label: t('worldMap.stat3'), value: "15+" },
            { label: t('worldMap.stat4'), value: "4" }
          ].map((stat, idx) => (
            <Card
              key={idx}
              className="p-6 text-center bg-gradient-to-br from-blue-500/5 to-purple-500/5 hover:shadow-lg transition-shadow"
            >
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
