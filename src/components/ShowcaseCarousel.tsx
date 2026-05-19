import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { measureRail, railGoTo, railSettleIdx, railStep, type RailState } from "@/lib/carouselRail"

type Project = {
  id: string
  title: string
  category: string
  summary: string
  image: string
  metrics: { label: string; value: string }[]
  stack: string[]
}

const TOOLKIT_COLORS = [
  "border-primary bg-primary/10 text-primary",
  "border-standout bg-standout/10 text-standout",
  "border-accent bg-accent/10 text-accent",
  "border-standout-2 bg-standout-2-10 text-standout-2",
]

const pad = (n: number) => String(n).padStart(2, "0")

export function ShowcaseCarousel({ projects, categories }: { projects: Project[]; categories: string[] }) {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? projects : projects.filter(p => p.category === active)
  const railRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<RailState>({
    index: 0,
    canPrev: false,
    canNext: filtered.length > 1,
    total: filtered.length,
  })

  const refresh = useCallback(() => {
    if (railRef.current) setState(measureRail(railRef.current))
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    rail.__idx = 0
    rail.scrollTo({ left: 0 })
    requestAnimationFrame(refresh)
  }, [active, refresh])

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
      else if (e.key === "End") { e.preventDefault(); railGoTo(rail, filtered.length - 1); refresh() }
    }
    rail.addEventListener("keydown", onKey)
    refresh()
    return () => {
      rail.removeEventListener("scroll", onScroll)
      rail.removeEventListener("keydown", onKey)
      ro.disconnect()
      if (settle) window.clearTimeout(settle)
    }
  }, [refresh, filtered.length])

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
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-wrap items-center gap-3 mb-6 mt-6">
        <div className="flex flex-wrap gap-3 flex-1">
          {categories.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 border",
                active === c ? "bg-primary text-primary-foreground shadow-lg border-transparent hover:bg-primary/90" : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="arrow-row">
          <button type="button" className="arrow" disabled={!canPrev} onClick={() => onArrow(-1)} aria-label="Previous projects">
            <ChevronLeft />
          </button>
          <button type="button" className="arrow" disabled={!canNext} onClick={() => onArrow(1)} aria-label="Next projects">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="rail"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured outcomes carousel"
        tabIndex={0}
      >
        <div className="lead" aria-hidden="true" />
        {filtered.map(p => (
          <article
            key={p.id}
            data-card
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/90 backdrop-blur shadow-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            style={{ width: "min(500px, 85vw)", minHeight: "700px" }}
          >
            <div className="relative h-80 overflow-hidden">
              <img src={p.image || "/placeholder.svg"} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur bg-card/90 text-foreground">{p.category}</span>
              <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur bg-standout/90 text-white">Live build</span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.summary}</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {p.metrics.map(m => (
                  <div key={m.label} className="rounded-xl border border-border bg-muted/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground mb-1">{m.value}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Toolkit</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((t, i) => (
                    <span key={t} className={cn("px-3 py-1 rounded-full border text-xs font-medium", TOOLKIT_COLORS[i % TOOLKIT_COLORS.length])}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="mt-auto grid grid-cols-2 gap-3">
                <a href="/contact" className="inline-flex items-center justify-center h-9 px-4 rounded-md font-medium text-sm bg-standout text-white hover:bg-standout/90 shadow-xs">Book a walkthrough</a>
                <a href="/contact" className="inline-flex items-center justify-center h-9 px-4 rounded-md font-medium text-sm border border-border bg-transparent hover:bg-muted">View details</a>
              </div>
            </div>
          </article>
        ))}
        <div className="tail" aria-hidden="true" />
      </div>

      <div className="index-strip">
        <span aria-live="polite">{pad(index + 1)} / {pad(total)}</span>
        <div className="progress" style={{ ["--p" as string]: `${progress}%` }} />
        <a href="/contact">Start a project →</a>
      </div>
    </div>
  )
}
