'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, Home, User, Briefcase, Mail, Code, Zap, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  // 1. DYNAMIC SCROLL LOGIC
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  // 2. ACTIVE SECTION OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Services', href: '#services', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: Code },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Reusable ripple effect function (from old navbar)
  const addRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.width = ripple.style.height = '0px';
    ripple.style.background = 'rgba(255,255,255,0.3)';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 500ms ease-out';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 500);
  };

  return (
    <>
      <header 
        className={`fixed left-0 right-0 z-[1000] flex justify-center transition-all duration-500 ${
          scrolled ? 'top-6 px-4' : 'top-0 px-0'
        }`}
      >
        <motion.div
          layout
          className={`relative flex items-center justify-between transition-all duration-500 ${
            scrolled 
              ? 'w-full max-w-3xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
              : 'w-full max-w-[1400px] bg-transparent border-b border-white/5 px-8 py-6'
          }`}
        >
          {/* LOGO AREA */}
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
              <Image
                src="/assets/Logo.png"
                alt="Logo"
                fill
                className="object-contain p-1 group-hover:scale-110 transition-transform duration-500"
              />
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </div>
            {!scrolled && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-black tracking-tighter text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                VELVRON <span className="text-purple-400">LABS</span>
              </motion.span>
            )}
          </motion.a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </div>
            
            <motion.button
              onClick={(e) => { addRipple(e); handleNavClick(e, '#contact'); }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="ml-4 px-5 py-2.5 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Hire Us
            </motion.button>
          </nav>

          {/* MOBILE TOGGLE */}
          <motion.button 
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu size={24} />
          </motion.button>
        </motion.div>
      </header>

      {/* IMMERSIVE MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] bg-black backdrop-blur-2xl flex flex-col"
          >
            <div className="flex justify-between items-center p-8">
              <span className="text-xl font-black italic" style={{ fontFamily: 'var(--font-display)' }}>MENU</span>
              <motion.button 
                onClick={() => setIsOpen(false)} 
                className="p-4 bg-white/5 rounded-full"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <X size={30} />
              </motion.button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-12 gap-8">
              {navLinks.concat({ name: 'Contact', href: '#contact', icon: Mail }).map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1], duration: 0.8 }}
                  className="group flex items-center justify-between"
                >
                  <span 
                    className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-800 group-hover:text-white group-hover:italic transition-all duration-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {link.name}
                  </span>
                  <ExternalLink className="opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all text-purple-400" size={40} />
                </motion.a>
              ))}
            </div>

            <div className="p-12 border-t border-white/5 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs text-neutral-500 uppercase font-bold" style={{ fontFamily: 'var(--font-display)' }}>Socials</p>
                <div className="flex gap-4">
                   <Github size={20} className="text-neutral-400 hover:text-white transition-colors" />
                   <Linkedin size={20} className="text-neutral-400 hover:text-white transition-colors" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500 uppercase font-bold" style={{ fontFamily: 'var(--font-display)' }}>Project Inquiry</p>
                <p className="text-white font-bold" style={{ fontFamily: 'var(--font-display)' }}>hello@velvron.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
