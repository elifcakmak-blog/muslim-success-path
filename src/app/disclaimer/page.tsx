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
    title: 'Educational Purpose Only',
    content: 'Everything shared on Muslim Success Path — including Islamic resources, lifestyle guidance, productivity tips, and crochet patterns — comes from a genuine desire to educate, inspire, and support our community. While we pour care into everything we create, our content is not a substitute for professional, legal, financial, or medical advice. We always encourage you to seek qualified professionals for matters specific to your situation.',
  },
  {
    title: 'Islamic Knowledge Disclaimer',
    content: 'The Islamic content on this platform is shared with sincerity and a deep respect for the deen. It is rooted in general Islamic knowledge and is intended to inspire and educate. It does not constitute a formal religious ruling (fatwa). For guidance specific to your personal circumstances, we lovingly encourage you to consult a qualified Islamic scholar. We are a community of learners, not a source of religious authority.',
  },
  {
    title: 'Our Commitment to Accuracy',
    content: 'We are committed to providing content that is thoughtful, accurate, and beneficial. We regularly review and update our resources to ensure they remain relevant and reliable. If you ever come across something that seems outdated or incorrect, please do not hesitate to reach out — we genuinely appreciate it and will address it promptly.',
  },
  {
    title: 'External Links',
    content: 'Our website includes links to third-party platforms such as Etsy, Fiverr, YouTube, and various social media channels. While we only link to platforms we actively use and trust for our own work, we do not control their content or practices. We encourage you to review their individual policies so you can make informed decisions.',
  },
  {
    title: 'Affiliate Links',
    content: 'Muslim Success Path does not use affiliate links. Every resource, platform, or product we mention is shared purely because we believe it adds value to our community — never for financial gain. Our recommendations are always honest and independent.',
  },
  {
    title: 'Limitation of Liability',
    content: 'We put our heart into everything we share on Muslim Success Path. However, we ask that you use your own judgment when applying any advice, resources, or information from this website to your personal or professional life. Muslim Success Path and Effortless Works cannot be held liable for outcomes resulting from the use of our content. We are here to support and inspire you, and we trust you to make the best decisions for yourself.',
  },
  {
    title: 'Contact Us',
    content: 'If you ever have questions, concerns, or feedback about anything on this website, we genuinely want to hear from you. Please reach out through our social media channels or the contact information provided on our website. Your voice matters to us.',
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
            <BackButton style={{ color: 'var(--text-dim)', fontSize: '.9rem' }} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}