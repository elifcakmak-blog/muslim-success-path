'use client'
import { useEffect, useRef } from 'react'

const COLS = [
  '245,200,66','167,139,250','244,114,182',
  '45,212,191','96,165,250','251,146,60',
]

const BURST_COLS = ['#F5C842','#C084FC','#F472B6','#2DD4BF','#60A5FA','#FB923C','#A78BFA','#34D399']

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't run on touch/coarse-pointer devices (phones, tablets)
    if (window.matchMedia('(pointer: coarse)').matches) {
      if (dotRef.current)  dotRef.current.style.display  = 'none'
      if (ringRef.current) ringRef.current.style.display = 'none'
      return
    }

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0, isHover = false
    let colIdx = 0, colT = 0, rafId = 0

    const getColor = () => {
      colT += 0.004
      if (colT > 1) { colT = 0; colIdx = (colIdx + 1) % COLS.length }
      const a = COLS[colIdx].split(',').map(Number)
      const b = COLS[(colIdx + 1) % COLS.length].split(',').map(Number)
      return [0,1,2].map(i => Math.round(a[i] + (b[i]-a[i]) * colT)).join(',')
    }

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    const onEnter = () => { isHover = true }
    const onLeave = () => { isHover = false }
    const interactive = 'a,button,.pillar,.res-card,.flow-node,.social-btn,.nav-links a'
    document.querySelectorAll(interactive).forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Click burst
    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 12; i++) {
        const p = document.createElement('div')
        const angle = (i / 12) * Math.PI * 2
        const dist  = 28 + Math.random() * 40
        const size  = 2 + Math.random() * 5
        const col   = BURST_COLS[Math.floor(Math.random() * BURST_COLS.length)]
        p.style.cssText = `
          position:fixed;pointer-events:none;z-index:9990;
          width:${size}px;height:${size}px;border-radius:50%;
          background:${col};box-shadow:0 0 8px ${col};
          left:${e.clientX}px;top:${e.clientY}px;
          animation:cursorBurst .6s ease-out forwards;
          animation-delay:${Math.random() * .08}s;
          --tx:${Math.cos(angle)*dist}px;--ty:${Math.sin(angle)*dist}px;
        `
        document.body.appendChild(p)
        setTimeout(() => p.remove(), 700)
      }
    }
    window.addEventListener('click', onClick)

    // Inject keyframe once
    if (!document.getElementById('cursor-burst-style')) {
      const s = document.createElement('style')
      s.id = 'cursor-burst-style'
      s.textContent = `@keyframes cursorBurst{0%{opacity:1;transform:translate(0,0)scale(1)}100%{opacity:0;transform:translate(var(--tx),var(--ty))scale(0)}}`
      document.head.appendChild(s)
    }

    const loop = () => {
      rx += (mx - rx) * .11; ry += (my - ry) * .11
      const col   = getColor()
      const scale = isHover ? 1.7 : 1
      const rs    = isHover ? 48 : 36

      dot.style.cssText  = `width:10px;height:10px;border-radius:50%;transform:translate(${mx-5}px,${my-5}px) scale(${scale});background:rgb(${col});box-shadow:0 0 10px rgb(${col}),0 0 22px rgba(${col},.55);transition:transform .15s;position:fixed;top:0;left:0;pointer-events:none;z-index:9999;will-change:transform;`
      ring.style.cssText = `width:${rs}px;height:${rs}px;border-radius:50%;transform:translate(${rx-rs/2}px,${ry-rs/2}px);border:1.5px solid rgba(${col},${isHover?.65:.35});background:rgba(${col},${isHover?.04:.02});transition:width .2s,height .2s;position:fixed;top:0;left:0;pointer-events:none;z-index:9998;will-change:transform;`
      rafId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  />
      <div ref={ringRef} />
    </>
  )
}