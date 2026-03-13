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
    title: 'Digital Products',
    content: 'We put genuine care and effort into every digital product we create. All sales are final once a product has been purchased. Because digital products are delivered instantly and access is granted at the time of purchase, we are unable to offer refunds regardless of whether the download link has been clicked or the file has been opened. We encourage you to read the product description carefully before purchasing so you feel confident in your decision. If you are ever unsure whether a product is right for you, please reach out before buying — we are happy to help.',
  },
  {
    title: 'Technical Issues',
    content: 'If you experience a technical issue with any of our digital products — such as a corrupted file or a broken download link — please contact us straight away. We will do everything we can to resolve it quickly and make sure you receive full access to what you purchased. Your satisfaction genuinely matters to us.',
  },
  {
    title: 'Etsy Orders',
    content: 'Products sold through our Etsy shop are also subject to Etsy own return and refund policies. We encourage you to review the individual listing details and Etsy policies before making a purchase. If you have any questions about an order, you are always welcome to reach out to us directly as well.',
  },
  {
    title: 'Fiverr Orders',
    content: 'Services offered through our Fiverr profile are subject to Fiverr own terms of service and resolution policies. We take pride in delivering high quality work and will always communicate openly with you throughout the process. If you have any concerns about a Fiverr order, please reach out to us directly and we will do our best to address them alongside Fiverr own processes.',
  },
  {
    title: 'Exceptions',
    content: 'We understand that sometimes things do not go as expected. If a product is materially different from its description, we will always review the situation with fairness and care. Please reach out to us within 7 days of purchase and we will do our best to find a resolution that feels right. We never want you to feel unheard or unsupported.',
  },
  {
    title: 'Subscriptions & Newsletter',
    content: 'Our newsletter is completely free to subscribe to and just as easy to leave — you can unsubscribe at any time with no questions asked. There are no paid subscriptions at this time, but if that ever changes, this policy will be updated so you are always informed.',
  },
  {
    title: 'How to Contact Us',
    content: 'If you need support with a purchase, have a question, or want to report a technical issue, please do not hesitate to reach out through our social media channels or the contact information provided on our website. We aim to respond within 1 to 3 business days and we genuinely look forward to helping you.',
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
            <BackButton style={{ color: 'var(--text-dim)', fontSize: '.9rem' }} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}