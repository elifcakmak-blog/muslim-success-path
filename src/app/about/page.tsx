'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AboutNewsletter from '@/components/AboutNewsletter'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const values = [
  { icon: '🤲', title: 'Faith First',        desc: 'Every resource, product, and piece of content is created with taqwa at the centre — to please Allah and benefit the ummah.' },
  { icon: '💛', title: 'Accessibility',       desc: 'Islamic knowledge and tools should be available to every Muslim, regardless of background, location, or experience level.' },
  { icon: '🌱', title: 'Intentional Growth',  desc: 'We believe in growing both in deen and dunya — and that the two are not in conflict when approached with the right intention.' },
  { icon: '⭐', title: 'Quality Over Quantity', desc: 'Every book, pattern, template, and course is crafted carefully — not rushed, not generic, but made with care and reflection.' },
]

const socials: { label: string; handle: string; href: string | null; icon: React.ReactNode }[] = [
  {
    label: 'Instagram', handle: '@muslim.success.path',
    href: 'https://www.instagram.com/muslim.success.path',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="var(--gold)" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'YouTube', handle: '@MuslimSuccessPath',
    href: 'https://www.youtube.com/@MuslimSuccessPath',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)">
        <rect x="2" y="5" width="20" height="14" rx="4"/>
        <polygon points="10,9 16,12 10,15" fill="black"/>
      </svg>
    ),
  },
  {
    label: 'TikTok', handle: '@muslim.success.path',
    href: 'https://www.tiktok.com/@muslim.success.path',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter', handle: '@muslimsuccess_',
    href: 'https://x.com/muslimsuccess_',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn', handle: 'Muslim Success Path',
    href: 'https://www.linkedin.com/company/muslim-success-path',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)">
        <rect x="2" y="2" width="20" height="20" rx="3"/>
        <rect x="6" y="10" width="2.5" height="8" fill="black"/>
        <circle cx="7.25" cy="7.25" r="1.5" fill="black"/>
        <path d="M12 10h2.5v1.5s.5-1.5 2.5-1.5 3 1 3 3.5V18h-2.5v-4c0-1-.5-2-1.5-2s-1.5 1-1.5 2v4H12V10z" fill="black"/>
      </svg>
    ),
  },
  {
    label: 'Spotify', handle: 'Coming Soon',
    href: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14.5c2.5-1 5.5-1 8 .5" stroke="black" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M7 11.5c3-1.5 7-1.5 10 .5" stroke="black" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M6.5 8.5c3.5-1.5 8-1.5 11 .5" stroke="black" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    label: 'Audible', handle: 'Coming Soon',
    href: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="black" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M5 12c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="black" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <circle cx="16" cy="12" r="1.2" fill="black"/>
      </svg>
    ),
  },
  {
    label: 'Kindle', handle: 'Coming Soon',
    href: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <rect x="7" y="6" width="6" height="1.5" rx="0.75" fill="black"/>
        <rect x="7" y="9.5" width="10" height="1.5" rx="0.75" fill="black"/>
        <rect x="7" y="13" width="8" height="1.5" rx="0.75" fill="black"/>
        <circle cx="12" cy="18" r="1.2" fill="black"/>
      </svg>
    ),
  },
  {
    label: 'Apple Music', handle: 'Coming Soon',
    href: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M15 7v6.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 9v6.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 9l6-2" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="15.5" r="1.5" fill="black"/>
        <circle cx="15" cy="13.5" r="1.5" fill="black"/>
      </svg>
    ),
  },
  {
    label: 'Amazon Music', handle: 'Coming Soon',
    href: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 15c2-1 6-1 8 0" stroke="black" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M10 8v6M14 8v6" stroke="black" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Google Play', handle: 'Coming Soon',
    href: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)">
        <path d="M3 3l18 9-18 9V3z"/>
        <path d="M3 3l9 9M3 21l9-9" stroke="black" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
  },
  {
    label: 'App Store', handle: 'Coming Soon',
    href: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M12 6l1.5 3h3l-2.5 2 1 3L12 12.5 9 14l1-3L7.5 9h3z" fill="black"/>
      </svg>
    ),
  },
]

