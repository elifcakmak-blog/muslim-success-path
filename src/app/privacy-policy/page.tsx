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
    title: 'Information We Collect',
    content: 'When you subscribe to our newsletter, you provide us with your name and email address. We also note the page from which you subscribed so we can personalize your experience — for example, if you subscribed on our crochet page, you will receive crochet-focused content along with highlights from other areas of our website. This is currently the only information we collect. If anything changes, we will update this policy and let you know.',
  },
  {
    title: 'How We Use Your Information',
    content: 'Your name and email are used solely to send you our newsletter and updates about new resources, products, and content that we genuinely believe will benefit you. We do not sell, rent, or share your personal information with anyone — and we never intend to. Your information exists in our care for one reason only: to serve you better.',
  },
  {
    title: 'Cookies',
    content: 'We do not set any cookies on this website ourselves. We have not implemented any cookie-based tracking, analytics, or marketing tools on our end. However, our website contains links to third-party platforms such as Etsy, Fiverr, YouTube, and social media channels which may set their own cookies on your device when you interact with them. Any cookies you encounter are governed by those platforms own policies. We encourage you to review their cookie policies so you feel fully informed.',
  },
  {
    title: 'Third-Party Services',
    content: 'Our website links to third-party platforms including YouTube, GitHub, Amazon Kindle, Amazon Music, Spotify, Apple Podcasts, Apple App Store, Google Play Store, Audible, X (formerly Twitter), LinkedIn, Etsy, Fiverr, TikTok, and Instagram. These platforms operate independently with their own privacy policies. While we actively use and are present on these platforms, we do not control how they handle your data and encourage you to review their privacy policies before engaging with them.',
  },
  {
    title: 'Data Security',
    content: 'We take the security of your information seriously. Your name and email address are stored securely through Close CRM, a trusted and reputable customer relationship management platform with strong security standards. We carefully chose Close CRM to ensure your data is handled with care and professionalism. While no method of transmission over the internet can be guaranteed as 100% secure, please know that we have taken deliberate steps to work with reliable systems to protect your information. If you would like your data removed at any time, simply reach out to us and we will delete your information promptly and without question. Your trust means everything to us.',
  },
  {
    title: 'Your Rights',
    content: 'You are always in control of your information. You can unsubscribe from our newsletter at any time using the link in any email we send. You can also reach out to us at any time to access, correct, or permanently delete your personal data — no questions asked. We believe your data belongs to you and we will always honor that.',
  },
  {
    title: 'Contact Us',
    content: 'If you ever have questions or concerns about this Privacy Policy or how your information is handled, please do not hesitate to reach out. We are happy to help and always open to feedback. You can contact us through our social media channels or the contact information provided on our website.',
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
            <BackButton style={{ color: 'var(--text-dim)', fontSize: '.9rem' }} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}