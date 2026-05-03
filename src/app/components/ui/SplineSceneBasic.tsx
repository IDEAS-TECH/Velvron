'use client'

// RULES FOR THIS FILE — do not break these on future edits:
// 1. No React.lazy() — HeroSection.js already uses next/dynamic(ssr:false)
// 2. No Suspense — loading state managed by onLoad/onError callbacks
// 3. All sizing via inline style — not Tailwind (Turbopack h-full bug)
// 4. No backdrop-filter on any div — breaks WebGL compositing on Chrome
// 5. next.config.mjs must have transpilePackages for @splinetool packages

import { useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Spotlight } from './spotlight'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function SplineSceneBasic() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '340px',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'rgba(5,8,30,0.97)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
      }}
      onMouseEnter={() => {
        if (!containerRef.current) return
        containerRef.current.style.boxShadow = '0 0 40px rgba(151,125,255,0.18), 0 25px 50px rgba(0,0,0,0.5)'
        containerRef.current.style.borderColor = 'rgba(255,255,255,0.14)'
      }}
      onMouseLeave={() => {
        if (!containerRef.current) return
        containerRef.current.style.boxShadow = '0 20px 40px rgba(0,0,0,0.45)'
        containerRef.current.style.borderColor = 'rgba(255,255,255,0.08)'
      }}
    >
      <Spotlight className="-top-40 -left-10 md:left-40 md:-top-16" fill="white" />

      {/* Spinner shown until scene loads */}
      {!loaded && !error && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          zIndex: 2,
          background: 'rgba(5,8,30,0.97)',
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '2.5px solid rgba(151,125,255,0.25)',
            borderTopColor: '#977DFF',
            animation: 'splineSpinA 0.85s linear infinite',
          }} />
          <span style={{
            fontSize: '0.75rem',
            color: 'rgba(148,163,184,0.55)',
            letterSpacing: '0.06em',
          }}>
            Loading 3D scene…
          </span>
          <style>{`@keyframes splineSpinA { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Error fallback */}
      {error && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          zIndex: 2,
        }}>
          <span style={{ fontSize: '2rem' }}>⚡</span>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            3D scene unavailable
          </span>
        </div>
      )}

      {/* Spline canvas — fades in on load */}
      {!error && (
        <div style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.55s ease',
          zIndex: 1,
        }}>
          <Spline
            scene={SCENE}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>
      )}

      {/* Inner glow ring — decorative only */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        pointerEvents: 'none',
        boxShadow: 'inset 0 0 40px rgba(151,125,255,0.05)',
        zIndex: 3,
      }} />
    </div>
  )
}
