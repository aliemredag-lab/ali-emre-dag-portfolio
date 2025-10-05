"use client"

import { useState, useEffect } from "react"
import { AuthWrapper } from "@/components/admin/auth-wrapper"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MessageCircle, User, Bot, Calendar, Clock, Search, Trash2, Filter } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface ChatMessage {
  type: 'user' | 'bot'
  content: string
  timestamp: string
}

interface ChatLog {
  id: string
  sessionId: string
  messages: ChatMessage[]
  startTime: string
  lastActivity: string
  userInfo?: {
    userAgent?: string
    ip?: string
  }
}

export default function AdminChatsPage() {
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([])
  const [selectedChat, setSelectedChat] = useState<ChatLog | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDate, setFilterDate] = useState("")

  // Load chat logs
  useEffect(() => {
    loadChatLogs()
  }, [])

  const loadChatLogs = async () => {
    try {
      const response = await fetch('/api/chatbot')
      const data = await response.json()
      if (data.success && data.logs) {
        setChatLogs(data.logs)
      }
    } catch (error) {
      console.error('Error loading chat logs:', error)
    }
  }

  const handleDeleteChat = (id: string) => {
    if (confirm('Bu sohbet kaydını silmek istediğinizden emin misiniz?')) {
      // Filter out the deleted chat
      const updatedLogs = chatLogs.filter(log => log.id !== id)
      setChatLogs(updatedLogs)

      // Update localStorage
      localStorage.setItem('chat-logs', JSON.stringify(updatedLogs))

      if (selectedChat?.id === id) {
        setSelectedChat(null)
      }
    }
  }

  const handleClearAllChats = () => {
    if (confirm('Tüm sohbet kayıtlarını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
      setChatLogs([])
      setSelectedChat(null)
      localStorage.removeItem('chat-logs')
    }
  }

  // Filter chats
  const filteredChats = chatLogs.filter(chat => {
    const matchesSearch = searchQuery === "" ||
      chat.messages.some(msg =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )

    const matchesDate = filterDate === "" ||
      new Date(chat.startTime).toISOString().split('T')[0] === filterDate

    return matchesSearch && matchesDate
  })

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime()
    const end = new Date(endTime).getTime()
    const durationMs = end - start
    const minutes = Math.floor(durationMs / 60000)
    const seconds = Math.floor((durationMs % 60000) / 1000)
    return `${minutes}dk ${seconds}sn`
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
                  <h1 className="text-2xl font-bold">Chatbot Konuşmaları</h1>
                  <p className="text-muted-foreground">Ziyaretçi sohbetlerini görüntüleyin</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-4 py-2">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {filteredChats.length} Sohbet
                </Badge>
                {chatLogs.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearAllChats}
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
            {/* Chat List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sohbet Geçmişi</CardTitle>

                  {/* Search and Filter */}
                  <div className="space-y-2 mt-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Mesajlarda ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredChats.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Henüz sohbet kaydı yok</p>
                    </div>
                  ) : (
                    <div className="max-h-[600px] overflow-y-auto">
                      {filteredChats.map((chat, index) => (
                        <motion.div
                          key={chat.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => setSelectedChat(chat)}
                            className={`w-full text-left p-4 border-b hover:bg-muted/50 transition-colors ${
                              selectedChat?.id === chat.id ? 'bg-muted' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="font-medium text-sm truncate">
                                  Ziyaretçi #{chat.id.slice(-6)}
                                </span>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteChat(chat.id)
                                }}
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {chat.messages[0]?.content || 'Mesaj yok'}
                            </p>

                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {chat.messages.length}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTimestamp(chat.startTime)}
                              </div>
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Chat Detail */}
            <div className="lg:col-span-2">
              {selectedChat ? (
                <Card>
                  <CardHeader>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>Sohbet Detayı</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Session ID: {selectedChat.sessionId}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {selectedChat.messages.length} Mesaj
                        </Badge>
                      </div>

                      {/* Session Info */}
                      <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Başlangıç</p>
                          <p className="font-medium">{formatTimestamp(selectedChat.startTime)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Son Aktivite</p>
                          <p className="font-medium">{formatTimestamp(selectedChat.lastActivity)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Süre</p>
                          <p className="font-medium">
                            {formatDuration(selectedChat.startTime, selectedChat.lastActivity)}
                          </p>
                        </div>
                        {selectedChat.userInfo?.ip && (
                          <div>
                            <p className="text-muted-foreground mb-1">IP</p>
                            <p className="font-medium font-mono text-xs">{selectedChat.userInfo.ip}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                      {selectedChat.messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex gap-3 ${
                            message.type === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {message.type === 'bot' && (
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          )}

                          <div className={`flex-1 max-w-[80%]`}>
                            <div
                              className={`rounded-2xl px-4 py-3 ${
                                message.type === 'user'
                                  ? 'bg-blue-600 text-white ml-auto'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap break-words">
                                {message.content}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 px-2">
                              {formatTimestamp(message.timestamp)}
                            </p>
                          </div>

                          {message.type === 'user' && (
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-20">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Sohbet Seçin</h3>
                    <p className="text-muted-foreground">
                      Detayları görmek için sol taraftan bir sohbet seçin
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