const products: { icon: string; name: string; desc: string; href: string; tag: string; external?: boolean; dualLinks?: { label: string; href: string | null; comingSoon: boolean }[] }[] = [
  { icon: '🧶', name: 'Crochet Patterns',     desc: 'Hijabs, abayas, prayer accessories & more',                    href: '/crocheting',       tag: 'MSP' },
  { icon: '☪️', name: 'Islamic Learning',     desc: 'Books, podcasts, videos & courses',                             href: '/islamic-learning', tag: 'MSP' },
  { icon: '📖', name: 'Books',                desc: 'Written for reverts & growing Muslims',                          href: '/books',            tag: 'MSP' },
  { icon: '🎙️', name: 'Podcasts',            desc: 'Faith reflections & life lessons',                               href: '/podcasts',         tag: 'MSP' },
  { icon: '▶️', name: 'Videos',              desc: 'YouTube tutorials & Islamic content',                             href: '/videos',           tag: 'MSP' },
  { icon: '🎓', name: 'Courses',              desc: 'Structured learning for real transformation',                    href: '/courses',          tag: 'MSP' },
  { icon: '📱', name: 'Apps',                 desc: 'Digital tools for the Islamic lifestyle',                        href: '/apps',             tag: 'MSP' },
  { icon: '🗂️', name: 'Organize Templates',  desc: 'Notion & Google Sheets for intentional living',                 href: 'https://www.effortlessworks.store/', tag: 'EW', external: true },
  { icon: '🔨', name: 'Build Your Own',       desc: 'Custom websites, apps, onboarding flows, Notion & Sheets builds tailored to your exact needs', href: 'https://www.effortlessworks.store/build-your-own', tag: 'EW', external: true },
  { icon: '🛍️', name: 'Etsy Shop',           desc: 'Handmade Islamic clothing, crochet pieces, bags, accessories & productivity products', href: 'https://www.etsy.com/shop/EffortlessWorks', tag: 'BOTH', external: true,
    dualLinks: [
      { label: 'Effortless Works', href: 'https://www.etsy.com/shop/EffortlessWorks', comingSoon: false },
      { label: 'Muslim Success Path', href: 'https://www.etsy.com/shop/MuslimSuccessPath', comingSoon: false },
    ]
  },
  { icon: '✦', name: 'Luma AI Journal',      desc: 'Private AI journaling companion — local, personal, daily reflection',               href: 'https://www.effortless.quest/#luma', tag: 'LUMA', external: true },
  { icon: '🏆', name: 'Effortless Quest',     desc: 'Gamified community platform — coming soon',      href: 'https://www.effortless.quest', tag: 'EQ', external: true },
]

const tagColors: Record<string, { bg: string; color: string; label: string }> = {
  MSP:  { bg: 'rgba(245,200,66,0.12)',  color: '#F5C842', label: 'Muslim Success Path' },
  EW:   { bg: 'rgba(56,189,248,0.12)',  color: '#38BDF8', label: 'Effortless Works' },
  EQ:   { bg: 'rgba(167,139,250,0.12)', color: '#A78BFA', label: 'Effortless Quest' },
  LUMA: { bg: 'rgba(245,200,66,0.07)',  color: '#F5C842', label: 'Luma AI' },
  BOTH: { bg: 'rgba(255,255,255,0.07)', color: '#CBD5E1', label: 'MSP & Effortless Works' },
}

