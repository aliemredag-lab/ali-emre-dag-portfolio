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
import { profileData, LinkedInPost } from "@/data/profile"
import { useLanguage } from "@/lib/language-context"

export default function PostsPage() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState<LinkedInPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<LinkedInPost[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('all')

  useEffect(() => {
    // Get posts from localStorage or use default from profileData
    const savedPosts = localStorage.getItem('linkedin-posts')
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts)
      setPosts(parsedPosts)
      setFilteredPosts(parsedPosts)
    } else {
      // Use static posts from profileData
      setPosts(profileData.posts)
      setFilteredPosts(profileData.posts)
    }
  }, [])

  const categories = [
    { id: 'all', label: t('posts.all') },
    { id: 'supply-chain', label: t('posts.supplyChain') },
    { id: 'leadership', label: t('posts.leadership') },
    { id: 'technology', label: t('posts.technology') },
    { id: 'insights', label: t('posts.insights') }
  ]

  const handleFilterChange = (categoryId: string) => {
    setActiveFilter(categoryId)
    if (categoryId === 'all') {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter(post => post.category === categoryId))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
      <Section className="py-8 border-b border-border/50 bg-gradient-to-r from-background via-muted/10 to-background backdrop-blur-sm">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-all duration-300">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("posts.backToHome")}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-12 bg-gradient-to-b from-background via-muted/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
                <MessageCircle className="w-4 h-4 mr-2" />
                LinkedIn Articles
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {t("posts.title")}
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mb-6" />
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("posts.description")}
              </p>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-3 justify-center mb-16"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "ghost"}
                  onClick={() => handleFilterChange(category.id)}
                  className={`rounded-full px-6 py-2 transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg hover:shadow-xl"
                      : "hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/20"
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </motion.div>

            {/* Posts Grid */}
            <div className="space-y-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 group">
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardHeader className="relative z-10 pb-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-3">
                            <Badge
                              className="bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary border-primary/20 px-3 py-1 backdrop-blur-sm"
                            >
                              {post.category === 'supply-chain' ? t('posts.supplyChain') :
                               post.category === 'leadership' ? t('posts.leadership') :
                               post.category === 'technology' ? t('posts.technology') :
                               post.category === 'insights' ? t('posts.insights') : t('posts.all')}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary/60" />
                              <span>{formatDate(post.publishDate)}</span>
                            </div>
                          </div>
                          <CardTitle className="text-2xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
                            {post.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-6">
                      {/* Post Content */}
                      <div className="relative">
                        <div className="absolute -left-4 -top-2 text-6xl text-primary/10 font-serif select-none">"</div>
                        <div className="relative pl-6 pr-6">
                          <div className="whitespace-pre-wrap text-lg leading-relaxed text-foreground/90 font-medium">
                            {post.content}
                          </div>
                        </div>
                        <div className="absolute -right-2 -bottom-2 text-6xl text-primary/10 font-serif select-none">"</div>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              className="bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary border-primary/20 text-sm px-3 py-1 backdrop-blur-sm hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Engagement Stats */}
                      <div className="flex items-center justify-between pt-6 border-t border-border/50">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 backdrop-blur-sm">
                            <ThumbsUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{formatNumber(post.engagement.likes)}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 backdrop-blur-sm">
                            <MessageCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">{formatNumber(post.engagement.comments)}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 backdrop-blur-sm">
                            <Repeat2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{formatNumber(post.engagement.shares)}</span>
                          </div>
                          {post.engagement.views && (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 backdrop-blur-sm">
                              <Eye className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{formatNumber(post.engagement.views)}</span>
                            </div>
                          )}
                        </div>

                        <Button
                          asChild
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                          <a
                            href={post.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <span>View on LinkedIn</span>
                            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No Posts Message */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm border border-border/50 p-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
                  <div className="relative z-10">
                    <MessageCircle className="w-16 h-16 mx-auto mb-6 text-primary/50" />
                    <h3 className="text-2xl font-bold mb-4 text-foreground">No Articles Found</h3>
                    <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                      {t("posts.noArticles")}
                    </p>
                    <Button
                      onClick={() => handleFilterChange('all')}
                      className="bg-gradient-to-r from-primary to-purple-500 text-white border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {t("posts.viewAll")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  )
}