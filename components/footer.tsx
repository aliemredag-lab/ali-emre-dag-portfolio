import { Container } from "@/components/ui/container"
import Link from "next/link"
import { Settings } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Ali Emre Dağ. All rights reserved.
              </p>
            </div>
            <nav className="flex items-center space-x-6">
              <a
                href="mailto:aliemredag@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
              <Link
                href="/admin/login"
                className="text-sm text-muted-foreground hover:text-primary transition-colors opacity-50 hover:opacity-100 group"
                title="Admin Login"
              >
                <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  )
}