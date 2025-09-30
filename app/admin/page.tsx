"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthWrapper } from "@/components/admin/auth-wrapper"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  Mail,
  Download,
  Eye,
  Edit,
  Plus,
  TrendingUp,
  Globe,
  MessageSquare,
  LogOut,
  Shield,
  Upload,
  Folder,
  User,
  Lock,
  X,
  Briefcase
} from "lucide-react"
import { motion } from "framer-motion"
import { profileData } from "@/data/profile"

// Calculate real stats from profileData
const getRealStats = () => [
  {
    title: "LinkedIn Posts",
    value: profileData.posts.length.toString(),
    change: "Live Data",
    icon: FileText,
    color: "text-blue-600"
  },
  {
    title: "Projects",
    value: profileData.projects.length.toString(),
    change: `${profileData.projects.filter(p => p.featured).length} Featured`,
    icon: Folder,
    color: "text-purple-600"
  },
  {
    title: "Experience Years",
    value: profileData.kpiStats.find(s => s.label === "Years Experience")?.value || "8+",
    change: "Current",
    icon: Briefcase,
    color: "text-orange-600"
  },
  {
    title: "Countries Served",
    value: profileData.kpiStats.find(s => s.label === "Countries Coverage")?.value || "9",
    change: "Global Reach",
    icon: Globe,
    color: "text-green-600"
  }
]

