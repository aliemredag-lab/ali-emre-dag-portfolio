import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("container mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl", className)}
      {...props}
    >
      {children}
    </div>
  )
)
Container.displayName = "Container"

export { Container }