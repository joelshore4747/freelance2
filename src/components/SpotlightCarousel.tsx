import { useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"

type Spotlight = {
  id: string
  category: string
  title: string
  description: string
  image: string
  video: string
  outcomes: string[]
  link: string
}

const openVideo = (detail: { url: string; title: string }) => {
  window.dispatchEvent(new CustomEvent("portfolio:open-video", { detail }))
}

export function SpotlightCarousel({ projects }: { projects: Spotlight[] }) {
  const railRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const onScroll = () => {
      const card = rail.querySelector<HTMLElement>("[data-spot-card]")
      if (!card) return
      const w = card.offsetWidth + 32
      setIndex(Math.max(0, Math.min(Math.round(rail.scrollLeft / w), projects.length - 1)))
    }
    rail.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => rail.removeEventListener("scroll", onScroll)
  }, [projects.length])

  const scrollTo = (i: number) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector<HTMLElement>("[data-spot-card]")
    if (!card) return
    const w = card.offsetWidth + 32
    rail.scrollTo({ left: i * w, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="carousel-bleed flex snap-x snap-mandatory gap-8 overflow-x-auto pb-8 scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Spotlight builds"
      >
        {projects.map(s => (
          <article
            key={s.id}
            data-spot-card
            className="group relative shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-card shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            style={{ width: "min(1000px, 90vw)", height: "500px" }}
          >
            <div className="absolute inset-0">
              <img src={s.image || "/placeholder.svg"} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <span className="absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur bg-standout/90 text-white">{s.category}</span>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-4xl font-bold text-white mb-3 leading-tight tracking-tight">{s.title}</h3>
              <p className="text-white/90 max-w-2xl leading-relaxed">{s.description}</p>
              {s.outcomes.length > 0 && (
                <ul className="mt-4 flex flex-wrap items-center gap-2">
                  {s.outcomes.map(o => (
                    <li key={o} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                      <CheckCircle2 className="h-3.5 w-3.5 text-white/80" /> {o}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => openVideo({ url: s.video, title: s.title })}
                  className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-lg font-semibold bg-white text-foreground hover:bg-white/90 dark:text-gray-900"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 shadow-inner mr-2">
                    <Play className="h-5 w-5 text-foreground dark:text-gray-900" />
                  </span>
                  Watch walkthrough
                </button>
                <a href={s.link} className="inline-flex items-center gap-2 text-white border border-white/30 bg-white/10 hover:bg-white/20 px-6 py-4 text-base font-medium rounded-full backdrop-blur-sm">
                  Learn more <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" onClick={() => scrollTo(Math.max(0, index - 1))} disabled={index === 0} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button key={i} type="button" onClick={() => scrollTo(i)} aria-label={`Go to slide ${i + 1}`} className={cn("h-2 rounded-full transition-all", i === index ? "w-8 bg-standout" : "w-2 bg-border hover:bg-standout/50")} />
            ))}
          </div>
          <button type="button" onClick={() => scrollTo(Math.min(projects.length - 1, index + 1))} disabled={index === projects.length - 1} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
