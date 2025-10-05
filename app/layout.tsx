import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/language-context'
import { Chatbot } from '@/components/chatbot'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Ali Emre Dağ - International Supply Chain Leader & Global Operations Expert',
    template: '%s | Ali Emre Dağ'
  },
  description: 'Results-driven Global Supply Chain Manager with 8+ years of proven expertise across global procurement, production planning, logistics orchestration, and multinational project leadership. Managing €120M+ inventory portfolios and delivering €5.5M+ in operational savings.',
  keywords: [
    'supply chain management',
    'global operations',
    'logistics',
    'inventory management',
    'procurement',
    'production planning',
    'Lean Six Sigma',
    'SAP ERP',
    'Power BI',
    'operations management',
    'project management',
    'Renault',
    'Bosch',
    'international business',
    'supply chain optimization'
  ],
  authors: [{ name: 'Ali Emre Dağ', url: 'https://aliemredag.com' }],
  creator: 'Ali Emre Dağ',
  publisher: 'Ali Emre Dağ',
  metadataBase: new URL('https://aliemredag.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'tr-TR': '/tr',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'tr_TR',
    url: 'https://aliemredag.com',
    title: 'Ali Emre Dağ - International Supply Chain Leader & Global Operations Expert',
    description: 'Results-driven Global Supply Chain Manager with 8+ years of proven expertise. Managing €120M+ inventory portfolios and delivering €5.5M+ in operational savings.',
    siteName: 'Ali Emre Dağ - Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Ali Emre Dağ - Supply Chain Leader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ali Emre Dağ - International Supply Chain Leader',
    description: 'Results-driven Global Supply Chain Manager with 8+ years of proven expertise across global operations.',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Google Search Console'dan alacaksınız
  },
  category: 'business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ali Emre Dağ",
              "jobTitle": "International Supply Chain Leader & Global Operations Expert",
              "url": "https://aliemredag.com",
              "email": "aliemredag@gmail.com",
              "telephone": "+90 531 765 98 73",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bursa",
                "addressCountry": "TR"
              },
              "worksFor": {
                "@type": "Organization",
                "name": "Renault Group"
              },
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "Istanbul Aydın University",
                  "url": "https://www.aydin.edu.tr"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "Eastern Mediterranean University"
                }
              ],
              "knowsAbout": [
                "Supply Chain Management",
                "Logistics",
                "Inventory Management",
                "Lean Six Sigma",
                "SAP ERP",
                "Power BI",
                "Operations Management",
                "Project Management"
              ],
              "sameAs": [
                "https://www.linkedin.com/in/aliemredag/"
              ],
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Executive MBA",
                  "credentialCategory": "degree"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Google Agile PM",
                  "credentialCategory": "certificate"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Six Sigma",
                  "credentialCategory": "certificate"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased scroll-smooth selection:bg-primary/20 selection:text-primary-foreground`}>
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen bg-background">
              {children}
              <Chatbot />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}