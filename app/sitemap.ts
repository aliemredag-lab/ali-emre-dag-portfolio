import { MetadataRoute } from 'next'
import { profileData } from '@/data/profile'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aliemredag.com' // Kendi domain'iniz ile güncelleyin

  // Ana sayfalar
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // LinkedIn postları için dinamik URL'ler
  const postUrls = profileData.posts.map((post) => ({
    url: `${baseUrl}/posts/${post.id}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Projeler için dinamik URL'ler
  const projectUrls = profileData.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...postUrls, ...projectUrls]
}
