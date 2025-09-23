"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GetStartedButton } from "@/components/get-started-button"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import {
    Code,
    Palette,
    Smartphone,
    Users,
    Target,
    Rocket,
    ArrowRight,
    BarChart3,
    Search,
    Globe,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { EmailSignup } from "@/components/email-signup"
import FeaturedWork from "@/components/featured-work";
import FAQSection from "@/components/faq-section";


function useCarousel(itemsLength: number) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)

    const scrollToIndex = (index: number) => {
        if (scrollRef.current) {
            const scrollWidth = scrollRef.current.scrollWidth
            const containerWidth = scrollRef.current.clientWidth
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
        const nextIndex = (currentIndex + 1) % itemsLength
        scrollToIndex(nextIndex)
    }

    const prevSlide = () => {
        const prevIndex = currentIndex === 0 ? itemsLength - 1 : currentIndex - 1
        scrollToIndex(prevIndex)
    }

    return {
        currentIndex,
        scrollRef,
        scrollToIndex,
        nextSlide,
        prevSlide,
    }
}

function useScrollAnimation() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-scroll-fade-up")
                        // Add parallax effect to certain elements
                        if (entry.target.classList.contains("parallax-element")) {
                            entry.target.classList.add("animate-parallax-reveal")
                        }
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -80px 0px", // Trigger animation earlier for smoother effect
            },
        )

        const elements = document.querySelectorAll(".scroll-animate")
        elements.forEach((el) => observer.observe(el))

        // Add parallax scrolling effect
        const handleScroll = () => {
            const scrolled = window.pageYOffset
            const parallaxElements = document.querySelectorAll(".parallax-bg")

            parallaxElements.forEach((element) => {
                const speed = 0.5
                const yPos = -(scrolled * speed)
                ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
            })
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            observer.disconnect()
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
}

