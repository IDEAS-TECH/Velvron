'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Code, Cpu, Database, Server, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './AboutSection.module.css';
import { useReveal } from '../../hooks/useReveal';

const techStack = [
  { name: 'AI/ML', icon: <Cpu size={24} />, color: '#ff6347' }, // Front - red
  { name: 'Web3', icon: <Zap size={24} />, color: '#36a2eb' }, // Back - blue
  { name: 'Cloud', icon: <Server size={24} />, color: '#ffd700' }, // Right - yellow
  { name: 'Blockchain', icon: <Database size={24} />, color: '#4bc0c0' }, // Left - green
  { name: 'Cybersecurity', icon: <Shield size={24} />, color: '#9c66ff' }, // Top - purple
  { name: 'DevOps', icon: <Code size={24} />, color: '#ff9f40' }, // Bottom - orange
];

// Stats data matching the marquee content
const statsData = [
  { number: '100+', label: 'Projects Delivered', gradient: 'from-violet-600 to-purple-600', icon: '🚀' },
  { number: '50+', label: 'Happy Clients', gradient: 'from-blue-600 to-cyan-600', icon: '⭐' },
  { number: '5+', label: 'Years Experience', gradient: 'from-emerald-600 to-teal-600', icon: '⚡' },
  { number: '99%', label: 'Client Satisfaction', gradient: 'from-rose-600 to-pink-600', icon: '❤️' },
  { number: '20+', label: 'Technologies', gradient: 'from-amber-600 to-orange-600', icon: '💻' },
  { number: '3×', label: 'Avg. ROI', gradient: 'from-indigo-600 to-violet-600', icon: '📈' },
];

