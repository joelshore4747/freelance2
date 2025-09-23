"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
  ]

  return (
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-2 border-gray-300 dark:border-gray-700 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg font-sans">SD</span>
            </div>
            <span className="font-bold text-xl font-sans text-foreground">Studio Duo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-serif font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
            <ThemeToggle />

          <div className="hidden md:flex items-center space-x-4">
            {/*<Button*/}
            {/*  variant="outline"*/}
            {/*  asChild*/}
            {/*  className="border-slate-800 text-slate-800 hover:bg-slate-700 hover:text-primary-foreground font-serif font-semibold bg-transparent"*/}
            {/*>*/}
            {/*  <Link href="/contact">Contact Us</Link>*/}
            {/*</Button>*/}
              <Button
                  asChild
                  className="bg-slate-800 hover:bg-slate-700 text-white font-serif font-semibold"
              >
                  <Link href="/contact">Get Started</Link>
              </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-card-foreground hover:text-primary transition-colors duration-200 font-serif font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-2">
                {/*<Button*/}
                {/*  variant="outline"*/}
                {/*  asChild*/}
                {/*  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-serif font-semibold bg-transparent"*/}
                {/*>*/}
                {/*  <Link href="/contact">Contact Us</Link>*/}
                {/*</Button>*/}
                  <Button
                      asChild
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-serif font-semibold"
                  >
                      <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
