import type React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "outline"
    children: React.ReactNode
}

export function Badge({ variant = "default", className = "", children, ...props }: BadgeProps) {
    const variantClasses = {
        default: "bg-primary text-primary-foreground",
        outline: "border border-primary text-primary",
    }

    return (
        <div
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

