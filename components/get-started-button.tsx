"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface GetStartedButtonProps {
    variant?: "default" | "outline" | "sticky"
    size?: "sm" | "default" | "lg"
    className?: string
}

export function GetStartedButton({
                                     variant = "default",
                                     size = "default",
                                     className = "",
                                 }: GetStartedButtonProps) {
    const [isHovered, setIsHovered] = useState(false)

    // Sticky floating button
    if (variant === "sticky") {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <Link href="/contact">
                    <Button
                        size="lg"
                        className={`bg-slate-800 hover:bg-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group ${className}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Get Started
                        <ArrowRight
                            className={`ml-2 w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                        />
                    </Button>
                </Link>
            </div>
        )
    }

    // Default button
    return (
        <Link href="/contact">
            <Button
                variant={variant}
                size={size}
                className={`bg-slate-800 hover:bg-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                Get Started
                <ArrowRight
                    className={`ml-2 w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                />
            </Button>
        </Link>
    )
}
