import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { measureRail, railGoTo, railSettleIdx, railStep, type RailState } from "@/lib/carouselRail"

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

const pad = (n: number) => String(n).padStart(2, "0")

const openVideo = (detail: { url: string; title: string }) => {
  window.dispatchEvent(new CustomEvent("portfolio:open-video", { detail }))
}

export function SpotlightCarousel({ projects }: { projects: Spotlight[] }) {
  const railRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<RailState>({
    index: 0,
    canPrev: false,
    canNext: projects.length > 1,
    total: projects.length,
  })

  const refresh = useCallback(() => {
    if (railRef.current) setState(measureRail(railRef.current))
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    let settle: number | undefined
    const onScroll = () => {
      if (rail.__animId != null) return
      if (settle) window.clearTimeout(settle)
      settle = window.setTimeout(() => {
        if (rail.__animId == null) railSettleIdx(rail)
        refresh()
      }, 140)
    }
    rail.addEventListener("scroll", onScroll, { passive: true })
    const ro = new ResizeObserver(refresh)
    ro.observe(rail)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); railStep(rail, -1); refresh() }
      else if (e.key === "ArrowRight") { e.preventDefault(); railStep(rail, 1); refresh() }
      else if (e.key === "Home") { e.preventDefault(); railGoTo(rail, 0); refresh() }
      else if (e.key === "End") { e.preventDefault(); railGoTo(rail, projects.length - 1); refresh() }
    }
    rail.addEventListener("keydown", onKey)
    refresh()
    return () => {
      rail.removeEventListener("scroll", onScroll)
      rail.removeEventListener("keydown", onKey)
      ro.disconnect()
      if (settle) window.clearTimeout(settle)
    }
  }, [refresh, projects.length])

  const onArrow = (dir: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    railStep(rail, dir)
    refresh()
  }

  const { index, canPrev, canNext, total } = state
  const progress = total > 1 ? (index / (total - 1)) * 100 : 0

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex justify-end mb-6">
        <div className="arrow-row">
          <button type="button" className="arrow" disabled={!canPrev} onClick={() => onArrow(-1)} aria-label="Previous spotlight">
            <ChevronLeft />
          </button>
          <button type="button" className="arrow" disabled={!canNext} onClick={() => onArrow(1)} aria-label="Next spotlight">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="rail"
        role="region"
        aria-roledescription="carousel"
        aria-label="Spotlight builds carousel"
        tabIndex={0}
      >
        <div className="lead" aria-hidden="true" />
        {projects.map(s => (
          <article
            key={s.id}
            data-card
            className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
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
        <div className="tail" aria-hidden="true" />
      </div>

      <div className="index-strip">
        <span aria-live="polite">{pad(index + 1)} / {pad(total)}</span>
        <div className="progress" style={{ ["--p" as string]: `${progress}%` }} />
        <a href="/contact">View all →</a>
      </div>
    </div>
  )
}
