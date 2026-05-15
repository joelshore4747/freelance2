"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CornerVideoPlayer } from "@/components/corner-video-player"
import OptimizedImage from "@/components/ui/optimized-image"
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Film,
  Handshake,
  Layers,
  Orbit,
  PenTool,
  Play,
  Rocket,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react"

function useHorizontalCarousel(itemsLength: number) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (scrollRef.current && itemsLength > 0) {
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
    if (itemsLength === 0) return
    const nextIndex = (currentIndex + 1) % itemsLength
    scrollToIndex(nextIndex)
  }

  const prevSlide = () => {
    if (itemsLength === 0) return
    const prevIndex = currentIndex === 0 ? itemsLength - 1 : currentIndex - 1
    scrollToIndex(prevIndex)
  }

  return { currentIndex, scrollRef, scrollToIndex, nextSlide, prevSlide }
}

const heroStats = [
  { label: "Automation hours saved", value: "30k+", icon: Rocket },
  { label: "Web builds shipped", value: "90+", icon: Code2 },
  { label: "Avg ROI in year one", value: "4.1x", icon: TrendingUp },
  { label: "Active systems maintained", value: "70", icon: Handshake },
]

const showreelHighlights = [
  {
    title: "Automation that sticks",
    description: "Revenue, support, and ops flows with audits, alerts, and human-in-the-loop controls.",
    icon: Layers,
  },
  {
    title: "Websites that convert",
    description: "Clear offers, fast pages, and analytics wired in so you see what is working every week.",
    icon: ShoppingBag,
  },
  {
    title: "Systems people use",
    description: "Dashboards, CRMs, and portals that keep data legible and actions obvious.",
    icon: Orbit,
  },
  {
    title: "One accountable partner",
    description: "I own strategy, design, and build so nothing gets lost between handoffs.",
    icon: Handshake,
  },
]

const focusAreas = [
  {
    title: "Automation & ops",
    description: "Back-office and revenue automations with clear ownership and reporting.",
    icon: Rocket,
    points: [
      "Lead routing, enrichment, and follow-up cadences",
      "Support triage, SLA alerts, and knowledge automation",
      "Finance + inventory syncs with human approvals",
    ],
  },
  {
    title: "Conversion websites",
    description: "High-converting marketing and product sites tuned for clarity, speed, and SEO.",
    icon: ShoppingBag,
    points: [
      "Messaging, offer clarity, and funnel design",
      "Headless builds with analytics and experimentation",
      "Speed, accessibility, and content workflows",
    ],
  },
  {
    title: "Business systems",
    description: "Custom portals, dashboards, and CRMs that align teams and make data usable.",
    icon: Layers,
    points: [
      "Role-based portals for customers or partners",
      "Operational dashboards with actionable metrics",
      "Secure integrations across your existing stack",
    ],
  },
]

const processSteps = [
  {
    title: "Discovery + audit",
    description: "Understand current tools, manual steps, and where automation helps fastest.",
    detail: "System audit, metric targets, risk checks",
    icon: Search,
  },
  {
    title: "Plan the flows",
    description: "Map user journeys, data contracts, and approvals so automation and UI stay aligned.",
    detail: "Flow mapping, UX wireframes, acceptance criteria",
    icon: PenTool,
  },
  {
    title: "Build + integrate",
    description: "Ship production-ready web experiences and automations with monitoring and tests.",
    detail: "Next.js, Node, Zapier/Make, API integrations",
    icon: Code2,
  },
  {
    title: "Launch + iterate",
    description: "Measure usage, tighten edge cases, and leave you with clear runbooks.",
    detail: "Instrumentation, training, iteration sprints",
    icon: Rocket,
  },
]

const toolkit = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "React Native",
  "Tailwind",
  "Prisma",
  "PostgreSQL",
  "Supabase",
  "Stripe",
  "Clerk / Auth0",
  "Zapier",
  "n8n",
  "Make",
  "HubSpot",
  "Figma",
  "AWS",
  "Vercel",
]

