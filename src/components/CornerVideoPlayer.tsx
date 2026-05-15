import { useCallback, useEffect, useRef, useState } from "react"

const ASPECT = 9 / 16

type Detail = { url: string; title?: string }

export function CornerVideoPlayer() {
  const [video, setVideo] = useState<Detail | null>(null)
  const ref = useRef<HTMLVideoElement | null>(null)

  const [width, setWidth] = useState(560)
  const [pos, setPos] = useState({ left: 24, top: 24 })
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const dragStart = useRef<{ x: number; y: number; left: number; top: number } | null>(null)
  const resizeStart = useRef<{ x: number; y: number; width: number; height: number } | null>(null)

  useEffect(() => {
    const open = (e: Event) => {
      const detail = (e as CustomEvent<Detail>).detail
      if (detail?.url) setVideo(detail)
    }
    const close = () => setVideo(null)
    window.addEventListener("portfolio:open-video", open as EventListener)
    window.addEventListener("portfolio:close-video", close)
    return () => {
      window.removeEventListener("portfolio:open-video", open as EventListener)
      window.removeEventListener("portfolio:close-video", close)
    }
  }, [])

  useEffect(() => {
    if (!video) return
    const w = window.innerWidth
    const h = window.innerHeight
    const initialW = Math.min(720, Math.max(420, Math.floor(w * 0.35)))
    const initialH = Math.round(initialW * ASPECT)
    setWidth(initialW)
    setPos({ left: Math.max(16, w - initialW - 16), top: Math.max(16, h - initialH - 16) })
  }, [video])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onEnded = () => setVideo(null)
    el.addEventListener("ended", onEnded)
    return () => el.removeEventListener("ended", onEnded)
  }, [video])

  const clamp = useCallback(
    (next: { left: number; top: number; width?: number }) => {
      const w = window.innerWidth
      const h = window.innerHeight
      const curW = next.width ?? width
      const curH = Math.round(curW * ASPECT)
      const left = Math.min(Math.max(0, next.left), Math.max(0, w - curW))
      const top = Math.min(Math.max(0, next.top), Math.max(0, h - curH))
      return { left, top }
    },
    [width],
  )

  if (!video) return null

  const onDragStart = (e: React.PointerEvent) => {
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY, left: pos.left, top: pos.top }
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }
  const onDragMove = (e: React.PointerEvent) => {
    if (!dragging || !dragStart.current) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setPos(clamp({ left: dragStart.current.left + dx, top: dragStart.current.top + dy }))
  }
  const onDragEnd = (e: React.PointerEvent) => {
    setDragging(false)
    dragStart.current = null
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
  }

  const onResizeStart = (e: React.PointerEvent) => {
    setResizing(true)
    resizeStart.current = { x: e.clientX, y: e.clientY, width, height: Math.round(width * ASPECT) }
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }
  const onResizeMove = (e: React.PointerEvent) => {
    if (!resizing || !resizeStart.current) return
    const dx = e.clientX - resizeStart.current.x
    const next = resizeStart.current.width + dx
    const maxW = Math.min(Math.round(window.innerWidth * 0.9), 1100)
    const nextW = Math.max(320, Math.min(maxW, next))
    setWidth(nextW)
    setPos(p => clamp({ left: p.left, top: p.top, width: nextW }))
  }
  const onResizeEnd = (e: React.PointerEvent) => {
    setResizing(false)
    resizeStart.current = null
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
  }

  return (
    <aside
      className="corner-video"
      style={{ left: pos.left, top: pos.top, width, height: Math.round(width * ASPECT) }}
    >
      <header onPointerDown={onDragStart} onPointerMove={onDragMove} onPointerUp={onDragEnd}>
        <button aria-label="Close video" onClick={() => setVideo(null)}>×</button>
      </header>
      <video ref={ref} src={video.url} className="h-full w-full object-cover" controls autoPlay playsInline preload="metadata">
        {video.title ? <track kind="captions" label={video.title} /> : null}
      </video>
      <div
        className="resize-handle"
        onPointerDown={onResizeStart}
        onPointerMove={onResizeMove}
        onPointerUp={onResizeEnd}
        aria-label="Resize video"
      />
    </aside>
  )
}
