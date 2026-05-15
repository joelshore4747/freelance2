"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import OptimizedImage from "@/components/ui/optimized-image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GetStartedButton } from "@/components/get-started-button"
import { cn } from "@/lib/utils"
import {
    ArrowRight,
    Award,
    Calendar,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Headphones,
    Target,
    TrendingUp,
    Users,
} from "lucide-react"

function useCarousel(itemsLength: number) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)

    const scrollToIndex = (index: number) => {
        if (scrollRef.current) {
            const scrollWidth = scrollRef.current.scrollWidth
            const itemWidth = scrollWidth / itemsLength
            const scrollPosition = index * itemWidth

            scrollRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            })
            setCurrentIndex(index)
        }
    }

    const nextSlide = () => {
        const nextIndex = itemsLength === 0 ? 0 : (currentIndex + 1) % itemsLength
        scrollToIndex(nextIndex)
    }

    const prevSlide = () => {
        const prevIndex = currentIndex === 0 ? Math.max(itemsLength - 1, 0) : currentIndex - 1
        scrollToIndex(prevIndex)
    }

    return { currentIndex, scrollRef, scrollToIndex, nextSlide, prevSlide }
}

const serviceShowcaseData = [
    {
        id: "strategy",
        title: "Launch Strategy Intensive",
        company: "Go-to-market playbook",
        category: "Strategy",
        description:
            "Two-week immersion that aligns positioning, messaging, and critical funnels so your next release ships with confidence.",
        image: "/modern-saas-dashboard-with-dark-blue-and-orange-ge.jpg",
        tags: ["Positioning", "Roadmapping", "Success metrics"],
        caseStudyUrl: "/contact?service=strategy",
    },
    {
        id: "design-system",
        title: "Product Design System Sprint",
        company: "Interface & interaction patterns",
        category: "Design",
        description:
            "Design foundations, component libraries, and usage guidelines that keep teams shipping consistent, accessible UI at speed.",
        image: "/saas-dashboard-analytics-interface.jpg",
        tags: ["Design tokens", "Component kits", "Accessibility"],
        caseStudyUrl: "/contact?service=design-system",
    },
    {
        id: "commerce-build",
        title: "Commerce Build & Optimization",
        company: "Revenue-first storefront",
        category: "Development",
        description:
            "Headless storefront builds with conversion-focused storytelling, subscription flows, and analytics baked in from day one.",
        image: "/modern-ecommerce-interface.png",
        tags: ["Headless", "Subscriptions", "Lifecycle analytics"],
        caseStudyUrl: "/contact?service=commerce",
    },
    {
        id: "automation",
        title: "Automation & Ops Enablement",
        company: "Internal tooling uplift",
        category: "Optimization",
        description:
            "Workflow audits and automation layers that replace repetitive ops with intelligent dashboards, alerts, and AI copilots.",
        image: "/data-analytics-dashboard.png",
        tags: ["No-code", "AI copilots", "Analytics"],
        caseStudyUrl: "/contact?service=automation",
    },
    {
        id: "launchpad",
        title: "Founder Launchpad",
        company: "End-to-end launch package",
        category: "Strategy",
        description:
            "Brand, product, and engineering support bundled to take founders from idea to public launch in under eight weeks.",
        image: "/placeholder-7fi4h.png",
        tags: ["Brand", "MVP build", "Growth loops"],
        caseStudyUrl: "/contact?service=launchpad",
    },
]

const serviceCategories = ["All", "Strategy", "Design", "Development", "Optimization"]

