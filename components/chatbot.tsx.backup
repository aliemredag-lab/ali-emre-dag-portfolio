"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, User, Bot, Download, Mail, Linkedin, Phone, Briefcase, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { profileData } from "@/data/profile"

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  quickActions?: QuickAction[]
}

interface QuickAction {
  label: string
  icon?: any
  action: () => void
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatLanguage, setChatLanguage] = useState<'tr' | 'en'>('tr') // Default Turkish
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Detect language from user message
  const detectLanguage = (text: string): 'tr' | 'en' => {
    const turkishWords = ['merhaba', 'selam', 'naber', 'nasıl', 'teşekkür', 'lütfen', 'evet', 'hayır', 'iyi', 'güzel']
    const englishWords = ['hello', 'hi', 'how', 'thank', 'please', 'yes', 'no', 'good', 'great']

    const lowerText = text.toLowerCase()

    const turkishCount = turkishWords.filter(word => lowerText.includes(word)).length
    const englishCount = englishWords.filter(word => lowerText.includes(word)).length

    return turkishCount > englishCount ? 'tr' : 'en'
  }

  // Save chat log to server
  const saveChatLog = async (message: string, type: 'user' | 'bot') => {
    try {
      await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message,
          type
        })
      })
    } catch (error) {
      console.error('Failed to save chat log:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Welcome message when chatbot opens (bilingual)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const welcomeMessages = {
          tr: `Merhaba! 👋 Ben ${profileData.name}'ın dijital asistanıyım. Size nasıl yardımcı olabilirim?`,
          en: `Hello! 👋 I'm ${profileData.name}'s digital assistant. How can I help you?`
        }

        const quickActionsLabels = {
          tr: [
            { label: "📄 CV İndir", icon: Download, action: () => handleQuickAction("cv") },
            { label: "💼 Deneyim", icon: Briefcase, action: () => handleQuickAction("experience") },
            { label: "🎓 Eğitim", icon: GraduationCap, action: () => handleQuickAction("education") },
            { label: "📧 İletişim", icon: Mail, action: () => handleQuickAction("contact") },
          ],
          en: [
            { label: "📄 Download CV", icon: Download, action: () => handleQuickAction("cv") },
            { label: "💼 Experience", icon: Briefcase, action: () => handleQuickAction("experience") },
            { label: "🎓 Education", icon: GraduationCap, action: () => handleQuickAction("education") },
            { label: "📧 Contact", icon: Mail, action: () => handleQuickAction("contact") },
          ]
        }

        addBotMessage(
          welcomeMessages[chatLanguage],
          quickActionsLabels[chatLanguage]
        )
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = (content: string, quickActions?: QuickAction[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      quickActions
    }
    setMessages(prev => [...prev, newMessage])
    saveChatLog(content, 'bot')
  }

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    saveChatLog(content, 'user')
  }

  const getIntelligentResponse = (userMessage: string): { message: string; actions?: QuickAction[] } => {
    const msg = userMessage.toLowerCase().trim()

    // Detect language and update state
    const detectedLang = detectLanguage(msg)
    setChatLanguage(detectedLang)
    const lang = detectedLang

    // Greeting responses
    if (msg.match(/^(merhaba|selam|hi|hello|hey|günaydın|iyi günler|good morning)/)) {
      return {
        message: lang === 'tr'
          ? `Merhaba! 😊 Ben ${profileData.name}'ın asistanıyım. Size nasıl yardımcı olabilirim?`
          : `Hello! 😊 I'm ${profileData.name}'s assistant. How can I help you?`,
        actions: lang === 'tr' ? [
          { label: "📄 CV", icon: Download, action: () => handleQuickAction("cv") },
          { label: "💼 İş Deneyimi", icon: Briefcase, action: () => handleQuickAction("experience") },
          { label: "📧 İletişim", icon: Mail, action: () => handleQuickAction("contact") }
        ] : [
          { label: "📄 Resume", icon: Download, action: () => handleQuickAction("cv") },
          { label: "💼 Experience", icon: Briefcase, action: () => handleQuickAction("experience") },
          { label: "📧 Contact", icon: Mail, action: () => handleQuickAction("contact") }
        ]
      }
    }

    // Experience related
    if (msg.match(/(deneyim|iş|kariyer|tecrübe|experience|work|job|career)/)) {
      const currentRole = profileData.experience[0]
      return {
        message: lang === 'tr'
          ? `${profileData.name} şu an **${currentRole.company}** şirketinde **${currentRole.position}** olarak çalışıyor (${currentRole.startDate} - ${currentRole.endDate}).\n\n📊 Temel başarılar:\n${currentRole.highlights.slice(0, 3).map(h => `• ${h}`).join('\n')}\n\nToplam ${profileData.kpiStats.find(s => s.label === "Years Experience")?.value} yıl deneyim ve ${profileData.kpiStats.find(s => s.label === "Countries Coverage")?.value} ülkede proje yönetimi deneyimi var.`
          : `${profileData.name} is currently working at **${currentRole.company}** as **${currentRole.position}** (${currentRole.startDate} - ${currentRole.endDate}).\n\n📊 Key achievements:\n${currentRole.highlights.slice(0, 3).map(h => `• ${h}`).join('\n')}\n\nTotal ${profileData.kpiStats.find(s => s.label === "Years Experience")?.value} years of experience and project management across ${profileData.kpiStats.find(s => s.label === "Countries Coverage")?.value} countries.`,
        actions: lang === 'tr' ? [
          { label: "📄 Tam CV", icon: Download, action: () => handleQuickAction("cv") },
          { label: "🎯 Yetenekler", icon: Briefcase, action: () => handleQuickAction("skills") }
        ] : [
          { label: "📄 Full Resume", icon: Download, action: () => handleQuickAction("cv") },
          { label: "🎯 Skills", icon: Briefcase, action: () => handleQuickAction("skills") }
        ]
      }
    }

    // Education related
    if (msg.match(/(eğitim|üniversite|okul|education|university|degree|mba)/)) {
      return {
        message: lang === 'tr'
          ? `🎓 **Eğitim Geçmişi:**\n\n${profileData.education.map(edu =>
            `**${edu.degree}**\n${edu.institution} - ${edu.location}\n${edu.period}${edu.gpa ? ` (GPA: ${edu.gpa})` : ''}`
          ).join('\n\n')}\n\nAyrıca ${profileData.certifications.length} adet profesyonel sertifikaya sahip.`
          : `🎓 **Educational Background:**\n\n${profileData.education.map(edu =>
            `**${edu.degree}**\n${edu.institution} - ${edu.location}\n${edu.period}${edu.gpa ? ` (GPA: ${edu.gpa})` : ''}`
          ).join('\n\n')}\n\nAlso holds ${profileData.certifications.length} professional certifications.`,
        actions: lang === 'tr' ? [
          { label: "📜 Sertifikalar", icon: GraduationCap, action: () => handleQuickAction("certifications") }
        ] : [
          { label: "📜 Certifications", icon: GraduationCap, action: () => handleQuickAction("certifications") }
        ]
      }
    }

    // Skills related
    if (msg.match(/(yetenek|beceri|skill|teknoloji|tool|software|technology)/)) {
      return {
        message: `💡 **${lang === 'tr' ? 'Temel Yetenekler' : 'Core Skills'}:**\n\n**Core Skills:**\n${profileData.skills.core.slice(0, 6).join(', ')}\n\n**Tools & Technologies:**\n${profileData.skills.tools.join(', ')}\n\n**Methodologies:**\n${profileData.skills.methods.join(', ')}`,
        actions: lang === 'tr' ? [
          { label: "📄 Detaylı CV", icon: Download, action: () => handleQuickAction("cv") }
        ] : [
          { label: "📄 Full Resume", icon: Download, action: () => handleQuickAction("cv") }
        ]
      }
    }

    // Certifications
    if (msg.match(/(sertifika|certification|course|kurs)/)) {
      const certsByCategory = profileData.certifications.reduce((acc, cert) => {
        if (!acc[cert.category]) acc[cert.category] = []
        acc[cert.category].push(cert.name)
        return acc
      }, {} as Record<string, string[]>)

      const certText = Object.entries(certsByCategory).map(([category, certs]) =>
        `**${category}:**\n${certs.slice(0, 3).map(c => `• ${c}`).join('\n')}`
      ).join('\n\n')

      return {
        message: lang === 'tr'
          ? `📜 **Sertifikalar (${profileData.certifications.length} adet):**\n\n${certText}`
          : `📜 **Certifications (${profileData.certifications.length} total):**\n\n${certText}`
      }
    }

    // Contact information
    if (msg.match(/(iletişim|contact|email|telefon|phone|ulaş|reach)/)) {
      return {
        message: lang === 'tr'
          ? `📧 **İletişim Bilgileri:**\n\n📩 Email: ${profileData.contact.email}\n📱 Telefon: ${profileData.contact.phone}\n📍 Konum: ${profileData.contact.location}`
          : `📧 **Contact Information:**\n\n📩 Email: ${profileData.contact.email}\n📱 Phone: ${profileData.contact.phone}\n📍 Location: ${profileData.contact.location}`,
        actions: lang === 'tr' ? [
          { label: "📧 Email Gönder", icon: Mail, action: () => window.location.href = `mailto:${profileData.contact.email}` },
          { label: "💼 LinkedIn", icon: Linkedin, action: () => window.open('https://www.linkedin.com/in/aliemredag/', '_blank') },
          { label: "📞 Ara", icon: Phone, action: () => window.location.href = `tel:${profileData.contact.phone}` }
        ] : [
          { label: "📧 Send Email", icon: Mail, action: () => window.location.href = `mailto:${profileData.contact.email}` },
          { label: "💼 LinkedIn", icon: Linkedin, action: () => window.open('https://www.linkedin.com/in/aliemredag/', '_blank') },
          { label: "📞 Call", icon: Phone, action: () => window.location.href = `tel:${profileData.contact.phone}` }
        ]
      }
    }

    // CV Download
    if (msg.match(/(cv|özgeçmiş|resume|download|indir)/)) {
      return {
        message: lang === 'tr'
          ? `📄 CV'yi indirmek için aşağıdaki butona tıklayabilirsiniz. Ayrıca detaylı bilgi için LinkedIn profilini de ziyaret edebilirsiniz.`
          : `📄 You can download the resume by clicking the button below. You can also visit the LinkedIn profile for detailed information.`,
        actions: lang === 'tr' ? [
          { label: "📄 CV İndir", icon: Download, action: () => handleQuickAction("cv") },
          { label: "💼 LinkedIn", icon: Linkedin, action: () => window.open('https://www.linkedin.com/in/aliemredag/', '_blank') }
        ] : [
          { label: "📄 Download Resume", icon: Download, action: () => handleQuickAction("cv") },
          { label: "💼 LinkedIn", icon: Linkedin, action: () => window.open('https://www.linkedin.com/in/aliemredag/', '_blank') }
        ]
      }
    }

    // Projects
    if (msg.match(/(proje|project|portfolio|çalışma|work)/)) {
      return {
        message: lang === 'tr'
          ? `🚀 **Öne Çıkan Projeler:**\n\n${profileData.projects.filter(p => p.featured).map(proj =>
            `**${proj.title}**\n${proj.description}\n🛠️ ${proj.technologies.join(', ')}`
          ).join('\n\n')}`
          : `🚀 **Featured Projects:**\n\n${profileData.projects.filter(p => p.featured).map(proj =>
            `**${proj.title}**\n${proj.description}\n🛠️ ${proj.technologies.join(', ')}`
          ).join('\n\n')}`
      }
    }

    // Languages
    if (msg.match(/(dil|language|konuş|speak)/)) {
      return {
        message: lang === 'tr'
          ? `🌍 **Dil Becerileri:**\n\n${profileData.languages.map(lang =>
            `• ${lang.name}: ${lang.level}`
          ).join('\n')}`
          : `🌍 **Language Skills:**\n\n${profileData.languages.map(lang =>
            `• ${lang.name}: ${lang.level}`
          ).join('\n')}`
      }
    }

    // Stats/Achievements
    if (msg.match(/(başarı|achievement|stat|kpi|rakam|number)/)) {
      return {
        message: lang === 'tr'
          ? `📊 **Temel Başarılar ve KPI'lar:**\n\n${profileData.kpiStats.map(stat =>
            `**${stat.value}** ${stat.label}\n${stat.description}`
          ).join('\n\n')}`
          : `📊 **Key Achievements and KPIs:**\n\n${profileData.kpiStats.map(stat =>
            `**${stat.value}** ${stat.label}\n${stat.description}`
          ).join('\n\n')}`
      }
    }

    // Thank you
    if (msg.match(/(teşekkür|thanks|thank you|sağol)/)) {
      return {
        message: lang === 'tr'
          ? `Rica ederim! 😊 Başka bir konuda yardımcı olabilir miyim?`
          : `You're welcome! 😊 Can I help you with anything else?`,
        actions: lang === 'tr' ? [
          { label: "📧 İletişim", icon: Mail, action: () => handleQuickAction("contact") },
          { label: "📄 CV İndir", icon: Download, action: () => handleQuickAction("cv") }
        ] : [
          { label: "📧 Contact", icon: Mail, action: () => handleQuickAction("contact") },
          { label: "📄 Download Resume", icon: Download, action: () => handleQuickAction("cv") }
        ]
      }
    }

    // Default response with suggestions
    return {
      message: lang === 'tr'
        ? `Anlamadım, ama size şu konularda yardımcı olabilirim:\n\n• İş deneyimi ve kariyer\n• Eğitim ve sertifikalar\n• Yetenekler ve teknolojiler\n• Projeler\n• İletişim bilgileri\n• CV indirme\n\nHangi konuda bilgi almak istersiniz?`
        : `I didn't understand, but I can help you with:\n\n• Work experience and career\n• Education and certifications\n• Skills and technologies\n• Projects\n• Contact information\n• Resume download\n\nWhat would you like to know about?`,
      actions: lang === 'tr' ? [
        { label: "💼 Deneyim", icon: Briefcase, action: () => handleQuickAction("experience") },
        { label: "🎓 Eğitim", icon: GraduationCap, action: () => handleQuickAction("education") },
        { label: "📧 İletişim", icon: Mail, action: () => handleQuickAction("contact") }
      ] : [
        { label: "💼 Experience", icon: Briefcase, action: () => handleQuickAction("experience") },
        { label: "🎓 Education", icon: GraduationCap, action: () => handleQuickAction("education") },
        { label: "📧 Contact", icon: Mail, action: () => handleQuickAction("contact") }
      ]
    }
  }

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      cv: "CV indir",
      experience: "İş deneyimi hakkında bilgi ver",
      education: "Eğitim geçmişi hakkında bilgi ver",
      contact: "İletişim bilgilerini göster",
      skills: "Yetenekler hakkında bilgi ver",
      certifications: "Sertifikalar hakkında bilgi ver"
    }

    if (action === "cv") {
      window.open('/Ali-Emre-Dag-Resume.pdf', '_blank')
      addUserMessage("CV indirmek istiyorum")
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          addBotMessage("✅ CV indirildi! Başka bir konuda yardımcı olabilir miyim?")
        }, 1000)
      }, 500)
      return
    }

    const message = actionMessages[action] || action
    handleSendMessage(message)
  }

  const handleSendMessage = (customMessage?: string) => {
    const messageToSend = customMessage || inputValue.trim()
    if (!messageToSend) return

    addUserMessage(messageToSend)
    setInputValue("")

    // Simulate typing delay
    setIsTyping(true)
    setTimeout(() => {
      const response = getIntelligentResponse(messageToSend)
      setIsTyping(false)
      addBotMessage(response.message, response.actions)
    }, 800 + Math.random() * 400) // Random delay for more natural feel
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="relative group">
              {/* Pulse Animation Ring */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-20"></span>

              <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-110 transition-all duration-300 relative"
              >
                <div className="relative">
                  <Bot className="h-8 w-8 text-white" />
                  <span className="absolute -top-2 -right-2 h-3 w-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
                </div>
              </Button>

              {/* Floating Label */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute right-20 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl rounded-lg px-4 py-2.5 whitespace-nowrap"
              >
                <div>
                  <span className="font-semibold text-sm block text-white">Chatbot 💬</span>
                  <span className="text-xs text-blue-100">Sorularınızı yanıtlıyorum</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"
          >
            <Card className="h-full flex flex-col shadow-2xl border-2 dark:border-gray-700 bg-white dark:bg-gray-800">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                      <Bot className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Asistan</h3>
                    <p className="text-xs text-blue-100">Online • Hemen yanıt veriyor</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-purple-600 to-blue-600'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Bot className="h-5 w-5 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div>
                        <div className={`rounded-2xl px-4 py-2 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm text-gray-900 dark:text-gray-100'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>

                        {/* Quick Actions */}
                        {message.quickActions && message.quickActions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.quickActions.map((action, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                onClick={action.action}
                                className="text-xs h-8 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                              >
                                {action.icon && <action.icon className="h-3 w-3 mr-1" />}
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 px-1">
                          {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Mesajınızı yazın..."
                    className="flex-1 bg-white dark:bg-gray-900 dark:border-gray-700"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
                  Powered by AI • Türkçe & English
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
