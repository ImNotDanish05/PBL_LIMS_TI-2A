import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "bg-green-100/70 border border-green-500 text-green-800",
        warning:
          "bg-yellow-100/70 border border-yellow-500 text-yellow-800",
        info: "bg-blue-100/70 border border-blue-500 text-blue-700",
        error:
          "bg-red-100/70 border border-red-500 text-red-800",
        approved: "bg-teal-100/70 border border-teal-500 text-teal-800",
        received:
          "bg-purple-100/70 border border-purple-500 text-purple-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
