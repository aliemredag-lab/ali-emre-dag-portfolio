"use client"

import { motion } from "framer-motion"
import { Calendar, TrendingUp, MessageCircle, Share2, Eye, ArrowRight, Bookmark, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { profileData } from "@/data/profile"
import { useLanguage } from "@/lib/language-context"
import { ProtectedContent } from "@/components/protected-content"
import Link from "next/link"

const categoryColors: Record<string, string> = {
  'supply-chain': 'bg-blue-500',
  'leadership': 'bg-purple-500',
  'technology': 'bg-green-500',
  'insights': 'bg-orange-500',
  'announcement': 'bg-pink-500'
}

const categoryIcons: Record<string, any> = {
  'supply-chain': TrendingUp,
  'leadership': MessageCircle,
  'technology': Eye,
  'insights': Bookmark,
  'announcement': Share2
}

export function InsightsBlog() {
  const { t, language } = useLanguage()
  const recentPosts = profileData.posts.slice(0, 6)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return language === 'tr'
      ? date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <ProtectedContent
      title="LinkedIn Insights & Articles"
      description="Register to access exclusive insights and thought leadership content"
    >
      <section id="insights-blog" className="py-20 bg-gradient-to-b from-background/50 via-background to-background/50">
        <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 text-sm px-4 py-1.5">
            {t('insights.badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('insights.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('insights.subtitle')}
          </p>
        </motion.div>

        {/* Featured Post (First One) */}
        {recentPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image/Visual */}
                {recentPosts[0].image ? (
                  <div
                    className="h-64 md:h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${recentPosts[0].image})` }}
                  />
                ) : (
                  <div className="h-64 md:h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    {(() => {
                      const Icon = categoryIcons[recentPosts[0].category] || Bookmark
                      return <Icon className="h-24 w-24 text-primary/30" />
                    })()}
                  </div>
                )}

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={`${categoryColors[recentPosts[0].category]} text-white`}>
                      {recentPosts[0].category.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{t('insights.featured')}</Badge>
                  </div>

                  <h3 className="text-3xl font-bold mb-4 hover:text-primary transition-colors">
                    {recentPosts[0].title}
                  </h3>

                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {recentPosts[0].excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formatDate(recentPosts[0].publishDate)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4" />
                      {formatNumber(recentPosts[0].engagement.likes)} {t('insights.likes')}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="h-4 w-4" />
                      {formatNumber(recentPosts[0].engagement.comments)} {t('insights.comments')}
                    </div>
                    {recentPosts[0].engagement.views && (
                      <div className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        {formatNumber(recentPosts[0].engagement.views)} {t('insights.views')}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {recentPosts[0].tags.slice(0, 4).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3">
                    <Button asChild className="flex-1">
                      <Link href={`/posts/${recentPosts[0].id}`}>
                        {t('insights.readMore')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={recentPosts[0].linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Grid of Recent Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50 overflow-hidden">
                {/* Image/Visual */}
                {post.image ? (
                  <div
                    className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                ) : (
                  <div className="h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                    {(() => {
                      const Icon = categoryIcons[post.category] || Bookmark
                      return <Icon className="h-12 w-12 text-primary/30" />
                    })()}
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  {/* Category */}
                  <Badge className={`${categoryColors[post.category]} text-white w-fit mb-3`}>
                    {post.category.replace('-', ' ').toUpperCase()}
                  </Badge>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {formatNumber(post.engagement.likes)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {formatNumber(post.engagement.comments)}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2">
                    <Button asChild variant="ghost" size="sm" className="flex-1">
                      <Link href={`/posts/${post.id}`}>
                        {t('insights.read')}
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Posts CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/posts">
              {t('insights.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
    </ProtectedContent>
  )
}
