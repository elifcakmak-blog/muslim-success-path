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
    title: 'Digital Products',
    content: 'Due to the instant and permanent nature of digital downloads, all sales of digital products — including templates, guides, and printables — are final. We do not offer refunds once a digital product has been accessed or downloaded.',
  },
  {
    title: 'Technical Issues',
    content: 'If you experience a technical issue with a digital product (such as a corrupted file or a broken download link), please contact us immediately. We will do our best to resolve the issue and ensure you receive access to the product you purchased.',
  },
  {
    title: 'Etsy Orders',
    content: 'Physical and digital products sold through our Etsy shop (Effortless Works) are subject to Etsy\'s own return and refund policies. Please review the individual listing details and Etsy\'s policies before making a purchase.',
  },
  {
    title: 'Exceptions',
    content: 'In exceptional circumstances — such as a product being materially different from its description — we will review return requests on a case-by-case basis. Please reach out to us within 7 days of purchase to discuss your situation.',
  },
  {
    title: 'Subscriptions & Newsletter',
    content: 'Our newsletter is free to subscribe to and free to unsubscribe from at any time. There are no paid subscription products at this time, but this policy will be updated if that changes.',
  },
  {
    title: 'How to Contact Us',
    content: 'To request support with a purchase or report a technical issue, please reach out through our social media channels or the contact information on our website. We aim to respond within 2–3 business days.',
  },
]

export default function ReturnPolicyPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '40vh' }}>
        <RippleCanvas intensity={0.6} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Legal</div>
          <h1><span className="gold">Return</span> Policy</h1>
          <p className="hero-sub">Last updated: 2025. Learn about our refund and return process for Muslim Success Path products.</p>
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
            <Link href="/cookies" className="btn-gold" style={{ padding: "10px 18px", fontSize: ".8rem", whiteSpace: "nowrap" }}>Cookie Policy →</Link>
            <Link href="/disclaimer" className="btn-gold" style={{ padding: "10px 18px", fontSize: ".8rem", whiteSpace: "nowrap" }}>Disclaimer →</Link>
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