'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import { books, tools, courses, episodes, featuredCrochet } from '@/data/siteData'

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

export default function Home() {
  const [scrolled, setScrolled]   = useState(false)
  const [statsVis, setStatsVis]   = useState(false)
  const [nlStatus, setNlStatus]   = useState<'idle'|'ok'|'err'>('idle')
  const [nlEmail,  setNlEmail]    = useState('')
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
  const stat2 = useCountUp(books.length, statsVis)
  const stat3 = useCountUp(courses.length, statsVis)
  const stat4 = useCountUp(episodes.length, statsVis)
  const stat5 = useCountUp(tools.length, statsVis)
  const stat6 = useCountUp(6, statsVis)

  const handleNewsletter = () => {
    if (nlEmail && nlEmail.includes('@')) {
      setNlStatus('ok')
      setNlEmail('')
    } else {
      setNlStatus('err')
      setTimeout(() => setNlStatus('idle'), 1500)
    }
  }

  return (
    <>
      <FluidCanvas />
      <Cursor />

      {/* ── NAV ── */}
      <nav className={scrolled ? 'nav scrolled' : 'nav'}>
        <a href="#" className="nav-logo">
          <span className="star">✦</span>
          Muslim Success Path
        </a>
        <div className="nav-links">
          <a href="#pillars">Explore</a>
          <a href="#pipeline">How It Works</a>
          <a href="#resources">Resources</a>
          <a href="#about">About</a>
          <a href="#newsletter" className="nav-cta">Newsletter</a>
        </div>
      </nav>

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
            <a href="#pillars" className="btn-gold">Start Exploring →</a>
            <a href="#resources" className="btn-outline">Browse Resources</a>
          </div>
        </div>
        <div className="hero-visual" style={{ position: 'relative', zIndex: 2 }}>
          {/* Islamic crescent + star SVG — CSS float animation, very lightweight */}
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

            {/* Crescent: large circle minus offset circle clipped */}
            <defs>
              <mask id="crescentMask">
                <circle cx="95" cy="100" r="62" fill="white" />
                <circle cx="118" cy="88" r="50" fill="black" />
              </mask>
            </defs>
            <circle cx="95" cy="100" r="62" fill="#C9A34F" mask="url(#crescentMask)" />

            {/* 5-pointed star */}
            <g transform="translate(148, 68) scale(0.85)">
              <polygon
                points="0,-22 5.1,-7 21,-7 8.6,5.3 13.6,21 0,11 -13.6,21 -8.6,5.3 -21,-7 -5.1,-7"
                fill="#C9A34F"
              />
            </g>
          </svg>
        </div>
      </section>

      {/* ── STATS — soft ripple ── */}
      <div className="stats reveal" id="stats-section" ref={statsRef}
        style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        {[
          { label: 'Crocheted Pieces', val: stat1 },
          { label: 'Books Written',    val: stat2 },
          { label: 'Courses Created',  val: stat3 },
          { label: 'Podcast Episodes', val: stat4 },
          { label: 'Organizing Tools', val: stat5 },
          { label: 'Years Expertise',  val: stat6 },
        ].map(s => (
          <div className="stat-item" key={s.label} style={{ position: 'relative', zIndex: 2 }}>
            <div className="stat-num">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── PILLARS — soft ripple ── */}
      <section className="section pillars" id="pillars" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="pillars-head reveal">
            <div>
              <div className="s-tag">What We Offer</div>
              <h2 className="s-title">Three Paths,<br />One Mission</h2>
            </div>
            <p className="s-sub">Everything we create flows from a single purpose — helping you succeed in this life and the next.</p>
          </div>
          <div className="pillars-grid">
            {[
              { num:'01', icon:'🧶', title:'Crocheting',         href:'/crocheting',
                desc:'Handmade Islamic clothing, hijabs, prayer accessories, and crochet patterns with step-by-step video guides.',
                tags:['Patterns','Islamic Clothing','Video Guides','Etsy Shop'] },
              { num:'02', icon:'📖', title:'Islamic Learning',   href:'/islamic-learning',
                desc:'Quran study guides, books for new Muslims and reverts, podcasts, YouTube series, and courses — built from deep reflection.',
                tags:['Books','Quran Study','New Muslim Guide','Courses'] },
              { num:'03', icon:'🗂️', title:'Organize Your Life', href:'/organize',
                desc:'Notion templates, Google Sheets, and time management systems built to help Muslims stay productive and intentional.',
                tags:['Templates','Time Management','Goal Tracking','Business Tools'] },
            ].map((p, i) => (
              <Link href={p.href} className={`pillar reveal${i === 1 ? ' rd1' : i === 2 ? ' rd2' : ''}`} key={p.num}>
                <div className="pillar-num">{p.num}</div>
                <span className="pillar-icon">{p.icon}</span>
                <div className="pillar-title">{p.title}</div>
                <p className="pillar-desc">{p.desc}</p>
                <div className="pillar-tags">{p.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
                <div className="pillar-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIPELINE — soft ripple ── */}
      <section className="section pipeline" id="pipeline" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">How It Works</div>
            <h2 className="s-title">One Creation,<br />Many Paths</h2>
            <p className="s-sub">Every video, post, or idea gets transformed into a full ecosystem of value and resources.</p>
          </div>
          <div className="flow reveal">
            {[
              { icon:'🎬', name:'Record Video',      note:'Capture the creation process',        href:'/videos' },
              { icon:'📱', name:'Social Posts',      note:'Short clips for Instagram & TikTok',  href:'/videos' },
              { icon:'📝', name:'Written Pattern',   note:'Script becomes a digital product',    href:'/crocheting' },
              { icon:'📚', name:'Books & Courses',   note:'Compiled into full learning guides',  href:'/books' },
              { icon:'🎙️', name:'Podcast & YouTube', note:'Audio & video series for all',        href:'/podcasts' },
            ].map(s => (
              <Link href={s.href} className="flow-step" key={s.name} style={{ textDecoration: 'none' }}>
                <div className="flow-node">{s.icon}</div>
                <div className="flow-name">{s.name}</div>
                <div className="flow-note">{s.note}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES — soft ripple ── */}
      <section className="section resources" id="resources" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">All Resources</div>
            <h2 className="s-title">Explore Everything</h2>
            <p className="s-sub">From books and podcasts to crochet patterns and organizational tools — find what you need.</p>
          </div>
          <div className="res-grid reveal">
            {[
              { icon:'📻', name:'Podcasts',         href:'/podcasts',   desc:'Faith reflections and life lessons, one episode at a time',        link:'Listen →' },
              { icon:'📱', name:'Apps',             href:'/apps',       desc:'Digital tools built to support your Islamic lifestyle',             link:'Explore →' },
              { icon:'📖', name:'Books',            href:'/books',      desc:'Written for reverts, learners, and growing Muslims',                link:'Read →' },
              { icon:'🎓', name:'Courses',          href:'/courses',    desc:'Structured learning paths for real transformation',                 link:'Learn →' },
              { icon:'▶️', name:'Videos',           href:'/videos',     desc:'Watch, learn, and be inspired on YouTube',                         link:'Watch →' },
              { icon:'🗂️', name:'Organization',    href:'/organize',   desc:'Templates and systems for an intentional life',                    link:'Simplify →' },
              { icon:'🧶', name:'Crochet Patterns', href:'/crocheting', desc:'Step-by-step guides with full video walkthroughs',                 link:'Explore →' },
              { icon:'🗺️', name:'Roadmap',         href:'/roadmap',    desc:"See all upcoming projects, launches, and what's next",             link:'View Map →' },
            ].map(r => (
              <Link href={r.href} className="res-card" key={r.name}>
                <span className="res-icon">{r.icon}</span>
                <div className="res-name">{r.name}</div>
                <div className="res-desc">{r.desc}</div>
                <div className="res-link">{r.link}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EFFORTLESS WORKS ── */}
      <section className="section" id="effortless-works" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Our Business</div>
            <h2 className="s-title">Effortless<br /><span className="gold">Works</span></h2>
            <p className="s-sub">The brand behind all the tools, templates, and services — built to help you work smarter, create with intention, and grow with purpose.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {[
              { icon: '🗂️', title: 'Organization Templates', desc: 'Google Sheets and Notion templates for individuals and businesses — Back Office, Project Management, Personal Tracker, Life Tracker, and more.', tags: ['Google Sheets', 'Notion', 'Templates'] },
              { icon: '🔨', title: 'Build Your Own', desc: 'Custom website, app, onboarding system, or personalized Sheets/Notion setup — request bespoke services tailored to your exact needs.', tags: ['Website', 'App', 'Onboarding', 'Fiverr'] },
              { icon: '🎓', title: 'How-To Courses', desc: 'Step-by-step product videos, self-paced courses, and instructor-led training to help you master every tool we build.', tags: ['Product Videos', 'Self-Paced', 'Instructor Led'] },
              { icon: '🕌', title: 'Islamic Tools', desc: 'Faith-first templates and trackers — prayer planners, Ramadan organizers, and goal systems built around Islamic values and the Muslim lifestyle.', tags: ['Prayer', 'Ramadan', 'Goals'] },
            ].map((p, i) => (
              <div className="pillar" key={p.title} style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="pillar-icon">{p.icon}</span>
                <div className="pillar-title">{p.title}</div>
                <p className="pillar-desc">{p.desc}</p>
                <div className="pillar-tags">{p.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 48, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="https://www.effortlessworks.store/" target="_blank" rel="noopener noreferrer" className="btn-gold">Visit Effortless Works →</a>
            <Link href="/organize" className="btn-outline">Browse Templates</Link>
          </div>
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
              { icon: '🏆', name: 'Leaderboards',    desc: 'Monthly, weekly, and yearly rankings — compete with businesses and individuals for real rewards.',     },
              { icon: '💼', name: 'Business Center', desc: 'Grow and connect your business in a gamified environment built for entrepreneurs and creators.',         },
              { icon: '📚', name: 'Education Center',desc: 'Level up your skills — earn points, unlock achievements, and build expertise alongside others.',        },
              { icon: '💡', name: 'Invention Center',desc: 'Ideate, prototype, and launch new projects with community support, feedback, and collaboration.',       },
              { icon: '🤝', name: 'Charity Center',  desc: 'Earn rewards and recognition for completing charity tasks and giving back to the community.',           },
              { icon: '👥', name: 'Team Center',     desc: 'Form teams, collaborate on goals, and build lasting connections with like-minded people.',              },
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
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="nl-icon">✦</span>
          <h2 className="nl-title">Stay on the Path</h2>
          <p className="nl-sub">
            Get updates on new books, crochet patterns, courses, and Islamic resources —
            delivered with intention, not noise.
          </p>
          <div className="nl-form">
            <input
              type="email"
              placeholder="your@email.com"
              value={nlEmail}
              onChange={e => { setNlEmail(e.target.value); setNlStatus('idle') }}
              style={{ borderColor: nlStatus === 'err' ? '#e05555' : undefined }}
            />
            <button onClick={handleNewsletter}
              style={{ background: nlStatus === 'ok' ? '#2d7a3a' : undefined }}>
              {nlStatus === 'ok' ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </div>
          {nlStatus === 'ok' && (
            <p style={{ marginTop:12, fontSize:'.8rem', color:'var(--teal)' }}>Jazakallah Khair 🌙</p>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="nav-logo" style={{ display:'inline-flex' }}>
              <span className="star">✦</span> Muslim Success Path
            </a>
            <p>Faith-centered resources for learning, creating, and living with intention — every step of the way.</p>
            <div className="socials">
              {[
                { href:'https://www.instagram.com/muslim.success.path', label:'📸' },
                { href:'https://www.tiktok.com/@muslim.success.path',   label:'🎵' },
                { href:'https://www.youtube.com/@MuslimSuccessPath',    label:'▶️' },
                { href:'https://www.linkedin.com/company/muslim-success-path/about', label:'💼' },
                { href:'https://x.com/muslimsuccess_', label:'✖️' },
              ].map(s => <a href={s.href} key={s.href} className="social-btn" target="_blank" rel="noopener noreferrer">{s.label}</a>)}
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <Link href="/crocheting">Crocheting</Link>
            <Link href="/islamic-learning">Islamic Resources</Link>
            <Link href="/organize">Organization</Link>
            <Link href="/roadmap">Roadmap</Link>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <Link href="/books">Books</Link>
            <Link href="/podcasts">Podcasts</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/apps">Apps</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <a href="#newsletter">Newsletter</a>
            <a href="https://www.effortlessworks.store/" target="_blank" rel="noopener noreferrer">Effortless Works</a>
            <a href="https://www.etsy.com/shop/EffortlessWorks" target="_blank" rel="noopener noreferrer">Etsy Shop</a>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 Muslim Success Path · Effortless Works. All rights reserved.</span>
          <div className="footer-legal">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </>
  )
}