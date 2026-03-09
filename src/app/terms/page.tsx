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
    title: 'Acceptance of Terms',
    content: 'By accessing and using Muslim Success Path, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.',
  },
  {
    title: 'Use of Content',
    content: 'All content on this website — including books, crochet patterns, templates, videos, and written materials — is the intellectual property of Muslim Success Path and Effortless Works. You may not reproduce, distribute, or sell our content without written permission.',
  },
  {
    title: 'Digital Products',
    content: 'All digital products are sold as-is for personal use only. Due to the nature of digital goods, we do not offer refunds once a product has been downloaded. If you experience a technical issue, please contact us and we will do our best to resolve it.',
  },
  {
    title: 'Newsletter',
    content: 'By subscribing to our newsletter, you consent to receive email communications from us. You may unsubscribe at any time by clicking the unsubscribe link in any email. We will not use your email for any purpose other than sending newsletter content.',
  },
  {
    title: 'Third-Party Links',
    content: 'Our website contains links to third-party platforms including Etsy, YouTube, Effortless Works, Effortless Quest, and social media. We are not responsible for the content, privacy practices, or terms of those external sites.',
  },
  {
    title: 'Disclaimer',
    content: 'The Islamic knowledge and resources provided on this platform are for educational and inspirational purposes. They do not constitute formal religious rulings (fatwa). For specific religious guidance, please consult a qualified Islamic scholar.',
  },
  {
    title: 'Changes to Terms',
    content: 'We reserve the right to update these Terms of Service at any time. Continued use of our website after changes are posted constitutes your acceptance of the revised terms.',
  },
  {
    title: 'Contact',
    content: 'For questions about these terms, please reach out to us through our social media channels or contact information provided on the website.',
  },
]

export default function TermsPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '40vh' }}>
        <RippleCanvas intensity={0.6} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Legal</div>
          <h1>Terms of <span className="gold">Service</span></h1>
          <p className="hero-sub">Last updated: 2025. Please read these terms carefully before using Muslim Success Path.</p>
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
            <Link href="/privacy-policy" className="btn-gold">Privacy Policy →</Link>
            <Link href="/cookies" className="btn-gold">Cookie Policy →</Link>
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