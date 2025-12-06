'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useData } from '@/context/DataContext'
import Connections from '@/components/Connections'

import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Home() {
  const { domains, hostings, providers } = useData()
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  // Force re-render for connections after mount
  const [, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 3.5, // Wait for intro
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <div ref={containerRef} className="pb-20 relative min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Dashboard
        </h1>
        <div className="flex gap-4 mt-6 md:mt-0">
          <Link href="/domains/new">
            <Button className="text-sm px-6 py-3">Add Domain</Button>
          </Link>
          <Link href="/hosting/new">
            <Button variant="secondary" className="text-sm px-6 py-3">Add Hosting</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {domains.map((domain, index) => {
          const provider = providers.find((p) => p.id === domain.providerId)
          const hostingProvider = providers.find((p) => p.id === hostings.find(h => h.id === domain.hostingId)?.providerId)

          return (
            <div
              key={domain.id}
              id={`domain-${domain.id}`}
              ref={addToRefs}
              className="group relative bg-secondary/20 border border-white/10 p-8 rounded-2xl overflow-hidden hover:bg-secondary/40 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl font-bold">
                {index + 1}
              </div>
              
              <div className="relative z-10">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                  domain.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {domain.status.toUpperCase()}
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{domain.name}</h2>
                <p className="text-sm text-gray-400 mb-6">Expires: {domain.expiryDate}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Domain Provider</span>
                    <span>{provider?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hosting</span>
                    <span>{hostingProvider?.name || 'None'}</span>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          )
        })}
      </div>

      <h2 className="text-3xl md:text-5xl font-bold mb-8 mt-20 tracking-tighter relative z-10">
        Hosting Plans
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {hostings.map((hosting, index) => {
          const provider = providers.find((p) => p.id === hosting.providerId)
          
          return (
            <div
              key={hosting.id}
              id={`hosting-${hosting.id}`}
              className="group relative bg-secondary/20 border border-white/10 p-8 rounded-2xl overflow-hidden hover:bg-secondary/40 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">{hosting.name}</h2>
                <p className="text-sm text-gray-400 mb-6">Expires: {hosting.expiryDate}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Provider</span>
                    <span>{provider?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">IP Address</span>
                    <span>{hosting.ipAddress || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Render Connections */}
      {domains.map((domain) => {
        if (domain.hostingId) {
          return (
            <Connections
              key={`${domain.id}-${domain.hostingId}`}
              fromId={`domain-${domain.id}`}
              toId={`hosting-${domain.hostingId}`}
              containerRef={containerRef}
            />
          )
        }
        return null
      })}
    </div>
  )
}
