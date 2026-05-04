'use client';

import { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CODE RAIN — real code lines scrolling upward across the full viewport
// Rules:
//  - position: fixed, full viewport, z-index: 1, pointer-events: none
//  - transparent canvas background — page bg shows through
//  - 20fps target for performance — code doesn't need silk smoothness
//  - columns pre-generate lines from CODE_LINES pool
//  - each column has independent speed, opacity, and x position
//  - null-checked everywhere, full cleanup on unmount
//  - prefers-reduced-motion → renders nothing (returns null)
//  - mobile → half column count
// ─────────────────────────────────────────────────────────────────────────────

const CODE_LINES = [
  "const deploy = await k8s.rollout('velvron-api')",
  "✓ compiled successfully in 847ms",
  "git push origin main",
  "import { motion } from 'framer-motion'",
  "SELECT * FROM users WHERE active = true",
  "docker build -t velvron/api:latest .",
  "npm run build -- --turbo",
  "const res = await fetch('/api/v2/projects')",
  "✓ 23 modules transformed",
  "kubectl apply -f deployment.yaml",
  "export default function RootLayout({ children })",
  "[INFO] server running on port 8080",
  "git commit -m 'feat: add scroll animations'",
  "const { data } = useSWR('/api/metrics')",
  "✓ build complete in 2.3s",
  "await prisma.user.findMany({ where: { active: true } })",
  "npx create-next-app@latest velvron-web",
  "✓ deployed to vercel in 34s",
  "const socket = new WebSocket('wss://api.velvron.io')",
  "import { gsap } from 'gsap'",
  "terraform apply -var-file=prod.tfvars",
  "[WARN] deprecated: use v2 endpoint",
  "async function fetchMetrics(projectId: string)",
  "✓ type check passed — 0 errors",
  "git stash && git pull --rebase",
  "const pipeline = new AWS.CodePipeline()",
  "✓ tests passed 47/47",
  "export const revalidate = 60",
  "redis.set('session:' + id, JSON.stringify(data))",
  "✓ lint passed — 0 warnings",
  "[INFO] cache hit ratio: 94.2%",
  "const schema = z.object({ email: z.string().email() })",
  "pm2 reload ecosystem.config.js",
  "✓ lighthouse score: 98",
  "useEffect(() => { initSpline() }, [])",
  "INSERT INTO logs (event, ts) VALUES ($1, NOW())",
  "✓ container velvron-prod healthy",
  "const jwt = sign(payload, process.env.SECRET)",
  "git tag v2.4.1 && git push --tags",
  "✓ CDN purge complete — 2,847 files",
];

export default function MatrixRain({ className = '' }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const columnsRef = useRef([]);
  const [isMounted, setIsMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mount delay — ensures SSR hydration is complete
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);

    const timer = setTimeout(() => setIsMounted(true), 80);
    return () => {
      clearTimeout(timer);
      mq.removeEventListener('change', handler);
    };
  }, []);

  useEffect(() => {
    if (!isMounted || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx;
    try {
      ctx = canvas.getContext('2d');
    } catch (e) {
      return;
    }
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const FONT_SIZE = 10;
    const FONT = `${FONT_SIZE}px 'Courier New', Courier, monospace`;
    const TARGET_FPS = 60; // was 20
    const FRAME_TIME = 1000 / TARGET_FPS;

    // Build columns based on viewport width
    const buildColumns = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      // Column width: enough space for a full code line
      const colWidth = isMobile ? 320 : 280;
      const maxCols = isMobile ? 3 : Math.min(Math.floor(w / colWidth), 8);

      // Spread columns evenly with slight randomness
      const cols = [];
      for (let i = 0; i < maxCols; i++) {
        const baseX = (w / maxCols) * i + Math.random() * 40 - 20;
        cols.push({
          x: Math.max(4, Math.min(baseX, w - 240)),
          y: Math.random() * -h,                      // start above viewport
          speed: 0.875 + Math.random() * 1.575,         // px per frame (was 0.25 + Math.random() * 0.45)
          opacity: 0.04 + Math.random() * 0.11,       // 0.04 – 0.15
          lineIndex: Math.floor(Math.random() * CODE_LINES.length),
          lineSpacing: FONT_SIZE * 1.8,
          linesPerColumn: Math.ceil(h / (FONT_SIZE * 1.8)) + 6,
          color: Math.random() > 0.7 ? '151,125,255' : '56,189,248', // violet or cyan
        });
      }
      columnsRef.current = cols;
    };

    buildColumns();

    // Resize handler — debounced
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildColumns, 200);
    };
    window.addEventListener('resize', handleResize);

    // Draw one frame
    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear to transparent — page bg shows through
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = FONT;
      ctx.textBaseline = 'top';

      const cols = columnsRef.current;
      for (let c = 0; c < cols.length; c++) {
        const col = cols[c];

        for (let row = 0; row < col.linesPerColumn; row++) {
          const lineY = col.y + row * col.lineSpacing;

          // Skip lines outside viewport with margin
          if (lineY > canvas.height + 20 || lineY < -col.lineSpacing) continue;

          // Fade: full opacity in middle, fade top + bottom edges
          const normY = lineY / canvas.height;
          const edgeFade = Math.min(normY * 6, 1) * Math.min((1 - normY) * 6, 1);
          const finalOpacity = col.opacity * Math.max(0, Math.min(edgeFade, 1));

          if (finalOpacity < 0.005) continue;

          // Cycle through CODE_LINES
          const lineText = CODE_LINES[(col.lineIndex + row) % CODE_LINES.length];

          ctx.fillStyle = `rgba(${col.color}, ${finalOpacity})`;
          ctx.fillText(lineText, col.x, lineY);
        }

        // Scroll upward
        col.y -= col.speed;

        // When entire column has scrolled off top — reset below viewport
        const totalHeight = col.linesPerColumn * col.lineSpacing;
        if (col.y + totalHeight < 0) {
          col.y = canvas.height + Math.random() * 200;
          col.lineIndex = Math.floor(Math.random() * CODE_LINES.length);
          col.opacity = 0.04 + Math.random() * 0.11;
          col.speed = 0.875 + Math.random() * 1.575; // was 0.25 + Math.random() * 0.45
        }
      }
    };

    // Animation loop — throttled to TARGET_FPS
    let lastTime = 0;
    const loop = (now) => {
      if (now - lastTime >= FRAME_TIME) {
        draw();
        lastTime = now;
      }
      animationRef.current = requestAnimationFrame(loop);
    };
    animationRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isMounted, reducedMotion]);

  // Don't render anything server-side or if reduced motion
  if (!isMounted || reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        background: 'transparent',
      }}
      aria-hidden="true"
    />
  );
}
