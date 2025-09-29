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
      <Section className="py-8 border-b">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("posts.backToHome")}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold mb-4">{t("posts.title")}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("posts.description")}
              </p>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-3 justify-center mb-12"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  onClick={() => handleFilterChange(category.id)}
                  className="rounded-full"
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
                  <Card className="neo-card hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 line-clamp-2 hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(post.publishDate)}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-xs px-2 py-1"
                            >
                              {post.category === 'supply-chain' ? t('posts.supplyChain') :
                               post.category === 'leadership' ? t('posts.leadership') :
                               post.category === 'technology' ? t('posts.technology') :
                               post.category === 'insights' ? t('posts.insights') : t('posts.all')}
                            </Badge>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Post Content */}
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {post.content}
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Engagement Stats */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {formatNumber(post.engagement.likes)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {formatNumber(post.engagement.comments)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Repeat2 className="w-4 h-4" />
                            {formatNumber(post.engagement.shares)}
                          </span>
                          {post.engagement.views && (
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {formatNumber(post.engagement.views)}
                            </span>
                          )}
                        </div>

                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="gap-2"
                        >
                          <a
                            href={post.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View on LinkedIn
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
                className="text-center py-12"
              >
                <p className="text-lg text-muted-foreground mb-6">
                  {t("posts.noArticles")}
                </p>
                <Button
                  onClick={() => handleFilterChange('all')}
                  variant="outline"
                >
                  {t("posts.viewAll")}
                </Button>
              </motion.div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  )
}