// Animated Stats Grid Component
const AnimatedStatsGrid = () => {
  const [activeIndices, setActiveIndices] = useState([0, 1, 2]);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);
  const revealRef = useReveal();

  // Rotate through stats every 4 seconds when in view
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveIndices(prev => {
        const next = prev.map(i => (i + 3) % statsData.length);
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView]);

  // Intersection Observer to detect when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <AnimatePresence mode="popLayout">
        {activeIndices.map((statIndex, displayIndex) => (
          <motion.div
            key={`${statIndex}-${displayIndex}`}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
            whileHover={{ 
              scale: 1.08, 
              y: -8,
              transition: { type: 'spring', stiffness: 400 }
            }}
            className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer bg-gradient-to-br ${statsData[statIndex].gradient} border border-white/20 shadow-lg`}
            style={{
              boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            {/* Animated Background Glow */}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40 rounded-full"
                  initial={{ y: '100%', x: `${20 + i * 30}%`, opacity: 0 }}
                  animate={{ 
                    y: '-20%', 
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 text-center">
              <motion.span 
                className="text-2xl mb-2 block"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {statsData[statIndex].icon}
              </motion.span>
              <motion.span 
                className="block text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
              >
                {statsData[statIndex].number}
              </motion.span>
              <span className="text-white/90 text-xs md:text-sm font-medium uppercase tracking-wider">
                {statsData[statIndex].label}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

// Helper function to get active face based on rotation
const getActiveFace = (rot) => {
  // Normalize rotation to 0-360 degrees
  const y = ((rot.y % 360) + 360) % 360;
  const x = ((rot.x % 360) + 360) % 360;

  // Use exact target rotations from faceRotations
  const targets = [
    { x: 0, y: 0, index: 0 },     // Front
    { x: 0, y: 180, index: 1 },  // Back
    { x: 0, y: 270, index: 2 },  // Right (y: -90 = 270)
    { x: 0, y: 90, index: 3 },   // Left
    { x: 270, y: 0, index: 4 }, // Top (x: -90 = 270)
    { x: 90, y: 0, index: 5 }   // Bottom
  ];

  let closestIndex = 0;
  let minDistance = Infinity;

  // Find which target rotation is closest to current rotation
  for (const target of targets) {
    const xDiff = Math.min(
      Math.abs(x - target.x),
      360 - Math.abs(x - target.x)
    );
    const yDiff = Math.min(
      Math.abs(y - target.y),
      360 - Math.abs(y - target.y)
    );

    const distance = xDiff + yDiff;

    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = target.index;
    }
  }

  return closestIndex;
};

const AboutSection = () => {
  const [touchStart, setTouchStart] = useState(null);
  const [rotation, setRotation] = useState({ x: 20, y: 20, z: 0 });
  const lastTimeRef = useRef(0);
  const rotationSpeedRef = useRef({ x: 0.3, y: 0.5, z: 0.2 });
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [focusedFace, setFocusedFace] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isShowcasing, setIsShowcasing] = useState(true);
  const [omnidirectionalSpin, setOmnidirectionalSpin] = useState(false);
  const sectionRef = useRef(null);
  const cubeRef = useRef(null);
  const rotationTimeout = useRef(null);
  const animationRef = useRef(null);
  const autoRotateRef = useRef(autoRotate);
  const isDraggingRef = useRef(isDragging);
  const isShowcasingRef = useRef(isShowcasing);
  const omnidirectionalSpinRef = useRef(omnidirectionalSpin);
  const targetRotationRef = useRef({ x: 0, y: 0, z: 0 });
  const revealRef = useReveal();
  const availableFacesRef = useRef(['front', 'back', 'right', 'left', 'top', 'bottom']);
  const showcaseTimerRef = useRef(null);

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Update refs when state changes
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    isShowcasingRef.current = isShowcasing;
  }, [isShowcasing]);

  // Ref to store the showcase function
  const showcaseNextFaceRef = useRef(null);

  // Initialize showcase on mount
  useEffect(() => {
    // Start the showcase sequence after initial render
    const initTimer = setTimeout(() => {
      if (showcaseNextFaceRef.current) {
        showcaseNextFaceRef.current();
      }
    }, 1000);
    
    return () => clearTimeout(initTimer);
  }, []);

  // Face rotation mappings - exactly like improved reference
  const faceRotations = useMemo(() => ({
    front: { x: 0, y: 0 },
    back: { x: 0, y: 180 },
    right: { x: 0, y: -90 },
    left: { x: 0, y: 90 },
    top: { x: -90, y: 0 },
    bottom: { x: 90, y: 0 }
  }), []);

  // Helper functions for improved rotation
  const calculateShortestRotation = useCallback((current, target) => {
    const normalizeAngle = (angle) => {
      angle = angle % 360;
      if (angle > 180) angle -= 360;
      if (angle < -180) angle += 360;
      return angle;
    };
    const diff = normalizeAngle(target - current);
    return current + diff;
  }, []);

  // Get random face for showcase
  const getRandomFace = useCallback(() => {
    if (availableFacesRef.current.length === 0) {
      availableFacesRef.current = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    }
    const randomIndex = Math.floor(Math.random() * availableFacesRef.current.length);
    const face = availableFacesRef.current[randomIndex];
    availableFacesRef.current.splice(randomIndex, 1);
    return face;
  }, []);

  // Showcase next face
  const showcaseNextFace = useCallback(() => {
    const face = getRandomFace();
    const target = faceRotations[face];
    
    const current = rotation;
    targetRotationRef.current = {
      x: calculateShortestRotation(current.x, target.x),
      y: calculateShortestRotation(current.y, target.y),
      z: calculateShortestRotation(current.z, 0)
    };
    
    setIsShowcasing(true);
    setAutoRotate(true);
    setOmnidirectionalSpin(false); // Start with transition phase
    
    // Phase 1: Smooth transition to target face (700ms for smoother arrival)
    setTimeout(() => {
      setOmnidirectionalSpin(true); // Start omnidirectional spin
      
      // Phase 2: Omnidirectional spin with smooth transition to target (5000ms)
      // The animation logic now gradually transitions back to target during spin
      setTimeout(() => {
        setOmnidirectionalSpin(false); // Stop spin, should be very close to target
        
        // Phase 3: Static display (2500ms)
        setTimeout(() => {
          if (availableFacesRef.current.length === 0) {
            availableFacesRef.current = ['front', 'back', 'right', 'left', 'top', 'bottom'];
          }
          if (showcaseNextFaceRef.current) {
            showcaseNextFaceRef.current();
          }
        }, 2500);
        
      }, 5000);
      
    }, 700);
  }, [rotation, calculateShortestRotation, getRandomFace, faceRotations]);

  // Update the ref when the function changes
  useEffect(() => {
    showcaseNextFaceRef.current = showcaseNextFace;
  }, [showcaseNextFace]);

  // Update omnidirectional spin ref
  useEffect(() => {
    omnidirectionalSpinRef.current = omnidirectionalSpin;
  }, [omnidirectionalSpin]);

// Time-based animation with throttled updates and smooth transitions
  const animate = useCallback((timestamp) => {
    if (autoRotateRef.current && !isDraggingRef.current) {
      const deltaTime = timestamp - lastTimeRef.current;
      // Throttle to ~30fps to prevent excessive updates
      if (deltaTime >= 32) {
        setRotation(prev => {
          let newX = prev.x;
          let newY = prev.y;
          let newZ = prev.z;
          
          if (isShowcasingRef.current) {
            if (!omnidirectionalSpinRef.current) {
              // Phase 1: Smooth transition to target face
              const speed = 0.15;
              newX += (targetRotationRef.current.x - prev.x) * speed;
              newY += (targetRotationRef.current.y - prev.y) * speed;
              newZ += (targetRotationRef.current.z - prev.z) * speed;
              
              // Check if we've reached the target
              const tolerance = 0.5;
              if (Math.abs(targetRotationRef.current.x - newX) < tolerance &&
                  Math.abs(targetRotationRef.current.y - newY) < tolerance &&
                  Math.abs(targetRotationRef.current.z - newZ) < tolerance) {
                newX = targetRotationRef.current.x;
                newY = targetRotationRef.current.y;
                newZ = targetRotationRef.current.z;
              }
            } else {
              // Phase 2: Omnidirectional spin with smooth transition to target
              const spinSpeed = 0.8;
              const transitionSpeed = 0.05;
              
              // Add spin rotation
              newX += 1.0 * spinSpeed;
              newY += 1.5 * spinSpeed;
              newZ += 0.5 * spinSpeed;
              
              // Gradually transition towards target (smooth end to spin)
              newX += (targetRotationRef.current.x - newX) * transitionSpeed;
              newY += (targetRotationRef.current.y - newY) * transitionSpeed;
              newZ += (targetRotationRef.current.z - newZ) * transitionSpeed;
            }
          }
          
          return { x: newX, y: newY, z: newZ };
        });
        lastTimeRef.current = timestamp;
      }
    }
    
    if (animationRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    lastTimeRef.current = 0;
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [animate]);

  useEffect(() => {
    if (!isMobile && !focusedFace) {
      const startDelay = setTimeout(() => {
        setAutoRotate(true);
      }, 2000);
      return () => clearTimeout(startDelay);
    }
  }, [isMobile, focusedFace]);


  // Calculate active cube based on rotation
  const activeCube = useMemo(() => getActiveFace(rotation), [rotation]);

  // Handle face click to focus
  const handleFaceClick = useCallback((faceName) => {
    if (isMobile) return;
    
    setFocusedFace(faceName);
    setAutoRotate(false);
    setIsShowcasing(false);
    
    // Clear any existing showcase timer
    if (showcaseTimerRef.current) {
      clearTimeout(showcaseTimerRef.current);
      showcaseTimerRef.current = null;
    }
    
    cubeRef.current?.classList.add('smooth');
    const target = faceRotations[faceName];
    
    // Set target rotation for smooth transition
    setRotation(prev => {
      targetRotationRef.current = {
        x: calculateShortestRotation(prev.x, target.x),
        y: calculateShortestRotation(prev.y, target.y),
        z: calculateShortestRotation(prev.z, 0)
      };
      return targetRotationRef.current;
    });
    
    
    // Remove smooth class after delay like reference
    setTimeout(() => {
      cubeRef.current?.classList.remove('smooth');
    }, 500);
  }, [isMobile, faceRotations, calculateShortestRotation]);

  // Handle mouse move for desktop rotation
  const handleMouseMove = useCallback((e) => {
    if (isMobile || !isDragging || focusedFace) return;
    
    const deltaX = e.movementX;
    const deltaY = e.movementY;
    
    setRotation(prev => ({
      x: prev.x - deltaY,
      y: prev.y + deltaX,
      z: prev.z
    }));
  }, [isMobile, isDragging, focusedFace]);

  // Handle mouse leave for desktop - do nothing like reference
  const handleMouseLeave = useCallback(() => {
    // Reference doesn't do anything on mouse leave
  }, []);

// Handle mouse down for drag
  const handleMouseDown = useCallback((e) => {
    if (isMobile || focusedFace) return;
    setIsDragging(true);
    setAutoRotate(false);
    
    // Set grabbing cursor like improved reference
    if (cubeRef.current) {
      cubeRef.current.style.cursor = 'grabbing';
    }
    e.stopPropagation();
  }, [isMobile, focusedFace]);

// Handle document mouse move for drag
  const handleDocumentMouseMove = useCallback((e) => {
    if (!isDragging || isMobile) return;
    e.preventDefault();
    
    const deltaX = e.movementX;
    const deltaY = e.movementY;
    
    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
      z: prev.z
    }));
  }, [isDragging, isMobile]);

  // Handle document mouse up
  const handleDocumentMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Reset cursor like improved reference
    if (cubeRef.current) {
      cubeRef.current.style.cursor = 'pointer';
    }
    
    if (!focusedFace) {
      setAutoRotate(true);
    }
  }, [isDragging, focusedFace]);  // Handle click outside cube
  const handleDocumentClick = useCallback((e) => {
    if (cubeRef.current && cubeRef.current.contains(e.target)) return;
    
    setFocusedFace(null);
    setAutoRotate(true);
    setIsShowcasing(true);
    cubeRef.current?.classList.add('smooth');
    setTimeout(() => {
      cubeRef.current?.classList.remove('smooth');
      // Restart showcase sequence
      availableFacesRef.current = ['front', 'back', 'right', 'left', 'top', 'bottom'];
      if (showcaseNextFaceRef.current) {
        showcaseNextFaceRef.current();
      }
    }, 500);
  }, []);

  // Mobile cube rotation function
  const rotateCube = useCallback((direction) => {
    if (!isMobile) return;
    
    setAutoRotate(false);
    setIsShowcasing(false);
    
    const current = rotation;
    const rotationStep = 90; // Rotate 90 degrees per step
    
    let newY;
    if (direction === 'left') {
      newY = current.y - rotationStep;
    } else if (direction === 'right') {
      newY = current.y + rotationStep;
    } else {
      return;
    }
    
    setRotation(prev => ({
      ...prev,
      y: newY
    }));
    
    // Restart auto-rotate after a delay
    setTimeout(() => {
      setAutoRotate(true);
    }, 5000);
  }, [isMobile, rotation]);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setAutoRotate(false);
  }, [isMobile]);

  const handleTouchMove = useCallback((e) => {
    if (!isMobile || !touchStart) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
      z: prev.z
    }));
    
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  }, [isMobile, touchStart]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    setTouchStart(null);
    setAutoRotate(true);
  }, [isMobile]);

  // Add touch event listeners
  useEffect(() => {
    if (!isMobile || !cubeRef.current) return;
    
    const cube = cubeRef.current;
    cube.addEventListener('touchstart', handleTouchStart, { passive: false });
    cube.addEventListener('touchmove', handleTouchMove, { passive: false });
    cube.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      cube.removeEventListener('touchstart', handleTouchStart);
      cube.removeEventListener('touchmove', handleTouchMove);
      cube.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Add document event listeners for drag
  useEffect(() => {
    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp, handleDocumentClick]);

  return (
    <section 
      id="about" 
      className={`${styles.aboutSection} reveal-up`} 
      ref={revealRef}
    >
      <div className={styles.container}>
        {/* Left side - 3D Cube */}
        <div className={styles.cubeContainer}>
          <div 
            ref={cubeRef}
            className={`${styles.cube} ${focusedFace ? styles.smooth : ''}`}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
              touchAction: isMobile ? 'pan-y' : 'none',
              willChange: 'transform',
              cursor: isMobile ? 'grab' : focusedFace ? 'default' : 'grab'
            }}
          >
            {techStack.map((tech, i) => {
              const faceNames = ['front', 'back', 'right', 'left', 'top', 'bottom'];
              const faceName = faceNames[i];
              return (
                <div 
                  key={i} 
                  className={`${styles.cubeFace} ${styles[`face${i + 1}`]}`}
                  onClick={() => handleFaceClick(faceName)}
                >
                  <div className={styles.techIcon} style={{ color: tech.color }}>
                    {tech.icon}
                  </div>
                  <span className={styles.techName} style={{ color: tech.color }}>
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Mobile Navigation */}
          <div className={styles.cubeNav}>
            <button 
              className={styles.cubeNavButton}
              onClick={() => rotateCube('left')}
              aria-label="Rotate left"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className={styles.cubeNavButton}
              onClick={() => rotateCube('right')}
              aria-label="Rotate right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Right side - Content */}
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>{'// ABOUT US'}</span>
            <h2 className={styles.sectionTitle}>Engineering the <span className={styles.highlight}>Future</span></h2>
          </div>
          
          <p className={styles.description}>
            {'At Velvron Labs, we\'re not just building technology - we\'re crafting the digital future. '}
            {'Our team of elite engineers and visionaries work at the intersection of innovation and '}
            {'practicality, creating solutions that push boundaries.'}
          </p>
          
          <div className={styles.activeTech}>
            <span className={styles.activeTechLabel}>Specializing in:</span>
            <span className={styles.activeTechName} style={{ color: techStack[activeCube].color }}>
              {techStack[activeCube].name}
            </span>
          </div>
          
          {/* Animated Stats Grid - Matches Marquee Content */}
          <AnimatedStatsGrid />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
