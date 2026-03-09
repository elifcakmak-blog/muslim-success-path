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
    title: 'Educational Purpose Only',
    content: 'All content on Muslim Success Path — including Islamic resources, lifestyle guidance, productivity tips, and crochet patterns — is provided for educational and inspirational purposes only. It is not intended as professional, legal, financial, or medical advice.',
  },
  {
    title: 'Islamic Knowledge Disclaimer',
    content: 'The Islamic content shared on this platform is based on general knowledge and is meant to inspire and educate. It does not constitute formal religious rulings (fatwa). For specific religious guidance relevant to your personal situation, please consult a qualified Islamic scholar.',
  },
  {
    title: 'No Guarantees',
    content: 'We do our best to ensure all information on this site is accurate and up to date. However, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, or suitability of the information provided.',
  },
  {
    title: 'External Links',
    content: 'Our website includes links to external sites including Effortless Works, Effortless Quest, Etsy, YouTube, and social media platforms. We are not responsible for the content or practices of those external websites.',
  },
  {
    title: 'Affiliate & Product Links',
    content: 'Some links on this site may be affiliate links, meaning we may earn a small commission if you make a purchase through them — at no extra cost to you. We only recommend products and resources we genuinely believe in.',
  },
  {
    title: 'Limitation of Liability',
    content: 'Muslim Success Path and Effortless Works shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on any content provided here.',
  },
  {
    title: 'Contact Us',
    content: 'If you have questions about this disclaimer, please reach out through our social media channels or the contact information on our website.',
  },
]

export default function DisclaimerPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '40vh' }}>
        <RippleCanvas intensity={0.6} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Legal</div>
          <h1>Our <span className="gold">Disclaimer</span></h1>
          <p className="hero-sub">Last updated: 2025. Please read this disclaimer before relying on any content from Muslim Success Path.</p>
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