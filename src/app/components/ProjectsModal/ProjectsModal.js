'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Zap, Globe, Code2, Sparkles } from 'lucide-react';

// Projects data (matching ProjectsSection)
const allProjects = [
  {
    id: 1,
    title: "CareCore Health",
    description: "Healthcare platform with eye/ear tests, medical marketplace, real-time chat with doctors",
    tags: ["React", "Firebase", "WebRTC"],
    image: "/assets/carecore.png",
    liveUrl: "https://carecore.vercel.app",
    type: "Healthcare",
    status: "Live",
    color: "#22c55e"
  },
  {
    id: 2,
    title: "Elevate Resume",
    description: "ATS-friendly resume builder with advanced templates and PDF export",
    tags: ["Next.js", "TypeScript", "PDF Generation"],
    image: "/assets/elevate-resume.jpg",
    liveUrl: "https://elevate-resume.vercel.app",
    type: "Productivity",
    status: "Live",
    color: "#3b82f6"
  },
  {
    id: 3,
    title: "StudySphere",
    description: "Learning platform with real-time messaging, PWA support, modular architecture",
    tags: ["Next.js", "Express", "Socket.IO", "PWA"],
    image: "/assets/studylanding.jpg",
    liveUrl: null,
    type: "Education",
    status: "Coming Soon",
    color: "#f59e0b"
  },
  {
    id: 4,
    title: "Campus Sale",
    description: "Campus marketplace with escrow payments and real-time messaging",
    tags: ["Next.js", "Redis", "PostgreSQL", "Escrow"],
    image: "/assets/campussale.png",
    liveUrl: null,
    type: "Marketplace",
    status: "Coming Soon",
    color: "#f59e0b"
  }
];

// Lightning Bolt SVG Component
const LightningBolt = ({ className, animate = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={animate ? {
      filter: 'drop-shadow(0 0 8px rgba(151, 125, 255, 0.8))',
      animation: 'lightningPulse 1.5s ease-in-out infinite'
    } : {}}
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

// Individual Project Card with Lightning Effect
const LightningCard = ({ project, index, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [lightningActive, setLightningActive] = useState(false);

  const handleClick = useCallback(() => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  }, [project.liveUrl]);

  // Trigger lightning on mount with stagger
  useEffect(() => {
    const timer = setTimeout(() => {
      setLightningActive(true);
      setTimeout(() => setLightningActive(false), 300);
    }, index * 150 + 400);
    return () => clearTimeout(timer);
  }, [index]);

  const isLive = project.status === "Live";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ delay: index * 0.1, duration: 0.4, type: "spring", stiffness: 300 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Lightning Background Effect */}
      <AnimatePresence>
        {(lightningActive || isHovered) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-[2px] rounded-2xl overflow-hidden pointer-events-none z-0"
          >
            {/* Animated lightning border */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(90deg, transparent, rgba(151,125,255,0.3), transparent)',
                  'linear-gradient(90deg, rgba(151,125,255,0.6), rgba(56,189,248,0.8), rgba(151,125,255,0.6))',
                  'linear-gradient(90deg, transparent, rgba(151,125,255,0.3), transparent)'
                ],
              }}
              transition={{ duration: 0.3, times: [0, 0.5, 1] }}
              className="absolute inset-0"
            />
            {/* Electric sparks */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(151,125,255,0.4) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        onClick={handleClick}
        className={`relative z-10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
          isLive ? 'bg-black/90 border-white/10' : 'bg-black/60 border-white/5'
        } border backdrop-blur-sm`}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        style={{
          boxShadow: isHovered 
            ? '0 20px 40px rgba(151, 125, 255, 0.25), 0 0 60px rgba(151, 125, 255, 0.1)' 
            : '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Image Section */}
        <div className="relative h-40 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
            onError={(e) => { e.target.src = '/assets/placeholder-project.jpg'; }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ 
              background: isLive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              color: isLive ? '#22c55e' : '#f59e0b',
              border: `1px solid ${isLive ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
            }}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
            {project.status}
          </div>

          {/* Lightning Icon on Hover */}
          <AnimatePresence>
            {isHovered && isLive && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-3 left-3"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Zap className="w-5 h-5 text-violet-400 fill-violet-400" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
              {project.title}
            </h3>
            {isLive && (
              <motion.div
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-violet-400" />
              </motion.div>
            )}
          </div>

          <p className="text-sm text-slate-400 mb-3 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Click Hint */}
        <AnimatePresence>
          {isHovered && isLive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-violet-600/20 to-transparent"
            >
              <p className="text-center text-xs text-violet-300 font-medium flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                Click to open live demo
                <Sparkles className="w-3 h-3" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Main Modal Component
export default function ProjectsModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return typeof window !== 'undefined' && createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9990]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9991] max-w-6xl max-h-[85vh] w-[90vw] overflow-y-auto"
          >
            <div className="relative w-full h-full bg-black/95 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-black/95 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Globe className="w-6 h-6 text-violet-400" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      All Projects
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-violet-400"
                      >
                        <Zap className="w-5 h-5 fill-violet-400" />
                      </motion.span>
                    </h2>
                    <p className="text-xs text-slate-400">Click any live project to open</p>
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition-colors group"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2, rotate: 90 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <X className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </motion.button>
              </div>

              {/* Projects Grid */}
              <div className="overflow-y-auto h-[calc(100%-80px)] p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
                  {allProjects.map((project, index) => (
                    <LightningCard
                      key={project.id}
                      project={project}
                      index={index}
                      onClose={onClose}
                    />
                  ))}
                </div>

                {/* Empty State / CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-700/30"
                >
                  <Code2 className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">
                    More projects coming soon. Have an idea?{' '}
                    <motion.button 
                      onClick={() => { onClose(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
                      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      Let&apos;s build it together
                    </motion.button>
                  </p>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-20 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Global Styles for Lightning Animation */}
          <style>{`
            @keyframes lightningPulse {
              0%, 100% { 
                filter: drop-shadow(0 0 8px rgba(151, 125, 255, 0.6));
                transform: scale(1);
              }
              50% { 
                filter: drop-shadow(0 0 20px rgba(151, 125, 255, 1)) drop-shadow(0 0 40px rgba(56, 189, 248, 0.8));
                transform: scale(1.1);
              }
            }
            
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
