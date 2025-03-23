import type React from "react"
import "./Skeleton.css"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
    return <div className={`skeleton ${className}`} {...props} data-testid="skeleton" />
}

