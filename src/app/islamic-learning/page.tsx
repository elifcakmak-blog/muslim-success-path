'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const resources = [
  { icon: '📗', title: 'Becoming Muslim As A Revert', desc: 'A compassionate, comprehensive guide for those who have just embraced Islam — covering the essentials with warmth and clarity. Available on Wattpad and in our store.', tags: ['Reverts', 'New Muslims', 'Essential'] },
  { icon: '🤲', title: 'Muslim Prayer Basics', desc: 'A clear, step-by-step guide to salah for Muslims of all ages — from wudu to the meaning behind every movement. A practical companion for consistent worship.', tags: ['Salah', 'All Ages', 'Guide'] },
  { icon: '🎙️', title: 'Podcast', desc: 'Faith reflections, life lessons, and Islamic knowledge — one conversation at a time. Available on Spotify and YouTube.', tags: ['Audio', 'Spotify', 'Reflection'] },
  { icon: '▶️', title: 'YouTube Series', desc: 'Video lessons covering Islamic knowledge, crochet tutorials, productivity, and everyday Muslim life — new content every week.', tags: ['Video', 'YouTube', 'Series'] },
  { icon: '🎓', title: 'Courses', desc: 'Structured learning paths for deep, transformative understanding of Islam — from foundational beliefs to Quran reading and Islamic mindset.', tags: ['Structured', 'Self-Paced', 'Transformative'] },
  { icon: '🌙', title: 'Ramadan Resources', desc: 'Dedicated tools and guides to help you make the most of the blessed month — worship planning, reflection journals, and daily goals.', tags: ['Ramadan', 'Worship', 'Planning'] },
]

export default function IslamicLearningPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      {/* Hero */}
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Books · Podcasts · Courses · Quran</div>
          <h1>
            <span className="gold">Knowledge</span> is<br />
            an Act of Worship
          </h1>
          <p className="hero-sub">
            Explore books, podcasts, YouTube series, and courses designed to deepen your understanding of Islam — including <em>Becoming Muslim As A Revert</em> and <em>Muslim Prayer Basics</em> — whether you&apos;re new to the faith or deepening your practice.
          </p>
          <div className="hero-actions">
            <Link href="/books" className="btn-gold">Browse Books →</Link>
            <Link href="/courses" className="btn-outline">Explore Courses</Link>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Learning Resources</div>
            <h2 className="s-title">Every Path to<br />Knowledge</h2>
            <p className="s-sub">Resources for every stage of the journey — from first steps to deepening practice.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {resources.map((r) => (
              <div className="pillar" key={r.title}>
                <span className="pillar-icon">{r.icon}</span>
                <div className="pillar-title">{r.title}</div>
                <p className="pillar-desc">{r.desc}</p>
                <div className="pillar-tags">{r.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Jump To</div>
            <h2 className="s-title">Find What You Need</h2>
          </div>
          <div className="res-grid reveal" style={{ marginTop: 40 }}>
            {[
              { icon: '📖', name: 'Books',   href: '/books' },
              { icon: '🎙️', name: 'Podcasts', href: '/podcasts' },
              { icon: '▶️', name: 'Videos',  href: '/videos' },
              { icon: '🎓', name: 'Courses', href: '/courses' },
            ].map(l => (
              <Link href={l.href} className="res-card" key={l.name}>
                <span className="res-icon">{l.icon}</span>
                <div className="res-name">{l.name}</div>
                <div className="res-link">Explore →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