const projects = [
  {
    id: "rev-ops",
    title: "RevOps Automation Mesh",
    category: "Automation",
    summary: "Lead routing, enrichment, and contract workflows that update CRM, billing, and Slack in minutes.",
    image: "/modern-saas-dashboard-with-dark-blue-and-orange-ge.jpg",
    metrics: [
      { label: "Response time", value: "2m" },
      { label: "Pipeline coverage", value: "3.8x" },
      { label: "Manual steps", value: "-70%" },
    ],
    stack: ["Node.js", "Next.js", "Zapier", "HubSpot"],
  },
  {
    id: "conversion-site",
    title: "Conversion-Driven Website",
    category: "Websites",
    summary: "SEO-backed marketing site with booking funnels, analytics, and experiment-ready components.",
    image: "/placeholder-95zgk.png",
    metrics: [
      { label: "Conversion rate", value: "5.2%" },
      { label: "Page speed", value: "95+ LCP" },
      { label: "Launch window", value: "4 weeks" },
    ],
    stack: ["Next.js", "Tailwind", "Vercel", "Analytics"],
  },
  {
    id: "partner-portal",
    title: "Partner Operations Portal",
    category: "Business Systems",
    summary: "Role-based portal for onboarding, approvals, and payouts with audit-ready trails.",
    image: "/placeholder-ks40r.png",
    metrics: [
      { label: "Onboarding time", value: "-60%" },
      { label: "Support tickets", value: "-45%" },
      { label: "User adoption", value: "94%" },
    ],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Stripe"],
  },
  {
    id: "support-automation",
    title: "Support Automation Desk",
    category: "Automation",
    summary: "AI-assisted triage, SLA alerts, and human-in-the-loop resolutions inside existing tools.",
    image: "/placeholder-49g40.png",
    metrics: [
      { label: "First reply", value: "3m" },
      { label: "Resolution time", value: "-52%" },
      { label: "Escalations", value: "-35%" },
    ],
    stack: ["Node.js", "n8n", "OpenAI", "Zendesk"],
  },
  {
    id: "inventory-system",
    title: "Inventory Control Dashboard",
    category: "Business Systems",
    summary: "Unified view of stock, purchase orders, and fulfillment with proactive alerts.",
    image: "/placeholder-7fi4h.png",
    metrics: [
      { label: "Stockouts", value: "-68%" },
      { label: "Reorder accuracy", value: "98%" },
      { label: "Teams aligned", value: "Ops + Finance" },
    ],
    stack: ["React", "D3.js", "Python", "PostgreSQL"],
  },
  {
    id: "subscription-site",
    title: "Subscription Commerce Site",
    category: "Websites",
    summary: "Product storytelling paired with subscription flows, retention nudges, and analytics.",
    image: "/data-analytics-dashboard.png",
    metrics: [
      { label: "LTV uplift", value: "2.4x" },
      { label: "Churn reduction", value: "-22%" },
      { label: "Launch window", value: "6 weeks" },
    ],
    stack: ["Next.js", "Stripe", "Tailwind", "Headless CMS"],
  },
]

const spotlightProjects = [
  {
    id: "ops-automation",
    category: "Automation",
    title: "Ops automation control room",
    description:
      "Built a single pane with approval gates, Slack alerts, and error handling for revenue and success teams.",
    image: "/saas-dashboard-analytics-interface.jpg",
    video: "/videos/atlas.mp4",
    outcomes: [
      "Cut manual updates by 72%",
      "Lead response now under 3 minutes",
      "Audit-ready logs for finance and sales",
    ],
    link: "/contact?project=ops-automation",
  },
  {
    id: "growth-site",
    category: "Websites",
    title: "Conversion-focused web rebuild",
    description:
      "Reframed the offer, shipped a landing system, and wired analytics plus experimentation from day one.",
    image: "/modern-ecommerce-interface.png",
    video: "/videos/lumos.mp4",
    outcomes: [
      "5.6% visitor-to-lead conversion",
      "Booked calls up 2.4x after launch",
      "Sub-1s LCP on primary templates",
    ],
    link: "/contact?project=growth-site",
  },
  {
    id: "customer-portal",
    category: "Business Systems",
    title: "Customer success portal",
    description:
      "Delivered self-serve onboarding, usage dashboards, and renewal workflows inside a branded portal.",
    image: "/mobile-fitness-app-interface-design.jpg",
    video: "/videos/pulse.mp4",
    outcomes: [
      "Churn reduced by 18%",
      "Time-to-value cut to 2 days",
      "CSAT improved to 4.8/5",
    ],
    link: "/contact?project=customer-portal",
  },
]

