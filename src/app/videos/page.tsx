'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const series = [
  { icon: '🧶', title: 'Crochet Tutorials', desc: 'Step-by-step video walkthroughs for every crochet pattern — watch, pause, rewind, and create.', tags: ['Crochet', 'Tutorial', 'All Levels'] },
  { icon: '🌙', title: 'Islamic Knowledge', desc: 'Short and long-form videos on Islamic history, fiqh, seerah, and everyday Muslim questions.', tags: ['Knowledge', 'Education', 'Islam'] },
  { icon: '💼', title: 'Productive Muslim', desc: 'Videos on time management, goal setting, and building routines as a practicing Muslim.', tags: ['Productivity', 'Routine', 'Goals'] },
  { icon: '📖', title: 'Quran Reflections', desc: 'Reflective walkthroughs of Quranic verses — with context, tafsir insights, and practical takeaways.', tags: ['Quran', 'Reflection', 'Tafsir'] },
  { icon: '🎬', title: 'Behind the Scenes', desc: 'A look inside the creative process — from pattern design to book writing to content creation.', tags: ['BTS', 'Creative', 'Process'] },
  { icon: '📿', title: 'New Muslim Series', desc: 'A dedicated video series for those new to Islam — answering common questions with warmth and clarity.', tags: ['New Muslims', 'Reverts', 'Series'] },
]

export default function VideosPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ YouTube · Tutorials · Series</div>
          <h1>
            Watch &amp;<br />
            <span className="gold">Be Inspired</span>
          </h1>
          <p className="hero-sub">
            From crochet tutorials to Islamic knowledge and productivity — our YouTube channel has something for every Muslim.
          </p>
          <div className="hero-actions">
            <a href="https://www.youtube.com/@MuslimSuccessPath" target="_blank" rel="noopener noreferrer" className="btn-gold">Watch on YouTube →</a>
            <Link href="/podcasts" className="btn-outline">Listen to Podcasts</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Video Series</div>
            <h2 className="s-title">What We<br />Create</h2>
            <p className="s-sub">Content that educates, inspires, and empowers — made with intention for the Muslim community.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {series.map((s) => (
              <div className="pillar" key={s.title}>
                <span className="pillar-icon">{s.icon}</span>
                <div className="pillar-title">{s.title}</div>
                <p className="pillar-desc">{s.desc}</p>
                <div className="pillar-tags">{s.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Watch */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Find Us On</div>
            <h2 className="s-title">Where to Watch</h2>
            <p className="s-sub">Subscribe on your favourite platform — new content added regularly across all channels.</p>
          </div>
          <div className="res-grid reveal" style={{ marginTop: 40 }}>
            {[
              { icon: '▶️', name: 'YouTube',   href: 'https://www.youtube.com/@MuslimSuccessPath',     desc: 'Full tutorials, series, and Islamic content on YouTube', link: 'Subscribe →' },
              { icon: '🎵', name: 'TikTok',    href: 'https://www.tiktok.com/@muslim.success.path',    desc: 'Short-form content and quick lessons on TikTok',         link: 'Follow →' },
              { icon: '📸', name: 'Instagram', href: 'https://www.instagram.com/muslim.success.path',  desc: 'Reels, stories, and behind-the-scenes on Instagram',     link: 'Follow →' },
              { icon: '✖️', name: 'X',         href: 'https://x.com/muslimsuccess_',                   desc: 'Updates, clips, and community conversations on X',       link: 'Follow →' },
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
          <span className="nl-icon">▶️</span>
          <h2 className="nl-title">Subscribe Today</h2>
          <p className="nl-sub">New videos every week across YouTube, TikTok, and Instagram — subscribe and never miss a lesson.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href="https://www.youtube.com/@MuslimSuccessPath" target="_blank" rel="noopener noreferrer" className="btn-gold">YouTube Channel →</a>
            <Link href="/" className="btn-outline">← Back Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
