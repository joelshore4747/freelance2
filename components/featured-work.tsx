"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface WorkItem {
    id: number
    title: string
    company: string
    category: string
    description: string
    image: string
    tags: string[]
    caseStudyUrl: string
    liveSiteUrl: string
}

interface FeaturedWorkProps {
    works?: WorkItem[]
    categories?: string[]
}

const defaultWorks: WorkItem[] = [
    {
        id: 1,
        title: "TechFlow E-commerce Platform",
        company: "TechFlow",
        category: "E-commerce",
        description: "Complete e-commerce overhaul resulting in 180% increase in conversion rates and 5x revenue growth.",
        image: "/modern-ecommerce-dashboard.png",
        tags: ["React", "NextJS", "Shopify"],
        caseStudyUrl: "#",
        liveSiteUrl: "#",
    },
    {
        id: 2,
        title: "GrowthLab Marketing Platform",
        company: "GrowthLab",
        category: "SaaS",
        description: "Modern SaaS platform that helped GrowthLab achieve 300% user growth in 6 months.",
        image: "/marketing-analytics-dashboard-dark-theme.jpg",
        tags: ["NextJS", "Python", "AWS"],
        caseStudyUrl: "#",
        liveSiteUrl: "#",
    },
    {
        id: 3,
        title: "FinanceFlow Mobile App",
        company: "FinanceFlow",
        category: "Mobile App",
        description: "Revolutionary mobile banking app with AI-powered insights and seamless user experience.",
        image: "/mobile-banking-app.png",
        tags: ["React Native", "Node.js", "MongoDB"],
        caseStudyUrl: "#",
        liveSiteUrl: "#",
    },
    {
        id: 4,
        title: "Corporate Identity System",
        company: "GlobalTech",
        category: "Corporate",
        description: "Complete brand identity and website redesign that increased brand recognition by 250%.",
        image: "/corporate-website-design.png",
        tags: ["Figma", "NextJS", "Framer"],
        caseStudyUrl: "#",
        liveSiteUrl: "#",
    },
]

const defaultCategories = ["All", "E-commerce", "SaaS", "Corporate", "Mobile App"]

