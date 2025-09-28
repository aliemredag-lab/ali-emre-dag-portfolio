import * as React from "react"
import { cn } from "@/lib/utils"

interface KPIStatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  description?: string
  className?: string
}

const KPIStat = React.forwardRef<HTMLDivElement, KPIStatProps>(
  ({ className, value, label, description, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md",
        className
      )}
      {...props}
    >
      <div className="space-y-2">
        <div className="text-3xl font-bold font-mono text-primary group-hover:scale-110 transition-transform">
          {value}
        </div>
        <div className="text-sm font-medium text-foreground">
          {label}
        </div>
        {description && (
          <div className="text-xs text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
)
KPIStat.displayName = "KPIStat"

export { KPIStat }