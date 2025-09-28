# Ali Emre Dağ - Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring a clean design, smooth animations, and a professional presentation of Ali Emre Dağ's experience as a Global Supply Chain Manager.

## 🚀 Features

- **Modern Design**: Clean, minimal interface with strong typography
- **Responsive**: Fully responsive design that works on all devices
- **Dark/Light Mode**: System-aware theme toggle with smooth transitions
- **Animations**: Subtle Framer Motion animations for enhanced user experience
- **Print-Ready Resume**: Dedicated print-optimized resume page
- **SEO Optimized**: Comprehensive meta tags, Open Graph, and structured data
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized for speed with Next.js 14 and modern web practices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter & JetBrains Mono (via Google Fonts)
- **Forms**: React Hook Form + Zod validation
- **Theme**: next-themes
- **TypeScript**: Fully typed for better development experience

## 📁 Project Structure

```
ali-emre-dag-portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx          # Homepage
│   └── resume/           # Resume page
├── components/            # Reusable components
│   ├── animated/         # Framer Motion components
│   ├── sections/         # Page sections
│   ├── ui/              # Base UI components
│   ├── navigation.tsx   # Header navigation
│   ├── footer.tsx       # Footer component
│   └── theme-provider.tsx
├── data/                 # Content and data
│   └── profile.ts       # All profile data and content
├── lib/                 # Utilities
│   └── utils.ts        # Utility functions
├── public/             # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── Ali-Emre-Dag-Resume.pdf
└── types/              # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/ali-emre-dag-portfolio.git
   cd ali-emre-dag-portfolio
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install
   ```

3. **Start the development server**
   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## 📝 Content Management

All content is centralized in `/data/profile.ts`. Update this file to modify:

- Personal information
- Professional experience
- Skills and certifications
- Education details
- Contact information
- KPI statistics

```typescript
// Example: Adding a new job experience
export const profileData: ProfileData = {
  // ... other data
  experience: [
    {
      company: "New Company",
      position: "New Position",
      location: "Location",
      startDate: "Month Year",
      endDate: "Present",
      description: "Job description...",
      highlights: ["Achievement 1", "Achievement 2"]
    },
    // ... existing experiences
  ]
}
```

## 🎨 Customization

### Colors and Theming

The design system uses CSS custom properties defined in `/app/globals.css`. Modify the color palette:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96%;
  /* ... other colors */
}
```

### Fonts

Change fonts in `/app/layout.tsx`:

```typescript
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })
```

### Animations

Customize animations in `/components/animated/` or disable them by setting `prefers-reduced-motion` in your system settings.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/username/ali-emre-dag-portfolio)

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` directory to [Netlify](https://netlify.com)

### Other Platforms

The project can be deployed to any platform that supports Node.js:

- Railway
- Heroku
- DigitalOcean App Platform
- AWS Amplify
- Google Cloud Platform

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific configurations:

```env
# Optional: Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com

# Optional: Form handling
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-id
```

### SEO Configuration

Update SEO settings in `/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Your Title',
  description: 'Your professional description',
  // ... other metadata
}
```

## ♿ Accessibility

This website follows WCAG 2.1 AA guidelines:

- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Color contrast compliance
- ✅ Focus indicators
- ✅ Reduced motion support

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help with customization:

- 📧 Email: aliemredag@gmail.com
- 📱 Phone: +90 531 765 98 73

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons

---

Built with ❤️ by Ali Emre Dağ