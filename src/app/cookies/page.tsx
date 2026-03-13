'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import BackButton from '@/components/BackButton'
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
    content: 'Muslim Success Path does not directly implement any cookies on this website. We have not coded or installed any cookie-based tracking, analytics, or advertising tools on our end. Any cookies you may encounter while browsing our website come solely from third-party platforms that we link to or embed content from.',
  },
  {
    title: 'Types of Cookies We Use',
    content: 'We do not set any first-party cookies on this website. We have not implemented essential, analytics, or marketing cookies on our end. This is currently the only cookie setup we have in place. If this changes in the future, this policy will be updated accordingly.',
  },
  {
    title: 'Third-Party Cookies',
    content: 'Our website contains links and embedded content from third-party platforms including YouTube, GitHub, Amazon Kindle, Amazon Music, Spotify, Apple Podcasts, Apple App Store, Google Play Store, Audible, X (formerly Twitter), LinkedIn, Etsy, Fiverr, TikTok, and Instagram. These platforms may set their own cookies on your device when you interact with or navigate to their content. These cookies are entirely governed by each platform own cookie and privacy policies, and we have no control over them. We encourage you to review the cookie policies of any third-party platforms you visit through our website.',
  },
  {
    title: 'Managing Cookies',
    content: 'Since we do not set any cookies ourselves, there is nothing on our end for you to manage. However if you wish to control cookies set by third-party platforms, you can do so through your browser settings at any time. Disabling third-party cookies may affect how some embedded content displays on our website, but all core content will remain fully accessible.',
  },
  {
    title: 'Changes to This Policy',
    content: 'We may update this Cookie Policy if our setup changes in the future. Any updates will be reflected on this page with a revised date so you are always informed.',
  },
  {
    title: 'Contact Us',
    content: 'If you have any questions about cookies on our website, please reach out to us through our social media channels or the contact information provided on our website.',
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
          <div className="reveal" style={{ marginTop: 48, display: 'flex', gap: 10, flexWrap: 'nowrap', flexDirection: 'row' }}>
            <Link href="/terms" className="btn-gold" style={{ padding: "10px 18px", fontSize: ".8rem", whiteSpace: "nowrap" }}>Terms of Service →</Link>
            <Link href="/privacy-policy" className="btn-gold" style={{ padding: "10px 18px", fontSize: ".8rem", whiteSpace: "nowrap" }}>Privacy Policy →</Link>
            <Link href="/disclaimer" className="btn-gold" style={{ padding: "10px 18px", fontSize: ".8rem", whiteSpace: "nowrap" }}>Disclaimer →</Link>
            <Link href="/return-policy" className="btn-gold" style={{ padding: "10px 18px", fontSize: ".8rem", whiteSpace: "nowrap" }}>Return Policy →</Link>
          </div>
          <div className="reveal" style={{ marginTop: 24 }}>
            <BackButton style={{ color: 'var(--text-dim)', fontSize: '.9rem' }} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}