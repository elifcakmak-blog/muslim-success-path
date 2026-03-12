'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import RippleCanvas from '@/components/RippleCanvas'

const PIPELINES = [
  {
    id: 'crocheting',
    label: '🧶 Crocheting',
    color: '#F5C842',
    nodes: [
      { id: 'c1', icon: '✏️', name: 'Design',          detail: 'Sketch the concept, choose yarn, plan the pattern structure.' },
      { id: 'c2', icon: '🎬', name: 'Make & Record',   detail: 'Crochet the piece while filming the full creation process.' },
      { id: 'c3', icon: '✂️', name: 'Edit Footage',    detail: 'Edit the recorded footage before publishing to any platform.' },
      { id: 'c4', icon: '📦', name: 'Physical Etsy',   detail: 'List the finished handmade item for sale on Etsy.' },
      { id: 'c5', icon: '📝', name: 'Digital Pattern', detail: 'Write the how-to pattern and list as a digital download on Etsy.' },
      { id: 'c6', icon: '📚', name: 'Book Chapter',    detail: 'Pattern becomes a chapter in the crochet book series on Kindle.' },
      { id: 'c7', icon: '▶️', name: 'YouTube',         detail: 'Post the full video to YouTube + cut short clips for all platforms.' },
      { id: 'c8', icon: '🎓', name: 'Courses',         detail: 'Incorporate the new pattern into the relevant crochet course.' },
      { id: 'c9', icon: '📣', name: 'Marketing',       detail: 'Project complete — sent to the Marketing pipeline.' },
    ],
    edges: [
      ['c1','c2'],['c2','c3'],['c3','c4'],['c3','c5'],['c3','c7'],
      ['c5','c6'],['c6','c8'],['c4','c9'],['c7','c9'],['c8','c9'],
    ],
  },
  {
    id: 'islamic',
    label: '☪️ Islamic Books',
    color: '#a78bfa',
    nodes: [
      { id: 'i1', icon: '🌙', name: 'Reflection Post', detail: 'Write a Quran Reflection Post — the seed of all Islamic content.' },
      { id: 'i2', icon: '📚', name: 'Book Chapter',    detail: 'Turn the reflection into a chapter in the Islamic book series.' },
      { id: 'i3', icon: '🎙️', name: 'Voice Over',     detail: 'Record an audio reading of the chapter for the podcast.' },
      { id: 'i4', icon: '🎧', name: 'Podcast',         detail: 'Post to Spotify, Apple Podcasts, and all audio platforms.' },
      { id: 'i5', icon: '▶️', name: 'YouTube',         detail: 'Turn the voice-over into a visual YouTube video.' },
      { id: 'i6', icon: '📖', name: 'Publish Book',    detail: 'Chapters compile into a full Kindle & KDP print book.' },
      { id: 'i7', icon: '📣', name: 'Marketing',       detail: 'Project complete — sent to the Marketing pipeline.' },
    ],
    edges: [
      ['i1','i2'],['i2','i3'],['i3','i4'],['i3','i5'],
      ['i2','i6'],['i4','i7'],['i5','i7'],['i6','i7'],
    ],
  },
  {
    id: 'effortless',
    label: '🗂️ Effortless Works',
    color: '#6ee7b7',
    nodes: [
      { id: 'e1', icon: '✏️', name: 'Design',      detail: 'Plan the template or tool structure and use case.' },
      { id: 'e2', icon: '🔨', name: 'Build',        detail: 'Build the Google Sheet, Notion template, website, or app.' },
      { id: 'e3', icon: '🎬', name: 'Record',       detail: 'Record a full walkthrough video of the product in use.' },
      { id: 'e4', icon: '🛒', name: 'Publish',      detail: 'List digital product on Etsy and effortlessworks.store.' },
      { id: 'e5', icon: '▶️', name: 'YouTube',      detail: 'Edit and post the walkthrough video to YouTube.' },
      { id: 'e6', icon: '📝', name: 'PDF Guide',    detail: 'Write a PDF step-by-step companion to the video.' },
      { id: 'e7', icon: '📚', name: 'Book Chapter', detail: 'PDF becomes a chapter in the Effortless Works guide series.' },
      { id: 'e8', icon: '🎓', name: 'Courses',      detail: 'Add the new product to relevant courses.' },
      { id: 'e9', icon: '📣', name: 'Marketing',    detail: 'Project complete — sent to the Marketing pipeline.' },
    ],
    edges: [
      ['e1','e2'],['e2','e3'],['e3','e4'],['e3','e5'],['e3','e6'],
      ['e6','e7'],['e7','e8'],['e4','e9'],['e5','e9'],['e8','e9'],
    ],
  },
  {
    id: 'marketing',
    label: '📣 Marketing',
    color: '#f472b6',
    nodes: [
      { id: 'm1', icon: '🆕', name: 'New Project',    detail: 'Triggered when any pipeline sends a completed project to marketing.' },
      { id: 'm2', icon: '🎬', name: '5 Short Videos', detail: 'Create 5 short-form clips promoting the product for social media.' },
      { id: 'm3', icon: '📱', name: 'Post Everywhere',detail: 'Post to Instagram, TikTok, YouTube Shorts, Facebook, and LinkedIn.' },
      { id: 'm4', icon: '✉️', name: 'Newsletter',     detail: 'Write and send a newsletter feature highlighting the new product.' },
      { id: 'm5', icon: '✅', name: 'Complete',        detail: 'Product Marketing Complete — all marketing tasks finished.' },
    ],
    edges: [
      ['m1','m2'],['m2','m3'],['m3','m4'],['m4','m5'],
    ],
  },
]

