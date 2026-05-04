'use client';

import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '../HeroSection/HeroSection';
import Navbar from '../Navbar/Navbar';
import AboutSection from '../AboutSection/AboutSection';
import ServicesSection from '../ServicesSection/ServicesSection';
import ContactSection from '../ContactSection/ContactSection';
import Footer from '../Footer/Footer';
import BootSequence from '../BootSequence/BootSequence';
import SystemHUD from '../SystemHUD/SystemHUD';
import PageLoader from '../PageLoader/PageLoader';
import AmbientBackground from '../AmbientBackground/AmbientBackground';

// CodeRain — replaces MatrixRain. Still ssr:false, still dynamic.
// The component itself is position:fixed so it needs no wrapper div.
const CodeRain = dynamic(() => import('../MatrixRain/MatrixRain'), {
  ssr: false,
  loading: () => null,
});

// ProjectsSection — ssr:false (uses browser APIs)
const ProjectsSection = dynamic(
  () => import('../ProjectsSection/ProjectsSection'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="animate-pulse text-slate-500">Loading projects...</div>
      </div>
    ),
  }
);

const HomeClient = () => {
  const [booted, setBooted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  const handlePageLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Scan observer for .scan-section elements
  useEffect(() => {
    if (!booted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scan-triggered');
            // Only trigger once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    const sections = document.querySelectorAll('.scan-section');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [booted]);

  // Custom cursor — desktop only
  useEffect(() => {
    if (!booted) return;
    
    // Wrap ALL cursor JS in pointer: fine check
    if (!window.matchMedia('(pointer: fine)').matches) return;
    
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let ringX = 0, ringY = 0;
    let dotX  = 0, dotY  = 0;
    let lastX = 0, lastY = 0;
    let velocity = 0;

    // Trail dots pool - max 8 dots
    const trailDots = [];
    for (let i = 0; i < 8; i++) {
      const trailDot = document.createElement('div');
      trailDot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--accent-hex);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99997;
        opacity: 0;
        transition: opacity 0.5s ease;
      `;
      document.body.appendChild(trailDot);
      trailDots.push({
        element: trailDot,
        active: false,
        timeoutId: null
      });
    }

    const move = (e) => {
      // Calculate velocity
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      velocity = Math.sqrt(dx * dx + dy * dy);
      
      lastX = e.clientX;
      lastY = e.clientY;
      
      dotX = e.clientX; dotY = e.clientY;
      dot.style.left  = dotX + 'px';
      dot.style.top   = dotY + 'px';

      // Spawn trail dot on fast movement
      if (velocity > 8) {
        const inactiveDot = trailDots.find(d => !d.active);
        if (inactiveDot) {
          inactiveDot.active = true;
          inactiveDot.element.style.left = dotX + 'px';
          inactiveDot.element.style.top = dotY + 'px';
          inactiveDot.element.style.opacity = '1';
          
          // Clear existing timeout
          if (inactiveDot.timeoutId) {
            clearTimeout(inactiveDot.timeoutId);
          }
          
          // Fade out and deactivate after 500ms
          inactiveDot.timeoutId = setTimeout(() => {
            inactiveDot.element.style.opacity = '0';
            setTimeout(() => {
              inactiveDot.active = false;
            }, 500);
          }, 10);
        }
      }

      // Handle magnetic elements
      const target = e.target;
      if (target.matches('[data-magnetic]')) {
        ring.style.borderRadius = '4px';
        ring.style.transform = 'translate(-50%, -50%) scale(1.6)';
        ring.style.boxShadow = '0 0 20px var(--glow-violet)';
      } else {
        ring.style.borderRadius = '50%';
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.boxShadow = 'none';
      }
    };

    document.addEventListener('mousemove', move);

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const loop = () => {
      ringX = lerp(ringX, dotX, 0.12);
      ringY = lerp(ringY, dotY, 0.12);
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

      return () => {
        document.removeEventListener('mousemove', move);
        cancelAnimationFrame(raf);
        dot.remove();
        ring.remove();
        // Clean up trail dots
        trailDots.forEach(trailDot => {
          if (trailDot.timeoutId) {
            clearTimeout(trailDot.timeoutId);
          }
          trailDot.element.remove();
        });
      };
  }, [booted]);

  return (
    <>
      {/* ── Page Loader — cinematic entrance ── */}
      <PageLoader onComplete={handlePageLoadComplete} />

      {/* ── Boot sequence — shown until booted ── */}
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {/* ── Code rain — fixed, behind everything, always running ── */}
      <div data-parallax="slow" style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
        <CodeRain />
      </div>

      {/* ── System HUD — fixed, bottom-right corner ── */}
      {booted && <SystemHUD />}

      {/* ── Main site content ── */}
      {booted && (
        <div
          className="w-full min-h-screen overflow-x-hidden"
          style={{ 
            position: 'relative', 
            zIndex: 2,
            opacity: loaded ? 1 : 0, 
            transition: 'opacity 0.4s ease' 
          }}
        >
          <AmbientBackground />
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </div>
      )}
    </>
  );
};

export default HomeClient;