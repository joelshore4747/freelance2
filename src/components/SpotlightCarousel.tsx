import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { measureRail, scrollRailToIndex, stepRail, type RailState } from "@/lib/carouselRail"

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

const CARD_SELECTOR = "[data-spot-card]"

const openVideo = (detail: { url: string; title: string }) => {
  window.dispatchEvent(new CustomEvent("portfolio:open-video", { detail }))
}

export function SpotlightCarousel({ projects }: { projects: Spotlight[] }) {
  const railRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<RailState>({
    index: 0,
    canPrev: false,
    canNext: projects.length > 1,
  })

  const refresh = useCallback(() => {
    if (railRef.current) setState(measureRail(railRef.current, CARD_SELECTOR))
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const onScroll = () => refresh()
    rail.addEventListener("scroll", onScroll, { passive: true })
    const ro = new ResizeObserver(refresh)
    ro.observe(rail)
    refresh()
    return () => {
      rail.removeEventListener("scroll", onScroll)
      ro.disconnect()
    }
  }, [refresh])

  const step = (dir: 1 | -1) => {
    if (railRef.current) stepRail(railRef.current, CARD_SELECTOR, dir)
  }
  const scrollToIndex = (i: number) => {
    if (railRef.current) scrollRailToIndex(railRef.current, CARD_SELECTOR, i)
  }

  const { index, canPrev, canNext } = state
  const arrowClass = "inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground border-2 border-primary shadow-lg hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-standout transition-all"

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="carousel-bleed flex snap-x snap-mandatory gap-8 overflow-x-auto pb-8 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Spotlight builds carousel"
        tabIndex={0}
      >
        <div className="carousel-lead" aria-hidden="true" />
        {projects.map(s => (
          <article
            key={s.id}
            data-spot-card
            className="group relative shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
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
                  className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-lg font-semibold bg-card text-foreground hover:bg-card/90 font-sans"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-card/40 ring-1 ring-foreground/15 shadow-inner mr-2">
                    <Play className="h-5 w-5 text-foreground" />
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
          <div className="flex gap-3 items-center" aria-hidden={!canPrev && !canNext}>
            {canPrev && (
              <button type="button" onClick={() => step(-1)} className={arrowClass} aria-label="Previous spotlight" style={{ width: 52, height: 52 }}>
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2" role="tablist" aria-label="Slide selector">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to spotlight ${i + 1} of ${projects.length}`}
                aria-current={i === index}
                className={cn("h-2 rounded-full transition-all", i === index ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50")}
              />
            ))}
          </div>
          <div className="flex gap-3 items-center" aria-hidden={!canPrev && !canNext}>
            {canNext && (
              <button type="button" onClick={() => step(1)} className={arrowClass} aria-label="Next spotlight" style={{ width: 52, height: 52 }}>
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
