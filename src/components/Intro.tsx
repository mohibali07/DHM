'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Intro() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setComplete(true),
    })

    tl.to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    })
      .to(textRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: 'power3.in',
      })
      .to(containerRef.current, {
        y: '-100%',
        duration: 1,
        ease: 'power4.inOut',
      })
  }, [])

  if (complete) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center text-black"
    >
      <div className="overflow-hidden">
        <h1
          ref={textRef}
          className="text-6xl md:text-9xl font-bold uppercase tracking-tighter opacity-0 translate-y-20"
        >
          Domain Manager
        </h1>
      </div>
    </div>
  )
}