export default function ServicesClientPage() {
    const [activeWorkCategory, setActiveWorkCategory] = useState("All")
    const filteredWorks =
        activeWorkCategory === "All"
            ? serviceShowcaseData
            : serviceShowcaseData.filter((work) => work.category === activeWorkCategory)

    const fwRailRef = useRef<HTMLDivElement | null>(null)
    const fwContainerRef = useRef<HTMLDivElement | null>(null)
    const [fwActive, setFwActive] = useState(0)
    const fwGap = 32
    const fwCardW = useRef(0)

    useEffect(() => {
        const railEl = fwRailRef.current
        const containerEl = fwContainerRef.current
        if (!railEl || !containerEl) return

        const measure = () => {
            const vw = window.innerWidth
            const w = Math.round(Math.min(880, Math.max(620, vw * 0.38)))
            fwCardW.current = w
            railEl.style.setProperty("--fw-card-w", `${w}px`)

            const railLeft = railEl.getBoundingClientRect().left
            const containerLeft = containerEl.getBoundingClientRect().left
            const leftPad = Math.max(0, Math.round(containerLeft - railLeft))

            railEl.style.paddingLeft = `${leftPad}px`
            railEl.style.paddingRight = `${leftPad}px`
            railEl.style.scrollPaddingLeft = `${leftPad}px`
            railEl.style.scrollPaddingRight = `${leftPad}px`
            railEl.scrollLeft = 0
        }

        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(document.documentElement)
        return () => ro.disconnect()
    }, [filteredWorks.length])

    useEffect(() => {
        const railEl = fwRailRef.current
        if (!railEl) return

        const onScroll = () => {
            const w = fwCardW.current || 800
            const idx = Math.round(railEl.scrollLeft / (w + fwGap))
            setFwActive(Math.max(0, Math.min(idx, filteredWorks.length - 1)))
        }

        railEl.addEventListener("scroll", onScroll, { passive: true })
        onScroll()
        return () => railEl.removeEventListener("scroll", onScroll)
    }, [filteredWorks.length])

    const fwScrollTo = (i: number) => {
        const railEl = fwRailRef.current
        if (!railEl) return
        const w = fwCardW.current || 800
        railEl.scrollTo({ left: i * (w + fwGap), behavior: "smooth" })
    }

    const fwPrev = () => fwScrollTo(Math.max(0, fwActive - 1))
    const fwNext = () => fwScrollTo(Math.min(filteredWorks.length - 1, fwActive + 1))

    const worksCarousel = useCarousel(serviceShowcaseData.length)

    useEffect(() => {
        setFwActive(0)
        const id = requestAnimationFrame(() => fwScrollTo(0))
        const id2 = requestAnimationFrame(() => {
            try {
                worksCarousel.scrollToIndex(0)
            } catch {
                /* noop */
            }
        })
        return () => {
            cancelAnimationFrame(id)
            cancelAnimationFrame(id2)
        }
    }, [activeWorkCategory, worksCarousel])

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <section className="py-20 lg:py-32 bg-standout">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="secondary" className="mb-6 font-serif bg-primary/10 text-primary border-primary/20">
                                Premium Digital Services
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-sans mb-6 text-balance">
                                Everything You Need to <span className="text-primary">Succeed Online</span>
                            </h1>
                            <p className="text-xl text-gray-600 font-serif mb-8 text-pretty">
                                From initial concept to ongoing optimization, we provide comprehensive digital solutions that drive growth and deliver measurable results.
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    "Custom web design & development tailored to your brand",
                                    "Mobile-first approach ensuring perfect performance on all devices",
                                    "SEO optimization and performance monitoring included",
                                    "Ongoing support and maintenance for peace of mind",
                                ].map((point, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 font-serif">{point}</span>
                                    </div>
                                ))}
                            </div>

                            <GetStartedButton size="lg" className="font-serif font-semibold" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                {
                                    icon: <Target className="h-8 w-8" />,
                                    number: "150+",
                                    label: "Projects Delivered",
                                    description: "Successfully completed",
                                },
                                {
                                    icon: <Users className="h-8 w-8" />,
                                    number: "98%",
                                    label: "Client Satisfaction",
                                    description: "Happy clients rate",
                                },
                                {
                                    icon: <Calendar className="h-8 w-8" />,
                                    number: "5+",
                                    label: "Years Experience",
                                    description: "In web development",
                                },
                                {
                                    icon: <Headphones className="h-8 w-8" />,
                                    number: "24/7",
                                    label: "Support",
                                    description: "Always available",
                                },
                            ].map((metric, index) => (
                                <Card key={index} className="bg-white border-gray-200 shadow-lg transition-all duration-300 p-6">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 mx-auto">
                                            {metric.icon}
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 font-sans mb-1">{metric.number}</div>
                                        <div className="text-sm font-semibold text-gray-900 font-sans mb-1">{metric.label}</div>
                                        <div className="text-xs text-gray-500 font-serif">{metric.description}</div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Showcase Carousel */}
            <section className="relative isolate overflow-hidden py-36 lg:py-[12rem] bg-section-white text-section-white-foreground">
                <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-transparent to-standout/20 [background-size:200%_200%] [animation:bg-pan_18s_ease-in-out_infinite]"
                />

                <div ref={fwContainerRef} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
                    <div className="text-left lg:text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-sans mb-1 lg:mb-6">
                            Signature <span className="text-standout">Service Experiences</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-muted-foreground font-serif mb-12 max-w-3xl lg:mx-auto leading-relaxed">
                            High-touch engagements that blend strategy, design, and engineering to deliver measurable business impact.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {serviceCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveWorkCategory(category)}
                                    className={cn(
                                        "px-7 py-3 rounded-full text-lg transition-all duration-500 ease-out relative font-semibold border-2 border-transparent",
                                        activeWorkCategory === category
                                            ? "featured-pill-active shadow-[0_12px_40px_rgba(59,130,246,0.35)]"
                                            : "border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:shadow-[0_12px_40px_rgba(59,130,246,0.25)] hover:-translate-y-0.5",
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block relative">
                    <div className="-mx-4 sm:-mx-6 lg:-mx-8 relative">
                        <div
                            ref={fwRailRef}
                            className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-0"
                            style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" as any }}
                            role="region"
                            aria-roledescription="carousel"
                            aria-label="Service showcase"
                        >
                            {filteredWorks.map((work) => (
                                <article
                                    key={work.id}
                                    className="fw-card group relative snap-center flex-shrink-0 overflow-hidden rounded-[22px] bg-black/95 ring-1 ring-white/10 shadow-[0_30px_90px_rgba(15,23,42,0.45)] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 hover:shadow-[0_38px_120px_rgba(15,23,42,0.55)] before:absolute before:-inset-5 before:-z-10 before:rounded-[32px] before:bg-primary/25 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-700 before:ease-out group-hover:before:opacity-100"
                                    style={{ width: "var(--fw-card-w)" }}
                                >
                                    <div className="relative overflow-hidden" style={{ aspectRatio: "21/9" }}>
                                        <OptimizedImage
                                            src={work.image}
                                            alt={work.title}
                                            fill
                                            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                                            sizes="(max-width: 1024px) 100vw, 900px"
                                        />
                                        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur bg-standout/70 text-white shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
                                            {work.category}
                                        </span>
                                    </div>

                                    <div className="p-8 md:p-10">
                                        <h3 className="text-[clamp(1.8rem,1.3vw+1rem,2.3rem)] font-bold text-white mb-2">{work.title}</h3>
                                        <p className="text-standout/90 font-semibold text-[clamp(1rem,0.55vw+0.95rem,1.25rem)] mb-4">{work.company}</p>
                                        <p className="text-white/80 text-[clamp(1.1rem,0.7vw+1rem,1.35rem)] leading-relaxed mb-6 transition-opacity duration-700 group-hover:text-white/90">
                                            {work.description}
                                        </p>

                                        <div className="flex flex-wrap gap-3 mb-8">
                                            {work.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="tech-tag text-[clamp(1rem,0.35vw+0.95rem,1.15rem)] transition-all duration-500 ease-out group-hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <Link
                                            href={work.caseStudyUrl}
                                            className={cn(
                                                buttonVariants({ variant: "default" }),
                                                "h-16 px-10 rounded-full text-lg font-semibold transition-transform duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(59,130,246,0.35)]",
                                            )}
                                        >
                                            View Case Study
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="mt-9 flex items-center justify-center gap-4 px-4">
                        <button
                            onClick={fwPrev}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background ring-1 ring-foreground/20 hover:bg-foreground/90 shadow-md"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3">
                            {filteredWorks.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => fwScrollTo(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={cn(
                                        "h-3.5 rounded-full border transition-all",
                                        i === fwActive ? "w-12 bg-white border-white/70" : "w-3.5 bg-white/25 border-white/40 hover:bg-white/45",
                                    )}
                                />
                            ))}
                        </div>
                        <button
                            onClick={fwNext}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background ring-1 ring-foreground/20 hover:bg-foreground/90 shadow-md"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="lg:hidden relative mt-10">
                    <div
                        ref={worksCarousel.scrollRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-4"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Service showcase"
                    >
                        {filteredWorks.map((work) => (
                            <div
                                key={work.id}
                                className="featured-work-card group relative flex-shrink-0 w-[22.5rem] snap-center overflow-hidden rounded-2xl bg-card/80 ring-1 ring-white/10 shadow-[0_18px_60px_rgba(15,23,42,0.35)] transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(15,23,42,0.45)] before:absolute before:-inset-4 before:-z-10 before:rounded-3xl before:bg-primary/20 before:blur-3xl before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100"
                            >
                                <div className="relative" style={{ aspectRatio: "21/9" }}>
                                    <img
                                        src={work.image}
                                        alt={work.title}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                    />
                                    <span className="absolute top-4 left-4 bg-standout text-white px-2.5 py-1.5 rounded text-xs font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
                                        {work.category}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-[1.55rem] font-bold text-card-foreground mb-1">{work.title}</h3>
                                    <p className="text-standout font-semibold text-sm mb-3">{work.company}</p>
                                    <p className="text-muted-foreground text-[1.1rem] leading-relaxed mb-4">{work.description}</p>
                                    <div className="flex flex-wrap gap-2.5 mb-6">
                                        {work.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="tech-tag text-[1rem] transition-all duration-500 ease-out group-hover:shadow-[0_0_25px_rgba(56,189,248,0.35)]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        href={work.caseStudyUrl}
                                        className={cn(
                                            buttonVariants({ variant: "default" }),
                                            "w-full h-12 rounded-full text-base font-semibold transition-transform duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(59,130,246,0.35)]",
                                        )}
                                    >
                                        View Case Study
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            onClick={worksCarousel.prevSlide}
                            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                            aria-label="Previous service"
                        >
                            <ChevronLeft className="w-5 h-5 text-primary" />
                        </button>
                        <div className="flex gap-2">
                            {filteredWorks.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => worksCarousel.scrollToIndex(index)}
                                    className={cn(
                                        "h-2.5 rounded-full transition-all",
                                        index === worksCarousel.currentIndex ? "w-10 bg-standout" : "w-3 bg-primary/30 hover:bg-primary/50",
                                    )}
                                    aria-label={`Go to service ${index + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={worksCarousel.nextSlide}
                            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                            aria-label="Next service"
                        >
                            <ChevronRight className="w-5 h-5 text-primary" />
                        </button>
                    </div>
                </div>

                <div className="text-center mt-16">
                    <Link
                        href="/portfolio"
                        className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }),
                            "h-16 px-10 rounded-full text-lg font-semibold border-2",
                            "bg-primary/10 text-primary border-primary hover:bg-primary hover:text-primary-foreground",
                        )}
                    >
                        <span className="flex items-center">
                            View All Projects <ArrowRight className="ml-3 h-6 w-6" />
                        </span>
                    </Link>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 lg:py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-sans mb-6 text-balance">Why Choose Us</h2>
                        <p className="text-xl text-gray-600 font-serif max-w-2xl mx-auto text-pretty">
                            What sets us apart from other agencies and freelancers in the industry.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Award className="h-8 w-8" />,
                                title: "Award-Winning Design",
                                description: "Recognized for excellence in web design and user experience.",
                            },
                            {
                                icon: <Clock className="h-8 w-8" />,
                                title: "Fast Delivery",
                                description: "Most projects completed within 2-4 weeks without compromising quality.",
                            },
                            {
                                icon: <TrendingUp className="h-8 w-8" />,
                                title: "Proven Results",
                                description: "Average 150% increase in conversion rates for our clients.",
                            },
                            {
                                icon: <Users className="h-8 w-8" />,
                                title: "Personal Attention",
                                description: "Direct access to the team, no account managers or middlemen.",
                            },
                        ].map((reason, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 mx-auto">
                                    {reason.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 font-sans mb-3">{reason.title}</h3>
                                <p className="text-gray-600 font-serif text-pretty">{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4-Stage Process Section */}
            <section className="py-20 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-sans mb-6 text-balance">Our 4-Stage Process</h2>
                        <p className="text-xl text-gray-600 font-serif max-w-2xl mx-auto text-pretty">
                            A proven methodology that ensures your project is delivered on time, on budget, and exceeds expectations.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    step: "01",
                                    title: "Discovery & Planning",
                                    description:
                                        "We start with a comprehensive discovery session to understand your goals, target audience, and project requirements.",
                                },
                                {
                                    step: "02",
                                    title: "Design & Strategy",
                                    description:
                                        "We create wireframes, mockups, and a detailed project strategy that aligns with your business objectives.",
                                },
                                {
                                    step: "03",
                                    title: "Development & Testing",
                                    description:
                                        "We build your project using modern technologies, with regular testing and quality assurance throughout.",
                                },
                                {
                                    step: "04",
                                    title: "Launch & Support",
                                    description:
                                        "We deploy your project and provide ongoing support, training, and optimization to ensure continued success.",
                                },
                            ].map((process, index) => (
                                <div key={index} className="text-center relative">
                                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-xl font-sans mb-4 mx-auto relative z-10 shadow-lg">
                                        {process.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 font-sans mb-3">{process.title}</h3>
                                    <p className="text-gray-600 font-serif text-pretty">{process.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Transparent Pricing Section */}
            <section className="py-20 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-sans mb-6 text-balance">Transparent Pricing</h2>
                        <p className="text-xl text-gray-600 font-serif max-w-2xl mx-auto text-pretty">
                            Choose the package that best fits your needs. All packages include our signature attention to detail and ongoing support.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Starter",
                                price: "$5,000",
                                description: "Perfect for small businesses and startups",
                                features: [
                                    "5-page responsive website",
                                    "Mobile-first design",
                                    "Basic SEO optimization",
                                    "Contact form integration",
                                    "2 rounds of revisions",
                                    "30 days support",
                                ],
                                notIncluded: ["E-commerce functionality", "Custom animations", "Advanced integrations"],
                                popular: false,
                            },
                            {
                                name: "Professional",
                                price: "$12,000",
                                description: "Ideal for growing businesses",
                                features: [
                                    "10-page responsive website",
                                    "Custom UI/UX design",
                                    "Advanced SEO optimization",
                                    "CMS integration",
                                    "E-commerce functionality",
                                    "Performance optimization",
                                    "Analytics setup",
                                    "3 rounds of revisions",
                                    "90 days support",
                                ],
                                notIncluded: ["Custom backend development", "Third-party integrations"],
                                popular: true,
                            },
                            {
                                name: "Enterprise",
                                price: "$25,000+",
                                description: "For complex projects and large organizations",
                                features: [
                                    "Unlimited pages",
                                    "Custom web application",
                                    "Full-stack development",
                                    "Advanced integrations",
                                    "Custom animations",
                                    "Security implementation",
                                    "Performance monitoring",
                                    "Team training",
                                    "Unlimited revisions",
                                    "6 months support",
                                ],
                                notIncluded: [],
                                popular: false,
                            },
                        ].map((tier, index) => (
                            <Card
                                key={index}
                                className={cn(
                                    "relative bg-white",
                                    tier.popular ? "border-primary shadow-lg scale-105" : "border-gray-200",
                                )}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-primary text-primary-foreground font-serif">Most Popular</Badge>
                                    </div>
                                )}
                                <CardHeader className="text-center pb-8">
                                    <CardTitle className="font-sans text-2xl text-gray-900">{tier.name}</CardTitle>
                                    <div className="text-4xl font-bold text-primary font-sans">{tier.price}</div>
                                    <CardDescription className="font-serif text-gray-600">{tier.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 font-sans mb-3">What’s Included:</h4>
                                        <ul className="space-y-2">
                                            {tier.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-center gap-2 text-gray-600 font-serif text-sm">
                                                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {tier.notIncluded.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-gray-900 font-sans mb-3">Not Included:</h4>
                                            <ul className="space-y-2">
                                                {tier.notIncluded.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="flex items-center gap-2 text-gray-500 font-serif text-sm">
                                                        <span className="text-gray-400">✕</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <Button className="w-full font-sans font-semibold" variant="default" size="lg">
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
