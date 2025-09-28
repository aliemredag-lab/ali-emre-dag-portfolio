import { Container } from "@/components/ui/container"
import Link from "next/link"

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
              <Link
                href="/resume"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Resume
              </Link>
              <a
                href="mailto:aliemredag@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  )
}