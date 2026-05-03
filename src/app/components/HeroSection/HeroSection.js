'use client';

import { useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Rocket, Terminal, Sparkles } from 'lucide-react';
import styles from './HeroSection.module.css';
import dynamic from 'next/dynamic';
import { Marquee } from '../Marquee/Marquee';
import TypewriterText from '../TypewriterText/TypewriterText';

// Dynamically import Spline scene with SSR disabled
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

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.01 });

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
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

            <motion.h1 variants={itemVariants} className={styles.title}>
              <span className={styles.companyName}>Velvron Labs</span>
              <br />
              Engineering the Future of{' '}
              <span className={styles.highlight}>Technology</span>
            </motion.h1>

            <motion.div variants={itemVariants} className={styles.subtitle}>
              <TypewriterText className={styles.typewriter} />
            </motion.div>

            <motion.div variants={itemVariants} className={styles.ctaContainer}>
              <button
                className={styles.primaryButton}
                onClick={handleGetStarted}
                type="button"
                aria-label="Get started with our services"
              >
                Get Started
                <span className={styles.buttonIcon} aria-hidden="true">→</span>
              </button>
              <button
                className={styles.secondaryButton}
                onClick={handleLearnMore}
                type="button"
                aria-label="Learn more about our services"
              >
                Learn More
              </button>
            </motion.div>

          </div>

          {/* Right Column — Spline 3D Scene */}
          <motion.div
            className={styles.terminalWrapper}
            variants={splineVariants}
          >
            <SplineSceneBasic />
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
