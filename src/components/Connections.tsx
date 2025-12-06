'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface ConnectionProps {
  fromId: string
  toId: string
  containerRef: React.RefObject<HTMLDivElement | null>
}

export default function Connections({ fromId, toId, containerRef }: ConnectionProps) {
  const [path, setPath] = useState('')
  const pathRef = useRef<SVGPathElement>(null)

  const updatePath = () => {
    if (!containerRef.current) return

    const fromEl = document.getElementById(fromId)
    const toEl = document.getElementById(toId)
    const containerRect = containerRef.current.getBoundingClientRect()

    if (fromEl && toEl) {
      const fromRect = fromEl.getBoundingClientRect()
      const toRect = toEl.getBoundingClientRect()

      // Calculate relative coordinates
      const startX = fromRect.left + fromRect.width / 2 - containerRect.left
      const startY = fromRect.bottom - containerRect.top
      const endX = toRect.left + toRect.width / 2 - containerRect.left
      const endY = toRect.top - containerRect.top

      // Create a curved path
      const controlY = startY + (endY - startY) / 2
      
      const d = `M ${startX} ${startY} C ${startX} ${controlY}, ${endX} ${controlY}, ${endX} ${endY}`
      setPath(d)
    }
  }

  useEffect(() => {
    // Initial update
    // Delay slightly to ensure layout is complete
    const timer = setTimeout(updatePath, 1000)
    
    // Update on resize
    window.addEventListener('resize', updatePath)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updatePath)
    }
  }, [fromId, toId, containerRef])

  useEffect(() => {
    if (path && pathRef.current) {
      const length = pathRef.current.getTotalLength()
      
      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        delay: 4.5, // Wait for cards to appear
      })
    }
  }, [path])

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="2"
        className="opacity-50"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#ff0055" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  )
}
