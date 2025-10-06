"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Globe, Building2, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

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
  period: string
}

const countriesData: CountryData[] = [
  {
    name: "Turkey",
    code: "TUR",
    coordinates: [35.2433, 38.9637],
    projects: 15,
    companies: ["Renault", "Bosch", "Siemens"],
    keyMetrics: [
      { label: "Operations Managed", value: "€50M+" },
      { label: "Team Size", value: "50+ people" }
    ],
    period: "2018 - Present"
  },
  {
    name: "Germany",
    code: "DEU",
    coordinates: [10.4515, 51.1657],
    projects: 12,
    companies: ["Bosch", "Siemens"],
    keyMetrics: [
      { label: "Digital Transformation", value: "65% automation" },
      { label: "Cost Savings", value: "€2.8M" }
    ],
    period: "2019 - 2022"
  },
  {
    name: "South Korea",
    code: "KOR",
    coordinates: [127.7669, 35.9078],
    projects: 8,
    companies: ["Renault Samsung"],
    keyMetrics: [
      { label: "Production Planning", value: "200K units/year" },
      { label: "Supply Chain", value: "€40M+" }
    ],
    period: "2022 - Present"
  },
  {
    name: "China",
    code: "CHN",
    coordinates: [104.1954, 35.8617],
    projects: 10,
    companies: ["Renault Brilliance"],
    keyMetrics: [
      { label: "Market Operations", value: "Asia-Pacific" },
      { label: "Inventory Value", value: "€35M+" }
    ],
    period: "2022 - Present"
  },
  {
    name: "Algeria",
    code: "DZA",
    coordinates: [1.6596, 28.0339],
    projects: 6,
    companies: ["Renault Algeria"],
    keyMetrics: [
      { label: "Regional Hub", value: "North Africa" },
      { label: "Distribution", value: "€20M+" }
    ],
    period: "2022 - Present"
  },
  {
    name: "Morocco",
    code: "MAR",
    coordinates: [-7.0926, 31.7917],
    projects: 9,
    companies: ["Renault Tanger"],
    keyMetrics: [
      { label: "Production Support", value: "400K units/year" },
      { label: "Logistics Hub", value: "EMEA" }
    ],
    period: "2022 - Present"
  },
  {
    name: "Brazil",
    code: "BRA",
    coordinates: [-51.9253, -14.2350],
    projects: 7,
    companies: ["Renault Brazil"],
    keyMetrics: [
      { label: "Market Coverage", value: "South America" },
      { label: "Operations", value: "€30M+" }
    ],
    period: "2022 - Present"
  },
  {
    name: "Argentina",
    code: "ARG",
    coordinates: [-63.6167, -38.4161],
    projects: 5,
    companies: ["Renault Argentina"],
    keyMetrics: [
      { label: "Regional Operations", value: "Latin America" },
      { label: "Supply Chain", value: "€25M+" }
    ],
    period: "2022 - Present"
  },
  {
    name: "Colombia",
    code: "COL",
    coordinates: [-74.2973, 4.5709],
    projects: 4,
    companies: ["Renault Colombia"],
    keyMetrics: [
      { label: "Market Operations", value: "Andean Region" },
      { label: "Distribution", value: "€15M+" }
    ],
    period: "2022 - Present"
  },
  {
    name: "Mexico",
    code: "MEX",
    coordinates: [-102.5528, 23.6345],
    projects: 6,
    companies: ["Renault Mexico"],
    keyMetrics: [
      { label: "Production Hub", value: "North America" },
      { label: "Logistics", value: "€28M+" }
    ],
    period: "2022 - Present"
  }
]

export function WorldMap() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const { t } = useLanguage()

  return (
    <section id="world-map" className="py-20 bg-gradient-to-b from-background to-background/50">
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
            {t('worldMap.badge', 'Global Presence')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('worldMap.title', 'International Operations Across 10 Countries')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('worldMap.subtitle', 'Managing complex supply chains across multiple countries and continents')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section - Takes 2/3 on large screens */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 140,
                  center: [10, 15]
                }}
                className="w-full h-[600px]"
              >
                <ZoomableGroup>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const isActive = countriesData.some(c => c.code === geo.properties.iso_a3)
                        const isHovered = hoveredCountry === geo.properties.iso_a3

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={isActive ? "#3b82f6" : "#D1D5DB"}
                            stroke="#374151"
                            strokeWidth={0.75}
                            style={{
                              default: {
                                outline: "none",
                                opacity: isActive ? 0.9 : 0.6,
                                transition: "all 250ms"
                              },
                              hover: {
                                outline: "none",
                                opacity: 1,
                                fill: isActive ? "#2563eb" : "#9CA3AF",
                                cursor: isActive ? "pointer" : "default",
                                transition: "all 250ms"
                              },
                              pressed: {
                                outline: "none",
                                opacity: 0.8
                              }
                            }}
                            onMouseEnter={() => {
                              if (isActive) setHoveredCountry(geo.properties.iso_a3)
                            }}
                            onMouseLeave={() => setHoveredCountry(null)}
                          />
                        )
                      })
                    }
                  </Geographies>

                  {/* Markers for countries with data */}
                  {countriesData.map((country) => (
                    <Marker
                      key={country.code}
                      coordinates={country.coordinates}
                      onMouseEnter={() => setHoveredCountry(country.code)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => setSelectedCountry(country)}
                    >
                      <motion.g
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                        className="cursor-pointer"
                      >
                        <circle
                          r={8}
                          fill="#3b82f6"
                          stroke="#fff"
                          strokeWidth={2}
                          className="drop-shadow-lg"
                        />
                        <circle
                          r={12}
                          fill="#3b82f6"
                          opacity={0.3}
                          className="animate-ping"
                        />
                      </motion.g>

                      {/* Country name tooltip on hover */}
                      <AnimatePresence>
                        {hoveredCountry === country.code && (
                          <motion.text
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            textAnchor="middle"
                            y={-15}
                            className="text-xs font-semibold fill-primary pointer-events-none"
                            style={{ textShadow: "0 0 3px white" }}
                          >
                            {country.name}
                          </motion.text>
                        )}
                      </AnimatePresence>
                    </Marker>
                  ))}
                </ZoomableGroup>
              </ComposableMap>

              {/* Map Legend */}
              <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500" />
                  <span>{t('worldMap.activeCountries', 'Active Operations')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>{t('worldMap.clickToView', 'Click markers for details')}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Details Panel - Takes 1/3 on large screens */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedCountry ? (
                <motion.div
                  key={selectedCountry.code}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="p-6 sticky top-24">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{selectedCountry.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedCountry.period}</p>
                      </div>
                      <Badge variant="secondary">{selectedCountry.projects} Projects</Badge>
                    </div>

                    {/* Companies */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="h-4 w-4 text-primary" />
                        <p className="font-semibold text-sm">{t('worldMap.companies', 'Companies')}</p>
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
                        <p className="font-semibold text-sm">{t('worldMap.keyMetrics', 'Key Metrics')}</p>
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
                      {t('worldMap.selectCountry', 'Select a Country')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('worldMap.clickMarkers', 'Click on the map markers to view detailed information about operations in each country')}
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
            { label: t('worldMap.stat1', 'Countries'), value: "10" },
            { label: t('worldMap.stat2', 'Total Projects'), value: countriesData.reduce((acc, c) => acc + c.projects, 0).toString() },
            { label: t('worldMap.stat3', 'Companies'), value: "15+" },
            { label: t('worldMap.stat4', 'Continents'), value: "4" }
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
