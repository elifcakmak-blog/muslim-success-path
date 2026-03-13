'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  const closeMenu = () => {
    setMenuOpen(false)
    setResourcesOpen(false)
  }

  return (
    <>
      <nav className={scrolled ? 'nav scrolled' : 'nav'}>
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {/* Crescent moon */}
            <svg width="18" height="18" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <defs>
                <mask id="navCrescentMask">
                  <circle cx="18" cy="20" r="13" fill="white" />
                  <circle cx="25" cy="16" r="10.5" fill="black" />
                </mask>
              </defs>
              <circle cx="18" cy="20" r="13" fill="#F5C842" mask="url(#navCrescentMask)" />
            </svg>
            {/* Spinning star */}
            <svg width="10" height="10" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spinStar 12s linear infinite', flexShrink: 0 }}>
              <polygon points="11,0 13.1,7.5 20.5,7.5 14.7,12.1 16.8,19.6 11,15 5.2,19.6 7.3,12.1 1.5,7.5 8.9,7.5" fill="#F5C842" />
            </svg>
          </span>
          <span style={{ whiteSpace: 'nowrap' }}>Muslim Success Path</span>
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          <Link href="/crocheting">Crocheting</Link>
          <Link href="/islamic-learning">Islamic Learning</Link>
          <Link href="/organize">Organize</Link>
          <div className="nav-dropdown">
            <span style={{ whiteSpace: 'nowrap' }}>Resources ▾</span>
            <div className="nav-dropdown-menu">
              <div className="nav-dropdown-menu-inner">
                <Link href="/books">📖 Books</Link>
                <Link href="/podcasts">🎙️ Podcasts</Link>
                <Link href="/videos">▶️ Videos</Link>
                <Link href="/courses">🎓 Courses</Link>
                <Link href="/apps">📱 Apps</Link>
                <Link href="/roadmap">🗺️ Roadmap</Link>
              </div>
            </div>
          </div>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/#newsletter" className="nav-cta">Newsletter</Link>
        </div>

        {/* Hamburger button */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? 'ham-bar bar1 open' : 'ham-bar bar1'} />
          <span className={menuOpen ? 'ham-bar bar2 open' : 'ham-bar bar2'} />
          <span className={menuOpen ? 'ham-bar bar3 open' : 'ham-bar bar3'} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={menuOpen ? 'mobile-menu open' : 'mobile-menu'}>
        <Link href="/crocheting"        className="mobile-link" onClick={closeMenu}>Crocheting</Link>
        <Link href="/islamic-learning"  className="mobile-link" onClick={closeMenu}>Islamic Learning</Link>
        <Link href="/organize"          className="mobile-link" onClick={closeMenu}>Organize</Link>

        {/* Resources accordion */}
        <button
          className="mobile-link mobile-accordion"
          onClick={() => setResourcesOpen(!resourcesOpen)}
        >
          Resources <span style={{ marginLeft: 'auto', transition: 'transform .2s', display: 'inline-block', transform: resourcesOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
        </button>
        {resourcesOpen && (
          <div className="mobile-sub">
            <Link href="/books"    className="mobile-sub-link" onClick={closeMenu}>📖 Books</Link>
            <Link href="/podcasts" className="mobile-sub-link" onClick={closeMenu}>🎙️ Podcasts</Link>
            <Link href="/videos"   className="mobile-sub-link" onClick={closeMenu}>▶️ Videos</Link>
            <Link href="/courses"  className="mobile-sub-link" onClick={closeMenu}>🎓 Courses</Link>
            <Link href="/apps"     className="mobile-sub-link" onClick={closeMenu}>📱 Apps</Link>
            <Link href="/roadmap"  className="mobile-sub-link" onClick={closeMenu}>🗺️ Roadmap</Link>
          </div>
        )}

        <Link href="/about"        className="mobile-link" onClick={closeMenu}>About</Link>
        <Link href="/contact"      className="mobile-link" onClick={closeMenu}>Contact</Link>
        <Link href="/#newsletter"  className="mobile-link mobile-cta" onClick={closeMenu}>Newsletter ✦</Link>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className="mobile-backdrop" onClick={closeMenu} />}
    </>
  )
}