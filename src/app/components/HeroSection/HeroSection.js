'use client';

import { useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Rocket, Terminal, Sparkles } from 'lucide-react';
import styles from './HeroSection.module.css';
import dynamic from 'next/dynamic';
import { Marquee } from '../Marquee/Marquee';
import TypewriterText from '../TypewriterText/TypewriterText';

// Optimized Spline scene with performance settings
const SplineSceneBasic = dynamic(
  () => import('../ui/SplineSceneBasic').then(mod => ({ default: mod.SplineSceneBasic })),
  {
    ssr: false,
    loading: () => (
      <div className={styles.splineLoader}>
        <div className={styles.splineSpinner} />
      </div>
    ),
  }
);

// Dynamically import Three.js cube scene with SSR disabled
const DynamicThreeScene = dynamic(
  () => import('./ThreeScene'),
  { 
    ssr: false,
    loading: () => (
      <div className={styles.splineLoader}>
        <div className={styles.splineSpinner} />
      </div>
    ),
  }
);

// Reusable ripple effect function
const addRipple = (e) => {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    width: 0;
    height: 0;
    background: rgba(255,255,255,0.3);
    left: ${x}px;
    top: ${y}px;
    pointer-events: none;
    transform: translate(-50%, -50%);
    animation: rippleEffect 0.5s ease-out forwards;
  `;
  
  // Add ripple animation if not already in styles
  if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes rippleEffect {
        to {
          width: 200px;
          height: 200px;
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 500);
};

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.01 });

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.3, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08 
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  }), []);

  const splineVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  }), []);

  // Trigger animation immediately when in view - no delays for fast loading
  useEffect(() => {
    controls.start('visible');
  }, [isInView, controls]);

  // Parallax scroll effect
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const slow = document.querySelector('[data-parallax="slow"]');
        const mid  = document.querySelector('[data-parallax="mid"]');
        const fast = document.querySelector('[data-parallax="fast"]');
        if (slow) slow.style.transform = `translateY(${y * 0.12}px)`;
        if (mid)  mid.style.transform  = `translateY(${y * 0.25}px)`;
        if (fast) fast.style.transform = `translateY(${y * 0.4}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleGetStarted = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleLearnMore = useCallback(() => {
    const section = document.querySelector('[id*="about"], [id*="service"]');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  }, []);

  return (
    <section className={styles.hero} ref={ref} id="home">
      <div className={styles.heroContent}>
        <motion.div
          className={styles.heroGrid}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Left Column */}
          <div className={styles.heroText}>
            {/* Animated Ready to Launch Badge - Links to Contact */}
            <motion.div 
              className={styles.badge}
              variants={itemVariants}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{ cursor: 'pointer' }}
              data-parallax="fast"
            >
              <motion.span
                className="flex items-center gap-2"
                animate={{ 
                  opacity: [1, 0.7, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.span
                  animate={{ 
                    y: [0, -3, 0],
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Rocket size={15} className={styles.rocketIcon} />
                </motion.span>
                <span className="relative">
                  Ready to Launch
                  {/* Blinking dot */}
                  <motion.span
                    className="absolute -right-3 top-0 w-2 h-2 rounded-full bg-green-400"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ boxShadow: '0 0 10px #4ade80' }}
                  />
                </span>
              </motion.span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className={styles.title}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 40%, #22d3ee 70%, #ffffff 100%)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 6s ease infinite'
              }}
            >
              <span className={styles.companyName}>VELVRON LABS</span>
              <br />
              ENGINEERING THE FUTURE OF{' '}
              <span className={styles.highlight}>TECHNOLOGY</span>
            </motion.h1>

            <motion.div variants={itemVariants} className={styles.subtitle}>
              <TypewriterText className={styles.typewriter} />
            </motion.div>

            <motion.div variants={itemVariants} className={styles.ctaContainer}>
              <motion.button
                data-magnetic
                className={styles.primaryButton}
                onClick={(e) => { addRipple(e); handleGetStarted(); }}
                type="button"
                aria-label="Get started with our services"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                Get Started
                <span className={styles.buttonIcon} aria-hidden="true">→</span>
              </motion.button>
              <motion.button
                data-magnetic
                className={styles.secondaryButton}
                onClick={(e) => { addRipple(e); handleLearnMore(); }}
                type="button"
                aria-label="Learn more about our services"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                Learn More
              </motion.button>
            </motion.div>

          </div>

          {/* Right Column — Dual 3D Scene */}
          <motion.div
            className={styles.terminalWrapper}
            variants={splineVariants}
          >
            {/* Radial glow behind 3D scene */}
            <div
              data-parallax="mid"
              style={{
                position: 'absolute',
                borderRadius: '50%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(122,77,255,0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />
            {/* Three.js Cube Scene - Background Layer */}
            <div className="absolute inset-0 z-10">
              <DynamicThreeScene />
            </div>
            {/* Spline Scene - Foreground Layer */}
            <div className="absolute inset-0 z-20">
              <SplineSceneBasic />
            </div>
          </motion.div>
        </motion.div>

        {/* Marquee moved below main content for better spacing */}
        <motion.div 
          className={styles.marqueeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Marquee />
        </motion.div>
      </div>

      {/* Background gradient — behind everything via z-index */}
      <div className={styles.bgGradient} aria-hidden="true" />
    </section>
  );
};

export default HeroSection;
