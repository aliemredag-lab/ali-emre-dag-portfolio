"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Target,
  FolderOpen,
  UserPlus,
  MessageCircle,
  Shield,
  Sparkles,
  FileText
} from "lucide-react"

const navigation = [
  { name: "Home", href: "#hero", icon: Home, type: "scroll" },
  { name: "About", href: "#about", icon: User, type: "scroll" },
  { name: "Experience", href: "#experience", icon: Briefcase, type: "scroll" },
  { name: "Skills", href: "#skills", icon: Target, type: "scroll" },
  { name: "Projects", href: "#projects", icon: FolderOpen, type: "scroll" },
  { name: "Yazılarım", href: "/posts", icon: FileText, type: "link" },
  { name: "Üye Ol", href: "#register", icon: UserPlus, type: "scroll" },
  { name: "Contact", href: "#contact", icon: MessageCircle, type: "scroll" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Ali Emre Dağ
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 group-hover:w-full"></div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 text-sm font-medium">
          {navigation.map((item) => {
            const IconComponent = item.icon
            const isActive = item.type === 'link' ? pathname === item.href : pathname === item.href

            if (item.type === 'link') {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 py-2.5 px-4 rounded-xl transition-all duration-300 group hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 hover:text-primary border border-transparent hover:border-primary/20",
                    isActive
                      ? "text-primary bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">{item.name}</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
              )
            }

            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 py-2.5 px-4 rounded-xl transition-all duration-300 group hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 hover:text-primary border border-transparent hover:border-primary/20",
                  "text-foreground/70 hover:text-foreground"
                )}
              >
                <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">{item.name}</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </a>
            )
          })}

          <div className="h-6 w-px bg-border mx-2"></div>

          <Link href="/admin/login">
            <Button
              variant="outline"
              size="sm"
              className="group neo-card hover:bg-gradient-to-r hover:from-primary hover:to-purple-600 hover:text-white hover:border-primary transition-all duration-300 flex items-center gap-2"
            >
              <Shield className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Admin</span>
              <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="h-9 w-9 px-0"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col space-y-2 p-4">
            {navigation.map((item) => {
              const IconComponent = item.icon

              if (item.type === 'link') {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 transition-all duration-300 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>{item.name}</span>
                  </Link>
                )
              }

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 transition-all duration-300 group"
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>{item.name}</span>
                </a>
              )
            })}

            <div className="h-px bg-border my-2"></div>

            <Link href="/admin/login" onClick={() => setIsOpen(false)}>
              <Button
                variant="outline"
                size="sm"
                className="w-full group neo-card hover:bg-gradient-to-r hover:from-primary hover:to-purple-600 hover:text-white transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Shield className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Admin Giriş</span>
                <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}