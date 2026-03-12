'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

const socials = [
  {
    href: 'https://www.instagram.com/muslim.success.path',
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#F5C842" stroke="none"/>
      </svg>
    ),
  },
  {
    href: 'https://www.tiktok.com/@muslim.success.path',
    label: 'TikTok',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5C842">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.youtube.com/@MuslimSuccessPath',
    label: 'YouTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5C842">
        <rect x="2" y="5" width="20" height="14" rx="4"/>
        <polygon points="10,9 16,12 10,15" fill="black"/>
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/company/muslim-success-path/about',
    label: 'LinkedIn',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5C842">
        <rect x="2" y="2" width="20" height="20" rx="3"/>
        <rect x="6" y="10" width="2.5" height="8" fill="black"/>
        <circle cx="7.25" cy="7.25" r="1.5" fill="black"/>
        <path d="M12 10h2.5v1.5s.5-1.5 2.5-1.5 3 1 3 3.5V18h-2.5v-4c0-1-.5-2-1.5-2s-1.5 1-1.5 2v4H12V10z" fill="black"/>
      </svg>
    ),
  },
  {
    href: 'https://x.com/muslimsuccess_',
    label: 'X',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5C842">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const router = useRouter()
  const pathname = usePathname()

  const handleNewsletter = (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname === '/') {
      // Already on home — just scroll and glow without touching history
      const el = document.getElementById('newsletter')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      // Dispatch a custom event that page.tsx listens for
      window.dispatchEvent(new CustomEvent('highlight-newsletter'))
    } else {
      // On another page — navigate home with the highlight param
      router.push('/?highlight=newsletter')
    }
  }

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="nav-logo" style={{ display: 'inline-flex' }}>
            <span className="star">✦</span> Muslim Success Path
          </Link>
          <p>Faith-centered resources for learning, creating, and living with intention — every step of the way.</p>
          <div className="socials">
            {socials.map(s => (
              <a href={s.href} key={s.href} className="social-btn" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-cols-row">
        <div className="footer-col">
          <h4>Explore</h4>
          <Link href="/crocheting">Crocheting</Link>
          <Link href="/islamic-learning">Islamic Resources</Link>
          <Link href="/organize">Organization</Link>
          <Link href="/roadmap">Roadmap</Link>
          <a href="#" onClick={handleNewsletter} style={{ cursor: 'pointer' }}>Newsletter</a>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <Link href="/apps">Apps</Link>
          <Link href="/books">Books</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/podcasts">Podcasts</Link>
          <Link href="/videos">Videos</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <a href="https://www.effortlessworks.store/" target="_blank" rel="noopener noreferrer">Effortless Works</a>
          <a href="https://www.effortless.quest/" target="_blank" rel="noopener noreferrer">Effortless Quest</a>
          <a href="https://www.etsy.com/shop/EffortlessWorks" target="_blank" rel="noopener noreferrer">Etsy Shop</a>
          <a href="https://www.effortless.quest/#luma" target="_blank" rel="noopener noreferrer">Luma AI</a>
        </div>
        </div>{/* end footer-cols-row */}
      </div>{/* end footer-grid */}

      <div className="footer-bottom">
        <span>
          © 2024{' '}
          <Link href="/" className="footer-dim-link">Muslim Success Path</Link>
          {' · '}
          <a href="https://www.effortlessworks.store/" target="_blank" rel="noopener noreferrer" className="footer-dim-link">Effortless Works</a>
          {' · '}
          <a href="https://www.effortless.quest/" target="_blank" rel="noopener noreferrer" className="footer-dim-link">Effortless Quest</a>
          {' · '}
          <a href="https://www.effortless.quest/#luma" target="_blank" rel="noopener noreferrer" className="footer-dim-link">Luma AI</a>
          {' · '}All rights reserved.
        </span>
        <div className="footer-legal">
          <Link href="/terms" className="footer-dim-link">Terms of Service</Link>
          <Link href="/privacy-policy" className="footer-dim-link">Privacy Policy</Link>
          <Link href="/cookies" className="footer-dim-link">Cookie Policy</Link>
          <Link href="/disclaimer" className="footer-dim-link">Disclaimer</Link>
          <Link href="/return-policy" className="footer-dim-link">Return Policy</Link>
        </div>
      </div>
    </footer>
  )
}