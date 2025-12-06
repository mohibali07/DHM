'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Header() {
  const pathname = usePathname()
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2 } // Delay for Intro
    )
  }, [])

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Domains', path: '/domains' },
    { name: 'Hosting', path: '/hosting' },
    { name: 'Settings', path: '/settings' },
  ]

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 px-10 py-6 flex justify-between items-center mix-blend-difference text-white"
    >
      <div className="text-2xl font-bold tracking-tighter uppercase">
        DHM<span className="text-accent">.</span>
      </div>
      <nav>
        <ul className="flex gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`text-sm uppercase tracking-widest hover:text-accent transition-colors ${
                  pathname === item.path ? 'text-accent' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
