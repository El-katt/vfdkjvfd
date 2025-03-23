"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface TabsContextType {
    activeTab: string
    setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

function useTabs() {
    const context = useContext(TabsContext)
    if (!context) {
        throw new Error("Tabs components must be used within a Tabs provider")
    }
    return context
}

interface TabsProps {
    defaultTab: string
    children: React.ReactNode
}

function Tabs({ defaultTab, children }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab)

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="w-full">{children}</div>
        </TabsContext.Provider>
    )
}

interface TabsListProps {
    children: React.ReactNode
    className?: string
}

function TabsList({ children, className = "" }: TabsListProps) {
    return (
        <div
            className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
        >
            {children}
        </div>
    )
}

interface TabsTriggerProps {
    value: string
    children: React.ReactNode
    className?: string
}

function TabsTrigger({ value, children, className = "" }: TabsTriggerProps) {
    const { activeTab, setActiveTab } = useTabs()
    const isActive = activeTab === value

    return (
        <button
            type="button"
            role="tab"
            data-state={isActive ? "active" : "inactive"}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
            } ${className}`}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    )
}

interface TabsContentProps {
    value: string
    children: React.ReactNode
    className?: string
}

function TabsContent({ value, children, className = "" }: TabsContentProps) {
    const { activeTab } = useTabs()
    const isActive = activeTab === value

    if (!isActive) return null

    return (
        <div role="tabpanel" data-state={isActive ? "active" : "inactive"} className={className}>
            {children}
        </div>
    )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export { Tabs }