// ── Desktop layout: column × row grid (original behaviour) ──
function buildDesktopLayout(nodes: typeof PIPELINES[0]['nodes'], w: number, h: number) {
  const count = nodes.length
  const cols = Math.ceil(count / 3)
  return nodes.map((n, i) => {
    const col = Math.floor(i / 3)
    const row = i % 3
    const x = 80 + (cols <= 1 ? 0 : (col / (cols - 1))) * (w - 160)
    const y = 80 + (row / 2) * (h - 160)
    return { ...n, x, y }
  })
}


// Mobile layout — 3 columns, small nodes, generous spacing
const NODE_R    = 26   // half of node size for edge offset
const NODE_SIZE = 52   // small nodes so there's room for arrows
const COL_GAP_V = 105  // vertical gap between nodes in same column
const COL_GAP_H = 0.28 // columns at 28% / 50% / 72% of width

function buildMobileLayout(nodes: typeof PIPELINES[0]['nodes'], w: number) {
  // 3-column positions
  const cols = [
    Math.round(w * COL_GAP_H),
    Math.round(w * 0.5),
    Math.round(w * (1 - COL_GAP_H)),
  ]
  // Track y per column
  const colY = [
    NODE_SIZE / 2 + 20,
    NODE_SIZE / 2 + 20 + COL_GAP_V * 0.4,
    NODE_SIZE / 2 + 20 + COL_GAP_V * 0.8,
  ]
  return nodes.map((n, i) => {
    const col = i % 3
    const x   = cols[col]
    const y   = colY[col]
    colY[col] += COL_GAP_V
    return { ...n, x, y }
  })
}

function mobileCanvasHeight(nodeCount: number): number {
  const rowsPerCol = Math.ceil(nodeCount / 3)
  return rowsPerCol * COL_GAP_V + NODE_SIZE + 48
}



type NodePos = ReturnType<typeof buildDesktopLayout>[number]

