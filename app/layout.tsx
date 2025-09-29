import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/language-context'

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
  title: 'Ali Emre Dağ - Global Supply Chain Manager',
  description: 'Results-driven Global Supply Chain Manager with 8+ years of experience across procurement, production planning, logistics, and project leadership.',
  keywords: 'supply chain, management, operations, logistics, Lean, Six Sigma, SAP ERP, Power BI',
  authors: [{ name: 'Ali Emre Dağ' }],
  creator: 'Ali Emre Dağ',
  metadataBase: new URL('https://aliemredag.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aliemredag.com',
    title: 'Ali Emre Dağ - Global Supply Chain Manager',
    description: 'Results-driven Global Supply Chain Manager with 8+ years of experience across procurement, production planning, logistics, and project leadership.',
    siteName: 'Ali Emre Dağ Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ali Emre Dağ - Global Supply Chain Manager',
    description: 'Results-driven Global Supply Chain Manager with 8+ years of experience across procurement, production planning, logistics, and project leadership.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
              "jobTitle": "Global Supply Chain Manager",
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
              }
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
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}