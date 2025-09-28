import * as React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  className?: string
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, description, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-4 text-center", className)}
      {...props}
    >
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          {description}
        </p>
      )}
    </div>
  )
)
PageHeader.displayName = "PageHeader"

export { PageHeader }