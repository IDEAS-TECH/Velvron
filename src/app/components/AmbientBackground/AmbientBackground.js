'use client';

import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Stagger orb entrance so they don't all start at the same position
    const orbs = el.querySelectorAll('[data-orb]');
    orbs.forEach((orb, i) => {
      orb.style.animationDelay = `${i * -7}s`;
    });
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Orb 1 — violet, drifts slow top-left */}
      <div
        data-orb="1"
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(122,77,255,0.13) 0%, transparent 70%)',
          top: '-10%',
          left: '-5%',
          filter: 'blur(40px)',
          animation: 'orbDrift1 22s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />
      {/* Orb 2 — cyan, drifts mid-right */}
      <div
        data-orb="2"
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
          top: '30%',
          right: '-8%',
          filter: 'blur(50px)',
          animation: 'orbDrift2 28s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />
      {/* Orb 3 — deep pink, drifts bottom-center */}
      <div
        data-orb="3"
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(190,50,180,0.06) 0%, transparent 70%)',
          bottom: '-15%',
          left: '25%',
          filter: 'blur(60px)',
          animation: 'orbDrift3 35s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />
      {/* Orb 4 — violet soft, top-right accent */}
      <div
        data-orb="4"
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(122,77,255,0.07) 0%, transparent 70%)',
          top: '10%',
          right: '20%',
          filter: 'blur(30px)',
          animation: 'orbDrift4 18s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
