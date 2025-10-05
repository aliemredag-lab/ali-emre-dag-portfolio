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
    "testimonials.badge": "Professional Recognition",
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
    "experience.keyAchievements": "Key Achievements",
    "experience.specializedRoles": "Specialized Roles",

    // Job Positions
    "jobs.renault.position": "Global Supply Chain & Inventory Manager",
    "jobs.renault.description": "Leading global inventory operations across 9 countries with €120M+ inventory levels.",
    "jobs.renault.highlight1": "Manages global inventory operations across 9 countries; €120M+ inventory levels",
    "jobs.renault.highlight2": "Achieved €5.5M cost reduction via after-sales inventory optimization",
    "jobs.renault.highlight3": "Leads cross-regional projects (destocking, commercial actions) aligned with market dynamics",
    "jobs.renault.highlight4": "Owns KPI frameworks, continuous improvement, and S&OP participation for accurate demand alignment",
    "jobs.renault.highlight5": "Proactively manages risk to ensure continuity and resilience",
    "jobs.boschGrow.position": "Smart Project Development & Innovation",
    "jobs.boschGrow.description": "Led innovation projects using design thinking, UX research, MVP strategy, and growth loops.",
    "jobs.boschGrow.highlight1": "Led innovation projects using design thinking, UX research, MVP strategy, growth loops",
    "jobs.boschGrow.highlight2": "Secured €500K investment for a key project within Bosch Grow Program",
    "jobs.bosch.position": "Supply Chain Production & Customer Planner",
    "jobs.bosch.description": "Led supply chain planning across multiple production lines with focus on automation and efficiency.",
    "jobs.bosch.highlight1": "Selected for Bosch Discovery Program (high-potential leaders)",
    "jobs.bosch.highlight2": "Led early talent development (universities/NGOs) with a team of 4 engineers",
    "jobs.bosch.highlight3": "Directed 'Skills Management' stream (team of 6) over two years",
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

    // Education Degrees
    "degree.executiveMBA": "Executive MBA",
    "degree.industrialEngineering": "B.S. Industrial Engineering",
    "degree.mechatronics": "Mechatronics",

    // Certification Categories
    "certCategory.agile": "Agile & Project Management",
    "certCategory.lean": "Operational Excellence & Lean",
    "certCategory.digital": "Digital & Analytics",
    "certCategory.performance": "Performance & Strategy",

    // Individual Certifications
    "cert.googleAgilePM": "Google Agile PM",
    "cert.scrumFundamentals": "Scrum Fundamentals",
    "cert.projectExecution": "Project Execution & Planning",
    "cert.opExcellence": "Operational Excellence Principles",
    "cert.leanManufacturing": "Lean Manufacturing",
    "cert.5s": "5S",
    "cert.sixSigma": "Six Sigma",
    "cert.bpsSystematic": "BPS Systematic",
    "cert.digitalTransformation": "Digital Transformation & Building Blocks",
    "cert.powerBI": "Power BI Tools",
    "cert.dataVisualization": "Data Visualization",
    "cert.performanceMgmt": "Performance Management",
    "cert.kpiSetting": "KPI Setting",
    "cert.strategyExecution": "Strategy Execution",

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

    // Case Studies
    "caseStudies.badge": "Success Stories",
    "caseStudies.title": "Proven Impact Across Industries",
    "caseStudies.subtitle": "Real-world results from complex supply chain transformations",
    "caseStudies.challenge": "Challenge",
    "caseStudies.readMore": "Read Full Story",
    "caseStudies.featured": "Featured",

    // World Map
    "worldMap.badge": "Global Presence",
    "worldMap.title": "International Operations Across 10 Countries",
    "worldMap.subtitle": "Managing complex supply chains across multiple countries and continents",
    "worldMap.activeCountries": "Active Operations",
    "worldMap.clickToView": "Click markers for details",
    "worldMap.companies": "Companies",
    "worldMap.keyMetrics": "Key Metrics",
    "worldMap.selectCountry": "Select a Country",
    "worldMap.clickMarkers": "Click on the map markers to view detailed information about operations in each country",
    "worldMap.stat1": "Countries",
    "worldMap.stat2": "Total Projects",
    "worldMap.stat3": "Companies",
    "worldMap.stat4": "Continents",

    // Insights/Blog
    "insights.badge": "Insights & Thought Leadership",
    "insights.title": "Latest Insights from LinkedIn",
    "insights.subtitle": "Sharing knowledge on supply chain management, leadership, and industry trends",
    "insights.featured": "Featured",
    "insights.likes": "likes",
    "insights.comments": "comments",
    "insights.views": "views",
    "insights.readMore": "Read Full Article",
    "insights.read": "Read",
    "insights.viewAll": "View All Insights",

    // Calendar/Booking
    "calendar.badge": "Schedule a Call",
    "calendar.title": "Let's Discuss Your Supply Chain Challenges",
    "calendar.subtitle": "Book a free consultation to explore how I can help optimize your operations",
    "calendar.introCall": "15-Minute Introduction Call",
    "calendar.introDesc": "Quick introductory call to discuss your needs and see if we're a good fit",
    "calendar.intro1": "Brief overview of your challenges",
    "calendar.intro2": "Quick assessment of how I can help",
    "calendar.intro3": "Next steps discussion",
    "calendar.consultation": "30-Minute Strategy Consultation",
    "calendar.consultDesc": "In-depth discussion about your supply chain challenges and potential solutions",
    "calendar.consult1": "Detailed problem analysis",
    "calendar.consult2": "Initial recommendations",
    "calendar.consult3": "Q&A session",
    "calendar.consult4": "Follow-up plan",
    "calendar.workshop": "60-Minute Deep Dive Workshop",
    "calendar.workshopDesc": "Comprehensive workshop to tackle specific supply chain optimization opportunities",
    "calendar.workshop1": "Comprehensive situation analysis",
    "calendar.workshop2": "Detailed improvement roadmap",
    "calendar.workshop3": "Best practices sharing",
    "calendar.workshop4": "Action plan development",
    "calendar.workshop5": "Resource recommendations",
    "calendar.bookNow": "Book Now",
    "calendar.videoConference": "Video conference via Google Meet/Zoom",
    "calendar.flexible": "Flexible scheduling",
    "calendar.noCharge": "No charge for initial consultation",
    "calendar.preferEmail": "Prefer to reach out via email?",
    "calendar.contactForm": "Use Contact Form",

    // Register Section
    "register.title": "Join My Network",
    "register.description": "Stay connected for updates and opportunities",

    // Expertise Banner
    "expertise.badge": "International Supply Chain Leadership Excellence",
    "expertise.mainTitle": "Transforming Global Operations Across Continents",
    "expertise.description": "Leading complex supply chain transformations for multinational corporations with proven expertise in inventory optimization, strategic cost reduction, and international team leadership",
    "expertise.globalLeadership": "Global Leadership",
    "expertise.globalLeadershipDesc": "9 Countries Operations",
    "expertise.globalLeadershipHighlight": "International Supply Chain Expert",
    "expertise.costOptimization": "Cost Optimization",
    "expertise.costOptimizationDesc": "€5.5M+ Savings Delivered",
    "expertise.costOptimizationHighlight": "Strategic Excellence",
    "expertise.teamLeadership": "Team Leadership",
    "expertise.teamLeadershipDesc": "Multinational Teams",
    "expertise.teamLeadershipHighlight": "Cross-Cultural Management",
    "expertise.industryRecognition": "Industry Recognition",
    "expertise.industryRecognitionDesc": "Renault & Bosch Leader",
    "expertise.industryRecognitionHighlight": "Proven Track Record",
    "expertise.cta": "Ready to optimize your global supply chain?",
    "expertise.connect": "Let's Connect",

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
    "testimonials.badge": "Profesyonel Tanınırlık",
    "testimonials.title": "Liderler Ne Diyor",
    "testimonials.description": "Tedarik zinciri mükemmelliği ve operasyonel liderlik için uluslararası kuruluşlar tarafından güvenilir",
    "testimonials.originalPost": "Orijinal Gönderi",
    "testimonials.linkedinProfile": "LinkedIn Profili",
    "testimonials.viewMore": "Daha fazla referans ve yorum için LinkedIn profilimi ziyaret edin",
    "testimonials.viewProfile": "LinkedIn Profilimi Görüntüle",
    "testimonials.quote1": "Ali Emre'nin lojistik ve tedarik zinciri konusundaki uzmanlığı gerçekten etkileyici. Uluslararası operasyonlardaki deneyimi ve stratejik yaklaşımı ile her zaman başarılı sonuçlar elde ediyor.",
    "testimonials.author1": "Tedarik Zinciri Uzmanı",
    "testimonials.company1": "Uluslararası Lojistik Şirketi",
    "testimonials.highlight1": "Stratejik Liderlik",
    "testimonials.quote2": "Çok profesyonel ve detaylı çalışma tarzı. SAP ve iş zekası araçlarındaki uzmanlığı sayesinde operasyonel verimliliği önemli ölçüde artırdı. Kesinlikle tavsiye ederim.",
    "testimonials.author2": "Operasyon Müdürü",
    "testimonials.company2": "Teknoloji Şirketi",
    "testimonials.highlight2": "Operasyonel Mükemmeliyet",
    "testimonials.quote3": "Global pazarlardaki deneyimi ve kültürler arası takım yönetimi becerileri mükemmel. Ali Emre ile çalışmak büyük bir keyif ve öğrenme deneyimiydi.",
    "testimonials.author3": "Proje Yöneticisi",
    "testimonials.company3": "Çok Uluslu Şirket",
    "testimonials.highlight3": "Uluslararası Deneyim",

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
    "experience.keyAchievements": "Temel Başarılar",
    "experience.specializedRoles": "Özel Roller",

    // Job Positions
    "jobs.renault.position": "Global Tedarik Zinciri ve Envanter Müdürü",
    "jobs.renault.description": "9 ülkede €120M+ envanter seviyesi ile küresel envanter operasyonlarını yönetiyorum.",
    "jobs.renault.highlight1": "9 ülkede global envanter operasyonlarını yönetiyor; €120M+ envanter seviyeleri",
    "jobs.renault.highlight2": "Satış sonrası envanter optimizasyonu ile €5.5M maliyet düşürme sağladı",
    "jobs.renault.highlight3": "Pazar dinamiklerine uygun bölgeler arası projeleri (stok azaltma, ticari aksiyonlar) yönetiyor",
    "jobs.renault.highlight4": "KPI çerçevelerini, sürekli iyileştirmeyi ve doğru talep uyumluluğu için S&OP katılımını sahipleniyor",
    "jobs.renault.highlight5": "Süreklilik ve dayanıklılığı sağlamak için riski proaktif olarak yönetiyor",
    "jobs.boschGrow.position": "Akıllı Proje Geliştirme ve İnovasyon",
    "jobs.boschGrow.description": "Tasarım düşüncesi, UX araştırması, MVP stratejisi ve büyüme döngüleri kullanarak inovasyon projelerini yönettim.",
    "jobs.boschGrow.highlight1": "Tasarım düşüncesi, UX araştırması, MVP stratejisi, büyüme döngüleri kullanarak inovasyon projelerini yönetti",
    "jobs.boschGrow.highlight2": "Bosch Grow Programı kapsamında önemli bir proje için €500K yatırım sağladı",
    "jobs.bosch.position": "Tedarik Zinciri Üretim ve Müşteri Planlayıcısı",
    "jobs.bosch.description": "Otomasyon ve verimlilik odaklı çoklu üretim hatlarında tedarik zinciri planlamasını yönettim.",
    "jobs.bosch.highlight1": "Bosch Discovery Programı için seçildi (yüksek potansiyelli liderler)",
    "jobs.bosch.highlight2": "4 mühendisten oluşan ekiple erken yetenek gelişimini yönetti (üniversiteler/STK'lar)",
    "jobs.bosch.highlight3": "İki yıl boyunca 'Beceri Yönetimi' akışını (6 kişilik ekip) yönetti",
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

    // Education Degrees
    "degree.executiveMBA": "Yönetici MBA",
    "degree.industrialEngineering": "Endüstri Mühendisliği Lisans",
    "degree.mechatronics": "Mekatronik",

    // Certification Categories
    "certCategory.agile": "Çevik ve Proje Yönetimi",
    "certCategory.lean": "Operasyonel Mükemmeliyet ve Yalın",
    "certCategory.digital": "Dijital ve Analitik",
    "certCategory.performance": "Performans ve Strateji",

    // Individual Certifications
    "cert.googleAgilePM": "Google Çevik Proje Yönetimi",
    "cert.scrumFundamentals": "Scrum Temelleri",
    "cert.projectExecution": "Proje Yürütme ve Planlama",
    "cert.opExcellence": "Operasyonel Mükemmeliyet İlkeleri",
    "cert.leanManufacturing": "Yalın Üretim",
    "cert.5s": "5S",
    "cert.sixSigma": "Altı Sigma",
    "cert.bpsSystematic": "BPS Sistematik",
    "cert.digitalTransformation": "Dijital Dönüşüm ve Yapı Taşları",
    "cert.powerBI": "Power BI Araçları",
    "cert.dataVisualization": "Veri Görselleştirme",
    "cert.performanceMgmt": "Performans Yönetimi",
    "cert.kpiSetting": "KPI Belirleme",
    "cert.strategyExecution": "Strateji Yürütme",

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

    // Case Studies
    "caseStudies.badge": "Başarı Hikayeleri",
    "caseStudies.title": "Sektörlerde Kanıtlanmış Etki",
    "caseStudies.subtitle": "Karmaşık tedarik zinciri dönüşümlerinden gerçek sonuçlar",
    "caseStudies.challenge": "Zorluk",
    "caseStudies.readMore": "Tüm Hikayeyi Oku",
    "caseStudies.featured": "Öne Çıkan",

    // World Map
    "worldMap.badge": "Küresel Varlık",
    "worldMap.title": "10 Ülkede Uluslararası Operasyonlar",
    "worldMap.subtitle": "Birden fazla ülke ve kıtada karmaşık tedarik zincirlerini yönetme",
    "worldMap.activeCountries": "Aktif Operasyonlar",
    "worldMap.clickToView": "Detaylar için işaretlere tıklayın",
    "worldMap.companies": "Şirketler",
    "worldMap.keyMetrics": "Temel Metrikler",
    "worldMap.selectCountry": "Bir Ülke Seçin",
    "worldMap.clickMarkers": "Her ülkedeki operasyonlar hakkında detaylı bilgi görüntülemek için harita işaretlerine tıklayın",
    "worldMap.stat1": "Ülkeler",
    "worldMap.stat2": "Toplam Projeler",
    "worldMap.stat3": "Şirketler",
    "worldMap.stat4": "Kıtalar",

    // Insights/Blog
    "insights.badge": "İçgörüler ve Düşünce Liderliği",
    "insights.title": "LinkedIn'den Son İçgörüler",
    "insights.subtitle": "Tedarik zinciri yönetimi, liderlik ve sektör trendleri hakkında bilgi paylaşımı",
    "insights.featured": "Öne Çıkan",
    "insights.likes": "beğeni",
    "insights.comments": "yorum",
    "insights.views": "görüntülenme",
    "insights.readMore": "Tam Makaleyi Oku",
    "insights.read": "Oku",
    "insights.viewAll": "Tüm İçgörüleri Görüntüle",

    // Calendar/Booking
    "calendar.badge": "Görüşme Planla",
    "calendar.title": "Tedarik Zinciri Zorluklarınızı Konuşalım",
    "calendar.subtitle": "Operasyonlarınızı nasıl optimize edebileceğimi keşfetmek için ücretsiz bir danışmanlık rezervasyonu yapın",
    "calendar.introCall": "15 Dakikalık Tanışma Görüşmesi",
    "calendar.introDesc": "İhtiyaçlarınızı tartışmak ve uygun olup olmadığımızı görmek için hızlı tanışma görüşmesi",
    "calendar.intro1": "Zorluklarınıza kısa genel bakış",
    "calendar.intro2": "Nasıl yardımcı olabileceğimin hızlı değerlendirmesi",
    "calendar.intro3": "Sonraki adımların tartışılması",
    "calendar.consultation": "30 Dakikalık Strateji Danışmanlığı",
    "calendar.consultDesc": "Tedarik zinciri zorluklarınız ve potansiyel çözümler hakkında derinlemesine tartışma",
    "calendar.consult1": "Detaylı problem analizi",
    "calendar.consult2": "İlk öneriler",
    "calendar.consult3": "Soru-Cevap oturumu",
    "calendar.consult4": "Takip planı",
    "calendar.workshop": "60 Dakikalık Derinlemesine Workshop",
    "calendar.workshopDesc": "Belirli tedarik zinciri optimizasyon fırsatlarına odaklanan kapsamlı workshop",
    "calendar.workshop1": "Kapsamlı durum analizi",
    "calendar.workshop2": "Detaylı iyileştirme yol haritası",
    "calendar.workshop3": "En iyi uygulamaları paylaşma",
    "calendar.workshop4": "Eylem planı geliştirme",
    "calendar.workshop5": "Kaynak önerileri",
    "calendar.bookNow": "Hemen Rezervasyon Yap",
    "calendar.videoConference": "Google Meet/Zoom üzerinden görüntülü konferans",
    "calendar.flexible": "Esnek zamanlama",
    "calendar.noCharge": "İlk danışmanlık ücretsiz",
    "calendar.preferEmail": "E-posta ile iletişim kurmayı mı tercih ediyorsunuz?",
    "calendar.contactForm": "İletişim Formunu Kullan",

    // Register Section
    "register.title": "Ağıma Katılın",
    "register.description": "Güncellemeler ve fırsatlar için bağlantıda kalın",

    // Expertise Banner
    "expertise.badge": "Uluslararası Tedarik Zinciri Liderlik Mükemmelliği",
    "expertise.mainTitle": "Kıtalar Arası Global Operasyonları Dönüştürmek",
    "expertise.description": "Çok uluslu şirketler için karmaşık tedarik zinciri dönüşümlerini yönetiyor, envanter optimizasyonu, stratejik maliyet düşürme ve uluslararası takım liderliğinde kanıtlanmış uzmanlığa sahibim",
    "expertise.globalLeadership": "Global Liderlik",
    "expertise.globalLeadershipDesc": "9 Ülke Operasyonları",
    "expertise.globalLeadershipHighlight": "Uluslararası Tedarik Zinciri Uzmanı",
    "expertise.costOptimization": "Maliyet Optimizasyonu",
    "expertise.costOptimizationDesc": "€5.5M+ Tasarruf Sağlandı",
    "expertise.costOptimizationHighlight": "Stratejik Mükemmeliyet",
    "expertise.teamLeadership": "Takım Liderliği",
    "expertise.teamLeadershipDesc": "Çok Uluslu Takımlar",
    "expertise.teamLeadershipHighlight": "Kültürler Arası Yönetim",
    "expertise.industryRecognition": "Sektör Tanınırlığı",
    "expertise.industryRecognitionDesc": "Renault ve Bosch Lideri",
    "expertise.industryRecognitionHighlight": "Kanıtlanmış Sicil",
    "expertise.cta": "Global tedarik zincirinizi optimize etmeye hazır mısınız?",
    "expertise.connect": "Hadi Bağlanalım",

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