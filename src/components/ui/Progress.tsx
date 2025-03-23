import type React from "react"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number
    max: number
}

export function Progress({ value, max, className = "", ...props }: ProgressProps) {
    const percentage = (value / max) * 100

    return (
        <div
            className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={value}
            {...props}
        >
            <div className="h-full bg-primary transition-all" style={{ width: `${percentage}%` }} />
        </div>
    )
}

