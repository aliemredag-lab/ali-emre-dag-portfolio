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
    "hero.title": "International Supply Chain Leader",
    "hero.description": "International Supply Chain Leader & Global Operations Expert",

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

    // About Section
    "about.title": "About Me",
    "about.description": "Learn more about my background and expertise",
    "about.expertise": "International Supply Chain Expertise",
    "about.globalOps": "Global Operations",
    "about.globalOpsDesc": "Led supply chain operations across 9 international markets",
    "about.globalOpsMetric": "9 Countries",
    "about.costOpt": "Cost Optimization",
    "about.costOptDesc": "Delivered strategic cost reductions through data-driven initiatives",
    "about.costOptMetric": "€5.5M Saved",
    "about.inventoryExc": "Inventory Excellence",
    "about.inventoryExcDesc": "Managed complex international inventory portfolios",
    "about.inventoryExcMetric": "€120M+ Managed",
    "about.teamLead": "Team Leadership",
    "about.teamLeadDesc": "Led cross-functional teams across multiple time zones",
    "about.teamLeadMetric": "8+ Years",
    "about.skill1": "Supply Chain Strategy & Optimization",
    "about.skill2": "International Operations Management",
    "about.skill3": "Lean Six Sigma Implementation",
    "about.skill4": "SAP ERP & Power BI Analytics",
    "about.skill5": "Cross-Cultural Team Leadership",
    "about.skill6": "Strategic Cost Reduction",
    "about.myJourney": "My Journey",
    "about.journeyText": "Results-driven Global Supply Chain Manager with 8+ years of proven expertise across global procurement, production planning, logistics orchestration, and multinational project leadership. As a certified supply chain strategist, I have spearheaded transformational operations for Renault Group and Bosch across 9 countries, managing €120M+ inventory portfolios and delivering €5.5M+ in operational savings through advanced Lean Six Sigma methodologies and data-driven decision frameworks.",

    // Experience Section
    "experience.title": "Professional Experience",
    "experience.description": "My journey in supply chain and operations management",
    "experience.present": "Present",
    "experience.careerJourney": "Career Journey",
    "experience.subtitle": "Leading supply chain transformations across global organizations",

    // Job Positions
    "jobs.renault.position": "Global Supply Chain & Inventory Manager",
    "jobs.renault.description": "Leading global inventory operations across 9 countries with €120M+ inventory levels.",
    "jobs.boschGrow.position": "Smart Project Development & Innovation",
    "jobs.boschGrow.description": "Led innovation projects using design thinking, UX research, MVP strategy, and growth loops.",
    "jobs.bosch.position": "Supply Chain Production & Customer Planner",
    "jobs.bosch.description": "Led supply chain planning across multiple production lines with focus on automation and efficiency.",
    "jobs.winn-dixie.position": "Logistics Operations Assistant",
    "jobs.winn-dixie.description": "Managed stock control, order tracking, logistics planning, and customer relations.",
    "jobs.adecco.position": "Logistics Operational Specialist",
    "jobs.adecco.description": "Coordinated vehicle dispatch operations and optimized port capacity.",

    // Skills Categories
    "skills.core.title": "Core Expertise",
    "skills.methods.title": "Methodologies",
    "skills.tools.title": "Tools & Technologies",
    "skills.soft.title": "Soft Skills",

    // Core Skills Individual
    "skills.core.supplyChain": "Supply Chain Management",
    "skills.core.projectMgmt": "Project Management",
    "skills.core.budgetMgmt": "Budget Management",
    "skills.core.kpiForecasting": "KPI & Forecasting",
    "skills.core.sop": "S&OP",
    "skills.core.negotiation": "Commercial Negotiation",
    "skills.core.relationship": "Relationship Building",
    "skills.core.decisionMaking": "Decision Making",
    "skills.core.businessStrategy": "Business Strategy",
    "skills.core.keyAccount": "Key Account Management",
    "skills.core.changeMgmt": "Change Management",

    // Methods
    "skills.methods.lean": "Lean Manufacturing",
    "skills.methods.sixSigma": "Six Sigma",
    "skills.methods.5s": "5S",
    "skills.methods.valueStream": "Value Stream Mapping",

    // Tools
    "skills.tools.sap": "SAP ERP",
    "skills.tools.powerbi": "Power BI",

    // Soft Skills
    "skills.soft.leadership": "Leadership & team management",
    "skills.soft.customer": "Customer service",
    "skills.soft.market": "Market & sales analysis",

    // Projects Translation
    "projects.project1.title": "Supply Chain Optimization Project",
    "projects.project1.description": "Optimization of inventory management and logistics processes through SAP integration developed for Renault Group. Achieved €2.5M in savings.",
    "projects.project2.title": "International Procurement System",
    "projects.project2.description": "Standardization and automation of integrated procurement processes across 9 different countries. Including vendor management and cost analysis.",
    "projects.project3.title": "Lean Manufacturing Implementation",
    "projects.project3.description": "Implementation of 5S, Kaizen and Six Sigma methodologies in Bosch factories. Achieved 35% efficiency improvement.",

    // Education and Certifications
    "education.title": "Education & Certifications",
    "education.description": "Continuous learning and professional development across supply chain and technology domains",
    "education.academicJourney": "Academic Journey",
    "education.professionalCerts": "Professional Certifications",
    "education.certsCredentials": "Certifications & Credentials",
    "education.credentials": "Credentials",

    // KPI Stats
    "stats.yearsExp": "Years Experience",
    "stats.yearsExpDesc": "Supply chain and operations management",
    "stats.costSaved": "Cost Saved",
    "stats.costSavedDesc": "Through optimization initiatives",
    "stats.inventoryManaged": "Inventory Managed",
    "stats.inventoryManagedDesc": "Global inventory operations",
    "stats.countriesCoverage": "Countries Coverage",
    "stats.countriesCoverageDesc": "Cross-regional project leadership",

    // Skills Section
    "skills.title": "Skills & Expertise",
    "skills.description": "Technical and professional capabilities",
    "skills.core": "Core Skills",
    "skills.methods": "Methods & Frameworks",
    "skills.tools": "Tools & Technologies",
    "skills.soft": "Soft Skills",
    "skills.coreCompetencies": "Core Competencies",
    "skills.methodologies": "Methodologies",
    "skills.leadership": "Leadership Skills",

    // Stats Section
    "stats.experience": "Years Experience",
    "stats.saved": "Cost Saved",
    "stats.managed": "Inventory Managed",
    "stats.countries": "Countries Coverage",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.description": "Let's discuss how we can work together",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.nameLabel": "Your Name",
    "contact.emailLabel": "Your Email",
    "contact.messageLabel": "Your Message",
    "contact.sending": "Sending...",
    "contact.sendMessage": "Send Message",
    "contact.emailError": "Please enter a valid email address",

    // Register Section
    "register.title": "Join My Network",
    "register.description": "Stay connected for updates and opportunities",


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
    "hero.title": "Uluslararası Tedarik Zinciri Lideri",
    "hero.description": "Uluslararası Tedarik Zinciri Lideri ve Global Operasyon Uzmanı",

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

    // About Section
    "about.title": "Hakkımda",
    "about.description": "Geçmişim ve uzmanlığım hakkında daha fazla bilgi edinin",
    "about.expertise": "Uluslararası Tedarik Zinciri Uzmanlığı",
    "about.globalOps": "Global Operasyonlar",
    "about.globalOpsDesc": "9 uluslararası pazarda tedarik zinciri operasyonlarını yönettim",
    "about.globalOpsMetric": "9 Ülke",
    "about.costOpt": "Maliyet Optimizasyonu",
    "about.costOptDesc": "Veri odaklı girişimlerle stratejik maliyet düşürme sağladım",
    "about.costOptMetric": "€5.5M Tasarruf",
    "about.inventoryExc": "Envanter Mükemmelliği",
    "about.inventoryExcDesc": "Karmaşık uluslararası envanter portföylerini yönettim",
    "about.inventoryExcMetric": "€120M+ Yönetilen",
    "about.teamLead": "Takım Liderliği",
    "about.teamLeadDesc": "Farklı zaman dilimlerinde çapraz fonksiyonel takımları yönettim",
    "about.teamLeadMetric": "8+ Yıl",
    "about.skill1": "Tedarik Zinciri Stratejisi ve Optimizasyonu",
    "about.skill2": "Uluslararası Operasyon Yönetimi",
    "about.skill3": "Lean Six Sigma Uygulaması",
    "about.skill4": "SAP ERP ve Power BI Analitik",
    "about.skill5": "Kültürler Arası Takım Liderliği",
    "about.skill6": "Stratejik Maliyet Düşürme",
    "about.myJourney": "Yolculuğum",
    "about.journeyText": "8+ yıllık kanıtlanmış uzmanlığa sahip sonuç odaklı Global Tedarik Zinciri Müdürü. Küresel satın alma, üretim planlama, lojistik orkestrasyon ve çok uluslu proje liderliği alanlarında uzmanım. Sertifikalı tedarik zinciri stratejisti olarak, Renault Group ve Bosch için 9 ülkede dönüşümsel operasyonlar yönettim, €120M+ envanter portföyleri yönettim ve gelişmiş Lean Six Sigma metodolojileri ve veri odaklı karar çerçeveleri aracılığıyla €5.5M+ operasyonel tasarruf sağladım.",

    // Experience Section
    "experience.title": "Profesyonel Deneyim",
    "experience.description": "Tedarik zinciri ve operasyon yönetimindeki yolculuğum",
    "experience.present": "Güncel",
    "experience.careerJourney": "Kariyer Yolculuğu",
    "experience.subtitle": "Global organizasyonlarda tedarik zinciri dönüşümlerini yönetiyorum",

    // Job Positions
    "jobs.renault.position": "Global Tedarik Zinciri ve Envanter Müdürü",
    "jobs.renault.description": "9 ülkede €120M+ envanter seviyesi ile küresel envanter operasyonlarını yönetiyorum.",
    "jobs.boschGrow.position": "Akıllı Proje Geliştirme ve İnovasyon",
    "jobs.boschGrow.description": "Tasarım düşüncesi, UX araştırması, MVP stratejisi ve büyüme döngüleri kullanarak inovasyon projelerini yönettim.",
    "jobs.bosch.position": "Tedarik Zinciri Üretim ve Müşteri Planlayıcısı",
    "jobs.bosch.description": "Otomasyon ve verimlilik odaklı çoklu üretim hatlarında tedarik zinciri planlamasını yönettim.",
    "jobs.winn-dixie.position": "Lojistik Operasyon Asistanı",
    "jobs.winn-dixie.description": "Stok kontrolü, sipariş takibi, lojistik planlama ve müşteri ilişkilerini yönettim.",
    "jobs.adecco.position": "Lojistik Operasyon Uzmanı",
    "jobs.adecco.description": "Araç sevkiyat operasyonlarını koordine ettim ve liman kapasitesini optimize ettim.",

    // Skills Categories
    "skills.core.title": "Temel Uzmanlık",
    "skills.methods.title": "Metodolojiler",
    "skills.tools.title": "Araçlar ve Teknolojiler",
    "skills.soft.title": "Yumuşak Beceriler",

    // Core Skills Individual
    "skills.core.supplyChain": "Tedarik Zinciri Yönetimi",
    "skills.core.projectMgmt": "Proje Yönetimi",
    "skills.core.budgetMgmt": "Bütçe Yönetimi",
    "skills.core.kpiForecasting": "KPI ve Tahmin",
    "skills.core.sop": "S&OP",
    "skills.core.negotiation": "Ticari Müzakere",
    "skills.core.relationship": "İlişki Kurma",
    "skills.core.decisionMaking": "Karar Verme",
    "skills.core.businessStrategy": "İş Stratejisi",
    "skills.core.keyAccount": "Anahtar Hesap Yönetimi",
    "skills.core.changeMgmt": "Değişim Yönetimi",

    // Methods
    "skills.methods.lean": "Yalın Üretim",
    "skills.methods.sixSigma": "Altı Sigma",
    "skills.methods.5s": "5S",
    "skills.methods.valueStream": "Değer Akışı Haritalama",

    // Tools
    "skills.tools.sap": "SAP ERP",
    "skills.tools.powerbi": "Power BI",

    // Soft Skills
    "skills.soft.leadership": "Liderlik ve takım yönetimi",
    "skills.soft.customer": "Müşteri hizmeti",
    "skills.soft.market": "Pazar ve satış analizi",

    // Projects Translation
    "projects.project1.title": "Tedarik Zinciri Optimizasyon Projesi",
    "projects.project1.description": "Renault Group için geliştirilen SAP entegrasyonu ile envanter yönetimi ve lojistik süreçlerinin optimizasyonu. €2.5M tasarruf sağlandı.",
    "projects.project2.title": "Uluslararası Tedarik Sistemi",
    "projects.project2.description": "9 farklı ülkede entegre tedarik süreçlerinin standardizasyonu ve otomasyonu. Tedarikçi yönetimi ve maliyet analizini içerir.",
    "projects.project3.title": "Yalın Üretim Uygulaması",
    "projects.project3.description": "Bosch fabrikalarında 5S, Kaizen ve Six Sigma metodolojilerinin uygulanması. %35 verimlilik artışı sağlandı.",

    // Education and Certifications
    "education.title": "Eğitim ve Sertifikalar",
    "education.description": "Tedarik zinciri ve teknoloji alanlarında sürekli öğrenme ve profesyonel gelişim",
    "education.academicJourney": "Akademik Yolculuk",
    "education.professionalCerts": "Profesyonel Sertifikalar",
    "education.certsCredentials": "Sertifikalar ve Belgeler",
    "education.credentials": "Belgeler",

    // KPI Stats
    "stats.yearsExp": "Yıl Deneyim",
    "stats.yearsExpDesc": "Tedarik zinciri ve operasyon yönetimi",
    "stats.costSaved": "Tasarruf Edilen Maliyet",
    "stats.costSavedDesc": "Optimizasyon girişimleri ile",
    "stats.inventoryManaged": "Yönetilen Envanter",
    "stats.inventoryManagedDesc": "Global envanter operasyonları",
    "stats.countriesCoverage": "Ülke Kapsamı",
    "stats.countriesCoverageDesc": "Bölgeler arası proje liderliği",

    // Skills Section
    "skills.title": "Yetenekler ve Uzmanlık",
    "skills.description": "Teknik ve profesyonel kabiliyetler",
    "skills.core": "Temel Yetenekler",
    "skills.methods": "Metodlar ve Çerçeveler",
    "skills.tools": "Araçlar ve Teknolojiler",
    "skills.soft": "Yumuşak Beceriler",
    "skills.coreCompetencies": "Temel Yetkinlikler",
    "skills.methodologies": "Metodolojiler",
    "skills.leadership": "Liderlik Becerileri",

    // Stats Section
    "stats.experience": "Yıl Deneyim",
    "stats.saved": "Tasarruf Edilen Maliyet",
    "stats.managed": "Yönetilen Envanter",
    "stats.countries": "Ülke Kapsamı",

    // Contact Section
    "contact.title": "İletişime Geçin",
    "contact.description": "Nasıl birlikte çalışabileceğimizi konuşalım",
    "contact.email": "E-posta",
    "contact.phone": "Telefon",
    "contact.location": "Konum",
    "contact.nameLabel": "Adınız",
    "contact.emailLabel": "E-posta Adresiniz",
    "contact.messageLabel": "Mesajınız",
    "contact.sending": "Gönderiliyor...",
    "contact.sendMessage": "Mesaj Gönder",
    "contact.emailError": "Lütfen geçerli bir e-posta adresi girin",

    // Register Section
    "register.title": "Ağıma Katılın",
    "register.description": "Güncellemeler ve fırsatlar için bağlantıda kalın",

    // Experience Translation
    "profile.aboutText": "Ali Emre Dağ, tedarik zinciri yönetiminde 8+ yıllık kanıtlanmış uzmanlığa sahip başarılı bir Uluslararası Tedarik Zinciri Lideridir. Küresel satın alma, üretim planlama, lojistik orkestrasyon ve çok uluslu proje liderliği alanlarında deneyimlidir.",

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