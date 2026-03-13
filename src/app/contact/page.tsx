'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import BackButton from '@/components/BackButton'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const socials = [
  {
    href: 'https://www.instagram.com/muslim.success.path',
    label: 'Instagram',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5C842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#F5C842" stroke="none"/>
      </svg>
    ),
  },
  {
    href: 'https://www.tiktok.com/@muslim.success.path',
    label: 'TikTok',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5C842">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.youtube.com/@MuslimSuccessPath',
    label: 'YouTube',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5C842">
        <rect x="2" y="5" width="20" height="14" rx="4"/>
        <polygon points="10,9 16,12 10,15" fill="black"/>
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/company/muslim-success-path/about',
    label: 'LinkedIn',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5C842">
        <rect x="2" y="2" width="20" height="20" rx="3"/>
        <rect x="6" y="10" width="2.5" height="8" fill="black"/>
        <circle cx="7.25" cy="7.25" r="1.5" fill="black"/>
        <path d="M12 10h2.5v1.5s.5-1.5 2.5-1.5 3 1 3 3.5V18h-2.5v-4c0-1-.5-2-1.5-2s-1.5 1-1.5 2v4H12V10z" fill="black"/>
      </svg>
    ),
  },
  {
    href: 'https://x.com/muslimsuccess_',
    label: 'X (Twitter)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5C842">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.etsy.com/shop/EffortlessWorks',
    label: 'Etsy',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5C842">
        <rect x="6" y="4" width="2" height="16"/>
        <rect x="6" y="4" width="10" height="2"/>
        <rect x="6" y="11" width="8" height="2"/>
        <rect x="6" y="18" width="10" height="2"/>
      </svg>
    ),
  },
  {
    href: 'https://github.com/MuslimSuccessPath',
    label: 'GitHub',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5C842">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.fiverr.com/effortlessworks',
    label: 'Fiverr',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5C842">
        <path d="M12.1 11.7H8.4v8.3H5.8v-8.3H3.5V9.3h2.3V8c0-2.9 1.2-4.6 4.5-4.6h2.4v2.4h-1.5c-1.1 0-1.2.4-1.2 1.2v1.3h3.7l-.4 2.4zm4.9-5.3c0 .9-.7 1.6-1.6 1.6s-1.6-.7-1.6-1.6.7-1.6 1.6-1.6 1.6.7 1.6 1.6zm-3 13.6V9.3h2.6v10.7h-2.6z"/>
      </svg>
    ),
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        alert('Something went wrong — please try again or reach out through social media.')
      }
    } catch {
      alert('Something went wrong — please try again or reach out through social media.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(245,200,66,0.18)',
    borderRadius: 8,
    padding: '14px 16px',
    color: 'var(--text)',
    fontSize: '.95rem',
    fontFamily: 'Satoshi, sans-serif',
    outline: 'none',
    transition: 'border-color .2s',
  }

  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      {/* Hero */}
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '40vh' }}>
        <RippleCanvas intensity={0.6} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Get In Touch</div>
          <h1>Contact <span className="gold">Us</span></h1>
          <p className="hero-sub">We would love to hear from you. Whether you have a question, a suggestion, or just want to say salam — our door is always open.</p>
        </div>
      </section>

      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.35} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto' }}>

          {/* Top row: Email form + Community cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginBottom: 72 }}>

            {/* Email Form */}
            <div className="reveal">
              <h3 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.2rem', color: 'var(--gold)', marginBottom: 8 }}>Send Us a Message</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '.9rem', lineHeight: 1.7, marginBottom: 28 }}>
                Have a question about our products, content, or anything else? Fill in the form below and we will get back to you within 2 to 3 business days.
              </p>

              {submitted ? (
                <div style={{ background: 'rgba(245,200,66,0.07)', border: '1px solid rgba(245,200,66,0.25)', borderRadius: 12, padding: '32px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🤲</div>
                  <h4 style={{ color: 'var(--gold)', fontFamily: "'Great Vibes', cursive", fontSize: '1.8rem', marginBottom: 8 }}>JazakAllahu Khayran!</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '.9rem', lineHeight: 1.7 }}>Your message has been received. We will be in touch soon, InshaAllah.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '.8rem', fontWeight: 600, marginBottom: 6, letterSpacing: '.05em', textTransform: 'uppercase' }}>Name *</label>
                      <input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '.8rem', fontWeight: 600, marginBottom: 6, letterSpacing: '.05em', textTransform: 'uppercase' }}>Email *</label>
                      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '.8rem', fontWeight: 600, marginBottom: 6, letterSpacing: '.05em', textTransform: 'uppercase' }}>Subject</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', WebkitAppearance: 'none', background: '#0D0B12', color: formData.subject ? 'var(--text)' : 'rgba(240,234,214,0.35)', cursor: 'pointer' }}>
                      <option value="" style={{ background: '#0D0B12', color: 'rgba(240,234,214,0.35)' }}>Select a topic...</option>
                      <option value="general" style={{ background: '#0D0B12', color: 'var(--text)' }}>General Question</option>
                      <option value="product" style={{ background: '#0D0B12', color: 'var(--text)' }}>Digital Product Support</option>
                      <option value="order" style={{ background: '#0D0B12', color: 'var(--text)' }}>Order Issue</option>
                      <option value="newsletter" style={{ background: '#0D0B12', color: 'var(--text)' }}>Newsletter</option>
                      <option value="collaboration" style={{ background: '#0D0B12', color: 'var(--text)' }}>Collaboration</option>
                      <option value="other" style={{ background: '#0D0B12', color: 'var(--text)' }}>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '.8rem', fontWeight: 600, marginBottom: 6, letterSpacing: '.05em', textTransform: 'uppercase' }}>Message *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn-gold"
                    style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1, transition: 'opacity .2s' }}
                  >
                    {loading ? 'Sending...' : 'Send Message ✦'}
                  </button>
                </div>
              )}
            </div>

            {/* Community Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Discord */}
              <div className="reveal" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,200,66,0.14)', borderRadius: 14, padding: '28px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(88,101,242,0.15)', border: '1px solid rgba(88,101,242,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#5865F2">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1rem' }}>Join Our Discord</h4>
                    <p style={{ color: 'var(--text-dim)', fontSize: '.8rem' }}>Muslim Success Path Community</p>
                  </div>
                </div>
                <p style={{ color: 'var(--text-dim)', fontSize: '.88rem', lineHeight: 1.7, marginBottom: 18 }}>
                  Connect with a community of like-minded Muslims. Share resources, ask questions, and grow together in a safe and supportive space.
                </p>
                <a href="https://discord.gg/muslimsuccesspath" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ display: 'inline-flex', padding: '10px 20px', fontSize: '.85rem' }}>
                  Join the Community →
                </a>
              </div>

              {/* Effortless Quest */}
              <div className="reveal" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,200,66,0.14)', borderRadius: 14, padding: '28px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, flexShrink: 0 }}>
                    <img src="/quest.png" alt="Effortless Quest" width={44} height={44} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1rem' }}>Effortless Quest</h4>
                    <p style={{ color: 'var(--text-dim)', fontSize: '.8rem' }}>effortless.quest</p>
                  </div>
                </div>
                <p style={{ color: 'var(--text-dim)', fontSize: '.88rem', lineHeight: 1.7, marginBottom: 18 }}>
                  Our gamified community platform where you can track your goals, connect with others, and turn your personal growth into an adventure.
                </p>
                <a href="https://www.effortless.quest/" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', padding: '10px 20px', fontSize: '.85rem' }}>
                  Explore Effortless Quest →
                </a>
              </div>

            </div>
          </div>

          {/* Divider */}
          <div className="reveal" style={{ height: 1, background: 'var(--border-dim)', marginBottom: 72 }} />

          {/* Social Links */}
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
            <h3 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.2rem', color: 'var(--gold)', marginBottom: 12 }}>Find Us Online</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '.9rem', lineHeight: 1.7, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
              We are active across these platforms. Come say salam, follow along, or reach out through any of our channels.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              {socials.map(s => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(245,200,66,0.14)',
                    borderRadius: 10, padding: '10px 18px',
                    color: 'var(--text-dim)', fontSize: '.88rem', fontWeight: 600,
                    textDecoration: 'none', transition: 'all .2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,200,66,0.4)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--gold)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(245,200,66,0.06)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,200,66,0.14)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--text-dim)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                  }}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Back button */}
          <div className="reveal">
            <BackButton style={{ color: 'var(--text-dim)', fontSize: '.9rem' }} />
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}