export default function AboutPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      {/* ── HERO ── */}
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '65vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Faith · Purpose · Community</div>
          <h1>
            Everything We<br />
            <span className="gold">Build & Believe</span>
          </h1>
          <p className="hero-sub">
            Muslim Success Path is more than a platform — it is an ecosystem of faith-driven tools, communities, and creative works built to help Muslims thrive in this life and the next.
          </p>
          <div className="hero-actions">
            <a href="#brands" className="btn-gold">Explore Our World →</a>
            <a href="#founder" className="btn-outline">Meet the Founder</a>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="section about" style={{ position: 'relative', overflow: 'hidden' }} id="mission">
        <RippleCanvas intensity={0.45} />
        <div className="about-inner reveal" style={{ position: 'relative', zIndex: 2 }}>
          <div className="about-text">
            <div className="s-tag">Our Mission</div>
            <h2 className="s-title">Why We<br />Exist</h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: 20, fontSize: '.95rem' }}>
              Muslim Success Path is dedicated to helping Muslims on a journey of faith, growth, and purposeful living. Our mission is to help you strengthen your iman, develop your skills, and live intentionally in every aspect of life.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: 20, fontSize: '.95rem' }}>
              Since 2024, we&apos;ve been sharing insights and practical resources to make learning, worship, and daily routines more meaningful — combining faith, creativity, and technology to help Muslims cultivate clarity, discipline, and purpose.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, fontSize: '.95rem' }}>
              Today we are building an entire ecosystem — a content platform, a digital store, and a gamified community — so that wherever you are on your journey, there is something here for you.
            </p>
          </div>
          <div className="about-quote">
            &ldquo;When learning and creating in line with Islam is effortless, life becomes{' '}
            <span>simpler, more intentional,</span> and more meaningful.&rdquo;
          </div>
        </div>
      </section>

      {/* ── FOUR BRANDS ── */}
      <section className="section" id="brands" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)', maxWidth: '100%', padding: 'clamp(64px, 10vw, 120px) clamp(24px, 4vw, 60px)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="s-tag">The Ecosystem</div>
            <h2 className="s-title">Four Platforms,<br /><span className="gold">One Vision</span></h2>
            <p className="s-sub">Each platform serves a distinct purpose — together they form a complete ecosystem for the intentional Muslim.</p>
          </div>

          <style>{`.brand-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; } @media (max-width: 1100px) { .brand-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 600px) { .brand-grid { grid-template-columns: 1fr !important; } }`}</style>
          <div className="brand-grid" style={{ maxWidth: 1400, margin: '0 auto', gap: 24 }}>

            {/* MSP */}
            <div className="reveal brand-card" style={{ background: 'rgba(245,200,66,0.04)', border: '1px solid rgba(245,200,66,0.18)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 52, height: 52, marginBottom: 16 }}>
                <Image src="/msp-logo.png" alt="Muslim Success Path" width={52} height={52} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#F5C842', marginBottom: 8 }}>Muslim Success Path</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: 12, lineHeight: 1.3 }}>Islam Growth & Crocheting Fun</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '.88rem', lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
                The main hub — Islamic learning resources, crochet patterns, podcasts, videos, books, and courses. Everything faith-driven and intentionally made for the Muslim lifestyle.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {['Crocheting', 'Islamic Learning', 'Books', 'Podcasts', 'Videos', 'Courses'].map(t => (
                  <span key={t} className="ptag">{t}</span>
                ))}
              </div>
              <a href="https://www.muslimsuccesspath.com" className="btn-outline" style={{ fontSize: '.8rem', padding: '9px 18px', borderColor: '#F5C842', color: '#F5C842', alignSelf: 'flex-start', marginTop: 'auto' }}>muslimsuccesspath.com →</a>
              <a href="https://www.linkedin.com/company/muslim-success-path" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, alignSelf: 'flex-start', background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 8, padding: '7px 14px', color: '#F5C842', fontSize: '.75rem', fontWeight: 600, textDecoration: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#F5C842"><rect x="2" y="2" width="20" height="20" rx="3"/><rect x="6" y="10" width="2.5" height="8" fill="black"/><circle cx="7.25" cy="7.25" r="1.5" fill="black"/><path d="M12 10h2.5v1.5s.5-1.5 2.5-1.5 3 1 3 3.5V18h-2.5v-4c0-1-.5-2-1.5-2s-1.5 1-1.5 2v4H12V10z" fill="black"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/Muslim-Success-Path" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, alignSelf: 'flex-start', background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 8, padding: '7px 14px', color: '#F5C842', fontSize: '.75rem', fontWeight: 600, textDecoration: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#F5C842"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
            </div>

            {/* Effortless Works */}
            <div className="reveal brand-card" style={{ background: 'rgba(56,189,248,0.04)', border: '1px solid rgba(56,189,248,0.18)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 52, height: 52, marginBottom: 16 }}>
                <Image src="/effortless-works-logo.svg" alt="Effortless Works" width={52} height={52} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#38BDF8', marginBottom: 8 }}>Effortless Works</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: 12, lineHeight: 1.3 }}>Organization & Productivity</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '.88rem', lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
                The digital store — premium Notion templates, Google Sheets, handmade Etsy products, and organizational tools built for the intentional Muslim who wants to simplify and structure their life.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {['Templates', 'Notion', 'Google Sheets', 'Etsy Shop', 'Productivity'].map(t => (
                  <span key={t} className="ptag" style={{ borderColor: 'rgba(56,189,248,0.3)', color: '#38BDF8' }}>{t}</span>
                ))}
              </div>
              <a href="https://www.effortlessworks.store" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '.8rem', padding: '9px 18px', borderColor: '#38BDF8', color: '#38BDF8', alignSelf: 'flex-start', marginTop: 'auto' }}>effortlessworks.store →</a>
              <a href="https://www.linkedin.com/company/effortless-works-msp" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, alignSelf: 'flex-start', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 8, padding: '7px 14px', color: '#38BDF8', fontSize: '.75rem', fontWeight: 600, textDecoration: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#38BDF8"><rect x="2" y="2" width="20" height="20" rx="3"/><rect x="6" y="10" width="2.5" height="8" fill="black"/><circle cx="7.25" cy="7.25" r="1.5" fill="black"/><path d="M12 10h2.5v1.5s.5-1.5 2.5-1.5 3 1 3 3.5V18h-2.5v-4c0-1-.5-2-1.5-2s-1.5 1-1.5 2v4H12V10z" fill="black"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/Effortless-Works-MSP" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, alignSelf: 'flex-start', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 8, padding: '7px 14px', color: '#38BDF8', fontSize: '.75rem', fontWeight: 600, textDecoration: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#38BDF8"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
            </div>

            {/* Effortless Quest */}
            <div className="reveal brand-card" style={{ background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.18)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 52, height: 52, marginBottom: 16 }}>
                <Image src="/effortless-quest-logo.png" alt="Effortless Quest" width={52} height={52} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#A78BFA', marginBottom: 8 }}>Effortless Quest</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: 12, lineHeight: 1.3 }}>Community & Gamification</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '.88rem', lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
                The community platform — a gamified real-life experience with leaderboards, team challenges, charity rewards, and a network of driven Muslims and businesses growing together.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {['Community', 'Leaderboards', 'Challenges', 'Coming Soon'].map(t => (
                  <span key={t} className="ptag" style={{ borderColor: 'rgba(167,139,250,0.3)', color: '#A78BFA' }}>{t}</span>
                ))}
              </div>
              <a href="https://www.effortless.quest" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '.8rem', padding: '9px 18px', borderColor: '#A78BFA', color: '#A78BFA', alignSelf: 'flex-start', marginTop: 'auto' }}>effortless.quest →</a>
              <a href="https://www.linkedin.com/company/effortless-quest-msp" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, alignSelf: 'flex-start', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 8, padding: '7px 14px', color: '#A78BFA', fontSize: '.75rem', fontWeight: 600, textDecoration: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#A78BFA"><rect x="2" y="2" width="20" height="20" rx="3"/><rect x="6" y="10" width="2.5" height="8" fill="black"/><circle cx="7.25" cy="7.25" r="1.5" fill="black"/><path d="M12 10h2.5v1.5s.5-1.5 2.5-1.5 3 1 3 3.5V18h-2.5v-4c0-1-.5-2-1.5-2s-1.5 1-1.5 2v4H12V10z" fill="black"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/effortless-quest" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, alignSelf: 'flex-start', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 8, padding: '7px 14px', color: '#A78BFA', fontSize: '.75rem', fontWeight: 600, textDecoration: 'none' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#A78BFA"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
            </div>

            {/* Luma AI */}
            <div className="reveal brand-card" style={{ background: 'rgba(245,200,66,0.03)', border: '1px solid rgba(245,200,66,0.15)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 52, height: 52, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="star" style={{ fontSize: '2.4rem', color: '#F5C842' }}>✦</span>
              </div>
              <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#F5C842', marginBottom: 8 }}>Luma AI</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: 12, lineHeight: 1.3 }}>AI Journaling</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '.88rem', lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
                A private desktop journaling companion powered by AI. Write freely, reflect deeply, and have real conversations about your day, your goals, and your thoughts — all stored locally on your device. No cloud, no data sharing, just you.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {['AI Journaling', 'Private & Local', 'Desktop App', 'Daily Reflection'].map(t => (
                  <span key={t} className="ptag">{t}</span>
                ))}
              </div>
              <a href="https://www.effortless.quest/#luma" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '.8rem', padding: '9px 18px', borderColor: '#F5C842', color: '#F5C842', alignSelf: 'flex-start', marginTop: 'auto' }}>luma.effortless.quest →</a>
              <div style={{ marginTop: 10, height: 31 }} />
              <div style={{ marginTop: 10, height: 31 }} />
            </div>

          </div>
        </div>
      </section>

      {/* ── ALL PRODUCTS ── */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="s-tag">Everything We Offer</div>
            <h2 className="s-title">The Full Portfolio</h2>
            <p className="s-sub">Every product, resource, and tool across all four platforms.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
              {Object.entries(tagColors).map(([key, val]) => (
                <span key={key} style={{ background: val.bg, color: val.color, border: `1px solid ${val.color}33`, borderRadius: 20, padding: '4px 14px', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.05em' }}>{val.label}</span>
              ))}
            </div>
          </div>
          <div className="res-grid reveal">
            {products.map((p, i) => {
              const tc = tagColors[p.tag]
              const inner = (
                <>
                  <span className="res-icon">{p.icon}</span>
                  <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: tc.color, marginBottom: 4, marginTop: 2 }}>{tc.label}</div>
                  <div className="res-name">{p.name}</div>
                  <div className="res-desc">{p.desc}</div>
                </>
              )
              if (p.dualLinks) {
                return (
                  <div key={p.name} className="res-card reveal" style={{ transitionDelay: `${i * 0.06}s`, borderColor: `${tc.color}22`, cursor: 'default' }}>
                    {inner}
                    <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                      {p.dualLinks.map((dl: { label: string; href: string | null; comingSoon: boolean }) => (
                        dl.comingSoon ? (
                          <span key={dl.label} style={{ fontSize: '.7rem', fontWeight: 700, padding: '5px 12px', borderRadius: 8, border: `1px solid ${tc.color}33`, color: 'var(--text-muted)', opacity: 0.5, cursor: 'default' }}>
                            {dl.label} — Soon
                          </span>
                        ) : (
                          <a key={dl.label} href={dl.href!} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: '.7rem', fontWeight: 700, padding: '5px 12px', borderRadius: 8, border: `1px solid ${tc.color}55`, color: tc.color, textDecoration: 'none', background: `${tc.color}0d` }}>
                            {dl.label} →
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )
              }
              const card = (
                <>
                  {inner}
                  <div className="res-link" style={{ color: tc.color }}>Explore →</div>
                </>
              )
              return p.external ? (
                <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="res-card reveal" style={{ transitionDelay: `${i * 0.06}s`, borderColor: `${tc.color}22` }}>{card}</a>
              ) : (
                <Link key={p.name} href={p.href} className="res-card reveal" style={{ transitionDelay: `${i * 0.06}s`, borderColor: `${tc.color}22` }}>{card}</Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">What We Stand For</div>
            <h2 className="s-title">Our Values</h2>
            <p className="s-sub">The principles that guide everything we create and every decision we make.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {values.map((v) => (
              <div className="pillar" key={v.title}>
                <span className="pillar-icon">{v.icon}</span>
                <div className="pillar-title">{v.title}</div>
                <p className="pillar-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="section" id="founder" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div className="s-tag">Meet the Team</div>
            <h2 className="s-title">The Person<br />Behind It All</h2>
          </div>
          <div className="reveal" style={{ display: 'flex', gap: 52, alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Photo */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(245,200,66,0.4)', boxShadow: '0 0 40px rgba(245,200,66,0.15)', position: 'relative' }}>
                <Image src="/elif-profile.jpeg" alt="Elif Çakmak" fill style={{ objectFit: 'cover' }} />
              </div>
              {/* Social links */}
              <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap', maxWidth: 200 }}>
                <a href="https://www.linkedin.com/in/elif-%C3%A7akmak-have-a-great-day/" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 8, padding: '7px 12px', color: '#38BDF8', fontSize: '.75rem', fontWeight: 600, textDecoration: 'none', transition: 'all .2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(56,189,248,0.16)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(56,189,248,0.08)')}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#38BDF8">
                    <rect x="2" y="2" width="20" height="20" rx="3"/>
                    <rect x="6" y="10" width="2.5" height="8" fill="black"/>
                    <circle cx="7.25" cy="7.25" r="1.5" fill="black"/>
                    <path d="M12 10h2.5v1.5s.5-1.5 2.5-1.5 3 1 3 3.5V18h-2.5v-4c0-1-.5-2-1.5-2s-1.5 1-1.5 2v4H12V10z" fill="black"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://github.com/elifcakmak-blog" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '7px 12px', color: 'var(--text-dim)', fontSize: '.75rem', fontWeight: 600, textDecoration: 'none', transition: 'all .2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  GitHub
                </a>
              </div>
              <p style={{ marginTop: 14, fontSize: '.76rem', color: 'var(--text-muted)', lineHeight: 1.65, fontStyle: 'italic' }}>
                No other personal socials for me!<br />
                The business accounts keep me plenty busy 😄
              </p>
            </div>

            {/* Bio */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Founder & Creator</div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', marginBottom: 4, lineHeight: 1.2 }}>Elif Çakmak</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '.8rem', marginBottom: 20, letterSpacing: '.04em' }}>Building faith-driven tools for the ummah ✦</p>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, fontSize: '.92rem', marginBottom: 16 }}>
                Elif is the founder of Muslim Success Path, Effortless Works, Effortless Quest, and Luma AI — four interconnected platforms built to help Muslims learn, organise, and grow in community.
              </p>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, fontSize: '.92rem', marginBottom: 16 }}>
                Driven by faith and a passion for purposeful design, she creates everything from handmade crochet patterns and Islamic learning resources to productivity templates and AI tools — all rooted in the belief that a well-organised life and a strong deen go hand in hand.
              </p>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, fontSize: '.92rem' }}>
                Every project begins with intention and a simple question: does this benefit the ummah?
              </p>

              {/* Brand badges */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
                <a href="https://www.muslimsuccesspath.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', borderRadius: 8, padding: '6px 14px', color: '#F5C842', fontSize: '.75rem', fontWeight: 700, textDecoration: 'none' }}>
                  <Image src="/msp-logo.png" alt="MSP" width={18} height={18} style={{ objectFit: 'contain' }} />
                  Muslim Success Path
                </a>
                <a href="https://www.effortlessworks.store" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 8, padding: '6px 14px', color: '#38BDF8', fontSize: '.75rem', fontWeight: 700, textDecoration: 'none' }}>
                  <Image src="/effortless-works-logo.svg" alt="EW" width={18} height={18} style={{ objectFit: 'contain' }} />
                  Effortless Works
                </a>
                <a href="https://www.effortless.quest" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: 8, padding: '6px 14px', color: '#A78BFA', fontSize: '.75rem', fontWeight: 700, textDecoration: 'none' }}>
                  <Image src="/effortless-quest-logo.png" alt="EQ" width={18} height={18} style={{ objectFit: 'contain' }} />
                  Effortless Quest
                </a>
                <a href="https://www.effortless.quest/#luma" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,200,66,0.07)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 8, padding: '6px 14px', color: '#F5C842', fontSize: '.75rem', fontWeight: 700, textDecoration: 'none' }}>
                  <span style={{ fontSize: '1rem', lineHeight: 1 }}>✦</span>
                  Luma AI
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIALS ── */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="s-tag">Follow Along</div>
            <h2 className="s-title">Find Us<br /><span className="gold">Everywhere</span></h2>
            <p className="s-sub">Stay connected across all platforms — new content every week.</p>
          </div>
          <div className="pillars-grid reveal">
            {socials.map(s => (
              s.href ? (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="pillar" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                  <span className="pillar-icon">{s.icon}</span>
                  <div className="pillar-title">{s.label}</div>
                  <p className="pillar-desc" style={{ fontSize: '.8rem' }}>{s.handle}</p>
                  <div className="pillar-arrow">→</div>
                </a>
              ) : (
                <div key={s.label} className="pillar" style={{ opacity: 0.5, cursor: 'default' }}>
                  <span className="pillar-icon">{s.icon}</span>
                  <div className="pillar-title">{s.label}</div>
                  <p className="pillar-desc" style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>Coming Soon</p>
                  <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 8 }}>✦ Soon</div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ── LUMA AI HIGHLIGHT ── */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', gap: 52, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Logo */}
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 120, height: 120, borderRadius: 24, overflow: 'hidden', border: '2px solid rgba(245,200,66,0.4)', boxShadow: '0 0 40px rgba(245,200,66,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245,200,66,0.05)' }}>
                <span className="star" style={{ fontSize: '3.2rem', color: '#F5C842' }}>✦</span>
              </div>
              <a href="https://www.effortless.quest/#luma" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '.8rem', padding: '9px 20px', borderColor: '#F5C842', color: '#F5C842', whiteSpace: 'nowrap' }}>
                Try Luma AI →
              </a>
            </div>
            {/* Description */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#F5C842', marginBottom: 8 }}>Featured App · Luma AI</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)', marginBottom: 12, lineHeight: 1.2 }}>Luma AI<br /><span style={{ color: '#F5C842' }}>Journal</span></h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '.92rem', lineHeight: 1.75, marginBottom: 16 }}>
                Luma AI is a personal journaling companion that lives on your desktop. Every day, you can open it up, write freely, and have a real conversation with an AI that actually listens — talking through your thoughts, your day, your goals, and whatever is on your mind.
              </p>
              <p style={{ color: 'var(--text-dim)', fontSize: '.92rem', lineHeight: 1.75, marginBottom: 24 }}>
                Everything stays completely local on your device — no cloud, no data sharing, just you and your journal. It is a private space to reflect, grow, and think clearly.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['AI Journaling', 'Private & Local', 'Daily Reflection', 'Desktop App', 'Effortless Quest'].map(t => (
                  <span key={t} className="ptag" style={{ borderColor: 'rgba(167,139,250,0.3)', color: '#A78BFA' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONNECT / NEWSLETTER ── */}
      <section className="newsletter" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="nl-glow" />
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="nl-icon">✦</span>
          <h2 className="nl-title">Join the Path</h2>
          <p className="nl-sub">Subscribe to the newsletter and get updates on new resources, products, and everything being built across all four platforms.</p>
          <AboutNewsletter />
        </div>
      </section>

      <Footer />
    </>
  )
}