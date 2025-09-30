"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Folder, Calendar, Star, Sparkles, Code2 } from "lucide-react"
import { motion } from "framer-motion"
import { profileData, type Project } from "@/data/profile"
import { useLanguage } from "@/lib/language-context"

export function ProjectsSection() {
  const { t } = useLanguage()
  const [projects, setProjects] = useState<Project[]>(profileData.projects)

  // Load projects from localStorage or use static default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProjects = localStorage.getItem('portfolio-projects')
      if (savedProjects) {
        try {
          const parsedProjects = JSON.parse(savedProjects)
          setProjects(parsedProjects)
        } catch (error) {
          console.error('Error loading projects:', error)
          // Fallback to static projects
          setProjects(profileData.projects)
        }
      }
    }
  }, [])

  // Use all projects without featured distinction
  const allProjects = projects

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getProjectData = (projectId: string, fallbackTitle: string, fallbackDescription: string) => {
    const title = t(`projects.project${projectId}.title`) || fallbackTitle
    const description = t(`projects.project${projectId}.description`) || fallbackDescription
    return { title, description }
  }

  const ProjectCard = ({ project }: { project: Project }) => {
    const projectData = getProjectData(project.id, project.title, project.description)
    return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="neo-card h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-muted/20 to-muted/10">
        {/* Image at the top */}
        <div className="aspect-[16/10] overflow-hidden relative">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center">
              <div className="text-center">
                <Folder className="w-20 h-20 text-primary/70 mx-auto mb-4" />
                <div className="text-lg font-semibold text-primary/90">{projectData.title}</div>
              </div>
            </div>
          )}

          {/* Status badge overlay */}
          <div className="absolute top-4 right-4">
            <Badge className={`${getStatusColor(project.status)} font-medium`}>
              {project.status === 'in-progress' ? t('projects.inProgress') :
               project.status === 'completed' ? t('projects.completed') : t('projects.planned')}
            </Badge>
          </div>
        </div>

        {/* Content below image */}
        <CardContent className="p-6 space-y-4">
          {/* Title and Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {projectData.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {projectData.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{t("projects.technologies")}</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-4">
            {project.liveUrl && (
              <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("projects.liveDemo")}
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild size="sm" variant="outline" className="flex-1 hover:bg-muted">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  {t("projects.code")}
                </a>
              </Button>
            )}
          </div>

          {/* Date */}
          <div className="flex items-center text-xs text-muted-foreground pt-3 border-t border-border/50">
            <Calendar className="w-3 h-3 mr-2" />
            {new Date(project.createdAt).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long'
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
    )
  }

  return (
    <Section id="projects" className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
            <Code2 className="w-4 h-4 mr-2" />
            Development Portfolio
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">{t('projects.title')}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("projects.description")}
          </p>
        </motion.div>

        {/* All Projects in Single Grid */}
        {allProjects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <Folder className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">{t('projects.noProjects')}</h3>
            <p className="text-muted-foreground">
              {t('projects.addFromAdmin')}
            </p>
          </motion.div>
        )}
      </Container>
    </Section>
  )
}