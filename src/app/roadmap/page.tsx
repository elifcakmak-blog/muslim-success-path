'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

type Status = 'completed' | 'in-progress' | 'upcoming' | 'future'
type RoadmapItem = { icon: string; title: string; desc: string; status: Status }
type Phase = { year: number; month: number; shortLabel: string; period: string; items: RoadmapItem[] }

const allPhases: Phase[] = [
  {
    year: 2024, month: 12, shortLabel: 'Dec', period: 'Dec 2024',
    items: [
      { icon: '🌐', title: 'Code Personal Brand Website', desc: 'Built full site structure: Home, Newsletter, Podcast, Videos, Apps, Books, About, and Roadmap pages.', status: 'completed' },
      { icon: '📋', title: 'Policies & Legal Pages', desc: 'Privacy Policy, Terms of Service, Return Policy, Cookie Policy, and Disclaimer pages.', status: 'completed' },
      { icon: '🤖', title: 'Research AI Models', desc: 'Researched apps and AI tools for future builds.', status: 'completed' },
    ],
  },
  {
    year: 2026, month: 1, shortLabel: 'Jan', period: 'Jan 2026',
    items: [
      { icon: '🔄', title: 'Restructure Personal Brand Site', desc: 'Updated Home page, added Crocheting, Islamic Learning, and Organization pages. Integrated working newsletter subscription.', status: 'completed' },
    ],
  },
  {
    year: 2026, month: 2, shortLabel: 'Feb', period: 'Feb 2026',
    items: [
      { icon: '🎨', title: 'Personal Website Rebrand', desc: 'Full rebrand — removed personal info, defined goals for all 3 websites, completed coding structure.', status: 'completed' },
      { icon: '🗂️', title: 'Product Making & Posting Structure', desc: 'Product design routine, making schedule, social posting system, and editing/publishing workflow.', status: 'completed' },
      { icon: '🏗️', title: 'Effortless Works Website (1/2)', desc: 'Home Page Navs, Business Page Navs, Sub Page Navs, Individual Home Pages, Sub Pages, BYO Pages, and Quest Pages structured.', status: 'completed' },
    ],
  },
  {
    year: 2026, month: 3, shortLabel: 'Mar', period: 'Mar 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Twisted Headband (physical + digital) and Sentro Hat (physical + digital).', status: 'in-progress' },
      { icon: '🏗️', title: 'Effortless Works Website (2/2)', desc: 'Finishing all page aesthetics — Home, Business, Individual, Quest, Courses, Contact, and Final Touches.', status: 'in-progress' },
      { icon: '📊', title: 'Effortless Project Management Sheets', desc: 'Business product line: Project Dashboard, Project Folder, Version Control, and Branch Folder.', status: 'in-progress' },
      { icon: '🎬', title: 'Monthly Content', desc: '3 YouTube videos, 4 podcast episodes, 4 new book chapters, 8 social posts, 8 newsletters, and 2 updated courses.', status: 'in-progress' },
    ],
  },
  {
    year: 2026, month: 4, shortLabel: 'Apr', period: 'Apr 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Knitted Hijab and Sentro Knitted Abaya — physical and digital products.', status: 'upcoming' },
      { icon: '⚔️', title: 'Effortless Quest: Website Skeleton', desc: 'All pre-login pages (Home, About, How To Play) and logged-in Town Hall with all center stubs: Business, Education, Leaderboards, Team, Invention, Charity.', status: 'upcoming' },
      { icon: '🛠️', title: 'Effortless Build Your Own (Business)', desc: 'Website Builder, App Builder, Onboarding Course Builder, Sheets System Builder, and Notion System Builder.', status: 'upcoming' },
      { icon: '📊', title: 'Effortless PM Notion (Business)', desc: 'Notion-format Project Dashboard, Project Folder, Version Control, and Branch Folder.', status: 'upcoming' },
    ],
  },
  {
    year: 2026, month: 5, shortLabel: 'May', period: 'May 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: "Sentro Knitted Men's Shirt and Men's Pants — physical and digital products.", status: 'upcoming' },
      { icon: '🛠️', title: 'Effortless Build Your Own (Business)', desc: 'Completing all BYO builder product pages.', status: 'upcoming' },
      { icon: '📋', title: 'Effortless Back Office Sheets (Business)', desc: 'Sales Tracking, KPI Tracking, Client Tracking, Commission Tracking, Payroll Tracking, and Recruitment Tracking.', status: 'upcoming' },
    ],
  },
  {
    year: 2026, month: 6, shortLabel: 'Jun', period: 'Jun 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Knitted Hijab and Sentro Knitted Abaya — second product run.', status: 'upcoming' },
      { icon: '🏆', title: 'Effortless Quest: Leaderboards & Rewards', desc: 'Community leaderboards for Individuals, Business, Education, Team, Invention, and Charity centers. AI Companion and Town Hall updates.', status: 'upcoming' },
      { icon: '📋', title: 'Effortless Back Office Notion (Business)', desc: 'Notion versions of Sales, KPI, Client, Commission, Payroll, and Recruitment trackers.', status: 'upcoming' },
    ],
  },
  {
    year: 2026, month: 7, shortLabel: 'Jul', period: 'Jul 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: "Sentro Knitted Men's Shirt and Men's Pants — second run.", status: 'upcoming' },
      { icon: '👥', title: 'Effortless Quest: My Team Center', desc: 'Team dashboards connecting Back Office, Project Management, Website/App Builders, and Personal Trackers for both Business and Individual users.', status: 'upcoming' },
      { icon: '📈', title: 'Effortless Personal Trackers Sheets', desc: 'Faith, Family, Self-Care, Nutrition, Exercise, Skills, Business, and Education milestone trackers.', status: 'upcoming' },
    ],
  },
  {
    year: 2026, month: 8, shortLabel: 'Aug', period: 'Aug 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Knitted Hijab and Abaya — third product run.', status: 'upcoming' },
      { icon: '💡', title: 'Effortless Quest: Invention Center', desc: 'Idea Room, AI Companion Brainstorm, Idea Tester Room, and Rising Horizons Command Center (Backlog, Roadmap, Goals).', status: 'upcoming' },
      { icon: '📈', title: 'Effortless Personal Trackers Notion', desc: 'Notion versions of all personal milestone tracker pages.', status: 'upcoming' },
    ],
  },
  {
    year: 2026, month: 9, shortLabel: 'Sep', period: 'Sep 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: "Sentro Knitted Men's Shirt and Pants — third run.", status: 'upcoming' },
      { icon: '🏢', title: 'Effortless Quest: Business Center', desc: 'Virtual Town Hall Business Location Editor, Business Partnerships, My Team (Lobby, Departments, Chats), and Company Goals & Roadmap.', status: 'upcoming' },
      { icon: '📁', title: 'Effortless Personal Projects Sheets', desc: 'Goals Dashboard, Project Dashboard, Project Folder, Version Control, and Branch Folder for individuals.', status: 'upcoming' },
    ],
  },
  {
    year: 2026, month: 10, shortLabel: 'Oct', period: 'Oct 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Knitted Hijab and Abaya — fourth product run.', status: 'upcoming' },
      { icon: '🎓', title: 'Effortless Quest: Education Center', desc: 'Courses dashboard featuring Muslim Success Path courses, community videos, podcasts, apps, books, and inventions library.', status: 'upcoming' },
      { icon: '📁', title: 'Effortless Personal Projects Notion', desc: 'Notion versions of individual personal project management tools.', status: 'upcoming' },
    ],
  },
  {
    year: 2026, month: 11, shortLabel: 'Nov', period: 'Nov 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: "Sentro Knitted Men's Shirt and Pants — fourth run.", status: 'upcoming' },
      { icon: '🤲', title: 'Effortless Quest: Charity Center', desc: 'Community Charity Projects, Free Business Resources, and Free Individual Resources dashboard.', status: 'upcoming' },
      { icon: '🗂️', title: 'Effortless Life Tracker Sheets', desc: 'Goals Dashboard, Project Dashboard, and full tracking folder set for individuals.', status: 'upcoming' },
    ],
  },
  {
    year: 2026, month: 12, shortLabel: 'Dec', period: 'Dec 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Knitted Hijab and Abaya — fifth product run.', status: 'upcoming' },
      { icon: '🗂️', title: 'Effortless Life Tracker Notion', desc: 'Notion version of the complete Life Tracker system for individuals.', status: 'upcoming' },
    ],
  },
  {
    year: 2027, month: 1, shortLabel: 'Jan', period: 'Jan 2027',
    items: [
      { icon: '💻', title: 'Luma MacOS App', desc: 'A macOS desktop app — full details coming soon as development begins.', status: 'future' },
      { icon: '🎙️', title: '5 New Podcast Episodes', desc: 'Expanded podcast season with 5 new episodes.', status: 'future' },
      { icon: '▶️', title: '3 New YouTube Videos', desc: '3 full-length YouTube productions.', status: 'future' },
      { icon: '📱', title: '10 Short Videos', desc: '10 short-form videos posted across all platforms.', status: 'future' },
      { icon: '📚', title: '5 New Book Chapters', desc: 'New chapters for Book 3 in the series.', status: 'future' },
    ],
  },
  {
    year: 2027, month: 2, shortLabel: 'Feb+', period: 'Feb–Dec 2027',
    items: [
      { icon: '🚀', title: 'Future Projects', desc: 'More exciting projects and builds are being planned for the rest of 2027. Stay tuned for updates via the newsletter.', status: 'future' },
    ],
  },
]

