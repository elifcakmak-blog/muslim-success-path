'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ─── Geometry constants ───────────────────────────────────────────────────────
const GOLD   = 0xF5C842
const GOLD_E = 0xB87000
const BG     = 0x0c0d0e

const V_CX = -0.16,  V_CY =  0.06
const H_CX =  0.10,  H_CY = -0.27
const TORUS_V_R = 0.26,  SCALE_V = 1.55
const TORUS_H_R = 0.22,  SCALE_H = 1.60
const V_RX = TORUS_V_R,           V_RY = TORUS_V_R * SCALE_V
const H_RX = TORUS_H_R * SCALE_H, H_RY = TORUS_H_R

// Actual ellipse intersection — zero-gap transition point
const V_XING  = -1.893
const H_XING  = -2.904
const FULL_PATH = Math.PI * 4

function lumaPath(a: number): [number, number] {
  const phase = ((a % FULL_PATH) + FULL_PATH) % FULL_PATH
  if (phase < Math.PI * 2) {
    const angle = phase + V_XING
    return [V_CX + Math.cos(angle) * V_RX, V_CY + Math.sin(angle) * V_RY]
  } else {
    const angle = (phase - Math.PI * 2) + H_XING
    return [H_CX + Math.cos(angle) * H_RX, H_CY + Math.sin(angle) * H_RY]
  }
}

// ─── Build the two-oval logo rails ───────────────────────────────────────────
function buildRails(scene: THREE.Scene, opacity = 0.25) {
  const mat = new THREE.MeshStandardMaterial({
    color: GOLD, emissive: GOLD_E, emissiveIntensity: 0.4,
    metalness: 0.80, roughness: 0.08,
    transparent: true, opacity,
  })

  const vOval = new THREE.Mesh(new THREE.TorusGeometry(TORUS_V_R, 0.016, 12, 80), mat)
  vOval.scale.y = SCALE_V
  vOval.position.set(V_CX, V_CY, 0)
  scene.add(vOval)

  const hOval = new THREE.Mesh(new THREE.TorusGeometry(TORUS_H_R, 0.016, 12, 80), mat)
  hOval.scale.x = SCALE_H
  hOval.position.set(H_CX, H_CY, 0)
  scene.add(hOval)

  const node = new THREE.Mesh(
    new THREE.SphereGeometry(0.028, 12, 12),
    new THREE.MeshStandardMaterial({
      color: 0xFFE040, emissive: GOLD, emissiveIntensity: 1.0,
      metalness: 0.95, roughness: 0.02,
      transparent: true, opacity: 0.35,
    })
  )
  node.position.set(V_CX, H_CY, 0)
  scene.add(node)
}

function makeBead(radius: number, intensity: number, opacity = 1) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, 14, 14),
    new THREE.MeshStandardMaterial({
      color: 0xFFEE60, emissive: GOLD, emissiveIntensity: intensity,
      metalness: 0.95, roughness: 0.02,
      transparent: opacity < 1, opacity,
    })
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface LumaLogoCanvasProps {
  size?: number        // canvas pixel size (square), default 240
  animated?: boolean   // true = orbit double, false = static logo
}

export default function LumaLogoCanvas({ size = 240, animated = true }: LumaLogoCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current; if (!el) return

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(42, 1, 0.1, 50)
    camera.position.set(0, 0, 3.2)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(size, size)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(BG, 1)
    el.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0x1a1a14, 0.5))
    const pl = new THREE.PointLight(GOLD, 3, 10)
    scene.add(pl)

    let id: number, t = 0

    if (!animated) {
      // ── Static logo with gentle camera sway ──────────────────────────────
      const mat = new THREE.MeshStandardMaterial({
        color: GOLD, emissive: GOLD_E, emissiveIntensity: 1.2,
        metalness: 0.80, roughness: 0.08,
      })
      const vOval = new THREE.Mesh(new THREE.TorusGeometry(TORUS_V_R, 0.016, 12, 80), mat)
      vOval.scale.y = SCALE_V; vOval.position.set(V_CX, V_CY, 0); scene.add(vOval)
      const hOval = new THREE.Mesh(new THREE.TorusGeometry(TORUS_H_R, 0.016, 12, 80), mat)
      hOval.scale.x = SCALE_H; hOval.position.set(H_CX, H_CY, 0); scene.add(hOval)
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.038, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xFFE040, emissive: GOLD, emissiveIntensity: 2.2, metalness: 0.95, roughness: 0.02 })
      )
      node.position.set(V_CX, H_CY, 0); scene.add(node)

      const go = () => {
        id = requestAnimationFrame(go); t += 0.004
        camera.position.x = Math.sin(t * 0.3) * 0.18
        camera.position.y = Math.sin(t * 0.22) * 0.10 + 0.05
        camera.lookAt(0, -0.10, 0)
        pl.intensity = 2.8 + Math.sin(t * 1.8) * 0.5
        renderer.render(scene, camera)
      }
      go()
    } else {
      // ── Orbit double animation ────────────────────────────────────────────
      buildRails(scene)
      const TRAIL = 8

      const aBeads = Array.from({ length: TRAIL }, (_, i) =>
        makeBead(0.052 - i * 0.004, 3.0 - i * 0.3, 1 - i * 0.10)
      )
      const bBeads = Array.from({ length: TRAIL }, (_, i) =>
        new THREE.Mesh(
          new THREE.SphereGeometry(0.048 - i * 0.003, 14, 14),
          new THREE.MeshStandardMaterial({
            color: 0xC8E8FF, emissive: 0x55AAEE, emissiveIntensity: 2.8 - i * 0.3,
            metalness: 0.90, roughness: 0.04,
            transparent: true, opacity: 1 - i * 0.10,
          })
        )
      )
      ;[...aBeads, ...bBeads].forEach(b => scene.add(b))

      const go = () => {
        id = requestAnimationFrame(go); t += 0.014
        aBeads.forEach((b, i) => {
          const [x, y] = lumaPath(t * 5 - i * 0.22)
          b.position.set(x, y, 0)
        })
        bBeads.forEach((b, i) => {
          const [x, y] = lumaPath(-t * 5 + Math.PI * 3 + i * 0.22)
          b.position.set(x, y, 0)
        })
        pl.intensity = 2.6 + Math.sin(t * 2.5) * 0.5
        renderer.render(scene, camera)
      }
      go()
    }

    return () => {
      cancelAnimationFrame(id)
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [animated, size])

  return (
    <div ref={mountRef} style={{
      width: size, height: size,
      borderRadius: 14, overflow: 'hidden',
      display: 'inline-block',
    }} />
  )
}
