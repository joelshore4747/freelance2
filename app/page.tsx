"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GetStartedButton } from "@/components/get-started-button"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
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
import dynamic from "next/dynamic"
const EmailSignup = dynamic(() => import("@/components/email-signup").then((m) => m.EmailSignup), {
  ssr: false,
  loading: () => null,
})
import OptimizedImage from "@/components/ui/optimized-image"
import heroImg from "@/public/modern-ecommerce-interface.png"
const FAQSection = dynamic(() => import("@/components/faq-section"), {
  ssr: true,
  loading: () => null,
})

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
    const nextIndex = (currentIndex + 1) % itemsLength
    scrollToIndex(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? itemsLength - 1 : currentIndex - 1
    scrollToIndex(prevIndex)
  }

  return { currentIndex, scrollRef, scrollToIndex, nextSlide, prevSlide }
}

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-scroll-fade-up")
            if (entry.target.classList.contains("parallax-element")) {
              entry.target.classList.add("animate-parallax-reveal")
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px",
      },
    )

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observer.observe(el))

    // rAF-throttled scroll handler with passive listener to avoid jank
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset
        const parallaxElements = document.querySelectorAll<HTMLElement>(".parallax-bg")
        parallaxElements.forEach((element) => {
          const speed = 0.5
          const yPos = -(scrolled * speed)
          element.style.transform = `translateY(${yPos}px)`
        })
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll as EventListener)
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
      image: "/data-analytics-dashboard.png",
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
      image: "/data-analytics-dashboard.png",
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
      image: "/data-analytics-dashboard.png",
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
      image: "/marketing-analytics-dashboard-dark-theme.png",
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

  const [activeStep, setActiveStep] = useState(0)

  // Featured work filtering first, so the mobile carousel can use the right length
  const [activeWorkCategory, setActiveWorkCategory] = useState("All")
  const workCategories = ["All", "E-commerce", "SaaS", "Corporate", "Mobile App"]

  const filteredWorks =
    activeWorkCategory === "All"
      ? featuredWorksData
      : featuredWorksData.filter((work) => work.category === activeWorkCategory)

  const servicesCarousel = useCarousel(servicesData.length)
  const worksCarousel = useCarousel(filteredWorks.length)
  const testimonialsCarousel = useCarousel(testimonialsData.length)
  // === FEATURED WORK: refs, state, effects (ADD) ===
  const fwRailRef = useRef<HTMLDivElement | null>(null)
  const fwContainerRef = useRef<HTMLDivElement | null>(null) // aligns with nav/container
  const [fwActive, setFwActive] = useState(0)
  const fwGap = 32 // gap-8 on the rail
  const fwCardW = useRef(0) // measured card width (px)
  const fwPadRef = useRef(0) // measured left/right padding applied to rail

  // Measure card width, align the rail padding to container's left, and start at first card
  useEffect(() => {
    const railEl = fwRailRef.current as HTMLElement | null
    const containerEl = fwContainerRef.current as HTMLElement | null
    if (!railEl || !containerEl) return

    const measure = () => {
      const vw = window.innerWidth

      // Thin/wide look like Apple; tweak numbers if you want different scale
      // Make cards slightly larger and closer to About/Portfolio proportions
      const w = Math.round(Math.min(1000, Math.max(680, vw * 0.44)))
      fwCardW.current = w
      railEl.style.setProperty("--fw-card-w", `${w}px`)

      // Align to the SAME left edge as the container (and therefore the nav)
      const railLeft = railEl.getBoundingClientRect().left
      const containerLeft = containerEl.getBoundingClientRect().left
      const leftPad = Math.max(0, Math.round(containerLeft - railLeft))

      railEl.style.paddingLeft = `${leftPad}px`
      railEl.style.paddingRight = `${leftPad}px`
      railEl.style.scrollPaddingLeft = `${leftPad}px`
      railEl.style.scrollPaddingRight = `${leftPad}px`
      fwPadRef.current = leftPad

      // land on the first card each time we re-measure
      railEl.scrollLeft = 0
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.documentElement)
    return () => ro.disconnect()
  }, [filteredWorks.length])

  // Update active index while scrolling (for dots)
  useEffect(() => {
    const railEl = fwRailRef.current
    if (!railEl) return

    const onScroll = () => {
      const w = fwCardW.current || 800
      const pad = fwPadRef.current || 0
      // Use viewport center relative to first card center for stable indexing
      const centerX = railEl.scrollLeft + railEl.clientWidth / 2
      const firstCenter = pad + w / 2
      let idx = Math.round((centerX - firstCenter) / (w + fwGap))

      // Edge guards: snap to 0 or last when at ends
      const maxLeft = Math.max(0, railEl.scrollWidth - railEl.clientWidth)
      const atStart = railEl.scrollLeft <= 1
      const atEnd = Math.abs(maxLeft - railEl.scrollLeft) <= 1
      if (atStart) idx = 0
      if (atEnd) idx = filteredWorks.length - 1

      setFwActive(Math.max(0, Math.min(idx, filteredWorks.length - 1)))
    }

    railEl.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => railEl.removeEventListener("scroll", onScroll)
  }, [filteredWorks.length])

  // Programmatic scroll (arrows / dots)
  const fwScrollTo = (i: number) => {
    const railEl = fwRailRef.current
    if (!railEl) return
    const w = fwCardW.current || 800
    const pad = fwPadRef.current || 0
    // Scroll so that slide i is centered; clamp within scroll range
    const targetCenter = pad + i * (w + fwGap) + w / 2
    const left = targetCenter - railEl.clientWidth / 2
    const maxLeft = Math.max(0, railEl.scrollWidth - railEl.clientWidth)
    railEl.scrollTo({ left: Math.max(0, Math.min(left, maxLeft)), behavior: "smooth" })
  }

  const fwPrev = () => fwScrollTo(Math.max(0, fwActive - 1))
  const fwNext = () => fwScrollTo(Math.min(filteredWorks.length - 1, fwActive + 1))

  // Recenter when switching category tabs (and nudge mobile carousel to first too)
  useEffect(() => {
    setFwActive(0)
    const id = requestAnimationFrame(() => fwScrollTo(0))
    const id2 = requestAnimationFrame(() => {
      try {
        worksCarousel.scrollToIndex(0)
      } catch {}
    })
    return () => {
      cancelAnimationFrame(id)
      cancelAnimationFrame(id2)
    }
  }, [activeWorkCategory])
  // === /FEATURED WORK additions ===

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-48 overflow-hidden bg-section-white text-section-white-foreground">
          <div
              className="absolute -inset-8 md:-inset-12 pointer-events-none hero-animated-bg"
              style={{
                  // Primary → Standout, angled from top-left to bottom-right
                  backgroundImage:
                      'linear-gradient(45deg,' +
                      'color-mix(in oklch, var(--primary)20%, transparent),' +
                      'color-mix(in oklch, var(--standout) 20%, transparent))',
                  backgroundSize: '180% 180%',     // enlarged so the drift is visible
                  backgroundPosition: '12% 12%',   // start near the corner
                  animation: 'bg-drift 20s ease-in-out infinite',
                  opacity: 0.85,                   // keeps it subtle without washing colors out
                  willChange: 'background-position'
              }}
          />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          {/* Mobile */}
          <div className="lg:hidden">
            <div className="mb-6">
              <Badge variant="secondary" className="font-serif text-sm px-3 py-1">
                ✨ Freelance Design & Development Studio
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground font-sans mb-6 text-balance leading-tight">
              We Build Digital Experiences That <span className="text-standout font-bold">Convert & Inspire</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-serif mb-8 text-pretty leading-relaxed">
              A two-person studio crafting websites, automations, and AI assistants that ship fast and move metrics.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {["✓ Conversion-first", "✓ Automations", "✓ AI chatbots", "✓ SEO-friendly"].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-m text-muted-foreground font-black ">
                  <span className="text-green-500 font-medium">{feature.split(" ")[0]}</span>
                  <span>{feature.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </div>

            <div className="relative mb-8">
              <div className="bg-gray-900 rounded-2xl p-4 shadow-2xl">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-700 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-standout text-standout-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                🏆 Award Winning Design
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <GetStartedButton size="lg" className="w-full font-serif font-semibold text-base px-8 py-4 mb-4" />

              <Link
                href="/portfolio"
                prefetch={false}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full font-serif font-semibold bg-transparent text-base px-8 py-4 inline-flex items-center justify-center",
                )}
              >
                View Our Work
              </Link>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Trusted by founders at</p>
              <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                <span>Nova</span>
                <span>Aether</span>
                <span>Fabric</span>
              </div>
            </div>
          </div>

          {/* Desktop */}
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

                <Link
                  href="/portfolio"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "font-serif font-semibold bg-transparent text-base px-8 py-4 hover:scale-105 transition-transform inline-flex items-center justify-center",
                  )}
                >
                  View Our Work
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in-right parallax-element">
              <div className="relative bg-card rounded-3xl p-6 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-float">
                <OptimizedImage
                  src={heroImg}
                  alt="Modern web interface"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  priority
                  sizes="(max-width: 1024px) 100vw, 640px"
                />
                <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-standout text-standout-foreground px-4 py-2 lg:px-6 lg:py-3 rounded-2xl font-semibold shadow-lg text-xs lg:text-sm animate-bounce-in">
                  Award Winning Design
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*/!* Proven Points *!/*/}
      {/*<section className="py-20 lg:py-28 bg-section-muted text-section-muted-foreground relative overflow-hidden">*/}
      {/*    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">*/}
      {/*        <div className="text-center mb-16 lg:mb-20">*/}
      {/*            <p className="scroll-animate text-xs uppercase tracking-[0.2em] font-medium mb-6 text-muted-foreground opacity-0 translate-y-4 transition-all duration-500">*/}
      {/*                Why Choose Us*/}
      {/*            </p>*/}
      {/*            <h3 className="scroll-animate text-5xl lg:text-6xl font-bold font-sans mb-8 opacity-0 translate-y-6 animation-delay-200">*/}
      {/*  <span className="text-foreground">*/}
      {/*    Proven{" "}*/}
      {/*      <span className="bg-gradient-to-r from-[var(--color-tech-accent-1)] to-[var(--color-tech-accent-2)] bg-clip-text text-transparent font-bold">*/}
      {/*      Points*/}
      {/*    </span>*/}
      {/*  </span>*/}
      {/*            </h3>*/}
      {/*            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">*/}
      {/*                Delivering exceptional outcomes through expertise and dedication*/}
      {/*            </p>*/}
      {/*        </div>*/}

      {/*        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">*/}
      {/*            {[*/}
      {/*                {*/}
      {/*                    title: "Answer in 48 Hours",*/}
      {/*                    description: "Fast responses keep your project moving.",*/}
      {/*                    icon: (*/}
      {/*                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">*/}
      {/*                            <circle cx="12" cy="12" r="10" />*/}
      {/*                            <polyline points="12,6 12,12 16,14" />*/}
      {/*                        </svg>*/}
      {/*                    ),*/}
      {/*                },*/}
      {/*                {*/}
      {/*                    title: "5+ Years Experience",*/}
      {/*                    description: "Depth across modern web technologies.",*/}
      {/*                    icon: (*/}
      {/*                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">*/}
      {/*                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />*/}
      {/*                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />*/}
      {/*                            <path d="M4 22h16" />*/}
      {/*                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />*/}
      {/*                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />*/}
      {/*                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />*/}
      {/*                        </svg>*/}
      {/*                    ),*/}
      {/*                },*/}
      {/*                {*/}
      {/*                    title: "100% Project Success",*/}
      {/*                    description: "Delivered on time and to specification.",*/}
      {/*                    icon: (*/}
      {/*                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">*/}
      {/*                            <path d="M9 12l2 2 4-4" />*/}
      {/*                            <circle cx="12" cy="12" r="10" />*/}
      {/*                        </svg>*/}
      {/*                    ),*/}
      {/*                },*/}
      {/*            ].map((result, index) => (*/}
      {/*                <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>*/}
      {/*                    <div className="bg-card text-card-foreground border border-border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">*/}
      {/*                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors duration-300">*/}
      {/*                            <div className="text-green-600 dark:text-green-400">{result.icon}</div>*/}
      {/*                        </div>*/}

      {/*                        <h4 className="text-xl font-bold mb-3 leading-tight">{result.title}</h4>*/}

      {/*                        <p className="text-muted-foreground leading-relaxed">{result.description}</p>*/}
      {/*                    </div>*/}
      {/*                </div>*/}
      {/*            ))}*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</section>*/}

      {/* Services */}
      <section className="py-10 lg:py-28 bg-section-muted text-section-white-foreground cv-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-left lg:text-center mb-20">
            <h2 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-sans mb-1 lg:mb-8 text-balance opacity-0 translate-y-8 tracking-tight">
              What We Do <span className="text-standout">Best</span>
            </h2>
            <p className="scroll-animate text-xl md:text-2xl text-muted-foreground font-serif max-w-4xl mx-auto lg:mx-auto md:mx-0 text-pretty leading-relaxed opacity-0 translate-y-8 animation-delay-300 font-light">
              From concept to launch, we handle every aspect of your digital presence with expertise and attention to
              detail.
            </p>
          </div>
          {/* Desktop grid */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <Card className="services-card-apple h-full transition-all duration-300 border-[1.5px] border-[var(--color-tech-accent-1)] dark:border-[var(--color-tech-accent-1)] bg-card dark:bg-card rounded-[var(--radius-lg)] overflow-hidden group-hover:border-[var(--color-tech-accent-4)] group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:bg-[color-mix(in_srgb,var(--color-section-muted)_6%,var(--color-card))]">
                  <CardHeader className="pb-2 pt-2 px-8">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 text-[var(--color-tech-accent-1)] bg-blue-50 dark:bg-blue-950/30 group-hover:text-[var(--color-tech-accent-4)] group-hover:bg-orange-50 dark:group-hover:bg-orange-950/30 group-hover:shadow-sm">
                      {service.icon}
                    </div>
                    <CardTitle className="services-title text-xl font-semibold text-foreground mb-2 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="services-description text-base text-foreground leading-relaxed font-normal">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-2">
                    <ul className="space-y-2 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-[var(--color-tech-accent-4)] rounded-full mt-2 flex-shrink-0"></span>
                          <span className="services-feature-text text-sm text-foreground leading-snug font-light">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-start">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-transparent border border-[var(--color-border)] rounded-full transition-all duration-300 hover:border-[var(--color-tech-accent-4)] hover:text-[var(--color-tech-accent-4)] hover:bg-[color-mix(in_srgb,var(--color-tech-accent-4)_5%,transparent)] group-hover:border-[var(--color-tech-accent-4)] group-hover:text-[var(--color-tech-accent-4)]"
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

          {/* Mobile carousel */}
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
                      <CardTitle className="services-title text-xl font-semibold text-foreground mb-2">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="services-description text-base text-foreground leading-relaxed font-normal">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <ul className="space-y-2 mb-8">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-[var(--color-tech-accent-4)] rounded-full mt-2 flex-shrink-0"></span>
                            <span className="services-feature-text text-sm text-foreground leading-snug font-light">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex justify-start">
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-transparent border border-[var(--color-border)] rounded-full transition-all duration-300 hover:border-[var(--color-tech-accent-4)] hover:text-[var(--color-tech-accent-4)] hover:bg-[color-mix(in_srgb,var(--color-tech-accent-4)_5%,transparent)]"
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
                    className={`h-2 rounded-full transition-all duration-300 ${index === servicesCarousel.currentIndex ? "bg-standout w-8" : "bg-primary/30 hover:bg-primary/50 w-2"}`}
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

      {/* Process */}
      <section className="pt-4 md:pt-6 lg:pt-8 pb-20 md:pb-32 lg:pb-48 bg-section-muted text-section-muted-foreground cv-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-left lg:text-center mb-16 md:mb-24">
            <h2 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold text-section-muted-foreground font-sans mb-2our lg:mb-12 text-balance opacity-0 translate-y-8">
              Our <span className="text-standout">4-Stage</span> Process
            </h2>
            <p className="scroll-animate text-xl md:text-2xl lg:text-2xl text-muted-foreground/80 text-section-muted-foreground/80 font-serif mb-8 md:mb-16 text-pretty leading-relaxed opacity-0 translate-y-8 animation-delay-300">
              A proven methodology that ensures your project is delivered on time, on budget, and exceeds expectations.
            </p>
          </div>

          {/* Desktop timeline */}
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

          {/* Mobile steps */}
          <div className="lg:hidden">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                {[1, 2, 3, 4].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <button
                      onClick={() => setActiveStep(index)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${index === activeStep ? "bg-primary text-white scale-110" : "bg-white/20 text-section-muted-foreground hover:bg-white/30"}`}
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
                    className={`transition-all duration-500 ${index === activeStep ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute"}`}
                  >
                    {index === activeStep && (
                      <div className="bg-card rounded-2xl p-8 shadow-2xl min-h-[400px] flex flex-col">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                          {process.icon}
                        </div>
                        <div className="text-sm font-bold text-primary font-sans mb-4 text-center">
                          STEP {process.step}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground font-sans mb-4 text-center">
                          {process.title}
                        </h3>
                        <p className="text-muted-foreground font-serif text-sm leading-relaxed text-center mb-8 flex-grow">
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
                  className={`h-2 rounded-full transition-all duration-300 ${index === activeStep ? "w-8 bg-primary" : "w-2 bg-border"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

        {/* === FEATURED WORK — clean, compact, CTA bottom-right === */}
        <section className="relative isolate overflow-hidden py-28 lg:py-40 bg-section-white text-section-white-foreground cv-auto">
            {/* Subtle animated backdrop */}
            <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-standout/15
           [background-size:200%_200%] [animation:bg-pan_18s_ease-in-out_infinite]"
            />

            {/* Header container (aligns to nav/container) */}
            <div ref={fwContainerRef} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
                <div className="text-left lg:text-center mb-12 lg:mb-14">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-sans mb-2 lg:mb-4">
                        Our Featured <span className="text-standout">Work</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground font-serif mb-8 lg:mb-10 max-w-3xl lg:mx-auto leading-relaxed">
                        A showcase of recent projects that ship fast and move metrics.
                    </p>

                    {/* Category pills (larger, but subtle) */}
                    <div className="flex flex-wrap justify-center gap-2.5">
                        {workCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveWorkCategory(category)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all border-2 border-transparent",
                                    activeWorkCategory === category
                                        ? "featured-pill-active"
                                        : "border-border text-foreground hover:text-foreground hover:border-border dark:border-white/20 dark:text-white/80 dark:hover:text-white dark:hover:border-white/40"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* DESKTOP rail (left padding aligned to container) */}
            <div className="hidden lg:block relative">
                <div className="-mx-4 sm:-mx-6 lg:-mx-8 relative">
                    <div
                        ref={fwRailRef}
                        className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-0"
                        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" as any }}
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Featured work"
                    >
                        {filteredWorks.map((work) => (
                            <article
                                key={work.id}
                                className="featured-work-card relative snap-center flex-shrink-0 rounded-2xl overflow-hidden
                       bg-card/80 ring-1 ring-white/10 shadow-md hover:shadow-lg transition-all"
                                style={{ width: "var(--fw-card-w)" }}
                            >
                                {/* Media — shorter height */}
                                <div className="relative" style={{ aspectRatio: "16/7" }}>
                                    <OptimizedImage
                                        src={work.image || "/placeholder.svg"}
                                        alt={work.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 900px"
                                    />
                                    <span className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur bg-standout/75 text-white">
                {work.category}
              </span>
                                </div>

                                {/* Text — tighter spacing, added bottom padding for CTA */}
                                <div className="p-6 md:p-8 pb-20">
                                    <h3 className="text-[clamp(1.4rem,1vw+1rem,1.9rem)] font-bold text-card-foreground mb-2">
                                        {work.title}
                                    </h3>
                                    <p className="text-standout font-semibold text-[clamp(0.95rem,0.45vw+0.9rem,1.1rem)] mb-3">
                                        {work.company}
                                    </p>
                                    <p className="text-muted-foreground text-[clamp(1rem,0.6vw+0.95rem,1.15rem)] leading-relaxed mb-5">
                                        {work.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2.5">
                                        {work.tags.map((tag: string) => (
                                            <span key={tag} className="tech-tag text-[clamp(0.9rem,0.35vw+0.85rem,1rem)]">
                    {tag}
                  </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA — thin, bottom-right */}
                                <Link
                                    href={work.caseStudyUrl}
                                    className={cn(
                                        buttonVariants({ variant: "default", size: "sm" }),
                                        "h-10 px-5 text-sm rounded-full font-semibold absolute bottom-5 right-5"
                                    )}
                                >
                                    View Case Study
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Controls — match Portfolio page style */}
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                      onClick={fwPrev}
                      disabled={fwActive === 0}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {filteredWorks.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => fwScrollTo(i)}
                          aria-label={`Go to slide ${i + 1}`}
                          className={cn(
                            "h-2 rounded-full transition-all",
                            i === fwActive ? "w-8 bg-standout" : "w-2 bg-border hover:bg-standout/50",
                          )}
                        />
                      ))}
                    </div>

                    <button
                      onClick={fwNext}
                      disabled={fwActive === filteredWorks.length - 1}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
            </div>

            {/* MOBILE rail — compact, same CTA treatment */}
            <div className="lg:hidden relative mt-10">
                <div
                    ref={worksCarousel.scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 px-4"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Featured work"
                >
                    {filteredWorks.map((work) => (
                        <div
                            key={work.id}
                            className="featured-work-card relative flex-shrink-0 w-[21.5rem] snap-center rounded-2xl overflow-hidden
                     bg-card/80 ring-1 ring-white/10 shadow-md"
                        >
                            <div className="relative" style={{ aspectRatio: "16/7" }}>
                                <OptimizedImage
                                    src={work.image || "/placeholder.svg"}
                                    alt={work.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 90vw, 700px"
                                />
                                <span className="absolute top-3 left-3 bg-standout text-white px-2.5 py-1.5 rounded text-[11px] font-semibold">
              {work.category}
            </span>
                            </div>

                            <div className="p-5 pb-16">
                                <h3 className="text-[1.35rem] font-bold text-card-foreground mb-1.5">{work.title}</h3>
                                <p className="text-standout font-semibold text-[0.95rem] mb-2.5">{work.company}</p>
                                <p className="text-muted-foreground text-[1rem] leading-relaxed mb-4">{work.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {work.tags.map((tag) => (
                                        <span key={tag} className="tech-tag text-[0.95rem]">
                  {tag}
                </span>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href={work.caseStudyUrl}
                                className={cn(
                                    buttonVariants({ variant: "default", size: "sm" }),
                                    "h-10 px-5 text-sm rounded-full font-semibold absolute bottom-4 right-4"
                                )}
                            >
                                View Case Study
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Mobile dots + arrows — match style */}
                <div className="flex justify-center items-center gap-4 mt-5">
                  <button
                    onClick={worksCarousel.prevSlide}
                    disabled={worksCarousel.currentIndex === 0}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous work"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    {filteredWorks.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => worksCarousel.scrollToIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === worksCarousel.currentIndex ? "w-8 bg-standout" : "w-2 bg-border hover:bg-standout/50"
                        }`}
                        aria-label={`Go to work ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={worksCarousel.nextSlide}
                    disabled={worksCarousel.currentIndex === filteredWorks.length - 1}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Next work"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
            </div>

            {/* View all — subtle, on-brand */}
            <div className="text-center mt-14">
                <Link
                    href="/portfolio"
                    prefetch={false}
                    className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "h-12 px-8 rounded-full text-base font-semibold border-[1.5px]",
                        "bg-primary/10 text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                    )}
                >
      <span className="flex items-center">
        View All Projects <ArrowRight className="ml-2.5 h-5 w-5" />
      </span>
                </Link>
            </div>
        </section>

      <FAQSection />

      <EmailSignup />

      <Footer />

      {/* Sticky CTA (local, safe) */}
      <Link
        href="/get-started"
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "fixed bottom-4 right-4 z-50 rounded-full shadow-lg",
        )}
      >
        Get started
      </Link>
    </div>
  )
}