const statusStyle: Record<Status, { label: string; dot: string; bg: string; border: string; color: string }> = {
  'completed':   { label: 'Completed',   dot: '#34d399', bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.25)',  color: '#34d399' },
  'in-progress': { label: 'In Progress', dot: '#f5c842', bg: 'rgba(245,200,66,0.08)',  border: 'rgba(245,200,66,0.25)',  color: 'var(--gold)' },
  'upcoming':    { label: 'Upcoming',    dot: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)', color: 'var(--purple)' },
  'future':      { label: 'Future',      dot: '#2dd4bf', bg: 'rgba(45,212,191,0.08)',  border: 'rgba(45,212,191,0.25)',  color: 'var(--teal)' },
}

const years = [...new Set(allPhases.map(p => p.year))].sort()

function getPhaseIndex(year: number, month: number) {
  return allPhases.findIndex(p => p.year === year && p.month === month)
}

function getTodayPhaseIndex(): number {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  // Find exact match first
  const exact = allPhases.findIndex(p => p.year === y && p.month === m)
  if (exact !== -1) return exact
  // Find closest past phase
  let closest = 0
  for (let i = 0; i < allPhases.length; i++) {
    const p = allPhases[i]
    if (p.year < y || (p.year === y && p.month <= m)) closest = i
  }
  return closest
}

