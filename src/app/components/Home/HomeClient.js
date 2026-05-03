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

  const handleBootComplete = useCallback(() => {
    setBooted(true);
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
    if (window.matchMedia('(pointer: fine)').matches) {
      const dot  = document.createElement('div');
      const ring = document.createElement('div');
      dot.className  = 'cursor-dot';
      ring.className = 'cursor-ring';
      document.body.appendChild(dot);
      document.body.appendChild(ring);

      let ringX = 0, ringY = 0;
      let dotX  = 0, dotY  = 0;

      const move = (e) => {
        dotX = e.clientX; dotY = e.clientY;
        dot.style.left  = dotX + 'px';
        dot.style.top   = dotY + 'px';
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
      };
    }
  }, [booted]);

  return (
    <>
      {/* ── Boot sequence — shown until booted ── */}
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {/* ── Code rain — fixed, behind everything, always running ── */}
      <CodeRain />

      {/* ── System HUD — fixed, bottom-right corner ── */}
      {booted && <SystemHUD />}

      {/* ── Main site content ── */}
      {booted && (
        <div
          className="w-full min-h-screen overflow-x-hidden"
          style={{ position: 'relative', zIndex: 2 }}
        >
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