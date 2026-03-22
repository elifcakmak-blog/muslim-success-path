'use client'
import { useEffect, useRef, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Pipeline from '@/components/Pipeline'
import Footer from '@/components/Footer'
import ParallaxStars from '@/components/ParallaxStars'
import { books, tools, courses, episodes, featuredCrochet, videos, apps, etsySales, newsletterSubs } from '@/data/siteData'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

// ── Stats count-up hook ──
function useCountUp(target: number, triggered: boolean, suffix = '+') {
  const [val, setVal] = useState('0' + suffix)
  useEffect(() => {
    if (!triggered || target === 0) { setVal('0' + suffix); return }
    let cur = 0
    const step = Math.ceil(target / 40)
    const iv = setInterval(() => {
      cur = Math.min(cur + step, target)
      setVal(cur + suffix)
      if (cur >= target) clearInterval(iv)
    }, 35)
    return () => clearInterval(iv)
  }, [triggered, target, suffix])
  return val
}

// Separate component for useSearchParams (must be wrapped in Suspense)
function HighlightHandler({ onHighlight }: { onHighlight: () => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('highlight') === 'newsletter') {
      const el = document.getElementById('newsletter')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => onHighlight(), 600)
      }
      window.history.replaceState({}, '', '/')
    }
  }, [searchParams, onHighlight])

  return null
}

