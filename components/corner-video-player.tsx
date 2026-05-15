"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const ASPECT = 9 / 16

type CornerVideoPlayerProps = {
  url: string
  title?: string
  onClose: () => void
}

export function CornerVideoPlayer({ url, title, onClose }: CornerVideoPlayerProps) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(560)
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 24, top: 24 })
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const dragStart = useRef<{ x: number; y: number; left: number; top: number } | null>(null)
  const resizeStart = useRef<{ x: number; y: number; width: number; height: number } | null>(null)

  // Auto-close when the video ends
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = () => onClose()
    el.addEventListener("ended", handler)
    return () => el.removeEventListener("ended", handler)
  }, [onClose])

  // Position bottom-right on mount
  useEffect(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200
    const h = typeof window !== "undefined" ? window.innerHeight : 800
    const initialW = Math.min(720, Math.max(420, Math.floor(w * 0.35)))
    const initialH = Math.round(initialW * ASPECT)
    setWidth(initialW)
    setPos({ left: Math.max(16, w - initialW - 16), top: Math.max(16, h - initialH - 16) })
  }, [])

  const clamp = useCallback((next: { left: number; top: number; width?: number }) => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200
    const h = typeof window !== "undefined" ? window.innerHeight : 800
    const curW = next.width ?? width
    const curH = Math.round(curW * ASPECT)
    const left = Math.min(Math.max(0, next.left), Math.max(0, w - curW))
    const top = Math.min(Math.max(0, next.top), Math.max(0, h - curH))
    return { left, top }
  }, [width])

  // Dragging
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

  // Resizing (keeps 16:9)
  const onResizeStart = (e: React.PointerEvent) => {
    setResizing(true)
    resizeStart.current = { x: e.clientX, y: e.clientY, width, height: Math.round(width * ASPECT) }
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }
  const onResizeMove = (e: React.PointerEvent) => {
    if (!resizing || !resizeStart.current) return
    const dx = e.clientX - resizeStart.current.x
    // Only use dx to change width (bottom-right handle)
    const nextWRaw = resizeStart.current.width + dx
    const w = typeof window !== "undefined" ? window.innerWidth : 1200
    const maxW = Math.min(Math.round(w * 0.9), 1100)
    const minW = 320
    const nextW = Math.max(minW, Math.min(maxW, nextWRaw))
    setWidth(nextW)
    // Clamp position so it stays in viewport
    setPos(p => clamp({ left: p.left, top: p.top, width: nextW }))
  }
  const onResizeEnd = (e: React.PointerEvent) => {
    setResizing(false)
    resizeStart.current = null
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
  }

  return (
    <aside
      ref={containerRef}
      className="corner-video"
      style={{ left: pos.left, top: pos.top, width, height: Math.round(width * ASPECT) }}
    >
      <header onPointerDown={onDragStart} onPointerMove={onDragMove} onPointerUp={onDragEnd}>
        <button aria-label="Close video" onClick={onClose}>
          ×
        </button>
      </header>
      <video
        ref={ref}
        src={url}
        className="h-full w-full object-cover"
        controls
        autoPlay
        playsInline
        preload="metadata"
      >
        {title ? <track kind="captions" label={title} /> : null}
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