const galleryShots = [
  {
    title: "Automation control board",
    category: "Automation",
    description: "Approval gates, alerts, and error handling surfaced in one view.",
    image: "/modern-saas-dashboard-with-dark-blue-and-orange-ge.jpg",
  },
  {
    title: "Offer-led homepage",
    category: "Websites",
    description: "Clarity-first landing with social proof, pricing, and frictionless booking.",
    image: "/placeholder-ks40r.png",
  },
  {
    title: "Customer portal mobile",
    category: "Business Systems",
    description: "Self-serve onboarding, usage stats, and support built for handheld use.",
    image: "/placeholder-49g40.png",
  },
  {
    title: "Inventory & fulfillment view",
    category: "Business Systems",
    description: "Real-time stock status, alerts, and reconciliation for operations teams.",
    image: "/placeholder-95zgk.png",
  },
]

const testimonials = [
  {
    name: "Lisa Patel",
    role: "COO, CargoLine",
    quote:
      "He automated the messy handoffs between sales, ops, and finance. We finally see the entire order lifecycle without chasing spreadsheets.",
    outcome: "Manual billing time down 60% and response times under 3 minutes",
    avatar: "/professional-woman-portrait.png",
  },
  {
    name: "Andre Miller",
    role: "Founder, Northbeam Analytics",
    quote:
      "Our marketing site now speaks clearly to the right buyers and tracks every step. The rebuild paid for itself within the first quarter.",
    outcome: "Pipeline velocity up 2.4x with a faster, clearer website",
    avatar: "/professional-man-portrait.png",
  },
  {
    name: "Rachel Gomez",
    role: "Head of CS, Brevity",
    quote:
      "The custom portal and automation flows mean my team finally works from one place. Onboarding, renewals, and support all run smoother.",
    outcome: "Churn down 18% and CSAT at 4.8/5 within two months",
    avatar: "/professional-woman-portrait.png",
  },
]

const categories = ["All", "Automation", "Websites", "Business Systems"] as const

type Category = (typeof categories)[number]

const showServicesPageLinks = false

const showcaseHighlights = projects.map((project) => ({
  id: project.id,
  title: project.title,
  company: project.category,
  category: project.category as Category,
  description: project.summary,
  image: project.image,
  tags: project.stack,
  link: `/contact?project=${project.id}`,
}))