export default function Home() {
  const [scrolled, setScrolled]   = useState(false)
  const [statsVis, setStatsVis]   = useState(false)
  const [nlStatus, setNlStatus] = useState<'idle'|'ok'|'err'|'noName'|'noEmail'>('idle')
  const [nlEmail,  setNlEmail]    = useState('')
  const [nlName, setNlName] = useState('')
  const [homeMenuOpen, setHomeMenuOpen] = useState(false)
  const [nlHighlight, setNlHighlight] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  // Reveal on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll reveal for .reveal elements
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: .1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Stats visibility
  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true) }, { threshold: .3 })
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  const stat1 = useCountUp(featuredCrochet.length, statsVis)
  const stat2 = useCountUp(books.length,           statsVis)
  const stat3 = useCountUp(tools.length,           statsVis)
  const stat4 = useCountUp(videos.length,          statsVis)
  const stat5 = useCountUp(episodes.length,        statsVis)
  const stat6 = useCountUp(apps.length,            statsVis)
  const stat7 = useCountUp(courses.length,         statsVis)
  const stat8 = useCountUp(etsySales,              statsVis)
  const stat9 = useCountUp(6,                      statsVis)
  const stat10 = useCountUp(newsletterSubs, statsVis)




  // Listen for highlight event when already on home page (triggered by Footer)
  useEffect(() => {
    const handler = () => {
      setNlHighlight(true)
      setTimeout(() => setNlHighlight(false), 3000)
    }
    window.addEventListener('highlight-newsletter', handler)
    return () => window.removeEventListener('highlight-newsletter', handler)
  }, [])

  const handleNewsletter = async () => {
  if (!nlName.trim()) {
    setNlStatus('noName')
    setTimeout(() => setNlStatus('idle'), 3000)
    return
  }
  if (!nlEmail || !nlEmail.includes('@')) {
    setNlStatus('noEmail')
    setTimeout(() => setNlStatus('idle'), 3000)
    return
  }
  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: nlEmail, name: nlName }),
    })
    if (res.ok) {
      setNlStatus('ok')
      setNlEmail('')
      setNlName('')
    } else {
      setNlStatus('err')
      setTimeout(() => setNlStatus('idle'), 3000)
    }
  } catch {
    setNlStatus('err')
    setTimeout(() => setNlStatus('idle'), 3000)
  }
}


  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Suspense fallback={null}>
        <HighlightHandler onHighlight={() => { setNlHighlight(true); setTimeout(() => setNlHighlight(false), 3000) }} />
      </Suspense>

      {/* ── NAV ── */}
      <nav className={scrolled ? 'nav scrolled' : 'nav'}>
        <a href="#" className="nav-logo">
          <svg width="58" height="48" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <defs>
              <mask id="homeCrescentMask">
                <circle cx="75" cy="80" r="62" fill="white" />
                <circle cx="98" cy="68" r="50" fill="black" />
              </mask>
            </defs>
            <circle cx="75" cy="80" r="62" fill="#F5C842" mask="url(#homeCrescentMask)" />
            <g transform="translate(148, 52)">
              <animateTransform attributeName="transform" additive="sum" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
              <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize="72" fill="#F5C842" fontFamily="serif">✦</text>
            </g>
          </svg>
          <span style={{ whiteSpace: 'nowrap' }}>Muslim Success Path</span>
        </a>
        <div className="nav-links">
          <a onClick={() => scrollTo('pillars')} style={{cursor:'pointer'}}>Explore</a>
          <a onClick={() => scrollTo('pipeline')} style={{cursor:'pointer'}}>How It Works</a>
          <a onClick={() => scrollTo('resources')} style={{cursor:'pointer'}}>Resources</a>
          <a onClick={() => scrollTo('about')} style={{cursor:'pointer'}}>About</a>
          <Link href="/contact">Contact</Link>
          <a onClick={() => scrollTo('newsletter')} className="nav-cta" style={{cursor:'pointer'}}>Newsletter</a>
        </div>
        <button
          className="nav-hamburger"
          onClick={() => setHomeMenuOpen(!homeMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={homeMenuOpen ? 'ham-bar bar1 open' : 'ham-bar bar1'} />
          <span className={homeMenuOpen ? 'ham-bar bar2 open' : 'ham-bar bar2'} />
          <span className={homeMenuOpen ? 'ham-bar bar3 open' : 'ham-bar bar3'} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={homeMenuOpen ? 'mobile-menu open' : 'mobile-menu'}>
        <a className="mobile-link" onClick={() => { setHomeMenuOpen(false); scrollTo('pillars') }} style={{cursor:'pointer'}}>Explore</a>
        <a className="mobile-link" onClick={() => { setHomeMenuOpen(false); scrollTo('pipeline') }} style={{cursor:'pointer'}}>How It Works</a>
        <a className="mobile-link" onClick={() => { setHomeMenuOpen(false); scrollTo('resources') }} style={{cursor:'pointer'}}>Resources</a>
        <a className="mobile-link" onClick={() => { setHomeMenuOpen(false); scrollTo('about') }} style={{cursor:'pointer'}}>About</a>
        <Link href="/contact" className="mobile-link" onClick={() => setHomeMenuOpen(false)}>Contact</Link>
        <a className="mobile-link mobile-cta" onClick={() => { setHomeMenuOpen(false); scrollTo('newsletter') }} style={{cursor:'pointer'}}>Newsletter ✦</a>
      </div>
      {homeMenuOpen && <div className="mobile-backdrop" onClick={() => setHomeMenuOpen(false)} />}

      {/* ── HERO — full ripple intensity ── */}
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Faith · Learning · Intentional Living</div>
          <h1>
            Your <span className="gold">Success</span><br />
            Path Begins<br />
            With Islam
          </h1>
          <p className="hero-sub">
            Every resource here is designed to support your journey in Islam — books, crochet patterns,
            courses, podcasts, and tools for an intentional life, for every Muslim.
          </p>
          <div className="hero-actions">
            <a onClick={() => scrollTo('pillars')} className="btn-gold" style={{cursor:'pointer'}}>Start Exploring →</a>
            <a onClick={() => scrollTo('resources')} className="btn-outline" style={{cursor:'pointer'}}>Browse Resources</a>
          </div>
        </div>
        <div className="hero-visual" style={{ position: 'relative', zIndex: 2 }}>
          <svg
            viewBox="0 0 200 200"
            width="220"
            height="220"
            style={{
              animation: 'islamFloat 5s ease-in-out infinite, islamShimmer 3s ease-in-out infinite',
              display: 'block',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>{`
              @keyframes islamFloat {
                0%, 100% { transform: translateY(0px); }
                50%       { transform: translateY(-18px); }
              }
              @keyframes islamShimmer {
                0%, 100% { filter: drop-shadow(0 0 12px rgba(201,163,79,0.4)) brightness(1); }
                50%       { filter: drop-shadow(0 0 32px rgba(201,163,79,0.95)) brightness(1.35); }
              }
            `}</style>
            <defs>
              <mask id="crescentMask">
                <circle cx="95" cy="100" r="62" fill="white" />
                <circle cx="118" cy="88" r="50" fill="black" />
              </mask>
            </defs>
            <circle cx="95" cy="100" r="62" fill="#C9A34F" mask="url(#crescentMask)" />
            <g transform="translate(148, 68)">
              <animateTransform attributeName="transform" additive="sum" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
              <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize="72" fill="#C9A34F" fontFamily="serif">✦</text>
            </g>
          </svg>
        </div>
      </section>

      {/* ── STATS — soft ripple ── */}
      <div className="stats reveal" id="stats-section" ref={statsRef}
        style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        {[
          { label: 'Crocheted Pieces',          val: stat1, href: '/crocheting' },
          { label: 'Books Written',             val: stat2, href: '/books' },
          { label: 'Organizing Tools',          val: stat3, href: '/organize' },
          { label: 'Videos Created',            val: stat4, href: '/videos' },
          { label: 'Podcast Episodes',          val: stat5, href: '/podcasts' },
          { label: 'Apps & Websites',           val: stat6, href: '/apps' },
          { label: 'Courses Created',           val: stat7, href: '/courses' },
          { label: 'Etsy Sales',                val: stat8, href: 'https://www.etsy.com/shop/EffortlessWorks' },
          { label: 'Newsletter Subscribers', val: stat10, href: undefined, onClick: () => scrollTo('newsletter') },
          { label: 'Years Expertise',           val: stat9, href: '/about' },
          
        ].map(s => (
          <a href={s.href} onClick={(s as any).onClick} key={s.label} className="stat-item" style={{ position: 'relative', zIndex: 2, textDecoration: 'none', cursor: 'pointer' }}>
            <div className="stat-num">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </a>
        ))}
      </div>

      {/* ── PILLARS — soft ripple ── */}
      <section className="section pillars" id="pillars" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="pillars-head reveal">
            <div>
              <div className="s-tag">What We Offer</div>
              <h2 className="s-title">Four Paths,<br />One Mission</h2>
            </div>
            <p className="s-sub">Everything we create flows from a single purpose — helping you succeed in this life and the next.</p>
          </div>
          <div className="pillars-grid">

            {/* ── 01: Crocheting + Islamic Learning (combined) ── */}
            <div className="pillar reveal" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="pillar-num">01</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span className="pillar-icon">🧶</span>
                <span className="pillar-icon">📖</span>
              </div>
              <div className="pillar-title">Faith &amp; Craft</div>
              <p className="pillar-desc">
                Handmade Islamic crochet pieces and patterns alongside Quran study guides, books for new Muslims, podcasts, and courses — two paths, one purpose.
              </p>
              <div className="pillar-tags">
                {['Patterns','Islamic Clothing','Books','Quran Study','Courses','Etsy Shop'].map(t => <span className="ptag" key={t}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 20 }}>
                <Link href="/crocheting" style={{
                  flex: 1, textAlign: 'center', padding: '8px 0',
                  background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.25)',
                  borderRadius: 8, color: '#F5C842', fontSize: '.75rem', fontWeight: 700,
                  letterSpacing: '.05em', textDecoration: 'none', transition: 'background .2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,200,66,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,200,66,0.08)')}>
                  🧶 Crocheting →
                </Link>
                <Link href="/islamic-learning" style={{
                  flex: 1, textAlign: 'center', padding: '8px 0',
                  background: 'rgba(123,191,160,0.08)', border: '1px solid rgba(123,191,160,0.25)',
                  borderRadius: 8, color: '#7BBFA0', fontSize: '.75rem', fontWeight: 700,
                  letterSpacing: '.05em', textDecoration: 'none', transition: 'background .2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(123,191,160,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(123,191,160,0.08)')}>
                  📖 Islamic Learning →
                </Link>
              </div>
            </div>

            {/* ── 02: Organize Your Life ── */}
            <Link href="/organize" className="pillar reveal rd1">
              <div className="pillar-num">02</div>
              <span className="pillar-icon">🗂️</span>
              <div className="pillar-title">Organize Your Life</div>
              <p className="pillar-desc">Notion templates, Google Sheets, and time management systems built to help Muslims stay productive and intentional.</p>
              <div className="pillar-tags">{['Templates','Time Management','Goal Tracking','Business Tools'].map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                <div style={{
                  textAlign: 'center', padding: '8px 0',
                  background: 'rgba(123,191,160,0.08)', border: '1px solid rgba(123,191,160,0.25)',
                  borderRadius: 8, color: '#7BBFA0', fontSize: '.75rem', fontWeight: 700,
                  letterSpacing: '.05em',
                }}>
                  🗂️ Effortless Works →
                </div>
              </div>
            </Link>

            {/* ── 03: Community → Effortless Quest ── */}
            <Link href="#effortless-quest" className="pillar reveal rd2">
              <div className="pillar-num">03</div>
              <span className="pillar-icon">👥</span>
              <div className="pillar-title">Community</div>
              <p className="pillar-desc">A gamified community platform where personal development and business growth become a real-life game — with leaderboards, rewards, and driven people.</p>
              <div className="pillar-tags">{['Effortless Quest','Leaderboards','Challenges','Coming Soon'].map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                <div style={{
                  textAlign: 'center', padding: '8px 0',
                  background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.25)',
                  borderRadius: 8, color: '#F5C842', fontSize: '.75rem', fontWeight: 700,
                  letterSpacing: '.05em',
                }}>
                  🏆 Effortless Quest →
                </div>
              </div>
            </Link>

            {/* ── 04: Luma AI ── */}
            <a href="https://www.effortless.quest/#luma" target="_blank" rel="noopener noreferrer" className="pillar reveal rd3">
              <div className="pillar-num">04</div>
              <span className="pillar-icon">🪞</span>
              <div className="pillar-title">Luma AI</div>
              <p className="pillar-desc">
                Your Jarvis. Luma runs your businesses autonomously — ordering supplies, updating your shop, creating marketing content, and processing orders — while you focus on building the next thing.
              </p>
              <div className="pillar-tags">{['Business Automation','Local AI','Order Management','Content Creation','Control Center'].map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                <div style={{
                  textAlign: 'center', padding: '8px 0',
                  background: 'rgba(123,191,160,0.08)', border: '1px solid rgba(123,191,160,0.25)',
                  borderRadius: 8, color: '#7BBFA0', fontSize: '.75rem', fontWeight: 700,
                  letterSpacing: '.05em',
                }}>
                  🪞 Meet Luma →
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ── INLINE NEWSLETTER NUDGE 1 — after pillars ── */}
      <div className="reveal" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border-dim)', borderBottom: '1px solid var(--border-dim)', padding: '28px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '.8rem', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 14 }}>✦ Stay on the path — get updates on everything we create</p>
        {nlStatus === 'ok' ? (
          <p style={{ color: 'var(--teal)', fontSize: '.85rem' }}>Jazakallah Khair 🌙 You&apos;re on the list!</p>
        ) : (
          <div className="nl-nudge-form">
            <input type="text" placeholder="Your name" value={nlName} onChange={e => { setNlName(e.target.value); setNlStatus('idle') }} />
            <input type="email" placeholder="your@email.com" value={nlEmail} onChange={e => { setNlEmail(e.target.value); setNlStatus('idle') }} />
            <button onClick={handleNewsletter}>Subscribe ✦</button>
          </div>
        )}
        {nlStatus === 'noName'  && <p style={{ marginTop: 8, fontSize: '.78rem', color: '#F5C842' }}>We&apos;d love to know your name 🌸</p>}
        {nlStatus === 'noEmail' && <p style={{ marginTop: 8, fontSize: '.78rem', color: '#F5C842' }}>Don&apos;t forget your email 💌</p>}
        {nlStatus === 'err'     && <p style={{ marginTop: 8, fontSize: '.78rem', color: '#e05555' }}>Something went wrong — please try again.</p>}
      </div>

      {/* ── PIPELINE — soft ripple ── */}
      <Pipeline />

      {/* ── THE BUSINESS MODEL ── */}
      <section id="business-model" style={{
        position: 'relative', overflow: 'hidden',
        background: '#0A0B0C',
        borderTop: '1px solid rgba(245,200,66,0.15)',
        borderBottom: '1px solid rgba(123,191,160,0.15)',
        padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)',
      }}>
        <RippleCanvas intensity={0.3} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div className="reveal" style={{ marginBottom: 64 }}>
            <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#F5C842', marginBottom: 16 }}>
              The Business Model
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300,
              color: '#E8E4DC', lineHeight: 1.1, margin: '0 0 20px',
            }}>
              Muslim Success Path<br />
              <em style={{ fontStyle: 'italic', color: '#7BBFA0' }}>runs itself.</em>
            </h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(232,228,220,0.45)', lineHeight: 1.8, maxWidth: 560, margin: 0 }}>
              Everything you see here — the crocheting, the books, the content — is a real operating business. Luma handles the day-to-day. This is the model you can build too.
            </p>
          </div>

          {/* Two business models side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 64 }}>

            {/* Model 1: Crocheting Business */}
            <div className="reveal" style={{
              background: '#131416',
              border: '1px solid rgba(245,200,66,0.15)',
              borderRadius: 16, padding: 32,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -40, right: -40, fontSize: '8rem',
                opacity: 0.04, pointerEvents: 'none', userSelect: 'none',
              }}>🧶</div>
              <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#F5C842', marginBottom: 12 }}>
                Business Model 01
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', fontWeight: 400, color: '#E8E4DC', margin: '0 0 12px' }}>
                Crocheting Business
              </h3>
              <p style={{ fontSize: '.85rem', color: 'rgba(232,228,220,0.4)', lineHeight: 1.75, margin: '0 0 24px' }}>
                Sentro knitting machines produce the goods. Luma manages inventory, photographs finished products, lists them to the shop, handles orders, and notifies you only when it's time to ship.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: '⚙️', step: 'Machines produce the product' },
                  { icon: '📸', step: 'Luma photographs & lists it' },
                  { icon: '📦', step: 'Order comes in, Luma queues production' },
                  { icon: '🔔', step: 'You get notified to ship' },
                ].map(s => (
                  <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
                    <span style={{ fontSize: '.8rem', color: 'rgba(232,228,220,0.5)' }}>{s.step}</span>
                  </div>
                ))}
              </div>
              <a href="/crocheting" style={{
                display: 'inline-block', marginTop: 24,
                fontSize: '.75rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
                color: '#F5C842', textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                See the shop →
              </a>
            </div>

            {/* Model 2: Content Creation Business */}
            <div className="reveal" style={{
              background: '#131416',
              border: '1px solid rgba(123,191,160,0.15)',
              borderRadius: 16, padding: 32,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -40, right: -40, fontSize: '8rem',
                opacity: 0.04, pointerEvents: 'none', userSelect: 'none',
              }}>📡</div>
              <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#7BBFA0', marginBottom: 12 }}>
                Business Model 02
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', fontWeight: 400, color: '#E8E4DC', margin: '0 0 12px' }}>
                Content Creation Business
              </h3>
              <p style={{ fontSize: '.85rem', color: 'rgba(232,228,220,0.4)', lineHeight: 1.75, margin: '0 0 24px' }}>
                Books, podcasts, and YouTube — Luma handles the marketing pipeline. It creates short-form content, posts to social, updates the website when new material drops, and tracks what's growing.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: '✍️', step: 'You create the book, episode, or video' },
                  { icon: '✂️', step: 'Luma clips & formats for social media' },
                  { icon: '📢', step: 'Luma posts & updates the website' },
                  { icon: '📊', step: 'Luma tracks growth & reports back' },
                ].map(s => (
                  <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
                    <span style={{ fontSize: '.8rem', color: 'rgba(232,228,220,0.5)' }}>{s.step}</span>
                  </div>
                ))}
              </div>
              <a href="/books" style={{
                display: 'inline-block', marginTop: 24,
                fontSize: '.75rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
                color: '#7BBFA0', textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                See the content →
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="reveal" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '.8rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.3)', marginBottom: 20 }}>
              Want to build a business like this?
            </p>
            <a
              href="https://www.effortlessworks.store/"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 36px', borderRadius: 2,
                background: 'linear-gradient(135deg, #F5C842, #e0b030)',
                color: '#0A0B0C', fontSize: '.8rem', fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                textDecoration: 'none', fontFamily: "'DM Sans', sans-serif",
                transition: 'opacity .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Browse Business Models on Effortless Works →
            </a>
          </div>

        </div>
      </section>

      {/* ── RESOURCES — soft ripple ── */}
      <style>{`
        @media (max-width: 639px) {
          .res-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .res-card .res-desc {
            display: none;
          }
          .res-card .res-link {
            display: none;
          }
          .res-card {
            padding: 16px 8px !important;
          }
        }
      `}</style>
      <section className="section resources" id="resources" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">All Resources</div>
            <h2 className="s-title">Explore Everything</h2>
            <p className="s-sub">From books and podcasts to crochet patterns and organizational tools — find what you need.</p>
          </div>
          <div className="res-grid">
            {[
              { icon:'🧶', name:'Crocheting',        href:'/crocheting',       desc:'Handmade patterns, physical products, and step-by-step video walkthroughs',  link:'Explore →' },
              { icon:'☪️', name:'Islamic Learning', href:'/islamic-learning', desc:'Quran reflections, books, podcasts, and guides for every Muslim',             link:'Learn →' },
              { icon:'🗂️', name:'Organization',    href:'/organize',         desc:'Templates and systems for an intentional, productive life',                   link:'Simplify →' },
              { icon:'📖', name:'Books',            href:'/books',            desc:'Written for reverts, learners, and growing Muslims',                          link:'Read →' },
              { icon:'🎓', name:'Courses',          href:'/courses',          desc:'Structured learning paths for real transformation',                           link:'Learn →' },
              { icon:'📻', name:'Podcasts',         href:'/podcasts',         desc:'Faith reflections and life lessons, one episode at a time',                   link:'Listen →' },
              { icon:'▶️', name:'Videos',           href:'/videos',           desc:'Watch, learn, and be inspired on YouTube',                                    link:'Watch →' },
              { icon:'📱', name:'Apps',             href:'/apps',             desc:'Digital tools built to support your Islamic lifestyle',                       link:'Explore →' },
              { icon:'🗺️', name:'Roadmap',         href:'/roadmap',          desc:"See all upcoming projects, launches, and what's next",                        link:'View Map →' },
            ].map((r, i) => (
              <Link href={r.href} className="res-card reveal" key={r.name} style={{ transitionDelay: `${i * 0.07}s` }}>
                <span className="res-icon">{r.icon}</span>
                <div className="res-name">{r.name}</div>
                <div className="res-desc">{r.desc}</div>
                <div className="res-link">{r.link}</div>
              </Link>
            ))}
            <a href="https://www.effortless.quest/#luma" target="_blank" rel="noopener noreferrer" className="res-card reveal" style={{ transitionDelay: '0.7s' }}>
              <span className="res-icon">📔</span>
              <div className="res-name">Luma AI</div>
              <div className="res-desc">A personal AI journaling app — write daily, talk through your thoughts, and reflect with an AI that listens</div>
              <div className="res-link">Start Journaling →</div>
            </a>
            <a href="https://www.etsy.com/shop/EffortlessWorks" target="_blank" rel="noopener noreferrer" className="res-card reveal" style={{ transitionDelay: '0.77s' }}>
              <span className="res-icon">🛍️</span>
              <div className="res-name">Etsy Shop</div>
              <div className="res-desc">Handmade crochet pieces, patterns, and Islamic accessories</div>
              <div className="res-link">Shop Now →</div>
            </a>
            <a href="/#effortless-quest" className="res-card reveal" style={{ transitionDelay: '0.84s' }}>
              <span className="res-icon">🏆</span>
              <div className="res-name">Community</div>
              <div className="res-desc">A gamified platform for growth, connection, and real-life challenges</div>
              <div className="res-link">Coming Soon →</div>
            </a>
          </div>
        </div>
      </section>

      {/* ── INLINE NEWSLETTER NUDGE 2 — after resources ── */}
      <div className="reveal" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)', borderBottom: '1px solid var(--border-dim)', padding: '28px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '.8rem', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 14 }}>✦ Get notified when new resources drop</p>
        {nlStatus === 'ok' ? (
          <p style={{ color: 'var(--teal)', fontSize: '.85rem' }}>Jazakallah Khair 🌙 You&apos;re on the list!</p>
        ) : (
          <div className="nl-nudge-form">
            <input type="text" placeholder="Your name" value={nlName} onChange={e => { setNlName(e.target.value); setNlStatus('idle') }} />
            <input type="email" placeholder="your@email.com" value={nlEmail} onChange={e => { setNlEmail(e.target.value); setNlStatus('idle') }} />
            <button onClick={handleNewsletter}>Subscribe ✦</button>
          </div>
        )}
        {nlStatus === 'noName'  && <p style={{ marginTop: 8, fontSize: '.78rem', color: '#F5C842' }}>We&apos;d love to know your name 🌸</p>}
        {nlStatus === 'noEmail' && <p style={{ marginTop: 8, fontSize: '.78rem', color: '#F5C842' }}>Don&apos;t forget your email 💌</p>}
        {nlStatus === 'err'     && <p style={{ marginTop: 8, fontSize: '.78rem', color: '#e05555' }}>Something went wrong — please try again.</p>}
      </div>

      {/* ── EFFORTLESS WORKS ── */}
      <section id="effortless-works" style={{
        position: 'relative', overflow: 'hidden',
        background: '#0C0D0E',
        borderTop: '1px solid rgba(245,200,66,0.25)',
        padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)',
      }}>
        {/* Parallax stars — z1 so they sit above the base bg */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
          <ParallaxStars count={90} />
        </div>

        {/* Gold → sage top glow */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 180,
          background: 'linear-gradient(to bottom, rgba(245,200,66,0.05), transparent)',
          pointerEvents: 'none', zIndex: 2,
        }} />
        {/* Grain overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, opacity: 0.35,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }} />

        <div style={{ position: 'relative', zIndex: 3, maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div className="reveal" style={{ marginBottom: 72 }}>

            {/* MSP gold bridge bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
            }}>
              <div style={{ width: 28, height: 1, background: '#F5C842', opacity: 0.5 }} />
              <span style={{
                fontSize: '.6rem', fontWeight: 700, letterSpacing: '.16em',
                textTransform: 'uppercase', color: 'rgba(245,200,66,0.6)',
                fontFamily: "'DM Sans', sans-serif",
              }}>Muslim Success Path</span>
              <div style={{ width: 28, height: 1, background: '#F5C842', opacity: 0.5 }} />
              <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '.7rem' }}>✦</span>
              <div style={{ width: 28, height: 1, background: '#7BBFA0', opacity: 0.5 }} />
              <span style={{
                fontSize: '.6rem', fontWeight: 700, letterSpacing: '.16em',
                textTransform: 'uppercase', color: 'rgba(123,191,160,0.6)',
                fontFamily: "'DM Sans', sans-serif",
              }}>Effortless Works</span>
              <div style={{ width: 28, height: 1, background: '#7BBFA0', opacity: 0.5 }} />
            </div>

            <div style={{
              fontSize: '.65rem', fontWeight: 500, letterSpacing: '.16em',
              textTransform: 'uppercase', color: '#7BBFA0',
              fontFamily: "'DM Sans', sans-serif", marginBottom: 20,
            }}>
              Sister Brand
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <div>
                <style>{`
                  @keyframes waterShimmer {
                    0%   { background-position: 0% center; }
                    100% { background-position: 200% center; }
                  }
                  @keyframes waterWave {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.88; }
                  }
                  .ew-logo {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: clamp(2.8rem, 6vw, 5rem);
                    font-weight: 300;
                    line-height: 1.05;
                    margin: 0 0 16px;
                    background: linear-gradient(
                      110deg,
                      #7BBFA0 0%,
                      #a8d4c2 12%,
                      #E8E4DC 24%,
                      #F5C842 34%,
                      #ffe9a0 40%,
                      #ffffff 46%,
                      #ffe9a0 52%,
                      #F5C842 58%,
                      #E8E4DC 70%,
                      #a8d4c2 82%,
                      #7BBFA0 100%
                    );
                    background-size: 300% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: waterShimmer 6s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate,
                               waterWave 6s ease-in-out infinite;
                  }
                `}</style>
                <h2 className="ew-logo">
                  Effortless <span style={{ fontStyle: 'italic' }}>Works</span>
                </h2>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '.95rem', color: 'rgba(232,228,220,0.5)',
                  lineHeight: 1.75, maxWidth: 480, margin: 0,
                }}>
                  Pick a business. We build it. Luma runs it. From crocheting to content creation — every business model, fully automated.
                </p>
              </div>
              <a
                href="https://www.effortlessworks.store/"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '11px 26px', borderRadius: 2,
                  background: '#7BBFA0', color: '#0C0D0E',
                  fontSize: '.75rem', fontWeight: 500, letterSpacing: '.08em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: 'nowrap', flexShrink: 0,
                  transition: 'opacity .2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Visit Site →
              </a>
            </div>
          </div>

          {/* Centre spine line — blended gold → sage */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(245,200,66,0.2) 10%, rgba(123,191,160,0.15) 40%, rgba(123,191,160,0.15) 85%, transparent)',
            pointerEvents: 'none', zIndex: 0,
            transform: 'translateX(-50%)',
          }} />

          {/* Zigzag business model clusters */}
          {[
            {
              label: '🧶 Crocheting Business', align: 'right' as const,
              href: 'https://www.effortlessworks.store/',
              tag: 'Available',
              desc: 'Sentro knitting machines + Luma automation. Orders, Etsy listings, inventory, and marketing — all on autopilot.',
              links: [
                { name: 'Machine', sub: 'Setup', icon: '⚙️' },
                { name: 'Luma', sub: 'Orders', icon: '🪞' },
                { name: 'Auto', sub: 'Inventory', icon: '📦' },
              ],
            },
            {
              label: '📱 Content Creation', align: 'left' as const,
              href: 'https://www.effortlessworks.store/',
              tag: 'Available',
              desc: 'Books, podcasts, YouTube — one automated pipeline. Luma schedules, promotes, and grows your audience while you create.',
              links: [
                { name: 'Multi', sub: 'Platform', icon: '📹' },
                { name: 'Luma', sub: 'Pipeline', icon: '🪞' },
                { name: 'Auto', sub: 'Growth', icon: '📈' },
              ],
            },
            {
              label: '📞 Automated Sales', align: 'right' as const,
              href: 'https://www.effortlessworks.store/',
              tag: 'Coming Soon',
              desc: 'Companies need sales — you run it for them. Luma handles lead generation, outreach, follow-ups, and reporting automatically.',
              links: [
                { name: 'Lead', sub: 'Gen', icon: '🎯' },
                { name: 'Auto', sub: 'Outreach', icon: '📨' },
                { name: 'Client', sub: 'Reports', icon: '📊' },
              ],
            },
            {
              label: '🖨️ 3D Printing Business', align: 'left' as const,
              href: 'https://www.effortlessworks.store/',
              tag: 'Coming Soon',
              desc: 'Print custom products on demand — decor, tools, accessories. Luma manages your store, orders, and reprint queue automatically.',
              links: [
                { name: 'Print', sub: 'On Demand', icon: '🖨️' },
                { name: 'Luma', sub: 'Store', icon: '🪞' },
                { name: 'Auto', sub: 'Reorder', icon: '🔄' },
              ],
            },
            {
              label: '✦ More Models', align: 'right' as const,
              href: 'https://www.effortlessworks.store/',
              tag: 'Coming Soon',
              desc: 'Physical products, digital services, local businesses — new business-in-a-box models added regularly.',
              links: [
                { name: 'Plug', sub: 'Luma In', icon: '🔌' },
                { name: 'Learn &', sub: 'Build', icon: '📚' },
                { name: 'Full', sub: 'Kit', icon: '🚀' },
              ],
            },
          ].map((cluster, i) => {
            const quotes = [
              '"Machines produce. Luma sells. You profit."',
              '"Write once. Luma distributes forever."',
              '"Luma pitches. Clients close. You collect."',
              '"Design once. Print forever. Luma ships it."',
              '"Any business. Any niche. Fully automated."',
            ]
            const watermarks = ['CROCHET', 'CONTENT', 'SALES', 'PRINT', 'MORE']
            return (
              <div key={cluster.label} style={{ position: 'relative', marginBottom: 64 }}>

                {/* Faded watermark word in empty space */}
                <div style={{
                  position: 'absolute',
                  left: cluster.align === 'right' ? '2%' : 'auto',
                  right: cluster.align === 'left' ? '2%' : 'auto',
                  top: '50%', transform: 'translateY(-50%)',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  fontWeight: 300, letterSpacing: '.2em',
                  color: 'rgba(123,191,160,0.04)',
                  textTransform: 'uppercase',
                  pointerEvents: 'none', userSelect: 'none',
                  whiteSpace: 'nowrap',
                }}>
                  {watermarks[i]}
                </div>

                {/* Floating quote in empty space */}
                <div style={{
                  position: 'absolute',
                  left: cluster.align === 'right' ? '3%' : 'auto',
                  right: cluster.align === 'left' ? '3%' : 'auto',
                  top: '55%', transform: 'translateY(-50%)',
                  maxWidth: '38%',
                  pointerEvents: 'none',
                }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(.85rem, 1.4vw, 1.05rem)',
                    fontStyle: 'italic', fontWeight: 300,
                    color: 'rgba(232,228,220,0.18)',
                    lineHeight: 1.7, margin: 0,
                  }}>
                    {quotes[i]}
                  </p>
                  <div style={{ width: 20, height: 1, background: 'rgba(123,191,160,0.2)', marginTop: 10 }} />
                </div>

                {/* Spine dot — first one gold, rest sage */}
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 6, height: 6, borderRadius: '50%',
                  background: i === 0 ? 'rgba(245,200,66,0.5)' : 'rgba(123,191,160,0.3)',
                  boxShadow: i === 0 ? '0 0 10px rgba(245,200,66,0.25)' : '0 0 10px rgba(123,191,160,0.2)',
                  zIndex: 1,
                }} />

                {/* Cluster card */}
                <div className="reveal" style={{
                  display: 'flex',
                  justifyContent: cluster.align === 'right' ? 'flex-end' : 'flex-start',
                  position: 'relative', zIndex: 2,
                  transitionDelay: `${i * 0.15}s`,
                }}>
                  <div style={{ maxWidth: 440, width: '100%' }}>
                    {/* Cluster label + desc */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <a href={cluster.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                          <div style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: '1.4rem', fontWeight: 400, color: '#E8E4DC',
                            display: 'inline-block',
                            transition: 'color .2s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#7BBFA0')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#E8E4DC')}
                          >{cluster.label} →</div>
                        </a>
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '.52rem', fontWeight: 700, letterSpacing: '.12em',
                          textTransform: 'uppercase',
                          padding: '3px 8px', borderRadius: 3,
                          background: (cluster as any).tag === 'Available' ? 'rgba(123,191,160,0.15)' : 'rgba(245,200,66,0.1)',
                          color: (cluster as any).tag === 'Available' ? '#7BBFA0' : 'rgba(245,200,66,0.7)',
                          border: `1px solid ${(cluster as any).tag === 'Available' ? 'rgba(123,191,160,0.3)' : 'rgba(245,200,66,0.2)'}`,
                        }}>{(cluster as any).tag}</span>
                      </div>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '.75rem', color: 'rgba(232,228,220,0.3)',
                        margin: 0, lineHeight: 1.5,
                      }}>{cluster.desc}</p>
                    </div>

                    {/* Mini card grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 6, padding: 12,
                      background: '#131416',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 12,
                      boxShadow: '0 0 40px rgba(245,200,66,0.06), 0 0 80px rgba(245,200,66,0.03)',
                      position: 'relative',
                    }}>
                      <style>{`
                        @keyframes cardFloat {
                          0%, 100% { transform: translateY(0px); }
                          50%       { transform: translateY(-6px); }
                        }
                      `}</style>
                      {/* Gold ambient glow behind whole grid */}
                      <div style={{
                        position: 'absolute', inset: -20,
                        background: 'radial-gradient(ellipse at center, rgba(245,200,66,0.07) 0%, transparent 70%)',
                        borderRadius: 20, pointerEvents: 'none', zIndex: 0,
                      }} />
                      {cluster.links.map((link, li) => (
                        <a
                          key={link.name + link.sub}
                          href={cluster.href}
                          target="_blank" rel="noopener noreferrer"
                          style={{
                            textDecoration: 'none',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            padding: '12px 6px',
                            background: '#0C0D0E',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 8,
                            transition: 'border-color .25s, background .25s, box-shadow .25s',
                            gap: 5, textAlign: 'center',
                            position: 'relative', zIndex: 1,
                            boxShadow: '0 0 12px rgba(245,200,66,0.06)',
                            animation: `cardFloat ${3.5 + (li % 3) * 0.6}s ease-in-out infinite`,
                            animationDelay: `${li * 0.35}s`,
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(245,200,66,0.4)'
                            e.currentTarget.style.background = 'rgba(245,200,66,0.05)'
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(245,200,66,0.2), 0 0 40px rgba(245,200,66,0.08)'
                            e.currentTarget.style.animationPlayState = 'paused'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                            e.currentTarget.style.background = '#0C0D0E'
                            e.currentTarget.style.boxShadow = '0 0 12px rgba(245,200,66,0.06)'
                            e.currentTarget.style.animationPlayState = 'running'
                          }}
                        >
                          <span style={{ fontSize: '1rem', lineHeight: 1 }}>{link.icon}</span>
                          <div style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '.58rem', fontWeight: 500,
                            color: 'rgba(232,228,220,0.65)', lineHeight: 1.3,
                          }}>{link.name}</div>
                          <div style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '.5rem', fontWeight: 400,
                            color: '#7BBFA0', letterSpacing: '.06em',
                            textTransform: 'uppercase',
                          }}>{link.sub}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </section>

      {/* ── EFFORTLESS QUEST ── */}
      <section className="section" id="effortless-quest" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Coming Soon</div>
            <h2 className="s-title">Effortless<br /><span className="gold">Quest</span></h2>
            <p className="s-sub">A gamified community platform where personal development and business growth become a real-life game — with leaderboards, rewards, and a network of driven individuals and businesses.</p>
          </div>
          <div className="res-grid reveal" style={{ marginTop: 52 }}>
            {[
              { icon: '🏆', name: 'Leaderboards',    desc: 'Monthly, weekly, and yearly rankings — compete with businesses and individuals for real rewards.' },
              { icon: '💼', name: 'Business Center', desc: 'Grow and connect your business in a gamified environment built for entrepreneurs and creators.' },
              { icon: '📚', name: 'Education Center',desc: 'Level up your skills — earn points, unlock achievements, and build expertise alongside others.' },
              { icon: '💡', name: 'Invention Center',desc: 'Ideate, prototype, and launch new projects with community support, feedback, and collaboration.' },
              { icon: '🤝', name: 'Charity Center',  desc: 'Earn rewards and recognition for completing charity tasks and giving back to the community.' },
              { icon: '👥', name: 'Team Center',     desc: 'Form teams, collaborate on goals, and build lasting connections with like-minded people.' },
            ].map(r => (
              <div className="res-card" key={r.name} style={{ cursor: 'default' }}>
                <span className="res-icon">{r.icon}</span>
                <div className="res-name">{r.name}</div>
                <div className="res-desc">{r.desc}</div>
                <div className="res-link" style={{ color: 'var(--teal)', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>Coming Soon</div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 48 }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '.9rem', lineHeight: 1.75, maxWidth: 600 }}>
              Effortless Quest is being built to connect communities of driven individuals, families, and businesses in a real-life gamified experience — with monthly challenges, business competitions, charity rewards, and a place to network, grow, and thrive together.
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT — soft ripple ── */}
      <section className="section about" id="about" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="about-inner reveal" style={{ position: 'relative', zIndex: 2 }}>
          <div className="about-text">
            <div className="s-tag">About</div>
            <h2 className="s-title">Built on Faith,<br />Designed for Growth</h2>
            <p style={{ color:'var(--text-dim)', lineHeight:1.75, marginBottom:28, fontSize:'.95rem' }}>
              Muslim Success Path is a platform dedicated to Islamic knowledge and resources that empower
              individuals on their journey of faith and personal development. Our mission is to make
              learning accessible and engaging for every Muslim, regardless of background or experience.
            </p>
            <Link href="/about" className="btn-gold" style={{ display:'inline-flex' }}>Learn More →</Link>
          </div>
          <div className="about-quote">
            &ldquo;When learning and creating in line with Islam is effortless, life becomes{' '}
            <span>simpler, more intentional,</span> and more meaningful.&rdquo;
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER — soft ripple ── */}
      <section className="newsletter" id="newsletter" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="nl-glow" />
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2, textAlign: 'center', transition: 'box-shadow 0.4s ease', boxShadow: nlHighlight ? '0 0 0 2px rgba(245,200,66,0.6), 0 0 80px rgba(245,200,66,0.35)' : 'none', borderRadius: 16 }}>
          <span className="nl-icon">✦</span>
          <h2 className="nl-title">Stay on the Path</h2>
          <p className="nl-sub">
            Get updates on new books, crochet patterns, courses, and Islamic resources —
            delivered with intention, not noise.
          </p>
          <div className="nl-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <input
            type="text"
            placeholder="Your name"
            value={nlName}
            onChange={e => { setNlName(e.target.value); setNlStatus('idle') }}
            style={{ width: '100%', maxWidth: 400, borderColor: nlStatus === 'noName' ? '#F5C842' : nlHighlight ? 'rgba(245,200,66,0.5)' : undefined, boxShadow: nlHighlight ? '0 0 12px rgba(245,200,66,0.2)' : undefined }}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={nlEmail}
            onChange={e => { setNlEmail(e.target.value); setNlStatus('idle') }}
            style={{ width: '100%', maxWidth: 400, borderColor: nlStatus === 'err' || nlStatus === 'noEmail' ? '#e05555' : nlHighlight ? 'rgba(245,200,66,0.5)' : undefined, boxShadow: nlHighlight ? '0 0 12px rgba(245,200,66,0.2)' : undefined }}
          />
          <button onClick={handleNewsletter}
            style={{ background: nlStatus === 'ok' ? '#2d7a3a' : undefined }}>
            {nlStatus === 'ok' ? '✓ Subscribed!' : 'Subscribe'}
          </button>
        </div>
          {nlStatus === 'ok' && (
  <p style={{ marginTop: 12, fontSize: '.8rem', color: 'var(--teal)' }}>
    Jazakallah Khair 🌙 Welcome to the path!
  </p>
        )}
        {nlStatus === 'noName' && (
          <p style={{ marginTop: 12, fontSize: '.8rem', color: '#F5C842' }}>
            We'd love to know your name 🌸 Please add it above.
          </p>
        )}
        {nlStatus === 'noEmail' && (
          <p style={{ marginTop: 12, fontSize: '.8rem', color: '#F5C842' }}>
            Don't forget your email so we can reach you 💌
          </p>
        )}
        {nlStatus === 'err' && (
          <p style={{ marginTop: 12, fontSize: '.8rem', color: '#e05555' }}>
            Something went wrong — please try again.
          </p>
        )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </>
  )
}