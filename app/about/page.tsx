"use client"

import type React from "react"
import Link from "next/link"
import OptimizedImage from "@/components/ui/optimized-image"
import { useEffect, useRef } from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Code,
  Heart,
  Palette,
  Sparkles,
  Target,
  Users,
  Zap,
  MessageSquare,
  Calendar,
} from "lucide-react"

/** Reveal-on-scroll using the shared `.animate-scroll-fade-up` keyframe */
function useScrollAnimation() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".scroll-animate"))
    if (!nodes.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.classList.add("animate-scroll-fade-up")
          el.classList.remove("opacity-0", "translate-y-6")
          io.unobserve(el)
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" },
    )

    nodes.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ────────────────────────────────────────────────────────────────────────────
 * Data
 * ────────────────────────────────────────────────────────────────────────────*/

type TeamMember = {
  name: string
  role: string
  bio: string
  strengths: string[]
  tools: string
  image: string
  icon: React.ElementType
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "Design Lead & Co-Founder",
    bio: "Alex shapes the visual language, interaction patterns, and product feel so every release is coherent and human.",
    strengths: ["Narrative-led UX", "Inclusive systems", "Design stewardship"],
    tools: "Figma, Framer, After Effects",
    image: "/professional-designer-portrait.png",
    icon: Palette,
  },
  {
    name: "Jordan Smith",
    role: "Engineering Lead & Co-Founder",
    bio: "Jordan turns concepts into resilient, scalable products with an eye on performance, accessibility, and maintainability.",
    strengths: ["Product architecture", "Edge-to-cloud", "Performance tuning"],
    tools: "TypeScript, Next.js, AWS",
    image: "/professional-developer-portrait.png",
    icon: Code,
  },
]

type StudioValue = {
  title: string
  description: string
  icon: React.ElementType
}

const VALUES: StudioValue[] = [
  {
    title: "Human-centred",
    description: "We obsess over clarity and comfort so interfaces feel intuitive from day one.",
    icon: Users,
  },
  {
    title: "Measurable outcomes",
    description: "Beautiful design matters most when it moves the metrics that matter to your business.",
    icon: Target,
  },
  {
    title: "Always evolving",
    description: "We stay curious, experiment with new tech, and ship innovations without the risk.",
    icon: Zap,
  },
  {
    title: "Craft & care",
    description: "Details compound. We sweat the small things so the big picture sings.",
    icon: Heart,
  },
]

type GalleryItem = {
  src: string
  alt: string
  aspect: string // tailwind aspect class (e.g. aspect-[4/5])
  label: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/professional-designer-portrait.jpg",
    alt: "Brand system tiles",
    aspect: "aspect-[3/4]",
    label: "Brand Systems",
  },
  {
    src: "/professional-designer-portrait.jpg",
    alt: "Component detail",
    aspect: "aspect-square",
    label: "Design System",
  },
  {
    src: "/professional-designer-portrait.jpg",
    alt: "Analytics board",
    aspect: "aspect-[5/4]",
    label: "Product Metrics",
  },
  { src: "/professional-designer-portrait.jpg", alt: "Prototype flow", aspect: "aspect-[4/5]", label: "Prototype" },
  { src: "/professional-designer-portrait.jpg", alt: "Motion sample", aspect: "aspect-[3/2]", label: "Motion" },
  { src: "/professional-designer-portrait.jpg", alt: "UI polish", aspect: "aspect-[4/3]", label: "UI Polish" },
  { src: "/professional-designer-portrait.jpg", alt: "Workshop whiteboard", aspect: "aspect-[4/3]", label: "Workshop" },
  { src: "/professional-designer-portrait.jpg", alt: "Design review", aspect: "aspect-[5/4]", label: "Review" },
]

