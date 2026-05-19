import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { measureRail, scrollRailToIndex, stepRail, type RailState } from "@/lib/carouselRail"

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

const CARD_SELECTOR = "[data-show-card]"

export function ShowcaseCarousel({ projects, categories }: { projects: Project[]; categories: string[] }) {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? projects : projects.filter(p => p.category === active)
  const railRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<RailState>({
    index: 0,
    canPrev: false,
    canNext: filtered.length > 1,
  })

  const refresh = useCallback(() => {
    if (railRef.current) setState(measureRail(railRef.current, CARD_SELECTOR))
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollTo({ left: 0 })
    requestAnimationFrame(refresh)
  }, [active, refresh])

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
        <div className="flex gap-3 items-center" aria-hidden={!canPrev && !canNext}>
          {canPrev && (
            <button type="button" onClick={() => step(-1)} className={arrowClass} aria-label="Previous projects" style={{ width: 52, height: 52 }}>
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {canNext && (
            <button type="button" onClick={() => step(1)} className={arrowClass} aria-label="Next projects" style={{ width: 52, height: 52 }}>
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      <div className="relative mt-8">
        <div
          ref={railRef}
          className="carousel-bleed flex snap-x snap-mandatory gap-8 overflow-x-auto pb-8 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured outcomes carousel"
          tabIndex={0}
        >
          <div className="carousel-lead" aria-hidden="true" />
          {filtered.map(p => (
            <article
              key={p.id}
              data-show-card
              className="group relative flex shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border bg-card/90 backdrop-blur shadow-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
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
        </div>

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Slide selector">
            {filtered.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to project ${i + 1} of ${filtered.length}`}
                aria-current={i === index}
                className={cn("h-2 rounded-full transition-all", i === index ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
