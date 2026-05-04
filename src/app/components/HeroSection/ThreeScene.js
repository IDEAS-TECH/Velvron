'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const frameId = useRef();
  const scene = useRef();
  const camera = useRef();
  const renderer = useRef();
  const particles = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  // Enhanced performance settings for faster loading
  const performanceSettings = useMemo(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const isSlowConnection = navigator.connection && (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
    
    return {
      particleCount: isMobile || isSlowConnection ? 400 : isLowPerformance ? 800 : 1500,
      enablePostProcessing: !isMobile && !isLowPerformance && !isSlowConnection,
      animationSpeed: isMobile || isSlowConnection ? 0.3 : isLowPerformance ? 0.6 : 0.8,
      renderScale: isMobile || isSlowConnection ? 0.5 : isLowPerformance ? 0.75 : 0.9,
      enableShadows: !isMobile && !isLowPerformance,
      pixelRatio: Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5)
    };
  }, []);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((event) => {
    if (!mountRef.current) return;
    
    const rect = mountRef.current.getBoundingClientRect();
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Subtle rotation based on mouse position
    targetRotation.current.x = mouse.current.y * 0.1;
    targetRotation.current.y = mouse.current.x * 0.1;
  }, []);

  // Optimized animation loop with performance monitoring
  const animate = useCallback(() => {
    if (!particles.current || !renderer.current || !camera.current || !scene.current) return;
    
    // Smooth interpolation for mouse interaction
    const lerp = 0.05;
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerp;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerp;
    
    // Apply rotation with performance scaling
    const time = Date.now() * 0.0001 * performanceSettings.animationSpeed;
    particles.current.rotation.x = time * 0.5 + currentRotation.current.x;
    particles.current.rotation.y = time * 0.3 + currentRotation.current.y;
    particles.current.rotation.z = time * 0.1;
    
    // Render scene
    renderer.current.render(scene.current, camera.current);
    
    frameId.current = requestAnimationFrame(animate);
  }, [performanceSettings.animationSpeed]);

  // Create optimized particle system
  const createParticleSystem = useCallback(() => {
    const { particleCount, renderScale } = performanceSettings;
    
    // Geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Color palette for particles
    const colorPalette = [
      new THREE.Color('#3b82f6'),
      new THREE.Color('#6366f1'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4')
    ];
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position particles in a sphere
      const radius = Math.random() * 400 + 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Random colors from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Varying sizes
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Optimized material
    const material = new THREE.PointsMaterial({
      size: 2 * renderScale,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      fog: false // Disable fog for performance
    });
    
    return new THREE.Points(geometry, material);
  }, [performanceSettings]);

  // Optimized resize handler
  const handleResize = useCallback(() => {
    if (!mountRef.current || !renderer.current || !camera.current) return;
    
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    camera.current.aspect = width / height;
    camera.current.updateProjectionMatrix();
    
    const renderScale = performanceSettings.renderScale;
    renderer.current.setSize(width * renderScale, height * renderScale, false);
    renderer.current.domElement.style.width = `${width}px`;
    renderer.current.domElement.style.height = `${height}px`;
  }, [performanceSettings.renderScale]);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;
    
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    // Initialize scene
    scene.current = new THREE.Scene();
    scene.current.background = null; // Transparent background
    
    // Camera setup
    camera.current = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.current.position.z = 300;
    
    // Renderer setup with performance optimizations
    renderer.current = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: !performanceSettings.renderScale < 1, // Disable AA on mobile
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
    renderer.current.setClearColor(0x000000, 0);
    
    const renderScale = performanceSettings.renderScale;
    renderer.current.setSize(width * renderScale, height * renderScale, false);
    renderer.current.domElement.style.width = `${width}px`;
    renderer.current.domElement.style.height = `${height}px`;
    
    mountNode.appendChild(renderer.current.domElement);
    
    // Create particle system
    particles.current = createParticleSystem();
    scene.current.add(particles.current);
    
    // Event listeners with passive option for better performance
    window.addEventListener('resize', handleResize, { passive: true });
    mountNode.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Start animation loop
    frameId.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      // Stop animation
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      if (mountNode) {
        mountNode.removeEventListener('mousemove', handleMouseMove);
      }
      
      // Clean up Three.js objects with null checks
      if (renderer.current && mountNode) {
        try {
          if (renderer.current.domElement && mountNode.contains(renderer.current.domElement)) {
            mountNode.removeChild(renderer.current.domElement);
          }
          renderer.current.dispose();
        } catch (e) {
          console.warn('Error disposing renderer:', e);
        }
      }
      
      // Dispose geometry and material
      if (particles.current) {
        if (particles.current.geometry) particles.current.geometry.dispose();
        if (particles.current.material) particles.current.material.dispose();
      }
      
      // Clear scene
      if (scene.current) {
        while(scene.current.children.length > 0) {
          scene.current.remove(scene.current.children[0]);
        }
      }
    };
  }, [animate, createParticleSystem, handleResize, handleMouseMove, performanceSettings]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0" 
      style={{ 
        zIndex: 0,
        background: 'transparent',
        pointerEvents: 'none'
      }} 
    />
  );
};

export default ThreeScene;