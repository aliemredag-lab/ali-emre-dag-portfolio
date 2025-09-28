import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ContactCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  title: string
  value: string
  href?: string
  className?: string
}

const ContactCard = React.forwardRef<HTMLDivElement, ContactCardProps>(
  ({ className, icon, title, value, href, ...props }, ref) => {
    const content = (
      <Card
        ref={ref}
        className={cn(
          "group cursor-pointer transition-all hover:shadow-md hover:scale-105 bg-slate-800/50 border-slate-700",
          className
        )}
        {...props}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {icon}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-400">
                {title}
              </p>
              <p className="text-lg font-semibold text-white">
                {value}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )

    if (href) {
      return (
        <a href={href} className="block">
          {content}
        </a>
      )
    }

    return content
  }
)
ContactCard.displayName = "ContactCard"

export { ContactCard }