export default function HomePageClient() {
    useScrollAnimation()

    const servicesData = [
        {
            icon: <Code className="w-10 h-10" />,
            title: "Web Development",
            description: "Custom websites and web applications built with modern technologies",
            features: [
                "Responsive design for all devices",
                "Fast loading and optimized performance",
                "SEO-friendly architecture",
                "Modern frameworks and technologies",
            ],
        },
        {
            icon: <Palette className="w-10 h-10" />,
            title: "UI/UX Design",
            description: "Beautiful, intuitive designs that enhance user experience",
            features: [
                "User-centered design approach",
                "Interactive prototypes and wireframes",
                "Brand identity and visual systems",
                "Accessibility and usability testing",
            ],
        },
        {
            icon: <Smartphone className="w-10 h-10" />,
            title: "Mobile Apps",
            description: "Native and cross-platform mobile applications",
            features: [
                "iOS and Android development",
                "Cross-platform solutions",
                "App store optimization",
                "Push notifications and analytics",
            ],
        },
        {
            icon: <Globe className="w-10 h-10" />,
            title: "E-commerce",
            description: "Complete online store solutions with payment integration",
            features: [
                "Secure payment processing",
                "Inventory management systems",
                "Customer account portals",
                "Analytics and reporting tools",
            ],
        },
        {
            icon: <Search className="w-10 h-10" />,
            title: "SEO Optimization",
            description: "Improve your search engine rankings and online visibility",
            features: [
                "Keyword research and strategy",
                "On-page and technical SEO",
                "Content optimization",
                "Performance monitoring and reporting",
            ],
        },
        {
            icon: <BarChart3 className="w-10 h-10" />,
            title: "Digital Marketing",
            description: "Comprehensive digital marketing strategies to grow your business",
            features: [
                "Social media marketing campaigns",
                "Pay-per-click advertising",
                "Email marketing automation",
                "Analytics and conversion tracking",
            ],
        },
    ]

    const worksData = [
        {
            title: "E-commerce Platform",
            category: "Web Development",
            description: "Modern e-commerce solution with advanced filtering and seamless checkout experience.",
            image: "/modern-ecommerce-interface.png",
        },
        {
            title: "SaaS Dashboard",
            category: "UI/UX Design",
            description: "Clean, intuitive dashboard design for a B2B analytics platform with complex data visualization.",
            image: "/saas-dashboard-analytics-interface.jpg",
        },
        {
            title: "Mobile App Design",
            category: "Mobile Design",
            description: "User-friendly mobile app design for a fitness tracking application with social features.",
            image: "/mobile-fitness-app-interface-design.jpg",
        },
    ]

    const featuredWorksData = [
        {
            id: 1,
            title: "TechFlow E-commerce Platform",
            company: "TechFlow",
            category: "E-commerce",
            description: "Complete e-commerce overhaul …",
            image: "/modern-ecommerce-dashboard.png",
            tags: ["React", "NextJS", "Shopify"],
            caseStudyUrl: "/case-studies/techflow",
            liveSiteUrl: "https://techflow.com",
        },
        {
            id: 2,
            title: "GrowthLab Marketing Platform",
            company: "GrowthLab",
            category: "SaaS",
            description: "Modern SaaS platform …",
            image: "/marketing-analytics-dashboard-dark-theme.jpg",
            tags: ["NextJS", "Python", "AWS"],
            caseStudyUrl: "/case-studies/growthlab",
            liveSiteUrl: "https://growthlab.com",
        },
        {
            id: 3,
            title: "TechFlow E-commerce Platform",
            company: "TechFlow",
            category: "E-commerce",
            description: "Complete e-commerce overhaul …",
            image: "/modern-ecommerce-dashboard.png",
            tags: ["React", "NextJS", "Shopify"],
            caseStudyUrl: "/case-studies/techflow",
            liveSiteUrl: "https://techflow.com",
        },
        {
            id: 4,
            title: "GrowthLab Marketing Platform",
            company: "GrowthLab",
            category: "SaaS",
            description: "Modern SaaS platform …",
            image: "/marketing-analytics-dashboard-dark-theme.jpg",
            tags: ["NextJS", "Python", "AWS"],
            caseStudyUrl: "/case-studies/growthlab",
            liveSiteUrl: "https://growthlab.com",
        },
    ]

    const testimonialsData = [
        {
            quote:
                "Studio Duo transformed our online presence completely. The new website not only looks amazing but has increased our conversion rate by 150%.",
            author: "Sarah Johnson",
            role: "CEO, TechStart Inc.",
            rating: 5,
            avatar: "/professional-woman-portrait.png",
        },
        {
            quote:
                "Working with this team was a pleasure. They understood our vision perfectly and delivered beyond our expectations. Highly recommended!",
            author: "Michael Chen",
            role: "Founder, GrowthLab",
            rating: 5,
            avatar: "/professional-man-portrait.png",
        },
        {
            quote:
                "The attention to detail and professionalism is outstanding. Our new e-commerce platform has been a game-changer for our business.",
            author: "Emily Rodriguez",
            role: "Marketing Director, RetailPro",
            rating: 5,
            avatar: "/professional-woman-portrait.png",
        },
    ]

    const servicesCarousel = useCarousel(servicesData.length)
    const worksCarousel = useCarousel(worksData.length)
    const testimonialsCarousel = useCarousel(testimonialsData.length)
    const [activeStep, setActiveStep] = useState(0)

    const [activeWorkCategory, setActiveWorkCategory] = useState("All")
    const workCategories = ["All", "E-commerce", "SaaS", "Corporate", "Mobile App"]

    const filteredWorks =
        activeWorkCategory === "All"
            ? featuredWorksData
            : featuredWorksData.filter((work) => work.category === activeWorkCategory)
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section with enhanced animations and larger text */}
            <section className="relative py-16 md:py-24 lg:py-48 overflow-hidden bg-section-white text-section-white-foreground">
                <div className="absolute inset-0 parallax-bg bg-gradient-to-br from-primary/5 via-transparent to-standout/5 animate-pulse"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="lg:hidden">
                        {/* Mobile Tagline */}
                        <div className="mb-6">
                            <Badge variant="secondary" className="font-serif text-sm px-3 py-1">
                                ✨ Freelance Design & Development Studio
                            </Badge>
                        </div>

                        {/* Mobile Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground font-sans mb-6 text-balance leading-tight">
                            We Build Digital Experiences That <span className="text-standout font-bold">Convert & Inspire</span>
                        </h1>

                        {/* Mobile Description */}
                        <p className="text-base text-muted-foreground font-serif mb-8 text-pretty leading-relaxed">
                            A two-person studio crafting websites, automations, and AI assistants that ship fast and move metrics.
                        </p>

                        {/* Mobile Features */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {["✓ Conversion-first", "✓ Automations", "✓ AI chatbots", "✓ SEO-friendly"].map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="text-green-500 font-medium">{feature.split(" ")[0]}</span>
                                    <span>{feature.split(" ").slice(1).join(" ")}</span>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Mockup */}
                        <div className="relative mb-8">
                            <div className="bg-gray-900 rounded-2xl p-4 shadow-2xl">
                                <div className="grid grid-cols-3 gap-2">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="aspect-square bg-gray-700 rounded-lg"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-standout text-standout-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                🏆 Award Winning Design
                            </div>
                        </div>

                        {/* Mobile Buttons */}
                        <div className="space-y-4 mb-12">
                            <GetStartedButton size="lg" className="w-full font-serif font-semibold text-base px-8 py-4 mb-4" />
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="w-full font-serif font-semibold bg-transparent text-base px-8 py-4"
                            >
                                <Link href="/portfolio">View Our Work</Link>
                            </Button>
                        </div>

                        {/* Mobile Trusted By */}
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-3">Trusted by founders at</p>
                            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                                <span>Nova</span>
                                <span>Aether</span>
                                <span>Fabric</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:grid grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="text-left animate-fade-in-up">
                            <Badge variant="secondary" className="mb-6 lg:mb-10 font-serif text-sm px-4 py-2 animate-bounce-subtle">
                                Freelance Design & Development Studio
                            </Badge>
                            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground font-sans mb-6 lg:mb-12 text-balance leading-tight animate-slide-in-left">
                                We Build Digital Experiences That <span className="text-standout font-bold">Convert & Inspire</span>
                            </h1>
                            <p className="text-base md:text-lg lg:text-xl text-muted-foreground font-serif mb-8 lg:mb-14 max-w-2xl text-pretty leading-relaxed animate-fade-in-up animation-delay-300">
                                A two-person studio specializing in modern web design, development, and user experiences that drive
                                measurable results for forward-thinking businesses.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 animate-fade-in-up animation-delay-600">
                                <GetStartedButton
                                    size="lg"
                                    className="font-serif font-semibold text-base px-8 py-4 hover:scale-105 transition-transform"
                                />
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="font-serif font-semibold bg-transparent text-base px-8 py-4 hover:scale-105 transition-transform"
                                >
                                    <Link href="/portfolio">View Our Work</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="relative animate-fade-in-right parallax-element">
                            <div className="relative bg-card rounded-3xl p-6 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-float">
                                <img
                                    src="/modern-ecommerce-interface.png"
                                    alt="Modern web interface showcase"
                                    className="w-full h-auto rounded-2xl shadow-2xl"
                                />
                                <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-standout text-standout-foreground px-4 py-2 lg:px-6 lg:py-3 rounded-2xl font-semibold shadow-lg text-xs lg:text-sm animate-bounce-in">
                                    Award Winning Design
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 lg:py-28 bg-section-muted text-section-muted-foreground relative overflow-hidden">
                <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 lg:mb-20">
                        <p className="scroll-animate text-xs uppercase tracking-[0.2em] font-medium mb-6 text-muted-foreground opacity-0 translate-y-4 transition-all duration-500">
                            Why Choose Us
                        </p>
                        <h3 className="scroll-animate text-5xl lg:text-6xl font-bold font-sans mb-8 opacity-0 translate-y-6 animation-delay-200">
              <span className="text-foreground">
                Proven{" "}
                  <span className="bg-gradient-to-r from-[var(--color-tech-accent-1)] to-[var(--color-tech-accent-2)] bg-clip-text text-transparent font-bold">
                  Points
                </span>
              </span>
                        </h3>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Delivering exceptional outcomes through expertise and dedication
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
                        {[
                            {
                                title: "Answer in 48 Hours",
                                description: "Fast responses keep your project moving.",
                                icon: (
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12,6 12,12 16,14" />
                                    </svg>
                                ),
                            },
                            {
                                title: "5+ Years Experience",
                                description: "Depth across modern web technologies.",
                                icon: (
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                        <path d="M4 22h16" />
                                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                    </svg>
                                ),
                            },
                            {
                                title: "100% Project Success",
                                description: "Delivered on time and to specification.",
                                icon: (
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M9 12l2 2 4-4" />
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                ),
                            },
                        ].map((result, index) => (
                            <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                                <div className="bg-card text-card-foreground border border-border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors duration-300">
                                        <div className="text-green-600 dark:text-green-400">{result.icon}</div>
                                    </div>

                                    <h4 className="text-xl font-bold mb-3 leading-tight">{result.title}</h4>

                                    <p className="text-muted-foreground leading-relaxed">{result.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trusted by section with enhanced animations and design */}
            {/*<section className="py-20 lg:py-28 bg-gradient-to-br from-teal-50 to-teal-100 text-section-secondary-foreground relative overflow-hidden">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">*/}
            {/*        <div className="text-left mb-16 lg:mb-20">*/}
            {/*            <p className="scroll-animate text-sm lg:text-base font-serif mb-4 lg:mb-6 text-gray-600 opacity-0 translate-y-8 uppercase tracking-wider">*/}
            {/*                TRUSTED BY LEADING TEAMS*/}
            {/*            </p>*/}
            {/*            <h3 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold font-sans mb-8 lg:mb-12 opacity-0 translate-y-8 animation-delay-300">*/}
            {/*                <span className="text-3xl md:text-4xl lg:text-5xl font-bold">Innovative</span>{" "}*/}
            {/*                <span className="text-orange-500">Companies</span> Worldwide*/}
            {/*            </h3>*/}
            {/*        </div>*/}

            {/*        <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 mb-12">*/}
            {/*            {["TechStart", "GrowthLab", "RetailPro", "InnovateCorp", "DigitalEdge", "FuturesScale"].map(*/}
            {/*                (company, i) => (*/}
            {/*                    <div*/}
            {/*                        key={i}*/}
            {/*                        className="flex justify-center animate-slide-in-up"*/}
            {/*                        style={{ animationDelay: `${i * 100}ms` }}*/}
            {/*                    >*/}
            {/*                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 w-full">*/}
            {/*                            <span className="text-gray-700 font-medium text-sm lg:text-base text-center block">{company}</span>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                ),*/}
            {/*            )}*/}
            {/*        </div>*/}

            {/*        <div className="lg:hidden mb-12">*/}
            {/*            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">*/}
            {/*                {["TechStart", "GrowthLab", "RetailPro", "InnovateCorp", "DigitalEdge", "FuturesScale"].map(*/}
            {/*                    (company, i) => (*/}
            {/*                        <div*/}
            {/*                            key={i}*/}
            {/*                            className="flex-shrink-0 w-40 snap-center animate-slide-in-up"*/}
            {/*                            style={{ animationDelay: `${i * 100}ms` }}*/}
            {/*                        >*/}
            {/*                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">*/}
            {/*                                <span className="text-gray-700 font-medium text-sm text-center block">{company}</span>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    ),*/}
            {/*                )}*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">*/}
            {/*            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/50 shadow-sm text-center animate-fade-in-up animation-delay-600">*/}
            {/*                <div className="text-3xl lg:text-4xl font-bold text-teal-600 mb-2">98%</div>*/}
            {/*                <div className="text-sm text-gray-600 font-medium">Client satisfaction</div>*/}
            {/*            </div>*/}
            {/*            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/50 shadow-sm text-center animate-fade-in-up animation-delay-700">*/}
            {/*                <div className="text-3xl lg:text-4xl font-bold text-orange-500 mb-2">24/7</div>*/}
            {/*                <div className="text-sm text-gray-600 font-medium">Support available</div>*/}
            {/*            </div>*/}
            {/*            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/50 shadow-sm text-center animate-fade-in-up animation-delay-800">*/}
            {/*                <div className="text-3xl lg:text-4xl font-bold text-teal-600 mb-2">5★</div>*/}
            {/*                <div className="text-sm text-gray-600 font-medium">Average rating</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="lg:hidden space-y-4">*/}
            {/*            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm text-center animate-fade-in-up animation-delay-600">*/}
            {/*                <div className="text-3xl font-bold text-teal-600 mb-2">98%</div>*/}
            {/*                <div className="text-sm text-gray-600 font-medium">Client satisfaction</div>*/}
            {/*            </div>*/}
            {/*            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm text-center animate-fade-in-up animation-delay-700">*/}
            {/*                <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>*/}
            {/*                <div className="text-sm text-gray-600 font-medium">Support available</div>*/}
            {/*            </div>*/}
            {/*            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm text-center animate-fade-in-up animation-delay-800">*/}
            {/*                <div className="text-3xl font-bold text-teal-600 mb-2">5★</div>*/}
            {/*                <div className="text-sm text-gray-600 font-medium">Average rating</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/*/!* Tech Stack & Skills Showcase - Visual Interactive Section *!/*/}
            {/*<section className="py-20 lg:py-28 bg-gradient-to-br from-purple-100/20 to-indigo-100/20 text-section-secondary-foreground relative overflow-hidden">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">*/}
            {/*        <div className="text-left mb-16 lg:mb-20">*/}
            {/*            <p className="scroll-animate text-sm lg:text-base font-serif mb-4 lg:mb-6 text-gray-300 opacity-0 translate-y-8 uppercase tracking-wider">*/}
            {/*                TECHNOLOGIES & EXPERTISEa*/}
            {/*            </p>*/}
            {/*            <h3 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold font-sans mb-8 lg:mb-12 opacity-0 translate-y-8 animation-delay-300">*/}
            {/*                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Modern</span>{" "}*/}
            {/*                <span className="text-purple-300">Tech Stack</span> & Skills*/}
            {/*            </h3>*/}
            {/*        </div>*/}

            {/*        /!* Interactive Tech Grid *!/*/}
            {/*        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6 mb-12">*/}
            {/*            {[*/}
            {/*                {*/}
            {/*                    name: "React",*/}
            {/*                    icon: "⚛️",*/}
            {/*                    level: 95,*/}
            {/*                    color: "from-blue-200/50 to-blue-300/50",*/}
            {/*                    textClass: "text-tech-dynamic-1",*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "Next.js",*/}
            {/*                    icon: "▲",*/}
            {/*                    level: 90,*/}
            {/*                    color: "from-gray-200/50 to-gray-300/50",*/}
            {/*                    textClass: "text-tech-dynamic-2",*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "TypeScript",*/}
            {/*                    icon: "TS",*/}
            {/*                    level: 88,*/}
            {/*                    color: "from-indigo-200/50 to-indigo-300/50",*/}
            {/*                    textClass: "text-tech-dynamic-3",*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "Tailwind",*/}
            {/*                    icon: "🎨",*/}
            {/*                    level: 92,*/}
            {/*                    color: "from-teal-200/50 to-teal-300/50",*/}
            {/*                    textClass: "text-tech-dynamic-4",*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "Node.js",*/}
            {/*                    icon: "🟢",*/}
            {/*                    level: 85,*/}
            {/*                    color: "from-green-200/50 to-green-300/50",*/}
            {/*                    textClass: "text-tech-dynamic-1",*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "Python",*/}
            {/*                    icon: "🐍",*/}
            {/*                    level: 80,*/}
            {/*                    color: "from-yellow-200/50 to-yellow-300/50",*/}
            {/*                    textClass: "text-tech-dynamic-2",*/}
            {/*                },*/}
            {/*            ].map((tech, i) => (*/}
            {/*                <div*/}
            {/*                    key={i}*/}
            {/*                    className="group bg-gray-800 backdrop-blur-sm rounded-2xl p-3 md:p-4 lg:p-6 border border-gray-600 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105 animate-slide-in-up cursor-pointer"*/}
            {/*                    style={{ animationDelay: `${i * 100}ms` }}*/}
            {/*                >*/}
            {/*                    <div className="text-center">*/}
            {/*                        <div*/}
            {/*                            className={`text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300 ${tech.textClass}`}*/}
            {/*                        >*/}
            {/*                            {tech.icon}*/}
            {/*                        </div>*/}
            {/*                        <h4 className={`font-semibold mb-2 md:mb-3 text-sm lg:text-base ${tech.textClass}`}>{tech.name}</h4>*/}

            {/*                        /!* Animated Progress Bar *!/*/}
            {/*                        <div className="w-full bg-gray-600/50 rounded-full h-1.5 md:h-2">*/}
            {/*                            <div*/}
            {/*                                className={`h-1.5 md:h-2 rounded-full bg-gradient-to-r ${tech.color} transition-all duration-1000 ease-out group-hover:animate-pulse`}*/}
            {/*                                style={{*/}
            {/*                                    width: `${tech.level}%`,*/}
            {/*                                    animation: `fillBar 2s ease-out ${i * 200}ms both`,*/}
            {/*                                }}*/}
            {/*                            ></div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}

            {/*        /!* Visual Stats with Icons *!/*/}
            {/*        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">*/}
            {/*            <div className="bg-gray-800 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-600 shadow-sm text-center animate-fade-in-up animation-delay-600 group hover:shadow-xl transition-all duration-300">*/}
            {/*                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">*/}
            {/*                    <span className="text-2xl md:text-3xl text-white">💻</span>*/}
            {/*                </div>*/}
            {/*                <div className="text-sm font-bold text-tech-dynamic-1 font-sans mb-4 text-center">*/}
            {/*                    5+ Years Experience*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="bg-gray-800 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-600 shadow-sm text-center animate-fade-in-up animation-delay-700 group hover:shadow-xl transition-all duration-300">*/}
            {/*                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">*/}
            {/*                    <span className="text-2xl md:text-3xl text-white">⚡</span>*/}
            {/*                </div>*/}
            {/*                <div className="text-sm font-bold text-tech-dynamic-2 font-sans mb-4 text-center">*/}
            {/*                    48h Average Response*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="bg-gray-800 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-600 shadow-sm text-center animate-fade-in-up animation-delay-800 group hover:shadow-xl transition-all duration-300">*/}
            {/*                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">*/}
            {/*                    <span className="text-2xl md:text-3xl text-white">🎯</span>*/}
            {/*                </div>*/}
            {/*                <div className="text-sm font-bold text-tech-dynamic-3 font-sans mb-4 text-center">*/}
            {/*                    100 Project Success Rate*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        /!* Mobile-specific layout *!/*/}
            {/*        <div className="lg:hidden mt-6">*/}
            {/*            <div className="bg-gray-800 backdrop-blur-sm rounded-2xl p-4 border border-gray-600 shadow-sm">*/}
            {/*                <h4 className="font-semibold text-tech-dynamic-4 mb-3 text-center text-sm">Specialized In</h4>*/}
            {/*                <div className="flex flex-wrap justify-center gap-2">*/}
            {/*                    {["Frontend", "Backend", "Full-Stack", "UI/UX", "Mobile", "API"].map((skill, i) => (*/}
            {/*                        <span*/}
            {/*                            key={i}*/}
            {/*                            className="px-2 py-1 bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-full text-xs font-medium animate-fade-in-up"*/}
            {/*                            style={{ animationDelay: `${i * 100}ms` }}*/}
            {/*                        >*/}
            {/*        {skill}*/}
            {/*      </span>*/}
            {/*                    ))}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* Services section with carousel for tablet and below */}
            <section className="py-20 lg:py-28 bg-section-white text-section-white-foreground">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-20">
                        <h2 className="scroll-animate text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white font-sans mb-8 text-balance opacity-0 translate-y-8 tracking-tight">
                            What We Do <span className="text-standout">Best</span>
                        </h2>
                        <p className="scroll-animate text-xl md:text-2xl text-muted-foreground font-serif max-w-4xl mx-auto text-pretty leading-relaxed opacity-0 translate-y-8 animation-delay-300 font-light">
                            From concept to launch, we handle every aspect of your digital presence with expertise and attention to
                            detail.
                        </p>
                    </div>

                    <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, index) => (
                            <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                <Card className="services-card-apple h-full transition-all duration-300 border-[1.5px] border-[var(--color-tech-accent-1)] dark:border-[var(--color-tech-accent-1)] bg-card dark:bg-card rounded-[var(--radius-lg)] overflow-hidden group-hover:border-[var(--color-tech-accent-4)] group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:bg-[color-mix(in_srgb,var(--color-section-muted)_6%,var(--color-card))]">
                                    <CardHeader className="pb-2 pt-2 px-8">
                                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 text-[var(--color-tech-accent-1)] bg-blue-50 dark:bg-blue-950/30 group-hover:text-[var(--color-tech-accent-4)] group-hover:bg-orange-50 dark:group-hover:bg-orange-950/30 group-hover:shadow-sm">
                                            {service.icon}
                                        </div>
                                        <CardTitle className="services-title text-xl font-semibold text-black dark:text-white mb-2 transition-colors duration-300">
                                            {service.title}
                                        </CardTitle>
                                        <CardDescription className="services-description text-base text-black dark:text-white leading-relaxed font-normal">
                                            {service.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-8 pb-2">
                                        <ul className="space-y-2 mb-8">
                                            {service.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start gap-3">
                                                    <span className="w-1.5 h-1.5 bg-[var(--color-tech-accent-4)] rounded-full mt-2 flex-shrink-0"></span>
                                                    <span className="services-feature-text text-sm text-black dark:text-white leading-snug font-light">
                            {feature}
                          </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex justify-start">
                                            <Link
                                                href="/services"
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-transparent border border-[var(--color-border)] rounded-full transition-all duration-300 hover:border-[var(--color-tech-accent-4)] hover:text-[var(--color-tech-accent-4)] hover:bg-[color-mix(in_srgb,var(--color-tech-accent-4)_5%,transparent)] group-hover:border-[var(--color-tech-accent-4)] group-hover:text-[var(--color-tech-accent-4)]"
                                            >
                                                Learn More
                                                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    <div className="lg:hidden relative">
                        <div
                            ref={servicesCarousel.scrollRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {servicesData.map((service, index) => (
                                <div key={index} className="group flex-shrink-0 w-80 snap-center">
                                    <Card className="services-card-apple h-full transition-all duration-300 border-[1.5px] border-[var(--color-tech-accent-1)] dark:border-[var(--color-tech-accent-1)] bg-card dark:bg-card rounded-[var(--radius-lg)] overflow-hidden group-hover:border-[var(--color-tech-accent-4)]">
                                        <CardHeader className="pb-2 pt-3 px-8">
                                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 text-[var(--color-tech-accent-1)] bg-blue-50 dark:bg-blue-950/30 group-hover:text-[var(--color-tech-accent-4)] group-hover:bg-orange-50 dark:group-hover:bg-orange-950/30">
                                                {service.icon}
                                            </div>
                                            <CardTitle className="services-title text-xl font-semibold text-black dark:text-white mb-2">
                                                {service.title}
                                            </CardTitle>
                                            <CardDescription className="services-description text-base text-black dark:text-white leading-relaxed font-normal">
                                                {service.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="px-8 pb-8">
                                            <ul className="space-y-2 mb-8">
                                                {service.features.map((feature, featureIndex) => (
                                                    <li key={featureIndex} className="flex items-start gap-3">
                                                        <span className="w-1.5 h-1.5 bg-[var(--color-tech-accent-4)] rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="services-feature-text text-sm text-black dark:text-white leading-snug font-light">
                              {feature}
                            </span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="flex justify-start">
                                                <Link
                                                    href="/services"
                                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-transparent border border-[var(--color-border)] rounded-full transition-all duration-300 hover:border-[var(--color-tech-accent-4)] hover:text-[var(--color-tech-accent-4)] hover:bg-[color-mix(in_srgb,var(--color-tech-accent-4)_5%,transparent)]"
                                                >
                                                    Learn More
                                                    <ChevronRight className="w-4 h-4 transition-transform duration-300 hover:translate-x-0.5" />
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center items-center gap-6 mt-12">
                            <button
                                onClick={servicesCarousel.prevSlide}
                                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 shadow-apple hover:shadow-apple-hover"
                                aria-label="Previous service"
                            >
                                <ChevronLeft className="w-5 h-5 text-primary" />
                            </button>

                            <div className="flex gap-2">
                                {servicesData.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => servicesCarousel.scrollToIndex(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            index === servicesCarousel.currentIndex
                                                ? "bg-standout w-8"
                                                : "bg-primary/30 hover:bg-primary/50 w-2"
                                        }`}
                                        aria-label={`Go to service ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={servicesCarousel.nextSlide}
                                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 shadow-apple hover:shadow-apple-hover"
                                aria-label="Next service"
                            >
                                <ChevronRight className="w-5 h-5 text-primary" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <EmailSignup />

            <section className="py-20 md:py-32 lg:py-48 bg-section-muted text-section-muted-foreground">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold text-section-muted-foreground font-sans mb-8 md:mb-12 text-balance opacity-0 translate-y-8">
                            Our <span className="text-standout">4-Stage</span> Process
                        </h2>
                        <p className="scroll-animate text-base md:text-lg lg:text-xl text-section-muted-foreground/80 font-serif mb-8 md:mb-16 text-pretty leading-relaxed opacity-0 translate-y-8 animation-delay-300">
                            A proven methodology that ensures your project is delivered on time, on budget, and exceeds expectations.
                        </p>
                    </div>

                    <div className="hidden lg:block relative">
                        <div className="absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full"></div>

                        <div className="grid grid-cols-4 gap-10">
                            {[
                                {
                                    step: "01",
                                    icon: <Users className="h-8 w-8" />,
                                    title: "Discovery",
                                    description: "We dive deep into your business goals, target audience, and project requirements.",
                                },
                                {
                                    step: "02",
                                    icon: <Target className="h-8 w-8" />,
                                    title: "Strategy",
                                    description: "We create a comprehensive plan and wireframes that align with your objectives.",
                                },
                                {
                                    step: "03",
                                    icon: <Palette className="h-8 w-8" />,
                                    title: "Design",
                                    description: "We craft beautiful, user-centered designs that reflect your brand identity.",
                                },
                                {
                                    step: "04",
                                    icon: <Rocket className="h-8 w-8" />,
                                    title: "Launch",
                                    description: "We develop, test, and deploy your project with ongoing support and optimization.",
                                },
                            ].map((process, index) => (
                                <div
                                    key={index}
                                    className="text-center relative animate-fade-in-up group"
                                    style={{ animationDelay: `${index * 200}ms` }}
                                >
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-standout rounded-3xl flex items-center justify-center text-white mb-6 mx-auto relative z-10 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                        {process.icon}
                                    </div>
                                    <div className="text-sm font-bold text-section-muted-foreground font-sans mb-3">
                                        STEP {process.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-section-muted-foreground font-sans mb-4">{process.title}</h3>
                                    <p className="text-section-muted-foreground/80 font-serif text-pretty text-base leading-relaxed">
                                        {process.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:hidden">
                        <div className="flex justify-center mb-8">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                                {[1, 2, 3, 4].map((step, index) => (
                                    <div key={step} className="flex items-center">
                                        <button
                                            onClick={() => setActiveStep(index)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                                index === activeStep
                                                    ? "bg-primary text-white scale-110"
                                                    : "bg-white/20 text-section-muted-foreground hover:bg-white/30"
                                            }`}
                                        >
                                            {step}
                                        </button>
                                        {index < 3 && <div className="w-6 h-0.5 bg-white/30" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center mb-6">
                            <div className="w-72">
                                {[
                                    {
                                        step: "01",
                                        icon: <Users className="h-8 w-8" />,
                                        title: "Discovery",
                                        description:
                                            "We align on goals, audience, scope, and success metrics with short workshops and research sprints.",
                                        link: "What we deliver",
                                    },
                                    {
                                        step: "02",
                                        icon: <Target className="h-8 w-8" />,
                                        title: "Strategy",
                                        description:
                                            "Information architecture, user flows, and low-fi wireframes that map the shortest path to value.",
                                        link: "See approach",
                                    },
                                    {
                                        step: "03",
                                        icon: <Palette className="h-8 w-8" />,
                                        title: "Design",
                                        description:
                                            "We craft beautiful, user-centered designs that reflect your brand identity and convert visitors.",
                                        link: "View designs",
                                    },
                                    {
                                        step: "04",
                                        icon: <Rocket className="h-8 w-8" />,
                                        title: "Launch",
                                        description:
                                            "We develop, test, and deploy your project with ongoing support and optimization for success.",
                                        link: "Launch process",
                                    },
                                ].map((process, index) => (
                                    <div
                                        key={index}
                                        className={`transition-all duration-500 ${
                                            index === activeStep ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute"
                                        }`}
                                    >
                                        {index === activeStep && (
                                            <div className="bg-white rounded-2xl p-8 shadow-2xl min-h-[400px] flex flex-col">
                                                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                                    {process.icon}
                                                </div>

                                                <div className="text-sm font-bold text-primary font-sans mb-4 text-center">
                                                    STEP {process.step}
                                                </div>

                                                <h3 className="text-2xl font-bold text-gray-900 font-sans mb-4 text-center">{process.title}</h3>

                                                <p className="text-gray-600 font-serif text-sm leading-relaxed text-center mb-8 flex-grow">
                                                    {process.description}
                                                </p>

                                                <div className="text-center mt-auto">
                                                    <button className="text-primary font-medium text-sm hover:text-primary/80 transition-colors">
                                                        {process.link} →
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center gap-2">
                            {[0, 1, 2, 3].map((index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        index === activeStep ? "w-8 bg-primary" : "w-2 bg-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 lg:py-48 bg-section-white text-section-white-foreground">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-sans mb-6 text-balance opacity-0 translate-y-8">
                            Our Featured <span className="text-standout">Work</span>
                        </h2>
                        <p className="scroll-animate text-lg md:text-xl text-muted-foreground font-serif mb-12 max-w-3xl mx-auto text-pretty leading-relaxed opacity-0 translate-y-8 animation-delay-300">
                            A showcase of our recent projects that demonstrate our expertise in design and development. Each project
                            tells a story of transformation and measurable success.
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            {workCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveWorkCategory(category)}
                                    className={`work-nav-tab ${activeWorkCategory === category ? "active" : ""}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        {" "}
                        {/* Increased gap and margin for generous spacing */}
                        {filteredWorks.slice(0, 2).map((work, index) => (
                            <div
                                key={work.id}
                                className="featured-work-card"
                                style={{
                                    animationDelay: `${index * 200}ms`,
                                    animation: "fadeInScale 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                                    opacity: "0",
                                }} /* Added staggered fade-in animation */
                            >
                                <div className="aspect-video bg-muted overflow-hidden relative rounded-t-xl">
                                    {" "}
                                    {/* Added rounded corners to image container */}
                                    <img
                                        src={work.image || "/placeholder.svg"}
                                        alt={work.title}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" /* Slower, more dramatic hover scale */
                                    />
                                    <div className="absolute top-6 left-6">
                                        {" "}
                                        {/* Increased positioning for better spacing */}
                                        <span
                                            className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md"
                                            style={{
                                                background: "color-mix(in oklch, var(--color-standout) 70%, var(--color-muted))",
                                                color: "white",
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            }}
                                        >
                      {" "}
                                            {/* Pill-shaped category tag with calmer orange and Apple typography */}
                                            {work.category}
                    </span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    {" "}
                                    {/* Increased padding for generous spacing */}
                                    <div className="mb-6">
                                        {" "}
                                        {/* Increased margin */}
                                        <h3
                                            className="text-xl font-bold text-card-foreground mb-2"
                                            style={{
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
                                                fontWeight: "600",
                                                letterSpacing: "-0.01em",
                                            }}
                                        >
                                            {work.title}
                                        </h3>{" "}
                                        {/* Apple typography styling */}
                                        <p
                                            className="font-medium text-sm"
                                            style={{
                                                color: "color-mix(in oklch, var(--color-standout) 80%, var(--color-muted))",
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            }}
                                        >
                                            {work.company}
                                        </p>{" "}
                                        {/* Calmer orange for company name */}
                                    </div>
                                    <p
                                        className="text-muted-foreground text-base leading-relaxed mb-6"
                                        style={{
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        {work.description}
                                    </p>{" "}
                                    {/* Apple typography */}
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {" "}
                                        {/* Increased gaps and margin */}
                                        {work.tags.map((tag) => (
                                            <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        {" "}
                                        {/* Increased gap between buttons */}
                                        <Button
                                            asChild
                                            className="flex-1 h-12 rounded-full font-medium transition-all duration-300 hover:scale-105"
                                            style={{
                                                background: "color-mix(in oklch, var(--color-standout) 80%, var(--color-muted))",
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            }}
                                        >
                                            {" "}
                                            {/* Pill-shaped button with calmer orange and Apple styling */}
                                            <Link href={work.caseStudyUrl}>View Case Study</Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="h-12 rounded-full border-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-transparent"
                                            style={{
                                                borderColor: "color-mix(in oklch, var(--color-primary) 30%, transparent)",
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            }} /* Pill-shaped outline button with Apple styling */
                                        >
                                            <Link href={work.liveSiteUrl}>Live Site</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:hidden relative mb-16">
                        <div
                            ref={worksCarousel.scrollRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {filteredWorks.map((work, index) => (
                                <div key={work.id} className="featured-work-card flex-shrink-0 w-80 snap-center">
                                    <div className="aspect-video bg-muted overflow-hidden relative">
                                        <img
                                            src={work.image || "/placeholder.svg"}
                                            alt={work.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                      <span className="bg-standout text-white px-2 py-1 rounded text-sm font-medium">
                        {work.category}
                      </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h3 className="font-sans text-xl font-bold text-card-foreground mb-1">{work.title}</h3>
                                            <p className="text-standout font-medium text-sm">{work.company}</p>
                                        </div>

                                        <p className="font-serif text-muted-foreground text-base leading-relaxed mb-4">
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
                                            <Button asChild className="bg-standout hover:bg-standout/90 text-white flex-1">
                                                <Link href={work.caseStudyUrl}>View Case Study</Link>
                                            </Button>
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                                            >
                                                <Link href={work.liveSiteUrl}>Live Site</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                onClick={worksCarousel.prevSlide}
                                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                                aria-label="Previous work"
                            >
                                <ChevronLeft className="w-5 h-5 text-primary" />
                            </button>

                            <div className="flex gap-2">
                                {filteredWorks.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => worksCarousel.scrollToIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === worksCarousel.currentIndex ? "bg-standout w-6" : "bg-primary/30 hover:bg-primary/50"
                                        }`}
                                        aria-label={`Go to work ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={worksCarousel.nextSlide}
                                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                                aria-label="Next work"
                            >
                                <ChevronRight className="w-5 h-5 text-primary" />
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-16 animate-fade-in-up animation-delay-600">
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="font-serif font-semibold bg-transparent text-base px-8 py-4 hover:scale-105 transition-transform"
                        >
                            <Link href="/portfolio">
                                <span className="flex items-center">
                                  View All Projects <ArrowRight className="ml-2 h-5 w-5" />
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <FeaturedWork />

            <FAQSection />

            {/*/!* Testimonials section with carousel for all screen sizes *!/*/}
            {/*<section className="py-32 lg:py-48 bg-section-secondary text-section-secondary-foreground">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
            {/*        <div className="text-center mb-24">*/}
            {/*            <h2 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold text-section-secondary-foreground font-sans mb-12 text-balance opacity-0 translate-y-8">*/}
            {/*                What Our <span className="text-primary">Customers</span> Think*/}
            {/*            </h2>*/}
            {/*            <p className="scroll-animate text-lg md:text-xl text-muted-foreground font-serif max-w-3xl mx-auto text-pretty leading-relaxed opacity-0 translate-y-8 animation-delay-300">*/}
            {/*                Don't just take our word for it. Here's what our clients have to say about working with us.*/}
            {/*            </p>*/}
            {/*        </div>*/}

            {/*        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">*/}
            {/*            {testimonialsData.map((testimonial, index) => (*/}
            {/*                <Card*/}
            {/*                    key={index}*/}
            {/*                    className="bg-white border-border shadow-soft hover:shadow-2xl transition-all duration-500 animate-fade-in-up hover:scale-105"*/}
            {/*                    style={{ animationDelay: `${index * 150}ms` }}*/}
            {/*                >*/}
            {/*                    <CardContent className="pt-8">*/}
            {/*                        <div className="flex mb-6">*/}
            {/*                            {[...Array(testimonial.rating)].map((_, i) => (*/}
            {/*                                <Star key={i} className="h-5 w-5 fill-standout text-standout" />*/}
            {/*                            ))}*/}
            {/*                        </div>*/}
            {/*                        <blockquote className="text-foreground font-serif mb-8 text-pretty leading-relaxed text-base">*/}
            {/*                            "{testimonial.quote}"*/}
            {/*                        </blockquote>*/}
            {/*                        <div className="flex items-center gap-4">*/}
            {/*                            <div className="w-14 h-14 rounded-full overflow-hidden bg-secondary">*/}
            {/*                                <img*/}
            {/*                                    src={testimonial.avatar || "/placeholder.svg"}*/}
            {/*                                    alt={testimonial.author}*/}
            {/*                                    className="w-full h-full object-cover"*/}
            {/*                                />*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <div className="font-semibold text-foreground font-sans text-base">{testimonial.author}</div>*/}
            {/*                                <div className="text-muted-foreground font-serif text-sm">{testimonial.role}</div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </CardContent>*/}
            {/*                </Card>*/}
            {/*            ))}*/}
            {/*        </div>*/}

            {/*        <div className="lg:hidden relative">*/}
            {/*            <div*/}
            {/*                ref={testimonialsCarousel.scrollRef}*/}
            {/*                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"*/}
            {/*                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}*/}
            {/*            >*/}
            {/*                {testimonialsData.map((testimonial, index) => (*/}
            {/*                    <Card*/}
            {/*                        key={index}*/}
            {/*                        className="bg-white border-border shadow-soft hover:shadow-2xl transition-all duration-500 flex-shrink-0 w-80 snap-center"*/}
            {/*                    >*/}
            {/*                        <CardContent className="pt-8">*/}
            {/*                            <div className="flex mb-6">*/}
            {/*                                {[...Array(testimonial.rating)].map((_, i) => (*/}
            {/*                                    <Star key={i} className="h-5 w-5 fill-standout text-standout" />*/}
            {/*                                ))}*/}
            {/*                            </div>*/}
            {/*                            <blockquote className="text-foreground font-serif mb-8 text-pretty leading-relaxed text-base">*/}
            {/*                                "{testimonial.quote}"*/}
            {/*                            </blockquote>*/}
            {/*                            <div className="flex items-center gap-4">*/}
            {/*                                <div className="w-14 h-14 rounded-full overflow-hidden bg-secondary">*/}
            {/*                                    <img*/}
            {/*                                        src={testimonial.avatar || "/placeholder.svg"}*/}
            {/*                                        alt={testimonial.author}*/}
            {/*                                        className="w-full h-full object-cover"*/}
            {/*                                    />*/}
            {/*                                </div>*/}
            {/*                                <div>*/}
            {/*                                    <div className="font-semibold text-foreground font-sans text-base">{testimonial.author}</div>*/}
            {/*                                    <div className="text-muted-foreground font-serif text-sm">{testimonial.role}</div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </CardContent>*/}
            {/*                    </Card>*/}
            {/*                ))}*/}
            {/*            </div>*/}

            {/*            <div className="flex justify-center items-center gap-4 mt-8">*/}
            {/*                <button*/}
            {/*                    onClick={testimonialsCarousel.prevSlide}*/}
            {/*                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"*/}
            {/*                    aria-label="Previous testimonial"*/}
            {/*                >*/}
            {/*                    <ChevronLeft className="w-5 h-5 text-primary" />*/}
            {/*                </button>*/}

            {/*                <div className="flex gap-2">*/}
            {/*                    {testimonialsData.map((_, index) => (*/}
            {/*                        <button*/}
            {/*                            key={index}*/}
            {/*                            onClick={() => testimonialsCarousel.scrollToIndex(index)}*/}
            {/*                            className={`w-2 h-2 rounded-full transition-all duration-300 ${*/}
            {/*                                index === testimonialsCarousel.currentIndex*/}
            {/*                                    ? "bg-standout w-6"*/}
            {/*                                    : "bg-primary/30 hover:bg-primary/50"*/}
            {/*                            }`}*/}
            {/*                            aria-label={`Go to testimonial ${index + 1}`}*/}
            {/*                        />*/}
            {/*                    ))}*/}
            {/*                </div>*/}

            {/*                <button*/}
            {/*                    onClick={testimonialsCarousel.nextSlide}*/}
            {/*                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"*/}
            {/*                    aria-label="Next testimonial"*/}
            {/*                >*/}
            {/*                    <ChevronRight className="w-5 h-5 text-primary" />*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/*/!* CTA section with enhanced styling *!/*/}
            {/*<section className="py-32 lg:py-48 bg-gradient-to-br from-primary via-accent to-standout text-white relative overflow-hidden">*/}
            {/*    <div className="absolute inset-0 bg-black/20 parallax-bg"></div>*/}
            {/*    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">*/}
            {/*        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 md:p-20 border border-white/20 shadow-2xl animate-fade-in-up">*/}
            {/*            <h2 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-sans mb-12 text-balance opacity-0 translate-y-8">*/}
            {/*                Ready to Start Your <span className="text-standout">Project?</span>*/}
            {/*            </h2>*/}
            {/*            <p className="scroll-animate text-lg md:text-xl text-muted-foreground font-serif mb-16 text-pretty leading-relaxed opacity-0 translate-y-8 animation-delay-300">*/}
            {/*                Let's discuss how we can help bring your vision to life. Get in touch for a free consultation and project*/}
            {/*                quote.*/}
            {/*            </p>*/}
            {/*            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">*/}
            {/*                <GetStartedButton*/}
            {/*                    size="lg"*/}
            {/*                    className="font-serif font-semibold text-base px-8 py-4 hover:scale-105 transition-transform"*/}
            {/*                />*/}
            {/*                <Button*/}
            {/*                    asChild*/}
            {/*                    variant="outline"*/}
            {/*                    size="lg"*/}
            {/*                    className="font-serif font-semibold bg-white/50 hover:bg-white text-base px-8 py-4 hover:scale-105 transition-transform"*/}
            {/*                >*/}
            {/*                    <Link href="/about">Learn More About Us</Link>*/}
            {/*                </Button>*/}
            {/*            </div>*/}

            {/*            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/30">*/}
            {/*                <div className="flex items-center justify-center gap-3 text-muted-foreground group hover:text-standout transition-colors">*/}
            {/*                    <Clock className="w-6 h-6 text-standout group-hover:scale-110 transition-transform" />*/}
            {/*                    <span className="font-serif text-base">Free Consultation</span>*/}
            {/*                </div>*/}
            {/*                <div className="flex items-center justify-center gap-3 text-muted-foreground group hover:text-standout transition-colors">*/}
            {/*                    <Award className="w-6 h-6 text-standout group-hover:scale-110 transition-transform" />*/}
            {/*                    <span className="font-serif text-base">Award-Winning Team</span>*/}
            {/*                </div>*/}
            {/*                <div className="flex items-center justify-center gap-3 text-muted-foreground group hover:text-standout transition-colors">*/}
            {/*                    <TrendingUp className="w-6 h-6 text-standout group-hover:scale-110 transition-transform" />*/}
            {/*                    <span className="font-serif text-base">Proven Results</span>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/*<section className="py-20 lg:py-28 bg-section-white text-section-white-foreground relative overflow-hidden">*/}
            {/*    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">*/}
            {/*        <div className="text-center mb-16 lg:mb-20">*/}
            {/*            <p className="scroll-animate text-xs uppercase tracking-[0.2em] font-medium mb-6 text-muted-foreground opacity-0 translate-y-4 transition-all duration-500">*/}
            {/*                Technologies & Expertise*/}
            {/*            </p>*/}
            {/*            <h3 className="scroll-animate text-5xl lg:text-6xl font-bold font-sans mb-8 opacity-0 translate-y-6 animation-delay-200">*/}
            {/*            <span className="text-foreground">*/}
            {/*                Modern Tech{" "}*/}
            {/*                <span className="text-[var(--color-tech-accent-2)] font-bold">Stack</span>*/}
            {/*            </span>*/}
            {/*            </h3>*/}
            {/*            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">*/}
            {/*                Cutting-edge technologies that power exceptional digital experiences*/}
            {/*            </p>*/}
            {/*        </div>*/}

            {/*        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">*/}
            {/*            {[*/}
            {/*                {*/}
            {/*                    name: "React",*/}
            {/*                    icon: (*/}
            {/*                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">*/}
            {/*                            <circle cx="12" cy="12" r="3" />*/}
            {/*                            <path d="M12 1a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />*/}
            {/*                            <path d="M2 12h20" />*/}
            {/*                        </svg>*/}
            {/*                    ),*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "Next.js",*/}
            {/*                    icon: (*/}
            {/*                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">*/}
            {/*                            <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.747 0-.893-.012-1.088-.108-1.747C19.146 4.318 16.956 1.669 13.94.394 13.114.134 12.208.026 11.572 0z" />*/}
            {/*                        </svg>*/}
            {/*                    ),*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "Tailwind",*/}
            {/*                    icon: (*/}
            {/*                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">*/}
            {/*                            <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />*/}
            {/*                        </svg>*/}
            {/*                    ),*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "Node.js",*/}
            {/*                    icon: (*/}
            {/*                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">*/}
            {/*                            <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.47 1.27.47 1.71.47.85 0 1.32-.52 1.32-1.42V9.47c0-.13-.11-.24-.24-.24H7.5c-.13 0-.24.11-.24.24v7.4c0 .45-.23.58-.6.58-.37 0-.6-.13-.6-.58V9.47c0-.72.4-1.39 1.05-1.75l7.44-4.3c.48-.28 1.08-.28 1.56 0l7.44 4.3c.48.28.78.8.78 1.36v8.58c0 .56-.3 1.08-.78 1.36l-7.44 4.3c-.24.13-.51.2-.78.2z" />*/}
            {/*                        </svg>*/}
            {/*                    ),*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "Python",*/}
            {/*                    icon: (*/}
            {/*                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">*/}
            {/*                            <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.13-.64-.09-.71-.07-.77-.04-.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />*/}
            {/*                        </svg>*/}
            {/*                    ),*/}
            {/*                },*/}
            {/*            ].map((tech, i) => (*/}
            {/*                <div key={i} className="group animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>*/}
            {/*                    <div className="flex items-center gap-3 h-14 px-6 bg-card text-card-foreground border border-border rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-muted hover:text-muted-foreground">*/}
            {/*                        <div className="text-muted-foreground group-hover:text-primary transition-colors duration-200">*/}
            {/*                            {tech.icon}*/}
            {/*                        </div>*/}
            {/*                        <span className="text-sm font-medium">{tech.name}</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <Footer />

            <GetStartedButton variant="sticky" />
        </div>
    )
}
