import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { measureRail, scrollRailToIndex, stepRail, type RailState } from "@/lib/carouselRail"

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
const CARD_SELECTOR = "[data-fw-card]"

export function FeaturedWorkCarousel({ works, categories }: Props) {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? works : works.filter(w => w.category === active)
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
        <div className="sd-car-arrows" aria-hidden={!canPrev && !canNext}>
          {canPrev && (
            <button
              type="button"
              onClick={() => step(-1)}
              className="sd-arrowbtn"
              aria-label="Previous projects"
            >
              <ChevronLeft style={{ width: 22, height: 22 }} />
            </button>
          )}
          {canNext && (
            <button
              type="button"
              onClick={() => step(1)}
              className="sd-arrowbtn"
              aria-label="Next projects"
            >
              <ChevronRight style={{ width: 22, height: 22 }} />
            </button>
          )}
        </div>
      </div>

      <div
        ref={railRef}
        className="sd-car-rail"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured work carousel"
        tabIndex={0}
      >
        <div className="sd-car-lead" aria-hidden="true" />
        {filtered.map((work, i) => (
          <a
            key={work.id}
            data-fw-card
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
      </div>

      <div className="sd-wrap">
        <div className="sd-car-controls">
          <div className="sd-mono" style={{ fontSize: 12, color: "var(--muted-dim)" }}>
            {pad(index + 1)} / {pad(filtered.length)}
          </div>
          <div className="sd-car-dots" role="tablist" aria-label="Slide selector">
            {filtered.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to project ${i + 1} of ${filtered.length}`}
                aria-current={i === index}
                role="tab"
                className={cn("dot", i === index && "active")}
              />
            ))}
          </div>
          <a href="/work" className="sd-mono" style={{ fontSize: 12, color: "var(--ink)", textDecoration: "none" }}>
            All work →
          </a>
        </div>
      </div>
    </div>
  )
}
