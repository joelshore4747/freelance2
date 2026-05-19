/* Smooth-carousel rail engine.
 *
 * Custom rAF animation with cubic-bezier(0.32, 0.72, 0, 1) easing for the
 * premium long-tail feel. The browser's snap engine is suspended via a
 * `.scrolling` class while the rAF tween is in flight, so the two motion
 * sources never fight each other. Native trackpad/touch scrolling still
 * works because snap kicks back in as soon as the class is removed.
 *
 * State lives on the rail element itself (`__idx`, `__animId`) so that
 * resize, filter-change, and re-render don't lose place.
 *
 * Ported from /Smooth Carousels.html (motion study, kept in repo root). */

declare global {
  interface HTMLElement {
    __idx?: number
    __animId?: number | null
  }
}

export const EASE: (x: number) => number = (() => {
  const A = (a: number, b: number) => 1 - 3 * b + 3 * a
  const B = (a: number, b: number) => 3 * b - 6 * a
  const C = (a: number) => 3 * a
  const calc = (t: number, a: number, b: number) =>
    ((A(a, b) * t + B(a, b)) * t + C(a)) * t
  const slope = (t: number, a: number, b: number) =>
    3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a)
  const p1x = 0.32, p1y = 0.72, p2x = 0, p2y = 1
  return (x: number) => {
    let t = x
    for (let i = 0; i < 6; i++) {
      const s = slope(t, p1x, p2x)
      if (s === 0) break
      t -= (calc(t, p1x, p2x) - x) / s
    }
    return calc(t, p1y, p2y)
  }
})()

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export type RailState = {
  index: number
  canPrev: boolean
  canNext: boolean
  total: number
}

export const railCards = (rail: HTMLElement): HTMLElement[] =>
  Array.from(rail.querySelectorAll<HTMLElement>("[data-card]"))

const padLeft = (rail: HTMLElement) =>
  parseFloat(getComputedStyle(rail).scrollPaddingLeft) || 0

/** Absolute scrollLeft target that seats card `i` against the snap line. */
export const railTargetFor = (rail: HTMLElement, i: number): number | null => {
  const cards = railCards(rail)
  if (!cards[i]) return null
  const padL = padLeft(rail)
  const railLeft = rail.getBoundingClientRect().left
  const cardLeft = cards[i].getBoundingClientRect().left
  const contentX = cardLeft - railLeft + rail.scrollLeft
  const max = rail.scrollWidth - rail.clientWidth
  return Math.max(0, Math.min(max, contentX - padL))
}

/** Find the card whose left edge is closest to the snap line. */
export const railClosest = (rail: HTMLElement): number => {
  const cards = railCards(rail)
  if (!cards.length) return 0
  const padL = padLeft(rail)
  const railLeft = rail.getBoundingClientRect().left
  let best = 0
  let bestDelta = Infinity
  for (let i = 0; i < cards.length; i++) {
    const d = Math.abs(cards[i].getBoundingClientRect().left - railLeft - padL)
    if (d < bestDelta) {
      bestDelta = d
      best = i
    }
  }
  return best
}

export const railAnimateTo = (rail: HTMLElement, target: number) => {
  if (rail.__animId != null) {
    cancelAnimationFrame(rail.__animId)
    rail.__animId = null
  }
  const from = rail.scrollLeft
  const dx = target - from
  if (Math.abs(dx) < 1) {
    rail.classList.remove("scrolling")
    return
  }
  if (reducedMotion()) {
    rail.classList.remove("scrolling")
    rail.scrollTo({ left: target, behavior: "auto" })
    return
  }

  const dur = Math.max(480, Math.min(900, Math.abs(dx) / 2.4))
  const t0 = performance.now()
  rail.classList.add("scrolling")

  const tick = (now: number) => {
    const t = Math.min(1, (now - t0) / dur)
    rail.scrollLeft = from + dx * EASE(t)
    if (t < 1) {
      rail.__animId = requestAnimationFrame(tick)
    } else {
      rail.__animId = null
      rail.classList.remove("scrolling")
    }
  }
  rail.__animId = requestAnimationFrame(tick)
}

export const railGoTo = (rail: HTMLElement, i: number) => {
  const cards = railCards(rail)
  if (!cards.length) return
  const idx = Math.max(0, Math.min(cards.length - 1, i))
  rail.__idx = idx
  const target = railTargetFor(rail, idx)
  if (target != null) railAnimateTo(rail, target)
}

export const railStep = (rail: HTMLElement, dir: 1 | -1) => {
  const cards = railCards(rail)
  if (!cards.length) return
  const cur = rail.__idx ?? railClosest(rail)
  const next = Math.max(0, Math.min(cards.length - 1, cur + dir))
  if (next === cur) return
  railGoTo(rail, next)
}

/** Reconcile rail.__idx with the current scroll position. Call from the
 *  scroll-settle handler so that trackpad/touch scrolls update both the
 *  stored index and the chrome consistently. */
export const railSettleIdx = (rail: HTMLElement) => {
  rail.__idx = railClosest(rail)
}

export const measureRail = (rail: HTMLElement): RailState => {
  const total = railCards(rail).length
  if (!total) return { index: 0, canPrev: false, canNext: false, total: 0 }
  const index = Math.max(0, Math.min(total - 1, rail.__idx ?? 0))
  return {
    index,
    canPrev: index > 0,
    canNext: index < total - 1,
    total,
  }
}
