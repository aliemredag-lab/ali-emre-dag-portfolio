"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthWrapper } from "@/components/admin/auth-wrapper"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Star,
  Save,
  X
} from "lucide-react"
import { motion } from "framer-motion"
import { profileData, type Project } from "@/data/profile"
import { validateAndSanitizeText, sanitizeInput } from "@/lib/security"

export default function ProjectsManagementPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>(profileData.projects)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    status: 'completed' as 'completed' | 'in-progress' | 'planned',
    featured: false
  })

  // Load projects from localStorage or default profileData
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-projects')
      if (saved) {
        try {
          setProjects(JSON.parse(saved))
        } catch (error) {
          console.error('Error loading projects:', error)
          // Fallback to profileData projects if localStorage is corrupted
          setProjects(profileData.projects)
        }
      } else {
        // Load default projects from profileData if no saved projects
        setProjects(profileData.projects)
        localStorage.setItem('portfolio-projects', JSON.stringify(profileData.projects))
      }
    }
  }, [])

  // Save projects to localStorage
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
    localStorage.setItem('portfolio-projects', JSON.stringify(newProjects))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let projectData: Project

    try {
      // Sanitize and validate all inputs
      const sanitizedTitle = validateAndSanitizeText(formData.title, 100)
      const sanitizedDescription = validateAndSanitizeText(formData.description, 2000)
      const sanitizedTechnologies = sanitizeInput(formData.technologies)
      const sanitizedLiveUrl = formData.liveUrl ? sanitizeInput(formData.liveUrl) : undefined
      const sanitizedGithubUrl = formData.githubUrl ? sanitizeInput(formData.githubUrl) : undefined

      // Additional validation
      if (!sanitizedTitle || sanitizedTitle.length < 3) {
        alert('Project title must be at least 3 characters long')
        return
      }

      if (!sanitizedDescription || sanitizedDescription.length < 10) {
        alert('Project description must be at least 10 characters long')
        return
      }

      projectData = {
        id: editingProject?.id || Date.now().toString(),
        title: sanitizedTitle,
        description: sanitizedDescription,
        technologies: sanitizedTechnologies.split(',').map(t => sanitizeInput(t.trim())).filter(Boolean),
        liveUrl: sanitizedLiveUrl || undefined,
        githubUrl: sanitizedGithubUrl || undefined,
        status: formData.status,
        featured: formData.featured,
        createdAt: editingProject?.createdAt || new Date().toISOString().split('T')[0]
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Input validation failed')
      return
    }

    let newProjects: Project[]
    if (editingProject) {
      newProjects = projects.map(p => p.id === editingProject.id ? projectData : p)
    } else {
      newProjects = [...projects, projectData]
    }

    saveProjects(newProjects)
    resetForm()
    alert(editingProject ? 'Proje güncellendi!' : 'Proje eklendi!')
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      status: project.status,
      featured: project.featured
    })
    setShowAddForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      const newProjects = projects.filter(p => p.id !== id)
      saveProjects(newProjects)
    }
  }

  const toggleFeatured = (id: string) => {
    const newProjects = projects.map(p =>
      p.id === id ? { ...p, featured: !p.featured } : p
    )
    saveProjects(newProjects)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      status: 'completed',
      featured: false
    })
    setEditingProject(null)
    setShowAddForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'planned': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <Container>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">Proje Yönetimi</h1>
                  <p className="text-muted-foreground">Projelerinizi ekleyin, düzenleyin ve yönetin</p>
                </div>
              </div>
              <Button onClick={() => setShowAddForm(true)} className="glow-button">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Proje
              </Button>
            </div>
          </Container>
        </div>

        <Container className="py-8">
          <div className="space-y-8">
            {/* Add/Edit Form */}
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="neo-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        {editingProject ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={resetForm}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="title">Proje Adı *</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Örn: E-Commerce Platform"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="status">Durum</Label>
                          <select
                            id="status"
                            value={formData.status}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          >
                            <option value="completed">Tamamlandı</option>
                            <option value="in-progress">Devam Ediyor</option>
                            <option value="planned">Planlandı</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Açıklama *</Label>
                        <Textarea
                          id="description"
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Proje hakkında detaylı açıklama..."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="technologies">Teknolojiler *</Label>
                        <Input
                          id="technologies"
                          value={formData.technologies}
                          onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                          placeholder="React, Node.js, PostgreSQL (virgülle ayırın)"
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="liveUrl">Canlı URL</Label>
                          <Input
                            id="liveUrl"
                            value={formData.liveUrl}
                            onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                            placeholder="https://example.com"
                            type="url"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="githubUrl">GitHub URL</Label>
                          <Input
                            id="githubUrl"
                            value={formData.githubUrl}
                            onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                            placeholder="https://github.com/username/repo"
                            type="url"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={formData.featured}
                          onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                          className="rounded border-border"
                        />
                        <Label htmlFor="featured">Öne çıkan proje olarak işaretle</Label>
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="glow-button">
                          <Save className="w-4 h-4 mr-2" />
                          {editingProject ? 'Güncelle' : 'Kaydet'}
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

            {/* Projects List */}
            <Card className="neo-card">
              <CardHeader>
                <CardTitle>Current Projects ({projects.length})</CardTitle>
                <CardDescription>
                  Manage all your projects from here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {projects.length === 0 ? (
                  <div className="text-center py-12">
                    <Plus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Henüz proje yok</h3>
                    <p className="text-muted-foreground mb-4">İlk projenizi ekleyin</p>
                    <Button onClick={() => setShowAddForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Proje Ekle
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border rounded-xl p-6 space-y-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{project.title}</h3>
                              {project.featured && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              )}
                              <Badge className={getStatusColor(project.status)}>
                                {project.status === 'completed' ? 'Tamamlandı' :
                                 project.status === 'in-progress' ? 'Devam Ediyor' : 'Planlandı'}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.technologies.map((tech, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              {project.liveUrl && (
                                <Button size="sm" variant="outline" asChild>
                                  <a href={project.liveUrl} target="_blank">
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    Demo
                                  </a>
                                </Button>
                              )}
                              {project.githubUrl && (
                                <Button size="sm" variant="outline" asChild>
                                  <a href={project.githubUrl} target="_blank">
                                    <Github className="w-3 h-3 mr-1" />
                                    Code
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleFeatured(project.id)}
                              className={project.featured ? 'text-yellow-600' : ''}
                            >
                              <Star className={`w-4 h-4 ${project.featured ? 'fill-current' : ''}`} />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleEdit(project)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(project.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </AuthWrapper>
  )
}