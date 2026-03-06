'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={scrolled ? 'nav scrolled' : 'nav'}>
      <Link href="/" className="nav-logo">
        <span className="star">✦</span>
        Muslim Success Path
      </Link>
      <div className="nav-links">
        <Link href="/crocheting">Crocheting</Link>
        <Link href="/islamic-learning">Islamic Learning</Link>
        <Link href="/organize">Organize</Link>

        {/* Resources dropdown */}
        <div className="nav-dropdown">
          <span>Resources ▾</span>
          <div className="nav-dropdown-menu">
            <Link href="/books">📖 Books</Link>
            <Link href="/podcasts">🎙️ Podcasts</Link>
            <Link href="/videos">▶️ Videos</Link>
            <Link href="/courses">🎓 Courses</Link>
            <Link href="/apps">📱 Apps</Link>
            <Link href="/roadmap">🗺️ Roadmap</Link>
          </div>
        </div>

        <Link href="/about">About</Link>
        <Link href="/#newsletter" className="nav-cta">Newsletter</Link>
      </div>
    </nav>
  )
}