export default function RoadmapPage() {
  const [activeIdx, setActiveIdx] = useState<number>(-1)
  const [selectedYear, setSelectedYear] = useState<number>(2026)
  const [animKey, setAnimKey] = useState(0)
  const stripRef = useRef<HTMLDivElement>(null)
  const todayIdx = useRef<number>(0)

  useEffect(() => {
    const idx = getTodayPhaseIndex()
    todayIdx.current = idx
    setActiveIdx(idx)
    setSelectedYear(allPhases[idx].year)
  }, [])

  const phase = activeIdx >= 0 ? allPhases[activeIdx] : null
  const yearPhases = allPhases.filter(p => p.year === selectedYear)

  function goTo(idx: number) {
    if (idx < 0 || idx >= allPhases.length) return
    setActiveIdx(idx)
    setSelectedYear(allPhases[idx].year)
    setAnimKey(k => k + 1)
  }

  function jumpToToday() {
    goTo(todayIdx.current)
  }

  // scroll active month pill into view
  useEffect(() => {
    if (!stripRef.current) return
    const active = stripRef.current.querySelector('[data-active="true"]') as HTMLElement
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeIdx, selectedYear])

  const prevIdx = activeIdx > 0 ? activeIdx - 1 : -1
  const nextIdx = activeIdx < allPhases.length - 1 ? activeIdx + 1 : -1

  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      {/* Hero */}
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '55vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Month-by-Month Build Log</div>
          <h1>The <span className="gold">Roadmap</span></h1>
          <p className="hero-sub">
            Every month has a plan — crochet products, Effortless Works tools, Effortless Quest features, and content. Browse by month or jump straight to today.
          </p>
          <div className="hero-actions">
            <button onClick={jumpToToday} className="btn-gold">Jump to Today →</button>
            <Link href="/#newsletter" className="btn-outline">Get Updates</Link>
          </div>
        </div>
      </section>

      {/* Timeline Navigator */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)', padding: '40px 0 0' }}>
        <RippleCanvas intensity={0.3} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

          {/* Year tabs */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
            {years.map(y => (
              <button
                key={y}
                onClick={() => {
                  setSelectedYear(y)
                  const firstInYear = allPhases.findIndex(p => p.year === y)
                  if (firstInYear !== -1) goTo(firstInYear)
                }}
                style={{
                  padding: '8px 24px', borderRadius: 999, fontSize: '.85rem', fontWeight: 700,
                  border: selectedYear === y ? '1px solid var(--gold)' : '1px solid var(--border-dim)',
                  background: selectedYear === y ? 'rgba(245,200,66,0.12)' : 'transparent',
                  color: selectedYear === y ? 'var(--gold)' : 'var(--text-dim)',
                  letterSpacing: '.05em', transition: 'all .2s',
                }}
              >
                {y}
              </button>
            ))}
          </div>

          {/* Month timeline strip */}
          <div style={{ position: 'relative', marginBottom: 0 }}>
            {/* Connecting line */}
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 0, height: 2,
              background: 'var(--border-dim)', transform: 'translateY(-50%)', zIndex: 0,
            }} />

            {/* Month pills */}
            <div
              ref={stripRef}
              style={{ display: 'flex', gap: 0, overflowX: 'auto', padding: '8px 0 20px', scrollbarWidth: 'none', position: 'relative', zIndex: 1, alignItems: 'center' }}
            >
              {yearPhases.map((p) => {
                const isActive = activeIdx === allPhases.indexOf(p)
                const isToday = allPhases.indexOf(p) === todayIdx.current
                const s = statusStyle[p.items[0]?.status ?? 'upcoming']
                return (
                  <div
                    key={`${p.year}-${p.month}`}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 72, flex: '0 0 auto' }}
                  >
                    {/* Today indicator */}
                    <div style={{ height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                      {isToday && (
                        <span style={{ fontSize: '.55rem', fontWeight: 800, letterSpacing: '.08em', color: 'var(--gold)', textTransform: 'uppercase', background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 999, padding: '1px 6px' }}>Today</span>
                      )}
                    </div>
                    {/* Dot + pill */}
                    <button
                      data-active={isActive}
                      onClick={() => goTo(allPhases.indexOf(p))}
                      style={{
                        position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                        background: isActive ? s.bg : 'var(--bg2)',
                        border: isActive ? `1.5px solid ${s.dot}` : '1.5px solid var(--border-dim)',
                        borderRadius: 999, padding: '6px 14px', cursor: 'pointer', transition: 'all .2s',
                        boxShadow: isActive ? `0 0 14px ${s.dot}44` : 'none',
                        minWidth: 60,
                      }}
                    >
                      {/* Status dot */}
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, display: 'block', boxShadow: isActive ? `0 0 8px ${s.dot}` : 'none', flexShrink: 0 }} />
                      <span style={{ fontSize: '.72rem', fontWeight: 700, color: isActive ? s.dot : 'var(--text-dim)', whiteSpace: 'nowrap', letterSpacing: '.03em' }}>
                        {p.shortLabel}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Month Content */}
      {phase && (
        <section
          key={animKey}
          style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', borderTop: '1px solid var(--border-dim)', padding: '56px 0' }}
        >
          <RippleCanvas intensity={0.45} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

            {/* Month header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div className="s-tag">{phase.period}</div>
                <h2 style={{ fontSize: '1.9rem', fontWeight: 800, margin: '8px 0 0', color: 'var(--text)' }}>
                  {phase.items[0]?.status === 'completed' && <span style={{ color: '#34d399' }}>Completed</span>}
                  {phase.items[0]?.status === 'in-progress' && <span style={{ color: 'var(--gold)' }}>In Progress</span>}
                  {phase.items[0]?.status === 'upcoming' && <span style={{ color: 'var(--purple)' }}>Upcoming</span>}
                  {phase.items[0]?.status === 'future' && <span style={{ color: 'var(--teal)' }}>Future</span>}
                </h2>
              </div>

              {/* Prev / Today / Next */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <button
                  onClick={() => goTo(prevIdx)}
                  disabled={prevIdx === -1}
                  style={{
                    padding: '8px 18px', borderRadius: 8, fontSize: '.8rem', fontWeight: 600,
                    border: '1px solid var(--border-dim)', background: 'transparent',
                    color: prevIdx === -1 ? 'var(--border-dim)' : 'var(--text-dim)',
                    cursor: prevIdx === -1 ? 'default' : 'pointer', transition: 'all .2s',
                  }}
                >
                  ← {prevIdx !== -1 ? allPhases[prevIdx].shortLabel : 'Prev'}
                </button>
                <button
                  onClick={jumpToToday}
                  style={{
                    padding: '8px 18px', borderRadius: 8, fontSize: '.8rem', fontWeight: 700,
                    border: '1px solid rgba(245,200,66,0.4)', background: 'rgba(245,200,66,0.08)',
                    color: 'var(--gold)', cursor: 'pointer', transition: 'all .2s',
                  }}
                >
                  Today
                </button>
                <button
                  onClick={() => goTo(nextIdx)}
                  disabled={nextIdx === -1}
                  style={{
                    padding: '8px 18px', borderRadius: 8, fontSize: '.8rem', fontWeight: 600,
                    border: '1px solid var(--border-dim)', background: 'transparent',
                    color: nextIdx === -1 ? 'var(--border-dim)' : 'var(--text-dim)',
                    cursor: nextIdx === -1 ? 'default' : 'pointer', transition: 'all .2s',
                  }}
                >
                  {nextIdx !== -1 ? allPhases[nextIdx].shortLabel : 'Next'} →
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="res-grid">
              {phase.items.map((item) => {
                const s = statusStyle[item.status]
                return (
                  <div className="res-card" key={item.title} style={{ cursor: 'default', animation: 'fadeUp .4s ease both' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span className="res-icon">{item.icon}</span>
                      <span style={{
                        fontSize: '.6rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
                        padding: '3px 8px', borderRadius: 4, background: s.bg, border: `1px solid ${s.border}`, color: s.color, whiteSpace: 'nowrap',
                      }}>{s.label}</span>
                    </div>
                    <div className="res-name">{item.title}</div>
                    <div className="res-desc">{item.desc}</div>
                  </div>
                )
              })}
            </div>

            {/* Month progress indicator */}
            <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
              <span style={{ fontSize: '.75rem', color: 'var(--text-dim)' }}>
                Month {activeIdx + 1} of {allPhases.length}
              </span>
              <div style={{ flex: 1, maxWidth: 200, height: 3, background: 'var(--border-dim)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 999,
                  background: 'linear-gradient(90deg, #34d399, var(--gold))',
                  width: `${((activeIdx + 1) / allPhases.length) * 100}%`,
                  transition: 'width .4s ease',
                }} />
              </div>
              <span style={{ fontSize: '.75rem', color: 'var(--text-dim)' }}>
                {Math.round(((activeIdx + 1) / allPhases.length) * 100)}% planned
              </span>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="newsletter" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="nl-glow" />
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="nl-icon">🗺️</span>
          <h2 className="nl-title">Stay in the Loop</h2>
          <p className="nl-sub">Subscribe to get notified when new products, courses, apps, and Quest features go live.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link href="/#newsletter" className="btn-gold">Join Newsletter →</Link>
            <Link href="/" className="btn-outline">← Back Home</Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
