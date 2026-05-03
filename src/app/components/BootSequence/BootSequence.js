'use client';

import { useEffect, useState, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// BOOT SEQUENCE — full-screen terminal-style intro that plays once on load
// Rules:
//  - renders on top of everything: position fixed, z-index 9998
//  - plays for ~2.2s then calls onComplete() which unmounts it
//  - uses CSS transitions only — no framer-motion dependency here
//  - prefers-reduced-motion → skips immediately (calls onComplete at 0ms)
//  - cleans up all timers on unmount
// ─────────────────────────────────────────────────────────────────────────────

const BOOT_LINES = [
  { text: '> initialising velvron.sys', delay: 0,    color: '#977DFF' },
  { text: '> checking environment...  ✓', delay: 300, color: '#38bdf8' },
  { text: '> loading core modules...', delay: 550,   color: '#94a3b8' },
  { text: '  [node]  [react]  [next]  [gsap]  [framer]', delay: 750, color: '#64748b' },
  { text: '> all modules loaded       ✓', delay: 1000, color: '#38bdf8' },
  { text: '> establishing connection  ✓', delay: 1150, color: '#38bdf8' },
  { text: '> booting interface...', delay: 1300,     color: '#977DFF' },
  { text: '  VELVRON LABS v2.0 — READY', delay: 1550, color: '#977DFF', bold: true },
];

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [exiting, setExiting] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    // Respect reduced motion — skip immediately
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      onComplete();
      return;
    }

    // Schedule each line appearing
    BOOT_LINES.forEach((line) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay);
      timersRef.current.push(t);
    });

    // Start exit transition
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 1900);
    timersRef.current.push(exitTimer);

    // Call onComplete after exit animation
    const doneTimer = setTimeout(() => {
      onComplete();
    }, 2200);
    timersRef.current.push(doneTimer);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: 'rgb(8, 13, 46)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.35s ease',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 'clamp(12px, 2vw, 14px)',
          lineHeight: 1.9,
          padding: '2rem',
          maxWidth: '560px',
          width: '100%',
        }}
      >
        {/* Top border */}
        <div style={{ color: '#263363', marginBottom: '1rem', userSelect: 'none' }}>
          {'─'.repeat(52)}
        </div>

        {/* Boot lines */}
        {visibleLines.map((line, i) => (
          <div
            key={i}
            style={{
              color: line.color,
              fontWeight: line.bold ? 700 : 400,
              opacity: 1,
              animation: 'bootFadeIn 0.18s ease forwards',
              letterSpacing: line.bold ? '0.08em' : '0.02em',
            }}
          >
            {line.text}
          </div>
        ))}

        {/* Blinking cursor */}
        {!exiting && (
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 14,
              background: '#977DFF',
              marginTop: 4,
              animation: 'bootBlink 0.9s step-end infinite',
              verticalAlign: 'middle',
            }}
          />
        )}

        {/* Bottom border */}
        <div style={{ color: '#263363', marginTop: '1rem', userSelect: 'none' }}>
          {'─'.repeat(52)}
        </div>
      </div>

      <style>{`
        @keyframes bootFadeIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes bootBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
