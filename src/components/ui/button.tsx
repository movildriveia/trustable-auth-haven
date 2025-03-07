
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-[#17ffd3] to-[#d3fc71] text-custom-dark font-medium hover:shadow-md hover:scale-[1.02] hover:brightness-[1.05]",
        reverseGradient: "bg-gradient-to-r from-[#d3fc71] to-[#17ffd3] text-custom-dark font-medium hover:shadow-md hover:scale-[1.02] hover:brightness-[1.05]",
        blue: "bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] text-custom-dark font-medium hover:shadow-md hover:scale-[1.02] hover:brightness-[1.05]",
        purple: "bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white font-medium hover:shadow-md hover:scale-[1.02] hover:brightness-[1.05]",
        turquoise: "bg-[#23e3ee] text-custom-dark font-medium hover:shadow-md hover:scale-[1.02] hover:brightness-[1.05]",
        lime: "bg-[#d3fc71] text-custom-dark font-medium hover:shadow-md hover:scale-[1.02] hover:brightness-[1.05]",
        modern: "bg-white border border-gray-200 text-slate-900 hover:border-blue-400 hover:text-blue-600 hover:shadow-md",
        glass: "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hover:shadow-md",
        // Enhanced gradient buttons
        loginBtn: "bg-white text-custom-dark border border-gray-300 hover:bg-[#17ffd3] hover:text-custom-dark hover:border-transparent hover:shadow-md min-w-[120px] justify-center",
        registerBtn: "bg-gradient-to-r from-[#17ffd3] to-[#d3fc71] text-custom-dark border border-transparent hover:bg-gradient-to-r hover:from-[#d3fc71] hover:to-[#17ffd3] hover:shadow-md min-w-[120px] justify-center",
        startNow: "bg-gradient-to-r from-[#17ffd3] to-[#d3fc71] text-custom-dark font-semibold hover:shadow-lg hover:scale-[1.03] hover:brightness-[1.05] min-w-[180px] justify-center px-10 py-6 text-base",
        // New compact register button with purple gradient
        registerBtnCompact: "bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white border border-transparent hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#9b87f5] hover:shadow-md min-w-[100px] justify-center text-xs py-1.5",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-6 text-base",
        xl: "h-12 rounded-md px-8 text-lg",
        icon: "h-9 w-9",
        xs: "h-7 rounded-md px-2.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
