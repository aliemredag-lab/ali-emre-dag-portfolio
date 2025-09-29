export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  subRoles?: {
    title: string;
    period: string;
    description: string;
    achievements?: string[];
  }[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
}

export interface Certification {
  name: string;
  category: string;
}

export interface KPIStat {
  value: string;
  label: string;
  description?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
}

export interface LinkedInPost {
  id: string
  title: string
  content: string
  excerpt: string
  publishDate: string
  linkedinUrl: string
  engagement: {
    likes: number
    comments: number
    shares: number
    views?: number
  }
  tags: string[]
  image?: string
  category: 'supply-chain' | 'leadership' | 'technology' | 'insights' | 'announcement'
}

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

export interface AdminConfig {
  defaultPassword: string;
  username: string;
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  about: string;
  profileImage?: string;
  kpiStats: KPIStat[];
  experience: Experience[];
  skills: {
    core: string[];
    methods: string[];
    tools: string[];
    soft: string[];
  };
  languages: {
    name: string;
    level: string;
  }[];
  education: Education[];
  certifications: Certification[];
  contact: ContactInfo;
  posts: LinkedInPost[];
  projects: Project[];
  admin: AdminConfig;
}

export const profileData: ProfileData = {
  name: "Ali Emre Dağ",
  title: "International Supply Chain Leader & Global Operations Expert",
  location: "Bursa, Türkiye",
  about: "Ali Emre Dağ is an accomplished International Supply Chain Leader with 8+ years of proven expertise across global procurement, production planning, logistics orchestration, and multinational project leadership. As a certified supply chain strategist, he has spearheaded transformational operations for Renault Group and Bosch across 9 countries, managing €120M+ inventory portfolios and delivering €5.5M+ in operational savings through advanced Lean Six Sigma methodologies and data-driven decision frameworks. His international leadership spans complex cross-cultural teams and global stakeholder management.",
  profileImage: "/profile.jpg",
  kpiStats: [
    {
      value: "8+",
      label: "Years Experience",
      description: "Supply chain and operations management"
    },
    {
      value: "€5.5M",
      label: "Cost Saved",
      description: "Through optimization initiatives"
    },
    {
      value: "€120M+",
      label: "Inventory Managed",
      description: "Global inventory operations"
    },
    {
      value: "9",
      label: "Countries Coverage",
      description: "Cross-regional project leadership"
    }
  ],
  experience: [
    {
      company: "Renault Group",
      position: "Global Supply Chain & Inventory Manager",
      location: "Bursa, Türkiye",
      startDate: "Jan 2023",
      endDate: "Present",
      description: "Leading global inventory operations across 9 countries with €120M+ inventory levels.",
      highlights: [
        "Manages global inventory operations across 9 countries; €120M+ inventory levels",
        "Achieved €5.5M cost reduction via after-sales inventory optimization",
        "Leads cross-regional projects (destocking, commercial actions) aligned with market dynamics",
        "Owns KPI frameworks, continuous improvement, and S&OP participation for accurate demand alignment",
        "Proactively manages risk to ensure continuity and resilience"
      ]
    },
    {
      company: "Bosch Grow Platform GmbH",
      position: "Smart Project Development & Innovation",
      location: "TR & DE",
      startDate: "Jun 2022",
      endDate: "Jan 2023",
      description: "Led innovation projects using design thinking, UX research, MVP strategy, and growth loops.",
      highlights: [
        "Led innovation projects using design thinking, UX research, MVP strategy, growth loops",
        "Secured €500K investment for a key project within Bosch Grow Program"
      ]
    },
    {
      company: "Bosch",
      position: "Supply Chain Production & Customer Planner",
      location: "Bursa, Türkiye",
      startDate: "Feb 2020",
      endDate: "Jan 2023",
      description: "Led supply chain planning across multiple production lines with focus on automation and efficiency.",
      highlights: [
        "Selected for Bosch Discovery Program (high-potential leaders)",
        "Led early talent development (universities/NGOs) with a team of 4 engineers",
        "Directed 'Skills Management' stream (team of 6) over two years"
      ],
      subRoles: [
        {
          title: "FRA – Full Rail Assembly",
          period: "Jul 2022 – Jan 2023",
          description: "Planned the plant's most complex/high-cost line; ensured on-time delivery under strict quality/traceability.",
          achievements: ["Supported ERP optimization for planning responsiveness"]
        },
        {
          title: "HDEV6 Injector Production",
          period: "Dec 2020 – Jun 2022",
          description: "Led planning in a highly automated area (150+ personnel).",
          achievements: [
            "Built two Power BI dashboards used across the Logistics Directorate for 3 plants, enabling real-time decisions",
            "Integrated ERP/MRP to enhance accuracy and planning efficiency"
          ]
        },
        {
          title: "Valve Seat Components",
          period: "Feb 2020 – Nov 2020",
          description: "End-to-end component planning; Lean Kanban to reduce lead times & bottlenecks.",
          achievements: ["Lean value stream project saving €300K/year"]
        }
      ]
    },
    {
      company: "Winn-Dixie",
      position: "Logistics Operations Assistant",
      location: "Panama City Beach, FL",
      startDate: "May 2019",
      endDate: "Oct 2019",
      description: "Managed stock control, order tracking, logistics planning, and customer relations.",
      highlights: [
        "Managed stock control, order tracking, logistics planning, and customer relations"
      ]
    },
    {
      company: "Adecco",
      position: "Logistics Operational Specialist",
      location: "Gemlik, Türkiye",
      startDate: "Aug 2013",
      endDate: "Jul 2015",
      description: "Coordinated vehicle dispatch operations and optimized port capacity.",
      highlights: [
        "Coordinated vehicle dispatch operations; optimized port capacity"
      ]
    }
  ],
  skills: {
    core: [
      "Supply Chain Management",
      "Project Management",
      "Budget Management",
      "KPI & Forecasting",
      "S&OP",
      "Commercial Negotiation",
      "Relationship Building",
      "Decision Making",
      "Business Strategy",
      "Key Account Management",
      "Change Management"
    ],
    methods: [
      "Lean Manufacturing",
      "Six Sigma",
      "5S",
      "Value Stream Mapping"
    ],
    tools: [
      "SAP ERP",
      "Power BI"
    ],
    soft: [
      "Leadership & team management",
      "Customer service",
      "Market & sales analysis"
    ]
  },
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Turkish", level: "Native" },
    { name: "French", level: "Conversational" }
  ],
  education: [
    {
      degree: "Executive MBA",
      institution: "Istanbul Aydın University",
      location: "Istanbul, Türkiye",
      period: "Sep 2020 – Jan 2022",
      gpa: "3.5/4.0"
    },
    {
      degree: "B.S. Industrial Engineering",
      institution: "Eastern Mediterranean University",
      location: "Northern Cyprus",
      period: "2015–2019"
    },
    {
      degree: "Mechatronics",
      institution: "Kadir Has University",
      location: "Istanbul, Türkiye",
      period: "2012–2014"
    }
  ],
  certifications: [
    { name: "Google Agile PM", category: "Agile & Project Management" },
    { name: "Scrum Fundamentals", category: "Agile & Project Management" },
    { name: "Project Execution & Planning", category: "Agile & Project Management" },
    { name: "Operational Excellence Principles", category: "Operational Excellence & Lean" },
    { name: "Lean Manufacturing", category: "Operational Excellence & Lean" },
    { name: "5S", category: "Operational Excellence & Lean" },
    { name: "Six Sigma", category: "Operational Excellence & Lean" },
    { name: "BPS Systematic", category: "Operational Excellence & Lean" },
    { name: "Digital Transformation & Building Blocks", category: "Digital & Analytics" },
    { name: "Power BI Tools", category: "Digital & Analytics" },
    { name: "Data Visualization", category: "Digital & Analytics" },
    { name: "Performance Management", category: "Performance & Strategy" },
    { name: "KPI Setting", category: "Performance & Strategy" },
    { name: "Strategy Execution", category: "Performance & Strategy" }
  ],
  contact: {
    email: "aliemredag@gmail.com",
    phone: "+90 531 765 98 73",
    location: "Bursa, Türkiye"
  },
  posts: [
    {
      id: '1',
      title: 'Tedarik Zinciri Optimizasyonunda Dijital Dönüşüm',
      content: `Günümüzde tedarik zinciri yönetiminde dijital dönüşüm artık lüks değil, zorunluluk haline geldi.

Son 8 yıllık uluslararası deneyimimde gözlemlediğim en önemli değişim, veri odaklı karar verme süreçlerinin operasyonel verimliliği nasıl artırdığı oldu.

🔑 Temel başarı faktörleri:
• SAP ve BI araçlarının entegrasyonu
• Gerçek zamanlı veri görselleştirme
• Tahmine dayalı analitik
• Otomatize edilmiş raporlama sistemleri

Bu araçların doğru implementasyonu ile Renault ve Bosch projelerimde €5.5M+ tasarruf sağladık.

#SupplyChain #DigitalTransformation #DataDriven`,
      excerpt: 'Tedarik zinciri yönetiminde dijital dönüşümün operasyonel verimliliğe etkisi ve başarı faktörleri...',
      publishDate: '2024-01-15',
      linkedinUrl: 'https://www.linkedin.com/in/aliemredag/',
      engagement: {
        likes: 234,
        comments: 45,
        shares: 28,
        views: 3200
      },
      tags: ['Supply Chain', 'Digital Transformation', 'Data Analytics'],
      category: 'supply-chain' as const
    },
    {
      id: '2',
      title: 'Liderlikte Kültürler Arası Yönetim Deneyimleri',
      content: `9 farklı ülkede çalışma fırsatı bulmuş biri olarak, kültürler arası liderlik konusunda edindiğim deneyimleri paylaşmak istiyorum.

Her kültürün kendine özgü iş dinamikleri var. Başarılı olmak için:

🌍 Yerel kültürü anlayın
🤝 Güven temelli ilişkiler kurun
📊 Net performans metrikleri belirleyin
💬 Açık iletişim kanalları oluşturun

Özellikle Avrupa'daki projelerimde gözlemlediğim en büyük başarı faktörü, takım üyelerinin güçlü yanlarını tanıyıp ona göre görevlendirme yapmak oldu.

#Leadership #GlobalManagement #Teamwork`,
      excerpt: 'Uluslararası projelerde kültürler arası liderlik deneyimleri ve başarı faktörleri...',
      publishDate: '2024-02-20',
      linkedinUrl: 'https://www.linkedin.com/in/aliemredag/',
      engagement: {
        likes: 189,
        comments: 32,
        shares: 15,
        views: 2100
      },
      tags: ['Leadership', 'Global Management', 'Team Building'],
      category: 'leadership' as const
    }
  ],
  projects: [
    {
      id: '1',
      title: 'Tedarik Zinciri Optimizasyon Projesi',
      description: 'Renault Grubu için geliştirilen SAP entegrasyonu ile stok yönetimi ve lojistik süreçlerinin optimize edilmesi. €2.5M tasarruf sağlandı.',
      technologies: ['SAP', 'Power BI', 'Excel VBA', 'SQL'],
      status: 'completed' as const,
      featured: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Uluslararası Satın Alma Sistemi',
      description: '9 farklı ülkede entegre satın alma süreçlerinin standardizasyonu ve otomasyonu. Vendor yönetimi ve maliyet analizi dahil.',
      technologies: ['SAP MM', 'Microsoft Project', 'Power Apps'],
      status: 'completed' as const,
      featured: true,
      createdAt: '2023-08-20'
    },
    {
      id: '3',
      title: 'Lean Manufacturing Implementation',
      description: 'Bosch fabrikalarında 5S, Kaizen ve Six Sigma metodolojilerinin uygulanması. %35 verimlilik artışı sağlandı.',
      technologies: ['Lean Tools', 'Six Sigma', 'Kaizen', 'Value Stream Mapping'],
      status: 'completed' as const,
      featured: false,
      createdAt: '2023-03-10'
    }
  ],
  admin: {
    username: 'admin',
    defaultPassword: 'admin123'
  }
};