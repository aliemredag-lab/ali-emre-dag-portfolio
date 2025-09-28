import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("py-16 lg:py-24", className)}
      {...props}
    >
      {children}
    </section>
  )
)
Section.displayName = "Section"

export { Section }