type ImgTileProps = { i: number; className?: string; row?: number; col?: number }
function ImgTile({ i, className = "", row, col }: ImgTileProps) {
  const item = GALLERY_ITEMS[i % GALLERY_ITEMS.length]
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ring-1 ring-border bg-card ${className}`}
      style={{ gridRow: row ? `span ${row}` : undefined, gridColumn: col ? `span ${col}` : undefined }}
    >
      <OptimizedImage
        src={item.src || "/placeholder.svg"}
        alt={item.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/90">
        <span>Studio Duo</span>
        <span>{item.label}</span>
      </div>
    </div>
  )
}

type TextTileProps = {
  title: string
  body?: string
  tone?: "light" | "brand"
  row?: number
  col?: number
  className?: string
}
function TextTile({ title, body, tone = "light", row, col, className = "" }: TextTileProps) {
  const toneClass = tone === "brand" ? "bg-primary/20 text-white ring-white/10" : "bg-white/10 text-white ring-white/10"
  return (
    <div
      className={`rounded-2xl ${toneClass} ring-1 backdrop-blur-md flex items-center justify-center text-center p-6 sm:p-8 ${className}`}
      style={{ gridRow: row ? `span ${row}` : undefined, gridColumn: col ? `span ${col}` : undefined }}
    >
      <div className="max-w-xs">
        <h3 className="text-lg sm:text-xl font-medium">{title}</h3>
        {body ? <p className="mt-3 text-sm leading-relaxed opacity-90">{body}</p> : null}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * Page
 * ────────────────────────────────────────────────────────────────────────────*/

export default function Page() {
  useScrollAnimation()
  const valuesCarouselRef = useRef<HTMLDivElement>(null)

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, dir: "left" | "right") => {
    if (!ref.current) return
    const amount = 320
    ref.current.scrollTo({ left: ref.current.scrollLeft + (dir === "left" ? -amount : amount), behavior: "smooth" })
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-section-white cv-auto">
        {/* Brighter gradient bubbles */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-tech-1-10 blur-3xl opacity-80 animate-float" />
          <div className="absolute top-1/3 -right-32 h-[450px] w-[450px] rounded-full bg-tech-2-10 blur-3xl opacity-80 animate-float animation-delay-300" />
          <div className="absolute -bottom-32 left-6 h-[550px] w-[550px] rounded-full bg-tech-3-10 blur-3xl opacity-80 animate-float animation-delay-600" />
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-tech-4-10 blur-2xl opacity-70 animate-float animation-delay-900" />
          <div className="absolute bottom-20 right-1/3 h-64 w-64 rounded-full bg-primary/20 blur-2xl opacity-70 animate-float" />
          <div className="absolute inset-0 bg-hero-glow opacity-70" />
          <div className="hero-grid-overlay absolute inset-0" />
          <div
            className="absolute -inset-8 md:-inset-12 hero-animated-bg pointer-events-none
             bg-gradient-to-br from-standout/10 via-transparent to-primary/60
             [background-size:200%_200%] [animation:bg-pan_18s_ease-in-out_infinite]"
          />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center sm:py-32 lg:py-40">
          <Badge className="scroll-animate mb-8 border-2 border-standout/30 bg-standout/20 text-standout font-bold shadow-lg backdrop-blur-sm opacity-0 translate-y-6 hover:scale-110 transition-transform duration-300 text-sm px-6 py-2">
            About Studio Duo
          </Badge>
          <h1 className="scroll-animate text-balance text-4xl font-bold tracking-tight text-section-white-foreground opacity-0 translate-y-6 sm:text-6xl lg:text-7xl">
            A <span className="text-gradient-tech font-extrabold">designer</span> and{" "}
            <span className="text-gradient-tech font-extrabold">developer</span> working as one product team
          </h1>
          <p className="scroll-animate mt-6 max-w-2xl text-lg text-muted-foreground opacity-0 translate-y-6 sm:text-xl font-medium">
            We help teams ship crisp interfaces and robust systems—fast, measurable, and maintainable.
          </p>
          <div className="scroll-animate mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0 translate-y-6">
            <Link href="#contact">
              <Button className="gap-2 bg-standout hover:bg-standout/90 text-standout-foreground font-bold text-lg px-8 py-6 shadow-xl hover:scale-105 transition-all duration-300">
                Book a call <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#work">
              <Button
                variant="outline"
                className="gap-2 border-2 border-white/30 bg-white/10 hover:bg-white/20 text-foreground dark:text-white font-bold text-lg px-8 py-6 shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                See work <Sparkles className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section — redesigned */}
      <section className="bg-section-muted py-24 sm:py-32 cv-auto">
        <div className="mx-auto max-w-7xl px-6">
          <div className="scroll-animate text-center opacity-0 translate-y-6">
            <Badge className="border-2 border-standout/30 bg-standout/20 text-standout font-bold shadow-lg backdrop-blur-sm text-sm px-6 py-2">
              The team
            </Badge>
            <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-section-white-foreground sm:text-5xl">
              Meet the duo leading every project
            </h2>
            <p className="mt-4 text-lg font-medium leading-relaxed text-muted-foreground sm:text-xl">
              Strategy, design, and engineering move in sync so you never feel a hand-off.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {TEAM_MEMBERS.map((member) => (
              <Card
                key={member.name}
                className="scroll-animate card-universal opacity-0 translate-y-6 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.15)] hover:ring-2 hover:ring-white/10 hover:bg-white/5 backdrop-blur-sm"
              >
                <div className="flex items-start gap-6">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-border">
                    <OptimizedImage
                      src={member.image || "/placeholder.svg"}
                      alt={`${member.name} portrait`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="truncate text-xl font-bold text-section-white-foreground">
                      {member.name}
                    </CardTitle>
                    <p className="mt-1 text-sm font-semibold text-standout">{member.role}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground font-medium">{member.bio}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {member.strengths.map((s) => (
                    <span key={s} className="tech-tag">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-5 text-sm text-muted-foreground font-medium">
                  <span className="opacity-80">Tools:</span> {member.tools}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section — upgraded animation */}
      <section className="bg-section-white py-16 sm:py-24 lg:py-32 cv-auto">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="scroll-animate text-balance text-3xl font-bold tracking-tight text-section-white-foreground opacity-0 translate-y-6 sm:text-5xl">
              Our Values
            </h2>
            <p className="scroll-animate mx-auto mt-4 max-w-3xl text-lg font-medium text-muted-foreground opacity-0 translate-y-6 sm:text-xl">
              The principles that guide everything we do and ensure exceptional results.
            </p>
          </div>

          {/* Mobile carousel */}
          <div className="mt-10 md:hidden">
            <div className="mb-4 flex items-center justify-end gap-2">
              <Button variant="secondary" size="icon" onClick={() => scrollCarousel(valuesCarouselRef, "left")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" onClick={() => scrollCarousel(valuesCarouselRef, "right")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div
              ref={valuesCarouselRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scrollbar-hide"
            >
              {VALUES.map((value, idx) => (
                <div
                  key={value.title}
                  className="scroll-animate group w-72 snap-center opacity-0 translate-y-6 transition-all duration-500 hover:translate-x-2 hover:opacity-100"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  <Card className="h-full rounded-2xl border-2 bg-card/80 p-6 ring-2 ring-border/50 backdrop-blur-sm hover:ring-white/20 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] hover:bg-white/10 transition-all duration-500">
                    <div
                      className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${
                        idx % 4 === 0
                          ? "text-tech-1 bg-tech-1-10"
                          : idx % 4 === 1
                            ? "text-tech-2 bg-tech-2-10"
                            : idx % 4 === 2
                              ? "text-tech-3 bg-tech-3-10"
                              : "text-tech-4 bg-tech-4-10"
                      } group-hover:rotate-6 transition-transform duration-500`}
                    >
                      <value.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl font-bold text-section-white-foreground">{value.title}</CardTitle>
                    <CardDescription className="mt-3 text-sm leading-relaxed text-muted-foreground font-medium">
                      {value.description}
                    </CardDescription>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop grid */}
          <div className="scroll-animate mx-auto mt-12 hidden max-w-7xl grid-cols-4 gap-6 opacity-0 translate-y-6 md:grid">
            {VALUES.map((value, idx) => (
              <Card
                key={value.title}
                className="group h-full rounded-2xl border-2 bg-card/80 p-6 ring-2 ring-border/50 backdrop-blur-sm transition-all duration-500 hover:translate-x-2 hover:ring-white/20 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] hover:bg-white/10"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${
                    idx % 4 === 0
                      ? "text-tech-1 bg-tech-1-10"
                      : idx % 4 === 1
                        ? "text-tech-2 bg-tech-2-10"
                        : idx % 4 === 2
                          ? "text-tech-3 bg-tech-3-10"
                          : "text-tech-4 bg-tech-4-10"
                  } group-hover:rotate-6 transition-transform duration-500`}
                >
                  <value.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-bold text-section-white-foreground">{value.title}</CardTitle>
                <CardDescription className="mt-2 text-sm leading-relaxed text-muted-foreground font-medium">
                  {value.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="work" aria-label="Work collage" className="relative py-24 overflow-hidden cv-auto">
        {/* Animated gradient background */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -inset-8 md:-inset-12 hero-animated-bg pointer-events-none
             bg-gradient-to-br from-primary/20 via-transparent to-standout/20
             [background-size:200%_200%] [animation:bg-pan_18s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-hero-glow opacity-50" />
        </div>

        {/* wrapper scales whole grid */}
        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="text-center mb-16">
            <h2 className="scroll-animate text-balance text-3xl font-bold tracking-tight text-foreground opacity-0 translate-y-6 sm:text-5xl mb-4">
              Our Work in Action
            </h2>
            <p className="scroll-animate text-lg font-medium text-muted-foreground opacity-0 translate-y-6 sm:text-xl">
              A glimpse into the projects we've crafted with care
            </p>
          </div>

          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)", // lock to 4 cols
              gridAutoRows: "300px", // lock base row height
            }}
          >
            <TextTile title="Strategic by Design" body="Workshops, audit notes, and priorities mapped to outcomes." row={2} />
            <ImgTile i={0} row={2} />
            <ImgTile i={1} />
            <TextTile title="Built for Adoption" body="Clear flows, smart defaults, and onboarding that sticks." />
            <ImgTile i={2} row={2} col={2} />
            <ImgTile i={3} />
            <TextTile title="Ready to Scale" body="Reusable components and tokenized systems for rapid launches." />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-white py-24 sm:py-32 cv-auto">
        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-tech-1-10 blur-3xl opacity-60 animate-float" />
          <div className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-standout/20 blur-3xl opacity-60 animate-float animation-delay-600" />
          <div
            className="absolute -inset-8 md:-inset-12 hero-animated-bg pointer-events-none
             bg-gradient-to-br from-primary/10 via-transparent to-standout/10
             [background-size:200%_200%] [animation:bg-pan_20s_ease-in-out_infinite]"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="scroll-animate opacity-0 translate-y-6">
            <Badge className="border-2 border-standout/30 bg-standout/20 text-standout font-bold shadow-lg backdrop-blur-sm text-sm px-6 py-2 mb-8">
              Let's Talk
            </Badge>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-section-white-foreground sm:text-6xl">
              Ready to build something <span className="text-gradient-tech font-extrabold">exceptional</span>?
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              Whether you need a quick sprint or a long-term partnership, we're here to help you ship products that
              users love.
            </p>
          </div>

          <div className="scroll-animate mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 translate-y-6">
            <Card className="card-universal p-8 w-full sm:w-auto hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] hover:ring-2 hover:ring-white/20 transition-all duration-300">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-standout/20 text-standout">
                  <Calendar className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-section-white-foreground mb-2">Book a Discovery Call</h3>
                  <p className="text-sm text-muted-foreground font-medium mb-4">
                    30 minutes to explore your goals and see if we're a fit
                  </p>
                  <Link href="#contact">
                    <Button className="gap-2 bg-standout hover:bg-standout/90 text-standout-foreground font-bold shadow-xl hover:scale-105 transition-all duration-300">
                      Schedule now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="card-universal p-8 w-full sm:w-auto hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] hover:ring-2 hover:ring-white/20 transition-all duration-300">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-tech-2-10 text-tech-2">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-section-white-foreground mb-2">Send Us a Message</h3>
                  <p className="text-sm text-muted-foreground font-medium mb-4">
                    Share your project details and we'll get back within 24 hours
                  </p>
                  <Link href="#contact">
                    <Button
                      variant="outline"
                      className="gap-2 border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                    >
                      Get in touch <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          <p className="scroll-animate mt-12 text-sm text-muted-foreground font-medium opacity-0 translate-y-6">
            Trusted by startups and established brands to deliver quality at speed
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
