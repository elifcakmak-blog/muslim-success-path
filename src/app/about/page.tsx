'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const values = [
  { icon: '🤲', title: 'Faith First', desc: 'Every resource, product, and piece of content is created with taqwa at the centre — to please Allah and benefit the ummah.' },
  { icon: '💛', title: 'Accessibility', desc: 'Islamic knowledge and tools should be available to every Muslim, regardless of background, location, or experience level.' },
  { icon: '🌱', title: 'Intentional Growth', desc: 'We believe in growing both in deen and dunya — and that the two are not in conflict when approached with the right intention.' },
  { icon: '✦', title: 'Quality Over Quantity', desc: 'Every book, pattern, template, and course is crafted carefully — not rushed, not generic, but made with care and reflection.' },
]

export default function AboutPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      {/* Hero */}
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Faith · Purpose · Community</div>
          <h1>
            Built on <span className="gold">Faith</span>,<br />
            Designed for Growth
          </h1>
          <p className="hero-sub">
            Muslim Success Path is a platform dedicated to Islamic knowledge and resources that empower individuals on their journey of faith and personal development.
          </p>
          <div className="hero-actions">
            <Link href="/#newsletter" className="btn-gold">Join the Community →</Link>
            <Link href="/roadmap" className="btn-outline">View Roadmap</Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section about" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="about-inner reveal" style={{ position: 'relative', zIndex: 2 }}>
          <div className="about-text">
            <div className="s-tag">Our Mission</div>
            <h2 className="s-title">Why We<br />Exist</h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: 20, fontSize: '.95rem' }}>
              Muslim Success Path is dedicated to helping Muslims on a journey of faith, growth, and purposeful living. Our mission is to help you strengthen your iman, develop your skills, and live intentionally in every aspect of life.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: 20, fontSize: '.95rem' }}>
              Since 2024, we&apos;ve been sharing insights and practical resources to make learning, worship, and daily routines more meaningful and manageable — combining experience, knowledge, and a focus on faith-centered growth to help Muslims cultivate clarity, discipline, and purpose.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, fontSize: '.95rem' }}>
              Today, we are a trusted companion on the path of intentional Muslim living. Our goal is to help you simplify your life, grow spiritually, and achieve your aspirations — through learning resources, practical tools, and creative projects designed to inspire and uplift.
            </p>
          </div>
          <div className="about-quote">
            &ldquo;When learning and creating in line with Islam is effortless, life becomes{' '}
            <span>simpler, more intentional,</span> and more meaningful.&rdquo;
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">What We Stand For</div>
            <h2 className="s-title">Our Values</h2>
            <p className="s-sub">The principles that guide everything we create and every decision we make.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {values.map((v) => (
              <div className="pillar" key={v.title}>
                <span className="pillar-icon">{v.icon}</span>
                <div className="pillar-title">{v.title}</div>
                <p className="pillar-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="newsletter" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="nl-glow" />
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="nl-icon">✦</span>
          <h2 className="nl-title">Join the Path</h2>
          <p className="nl-sub">Follow along on social media or subscribe to the newsletter — we'd love to have you in the community.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link href="/#newsletter" className="btn-gold">Subscribe →</Link>
            <a href="https://www.instagram.com/muslim.success.path" target="_blank" rel="noopener noreferrer" className="btn-outline">Instagram</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
