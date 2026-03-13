'use client'
import { useState } from 'react'

interface PageNewsletterProps {
  page: string
  title: string
  sub: string
  icon: string
}

export default function PageNewsletter({ page, title }: PageNewsletterProps) {
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err' | 'noName' | 'noEmail'>('idle')

  const handleSubmit = async () => {
    if (!name.trim())              { setStatus('noName');  setTimeout(() => setStatus('idle'), 3000); return }
    if (!email || !email.includes('@')) { setStatus('noEmail'); setTimeout(() => setStatus('idle'), 3000); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, page }),
      })
      if (res.ok) { setStatus('ok'); setName(''); setEmail('') }
      else        { setStatus('err'); setTimeout(() => setStatus('idle'), 3000) }
    } catch {
      setStatus('err')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div style={{ marginTop: 32, borderTop: '1px solid var(--border-dim)', paddingTop: 28 }}>
      {status === 'ok' ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--teal)', fontSize: '.9rem', marginBottom: 4 }}>Jazakallah Khair 🌙 You&apos;re on the list!</p>
          <p style={{ color: 'var(--text-dim)', fontSize: '.8rem' }}>We&apos;ll be in touch soon, in sha Allah.</p>
        </div>
      ) : (
        <>
          <p style={{ color: 'var(--text-muted)', fontSize: '.75rem', textAlign: 'center', marginBottom: 14, letterSpacing: '.06em', textTransform: 'uppercase' }}>
            ✦ Subscribe for {title.toLowerCase()} updates
          </p>

          {/* Name row */}
          <div className="nl-form" style={{ marginBottom: 10 }}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => { setName(e.target.value); setStatus('idle') }}
              style={status === 'noName' ? { borderColor: 'var(--gold)' } : undefined}
            />
          </div>

          {/* Email + button row */}
          <div className="nl-form">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle') }}
              style={status === 'noEmail' || status === 'err' ? { borderColor: '#e05555' } : undefined}
            />
            <button onClick={handleSubmit} disabled={status === 'loading'} style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </div>

          {status === 'noName'  && <p style={{ textAlign: 'center', marginTop: 8, fontSize: '.8rem', color: 'var(--gold)' }}>We&apos;d love to know your name 🌸</p>}
          {status === 'noEmail' && <p style={{ textAlign: 'center', marginTop: 8, fontSize: '.8rem', color: 'var(--gold)' }}>Don&apos;t forget your email 💌</p>}
          {status === 'err'     && <p style={{ textAlign: 'center', marginTop: 8, fontSize: '.8rem', color: '#e05555' }}>Something went wrong — please try again.</p>}
        </>
      )}
      <p style={{ textAlign: 'center', marginTop: 20, fontSize: '.8rem', color: 'var(--text-muted)' }}>
        For updates about everything on the website, subscribe to our{' '}
        <a href="/#newsletter" style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
           website newsletter
        </a>
        .
      </p>
    </div>
  )
}