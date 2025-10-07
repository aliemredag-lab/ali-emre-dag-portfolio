"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthWrapper } from "@/components/admin/auth-wrapper"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, User, Trash2, Camera } from "lucide-react"
import { motion } from "framer-motion"

export default function MediaManagementPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Load saved image on component mount
  useEffect(() => {
    const saved = localStorage.getItem('profile-image')
    if (saved) {
      setProfileImage(saved)
    } else {
      setProfileImage('/profile.jpg')
    }
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        setIsUploading(false)
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        setIsUploading(false)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setProfileImage(imageData)
        localStorage.setItem('profile-image', imageData)
        setIsUploading(false)

        // Show success message
        alert('Profile photo updated successfully! Refresh the homepage to see changes.')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
    localStorage.removeItem('profile-image')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
                  <h1 className="text-2xl font-bold">Media Management</h1>
                  <p className="text-muted-foreground">Upload and manage your profile photo</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-8">
          <div className="max-w-2xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Profile Photo
                  </CardTitle>
                  <CardDescription>
                    Upload your profile photo that will appear on your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Photo Preview */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-glow">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                            <User className="w-20 h-20 text-primary/40" />
                          </div>
                        )}
                      </div>
                      {profileImage && (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                          onClick={handleRemoveImage}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Upload Area */}
                  <div className="space-y-4">
                    <div
                      className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload Photo</h3>
                      <p className="text-muted-foreground mb-4">
                        Click to select or drag and drop your image here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports: JPG, PNG, GIF (Max 5MB)
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <div className="flex justify-center">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="glow-button"
                      >
                        {isUploading ? (
                          "Uploading..."
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Upload Guidelines */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Photo Guidelines:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Use a high-quality, recent photo</li>
                      <li>• Square images work best (1:1 ratio)</li>
                      <li>• Face should be clearly visible</li>
                      <li>• Professional or semi-professional appearance</li>
                      <li>• Good lighting and clear background</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common media management tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <a href="/" target="_blank">
                      <User className="w-4 h-4 mr-2" />
                      Preview on Website
                    </a>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <a href="/admin">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Dashboard
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </div>
    </AuthWrapper>
  )
}