export default function PortfolioClientPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All")
  const [floatingVideo, setFloatingVideo] = useState<{ url: string; title: string } | null>(null)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  const [carouselCategory, setCarouselCategory] = useState<Category>("All")
  const showcaseFiltered =
    carouselCategory === "All"
      ? showcaseHighlights
      : showcaseHighlights.filter((project) => project.category === carouselCategory)

  const showcaseRailRef = useRef<HTMLDivElement | null>(null)
  const showcaseContainerRef = useRef<HTMLDivElement | null>(null)
  const [showcaseActive, setShowcaseActive] = useState(0)
  const showcaseGap = 32
  const showcaseCardW = useRef(0)

  const spotlightRailRef = useRef<HTMLDivElement | null>(null)
  const spotlightContainerRef = useRef<HTMLDivElement | null>(null)
  const [spotlightActive, setSpotlightActive] = useState(0)
  const spotlightGap = 32
  const spotlightCardW = useRef(0)

  const showcaseScrollTo = (index: number) => {
    const railEl = showcaseRailRef.current
    if (!railEl) return
    const w = showcaseCardW.current || 800
    railEl.scrollTo({ left: index * (w + showcaseGap), behavior: "smooth" })
  }

  const showcasePrev = () => showcaseScrollTo(Math.max(0, showcaseActive - 1))
  const showcaseNext = () => showcaseScrollTo(Math.min(showcaseFiltered.length - 1, showcaseActive + 1))

  const spotlightScrollTo = (index: number) => {
    const railEl = spotlightRailRef.current
    if (!railEl) return
    const w = spotlightCardW.current || 800
    railEl.scrollTo({ left: index * (w + spotlightGap), behavior: "smooth" })
  }

  const spotlightPrev = () => spotlightScrollTo(Math.max(0, spotlightActive - 1))
  const spotlightNext = () => spotlightScrollTo(Math.min(spotlightProjects.length - 1, spotlightActive + 1))

  useEffect(() => {
    const railEl = showcaseRailRef.current
    const containerEl = showcaseContainerRef.current
    if (!railEl || !containerEl) return

    const measure = () => {
      const vw = window.innerWidth
      const w = Math.round(Math.min(550, Math.max(450, vw * 0.3)))
      showcaseCardW.current = w
      railEl.style.setProperty("--fw-card-w", `${w}px`)

      const railRect = railEl.getBoundingClientRect()
      const containerRect = containerEl.getBoundingClientRect()

      // Get the container's computed padding
      const containerStyle = window.getComputedStyle(containerEl)
      const containerPaddingLeft = Number.parseFloat(containerStyle.paddingLeft)

      // Calculate the left position of the content inside the container
      const contentLeft = containerRect.left + containerPaddingLeft
      const railLeft = railRect.left

      // Calculate padding needed to align carousel with content
      const leftPad = Math.max(0, Math.round(contentLeft - railLeft))

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
  }, [showcaseFiltered.length])

  useEffect(() => {
    const railEl = showcaseRailRef.current
    if (!railEl) return

    const onScroll = () => {
      const w = showcaseCardW.current || 800
      const idx = Math.round(railEl.scrollLeft / (w + showcaseGap))
      setShowcaseActive(Math.max(0, Math.min(idx, showcaseFiltered.length - 1)))
    }

    railEl.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => railEl.removeEventListener("scroll", onScroll)
  }, [showcaseFiltered.length])

  useEffect(() => {
    setShowcaseActive(0)
    const id = requestAnimationFrame(() => showcaseScrollTo(0))
    return () => {
      cancelAnimationFrame(id)
    }
  }, [carouselCategory, showcaseFiltered.length])

  useEffect(() => {
    const railEl = spotlightRailRef.current
    const containerEl = spotlightContainerRef.current
    if (!railEl || !containerEl) return

    const measure = () => {
      const vw = window.innerWidth
      const w = Math.round(Math.min(1100, Math.max(900, vw * 0.55)))
      spotlightCardW.current = w
      railEl.style.setProperty("--spotlight-card-w", `${w}px`)

      const railRect = railEl.getBoundingClientRect()
      const containerRect = containerEl.getBoundingClientRect()

      // Get the container's computed padding
      const containerStyle = window.getComputedStyle(containerEl)
      const containerPaddingLeft = Number.parseFloat(containerStyle.paddingLeft)

      // Calculate the left position of the content inside the container
      const contentLeft = containerRect.left + containerPaddingLeft
      const railLeft = railRect.left

      // Calculate padding needed to align carousel with content
      const leftPad = Math.max(0, Math.round(contentLeft - railLeft))

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
  }, [])

  useEffect(() => {
    const railEl = spotlightRailRef.current
    if (!railEl) return

    const onScroll = () => {
      const w = spotlightCardW.current || 800
      const idx = Math.round(railEl.scrollLeft / (w + spotlightGap))
      setSpotlightActive(Math.max(0, Math.min(idx, spotlightProjects.length - 1)))
    }

    railEl.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => railEl.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-section-white py-24 sm:py-32 text-section-white-foreground">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_70%)]" />
            <div className="absolute -bottom-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Badge
              variant="secondary"
              className="mb-6 inline-flex items-center gap-2 bg-standout/20 text-standout border border-standout/30"
            >
              <Sparkles className="h-4 w-4" /> Automation • Websites • Systems
            </Badge>
            <h1 className="text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Automation, websites, and business systems built end-to-end by one product-minded developer.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
              I design, build, and ship automations, conversion-ready sites, and internal tools that run without
              babysitting. Clear offers, measurable outcomes, and production-quality delivery in weeks—not quarters.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-standout text-white hover:bg-standout/90 px-8 shadow-lg">
                <Link href="/contact">
                  Start a build
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {showServicesPageLinks ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary bg-transparent px-8 hover:bg-primary/10"
                >
                  <Link href="/services">View the service list</Link>
                </Button>
              ) : null}
            </div>

            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {heroStats.map((stat, idx) => {
                const Icon = stat.icon
                const colors = [
                  "bg-primary/10 text-primary",
                  "bg-standout/10 text-standout",
                  "bg-accent/10 text-accent",
                  "bg-standout-2-10 text-standout-2",
                ]
                return (
                  <Card
                    key={stat.label}
                    className="border border-border bg-card/50 backdrop-blur hover:shadow-lg transition-all"
                  >
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className={cn("flex h-11 w-11 items-center justify-center rounded-full", colors[idx % 4])}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                        <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Showreel Section */}
        <section className="border-b border-border bg-section-muted py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-standout/20 text-standout border border-standout/30">
                  Workflow demos
                </Badge>
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                  See the automations, sites, and systems <span className="text-primary">in motion</span>
                </h2>
                <p className="max-w-xl text-base text-muted-foreground leading-relaxed">
                  Watch the real flows I ship—approvals, dashboards, booking funnels, and automation monitors—so you
                  know exactly what shows up in production.
                </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {showreelHighlights.map((item, idx) => {
                    const Icon = item.icon
                    const colors = [
                      "bg-primary/10 text-primary",
                      "bg-standout/10 text-standout",
                      "bg-accent/10 text-accent",
                      "bg-standout-2-10 text-standout-2",
                    ]
                    return (
                      <Card
                        key={item.title}
                        className="border border-border bg-card/80 backdrop-blur hover:shadow-md transition-all"
                      >
                        <CardContent className="flex gap-4 p-5">
                          <div
                            className={cn("flex h-12 w-12 items-center justify-center rounded-full", colors[idx % 4])}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{item.title}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-standout text-white hover:bg-standout/90 shadow-lg">
                    <Link href="/contact?demo=showreel">Request the private reel</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
                  <video
                    className="h-full w-full object-cover opacity-80"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    poster="/modern-saas-dashboard-with-dark-blue-and-orange-ge.jpg"
                  >
                    <source src="/background-video.mp4" type="video/mp4" />
                  </video>
                    {/* Gradient overlay (make it non-interactive + under controls) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/20 to-transparent pointer-events-none z-0" />

                    {/* Controls (ensure they’re above the overlay) */}
                    <div className="absolute top-6 right-6 z-10">
                        <button
                            type="button"
                            onClick={() => setFloatingVideo({ url: "/background-video.mp4", title: "Showreel" })}
                            className="group inline-flex items-center gap-2 rounded-2xl bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white hover:text-foreground dark:hover:text-gray-900"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-foreground dark:text-gray-900">
                              <Play className="h-3 w-3" />
                            </span>
                            Watch reel
                        </button>
                    </div>


                    <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 text-sm uppercase tracking-wider text-white/80 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                        <Film className="h-4 w-4" />
                      </div>
                      In motion
                    </div>
                    <p className="text-xl font-semibold text-white">
                      Automations with safeguards, fast UIs, and clear paths to action on every surface.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-section-white py-20 sm:py-24">
          <div ref={spotlightContainerRef} className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div>
                <Badge variant="secondary" className="bg-standout/20 text-standout border border-standout/30">
                  Spotlight builds
                </Badge>
                <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                  Automations, websites, and systems built for real teams
                </h2>
                <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
                  Each build pairs automation, web, and internal tooling so teams see value quickly without juggling
                  multiple vendors.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                <Link href="/contact?request=build-walkthrough">Book a tailored walkthrough</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              ref={spotlightRailRef}
              className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-8 scroll-smooth scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              role="region"
              aria-roledescription="carousel"
              aria-label="Spotlight builds"
            >
              {spotlightProjects.map((spotlight) => (
                <article
                  key={spotlight.id}
                  className="group relative shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-card shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl card-shine glass-card glass-sway"
                  style={{ width: "var(--spotlight-card-w, 1000px)", maxWidth: "90vw", height: "500px" }}
                >
                  {/* Full image background */}
                  <div className="absolute inset-0">
                    <OptimizedImage
                      src={spotlight.image || "/placeholder.svg"}
                      alt={spotlight.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 1000px"
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Category badge */}
                  <span className="absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur bg-standout/90 text-white">
                    {spotlight.category}
                  </span>

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-4xl font-bold text-white mb-3 leading-tight tracking-tight">
                      {spotlight.title}
                    </h3>
                    <p className="text-white/90 max-w-2xl leading-relaxed">
                      {spotlight.description}
                    </p>

                    {/* Market-forward outcomes as branded chips */}
                    {spotlight.outcomes?.length ? (
                      <ul className="mt-4 flex flex-wrap items-center gap-2">
                        {spotlight.outcomes.map((o, i) => (
                          <li
                            key={i}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-white/80" /> {o}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <Button
                        size="lg"
                        className="btn-glass btn-glass--blue btn-neo px-8 py-6 text-lg font-semibold"
                        onClick={() => setFloatingVideo({ url: spotlight.video || "/videos/showreel.mp4", title: spotlight.title })}
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 shadow-inner mr-2">
                          <Play className="h-5 w-5 text-white" />
                        </span>
                        Watch walkthrough
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="text-white border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-6 text-base font-medium rounded-full"
                      >
                        <Link href="/contact" className="inline-flex items-center gap-2">
                          Learn more
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={spotlightPrev}
                  disabled={spotlightActive === 0}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {spotlightProjects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => spotlightScrollTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        i === spotlightActive ? "w-8 bg-standout" : "w-2 bg-border hover:bg-standout/50",
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={spotlightNext}
                  disabled={spotlightActive === spotlightProjects.length - 1}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Outcomes Section */}
        <section className="border-b border-border bg-section-muted py-20 sm:py-24">
          <div ref={showcaseContainerRef} className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <Badge variant="secondary" className="bg-standout/20 text-standout border border-standout/30">
                  Project library
                </Badge>
                <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                  Featured <span className="text-primary">outcomes</span> across automation, web, and systems
                </h2>
                <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
                  Filter by the type of build you need. Every project includes discovery, build, analytics, and
                  safeguards so you get production-ready outcomes.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setCarouselCategory(category)}
                    size="sm"
                    variant={carouselCategory === category ? "default" : "outline"}
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
                      carouselCategory === category
                        ? "bg-standout text-white shadow-lg hover:bg-standout/90"
                        : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-14">
            <div
              ref={showcaseRailRef}
              className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-8 scroll-smooth scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured work"
            >
              {filteredProjects.map((project, index) => {
                const toolkitColors = [
                  "border-primary bg-primary/10 text-primary",
                  "border-standout bg-standout/10 text-standout",
                  "border-accent bg-accent/10 text-accent",
                  "border-standout-2 bg-standout-2-10 text-standout-2",
                ]

                return (
                  <article
                    key={project.id}
                    className="group relative flex shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-border bg-card/90 backdrop-blur shadow-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] card-shine glass-card glass-sway glass-gradient-hover"
                    style={{ width: "var(--fw-card-w, 500px)", maxWidth: "85vw", minHeight: "700px" }}
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur bg-white/90 text-foreground dark:text-gray-900">
                        {project.category}
                      </span>
                      <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur bg-standout/90 text-white">
                        Live build
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{project.summary}</p>

                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {project.metrics.map((metric, idx) => (
                          <div
                            key={metric.label}
                            className="rounded-xl border border-border bg-muted/50 p-3 text-center tile-sheen"
                          >
                            <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground">{metric.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mb-6">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                          Toolkit
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech, idx) => (
                            <span
                              key={tech}
                              className={cn(
                                "px-3 py-1 rounded-full border text-xs font-medium",
                                toolkitColors[idx % toolkitColors.length],
                              )}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto grid grid-cols-2 gap-3">
                        <Button className="w-full bg-standout text-white hover:bg-standout/90">
                          Book a walkthrough
                        </Button>
                        <Button variant="outline" className="w-full border-border hover:bg-muted bg-transparent">
                          View details
                        </Button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={showcasePrev}
                  disabled={showcaseActive === 0}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {filteredProjects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => showcaseScrollTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        i === showcaseActive ? "w-8 bg-standout" : "w-2 bg-border hover:bg-standout/50",
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={showcaseNext}
                  disabled={showcaseActive === filteredProjects.length - 1}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Areas Section */}
        <section className="bg-section-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="text-center">
              <Badge
                variant="secondary"
                className="mx-auto mb-6 bg-standout/20 text-standout border border-standout/30"
              >
                Areas of focus
              </Badge>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Builds aligned to <span className="text-primary">automation</span>, websites, and business systems
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-base text-muted-foreground leading-relaxed">
                I join as a hands-on partner, mapping the workflows, designing the experience, and shipping the code
                that keeps your team moving without extra headcount.
              </p>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {focusAreas.map((area, idx) => {
                const Icon = area.icon
                const colors = [
                  "bg-primary/10 text-primary",
                  "bg-standout/10 text-standout",
                  "bg-accent/10 text-accent",
                ]
                return (
                  <Card
                    key={area.title}
                    className="h-full border border-border bg-card/80 backdrop-blur hover:shadow-lg transition-all"
                  >
                    <CardHeader className="space-y-4">
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", colors[idx % 3])}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl text-foreground">{area.title}</CardTitle>
                      <CardDescription className="text-base text-muted-foreground leading-relaxed">
                        {area.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {area.points.map((point) => (
                        <div key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Process & Toolkit Section */}
        <section className="bg-section-muted py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-2">
              <Card className="border border-border bg-card/80 backdrop-blur shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="space-y-3">
                  <Badge variant="secondary" className="w-fit bg-standout/20 text-standout border border-standout/30">
                    Process
                  </Badge>
                  <CardTitle className="text-2xl text-foreground">
                    From <span className="text-primary">audit</span> to live automations and web launches
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    Clear milestones, shared notes, and weekly demos so you always know what shipped and what is next.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {processSteps.map((step, index) => {
                    const Icon = step.icon
                    const colors = [
                      "bg-primary/10 text-primary",
                      "bg-standout/10 text-standout",
                      "bg-accent/10 text-accent",
                      "bg-standout-2-10 text-standout",
                    ]
                    return (
                      <div key={step.title} className="flex gap-4">
                        <div
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-full font-semibold flex-shrink-0",
                            colors[index % 4],
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                          <p className="text-xs uppercase tracking-wider text-primary">{step.detail}</p>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="border border-border bg-card/80 backdrop-blur shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="space-y-3">
                  <Badge variant="secondary" className="w-fit bg-standout/20 text-standout border border-standout/30">
                    Toolkit
                  </Badge>
                  <CardTitle className="text-2xl text-foreground">
                    Tools I <span className="text-primary">reach for</span> often
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    A flexible stack that covers automation, web, and system builds with maintainable handoffs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {toolkit.map((item, index) => {
                      const toolkitColors = [
                        "border-primary bg-primary/10 text-primary hover:bg-primary/20",
                        "border-standout bg-standout/10 text-standout hover:bg-standout/20",
                        "border-accent bg-accent/10 text-accent hover:bg-accent/20",
                        "border-standout-2 bg-standout-2-10 text-standout-2 hover:bg-standout-2",
                      ]
                      return (
                        <span
                          key={item}
                          className={cn(
                            "rounded-full border px-4 py-1 text-sm font-medium transition-colors",
                            toolkitColors[index % toolkitColors.length],
                          )}
                        >
                          {item}
                        </span>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="border-t border-border bg-section-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Badge variant="secondary" className="bg-standout/20 text-standout border border-standout/30">
                  Visual gallery
                </Badge>
                <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                  Screens from <span className="text-primary">recent automation</span>, website, and system builds
                </h2>
                <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
                  A quick look at the interfaces, dashboards, and flows clients use to run their day-to-day.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                <Link href="/contact?request=portfolio-deck">Request full deck</Link>
              </Button>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {galleryShots.map((shot, index) => (
                <div
                  key={shot.title}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border border-border bg-muted hover:shadow-xl transition-all",
                    index === 0 && "lg:row-span-2",
                  )}
                >
                  <img
                    src={shot.image || "/placeholder.svg"}
                    alt={shot.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-95" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs uppercase tracking-wider text-white/60">{shot.category}</p>
                    <p className="mt-2 text-xl font-semibold leading-tight">{shot.title}</p>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">{shot.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-section-muted py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="text-center">
              <Badge
                variant="secondary"
                className="mx-auto mb-6 bg-standout/20 text-standout border border-standout/30"
              >
                Client reflections
              </Badge>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Teams work with me when <span className="text-primary">outcomes</span> matter more than headcount
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-base text-muted-foreground leading-relaxed">
                Highlights from leaders who needed automation, web, and internal tools shipped by one accountable
                partner.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.name}
                  className="border border-border bg-card/80 backdrop-blur shadow-lg hover:shadow-xl transition-all"
                >
                  <CardContent className="space-y-6 p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full border border-primary/30 object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-base leading-relaxed text-foreground">“{testimonial.quote}”</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{testimonial.outcome}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-section-primary py-20 sm:py-24 text-section-primary-foreground">
          <div className="absolute inset-0">
            <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-standout/30 blur-3xl" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <Badge variant="secondary" className="mx-auto mb-6 bg-white/20 text-white border border-white/30">
              Let’s collaborate
            </Badge>
            <h2 className="text-3xl font-bold sm:text-5xl">
              Ready to automate, launch your site, or ship a business system?
            </h2>
            <p className="mt-5 text-lg text-section-primary-foreground/90 leading-relaxed">
              Share the workflows, pages, or tools that need to run better. I will map the plan, build it, and launch it
              with instrumentation so you see the impact quickly.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90 dark:text-gray-900 px-8 shadow-lg">
                <Link href="/contact">Plan my build</Link>
              </Button>
              {showServicesPageLinks ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-transparent px-8 text-white hover:bg-white/10"
                >
                  <Link href="/services">
                    See the service breakdown
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-transparent px-8 text-white hover:bg-white/10"
                >
                  <Link href="/contact">
                    Get a tailored plan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>
      {floatingVideo ? (
        <CornerVideoPlayer
          url={floatingVideo.url}
          title={floatingVideo.title}
          onClose={() => setFloatingVideo(null)}
        />
      ) : null}

      <Footer />
    </div>
  )
}
