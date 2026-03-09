'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const sections = [
  {
    title: 'What Are Cookies',
    content: 'Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and understand how you interact with their content.',
  },
  {
    title: 'How We Use Cookies',
    content: 'Muslim Success Path uses cookies to improve your browsing experience, analyze site traffic, and understand which content resonates most with our community. We do not use cookies to collect personal information or serve targeted advertising.',
  },
  {
    title: 'Types of Cookies We Use',
    content: 'We use essential cookies that are necessary for the website to function properly, and analytics cookies that help us understand how visitors navigate our site. Analytics data is aggregated and anonymized.',
  },
  {
    title: 'Third-Party Cookies',
    content: 'Some features on our site — such as embedded YouTube videos or links to Etsy and Effortless Works — may place their own cookies on your device. These are governed by the respective third-party privacy policies.',
  },
  {
    title: 'Managing Cookies',
    content: 'You can control and delete cookies through your browser settings at any time. Disabling cookies may affect some functionality of the website, but core content will remain accessible.',
  },
  {
    title: 'Changes to This Policy',
    content: 'We may update this Cookie Policy from time to time. Any changes will be reflected on this page with an updated date.',
  },
  {
    title: 'Contact Us',
    content: 'If you have questions about our use of cookies, please reach out through our social media channels or the contact information on our website.',
  },
]

export default function CookiesPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '40vh' }}>
        <RippleCanvas intensity={0.6} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Legal</div>
          <h1><span className="gold">Cookie</span> Policy</h1>
          <p className="hero-sub">Last updated: 2025. Learn how we use cookies to improve your experience on Muslim Success Path.</p>
        </div>
      </section>

      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto' }}>
          {sections.map((s, i) => (
            <div key={s.title} className="reveal" style={{ marginBottom: 48, transitionDelay: `${i * 0.05}s` }}>
              <h3 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2rem', color: 'var(--gold)', marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, fontSize: '.95rem' }}>{s.content}</p>
              {i < sections.length - 1 && <div style={{ marginTop: 48, height: 1, background: 'var(--border-dim)' }} />}
            </div>
          ))}
          <div className="reveal" style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/terms" className="btn-gold">Terms of Service →</Link>
            <Link href="/privacy-policy" className="btn-gold">Privacy Policy →</Link>
            <Link href="/disclaimer" className="btn-gold">Disclaimer →</Link>
            <Link href="/return-policy" className="btn-gold">Return Policy →</Link>
          </div>
          <div className="reveal" style={{ marginTop: 24 }}>
            <Link href="/" style={{ color: 'var(--text-dim)', fontSize: '.9rem' }}>← Back Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}