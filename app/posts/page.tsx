"use client"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  MessageCircle,
  Share,
  Calendar,
  Eye,
  ThumbsUp,
  Repeat2
} from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"

interface LinkedInPost {
  id: string
  title: string
  content: string
  excerpt: string
  publishDate: string
  linkedinUrl: string
  engagement: {
    likes: number
    comments: number
    shares: number
    views?: number
  }
  tags: string[]
  image?: string
  category: 'supply-chain' | 'leadership' | 'technology' | 'insights' | 'announcement'
}

const defaultPosts: LinkedInPost[] = [
  {
    id: '1',
    title: 'Tedarik Zinciri Optimizasyonunda Dijital Dönüşüm',
    content: `Günümüzde tedarik zinciri yönetiminde dijital dönüşüm artık lüks değil, zorunluluk haline geldi.

Son 8 yıllık uluslararası deneyimimde gözlemlediğim en önemli değişim, veri odaklı karar verme süreçlerinin operasyonel verimliliği nasıl artırdığı oldu.

🔑 Temel başarı faktörleri:
• SAP ve BI araçlarının entegrasyonu
• Gerçek zamanlı stok takibi
• Tahmine dayalı analitik
• Çapraz fonksiyonel işbirliği

Sizin tecrübeleriniz neler? Hangi dijital araçlar en çok fark yaratıyor?

#SupplyChain #DigitalTransformation #Leadership`,
    excerpt: 'Tedarik zinciri yönetiminde dijital dönüşümün önemi ve başarı faktörleri hakkında...',
    publishDate: '2024-03-15',
    linkedinUrl: 'https://www.linkedin.com/posts/aliemredag_supplychain-digitaltransformation-leadership-activity-7174567890123456789',
    engagement: {
      likes: 145,
      comments: 23,
      shares: 12,
      views: 2340
    },
    tags: ['Tedarik Zinciri', 'Dijital Dönüşüm', 'Liderlik'],
    category: 'supply-chain'
  },
  {
    id: '2',
    title: 'Uluslararası Takım Yönetiminde Kültürel Farkındalık',
    content: `9 farklı ülkede çalışma deneyimim olarak, en büyük öğrenimim kültürel çeşitliliğin takım performansını nasıl artırdığı oldu.

🌍 Global takım yönetiminde kritik noktalar:

✅ Kültürel farklılıkları güç olarak görme
✅ Açık ve şeffaf iletişim kanalları
✅ Zaman dilimi farklılıklarını optimize etme
✅ Ortak hedefler etrafında birleşme

Her kültürden öğrenecek bir şey var. Türk çalışma ahlakı, Alman sistematikliği, Asyalı detaycılık...

Sizin deneyimlerinizde hangi kültürel özellikler sizi en çok etkiledi?

#CrossCulturalManagement #GlobalTeams #Leadership #Diversity`,
    excerpt: 'Uluslararası takım yönetiminde kültürel farkındalığın önemi ve deneyimlerim...',
    publishDate: '2024-03-08',
    linkedinUrl: 'https://www.linkedin.com/posts/aliemredag_crossculturalmanagement-globalteams-leadership-activity-7171234567890123456',
    engagement: {
      likes: 89,
      comments: 31,
      shares: 8,
      views: 1890
    },
    tags: ['Liderlik', 'Kültürel Yönetim', 'Global Takımlar'],
    category: 'leadership'
  },
  {
    id: '3',
    title: 'SAP Implementasyonunda Başarı Hikayeleri',
    content: `Son projemizde SAP entegrasyonu ile %35 operasyonel verimlilik artışı sağladık.

🎯 Proje sonuçları:
• Stok devir hızı: %40 artış
• Sipariş işleme süresi: %50 azalma
• Operasyonel maliyetler: %25 düşüş
• Müşteri memnuniyeti: %30 artış

📊 Başarının anahtarları:
1. Detaylı ihtiyaç analizi
2. Aşamalı implementasyon
3. Sürekli eğitim ve adaptasyon
4. Change management süreçleri

Teknoloji tek başına çözüm değil, doğru strateji + insan faktörü = başarı

SAP deneyimlerinizi paylaşır mısınız? Hangi modüller size en çok değer katıyor?

#SAP #BusinessIntelligence #ProcessOptimization #Technology`,
    excerpt: 'SAP implementasyonu ile elde ettiğimiz başarı hikayeleri ve önemli dersleri...',
    publishDate: '2024-02-28',
    linkedinUrl: 'https://www.linkedin.com/posts/aliemredag_sap-businessintelligence-processoptimization-activity-7167890123456789012',
    engagement: {
      likes: 203,
      comments: 45,
      shares: 18,
      views: 3210
    },
    tags: ['SAP', 'Teknoloji', 'Süreç Optimizasyonu'],
    category: 'technology'
  }
]

