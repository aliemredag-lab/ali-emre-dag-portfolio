"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'tr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.articles": "Articles",
    "nav.register": "Register",
    "nav.contact": "Contact",
    "nav.admin": "Admin",

    // Hero Section
    "hero.contactMe": "Contact Me",
    "hero.scheduleMeeting": "Schedule Meeting",
    "hero.linkedin": "LinkedIn",
    "hero.loadingPhoto": "Loading profile photo...",

    // Projects Section
    "projects.title": "My Projects",
    "projects.description": "Projects I've developed using modern technologies and supply chain expertise",
    "projects.technologies": "Technologies",
    "projects.liveDemo": "Live Demo",
    "projects.code": "Code",
    "projects.completed": "Completed",
    "projects.inProgress": "In Progress",
    "projects.planned": "Planned",
    "projects.noProjects": "No projects added yet",
    "projects.addFromAdmin": "You can add your projects from the admin panel",

    // Testimonials
    "testimonials.title": "What Leaders Say",
    "testimonials.description": "Trusted by international organizations for supply chain excellence and operational leadership",
    "testimonials.originalPost": "Original Post",
    "testimonials.linkedinProfile": "LinkedIn Profile",
    "testimonials.viewMore": "Visit my LinkedIn profile for more references and testimonials",
    "testimonials.viewProfile": "View My LinkedIn Profile",
    "testimonials.quote1": "Ali Emre's expertise in logistics and supply chain is truly impressive. With his experience in international operations and strategic approach, he always achieves successful results.",
    "testimonials.author1": "Supply Chain Expert",
    "testimonials.company1": "International Logistics Company",
    "testimonials.highlight1": "Strategic Leadership",
    "testimonials.quote2": "Very professional and detailed working style. Thanks to his expertise in SAP and business intelligence tools, he significantly increased operational efficiency. I definitely recommend him.",
    "testimonials.author2": "Operations Manager",
    "testimonials.company2": "Technology Company",
    "testimonials.highlight2": "Operational Excellence",
    "testimonials.quote3": "His experience in global markets and cross-cultural team management skills are excellent. Working with Ali Emre was a great pleasure and learning experience.",
    "testimonials.author3": "Project Manager",
    "testimonials.company3": "Multinational Corporation",
    "testimonials.highlight3": "International Experience",

    // Posts
    "posts.title": "LinkedIn Articles",
    "posts.description": "Content I share on supply chain management, leadership, and my professional experiences",
    "posts.backToHome": "Back to Home",
    "posts.all": "All",
    "posts.supplyChain": "Supply Chain",
    "posts.leadership": "Leadership",
    "posts.technology": "Technology",
    "posts.insights": "Insights",
    "posts.noArticles": "No articles found in this category yet",
    "posts.viewAll": "View All Articles",

    // Admin
    "admin.title": "Admin Dashboard",
    "admin.description": "Manage your portfolio content and analytics",
    "admin.changePassword": "Change Password",
    "admin.currentPassword": "Current Password",
    "admin.newPassword": "New Password",
    "admin.confirmPassword": "Confirm New Password",
    "admin.cancel": "Cancel",
    "admin.save": "Save",
    "admin.update": "Update",
    "admin.delete": "Delete",
    "admin.edit": "Edit",
    "admin.add": "Add",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.confirm": "Confirm",
  },
  tr: {
    // Navigation
    "nav.home": "Ana Sayfa",
    "nav.about": "Hakkımda",
    "nav.experience": "Deneyim",
    "nav.skills": "Yetenekler",
    "nav.projects": "Projeler",
    "nav.articles": "Yazılarım",
    "nav.register": "Üye Ol",
    "nav.contact": "İletişim",
    "nav.admin": "Yönetici",

    // Hero Section
    "hero.contactMe": "İletişime Geç",
    "hero.scheduleMeeting": "Randevu Al",
    "hero.linkedin": "LinkedIn",
    "hero.loadingPhoto": "Profil fotoğrafı yükleniyor...",

    // Projects Section
    "projects.title": "Geliştirdiğim Projeler",
    "projects.description": "Modern teknolojiler ve tedarik zinciri uzmanlığı ile hayata geçirdiğim projeler",
    "projects.technologies": "Teknolojiler",
    "projects.liveDemo": "Canlı Demo",
    "projects.code": "Kod",
    "projects.completed": "Tamamlandı",
    "projects.inProgress": "Devam Ediyor",
    "projects.planned": "Planlandı",
    "projects.noProjects": "Henüz proje eklenmemiş",
    "projects.addFromAdmin": "Admin panelinden projelerinizi ekleyebilirsiniz",

    // Testimonials
    "testimonials.title": "Liderler Ne Diyor",
    "testimonials.description": "Tedarik zinciri mükemmelliği ve operasyonel liderlik için uluslararası kuruluşlar tarafından güvenilir",
    "testimonials.originalPost": "Orijinal Gönderi",
    "testimonials.linkedinProfile": "LinkedIn Profili",
    "testimonials.viewMore": "Daha fazla referans ve yorum için LinkedIn profilimi ziyaret edin",
    "testimonials.viewProfile": "LinkedIn Profilimi Görüntüle",

    // Posts
    "posts.title": "LinkedIn Yazılarım",
    "posts.description": "Tedarik zinciri yönetimi, liderlik ve profesyonel deneyimlerim üzerine paylaştığım içerikler",
    "posts.backToHome": "Ana Sayfaya Dön",
    "posts.all": "Tümü",
    "posts.supplyChain": "Tedarik Zinciri",
    "posts.leadership": "Liderlik",
    "posts.technology": "Teknoloji",
    "posts.insights": "İçgörüler",
    "posts.noArticles": "Bu kategoride henüz yazı bulunmuyor",
    "posts.viewAll": "Tüm Yazıları Gör",

    // Admin
    "admin.title": "Yönetici Paneli",
    "admin.description": "Portfolio içeriğinizi ve analizlerinizi yönetin",
    "admin.changePassword": "Şifre Değiştir",
    "admin.currentPassword": "Mevcut Şifre",
    "admin.newPassword": "Yeni Şifre",
    "admin.confirmPassword": "Yeni Şifre (Tekrar)",
    "admin.cancel": "İptal",
    "admin.save": "Kaydet",
    "admin.update": "Güncelle",
    "admin.delete": "Sil",
    "admin.edit": "Düzenle",
    "admin.add": "Ekle",

    // Common
    "common.loading": "Yükleniyor...",
    "common.error": "Hata",
    "common.success": "Başarılı",
    "common.confirm": "Onayla",
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language') as Language
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'tr')) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}