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
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us, such as your email address when you subscribe to our newsletter. We may also collect basic usage data through analytics tools to understand how our site is used.',
  },
  {
    title: 'How We Use Your Information',
    content: 'We use your email address solely to send you our newsletter and updates about new resources, products, and content. We do not sell, rent, or share your personal information with third parties for marketing purposes.',
  },
  {
    title: 'Cookies',
    content: 'Our website may use cookies to improve your browsing experience. These are small files stored on your device that help us understand site usage. You can disable cookies in your browser settings at any time, or read our full Cookie Policy for more details.',
  },
  {
    title: 'Third-Party Services',
    content: 'We use trusted third-party services including Etsy (for product sales), YouTube (for video content), Effortless Works, Effortless Quest, and newsletter platforms. These services have their own privacy policies which govern their use of your information.',
  },
  {
    title: 'Data Security',
    content: 'We take reasonable measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    title: 'Your Rights',
    content: 'You have the right to unsubscribe from our newsletter at any time using the link in any email we send. You may also contact us to request access to, correction of, or deletion of your personal data.',
  },
  {
    title: 'Contact Us',
    content: 'If you have questions about this Privacy Policy, please reach out to us through our social media channels or the contact information on our website.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '40vh' }}>
        <RippleCanvas intensity={0.6} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Legal</div>
          <h1><span className="gold">Privacy</span> Policy</h1>
          <p className="hero-sub">Last updated: 2025. We respect your privacy and are committed to protecting your personal information.</p>
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
            <Link href="/cookies" className="btn-gold" style={{ padding: "10px 18px", fontSize: ".8rem", whiteSpace: "nowrap" }}>Cookie Policy →</Link>
            <Link href="/disclaimer" className="btn-gold" style={{ padding: "10px 18px", fontSize: ".8rem", whiteSpace: "nowrap" }}>Disclaimer →</Link>
            <Link href="/return-policy" className="btn-gold" style={{ padding: "10px 18px", fontSize: ".8rem", whiteSpace: "nowrap" }}>Return Policy →</Link>
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