export interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  status: 'completed' | 'in-progress' | 'planned'
  featured: boolean
  createdAt: string
}

export const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/username/ecommerce',
    status: 'completed',
    featured: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['Vue.js', 'Firebase', 'Vuetify'],
    githubUrl: 'https://github.com/username/task-manager',
    status: 'completed',
    featured: true,
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps using various weather APIs.',
    technologies: ['JavaScript', 'Chart.js', 'Weather API'],
    liveUrl: 'https://weather-dashboard.com',
    status: 'completed',
    featured: false,
    createdAt: '2024-03-10'
  }
]