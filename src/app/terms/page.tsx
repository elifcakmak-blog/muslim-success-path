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
    title: 'Acceptance of Terms',
    content: 'Welcome to Muslim Success Path. By accessing and using our website, you agree to these Terms of Service. We have written them to be as clear and fair as possible so you always know where you stand with us. If you have any questions about them, please do not hesitate to reach out before using our services.',
  },
  {
    title: 'Use of Content',
    content: 'Every piece of content on this website — including books, crochet patterns, templates, videos, and written materials — has been created with care and is the intellectual property of Muslim Success Path and Effortless Works. We kindly ask that you respect our work by not reproducing, distributing, or selling our content without written permission. If you are ever unsure about what is permitted, just ask — we are happy to clarify.',
  },
  {
    title: 'Digital Products',
    content: 'All digital products are sold as-is for individual use, including personal and business purposes. You are welcome to use our products — including spreadsheets and templates — within your own business. We simply ask that you do not resell, redistribute, share, or repackage them in whole or in part without written permission. Due to the nature of digital goods, we are unable to offer refunds once a product has been downloaded. However if you ever experience a technical issue, please reach out and we will do everything we can to make it right.',
  },
  {
    title: 'Newsletter',
    content: 'By subscribing to our newsletter, you agree to receive email communications from us. We promise to only send you content that is relevant, valuable, and worth your time. You can unsubscribe at any time using the link in any email we send — no hard feelings, and your data will be handled with care as outlined in our Privacy Policy.',
  },
  {
    title: 'Third-Party Links',
    content: 'Our website links to third-party platforms including YouTube, GitHub, Amazon Kindle, Amazon Music, Spotify, Apple Podcasts, Apple App Store, Google Play Store, Audible, X (formerly Twitter), LinkedIn, Etsy, Fiverr, TikTok, and Instagram where we actively share our content. While we take full responsibility for the content we post on these platforms, we do not control their own terms, privacy practices, or third-party content found on those sites. We encourage you to review each platform policies so you feel informed and confident.',
  },
  {
    title: 'Islamic Content Disclaimer',
    content: 'The Islamic knowledge and resources shared on this platform come from a place of sincerity and a genuine love for the deen. They are intended for educational and inspirational purposes and do not constitute formal religious rulings (fatwa). For guidance specific to your personal circumstances, we lovingly encourage you to consult a qualified Islamic scholar. We are a community of learners walking this path together.',
  },
  {
    title: 'Changes to Terms',
    content: 'We may update these Terms of Service from time to time as our platform grows and evolves. When we do, we will reflect the changes on this page. We encourage you to check back occasionally so you are always up to date. Your continued use of our website after any updates means you are comfortable with the revised terms.',
  },
  {
    title: 'Contact',
    content: 'If you have any questions or concerns about these terms, we genuinely want to hear from you. Please reach out through our social media channels or the contact information provided on our website. We are always happy to help.',
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
          <div className="reveal" style={{ marginTop: 48, display: 'flex', gap: 10, flexWrap: 'nowrap', flexDirection: 'row' }}>
            <Link href="/privacy-policy" className="btn-gold" style={{ padding: "10px 18px", fontSize: ".8rem", whiteSpace: "nowrap" }}>Privacy Policy →</Link>
            <Link href="/cookies" className="btn-gold" style={{ padding: "10px 18px", fontSize: ".8rem", whiteSpace: "nowrap" }}>Cookie Policy →</Link>
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