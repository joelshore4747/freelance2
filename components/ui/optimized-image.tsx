"use client"

import Image, { ImageProps } from "next/image"
import { useMemo } from "react"

type OptimizedImageProps = Omit<ImageProps, "placeholder"> & {
  // Optional low-quality placeholder data URL to avoid layout shift
  lqipDataURL?: string
}

/**
 * Drop-in wrapper around next/image with sane defaults:
 * - lazy loads by default
 * - supports `fill` when width/height unknown
 * - sets decoding and fetch priority automatically
 */
export function OptimizedImage({
  alt,
  className,
  priority,
  lqipDataURL,
  sizes,
  ...rest
}: OptimizedImageProps) {
  const decoding = priority ? "sync" : "async"
  const fetchPriority = priority ? "high" : "auto"

  // Default sizes for responsive images if not provided
  const computedSizes = useMemo(() => {
    if (sizes) return sizes
    return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  }, [sizes])

  return (
    <Image
      {...rest}
      alt={alt}
      className={className}
      sizes={computedSizes}
      priority={priority}
      decoding={decoding as any}
      fetchPriority={fetchPriority as any}
      placeholder={lqipDataURL ? "blur" : undefined}
      blurDataURL={lqipDataURL}
    />
  )
}

export default OptimizedImage

