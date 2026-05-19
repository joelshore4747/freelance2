import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { measureRail, railGoTo, railSettleIdx, railStep, type RailState } from "@/lib/carouselRail"

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

const pad = (n: number) => String(n).padStart(2, "0")

export function FeaturedWorkCarousel({ works, categories }: Props) {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? works : works.filter(w => w.category === active)
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
      <div className="sd-car-head">
        <div className="sd-pills">
          {categories.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn("sd-pill", active === category && "active")}
            >
              {category}
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
        aria-label="Featured work carousel"
        tabIndex={0}
      >
        <div className="lead" aria-hidden="true" />
        {filtered.map((work, i) => (
          <a
            key={work.id}
            data-card
            href={work.caseStudyUrl}
            className="sd-work-card"
            aria-label={`${work.title} — ${work.company}, case study`}
          >
            <div className="sd-work-media">
              <span className="tag-top">{work.category}</span>
              <span className="num-corner">
                {pad(i + 1)} / {pad(filtered.length)}
              </span>
              {work.image ? (
                <img
                  src={work.image}
                  alt={work.title}
                  loading="lazy"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div className="pattern"><div className="mini" data-l={work.title} /></div>
              )}
            </div>
            <div className="sd-work-body">
              <div className="meta"><span>{work.company}</span><span>2026</span></div>
              <h3>{work.title}</h3>
              <p>{work.description}</p>
            </div>
            <div className="sd-work-foot">
              <div className="tags">
                {work.tags.map(t => (
                  <span key={t} className="t">{t}</span>
                ))}
              </div>
              <span>
                View case study
                <ArrowUpRight style={{ width: 14, height: 14 }} />
              </span>
            </div>
          </a>
        ))}
        <div className="tail" aria-hidden="true" />
      </div>

      <div className="index-strip">
        <span aria-live="polite">{pad(index + 1)} / {pad(total)}</span>
        <div className="progress" style={{ ["--p" as string]: `${progress}%` }} />
        <a href="/work">All work →</a>
      </div>
    </div>
  )
}
