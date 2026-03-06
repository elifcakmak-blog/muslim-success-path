'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

import { episodes } from '@/data/siteData'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

export default function PodcastsPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Faith · Reflection · Real Conversations</div>
          <h1>
            Listen &amp;<br />
            <span className="gold">Reflect</span>
          </h1>
          <p className="hero-sub">
            A podcast for Muslims navigating faith, identity, and intentional living — one conversation at a time.
          </p>
          <div className="hero-actions">
            <a href="https://www.youtube.com/@MuslimSuccessPath" target="_blank" rel="noopener noreferrer" className="btn-gold">Listen Now →</a>
            <Link href="/videos" className="btn-outline">Watch on YouTube</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Episode Themes</div>
            <h2 className="s-title">Topics We<br />Cover</h2>
            <p className="s-sub">Real conversations about faith, life, and growth — no fluff, just intention.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {episodes.map((e) => (
              <div className="pillar" key={e.title}>
                <span className="pillar-icon">{e.icon}</span>
                <div className="pillar-title">{e.title}</div>
                <p className="pillar-desc">{e.desc}</p>
                <div className="pillar-tags">{e.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Listen */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Available On</div>
            <h2 className="s-title">Where to Listen</h2>
            <p className="s-sub">Subscribe on your favourite platform and never miss an episode.</p>
          </div>
          <div className="res-grid reveal" style={{ marginTop: 40 }}>
            {[
              { icon: '🎧', name: 'Spotify',        href: 'https://open.spotify.com/show/4DmkzfJ7DqrmwTopi3J9Rr', desc: 'Stream every episode on Spotify',    link: 'Listen →' },
              { icon: '▶️', name: 'YouTube',         href: 'https://www.youtube.com/@MuslimSuccessPath',           desc: 'Watch and listen on YouTube',       link: 'Watch →' },
              { icon: '🎵', name: 'Apple Podcasts',  href: '#',                                                     desc: 'Coming soon to Apple Podcasts',     link: 'Soon →' },
              { icon: '📢', name: 'Audible',         href: '#',                                                     desc: 'Coming soon to Audible',           link: 'Soon →' },
              { icon: '🛒', name: 'Amazon Music',    href: '#',                                                     desc: 'Coming soon to Amazon Music',       link: 'Soon →' },
            ].map(l => (
              <a href={l.href} className="res-card" key={l.name} target="_blank" rel="noopener noreferrer">
                <span className="res-icon">{l.icon}</span>
                <div className="res-name">{l.name}</div>
                <div className="res-desc">{l.desc}</div>
                <div className="res-link">{l.link}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="nl-glow" />
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="nl-icon">🎙️</span>
          <h2 className="nl-title">Start Listening</h2>
          <p className="nl-sub">Available on Spotify, YouTube, and major podcast platforms — subscribe so you never miss an episode.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href="https://open.spotify.com/show/4DmkzfJ7DqrmwTopi3J9Rr" target="_blank" rel="noopener noreferrer" className="btn-gold">Listen on Spotify →</a>
            <a href="https://www.youtube.com/@MuslimSuccessPath" target="_blank" rel="noopener noreferrer" className="btn-outline">YouTube</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
