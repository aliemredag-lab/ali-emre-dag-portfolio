export interface CaseStudy {
  id: string
  title: string
  company: string
  logo?: string
  period: string
  challenge: {
    title: string
    description: string
    keyIssues: string[]
  }
  solution: {
    title: string
    description: string
    approach: string[]
    technologies?: string[]
  }
  results: {
    title: string
    description: string
    metrics: {
      label: string
      value: string
      change: string // e.g., "+25%", "€120M", "-40%"
      trend: 'up' | 'down' | 'neutral'
    }[]
    testimonial?: {
      quote: string
      author: string
      role: string
    }
  }
  featured: boolean
  image?: string
  tags: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'renault-global-inventory',
    title: 'Global Inventory Optimization Across 9 Countries',
    company: 'Renault',
    period: '2022 - Present',
    challenge: {
      title: 'Managing €120M+ Inventory Across Diverse Markets',
      description: 'Renault faced significant challenges in coordinating inventory operations across 9 countries with varying demand patterns, regulatory requirements, and supply chain complexities.',
      keyIssues: [
        'Fragmented inventory systems across multiple countries',
        'Lack of real-time visibility into stock levels',
        'High carrying costs due to overstocking in some regions',
        'Stockouts in critical markets affecting sales targets',
        'Manual forecasting leading to poor demand planning'
      ]
    },
    solution: {
      title: 'Integrated Global Inventory Management System',
      description: 'Implemented a comprehensive inventory management framework combining advanced analytics, process optimization, and cross-functional collaboration.',
      approach: [
        'Deployed centralized inventory tracking system across all 9 countries',
        'Implemented predictive analytics for demand forecasting using historical data',
        'Established automated reorder points based on regional demand patterns',
        'Created cross-border inventory sharing protocols to reduce redundancy',
        'Built real-time dashboards for inventory visibility at country and regional levels',
        'Standardized KPIs and reporting across all markets'
      ],
      technologies: ['SAP S/4HANA', 'Power BI', 'Advanced Analytics', 'EDI Integration']
    },
    results: {
      title: 'Transformational Impact on Operations',
      description: 'The initiative delivered significant improvements in inventory efficiency, cost reduction, and service levels across all markets.',
      metrics: [
        {
          label: 'Inventory Value Managed',
          value: '€120M+',
          change: '+35%',
          trend: 'up'
        },
        {
          label: 'Carrying Cost Reduction',
          value: '22%',
          change: '-22%',
          trend: 'down'
        },
        {
          label: 'Stock Accuracy',
          value: '98.5%',
          change: '+15%',
          trend: 'up'
        },
        {
          label: 'Forecast Accuracy',
          value: '91%',
          change: '+28%',
          trend: 'up'
        }
      ],
      testimonial: {
        quote: 'Ali Emre transformed our inventory operations from fragmented regional systems to a cohesive global framework. The results exceeded our expectations.',
        author: 'Regional Operations Director',
        role: 'Renault Group'
      }
    },
    featured: true,
    tags: ['Inventory Management', 'Global Operations', 'Cost Optimization', 'Analytics', 'SAP']
  },
  {
    id: 'bosch-supply-chain-digitalization',
    title: 'Supply Chain Digital Transformation',
    company: 'Bosch',
    period: '2020 - 2022',
    challenge: {
      title: 'Modernizing Legacy Supply Chain Processes',
      description: 'Bosch needed to digitalize their supply chain operations to improve efficiency, reduce manual errors, and enhance visibility across the entire value chain.',
      keyIssues: [
        'Manual data entry causing delays and errors',
        'Limited visibility into supplier performance',
        'Disconnected systems creating data silos',
        'Slow response to supply chain disruptions',
        'Inefficient procurement processes'
      ]
    },
    solution: {
      title: 'End-to-End Supply Chain Digitalization',
      description: 'Led a comprehensive digital transformation initiative to automate processes, integrate systems, and enable data-driven decision making.',
      approach: [
        'Implemented automated procurement workflows reducing manual touchpoints',
        'Integrated supplier portals for real-time collaboration',
        'Deployed IoT sensors for warehouse inventory tracking',
        'Built predictive analytics models for supply risk assessment',
        'Created unified data platform connecting all supply chain systems',
        'Trained 200+ users on new digital tools and processes'
      ],
      technologies: ['SAP Ariba', 'IoT Sensors', 'Machine Learning', 'API Integration', 'Cloud Infrastructure']
    },
    results: {
      title: 'Measurable Operational Excellence',
      description: 'The digital transformation initiative delivered substantial improvements in efficiency, accuracy, and responsiveness.',
      metrics: [
        {
          label: 'Process Automation',
          value: '65%',
          change: '+65%',
          trend: 'up'
        },
        {
          label: 'Lead Time Reduction',
          value: '30%',
          change: '-30%',
          trend: 'down'
        },
        {
          label: 'Data Accuracy',
          value: '99.2%',
          change: '+42%',
          trend: 'up'
        },
        {
          label: 'Cost Savings',
          value: '€2.8M',
          change: '€2.8M',
          trend: 'up'
        }
      ]
    },
    featured: true,
    tags: ['Digital Transformation', 'Automation', 'Supply Chain', 'SAP Ariba', 'Change Management']
  },
  {
    id: 'siemens-supplier-collaboration',
    title: 'Strategic Supplier Performance Management',
    company: 'Siemens',
    period: '2019 - 2020',
    challenge: {
      title: 'Enhancing Supplier Relationships and Performance',
      description: 'Siemens needed to improve supplier performance, reduce quality issues, and build more collaborative relationships with key strategic suppliers.',
      keyIssues: [
        'Inconsistent supplier performance across categories',
        'Limited visibility into supplier operations',
        'Reactive approach to quality issues',
        'Lack of standardized supplier evaluation metrics',
        'Poor communication and collaboration with suppliers'
      ]
    },
    solution: {
      title: 'Supplier Excellence Framework',
      description: 'Developed and implemented a comprehensive supplier management program focusing on collaboration, performance measurement, and continuous improvement.',
      approach: [
        'Established supplier scorecard system with balanced KPIs',
        'Conducted regular supplier business reviews and audits',
        'Implemented supplier development programs for strategic partners',
        'Created supplier portal for transparent communication',
        'Developed early warning system for supplier risks',
        'Built collaborative improvement initiatives with top suppliers'
      ],
      technologies: ['Supplier Portal', 'Scorecard System', 'Data Analytics', 'Collaboration Tools']
    },
    results: {
      title: 'Stronger Supply Base Performance',
      description: 'The supplier management initiative resulted in improved quality, reduced costs, and stronger supplier partnerships.',
      metrics: [
        {
          label: 'Supplier Quality',
          value: '96%',
          change: '+21%',
          trend: 'up'
        },
        {
          label: 'On-Time Delivery',
          value: '94%',
          change: '+16%',
          trend: 'up'
        },
        {
          label: 'Supply Risk Incidents',
          value: '58%',
          change: '-58%',
          trend: 'down'
        },
        {
          label: 'Cost Savings',
          value: '€1.5M',
          change: '€1.5M',
          trend: 'up'
        }
      ]
    },
    featured: false,
    tags: ['Supplier Management', 'Quality Management', 'Procurement', 'Risk Management', 'Collaboration']
  }
]