function GraphView({
  pipeline,
  width,
  height,
}: {
  pipeline: typeof PIPELINES[0]
  width: number
  height: number
}) {
  const [positions, setPositions] = useState<NodePos[]>(() => buildDesktopLayout(pipeline.nodes, width, height))
  const [selected, setSelected]   = useState<string | null>(null)
  const [tooltip,  setTooltip]    = useState<NodePos | null>(null)
  const dragging  = useRef<{ id: string; ox: number; oy: number } | null>(null)
  const graphRef  = useRef<HTMLDivElement>(null)

  // Recompute layout when pipeline, size or mobile flag changes
  useEffect(() => {
    setPositions(buildDesktopLayout(pipeline.nodes, width, height))
    setSelected(null)
    setTooltip(null)
  }, [pipeline.id, width, height])

  const getPos = useCallback((id: string) => positions.find(p => p.id === id), [positions])

  const clampPos = useCallback(
    (x: number, y: number) => ({
      x: Math.max(44, Math.min(width  - 44, x)),
      y: Math.max(44, Math.min(height - 44, y)),
    }),
    [width, height]
  )

  const onMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    dragging.current = { id, ox: e.clientX, oy: e.clientY }
    setSelected(id)
  }
  const onTouchStart = (e: React.TouchEvent, id: string) => {
    const t = e.touches[0]
    dragging.current = { id, ox: t.clientX, oy: t.clientY }
    setSelected(id)
  }

  useEffect(() => {
    // Mouse events — page scroll is never affected by mouse drags
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const { id, ox, oy } = dragging.current
      const dx = e.clientX - ox, dy = e.clientY - oy
      dragging.current = { id, ox: e.clientX, oy: e.clientY }
      setPositions(prev => prev.map(p => {
        if (p.id !== id) return p
        const { x, y } = clampPos(p.x + dx, p.y + dy)
        return { ...p, x, y }
      }))
    }
    const onMouseUp = () => { dragging.current = null }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)

    // Touch move attached to the graph container with passive:false so we
    // can call preventDefault() to block page scroll while dragging a bubble.
    // Touches outside the graph container are unaffected — normal scroll works.
    const el = graphRef.current
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return
      e.preventDefault() // blocks page scroll only when a bubble is being dragged
      const t = e.touches[0]
      const { id, ox, oy } = dragging.current
      const dx = t.clientX - ox, dy = t.clientY - oy
      dragging.current = { id, ox: t.clientX, oy: t.clientY }
      setPositions(prev => prev.map(p => {
        if (p.id !== id) return p
        const { x, y } = clampPos(p.x + dx, p.y + dy)
        return { ...p, x, y }
      }))
    }
    const onTouchEnd = () => { dragging.current = null }

    el?.addEventListener('touchmove', onTouchMove, { passive: false })
    el?.addEventListener('touchend',  onTouchEnd)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
      el?.removeEventListener('touchmove', onTouchMove)
      el?.removeEventListener('touchend',  onTouchEnd)
    }
  }, [clampPos])

  const col = pipeline.color

  // Tooltip: on mobile keep it within bounds more aggressively
  const tooltipStyle = (pos: NodePos) => {
    const left = pos.x > width * 0.6 ? pos.x - 210 : pos.x + 50
    const top  = Math.min(Math.max(pos.y - 44, 8), height - 110)
    return { left, top }
  }

  return (
    <div ref={graphRef} style={{ position: 'relative', width, height }}>
      {/* SVG edges */}
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <defs>
          <marker
            id={`arr-${pipeline.id}`}
            markerWidth="8" markerHeight="8"
            refX="6" refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill={col + '70'} />
          </marker>
        </defs>
        {pipeline.edges.map(([a, b], i) => {
          const pa = getPos(a), pb = getPos(b)
          if (!pa || !pb) return null
          const dx = pb.x - pa.x, dy = pb.y - pa.y
          const len = Math.sqrt(dx * dx + dy * dy) || 1
          const r = 40
          const sx = pa.x + (dx / len) * r, sy = pa.y + (dy / len) * r
          const ex = pb.x - (dx / len) * r, ey = pb.y - (dy / len) * r

          const mx = (sx + ex) / 2
          const my = (sy + ey) / 2 - 18

          return (
            <path
              key={i}
              d={`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`}
              fill="none"
              stroke={col + '55'}
              strokeWidth='1.5'
              strokeDasharray="4 3"
              markerEnd={`url(#arr-${pipeline.id})`}
            />
          )
        })}
      </svg>

      {/* Nodes */}
      {positions.map(node => {
        const isSel = selected === node.id
        // Slightly smaller nodes on mobile so labels fit
        const size = 80
        return (
          <div
            key={node.id}
            onMouseDown={e => onMouseDown(e, node.id)}
            onTouchStart={e => onTouchStart(e, node.id)}
            onClick={() => setTooltip(tooltip?.id === node.id ? null : node)}
            style={{
              position: 'absolute',
              left: node.x - size / 2,
              top:  node.y - size / 2,
              width:  size,
              height: size,
              borderRadius: '50%',
              background: isSel ? `${col}22` : 'rgba(7,6,10,0.88)',
              border: `2px solid ${isSel ? col : col + '50'}`,
              boxShadow: isSel
                ? `0 0 24px ${col}70, 0 0 48px ${col}30, inset 0 0 12px ${col}10`
                : `0 0 12px ${col}18`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'grab',
              userSelect: 'none',
              transition: 'border-color .2s, box-shadow .2s, background .2s',
              backdropFilter: 'blur(10px)',
              zIndex: isSel ? 10 : 1,
              touchAction: 'none',
            }}
          >
            <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>{node.icon}</div>
            <div style={{
              fontSize: '.5rem',
              fontWeight: 700,
              letterSpacing: '.05em',
              textTransform: 'uppercase',
              color: isSel ? col : 'rgba(240,234,214,0.5)',
              marginTop: 4,
              textAlign: 'center',
              lineHeight: 1.25,
              maxWidth: size - 10,
              fontFamily: 'sans-serif',
            }}>
              {node.name}
            </div>
          </div>
        )
      })}

      {/* Tooltip */}
      {tooltip && (() => {
        const pos = getPos(tooltip.id)
        if (!pos) return null
        const { left, top } = tooltipStyle(pos)
        return (
          <div style={{
            position: 'absolute',
            left,
            top,
            background: 'rgba(7,6,10,0.96)',
            border: `1px solid ${col}55`,
            borderRadius: 12,
            padding: '14px 18px',
            maxWidth: 210,
            zIndex: 20,
            boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 24px ${col}18`,
            backdropFilter: 'blur(16px)',
            pointerEvents: 'none',
          }}>
            <div style={{
              fontSize: '.72rem',
              fontWeight: 700,
              color: col,
              marginBottom: 7,
              letterSpacing: '.05em',
              fontFamily: 'sans-serif',
            }}>
              {tooltip.icon} {tooltip.name}
            </div>
            <div style={{
              fontSize: '.73rem',
              color: 'rgba(240,234,214,0.5)',
              lineHeight: 1.65,
              fontFamily: 'sans-serif',
            }}>
              {tooltip.detail}
            </div>
          </div>
        )
      })()}
    </div>
  )
}

export default function Pipeline() {
  const [active, setActive] = useState('crocheting')
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims,     setDims]     = useState({ w: 760, h: 440 })
  const [isMobile, setIsMobile] = useState(false)

  const DESKTOP_W = 820
  const DESKTOP_H = 460

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const w      = containerRef.current.offsetWidth
      const mobile = w < 540
      // On mobile we always render at desktop size then CSS-scale down
      const h = mobile ? DESKTOP_H : Math.min(Math.max(Math.round(w * 0.56), 320), 480)
      setDims({ w: mobile ? DESKTOP_W : w, h })
      setIsMobile(mobile)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [active])

  const pipeline = PIPELINES.find(p => p.id === active)!

  return (
    <section
      className="section pipeline"
      id="pipeline"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <RippleCanvas intensity={0.45} />
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <div
            className="s-tag"
            style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <span style={{ width: 20, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            How It Works
            <span style={{ width: 20, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
          </div>
          <h2 className="s-title">One Idea,<br /><span className="gold">Many Paths</span></h2>
          <p className="s-sub" style={{ margin: '0 auto' }}>
            Every creation flows through a pipeline — turning one idea into books, products, videos, and more.
            Drag the bubbles to explore. Click any node to see what happens at that step.
          </p>
        </div>

        {/* Tab switcher */}
        <div
          className="reveal"
          style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}
        >
          {PIPELINES.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              style={{
                padding: '9px 22px',
                borderRadius: 999,
                border: '1px solid',
                borderColor: active === p.id ? p.color : 'rgba(255,255,255,0.1)',
                background:  active === p.id ? `${p.color}15` : 'transparent',
                color:       active === p.id ? p.color : 'rgba(240,234,214,0.4)',
                fontSize: '.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all .25s',
                fontFamily: 'inherit',
                boxShadow: active === p.id ? `0 0 18px ${p.color}30` : 'none',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Graph container */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            ref={containerRef}
            className="reveal"
            style={{
              width: '100%',
              maxWidth: 820,
              background: 'rgba(255,255,255,0.015)',
              border: `1px solid ${pipeline.color}22`,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: `0 0 80px ${pipeline.color}08`,
            }}
          >
            {/* Graph header bar */}
            <div style={{
              padding: '14px 24px',
              borderBottom: `1px solid ${pipeline.color}18`,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: pipeline.color,
                boxShadow: `0 0 8px ${pipeline.color}`,
              }} />
              <span style={{
                fontSize: '.72rem',
                fontWeight: 700,
                color: pipeline.color,
                letterSpacing: '.09em',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
              }}>
                {pipeline.label} Pipeline
              </span>
              <span style={{
                marginLeft: 'auto',
                fontSize: '.62rem',
                color: 'rgba(240,234,214,0.2)',
                letterSpacing: '.05em',
                fontFamily: 'sans-serif',
              }}>
                {isMobile ? 'tap nodes · drag to explore' : 'drag nodes · click to expand'}
              </span>
            </div>

            {isMobile ? (
              // Render at full desktop size, scale down to fit the actual container
              <div style={{
                width: containerRef.current?.offsetWidth ?? dims.w,
                height: (containerRef.current?.offsetWidth ?? dims.w) / DESKTOP_W * DESKTOP_H,
                overflow: 'hidden',
                position: 'relative',
              }}>
                <div style={{
                  transformOrigin: 'top left',
                  transform: `scale(${(containerRef.current?.offsetWidth ?? dims.w) / DESKTOP_W})`,
                  width: DESKTOP_W,
                  height: DESKTOP_H,
                }}>
                  <GraphView pipeline={pipeline} width={DESKTOP_W} height={DESKTOP_H} />
                </div>
              </div>
            ) : (
              <GraphView pipeline={pipeline} width={dims.w} height={dims.h} />
            )}
          </div>
        </div>

        {/* Legend */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            marginTop: 28,
            flexWrap: 'wrap',
            maxWidth: 820,
            margin: '28px auto 0',
          }}
        >
          {pipeline.nodes.map(n => (
            <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '.9rem' }}>{n.icon}</span>
              <span style={{
                fontSize: '.62rem',
                color: 'rgba(240,234,214,0.3)',
                fontFamily: 'sans-serif',
                letterSpacing: '.04em',
                textTransform: 'uppercase',
              }}>
                {n.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}