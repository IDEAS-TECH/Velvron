'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Globe, Server, Database, Box, Zap, ArrowRight,
  Cpu, Code2, Rocket, FileCode, Palette, Triangle,
  Terminal, Layers, Monitor
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useReveal } from '../../hooks/useReveal';

// --- UTILS: 3D Tilt Hook ---
const useTilt = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
};

// ==================================================================================
// 1. THE NEON ORBITAL (FRONTEND) - Enhanced with float and glow
// ==================================================================================
const OrbitalSkill = () => {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt();
  
  const tech = [
    { icon: Code2, color: '#22d3ee', pos: 'top-0 left-1/2 -translate-x-1/2' },
    { icon: Rocket, color: '#ffffff', pos: 'top-1/4 right-0' },
    { icon: Triangle, color: '#4ade80', pos: 'bottom-1/4 right-0' },
    { icon: Palette, color: '#f472b6', pos: 'bottom-0 left-1/2 -translate-x-1/2' },
    { icon: FileCode, color: '#60a5fa', pos: 'top-1/4 left-0' },
  ];

  return (
    <motion.div 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        y: -6, 
        boxShadow: '0 0 40px rgba(122,77,255,0.25), 0 20px 60px rgba(0,0,0,0.4)', 
        borderColor: 'rgba(122,77,255,0.4)' 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative w-72 h-72 flex items-center justify-center group cursor-grab active:cursor-grabbing"
    >
      {/* Shimmer sweep effect */}
      <motion.div 
        style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.06) 50%,transparent 60%)', backgroundSize:'200% 100%', pointerEvents:'none', zIndex:1, borderRadius:'inherit' }}
        initial={{ backgroundPosition: '-100% 0' }}
        whileHover={{ backgroundPosition: '200% 0' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
      
      {/* Rotating Rings */}
      <div className="absolute inset-0 border-[1px] border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute inset-10 border-[1px] border-white/10 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse]" />

      {/* Central Core */}
      <motion.div 
        style={{ translateZ: 50 }}
        className="relative z-10 w-24 h-24 bg-gradient-to-br from-neutral-800 to-black rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl"
      >
        <Globe className="w-10 h-10 text-blue-400 animate-pulse" />
        <div className="absolute inset-0 bg-blue-400/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
      </motion.div>

      {/* Floating Icons */}
      {tech.map((item, i) => (
        <motion.div
          key={i}
          style={{ translateZ: 80 }}
          className={`absolute ${item.pos} p-3 bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl group-hover:scale-110 transition-transform`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <item.icon size={20} style={{ color: item.color }} />
        </motion.div>
      ))}
    </motion.div>
  );
};

// ==================================================================================
// 2. DATA STREAM TERMINAL (BACKEND) - Matrix-style data pulses
// ==================================================================================
const TerminalSkill = () => {
  return (
    <motion.div 
      whileHover={{ 
        y: -6, 
        boxShadow: '0 0 40px rgba(122,77,255,0.25), 0 20px 60px rgba(0,0,0,0.4)', 
        borderColor: 'rgba(122,77,255,0.4)' 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative w-80 group glass-card"
    >
      {/* Shimmer sweep effect */}
      <motion.div 
        style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.06) 50%,transparent 60%)', backgroundSize:'200% 100%', pointerEvents:'none', zIndex:1, borderRadius:'inherit' }}
        initial={{ backgroundPosition: '-100% 0' }}
        whileHover={{ backgroundPosition: '200% 0' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-800 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
      <div className="group w-80 bg-black rounded-lg overflow-hidden border border-neutral-800 font-mono text-sm relative shadow-lg">
        <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">system.node_v2</span>
        </div>
        <div className="p-5 font-mono text-[12px] space-y-3">
          <div className="flex gap-2 text-green-400">
            <span className="shrink-0 text-white/30">$</span>
            <span className="animate-typing overflow-hidden whitespace-nowrap">npm run deploy:cluster</span>
          </div>
          <div className="space-y-1 text-neutral-400">
            <p className="flex justify-between"><span>CPU Load:</span> <span className="text-green-500">12%</span></p>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-full h-full bg-gradient-to-r from-transparent via-green-500 to-transparent" 
                />
            </div>
            <p className="text-[10px] text-neutral-600">Checking Kubernetes pods...</p>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
                <div className="bg-white/5 p-2 rounded border border-white/5 flex items-center gap-2">
                    <Database size={12} className="text-emerald-500" />
                    <span>PostgreSQL</span>
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/5 flex items-center gap-2">
                    <Cpu size={12} className="text-emerald-500" />
                    <span>Redis</span>
                </div>
            </div>
          </div>
        </div>
      </div>
  </motion.div>
  );
};

// ==================================================================================
// 3. LAYERED DEPTH (DESIGN) - Exploding layers on hover
// ==================================================================================
const CardDeckSkill = () => {
  return (
    <motion.div
      whileHover={{ 
        y: -6, 
        boxShadow: '0 0 40px rgba(122,77,255,0.25), 0 20px 60px rgba(0,0,0,0.4)', 
        borderColor: 'rgba(122,77,255,0.4)' 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative text-center overflow-hidden rounded-3xl p-10 md:p-12 group cursor-pointer glass-card"
    >
      {/* Shimmer sweep effect */}
      <motion.div 
        style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.06) 50%,transparent 60%)', backgroundSize:'200% 100%', pointerEvents:'none', zIndex:1, borderRadius:'inherit' }}
        initial={{ backgroundPosition: '-100% 0' }}
        whileHover={{ backgroundPosition: '200% 0' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {/* Background Glow */}
      <div className="absolute inset-0 bg-purple-500/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Enhanced 3D Card Deck */}
      <div className="group relative h-64 w-60 [perspective:1000px] mx-auto" style={{ transformStyle: 'preserve-3d' }}>
        {/* Back Card (Tool 3) */}
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-neutral-800 border border-neutral-700 shadow-xl transition-all duration-500 ease-out group-hover:translate-x-12 group-hover:-translate-y-4 group-hover:rotate-12 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <Box className="w-10 h-10 text-neutral-600" />
        </motion.div>

        {/* Middle Card (Tool 2) */}
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-neutral-800 border border-neutral-600 shadow-xl transition-all duration-500 ease-out group-hover:translate-x-6 group-hover:-translate-y-8 group-hover:rotate-6 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <Database className="w-10 h-10 text-neutral-500" />
        </motion.div>

        {/* Front Card (Main Skill) */}
        <motion.div 
          className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/20 shadow-2xl transition-all duration-500 group-hover:-translate-y-12"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
          <motion.div 
            className="p-4 bg-purple-500/10 rounded-full mb-4 border border-purple-500/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Server className="w-8 h-8 text-purple-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-white tracking-tighter">UX/UI Design</h3>
          <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">User Experience</p>

          {/* Hidden List revealed on hover */}
          <motion.div 
            className="absolute bottom-4 left-0 w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="flex justify-center gap-2">
              {['Figma', 'Sketch', 'XD'].map((tool, index) => (
                <motion.span 
                  key={tool} 
                  className="text-[10px] uppercase font-bold bg-neutral-800 px-2 py-1 rounded text-neutral-300 border border-neutral-700"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ==================================================================================
// MAIN COMPONENT
// ==================================================================================

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

const ServicesSection = () => {
  const revealRef = useReveal();
  
  const services = [
    { title: 'Frontend Architecture', desc: 'Crafting pixel-perfect, hyper-fluid interfaces that defy the standard.', component: OrbitalSkill },
    { title: 'Scalable Backbone', desc: 'Ultra-secure, low-latency infrastructures designed for massive concurrency.', component: TerminalSkill },
    { title: 'Strategic Design', desc: 'Human-centric aesthetics paired with psychological user-flow optimization.', component: CardDeckSkill }
  ];

  return (
    <section ref={revealRef} id="services" className="relative w-full py-32 bg-[#050505] text-white overflow-hidden reveal-scale">
      {/* Abstract Background Noise/Grid */}
      <div className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-32"
        >
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic">
            ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">SERVICES</span>
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            We don’t just build apps. We engineer digital experiences that push the boundaries of what’s possible on the web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-10">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -6, 
                boxShadow: '0 0 40px rgba(122,77,255,0.25), 0 20px 60px rgba(0,0,0,0.4)', 
                borderColor: 'rgba(122,77,255,0.4)' 
              }}
              transition={{ delay: i * 0.2, type: 'spring', stiffness: 300, damping: 20 }}
              className={`flex flex-col items-center group reveal-up glass-card`}
              data-delay={i + 1}
            >
              {/* Shimmer sweep effect */}
              <motion.div 
                style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.06) 50%,transparent 60%)', backgroundSize:'200% 100%', pointerEvents:'none', zIndex:1, borderRadius:'inherit' }}
                initial={{ backgroundPosition: '-100% 0' }}
                whileHover={{ backgroundPosition: '200% 0' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              <div className="h-[300px] flex items-center justify-center mb-12">
                <s.component />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors tracking-tight">{s.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-8 max-w-[280px]">{s.desc}</p>
                
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  onClick={(e) => { addRipple(e); }}
                  className="px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest"
                >
                  Configure Project
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fixed Background Decal */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] pointer-events-none" />
    </section>
  );
};

export default ServicesSection;