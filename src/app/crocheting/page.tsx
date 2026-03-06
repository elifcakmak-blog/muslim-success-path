'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { patterns, featuredCrochet as featured } from '@/data/siteData'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

export default function CrochetingPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      {/* Hero */}
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh', alignItems: 'center' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Handmade · Modest · Intentional</div>
          <h1>
            Crochet with<br />
            <span className="gold">Purpose</span>
          </h1>
          <p className="hero-sub">
            Every stitch is an act of intention. Discover crochet and Sentro knitting machine patterns — hijabs, abayas, skirts, handbags, and prayer accessories — with step-by-step video guides and a handmade Etsy shop.
          </p>
          <div className="hero-actions">
            <a href="https://www.etsy.com/shop/EffortlessWorks" target="_blank" rel="noopener noreferrer" className="btn-gold">Shop on Etsy →</a>
            <a href="https://www.youtube.com/@MuslimSuccessPath" target="_blank" rel="noopener noreferrer" className="btn-outline">Watch Tutorials</a>
          </div>
        </div>
      </section>

      {/* Patterns Grid */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">What We Offer</div>
            <h2 className="s-title">Patterns &amp; Pieces</h2>
            <p className="s-sub">From beginner-friendly hijab patterns to intricate prayer accessories — everything made with care.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {patterns.map((p, i) => (
              <div className="pillar" key={p.title} style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="pillar-icon">{p.icon}</span>
                <div className="pillar-title">{p.title}</div>
                <p className="pillar-desc">{p.desc}</p>
                <div className="pillar-tags">{p.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">In the Shop</div>
            <h2 className="s-title">Featured Pieces</h2>
            <p className="s-sub">Handmade pieces available now in the Etsy shop — each one crafted with care.</p>
          </div>
          <div className="res-grid reveal" style={{ marginTop: 40 }}>
            {featured.map(f => (
              <a href="https://www.etsy.com/shop/EffortlessWorks" className="res-card" key={f.title} target="_blank" rel="noopener noreferrer">
                <span className="res-icon">🧶</span>
                <div className="res-name">{f.title}</div>
                <div className="res-desc">{f.desc}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {f.tags.map(t => <span className="ptag" key={t}>{t}</span>)}
                </div>
                <div className="res-link" style={{ marginTop: 12 }}>Shop on Etsy →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="newsletter" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="nl-glow" />
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="nl-icon">🧶</span>
          <h2 className="nl-title">Start Crocheting</h2>
          <p className="nl-sub">Browse the full pattern library and handmade shop — new designs added regularly.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href="https://www.etsy.com/shop/EffortlessWorks" target="_blank" rel="noopener noreferrer" className="btn-gold">Visit Etsy Shop →</a>
            <Link href="/" className="btn-outline">← Back Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
