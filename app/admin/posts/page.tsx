"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthWrapper } from "@/components/admin/auth-wrapper"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  Calendar,
  ThumbsUp,
  MessageCircle,
  Repeat2,
  Save,
  X
} from "lucide-react"
import { motion } from "framer-motion"
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

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<LinkedInPost[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<LinkedInPost | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    publishDate: '',
    linkedinUrl: '',
    category: 'insights' as LinkedInPost['category'],
    tags: '',
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0
  })

  // Load posts from localStorage
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

  // Save posts to localStorage
  const savePosts = (newPosts: LinkedInPost[]) => {
    setPosts(newPosts)
    localStorage.setItem('linkedin-posts', JSON.stringify(newPosts))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      publishDate: '',
      linkedinUrl: '',
      category: 'insights',
      tags: '',
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0
    })
    setEditingPost(null)
    setShowForm(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const postData: LinkedInPost = {
      id: editingPost?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      publishDate: formData.publishDate,
      linkedinUrl: formData.linkedinUrl,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      engagement: {
        likes: formData.likes,
        comments: formData.comments,
        shares: formData.shares,
        views: formData.views || undefined
      }
    }

    let newPosts: LinkedInPost[]
    if (editingPost) {
      newPosts = posts.map(post => post.id === editingPost.id ? postData : post)
      setNotification('Post başarıyla güncellendi!')
    } else {
      newPosts = [postData, ...posts]
      setNotification('Yeni post başarıyla eklendi!')
    }

    savePosts(newPosts)
    resetForm()
    setTimeout(() => setNotification(null), 3000)
  }

  const handleEdit = (post: LinkedInPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      publishDate: post.publishDate,
      linkedinUrl: post.linkedinUrl,
      category: post.category,
      tags: post.tags.join(', '),
      likes: post.engagement.likes,
      comments: post.engagement.comments,
      shares: post.engagement.shares,
      views: post.engagement.views || 0
    })
    setEditingPost(post)
    setShowForm(true)
  }

  const handleDelete = (postId: string) => {
    if (confirm('Bu postu silmek istediğinizden emin misiniz?')) {
      const newPosts = posts.filter(post => post.id !== postId)
      savePosts(newPosts)
      setNotification('Post başarıyla silindi!')
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'supply-chain': return 'Tedarik Zinciri'
      case 'leadership': return 'Liderlik'
      case 'technology': return 'Teknoloji'
      case 'insights': return 'İçgörüler'
      case 'announcement': return 'Duyuru'
      default: return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'supply-chain': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
      case 'leadership': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
      case 'technology': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      case 'insights': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
      case 'announcement': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-background">
        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 max-w-sm"
          >
            <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg">
              {notification}
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <Container>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold">LinkedIn Post Yönetimi</h1>
                  <p className="text-muted-foreground">Yazılarınızı ekleyin ve düzenleyin</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/posts">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Sayfayı Görüntüle
                  </Button>
                </Link>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Post
                </Button>
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-8">
          {/* Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Card className="neo-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {editingPost ? 'Post Düzenle' : 'Yeni Post Ekle'}
                      </CardTitle>
                      <CardDescription>
                        LinkedIn yazınızın detaylarını girin
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetForm}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Başlık</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Post başlığı"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Kategori</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value as LinkedInPost['category'] })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="supply-chain">Tedarik Zinciri</SelectItem>
                            <SelectItem value="leadership">Liderlik</SelectItem>
                            <SelectItem value="technology">Teknoloji</SelectItem>
                            <SelectItem value="insights">İçgörüler</SelectItem>
                            <SelectItem value="announcement">Duyuru</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Özet</Label>
                      <Input
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Kısa açıklama"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">İçerik</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Post içeriği"
                        rows={10}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="publishDate">Yayın Tarihi</Label>
                        <Input
                          id="publishDate"
                          type="date"
                          value={formData.publishDate}
                          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                        <Input
                          id="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                          placeholder="https://www.linkedin.com/posts/..."
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Etiketler</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="Virgülle ayırın: Liderlik, Teknoloji, SAP"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="likes">Beğeni Sayısı</Label>
                        <Input
                          id="likes"
                          type="number"
                          value={formData.likes}
                          onChange={(e) => setFormData({ ...formData, likes: Number(e.target.value) })}
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comments">Yorum Sayısı</Label>
                        <Input
                          id="comments"
                          type="number"
                          value={formData.comments}
                          onChange={(e) => setFormData({ ...formData, comments: Number(e.target.value) })}
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shares">Paylaşım Sayısı</Label>
                        <Input
                          id="shares"
                          type="number"
                          value={formData.shares}
                          onChange={(e) => setFormData({ ...formData, shares: Number(e.target.value) })}
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="views">Görüntülenme</Label>
                        <Input
                          id="views"
                          type="number"
                          value={formData.views}
                          onChange={(e) => setFormData({ ...formData, views: Number(e.target.value) })}
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        <Save className="w-4 h-4 mr-2" />
                        {editingPost ? 'Güncelle' : 'Kaydet'}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        İptal
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Posts List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Mevcut Postlar ({posts.length})
              </h2>
            </div>

            {posts.length === 0 ? (
              <Card className="neo-card">
                <CardContent className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Henüz post eklenmemiş</h3>
                    <p className="mb-4">İlk LinkedIn postunuzu eklemek için yukarıdaki butonu kullanın</p>
                    <Button onClick={() => setShowForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Yeni Post Ekle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="neo-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className={getCategoryColor(post.category)}>
                                {getCategoryLabel(post.category)}
                              </Badge>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.publishDate).toLocaleDateString('tr-TR')}
                              </div>
                            </div>

                            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                            <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                            <div className="flex items-center gap-6 mb-4">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{post.engagement.likes}</span>
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
                                  <span>{post.engagement.views}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  #{tag.replace(/\s+/g, '')}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(post.linkedinUrl, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(post)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </AuthWrapper>
  )
}