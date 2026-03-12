'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import BackButton from '@/components/BackButton'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

type Status = 'completed' | 'in-progress' | 'upcoming' | 'future'
type RoadmapItem = { icon: string; title: string; desc: string; status: Status; repo?: string; links?: { label: string; url: string }[] }
type Phase = { year: number; month: number; shortLabel: string; period: string; items: RoadmapItem[] }

const allPhases: Phase[] = [
  {
    year: 2024, month: 12, shortLabel: 'Dec', period: 'Dec 2024',
    items: [
      { icon: '🏗️', title: 'Coded First Version of Muslim Success Path Website', desc: 'Built full site structure: Home, Newsletter, Podcast, Videos, Apps, Books, About, and Roadmap pages.', status: 'completed', repo: 'https://github.com/Muslim-Success-Path/old-muslimsuccesspath' },
      { icon: '🏗️', title: 'Coded First Version of Effortless Works Website', desc: 'Home Page Navs, Business Page Navs, Sub Page Navs, Individual Home Pages, Sub Pages, BYO Pages, and Quest Pages structured.', status: 'completed', repo: 'https://github.com/Effortless-Works-MSP/old-effortlessworks' },
      { icon: '🏗️', title: 'Coded First Version of Effortless Quest Website ', desc: 'All pre-login pages (Home, About, How To Play) and logged-in Town Hall with all center stubs: Business, Education, Leaderboards, Team, Invention, Charity.', status: 'completed', repo: 'https://github.com/effortless-quest/old-effortlessquest' },
      { icon: '📋', title: 'Learned and Built the Policies & Legal Pages', desc: 'Privacy Policy, Terms of Service, Return Policy, Cookie Policy, and Disclaimer pages.', status: 'completed', repo: 'https://github.com/effortless-quest/old-luma' },
      { icon: '🤖', title: 'Research AI Models', desc: 'Researched AI and even tried training our own AI model. Was a great learning experience.', status: 'completed' , repo: 'https://github.com/effortless-quest/old-luma'},
    ],
  },
  {
    year: 2025, month: 1, shortLabel: 'Jan–Dec', period: '2025',
    items: [
      {
        icon: '🎯',
        title: 'Career Focus Year',
        desc: 'A year dedicated to personal career growth outside of our businesses — intentional, necessary, and foundational to what comes next.',
        status: 'completed',
        links: [
          { label: 'Muslim Success Path', url: 'https://www.linkedin.com/company/muslim-success-path' },
          { label: 'Effortless Works',    url: 'https://www.linkedin.com/company/effortless-works-msp' },
          { label: 'Effortless Quest',    url: 'https://www.linkedin.com/company/effortless-quest-msp' },
        ],
      },
    ],
  },
  {
    year: 2026, month: 1, shortLabel: 'Jan', period: 'Jan 2026',
    items: [
      { icon: '🏗️', title: 'Coded 1/2 Second Version of Muslim Success Path Website', desc: 'Updated Home page, added Crocheting, Islamic Learning, and Organization pages. Integrated working newsletter subscription.', status: 'completed' , repo: 'https://github.com/Muslim-Success-Path/old-muslimsuccesspath'},
    ],
  },
  {
    year: 2026, month: 2, shortLabel: 'Feb', period: 'Feb 2026',
    items: [
      { icon: '🏗️', title: 'Coded 2/2 Second Version of Muslim Success Path Website', desc: 'Full rebrand — removed personal info, defined goals for all 3 websites, completed coding structure.', status: 'completed', repo: 'https://github.com/Muslim-Success-Path/old-muslimsuccesspath' },
      { icon: '🗂️', title: 'Product Making & Posting Structure', desc: 'Product design routine, making schedule, social posting system, and editing/publishing workflow.', status: 'completed', links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/#pipeline' }] },
      { icon: '🏗️', title: 'Coded Second Version of Effortless Works Website', desc: 'Home Page Navs, Business Page Navs, Sub Page Navs, Individual Home Pages, Sub Pages, BYO Pages, and Quest Pages structured.', status: 'completed', repo: 'https://github.com/Effortless-Works-MSP/old-effortlessworks' },
    ],
  },
 {
    year: 2026, month: 3, shortLabel: 'Mar', period: 'Mar 2026',
    items: [
      { icon: '🏗️', title: 'Coded Third Version of Effortless Works Website (current)', desc: 'Used Claude Ai for the first time on the claude website to help code and design website. Was 10/10 the best expereince. Completed Website in 8 hours.', status: 'completed', repo: 'https://github.com/Effortless-Works-MSP/effortless-works' },
      { icon: '🏗️', title: 'Coded Third Version of Muslim Success Path Website (current)', desc: 'Used Claude Code for the first time in the terminal to help code and design website. Was 10/10 the best expereince. Completed Website in 4 hours.', status: 'completed', repo: 'https://github.com/Muslim-Success-Path/muslim-success-path' },
      { icon: '🏗️', title: 'Coded Luma AI App', desc: 'Used Claude Code for the second time in the terminal. I plan on posting it soon to my websites for public use. Completed in 2 hours.', status: 'completed', links: [{ label: 'Effortless Quest', url: 'https://www.effortless.quest/#luma' }] },
      { icon: '🏗️', title: 'Coded Second Version of Effortless Quest Website', desc: 'Used Claude Website to code All pre-login pages (Home, About, How To Play) and logged-in Town Hall with all center stubs: Business, Education, Leaderboards, Team, Invention, Charity. Coded in 5 hours.', status: 'completed', repo: 'https://github.com/Effortless-Quest/effortless-quest' },
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Twisted Headband (physical + digital) and Sentro Hat (physical + digital).', status: 'in-progress' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/crocheting' }]},
      { icon: '📊', title: 'Effortless Project Management Sheets', desc: 'Business product line: Project Dashboard, Project Folder, Version Control, and Branch Folder.', status: 'in-progress', links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/000010/pm-sheets' }] },
      { icon: '🎬', title: 'Monthly Content', desc: '3 YouTube videos, 4 podcast episodes, 4 new book chapters, 8 social posts, 8 newsletters, and 2 updated courses.', status: 'in-progress', links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/#pipeline' }] },
      { icon: '🏆', title: 'Effortless Quest: Leaderboards & Rewards', desc: 'Community leaderboards for Individuals, Business, Education, Team, Invention, and Charity centers. AI Companion and Town Hall updates.', status: 'in-progress' , repo: 'https://github.com/Effortless-Quest/effortless-quest'},
      { icon: '👥', title: 'Effortless Quest: My Team Center', desc: 'Team dashboards connecting Back Office, Project Management, Website/App Builders, and Personal Trackers for both Business and Individual users.', status: 'in-progress', repo: 'https://github.com/Effortless-Quest/effortless-quest' },
      { icon: '💡', title: 'Effortless Quest: Invention Center', desc: 'Idea Room, AI Companion Brainstorm, Idea Tester Room, and Rising Horizons Command Center (Backlog, Roadmap, Goals).', status: 'in-progress', repo: 'https://github.com/Effortless-Quest/effortless-quest' },
      { icon: '🏢', title: 'Effortless Quest: Business Center', desc: 'Virtual Town Hall Business Location Editor, Business Partnerships, My Team (Lobby, Departments, Chats), and Company Goals & Roadmap.', status: 'in-progress' , repo: 'https://github.com/Effortless-Quest/effortless-quest'},
      { icon: '🎓', title: 'Effortless Quest: Education Center', desc: 'Courses dashboard featuring Muslim Success Path courses, community videos, podcasts, apps, books, and inventions library.', status: 'in-progress', repo: 'https://github.com/Effortless-Quest/effortless-quest' },
      { icon: '🤲', title: 'Effortless Quest: Charity Center', desc: 'Community Charity Projects, Free Business Resources, and Free Individual Resources dashboard.', status: 'in-progress' , repo: 'https://github.com/Effortless-Quest/effortless-quest'},
    ],
  },
  {
    year: 2026, month: 4, shortLabel: 'Apr', period: 'Apr 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Knitted Hijab and Sentro Knitted Abaya — physical and digital products.', status: 'upcoming' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/crocheting' }]},
      { icon: '🛠️', title: 'Effortless Build Your Own (Business)', desc: 'Website Builder, App Builder, Onboarding Course Builder, Sheets System Builder, and Notion System Builder.', status: 'upcoming', links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/build-your-own' }]  },
      { icon: '📊', title: 'Effortless PM Notion (Business)', desc: 'Notion-format Project Dashboard, Project Folder, Version Control, and Branch Folder.', status: 'upcoming' , links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/000010/pm-notion' }] },
      { icon: '🎬', title: 'Monthly Content', desc: '3 YouTube videos, 4 podcast episodes, 4 new book chapters, 8 social posts, 8 newsletters, and 2 updated courses.', status: 'upcoming' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/#pipeline' }] },
    ],
  },
  {
    year: 2026, month: 5, shortLabel: 'May', period: 'May 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: "Sentro Knitted Men's Shirt and Men's Pants — physical and digital products.", status: 'upcoming' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/crocheting' }]},
      { icon: '🛠️', title: 'Effortless Build Your Own (Business)', desc: 'Completing all BYO builder product pages.', status: 'upcoming' , links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/build-your-own' }] },
      { icon: '📋', title: 'Effortless Back Office Sheets (Business)', desc: 'Sales Tracking, KPI Tracking, Client Tracking, Commission Tracking, Payroll Tracking, and Recruitment Tracking.', status: 'upcoming' , links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/000009/bo-sheets' }] },
      { icon: '🎬', title: 'Monthly Content', desc: '3 YouTube videos, 4 podcast episodes, 4 new book chapters, 8 social posts, 8 newsletters, and 2 updated courses.', status: 'upcoming' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/#pipeline' }] },
    ],
  },
  {
    year: 2026, month: 6, shortLabel: 'Jun', period: 'Jun 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Knitted Hijab and Sentro Knitted Abaya — second product run.', status: 'upcoming' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/crocheting' }]},
      { icon: '📋', title: 'Effortless Back Office Notion (Business)', desc: 'Notion versions of Sales, KPI, Client, Commission, Payroll, and Recruitment trackers.', status: 'upcoming' , links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/000009/bo-notion' }] },
      { icon: '🎬', title: 'Monthly Content', desc: '3 YouTube videos, 4 podcast episodes, 4 new book chapters, 8 social posts, 8 newsletters, and 2 updated courses.', status: 'upcoming' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/#pipeline' }] },
    ],
  },
  {
    year: 2026, month: 7, shortLabel: 'Jul', period: 'Jul 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: "Sentro Knitted Men's Shirt and Men's Pants — second run.", status: 'upcoming', links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/crocheting' }] },
      { icon: '📈', title: 'Effortless Personal Trackers Sheets', desc: 'Faith, Family, Self-Care, Nutrition, Exercise, Skills, Business, and Education milestone trackers.', status: 'upcoming' , links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/000013/pt-sheets' }]  },
      { icon: '🎬', title: 'Monthly Content', desc: '3 YouTube videos, 4 podcast episodes, 4 new book chapters, 8 social posts, 8 newsletters, and 2 updated courses.', status: 'upcoming', links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/#pipeline' }]  },
    ],
  },
  {
    year: 2026, month: 8, shortLabel: 'Aug', period: 'Aug 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Knitted Hijab and Abaya — third product run.', status: 'upcoming' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/crocheting' }]},
      { icon: '📈', title: 'Effortless Personal Trackers Notion', desc: 'Notion versions of all personal milestone tracker pages.', status: 'upcoming' , links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/000013/pt-notion' }] },
      { icon: '🎬', title: 'Monthly Content', desc: '3 YouTube videos, 4 podcast episodes, 4 new book chapters, 8 social posts, 8 newsletters, and 2 updated courses.', status: 'upcoming' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/#pipeline' }] },
    ],
  },
  {
    year: 2026, month: 9, shortLabel: 'Sep', period: 'Sep 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: "Sentro Knitted Men's Shirt and Pants — third run.", status: 'upcoming', links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/crocheting' }] },
      { icon: '📁', title: 'Effortless Personal Projects Sheets', desc: 'Goals Dashboard, Project Dashboard, Project Folder, Version Control, and Branch Folder for individuals.', status: 'upcoming' , links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/000014/pp-sheets' }] },
      { icon: '🎬', title: 'Monthly Content', desc: '3 YouTube videos, 4 podcast episodes, 4 new book chapters, 8 social posts, 8 newsletters, and 2 updated courses.', status: 'upcoming' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/#pipeline' }] },
    ],
  },
  {
    year: 2026, month: 10, shortLabel: 'Oct', period: 'Oct 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Knitted Hijab and Abaya — fourth product run.', status: 'upcoming', links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/crocheting' }] },
      { icon: '📁', title: 'Effortless Personal Projects Notion', desc: 'Notion versions of individual personal project management tools.', status: 'upcoming' , links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/000014/pp-notion' }] },
      { icon: '🎬', title: 'Monthly Content', desc: '3 YouTube videos, 4 podcast episodes, 4 new book chapters, 8 social posts, 8 newsletters, and 2 updated courses.', status: 'upcoming' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/#pipeline' }] },
    ],
  },
  {
    year: 2026, month: 11, shortLabel: 'Nov', period: 'Nov 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: "Sentro Knitted Men's Shirt and Pants — fourth run.", status: 'upcoming', links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/crocheting' }] },
      { icon: '🗂️', title: 'Effortless Life Tracker Sheets', desc: 'Goals Dashboard, Project Dashboard, and full tracking folder set for individuals.', status: 'upcoming' , links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/000012/lt-sheets' }] },
      { icon: '🎬', title: 'Monthly Content', desc: '3 YouTube videos, 4 podcast episodes, 4 new book chapters, 8 social posts, 8 newsletters, and 2 updated courses.', status: 'upcoming', links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/#pipeline' }]  },
    ],
  },
  {
    year: 2026, month: 12, shortLabel: 'Dec', period: 'Dec 2026',
    items: [
      { icon: '🧶', title: '2 Crochet Projects', desc: 'Sentro Knitted Hijab and Abaya — fifth product run.', status: 'upcoming', links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/crocheting' }] },
      { icon: '🗂️', title: 'Effortless Life Tracker Notion', desc: 'Notion version of the complete Life Tracker system for individuals.', status: 'upcoming' , links: [{ label: 'Effortless Works', url: 'https://www.effortlessworks.store/000012/lt-notion' }] },
      { icon: '🎬', title: 'Monthly Content', desc: '3 YouTube videos, 4 podcast episodes, 4 new book chapters, 8 social posts, 8 newsletters, and 2 updated courses.', status: 'upcoming' , links: [{ label: 'Muslim Success Path', url: 'https://www.muslimsuccesspath.com/#pipeline' }] },
    ],
  },
  {
    year: 2027, month: 1, shortLabel: 'Jan+', period: 'Feb–Dec 2027',
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

// Derive the overall status for a phase by priority:
// in-progress > upcoming > future > completed (only if ALL are completed)
function getPhaseStatus(items: RoadmapItem[]): Status {
  if (items.some(i => i.status === 'in-progress')) return 'in-progress'
  if (items.some(i => i.status === 'upcoming'))    return 'upcoming'
  if (items.some(i => i.status === 'future'))      return 'future'
  return 'completed'
}

function getTodayPhaseIndex(): number {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  const exact = allPhases.findIndex(p => p.year === y && p.month === m)
  if (exact !== -1) return exact
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
                const globalIdx = allPhases.indexOf(p)
                const isActive = activeIdx === globalIdx
                const isToday = globalIdx === todayIdx.current
                // Use derived phase status instead of first item's status
                const phaseStatus = getPhaseStatus(p.items)
                const s = statusStyle[phaseStatus]
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
                      onClick={() => goTo(globalIdx)}
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
                  {/* Use derived phase status for the header label */}
                  {(() => {
                    const overall = getPhaseStatus(phase.items)
                    const s = statusStyle[overall]
                    return <span style={{ color: s.color }}>{s.label}</span>
                  })()}
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
                    {item.repo && (
                      <a
                        href={item.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14,
                          fontSize: '.72rem', fontWeight: 700, letterSpacing: '.04em',
                          padding: '5px 12px', borderRadius: 6,
                          border: '1px solid var(--border-dim)',
                          background: 'rgba(255,255,255,0.04)',
                          color: 'var(--text-dim)', textDecoration: 'none',
                          transition: 'all .2s',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(245,200,66,0.5)'
                          ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'
                          ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(245,200,66,0.08)'
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-dim)'
                          ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dim)'
                          ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)'
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        View Repository
                      </a>
                    )}
                    {item.links && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                        {item.links.map(link => {
                          const isMSP = link.url.includes('muslimsuccesspath')
                          const isLinkedIn = link.url.includes('linkedin')
                          const isEW = link.url.includes('effortlessworks')
                          const isEQ = link.url.includes('effortless.quest')
                          return (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                fontSize: '.72rem', fontWeight: 700, letterSpacing: '.04em',
                                padding: '5px 12px', borderRadius: 6,
                                border: '1px solid var(--border-dim)',
                                background: 'rgba(255,255,255,0.04)',
                                color: 'var(--text-dim)', textDecoration: 'none',
                                transition: 'all .2s',
                              }}
                              onMouseEnter={e => {
                                const el = e.currentTarget as HTMLAnchorElement
                                if (isMSP) {
                                  el.style.borderColor = 'rgba(245,200,66,0.5)'
                                  el.style.color = 'var(--gold)'
                                  el.style.background = 'rgba(245,200,66,0.08)'
                                } else if (isEW) {
                                  el.style.borderColor = 'rgba(107,153,118,0.6)'
                                  el.style.color = '#6b9976'
                                  el.style.background = 'rgba(107,153,118,0.08)'
                                } else if (isEQ) {
                                  el.style.borderColor = 'rgba(167,139,250,0.6)'
                                  el.style.color = '#a78bfa'
                                  el.style.background = 'rgba(167,139,250,0.08)'
                                } else {
                                  el.style.borderColor = 'rgba(10,102,194,0.6)'
                                  el.style.color = '#0a66c2'
                                  el.style.background = 'rgba(10,102,194,0.08)'
                                }
                              }}
                              onMouseLeave={e => {
                                const el = e.currentTarget as HTMLAnchorElement
                                el.style.borderColor = 'var(--border-dim)'
                                el.style.color = 'var(--text-dim)'
                                el.style.background = 'rgba(255,255,255,0.04)'
                              }}
                            >
                              {isMSP ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
                                  <polygon points="18,1 19,3.5 21.5,4 19,5 18,7.5 17,5 14.5,4 17,3.5"/>
                                </svg>
                              ) : isEW ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                                  <path d="M6 9.5 C7.5 7.5 10 7.5 12 9 C14 10.5 16.5 10.5 18 8.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                  <circle cx="12" cy="12.5" r="1.5"/>
                                  <path d="M6 16 Q12 11 18 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                              ) : isEQ ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="2" y1="2" x2="12" y2="12"/>
                                  <path d="M2 2 L5 2 L2 5 Z" fill="currentColor" stroke="none"/>
                                  <line x1="22" y1="2" x2="12" y2="12"/>
                                  <path d="M22 2 L19 2 L22 5 Z" fill="currentColor" stroke="none"/>
                                  <line x1="12" y1="12" x2="5" y2="19"/>
                                  <line x1="12" y1="12" x2="19" y2="19"/>
                                  <path d="M4 20 L6 18 L8 20 L6 22 Z" fill="currentColor" stroke="none"/>
                                  <path d="M20 20 L18 18 L16 20 L18 22 Z" fill="currentColor" stroke="none"/>
                                </svg>
                              ) : isLinkedIn ? (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              ) : null}
                              {link.label}
                            </a>
                          )
                        })}
                      </div>
                    )}
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
            <BackButton className="btn-outline" />
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