export default function PostsPage() {
  const [posts, setPosts] = useState<LinkedInPost[]>(defaultPosts)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Load posts from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPosts = localStorage.getItem('linkedin-posts')
      if (savedPosts) {
        try {
          const parsedPosts = JSON.parse(savedPosts)
          setPosts(parsedPosts)
        } catch (error) {
          console.error('Error loading posts:', error)
        }
      }
    }
  }, [])

  const categories = [
    { value: 'all', label: 'Tümü', count: posts.length },
    { value: 'supply-chain', label: 'Tedarik Zinciri', count: posts.filter(p => p.category === 'supply-chain').length },
    { value: 'leadership', label: 'Liderlik', count: posts.filter(p => p.category === 'leadership').length },
    { value: 'technology', label: 'Teknoloji', count: posts.filter(p => p.category === 'technology').length },
    { value: 'insights', label: 'İçgörüler', count: posts.filter(p => p.category === 'insights').length }
  ]

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'supply-chain': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
      case 'leadership': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
      case 'technology': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      case 'insights': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Section className="py-12 bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/5">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/">
                <Button variant="outline" size="sm" className="neo-card">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ana Sayfa
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <h1 className="text-4xl font-bold tracking-tight">
                LinkedIn Yazılarım
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tedarik zinciri, liderlik ve teknoloji alanındaki deneyimlerimi ve görüşlerimi paylaştığım yazılar
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Categories Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className={`neo-card transition-all duration-300 ${
                      selectedCategory === category.value
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-primary/10'
                    }`}
                  >
                    {category.label}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Posts Grid */}
            <div className="space-y-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="neo-card overflow-hidden hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background to-muted/10 border-0">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className={getCategoryColor(post.category)}>
                              {post.category === 'supply-chain' ? 'Tedarik Zinciri' :
                               post.category === 'leadership' ? 'Liderlik' :
                               post.category === 'technology' ? 'Teknoloji' :
                               post.category === 'insights' ? 'İçgörüler' : 'Genel'}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.publishDate).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                          <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {post.excerpt}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-6">
                        {/* Post Content */}
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                            {post.content}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              #{tag.replace(/\s+/g, '')}
                            </Badge>
                          ))}
                        </div>

                        {/* Engagement Stats */}
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{formatNumber(post.engagement.likes)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.engagement.comments}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Repeat2 className="w-4 h-4" />
                              <span>{post.engagement.shares}</span>
                            </div>
                            {post.engagement.views && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Eye className="w-4 h-4" />
                                <span>{formatNumber(post.engagement.views)}</span>
                              </div>
                            )}
                          </div>

                          <Button asChild className="neo-card bg-blue-600 hover:bg-blue-700 text-white">
                            <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              LinkedIn'de Görüntüle
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Bu kategoride henüz yazı yok</h3>
                <p className="text-muted-foreground">
                  Farklı bir kategori seçmeyi deneyin
                </p>
              </motion.div>
            )}

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-16"
            >
              <Card className="neo-card bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Daha fazla içerik için LinkedIn'de takip edin
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Tedarik zinciri, liderlik ve teknoloji alanındaki en güncel görüşlerimi ve deneyimlerimi kaçırmayın
                  </p>
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <a href="https://www.linkedin.com/in/aliemredag/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      LinkedIn'de Takip Et
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  )
}