'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const apps = [
  { icon: '🕌', title: 'Prayer Tracker', desc: 'Track your five daily prayers with ease — build consistency and celebrate your streaks.', tags: ['Salah', 'Habits', 'Tracking'], status: 'Coming Soon' },
  { icon: '📿', title: 'Dhikr Counter', desc: 'A beautiful, distraction-free digital tasbih for your daily remembrance of Allah.', tags: ['Dhikr', 'Tasbih', 'Mindfulness'], status: 'Coming Soon' },
  { icon: '📖', title: 'Quran Journal', desc: 'Read, reflect, and journal your Quran study — with prompts and progress tracking built in.', tags: ['Quran', 'Journal', 'Study'], status: 'Coming Soon' },
  { icon: '🌙', title: 'Ramadan Companion App', desc: 'Your complete Ramadan planner — prayer times, iftar countdowns, daily goals, and reflections.', tags: ['Ramadan', 'Planner', 'Worship'], status: 'Coming Soon' },
  { icon: '💼', title: 'Halal Finance Tracker', desc: 'Track your income, expenses, and sadaqah — a simple halal money management tool.', tags: ['Finance', 'Halal', 'Budgeting'], status: 'Coming Soon' },
  { icon: '🎯', title: 'Muslim Goal Planner', desc: 'Set and track both dunya and akhirah goals — a planning system built on Islamic values.', tags: ['Goals', 'Planning', 'Growth'], status: 'Coming Soon' },
]

export default function AppsPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Digital Tools for Muslim Life</div>
          <h1>
            Apps Built for<br />
            <span className="gold">Your Journey</span>
          </h1>
          <p className="hero-sub">
            Digital tools designed around the Muslim lifestyle — making it easier to worship, grow, and stay intentional every single day.
          </p>
          <div className="hero-actions">
            <Link href="/roadmap" className="btn-gold">See What's Coming →</Link>
            <Link href="/#newsletter" className="btn-outline">Get Notified</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Upcoming Apps</div>
            <h2 className="s-title">Tools in<br />Development</h2>
            <p className="s-sub">We're building a suite of apps to support your Islamic lifestyle — subscribe to be first to know when they launch.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {apps.map((a) => (
              <div className="pillar" key={a.title} style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', top: 16, right: 52,
                  fontSize: '.62rem', fontWeight: 700, letterSpacing: '.08em',
                  textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4,
                  background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.25)',
                  color: 'var(--teal)'
                }}>Coming Soon</span>
                <span className="pillar-icon">{a.icon}</span>
                <div className="pillar-title">{a.title}</div>
                <p className="pillar-desc">{a.desc}</p>
                <div className="pillar-tags">{a.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Follow Development */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Follow Along</div>
            <h2 className="s-title">Track Our Progress</h2>
            <p className="s-sub">Follow our development journey — from open-source work to product announcements and community updates.</p>
          </div>
          <div className="res-grid reveal" style={{ marginTop: 40 }}>
            {[
              { icon: '💻', name: 'GitHub',    href: 'https://github.com/Muslim-Success-Path',                     desc: 'Follow our open-source work on GitHub',         link: 'Explore →' },
              { icon: '💼', name: 'LinkedIn',  href: 'https://www.linkedin.com/company/muslim-success-path/about', desc: 'Professional updates and launch announcements', link: 'Follow →' },
              { icon: '📸', name: 'Instagram', href: 'https://www.instagram.com/muslim.success.path',              desc: "Behind-the-scenes of what we're building",      link: 'Follow →' },
              { icon: '✖️', name: 'X',         href: 'https://x.com/muslimsuccess_',                               desc: 'Real-time updates and community conversations', link: 'Follow →' },
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
          <span className="nl-icon">📱</span>
          <h2 className="nl-title">Be First to Know</h2>
          <p className="nl-sub">Subscribe to the newsletter and get notified the moment our apps launch.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link href="/#newsletter" className="btn-gold">Join the Newsletter →</Link>
            <Link href="/" className="btn-outline">← Back Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