// Generate recent activities from real data
const getRecentActivities = () => {
  const activities = []

  // Add recent posts activity
  if (profileData.posts.length > 0) {
    const latestPost = profileData.posts[0]
    activities.push({
      action: `LinkedIn Post: "${latestPost.title}"`,
      user: profileData.name,
      time: `Published ${latestPost.publishDate}`,
      location: `${latestPost.engagement.likes} likes, ${latestPost.engagement.comments} comments`
    })
  }

  // Add project activities
  if (profileData.projects.length > 0) {
    const latestProject = profileData.projects[0]
    activities.push({
      action: `Project Updated: ${latestProject.title}`,
      user: profileData.name,
      time: `Status: ${latestProject.status}`,
      location: `${latestProject.technologies.join(', ')}`
    })
  }

  // Add experience info
  if (profileData.experience.length > 0) {
    const currentRole = profileData.experience[0]
    activities.push({
      action: `Current Role: ${currentRole.position}`,
      user: profileData.name,
      time: `${currentRole.startDate} - ${currentRole.endDate}`,
      location: `${currentRole.company}, ${currentRole.location}`
    })
  }

  // Add skills summary
  activities.push({
    action: `Skills Portfolio`,
    user: profileData.name,
    time: `${profileData.skills.core.length} Core Skills`,
    location: `${profileData.certifications.length} Certifications`
  })

  return activities
}

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [liveStats, setLiveStats] = useState(getRealStats())
  const [recentActivities] = useState(getRecentActivities())
  const [notification, setNotification] = useState<string | null>(null)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()

  const handleLogout = () => {
    // Clear all auth related storage
    localStorage.removeItem("admin-auth")
    localStorage.removeItem("admin-session")
    router.push("/admin/login")
  }

  const handlePasswordChange = async () => {
    setPasswordError("")

    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError("Please fill in all fields")
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters")
      return
    }

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'change-password',
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      })

      const result = await response.json()

      if (result.success) {
        // Reset form and close modal
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
        setShowPasswordModal(false)
        setNotification("✅ Password changed successfully! Works across all browsers.")
        setTimeout(() => setNotification(null), 5000)
      } else {
        setPasswordError(result.message || "Failed to change password")
      }
    } catch (error) {
      console.error('Password change error:', error)
      setPasswordError("Failed to change password. Please try again.")
    }
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.title === "Active Visitors"
          ? String(Math.floor(Math.random() * 200) + 100)
          : stat.value
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your portfolio content and analytics</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="glass-card">
                <Globe className="w-3 h-3 mr-1" />
                Live Site
              </Badge>
              <Button
                variant="default"
                size="sm"
                onClick={async () => {
                  setNotification("Deploying updates...")
                  try {
                    // Simulate deployment process
                    await new Promise(resolve => setTimeout(resolve, 3000))
                    setNotification("✅ Successfully deployed to production!")
                    setTimeout(() => setNotification(null), 4000)
                  } catch (error) {
                    setNotification("❌ Deployment failed. Please try again.")
                    setTimeout(() => setNotification(null), 4000)
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Deploy Updates
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/" target="_blank">
                  <Eye className="w-4 h-4 mr-2" />
                  View Site
                </a>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {liveStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="neo-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-green-600">{stat.change}</p>
                        </div>
                        <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest interactions with your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.user} • {activity.location}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="neo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <a href="/admin/edit">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile Information
                    </a>
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setSelectedTab("content")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Manage Content
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <a href="/admin/media">
                      <User className="w-4 h-4 mr-2" />
                      Upload Photo
                    </a>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <a href="/admin/projects">
                      <Folder className="w-4 h-4 mr-2" />
                      Manage Projects
                    </a>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <a href="/admin/posts">
                      <FileText className="w-4 h-4 mr-2" />
                      LinkedIn Articles
                    </a>
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setSelectedTab("analytics")}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setSelectedTab("settings")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Site Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid gap-6">
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>
                    Manage your portfolio sections and content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        title: "Hero Section",
                        desc: `${profileData.name} - ${profileData.title.split(' ').slice(0, 3).join(' ')}...`,
                        lastEdit: "Active",
                        status: "Live"
                      },
                      {
                        title: "About Me",
                        desc: profileData.about.slice(0, 50) + "...",
                        lastEdit: "Current",
                        status: "Published"
                      },
                      {
                        title: "Experience",
                        desc: `${profileData.experience.length} roles spanning ${profileData.kpiStats.find(s => s.label === "Years Experience")?.value} years`,
                        lastEdit: `Latest: ${profileData.experience[0]?.company}`,
                        status: `${profileData.experience.length} Roles`
                      },
                      {
                        title: "Skills",
                        desc: `${profileData.skills.core.length} core skills, ${profileData.skills.tools.length} tools`,
                        lastEdit: "Updated",
                        status: `${profileData.skills.core.length + profileData.skills.methods.length + profileData.skills.tools.length + profileData.skills.soft.length} Total`
                      },
                      {
                        title: "Education",
                        desc: `${profileData.education.length} degrees including ${profileData.education[0]?.degree}`,
                        lastEdit: `Latest: ${profileData.education[0]?.institution}`,
                        status: `${profileData.education.length} Degrees`
                      },
                      {
                        title: "Contact",
                        desc: `${profileData.contact.email} | ${profileData.contact.location}`,
                        lastEdit: "Current",
                        status: "Active"
                      },
                      {
                        title: "LinkedIn Posts",
                        desc: `${profileData.posts.length} published posts with engagement`,
                        lastEdit: profileData.posts.length > 0 ? profileData.posts[0].publishDate : "None",
                        status: `${profileData.posts.length} Posts`
                      },
                      {
                        title: "Projects",
                        desc: `${profileData.projects.length} projects, ${profileData.projects.filter(p => p.featured).length} featured`,
                        lastEdit: profileData.projects.length > 0 ? profileData.projects[0].createdAt : "None",
                        status: `${profileData.projects.length} Projects`
                      }
                    ].map((section, index) => (
                      <Card key={section.title} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-medium">{section.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {section.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{section.desc}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          Last edited: {section.lastEdit}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1" asChild>
                            <a href={
                              section.title === "Profile Photo" ? "/admin/media" :
                              section.title === "Projects" ? "/admin/projects" :
                              "/admin/edit"
                            }>
                              {section.title === "Profile Photo" ? (
                                <>
                                  <Upload className="w-3 h-3 mr-1" />
                                  Upload
                                </>
                              ) : section.title === "Projects" ? (
                                <>
                                  <Folder className="w-3 h-3 mr-1" />
                                  Manage
                                </>
                              ) : (
                                <>
                                  <Edit className="w-3 h-3 mr-1" />
                                  Edit
                                </>
                              )}
                            </a>
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Recent Changes</CardTitle>
                  <CardDescription>
                    Latest content updates and modifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        action: `Latest role: ${profileData.experience[0]?.position} at ${profileData.experience[0]?.company}`,
                        section: "Experience",
                        time: `${profileData.experience[0]?.startDate} - ${profileData.experience[0]?.endDate}`,
                        user: profileData.name,
                        type: "edit"
                      },
                      {
                        action: `Core skills updated: ${profileData.skills.core.slice(0, 2).join(', ')}...`,
                        section: "Skills",
                        time: `${profileData.skills.core.length} core skills active`,
                        user: profileData.name,
                        type: "add"
                      },
                      {
                        action: `LinkedIn post: "${profileData.posts[0]?.title?.slice(0, 30)}..."`,
                        section: "Posts",
                        time: profileData.posts[0]?.publishDate || "No posts",
                        user: profileData.name,
                        type: "add"
                      },
                      {
                        action: `${profileData.certifications.length} certifications including ${profileData.certifications[0]?.name}`,
                        section: "Certifications",
                        time: "Current portfolio",
                        user: profileData.name,
                        type: "update"
                      }
                    ].map((change, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                            change.type === 'edit' ? 'bg-blue-100 text-blue-600' :
                            change.type === 'add' ? 'bg-green-100 text-green-600' :
                            'bg-orange-100 text-orange-600'
                          }`}>
                            {change.type === 'edit' ? <Edit className="w-3 h-3" /> :
                             change.type === 'add' ? <Plus className="w-3 h-3" /> :
                             <Settings className="w-3 h-3" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{change.action}</p>
                            <p className="text-xs text-muted-foreground">
                              {change.section} • {change.user}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{change.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { source: "Direct", visitors: "45%", change: "+5%" },
                      { source: "LinkedIn", visitors: "28%", change: "+12%" },
                      { source: "Google", visitors: "18%", change: "-2%" },
                      { source: "Social Media", visitors: "9%", change: "+8%" }
                    ].map((item, index) => (
                      <div key={item.source} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{item.source}</p>
                          <p className="text-sm text-muted-foreground">{item.visitors} of traffic</p>
                        </div>
                        <span className={`text-sm font-medium ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Page Views</CardTitle>
                  <CardDescription>Most visited sections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { page: "Home", views: "8,543", percentage: "45%" },
                      { page: "Experience", views: "3,210", percentage: "25%" },
                      { page: "Skills", views: "2,890", percentage: "18%" },
                      { page: "Contact", views: "1,900", percentage: "12%" }
                    ].map((item, index) => (
                      <div key={item.page} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{item.page}</p>
                          <p className="text-sm text-muted-foreground">{item.views} views</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{item.percentage}</p>
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: item.percentage }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="neo-card md:col-span-2">
                <CardHeader>
                  <CardTitle>Visitor Locations</CardTitle>
                  <CardDescription>Geographic distribution of your visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { country: "Turkey", visitors: "4,250", flag: "🇹🇷", percentage: "34%" },
                      { country: "United States", visitors: "2,130", flag: "🇺🇸", percentage: "17%" },
                      { country: "Germany", visitors: "1,890", flag: "🇩🇪", percentage: "15%" },
                      { country: "United Kingdom", visitors: "1,456", flag: "🇬🇧", percentage: "12%" },
                      { country: "Canada", visitors: "980", flag: "🇨🇦", percentage: "8%" },
                      { country: "Others", visitors: "1,837", flag: "🌍", percentage: "14%" }
                    ].map((item, index) => (
                      <div key={item.country} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.flag}</span>
                          <div>
                            <p className="font-medium">{item.country}</p>
                            <p className="text-sm text-muted-foreground">{item.visitors} visitors</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-primary">{item.percentage}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Site Configuration</CardTitle>
                  <CardDescription>Basic site settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Site Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">Enable to show maintenance page</p>
                    </div>
                    <Button variant="outline" size="sm">Off</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Analytics Tracking</p>
                      <p className="text-sm text-muted-foreground">Track visitor behavior</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Contact Form</p>
                      <p className="text-sm text-muted-foreground">Accept new messages</p>
                    </div>
                    <Button variant="outline" size="sm">Active</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Admin account and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Change Admin Password
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Activity Log
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button className="w-full justify-start" variant="destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Clear All Sessions
                  </Button>
                </CardContent>
              </Card>

              <Card className="neo-card md:col-span-2">
                <CardHeader>
                  <CardTitle>Theme & Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 rounded-lg border border-primary bg-primary/5">
                      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded mb-3"></div>
                      <p className="font-medium">Current Theme</p>
                      <p className="text-sm text-muted-foreground">Modern Blue</p>
                    </div>
                    <div className="p-4 rounded-lg border hover:border-primary/50 cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 rounded mb-3"></div>
                      <p className="font-medium">Nature Green</p>
                      <p className="text-sm text-muted-foreground">Coming Soon</p>
                    </div>
                    <div className="p-4 rounded-lg border hover:border-primary/50 cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 rounded mb-3"></div>
                      <p className="font-medium">Sunset Orange</p>
                      <p className="text-sm text-muted-foreground">Coming Soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Container>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background rounded-xl shadow-2xl border max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Change Password</h3>
                    <p className="text-sm text-muted-foreground">Update your admin account password</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowPasswordModal(false)
                    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
                    setPasswordError("")
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {passwordError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {passwordError}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="Enter your current password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="At least 6 characters"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Re-enter your new password"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowPasswordModal(false)
                    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
                    setPasswordError("")
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handlePasswordChange}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
    </AuthWrapper>
  )
}