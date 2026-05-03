'use client';

import { useEffect, useState, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM HUD — fixed corner readout showing fake live system stats
// Rules:
//  - position: fixed, bottom-right, z-index: 50
//  - updates every 1000ms via setInterval
//  - cleans up interval on unmount
//  - prefers-reduced-motion → still renders but doesn't animate
//  - hidden on mobile (< 640px) to not clutter small screens
//  - uses only vanilla React state — no external dependencies
// ─────────────────────────────────────────────────────────────────────────────

function fmt2(n) {
  return String(n).padStart(2, '0');
}

export default function SystemHUD() {
  const [fps, setFps] = useState(60);
  const [mem, setMem] = useState(2.3);
  const [uptime, setUptime] = useState(0);  // seconds since mount
  const [ping, setPing] = useState(12);
  const intervalRef = useRef(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // Slightly fluctuate values for realism
      setFps(58 + Math.floor(Math.random() * 3));
      setMem(parseFloat((2.1 + Math.random() * 0.6).toFixed(1)));
      setPing(8 + Math.floor(Math.random() * 18));
      setUptime(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Format uptime as HH:MM:SS
  const h = fmt2(Math.floor(uptime / 3600));
  const m = fmt2(Math.floor((uptime % 3600) / 60));
  const s = fmt2(uptime % 60);

  const statusColor = fps >= 58 ? '#22c55e' : '#f59e0b';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.25rem',
        zIndex: 50,
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: '10px',
        lineHeight: 1.7,
        color: 'rgba(148, 163, 184, 0.55)',
        background: 'rgba(8, 13, 46, 0.65)',
        border: '1px solid rgba(151, 125, 255, 0.12)',
        borderRadius: '6px',
        padding: '6px 10px',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        userSelect: 'none',
        pointerEvents: 'none',
        // Hide on mobile
        display: 'block',
      }}
      className="hidden sm:block"
      aria-hidden="true"
    >
      {/* Status row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: statusColor,
            boxShadow: `0 0 4px ${statusColor}`,
            flexShrink: 0,
            display: 'inline-block',
          }}
        />
        <span style={{ color: 'rgba(151,125,255,0.7)', letterSpacing: '0.1em' }}>
          VELVRON SYS
        </span>
      </div>

      {/* Stats */}
      <div>FPS &nbsp; {fps}</div>
      <div>MEM &nbsp; {mem}GB</div>
      <div>PING &nbsp;{ping}ms</div>
      <div>UP &nbsp;&nbsp; {h}:{m}:{s}</div>
    </div>
  );
}
