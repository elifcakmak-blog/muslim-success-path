'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

import { courses } from '@/data/siteData'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

export default function CoursesPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Self-Paced · Structured · Transformative</div>
          <h1>
            Learn with<br />
            <span className="gold">Structure</span>
          </h1>
          <p className="hero-sub">
            Courses designed to take you from where you are to where you want to be — grounded in Islamic values and built for real life.
          </p>
          <div className="hero-actions">
            <a href="https://www.effortlessworks.store/" target="_blank" rel="noopener noreferrer" className="btn-gold">Browse Courses →</a>
            <Link href="/books" className="btn-outline">Explore Books</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Our Courses</div>
            <h2 className="s-title">Structured<br />Learning Paths</h2>
            <p className="s-sub">Each course is a complete journey — from the first lesson to lasting transformation.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {courses.map((c) => (
              <div className="pillar" key={c.title} style={{ position: 'relative' }}>
                {c.status === 'Coming Soon' && (
                  <span style={{
                    position: 'absolute', top: 16, right: 52,
                    fontSize: '.62rem', fontWeight: 700, letterSpacing: '.08em',
                    textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4,
                    background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)',
                    color: 'var(--purple)'
                  }}>Coming Soon</span>
                )}
                <span className="pillar-icon">{c.icon}</span>
                <div className="pillar-title">{c.title}</div>
                <p className="pillar-desc">{c.desc}</p>
                <div className="pillar-tags">{c.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="nl-glow" />
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="nl-icon">🎓</span>
          <h2 className="nl-title">Enroll Today</h2>
          <p className="nl-sub">Start your learning journey — new courses added regularly. Sign up to be notified first.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href="https://www.effortlessworks.store/" target="_blank" rel="noopener noreferrer" className="btn-gold">View Courses →</a>
            <Link href="/" className="btn-outline">← Back Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
