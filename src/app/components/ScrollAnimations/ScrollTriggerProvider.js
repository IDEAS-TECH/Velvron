'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollTriggerProvider = ({ children }) => {
  const containerRef = useRef();

  useEffect(() => {
    // Refresh ScrollTrigger on route changes
    const handleRouteChange = () => {
      ScrollTrigger.refresh();
    };

    // Initial refresh
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

// Custom hook for scroll animations
export const useScrollAnimation = (elementRef, options = {}) => {
  const {
    animation = 'fadeUp',
    duration = 1,
    delay = 0,
    scrub = false,
    start = 'top 80%',
    end = 'top 20%',
    ...gsapOptions
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationConfig = {};

    switch (animation) {
      case 'fadeUp':
        animationConfig = {
          opacity: 0,
          y: 50,
          duration,
          delay,
          ease: 'power3.out'
        };
        break;
      case 'fadeIn':
        animationConfig = {
          opacity: 0,
          duration,
          delay,
          ease: 'power2.out'
        };
        break;
      case 'slideLeft':
        animationConfig = {
          opacity: 0,
          x: -50,
          duration,
          delay,
          ease: 'power3.out'
        };
        break;
      case 'slideRight':
        animationConfig = {
          opacity: 0,
          x: 50,
          duration,
          delay,
          ease: 'power3.out'
        };
        break;
      case 'scaleIn':
        animationConfig = {
          opacity: 0,
          scale: 0.8,
          duration,
          delay,
          ease: 'back.out(1.7)'
        };
        break;
      default:
        animationConfig = {
          opacity: 0,
          y: 30,
          duration,
          delay,
          ease: 'power3.out'
        };
    }

    const tl = gsap.timeline();

    if (scrub) {
      // Scrub-based animation (smooth scroll-based)
      tl.from(element, {
        ...animationConfig,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: true,
          ...gsapOptions
        }
      });
    } else {
      // Toggle-based animation (trigger once)
      tl.from(element, {
        ...animationConfig,
        scrollTrigger: {
          trigger: element,
          start,
          once: true,
          ...gsapOptions
        }
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [elementRef, animation, duration, delay, scrub, start, end, gsapOptions]);
};

// Parallax scroll hook
export const useParallax = (elementRef, options = {}) => {
  const { speed = 0.5, direction = 'vertical' } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const parallaxConfig = direction === 'vertical' 
      ? { yPercent: -50 * speed }
      : { xPercent: -50 * speed };

    gsap.fromTo(element, 
      direction === 'vertical' 
        ? { yPercent: 0 }
        : { xPercent: 0 },
      {
        ...parallaxConfig,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [elementRef, speed, direction]);
};

// Stagger animation for multiple elements
export const useStaggerAnimation = (elementsRef, options = {}) => {
  const {
    stagger = 0.1,
    animation = 'fadeUp',
    duration = 0.8,
    start = 'top 85%'
  } = options;

  useEffect(() => {
    const elements = elementsRef.current;
    if (!elements || elements.length === 0) return;

    let animationConfig = {};

    switch (animation) {
      case 'fadeUp':
        animationConfig = {
          opacity: 0,
          y: 30,
          duration,
          stagger,
          ease: 'power3.out'
        };
        break;
      case 'fadeIn':
        animationConfig = {
          opacity: 0,
          duration,
          stagger,
          ease: 'power2.out'
        };
        break;
      case 'scaleIn':
        animationConfig = {
          opacity: 0,
          scale: 0.8,
          duration,
          stagger,
          ease: 'back.out(1.7)'
        };
        break;
      default:
        animationConfig = {
          opacity: 0,
          y: 20,
          duration,
          stagger,
          ease: 'power3.out'
        };
    }

    gsap.from(elements, {
      ...animationConfig,
      scrollTrigger: {
        trigger: elements[0],
        start,
        once: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (elements.includes(trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, [elementsRef, stagger, animation, duration, start]);
};
