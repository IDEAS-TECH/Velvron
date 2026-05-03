'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Mail,
  Code,
  Zap,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting and scroll effect
  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Social links
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  ];

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const getNavIcon = (name) => {
    switch (name) {
      case 'Home': return <Home size={18} />;
      case 'About': return <User size={18} />;
      case 'Services': return <Briefcase size={18} />;
      case 'Projects': return <Code size={18} />;
      case 'Contact': return <Mail size={18} />;
      default: return <Zap size={18} />;
    }
  };

  if (!isMounted) return null;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[1000] h-16 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-[20px] ${
        scrolled 
          ? 'bg-slate-900/95 border-b border-slate-400/10 shadow-[0_4px_20px_rgba(0,0,0,0.1)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-12 w-full h-full flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-2 cursor-pointer select-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
        >
          {/* Logo image with pulse-blink animation */}
          <motion.div
            className="relative flex items-center justify-center"
            whileHover={{ scale: 1.12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {/* Outer glow ring — blinks */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'radial-gradient(circle, rgba(151,125,255,0.6) 0%, transparent 70%)',
                filter: 'blur(6px)',
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.9, 1.15, 0.9],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Second ring — offset timing for depth */}
            <motion.div
              className="absolute inset-0 rounded-xl border border-violet-500/40"
              animate={{
                opacity: [0, 0.8, 0],
                scale: [1, 1.35, 1],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.4,
              }}
            />
            <Image
              src="/assets/Logo.png"
              alt="Velvron Labs Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-xl object-contain relative z-10"
              priority
            />
          </motion.div>

          {/* Brand name — letters animate on mount */}
          <motion.span
            className="text-xl font-bold leading-none"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            {'Velvron Labs'.split('').map((char, i) => (
              <motion.span
                key={i}
                className={char === ' ' ? 'inline-block w-2' : 'inline-block'}
                style={{
                  background: i < 7
                    ? 'linear-gradient(135deg, #977DFF, #38bdf8)'
                    : 'white',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.2, duration: 0.35, ease: 'easeOut' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </motion.a>

        {/* Desktop Navigation - Hidden below 917px, Flex above 917px */}
        <nav className="hidden min-[917px]:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {link.name === 'Contact' ? (
                  <motion.button
                    onClick={() => handleNavClick(link.href)}
                    className="relative flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-lg overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #977DFF 0%, #7A5CE6 50%, #38bdf8 100%)',
                      backgroundSize: '200% 200%',
                      boxShadow: '0 0 0 1px rgba(151,125,255,0.3), 0 4px 15px rgba(151,125,255,0.25)',
                    }}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {/* Shimmer sweep on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                      whileHover={{ translateX: '200%' }}
                      transition={{ duration: 0.55, ease: 'easeInOut' }}
                    />
                    <Mail size={15} className="relative z-10 flex-shrink-0" />
                    <span className="relative z-10">Contact Us</span>
                  </motion.button>
                ) : (
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-all duration-200 py-2 relative group hover:-translate-y-px"
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  >
                    <span className="w-4 h-4 text-slate-500 transition-colors duration-200 group-hover:text-[#977DFF] flex-shrink-0">
                      {getNavIcon(link.name)}
                    </span>
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#977DFF] to-[#38bdf8] group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button - Flex below 917px, Hidden above 917px */}
        <motion.button
          className="flex min-[917px]:hidden items-center justify-center w-10 h-10 text-white bg-white/10 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/20 border-none"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed top-16 right-0 w-full md:w-[400px] bg-slate-900/98 backdrop-blur-[20px] border-l border-b border-slate-400/10 overflow-hidden z-[999]"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
            >
              <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-4 mb-6">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-3 font-medium py-3 transition-colors duration-200 ${
                        link.name === 'Contact'
                          ? 'bg-gradient-to-r from-[#977DFF] to-[#7A5CE6] text-white px-6 rounded-lg hover:shadow-[0_10px_20px_rgba(151,125,255,0.3)] hover:-translate-y-0.5'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className={`w-5 h-5 ${link.name !== 'Contact' ? 'text-[#977DFF]' : ''}`}>
                        {getNavIcon(link.name)}
                      </span>
                      <span>{link.name === 'Contact' ? 'Contact Us' : link.name}</span>
                    </motion.a>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-400/10">
                  <p className="text-sm text-slate-500 mb-3">Connect with us</p>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 p-2 rounded-lg transition-all duration-200 hover:text-[#977DFF] hover:bg-[#977DFF]/10 hover:-translate-y-[1px]"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.name}
                        >
                          <Icon size={20} />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;