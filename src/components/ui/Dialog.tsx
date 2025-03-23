"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface DialogProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
    [key: string]: any
}

export function Dialog({ isOpen, onClose, children, className = "", ...props }: DialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = ""
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleBackdropClick}>
            <div
                ref={dialogRef}
                className={`max-h-[90vh] w-full max-w-md overflow-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 ${className}`}
                {...props}
            >
                {children}
            </div>
        </div>
    )
}

