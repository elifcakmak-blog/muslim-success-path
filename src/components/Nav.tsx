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
          <svg width="58" height="48" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <defs>
              <mask id="navCrescentMask">
                <circle cx="75" cy="80" r="62" fill="white" />
                <circle cx="98" cy="68" r="50" fill="black" />
              </mask>
            </defs>
            <circle cx="75" cy="80" r="62" fill="#F5C842" mask="url(#navCrescentMask)" />
            <g transform="translate(148, 52)">
              <animateTransform attributeName="transform" additive="sum" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
              <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize="72" fill="#F5C842" fontFamily="serif">✦</text>
            </g>
          </svg>
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