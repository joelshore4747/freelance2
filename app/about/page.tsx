"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Heart, Target, Zap, Users, Code, Palette, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef } from "react"

/** Reveal-on-scroll using your CSS keyframe `.animate-parallax-reveal` */
function useScrollAnimation() {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const nodes = Array.from(document.querySelectorAll<HTMLElement>(".scroll-animate"))

        // Fallback: if IO not supported, just show everything
        if (!("IntersectionObserver" in window)) {
            nodes.forEach((el) => {
                el.classList.remove("opacity-0", "translate-y-3")
                el.classList.add("opacity-100", "translate-y-0")
            })
            return
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, i) => {
                    if (!entry.isIntersecting) return
                    const el = entry.target as HTMLElement

                    const reveal = () => {
                        if (prefersReducedMotion) {
                            // Show without motion
                            el.classList.remove("opacity-0", "translate-y-3")
                            el.classList.add("opacity-100", "translate-y-0")
                        } else {
                            // Apply your custom animation class
                            el.classList.add("animate-parallax-reveal")
                            el.classList.remove("opacity-0", "translate-y-3")
                        }
                        io.unobserve(el)
                    }

                    // tiny stagger for nicer cadence
                    setTimeout(reveal, prefersReducedMotion ? 0 : i * 70)
                })
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
        )

        nodes.forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [])
}

