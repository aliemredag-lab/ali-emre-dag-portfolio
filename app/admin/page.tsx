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
  X
} from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  {
    title: "Total Views",
    value: "12,543",
    change: "+15.3%",
    icon: Eye,
    color: "text-blue-600"
  },
  {
    title: "Contact Forms",
    value: "23",
    change: "+12.5%",
    icon: Mail,
    color: "text-purple-600"
  },
  {
    title: "Page Performance",
    value: "98%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-orange-600"
  },
  {
    title: "Active Visitors",
    value: "156",
    change: "+5.2%",
    icon: Users,
    color: "text-green-600"
  }
]

const recentActivities = [
  {
    action: "Contact Form Submitted",
    user: "John Doe",
    time: "15 minutes ago",
    location: "New York, US"
  },
  {
    action: "Profile Viewed",
    user: "Anonymous User",
    time: "1 hour ago",
    location: "London, UK"
  },
  {
    action: "Skills Section Viewed",
    user: "Anonymous User",
    time: "2 hours ago",
    location: "Berlin, DE"
  },
  {
    action: "Experience Page Visited",
    user: "Sarah Wilson",
    time: "3 hours ago",
    location: "Toronto, CA"
  }
]

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [liveStats, setLiveStats] = useState(stats)
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
    localStorage.removeItem("admin-auth")
    router.push("/admin/login")
  }

  const handlePasswordChange = async () => {
    setPasswordError("")

    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError("Tüm alanları doldurun")
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Yeni şifreler eşleşmiyor")
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Yeni şifre en az 6 karakter olmalı")
      return
    }

    // Check current password (in a real app, this would be done server-side)
    const storedPassword = localStorage.getItem("admin-password") || "admin123"
    if (passwordForm.currentPassword !== storedPassword) {
      setPasswordError("Mevcut şifre yanlış")
      return
    }

    // Save new password
    localStorage.setItem("admin-password", passwordForm.newPassword)

    // Reset form and close modal
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setShowPasswordModal(false)
    setNotification("✅ Şifre başarıyla değiştirildi!")
    setTimeout(() => setNotification(null), 4000)
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
                      LinkedIn Yazıları
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
                        desc: "Main banner and introduction",
                        lastEdit: "2 days ago",
                        status: "Published"
                      },
                      {
                        title: "About Me",
                        desc: "Personal information and bio",
                        lastEdit: "1 week ago",
                        status: "Published"
                      },
                      {
                        title: "Experience",
                        desc: "Work history and roles",
                        lastEdit: "3 days ago",
                        status: "Published"
                      },
                      {
                        title: "Skills",
                        desc: "Technical and soft skills",
                        lastEdit: "5 days ago",
                        status: "Published"
                      },
                      {
                        title: "Education",
                        desc: "Academic background",
                        lastEdit: "1 week ago",
                        status: "Published"
                      },
                      {
                        title: "Contact",
                        desc: "Contact information and form",
                        lastEdit: "2 weeks ago",
                        status: "Published"
                      },
                      {
                        title: "Profile Photo",
                        desc: "Upload and manage profile image",
                        lastEdit: "Never",
                        status: "No Photo"
                      },
                      {
                        title: "Projects",
                        desc: "Manage completed projects",
                        lastEdit: "1 day ago",
                        status: "3 Projects"
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
                        action: "Updated Experience section",
                        section: "Experience",
                        time: "3 days ago",
                        user: "Admin",
                        type: "edit"
                      },
                      {
                        action: "Added new skill: React 18",
                        section: "Skills",
                        time: "5 days ago",
                        user: "Admin",
                        type: "add"
                      },
                      {
                        action: "Modified contact information",
                        section: "Contact",
                        time: "1 week ago",
                        user: "Admin",
                        type: "edit"
                      },
                      {
                        action: "Updated profile photo",
                        section: "Hero",
                        time: "2 weeks ago",
                        user: "Admin",
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
                    <h3 className="text-lg font-semibold">Şifre Değiştir</h3>
                    <p className="text-sm text-muted-foreground">Admin hesabınızın şifresini güncelle</p>
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
                  <Label htmlFor="current-password">Mevcut Şifre</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="Mevcut şifrenizi girin"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Yeni Şifre</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="En az 6 karakter"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Yeni Şifre (Tekrar)</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Yeni şifrenizi tekrar girin"
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
                  İptal
                </Button>
                <Button
                  className="flex-1"
                  onClick={handlePasswordChange}
                >
                  Şifreyi Değiştir
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