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
  X,
  Download,
  Upload,
  Copy,
  Wand2,
  Link as LinkIcon
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { profileData } from "@/data/profile"

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
  const [showBulkImport, setShowBulkImport] = useState(false)
  const [isProcessingUrl, setIsProcessingUrl] = useState(false)

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

  const [bulkImportData, setBulkImportData] = useState('')

  // Load posts from localStorage or default profileData
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPosts = localStorage.getItem('linkedin-posts')
      if (savedPosts) {
        try {
          const parsedPosts = JSON.parse(savedPosts)
          setPosts(parsedPosts)
        } catch (error) {
          console.error('Error loading posts:', error)
          // Fallback to profileData posts if localStorage is corrupted
          setPosts(profileData.posts)
        }
      } else {
        // Load default posts from profileData if no saved posts
        setPosts(profileData.posts)
        localStorage.setItem('linkedin-posts', JSON.stringify(profileData.posts))
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
      setNotification('Post updated successfully!')
    } else {
      newPosts = [postData, ...posts]
      setNotification('New post added successfully!')
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
    if (confirm('Are you sure you want to delete this post?')) {
      const newPosts = posts.filter(post => post.id !== postId)
      savePosts(newPosts)
      setNotification('Post deleted successfully!')
      setTimeout(() => setNotification(null), 3000)
    }
  }

  // LinkedIn URL'den veri çekme (simulated - gerçek implementasyon için LinkedIn API gerekir)
  const extractDataFromLinkedInUrl = async (url: string) => {
    setIsProcessingUrl(true)
    try {
      // Bu gerçek bir implementasyon için LinkedIn API veya scraping gerekir
      // Şimdilik demo amaçlı veri döndürüyoruz
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate loading

      // URL'den ID çıkar
      const urlParts = url.split('/')
      const postId = urlParts[urlParts.length - 1] || Date.now().toString()

      // Demo data - gerçek implementasyonda LinkedIn'den çekilecek
      const extractedData = {
        title: 'LinkedIn Postundan Çıkarılan Başlık',
        content: 'Bu içerik LinkedIn URL\'sinden otomatik olarak çıkarıldı. Manuel olarak düzenleyebilirsiniz.',
        excerpt: 'Otomatik oluşturulmuş özet',
        publishDate: new Date().toISOString().split('T')[0],
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 10),
        views: Math.floor(Math.random() * 1000)
      }

      setFormData(prev => ({
        ...prev,
        ...extractedData,
        linkedinUrl: url
      }))

      setNotification('LinkedIn post verisi başarıyla çıkarıldı! Lütfen kontrol edip düzenleyin.')
      setTimeout(() => setNotification(null), 5000)
    } catch (error) {
      setNotification('URL işlenirken hata oluştu. Manuel olarak doldurun.')
      setTimeout(() => setNotification(null), 3000)
    } finally {
      setIsProcessingUrl(false)
    }
  }

  // Bulk import işlemi
  const handleBulkImport = () => {
    try {
      const lines = bulkImportData.trim().split('\n')
      const newPosts: LinkedInPost[] = []

      lines.forEach((line, index) => {
        if (line.trim()) {
          // Format: Title | Content | Category | Tags | LinkedIn URL
          const parts = line.split('|').map(p => p.trim())
          if (parts.length >= 3) {
            const post: LinkedInPost = {
              id: Date.now().toString() + index,
              title: parts[0] || `Imported Post ${index + 1}`,
              content: parts[1] || '',
              excerpt: parts[1]?.substring(0, 150) + '...' || '',
              publishDate: new Date().toISOString().split('T')[0],
              linkedinUrl: parts[4] || '',
              category: (parts[2]?.toLowerCase() as LinkedInPost['category']) || 'insights',
              tags: parts[3]?.split(',').map(t => t.trim()) || [],
              engagement: {
                likes: 0,
                comments: 0,
                shares: 0
              }
            }
            newPosts.push(post)
          }
        }
      })

      if (newPosts.length > 0) {
        const updatedPosts = [...newPosts, ...posts]
        savePosts(updatedPosts)
        setNotification(`${newPosts.length} post başarıyla import edildi!`)
        setBulkImportData('')
        setShowBulkImport(false)
        setTimeout(() => setNotification(null), 3000)
      }
    } catch (error) {
      setNotification('Bulk import işleminde hata oluştu.')
      setTimeout(() => setNotification(null), 3000)
    }
  }

  // Template kopyalama
  const copyTemplate = () => {
    const template = `Başlık 1 | İçerik metni buraya gelecek | insights | tag1,tag2,tag3 | https://linkedin.com/posts/...
Başlık 2 | İkinci post içeriği | leadership | liderlik,yönetim | https://linkedin.com/posts/...`
    navigator.clipboard.writeText(template)
    setNotification('Template panoya kopyalandı!')
    setTimeout(() => setNotification(null), 2000)
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
                  <h1 className="text-2xl font-bold">LinkedIn Post Management</h1>
                  <p className="text-muted-foreground">Add and edit your articles</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/posts">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Sayfayı Görüntüle
                  </Button>
                </Link>
                <Button
                  onClick={() => setShowBulkImport(true)}
                  variant="outline"
                  size="sm"
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Bulk Import
                </Button>
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
                        Enter your LinkedIn article details
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
                        <div className="flex gap-2">
                          <Input
                            id="linkedinUrl"
                            value={formData.linkedinUrl}
                            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                            placeholder="https://www.linkedin.com/posts/..."
                            required
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => extractDataFromLinkedInUrl(formData.linkedinUrl)}
                            disabled={!formData.linkedinUrl || isProcessingUrl}
                            className="whitespace-nowrap"
                          >
                            {isProcessingUrl ? (
                              <>
                                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                İşleniyor...
                              </>
                            ) : (
                              <>
                                <Wand2 className="w-4 h-4 mr-2" />
                                Veri Çek
                              </>
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          LinkedIn URL'sini yapıştırın ve "Veri Çek" butonuna tıklayarak otomatik olarak bilgileri çekin
                        </p>
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
                        {editingPost ? 'Update' : 'Save'}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Bulk Import Modal */}
          {showBulkImport && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Card className="neo-card border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-blue-700">
                        <Upload className="w-5 h-5 mr-2 inline" />
                        Bulk Import
                      </CardTitle>
                      <CardDescription>
                        Birden fazla post'u aynı anda import edin
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBulkImport(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <div className="p-4 bg-muted rounded-lg text-sm font-mono">
                      Başlık | İçerik | Kategori | Etiketler | LinkedIn URL
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyTemplate}
                        className="text-xs"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Template Kopyala
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bulkData">Post Verileri</Label>
                    <Textarea
                      id="bulkData"
                      value={bulkImportData}
                      onChange={(e) => setBulkImportData(e.target.value)}
                      placeholder="Başlık 1 | İçerik metni... | insights | tag1,tag2 | https://linkedin.com/posts/...
Başlık 2 | İkinci post içeriği... | leadership | tag3,tag4 | https://linkedin.com/posts/..."
                      rows={10}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Her satır bir post olacak. Pipe (|) karakteri ile ayırın.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={handleBulkImport}
                      disabled={!bulkImportData.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import Et
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowBulkImport(false)
                        setBulkImportData('')
                      }}
                    >
                      İptal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Posts List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Current Posts ({posts.length})
              </h2>
              {posts.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const exportData = posts.map(post =>
                      `${post.title} | ${post.content} | ${post.category} | ${post.tags.join(',')} | ${post.linkedinUrl}`
                    ).join('\n')
                    navigator.clipboard.writeText(exportData)
                    setNotification('Tüm postlar panoya kopyalandı!')
                    setTimeout(() => setNotification(null), 2000)
                  }}
                  className="text-green-700 border-green-200 hover:bg-green-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
            </div>

            {posts.length === 0 ? (
              <Card className="neo-card">
                <CardContent className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No posts added yet</h3>
                    <p className="mb-4">Use the button above to add your first LinkedIn post</p>
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