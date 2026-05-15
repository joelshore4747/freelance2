import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

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

export function ShowcaseCarousel({ projects, categories }: { projects: Project[]; categories: string[] }) {
  const [active, setActive] = useState("All")
  const [index, setIndex] = useState(0)
  const railRef = useRef<HTMLDivElement | null>(null)

  const filtered = active === "All" ? projects : projects.filter(p => p.category === active)

  useEffect(() => {
    setIndex(0)
    railRef.current?.scrollTo({ left: 0, behavior: "smooth" })
  }, [active])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const onScroll = () => {
      const card = rail.querySelector<HTMLElement>("[data-show-card]")
      if (!card) return
      const w = card.offsetWidth + 32
      setIndex(Math.max(0, Math.min(Math.round(rail.scrollLeft / w), filtered.length - 1)))
    }
    rail.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => rail.removeEventListener("scroll", onScroll)
  }, [filtered.length])

  const scrollTo = (i: number) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector<HTMLElement>("[data-show-card]")
    if (!card) return
    const w = card.offsetWidth + 32
    rail.scrollTo({ left: i * w, behavior: "smooth" })
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-wrap gap-3 justify-end mb-6">
        {categories.map(c => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 border",
              active === c ? "bg-standout text-white shadow-lg border-transparent hover:bg-standout/90" : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="relative mt-8">
        <div
          ref={railRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-8 scroll-smooth scrollbar-hide px-6 sm:px-8 lg:px-12"
          style={{ scrollbarWidth: "none" }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured outcomes"
        >
          {filtered.map(p => (
            <article
              key={p.id}
              data-show-card
              className="group relative flex shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-border bg-card/90 backdrop-blur shadow-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              style={{ width: "min(500px, 85vw)", minHeight: "700px" }}
            >
              <div className="relative h-80 overflow-hidden">
                <img src={p.image || "/placeholder.svg"} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur bg-white/90 text-foreground dark:text-gray-900">{p.category}</span>
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
          <div className="mt-8 flex items-center justify-center gap-4">
            <button type="button" onClick={() => scrollTo(Math.max(0, index - 1))} disabled={index === 0} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {filtered.map((_, i) => (
                <button key={i} type="button" onClick={() => scrollTo(i)} aria-label={`Go to slide ${i + 1}`} className={cn("h-2 rounded-full transition-all", i === index ? "w-8 bg-standout" : "w-2 bg-border hover:bg-standout/50")} />
              ))}
            </div>
            <button type="button" onClick={() => scrollTo(Math.min(filtered.length - 1, index + 1))} disabled={index === filtered.length - 1} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all" aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
