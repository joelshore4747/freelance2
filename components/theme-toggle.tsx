"use client"

import { useState, useEffect } from "react"

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDark(true)
            document.documentElement.classList.add("dark")
        } else {
            setIsDark(false)
            document.documentElement.classList.remove("dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)

        if (newTheme) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-300 border border-border hover:scale-105 active:scale-95"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div className="w-5 h-5 flex items-center justify-center transition-transform duration-300">
                {isDark ? (
                    <span className="text-lg transform rotate-0 transition-transform duration-300 filter grayscale">☀️</span>
                ) : (
                    <span className="text-lg transform rotate-180 transition-transform duration-300 filter grayscale">🌙</span>
                )}
            </div>
        </button>
    )
}
