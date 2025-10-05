"use client"

import { useState, useEffect } from "react"
import { AuthWrapper } from "@/components/admin/auth-wrapper"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, User, Calendar, Trash2, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = () => {
    try {
      const savedMessages = localStorage.getItem('contact-messages')
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages))
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      const updatedMessages = messages.filter(msg => msg.id !== id)
      setMessages(updatedMessages)
      localStorage.setItem('contact-messages', JSON.stringify(updatedMessages))

      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    }
  }

  const handleClearAll = () => {
    if (confirm('Tüm mesajları silmek istediğinizden emin misiniz?')) {
      setMessages([])
      setSelectedMessage(null)
      localStorage.removeItem('contact-messages')
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-background">
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
                  <h1 className="text-2xl font-bold">İletişim Mesajları</h1>
                  <p className="text-muted-foreground">Form üzerinden gelen mesajlar</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-4 py-2">
                  <Mail className="w-4 h-4 mr-2" />
                  {messages.length} Mesaj
                </Badge>
                {messages.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearAll}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Tümünü Sil
                  </Button>
                )}
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Gelen Mesajlar</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Henüz mesaj yok</p>
                    </div>
                  ) : (
                    <div className="max-h-[600px] overflow-y-auto">
                      {messages.map((msg, index) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => setSelectedMessage(msg)}
                            className={`w-full text-left p-4 border-b hover:bg-muted/50 transition-colors ${
                              selectedMessage?.id === msg.id ? 'bg-muted' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="font-medium text-sm truncate">
                                  {msg.name}
                                </span>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDelete(msg.id)
                                }}
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>

                            <p className="text-xs text-muted-foreground truncate mb-2">
                              {msg.email}
                            </p>

                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {msg.message}
                            </p>

                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {formatTimestamp(msg.timestamp)}
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle>{selectedMessage.name}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {selectedMessage.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatTimestamp(selectedMessage.timestamp)}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = `mailto:${selectedMessage.email}`}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Yanıtla
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(selectedMessage.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Sil
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Mesaj:</h4>
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-20">
                    <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Mesaj Seçin</h3>
                    <p className="text-muted-foreground">
                      Detayları görmek için sol taraftan bir mesaj seçin
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </div>
    </AuthWrapper>
  )
}