export default function AboutPage() {
    useScrollAnimation()

    const teamCarouselRef = useRef<HTMLDivElement>(null)
    const valuesCarouselRef = useRef<HTMLDivElement>(null)

    const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
        if (ref.current) {
            const scrollAmount = 320 // Card width + gap
            const currentScroll = ref.current.scrollLeft
            const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

            ref.current.scrollTo({
                left: newScroll,
                behavior: "smooth",
            })
        }
    }

    return (
        <div className="min-h-screen bg-section-white">
            <Navigation />

            {/* Hero Section */}
            <section className="relative py-16 sm:py-24 lg:py-48 overflow-hidden bg-section-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <div className="scroll-animate opacity-0 translate-y-3">
                            <Badge
                                variant="secondary"
                                className="mb-8 sm:mb-12 font-light text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 bg-section-muted text-section-muted-foreground border-0 rounded-full animate-bounce-subtle"
                            >
                                <span className="text-primary">About</span> <span className="text-primary font-medium">Studio Duo</span>
                            </Badge>
                        </div>
                        <h1 className="scroll-animate text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-section-white-foreground mb-8 sm:mb-12 text-balance leading-[0.9] opacity-0 translate-y-3">
                            We're a Two-Person <span className="font-medium text-standout">Powerhouse</span>
                        </h1>
                        <p className="scroll-animate text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-4xl mx-auto text-balance leading-relaxed opacity-0 translate-y-3">
                            Combining years of experience in design and development to create digital experiences that drive real
                            business results.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 sm:py-24 lg:py-40 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 sm:mb-24">
                        <h2 className="scroll-animate text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 sm:mb-8 text-balance opacity-0 translate-y-3">
                            Meet the Team
                        </h2>
                        <p className="scroll-animate text-lg sm:text-xl text-gray-300 font-light max-w-3xl mx-auto text-balance opacity-0 translate-y-3">
                            Two passionate professionals who complement each other perfectly.
                        </p>
                    </div>

                    <div className="lg:hidden">
                        {/* Mobile/Tablet Carousel */}
                        <div ref={teamCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide">
                            {/* Team Member 1 */}
                            <div className="scroll-animate opacity-0 translate-y-3 flex-none w-96 snap-center">
                                <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:ring-2 hover:ring-primary/30 hover:border-primary/50 group h-full relative before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-transparent hover:before:border-primary before:transition-all before:duration-500 before:opacity-0 hover:before:opacity-100 before:shadow-lg before:shadow-primary/20">
                                    <div className="p-6">
                                        {/* Top row: Image and name/role in grid */}
                                        <div className="flex items-center gap-6 mb-4">
                                            <div className="w-20 h-20 rounded-full overflow-hidden bg-section-secondary flex-shrink-0">
                                                <img
                                                    src="/professional-designer-portrait.png"
                                                    alt="Alex Chen - Lead Designer"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-light text-gray-900 text-xl mb-1">Alex Chen</h3>
                                                <p className="font-light text-gray-600 text-base">Lead Designer & Co-Founder</p>
                                            </div>
                                        </div>

                                        {/* Full-width content below */}
                                        <div className="space-y-3">
                                            <p className="text-gray-600 font-light text-sm leading-relaxed">
                                                With 8+ years in UI/UX design, Alex specializes in creating user-centered designs that convert.
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {["UI/UX Design", "Design Systems", "User Research", "Branding"].map((skill) => (
                                                    <Badge
                                                        key={skill}
                                                        variant="secondary"
                                                        className="font-light bg-section-secondary text-section-secondary-foreground border-0 px-2 py-0.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200 text-xs"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Palette className="h-3.5 w-3.5" />
                                                <span className="font-light text-xs">Figma, Adobe Creative Suite</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Team Member 2 */}
                            <div className="scroll-animate opacity-0 translate-y-3 flex-none w-96 snap-center">
                                <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:ring-2 hover:ring-primary/30 hover:border-primary/50 group h-full relative before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-transparent hover:before:border-primary before:transition-all before:duration-500 before:opacity-0 hover:before:opacity-100 before:shadow-lg before:shadow-primary/20">
                                    <div className="p-6">
                                        {/* Top row: Image and name/role in grid */}
                                        <div className="flex items-center gap-6 mb-4">
                                            <div className="w-20 h-20 rounded-full overflow-hidden bg-section-secondary flex-shrink-0">
                                                <img
                                                    src="/professional-developer-portrait.png"
                                                    alt="Jordan Smith - Lead Developer"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-light text-gray-900 text-xl mb-1">Jordan Smith</h3>
                                                <p className="font-light text-gray-600 text-base">Lead Developer & Co-Founder</p>
                                            </div>
                                        </div>

                                        {/* Full-width content below */}
                                        <div className="space-y-3">
                                            <p className="text-gray-600 font-light text-sm leading-relaxed">
                                                Full-stack developer with 10+ years of experience building scalable web applications.
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {["React/Next.js", "Node.js", "Cloud Architecture", "Performance"].map((skill) => (
                                                    <Badge
                                                        key={skill}
                                                        variant="secondary"
                                                        className="font-light bg-section-secondary text-section-secondary-foreground border-0 px-2 py-0.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200 text-xs"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Code className="h-3.5 w-3.5" />
                                                <span className="font-light text-xs">TypeScript, AWS, Docker</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6 gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => scrollCarousel(teamCarouselRef, "left")}
                                    className="p-2 text-white/60 hover:text-white transition-colors duration-200"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => scrollCarousel(teamCarouselRef, "right")}
                                    className="p-2 text-white/60 hover:text-white transition-colors duration-200"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden lg:grid grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Team Member 1 */}
                        <div className="scroll-animate opacity-0 translate-y-3">
                            <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:ring-2 hover:ring-primary/30 hover:border-primary/50 group h-full relative before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-transparent hover:before:border-primary before:transition-all before:duration-500 before:opacity-0 hover:before:opacity-100 before:shadow-lg before:shadow-primary/20">
                                <div className="p-8">
                                    {/* Top row: Image and name/role in grid */}
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-section-secondary flex-shrink-0">
                                            <img
                                                src="/professional-designer-portrait.png"
                                                alt="Alex Chen - Lead Designer"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-light text-gray-900 text-2xl mb-2">Alex Chen</h3>
                                            <p className="font-light text-gray-600 text-lg">Lead Designer & Co-Founder</p>
                                        </div>
                                    </div>

                                    {/* Full-width content below */}
                                    <div className="space-y-4">
                                        <p className="text-gray-600 font-light text-base leading-relaxed">
                                            With 8+ years in UI/UX design, Alex specializes in creating user-centered designs that convert.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {["UI/UX Design", "Design Systems", "User Research", "Branding"].map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="secondary"
                                                    className="font-light bg-section-secondary text-section-secondary-foreground border-0 px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200 text-sm"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Palette className="h-4 w-4" />
                                            <span className="font-light text-sm">Figma, Adobe Creative Suite</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Team Member 2 */}
                        <div className="scroll-animate opacity-0 translate-y-3">
                            <Card className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:ring-2 hover:ring-primary/30 hover:border-primary/50 group h-full relative before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-transparent hover:before:border-primary before:transition-all before:duration-500 before:opacity-0 hover:before:opacity-100 before:shadow-lg before:shadow-primary/20">
                                <div className="p-8">
                                    {/* Top row: Image and name/role in grid */}
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-section-secondary flex-shrink-0">
                                            <img
                                                src="/professional-developer-portrait.png"
                                                alt="Jordan Smith - Lead Developer"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-light text-gray-900 text-2xl mb-2">Jordan Smith</h3>
                                            <p className="font-light text-gray-600 text-lg">Lead Developer & Co-Founder</p>
                                        </div>
                                    </div>

                                    {/* Full-width content below */}
                                    <div className="space-y-4">
                                        <p className="text-gray-600 font-light text-base leading-relaxed">
                                            Full-stack developer with 10+ years of experience building scalable web applications.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {["React/Next.js", "Node.js", "Cloud Architecture", "Performance"].map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="secondary"
                                                    className="font-light bg-section-secondary text-section-secondary-foreground border-0 px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200 text-sm"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Code className="h-4 w-4" />
                                            <span className="font-light text-sm">TypeScript, AWS, Docker</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 sm:py-24 lg:py-40 bg-section-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 sm:mb-24">
                        <h2 className="scroll-animate text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-section-white-foreground mb-6 sm:mb-8 text-balance opacity-0 translate-y-3">
                            Our Values
                        </h2>
                        <p className="scroll-animate text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto text-balance opacity-0 translate-y-3">
                            The principles that guide everything we do and ensure exceptional results.
                        </p>
                    </div>

                    <div className="md:hidden">
                        {/* Mobile Carousel */}
                        <div
                            ref={valuesCarouselRef}
                            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide"
                        >
                            {[
                                {
                                    icon: <Heart className="h-8 w-8" />,
                                    title: "Passion-Driven",
                                    description: "We love what we do, and it shows in every pixel and line of code.",
                                    iconBg: "bg-section-secondary",
                                },
                                {
                                    icon: <Target className="h-8 w-8" />,
                                    title: "Results-Focused",
                                    description: "Beautiful design means nothing without measurable business impact.",
                                    iconBg: "bg-standout",
                                },
                                {
                                    icon: <Zap className="h-8 w-8" />,
                                    title: "Innovation First",
                                    description: "We stay ahead of trends to deliver cutting-edge solutions.",
                                    iconBg: "bg-section-secondary",
                                },
                                {
                                    icon: <Users className="h-8 w-8" />,
                                    title: "Client Partnership",
                                    description: "Your success is our success. We're in this together.",
                                    iconBg: "bg-standout",
                                },
                            ].map((value, index) => (
                                <div key={index} className="scroll-animate opacity-0 translate-y-3 flex-none w-72 snap-center">
                                    <Card className="bg-section-white border border-border shadow-sm rounded-2xl text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:scale-[1.01] group h-full flex flex-col p-8">
                                        <div
                                            className={`w-16 h-16 ${value.iconBg} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:rotate-12`}
                                        >
                                            {value.icon}
                                        </div>
                                        <CardTitle className="font-light text-section-white-foreground text-2xl mb-4">
                                            {value.title}
                                        </CardTitle>
                                        <CardDescription className="text-muted-foreground font-light leading-relaxed flex-1">
                                            {value.description}
                                        </CardDescription>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-6 gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => scrollCarousel(valuesCarouselRef, "left")}
                                    className="p-2 text-primary/60 hover:text-primary transition-colors duration-200"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => scrollCarousel(valuesCarouselRef, "right")}
                                    className="p-2 text-primary/60 hover:text-primary transition-colors duration-200"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tablet Carousel */}
                    <div className="hidden md:block lg:hidden">
                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide">
                            {[
                                {
                                    icon: <Heart className="h-8 w-8" />,
                                    title: "Passion-Driven",
                                    description: "We love what we do, and it shows in every pixel and line of code.",
                                    iconBg: "bg-section-secondary",
                                },
                                {
                                    icon: <Target className="h-8 w-8" />,
                                    title: "Results-Focused",
                                    description: "Beautiful design means nothing without measurable business impact.",
                                    iconBg: "bg-standout",
                                },
                                {
                                    icon: <Zap className="h-8 w-8" />,
                                    title: "Innovation First",
                                    description: "We stay ahead of trends to deliver cutting-edge solutions.",
                                    iconBg: "bg-section-secondary",
                                },
                                {
                                    icon: <Users className="h-8 w-8" />,
                                    title: "Client Partnership",
                                    description: "Your success is our success. We're in this together.",
                                    iconBg: "bg-standout",
                                },
                            ].map((value, index) => (
                                <div key={index} className="scroll-animate opacity-0 translate-y-3 flex-none w-80 snap-center">
                                    <Card className="bg-section-white border border-border shadow-sm rounded-2xl text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:scale-[1.01] group h-full flex flex-col p-8">
                                        <div
                                            className={`w-16 h-16 ${value.iconBg} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:rotate-12`}
                                        >
                                            {value.icon}
                                        </div>
                                        <CardTitle className="font-light text-section-white-foreground text-2xl mb-4">
                                            {value.title}
                                        </CardTitle>
                                        <CardDescription className="text-muted-foreground font-light leading-relaxed flex-1">
                                            {value.description}
                                        </CardDescription>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-6 gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => scrollCarousel(valuesCarouselRef, "left")}
                                    className="p-2 text-primary/60 hover:text-primary transition-colors duration-200"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => scrollCarousel(valuesCarouselRef, "right")}
                                    className="p-2 text-primary/60 hover:text-primary transition-colors duration-200"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden lg:grid grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Heart className="h-8 w-8" />,
                                title: "Passion-Driven",
                                description: "We love what we do, and it shows in every pixel and line of code.",
                                iconBg: "bg-section-secondary",
                            },
                            {
                                icon: <Target className="h-8 w-8" />,
                                title: "Results-Focused",
                                description: "Beautiful design means nothing without measurable business impact.",
                                iconBg: "bg-standout",
                            },
                            {
                                icon: <Zap className="h-8 w-8" />,
                                title: "Innovation First",
                                description: "We stay ahead of trends to deliver cutting-edge solutions.",
                                iconBg: "bg-section-secondary",
                            },
                            {
                                icon: <Users className="h-8 w-8" />,
                                title: "Client Partnership",
                                description: "Your success is our success. We're in this together.",
                                iconBg: "bg-standout",
                            },
                        ].map((value, index) => (
                            <div key={index} className="scroll-animate opacity-0 translate-y-3">
                                <Card className="bg-section-white border border-border shadow-sm rounded-2xl text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:scale-[1.01] group h-full flex flex-col p-8">
                                    <div
                                        className={`w-16 h-16 ${value.iconBg} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:rotate-12`}
                                    >
                                        {value.icon}
                                    </div>
                                    <CardTitle className="font-light text-section-white-foreground text-2xl mb-4">
                                        {value.title}
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground font-light leading-relaxed flex-1">
                                        {value.description}
                                    </CardDescription>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section - Updated with image on right */}
            <section className="py-16 sm:py-20 lg:py-24 bg-section-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* Content - Left side */}
                        <div className="space-y-12">
                            <div className="scroll-animate opacity-0 translate-y-3">
                                <div className="text-sm font-medium tracking-wider text-muted-foreground mb-6 uppercase">About Us</div>
                                <h2 className="text-5xl md:text-7xl font-light text-section-white-foreground mb-8 text-balance">
                                    Our Story
                                </h2>
                            </div>

                            <div className="space-y-8 text-xl font-light leading-relaxed text-section-white-foreground/80">
                                <p className="scroll-animate opacity-0 translate-y-3">
                                    Studio Duo was born from a simple belief: that great design and development shouldn't be exclusive to
                                    big corporations with massive budgets.
                                </p>
                                <p className="scroll-animate opacity-0 translate-y-3">
                                    After years of working at large agencies and tech companies, Alex and Jordan decided to combine their
                                    expertise to help businesses of all sizes create exceptional digital experiences.
                                </p>
                                <p className="scroll-animate opacity-0 translate-y-3">
                                    Today, we're proud to be a lean, efficient team that delivers big agency quality with the personal
                                    touch and agility that only a boutique studio can provide.
                                </p>
                            </div>
                        </div>

                        {/* Image - Right side with organic circular design treatment */}
                        <div className="scroll-animate opacity-0 translate-y-3">
                            <div className="relative">
                                <div className="relative w-full max-w-lg mx-auto">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-standout/30 transform rotate-12"
                                        style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
                                    ></div>
                                    <div
                                        className="absolute inset-2 bg-gradient-to-tl from-standout/10 to-primary/10 transform -rotate-6"
                                        style={{ borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%" }}
                                    ></div>

                                    {/* Main image container with organic shape */}
                                    <div className="relative z-10 p-6">
                                        <div
                                            className="relative overflow-hidden rounded-full aspect-square"
                                            style={{ borderRadius: "65% 35% 45% 55% / 55% 45% 65% 35%" }}
                                        >
                                            <img
                                                src="/images/studio-duo-workspace.jpg"
                                                alt="Studio Duo creative workspace"
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                            />
                                            {/* Overlay gradient for better integration */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10"></div>
                                        </div>
                                    </div>

                                    {/* Decorative floating elements */}
                                    <div
                                        className="absolute top-4 right-4 w-8 h-8 bg-standout/20 animate-pulse"
                                        style={{ borderRadius: "70% 30% 60% 40% / 50% 60% 40% 50%" }}
                                    ></div>
                                    <div
                                        className="absolute bottom-12 left-8 w-6 h-6 bg-primary/30 animate-bounce"
                                        style={{ borderRadius: "80% 20% 40% 60% / 60% 40% 80% 20%" }}
                                    ></div>
                                    <div
                                        className="absolute top-1/3 left-4 w-4 h-4 bg-standout/40"
                                        style={{ borderRadius: "50% 50% 80% 20% / 30% 70% 50% 50%" }}
                                    ></div>

                                    {/* Dotted pattern overlay */}
                                    <div className="absolute bottom-8 right-8 w-20 h-20 opacity-40">
                                        <div className="grid grid-cols-5 gap-2">
                                            {Array.from({ length: 25 }).map((_, i) => (
                                                <div key={i} className="w-1.5 h-1.5 bg-primary rounded-full opacity-60"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-20 lg:py-24 bg-section-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="scroll-animate opacity-0 translate-y-3">
                        <Sparkles className="h-12 w-12 text-standout mx-auto mb-12" />
                    </div>
                    <h2 className="scroll-animate text-5xl md:text-7xl font-light text-section-white-foreground mb-8 text-balance opacity-0 translate-y-3">
                        Ready to Work Together?
                    </h2>
                    <p className="scroll-animate text-xl md:text-2xl text-muted-foreground font-light mb-16 text-balance opacity-0 translate-y-3">
                        We'd love to learn about your project and discuss how we can help bring your vision to life.
                    </p>
                    <div className="scroll-animate flex flex-col sm:flex-row gap-6 justify-center opacity-0 translate-y-3">
                        <Button
                            asChild
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-light px-10 py-4 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border-0"
                        >
                            <Link href="/contact" className="flex items-center gap-2 hover:no-underline">
                                Start a Conversation
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="font-light bg-transparent border border-primary/20 text-primary hover:bg-primary/5 px-10 py-4 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
                        >
                            <Link href="/portfolio" className="hover:no-underline">
                                View Our Work
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Masonry Gallery Section */}
            <section className="w-full overflow-hidden h-[48vh] md:h-[56vh] lg:h-[70vh]">
                <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2 p-2">
                    {/* Tile 1 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-standout/30 aspect-[3/4] hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 1" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Tile 2 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-standout/20 to-primary/30 aspect-square hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 2" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Tile 3 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary/30 to-standout/20 aspect-[4/5] hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 3" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Tile 4 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-standout/30 to-primary/20 aspect-[3/4] hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 4" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Tile 5 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-standout/30 aspect-[4/3] hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 5" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Tile 6 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-standout/20 to-primary/30 aspect-[5/4] hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 6" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Tile 7 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary/30 to-standout/20 aspect-square hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 7" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Tile 8 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-standout/30 to-primary/20 aspect-[3/4] hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 8" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Tile 9 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-standout/30 aspect-[2/3] hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 9" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Tile 10 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-standout/20 to-primary/30 aspect-[4/3] hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 10" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Tile 11 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary/30 to-standout/20 aspect-square hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 11" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Tile 12 */}
                    <div className="scroll-animate opacity-0 translate-y-3 break-inside-avoid mb-2 odd:hidden md:odd:block">
                        <div className="relative overflow-hidden bg-gradient-to-br from-standout/30 to-primary/20 aspect-[3/4] hover:scale-[1.02] transition-transform duration-300 rounded-lg">
                            <img src="/professional-designer-portrait.jpg" alt="Gallery image 12" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>




            <Footer />
        </div>
    )
}
