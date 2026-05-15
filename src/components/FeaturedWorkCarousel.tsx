import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Work = {
  id: number
  title: string
  company: string
  category: string
  description: string
  image: string
  tags: string[]
  caseStudyUrl: string
}

type Props = {
  works: Work[]
  categories: string[]
}

export function FeaturedWorkCarousel({ works, categories }: Props) {
  const [active, setActive] = useState("All")
  const [index, setIndex] = useState(0)

  const filtered = active === "All" ? works : works.filter(w => w.category === active)
  const railRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIndex(0)
    railRef.current?.scrollTo({ left: 0, behavior: "smooth" })
  }, [active])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const onScroll = () => {
      const card = rail.querySelector<HTMLElement>("[data-fw-card]")
      if (!card) return
      const cardW = card.offsetWidth
      const gap = 32
      const next = Math.round(rail.scrollLeft / (cardW + gap))
      setIndex(Math.max(0, Math.min(next, filtered.length - 1)))
    }
    rail.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => rail.removeEventListener("scroll", onScroll)
  }, [filtered.length])

  const scrollTo = (i: number) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector<HTMLElement>("[data-fw-card]")
    if (!card) return
    const w = card.offsetWidth + 32
    rail.scrollTo({ left: i * w, behavior: "smooth" })
  }
  const step = (dir: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector<HTMLElement>("[data-fw-card]")
    if (!card) return
    const w = card.offsetWidth + 32
    const current = Math.round(rail.scrollLeft / w)
    const next = Math.max(0, Math.min(current + dir, filtered.length - 1))
    rail.scrollTo({ left: next * w, behavior: "smooth" })
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5 mb-12">
        {categories.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all border-2 border-transparent",
              active === category
                ? "featured-pill-active"
                : "border-border text-foreground hover:border-border dark:border-white/20 dark:text-white/80 dark:hover:text-white dark:hover:border-white/40",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="relative">
        <div
          ref={railRef}
          className="carousel-bleed flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured work"
        >
          {filtered.map(work => (
            <article
              key={work.id}
              data-fw-card
              className="featured-work-card relative snap-start flex-shrink-0 rounded-2xl overflow-hidden bg-card/80 ring-1 ring-white/10 shadow-md hover:shadow-lg transition-all w-[20rem] sm:w-[28rem] lg:w-[42rem]"
            >
              <div className="relative" style={{ aspectRatio: "16/7" }}>
                <img
                  src={work.image || "/placeholder.svg"}
                  alt={work.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur bg-standout/75 text-white">
                  {work.category}
                </span>
              </div>
              <div className="p-6 md:p-8 pb-20">
                <h3 className="text-[clamp(1.4rem,1vw+1rem,1.9rem)] font-bold text-card-foreground mb-2">{work.title}</h3>
                <p className="text-standout font-semibold text-[clamp(0.95rem,0.45vw+0.9rem,1.1rem)] mb-3">{work.company}</p>
                <p className="text-muted-foreground text-[clamp(1rem,0.6vw+0.95rem,1.15rem)] leading-relaxed mb-5">
                  {work.description}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {work.tags.map(tag => (
                    <span key={tag} className="tech-tag text-[clamp(0.9rem,0.35vw+0.85rem,1rem)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={work.caseStudyUrl}
                className="inline-flex items-center justify-center gap-2 h-10 px-5 text-sm rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs absolute bottom-5 right-5"
              >
                View Case Study
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={index === 0}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {filtered.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-8 bg-standout" : "w-2 bg-border hover:bg-standout/50",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={index === filtered.length - 1}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
