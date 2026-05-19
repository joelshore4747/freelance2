const supportsIO = typeof window !== "undefined" && "IntersectionObserver" in window

function initScrollFade() {
  const targets = document.querySelectorAll<HTMLElement>(".scroll-animate")
  if (!targets.length || !supportsIO) {
    targets.forEach(el => el.classList.add("animate-scroll-fade-up"))
    return
  }
  const io = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-scroll-fade-up")
          io.unobserve(entry.target)
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
  )
  targets.forEach(el => io.observe(el))
}

function initDesignV2Reveal() {
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]")
  if (!targets.length || !supportsIO) {
    targets.forEach(el => el.classList.add("in"))
    return
  }
  const io = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in")
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  )
  targets.forEach(el => io.observe(el))
}

function initParallax() {
  const els = Array.from(document.querySelectorAll<HTMLElement>(".parallax-bg"))
  if (!els.length) return
  let ticking = false
  const apply = () => {
    const y = window.scrollY
    for (const el of els) {
      const speed = Number(el.dataset.parallaxSpeed ?? "0.2")
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`
    }
    ticking = false
  }
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(apply)
      ticking = true
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  apply()
}

function run() {
  initScrollFade()
  initParallax()
  initDesignV2Reveal()
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run, { once: true })
} else {
  run()
}