export default function FeaturedWork({ works = defaultWorks, categories = defaultCategories }: FeaturedWorkProps) {
    const [activeCategory, setActiveCategory] = useState("All")
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)
    const desktopScrollRef = useRef<HTMLDivElement>(null)

    const filteredWorks = activeCategory === "All" ? works : works.filter((work) => work.category === activeCategory)

    const itemsPerPage = 2 // Show 2 full items per page
    const totalPages = Math.ceil(filteredWorks.length / itemsPerPage)

    const scrollToPage = (pageIndex: number) => {
        const isMobile = window.innerWidth < 1024
        const targetRef = isMobile ? scrollRef.current : desktopScrollRef.current

        if (targetRef) {
            const cardWidth = isMobile ? 320 + 24 : 400 + 48 // card width + gap
            const scrollPosition = pageIndex * (cardWidth * itemsPerPage)

            targetRef.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            })
            setCurrentIndex(pageIndex)
        }
    }

    const nextSlide = () => {
        if (currentIndex < totalPages - 1) {
            const nextIndex = currentIndex + 1
            scrollToPage(nextIndex)
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1
            scrollToPage(prevIndex)
        }
    }

    const isAtStart = currentIndex === 0
    const isAtEnd = currentIndex === totalPages - 1

    useEffect(() => {
        setCurrentIndex(0)
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        }
        if (desktopScrollRef.current) {
            desktopScrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        }
    }, [activeCategory])

    return (
        <section className="py-32 lg:py-48 bg-section-white text-section-white-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-sans mb-6 text-balance opacity-0 translate-y-8">
                        Our Featured <span style={{ color: "var(--tech-accent-2)" }}>Work</span>
                    </h2>
                    <p className="scroll-animate text-lg md:text-xl text-muted-foreground font-serif mb-12 max-w-3xl mx-auto text-pretty leading-relaxed opacity-0 translate-y-8 animation-delay-300">
                        A showcase of our recent projects that demonstrate our expertise in design and development. Each project
                        tells a story of transformation and measurable success.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`work-nav-tab ${activeCategory === category ? "active" : ""}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop Carousel View */}
                <div className="hidden lg:block relative mb-16">
                    <div className="flex justify-between items-center mb-8">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevSlide}
                            disabled={isAtStart}
                            className="rounded-full h-14 w-14 border-2 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                borderColor: "color-mix(in oklch, var(--color-primary) 30%, transparent)",
                            }}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>

                        <div className="flex gap-3">
                            {Array.from({ length: totalPages }).map((_, pageIndex) => (
                                <button
                                    key={pageIndex}
                                    onClick={() => scrollToPage(pageIndex)}
                                    className={`h-3 rounded-full transition-all duration-300 ${
                                        pageIndex === currentIndex ? "bg-standout w-8" : "bg-muted-foreground/30 w-3"
                                    }`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextSlide}
                            disabled={isAtEnd}
                            className="rounded-full h-14 w-14 border-2 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                borderColor: "color-mix(in oklch, var(--color-primary) 30%, transparent)",
                            }}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>

                    <div
                        ref={desktopScrollRef}
                        className="flex gap-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            // Show exactly 2.3 cards width
                            width: "calc(2.3 * (400px + 48px))",
                        }}
                    >
                        {filteredWorks.map((work, index) => (
                            <div
                                key={work.id}
                                className="featured-work-card flex-shrink-0 w-96 snap-start"
                                style={{
                                    animationDelay: `${index * 200}ms`,
                                    animation: "fadeInScale 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                                    opacity: "0",
                                }}
                            >
                                <div className="aspect-video bg-muted overflow-hidden relative rounded-t-xl">
                                    <img
                                        src={work.image || "/placeholder.svg"}
                                        alt={work.title}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                    <div className="absolute top-6 left-6">
                    <span
                        className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md"
                        style={{
                            background: "color-mix(in oklch, var(--color-standout) 70%, var(--color-muted))",
                            color: "white",
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                        }}
                    >
                      {work.category}
                    </span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="mb-6">
                                        <h3
                                            className="text-xl font-bold text-card-foreground mb-2"
                                            style={{
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
                                                fontWeight: "600",
                                                letterSpacing: "-0.01em",
                                            }}
                                        >
                                            {work.title}
                                        </h3>
                                        <p
                                            className="font-medium text-sm"
                                            style={{
                                                color: "color-mix(in oklch, var(--color-standout) 80%, var(--color-muted))",
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            }}
                                        >
                                            {work.company}
                                        </p>
                                    </div>
                                    <p
                                        className="text-muted-foreground text-base leading-relaxed mb-6"
                                        style={{
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        {work.description}
                                    </p>
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {work.tags.map((tag) => (
                                            <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <Button
                                            asChild
                                            className="flex-1 h-12 rounded-full font-medium transition-all duration-300 hover:scale-105"
                                            style={{
                                                background: "color-mix(in oklch, var(--color-standout) 80%, var(--color-muted))",
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            }}
                                        >
                                            <Link href={work.caseStudyUrl}>View Case Study</Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="h-12 rounded-full border-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-transparent"
                                            style={{
                                                borderColor: "color-mix(in oklch, var(--color-primary) 30%, transparent)",
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            }}
                                        >
                                            <Link href={work.liveSiteUrl}>Live Site</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Carousel View */}
                <div className="lg:hidden relative mb-16">
                    <div className="flex justify-between items-center mb-6">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevSlide}
                            disabled={isAtStart}
                            className="rounded-full h-12 w-12 border-2 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                borderColor: "color-mix(in oklch, var(--color-primary) 30%, transparent)",
                            }}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, pageIndex) => (
                                <button
                                    key={pageIndex}
                                    onClick={() => scrollToPage(pageIndex)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        pageIndex === currentIndex ? "bg-standout w-6" : "bg-muted-foreground/30"
                                    }`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextSlide}
                            disabled={isAtEnd}
                            className="rounded-full h-12 w-12 border-2 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                borderColor: "color-mix(in oklch, var(--color-primary) 30%, transparent)",
                            }}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {filteredWorks.map((work) => (
                            <div key={work.id} className="featured-work-card flex-shrink-0 w-80 snap-center">
                                <div className="aspect-video bg-muted overflow-hidden relative rounded-t-xl">
                                    <img
                                        src={work.image || "/placeholder.svg"}
                                        alt={work.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                    <span
                        className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md"
                        style={{
                            background: "color-mix(in oklch, var(--color-standout) 70%, var(--color-muted))",
                            color: "white",
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                        }}
                    >
                      {work.category}
                    </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3
                                            className="text-xl font-bold text-card-foreground mb-1"
                                            style={{
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
                                                fontWeight: "600",
                                                letterSpacing: "-0.01em",
                                            }}
                                        >
                                            {work.title}
                                        </h3>
                                        <p
                                            className="font-medium text-sm"
                                            style={{
                                                color: "color-mix(in oklch, var(--color-standout) 80%, var(--color-muted))",
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            }}
                                        >
                                            {work.company}
                                        </p>
                                    </div>

                                    <p
                                        className="text-muted-foreground text-base leading-relaxed mb-4"
                                        style={{
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        {work.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {work.tags.map((tag) => (
                                            <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            asChild
                                            className="flex-1 h-12 rounded-full font-medium transition-all duration-300 hover:scale-105"
                                            style={{
                                                background: "color-mix(in oklch, var(--color-standout) 80%, var(--color-muted))",
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            }}
                                        >
                                            <Link href={work.caseStudyUrl}>View Case Study</Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="h-12 rounded-full border-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-transparent"
                                            style={{
                                                borderColor: "color-mix(in oklch, var(--color-primary) 30%, transparent)",
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            }}
                                        >
                                            <Link href={work.liveSiteUrl}>Live Site</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
