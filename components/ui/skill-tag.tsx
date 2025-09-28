import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SkillTagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "default" | "secondary" | "outline"
  className?: string
}

const SkillTag = React.forwardRef<HTMLDivElement, SkillTagProps>(
  ({ className, children, variant = "secondary", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all hover:scale-105 hover:shadow-sm cursor-default focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        variant === "secondary" && "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "outline" && "text-foreground border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
SkillTag.displayName = "SkillTag"

export { SkillTag }