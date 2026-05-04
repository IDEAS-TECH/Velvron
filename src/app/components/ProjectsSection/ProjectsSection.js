'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Code } from 'lucide-react';
import Image from 'next/image';
import ProjectsModal from '../ProjectsModal/ProjectsModal';
import { useReveal } from '../../hooks/useReveal';

const projects = [
  {
    id: 1,
    title: "CareCore Health",
    description: "A comprehensive healthcare platform featuring eye and ear tests, a medical marketplace, real-time chat with doctors, and notification system. This professional-grade application includes secure user authentication and a seamless user experience for both patients and healthcare providers.",
    tags: ["React", "Firebase", "WebRTC", "Real-time"],
    image: "/assets/carecore.png",
    liveUrl: "https://carecore.vercel.app",
    sourceAvailable: false,
    sourceUrl: "",
    type: "Healthcare",
    date: "2025"
  },
  {
    id: 2,
    title: "Elevate Resume",
    description: "A sophisticated resume builder platform designed for professionals to create stunning, ATS-friendly resumes. Features advanced templates, real-time preview, export options in multiple formats, and professional design customization tools.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PDF Generation"],
    image: "/assets/elevate-resume.jpg",
    liveUrl: "https://elevate-resume.vercel.app",
    sourceAvailable: false,
    sourceUrl: "",
    type: "Productivity",
    date: "2025"
  },
  {
    id: 3,
    title: "StudySphere",
    description: "A full-stack learning and collaboration platform built with clean separation between frontend (Next.js PWA) and backend (Express + PostgreSQL + MongoDB). Features real-time messaging, notifications, PWA offline support, and modular architecture.",
    tags: ["Next.js", "Express", "PostgreSQL", "MongoDB", "Socket.IO", "PWA"],
    image: "/assets/studylanding.jpg",
    liveUrl: false,
    sourceAvailable: false,
    sourceUrl: "",
    type: "Education",
    date: "2025"
  },
  {
    id: 4,
    title: "Campus Sale",
    description: "A comprehensive campus marketplace platform for students in Ghana to buy and sell items securely. Features escrow payment system, real-time messaging, and location-based services. Built with modern full-stack technologies for reliable performance.",
    tags: ["Next.js", "Redis", "PostgreSQL", "MongoDB Atlas", "Escrow"],
    image: "/assets/campussale.png",
    liveUrl: false,
    sourceAvailable: false,
    sourceUrl: "",
    type: "Marketplace",
    date: "2025"
  }
];

// Card uses CSS group-hover only — no framer variants to avoid hydration issues
const DiagonalProjectCard = ({ project }) => (
  <div className="relative w-full rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl border border-neutral-800 group glass-card">
    {/* Shimmer sweep effect */}
    <motion.div 
      style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.06) 50%,transparent 60%)', backgroundSize:'200% 100%', pointerEvents:'none', zIndex:1, borderRadius:'inherit' }}
      initial={{ backgroundPosition: '-100% 0' }}
      whileHover={{ backgroundPosition: '200% 0' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    <div className="relative flex flex-col md:flex-row h-full min-h-[450px]">

      {/* Image — clip path via CSS transition */}
      <div
        className="absolute inset-0 md:static w-full md:w-[60%] h-64 md:h-auto z-10 bg-neutral-800 overflow-hidden"
        style={{ clipPath: 'polygon(0 0,100% 0,85% 100%,0% 100%)', position: 'relative' }}
      >
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={256}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center p-8 md:pl-4 md:pr-10 mt-[220px] md:mt-0 bg-neutral-900 md:bg-transparent">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-xs font-bold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20">
            {project.type}
          </span>
          <span className="text-neutral-500 text-xs font-medium">{project.date}</span>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-2">
          {project.title}
          <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight className="w-6 h-6 text-indigo-400" />
          </span>
        </h3>

        <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs text-neutral-300 bg-neutral-800 rounded border border-neutral-700 select-none hover:border-neutral-500 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          ) : (
            <motion.button disabled className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-neutral-500 rounded-xl font-bold text-sm border border-neutral-700 cursor-not-allowed"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
              <ExternalLink className="w-4 h-4" />
              Coming Soon
            </motion.button>
          )}

          {project.sourceAvailable ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white rounded-xl font-bold text-sm border border-neutral-700 hover:bg-neutral-700 transition-all"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          ) : (
            <motion.button disabled className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-neutral-500 rounded-xl font-bold text-sm border border-neutral-700 cursor-not-allowed"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
              <Code className="w-4 h-4" />
              Private
            </motion.button>
          )}
        </div>
      </div>
    </div>
  </div>
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

const ProjectsSection = () => {
  const revealRef = useReveal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
  <section
    ref={revealRef}
    id="projects"
    className="relative w-full py-24 text-white overflow-hidden reveal-up"
    style={{ background: '#050505' }}
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at 70% 40%,rgba(151,125,255,0.06) 0%,transparent 55%),radial-gradient(ellipse at 20% 70%,rgba(122,77,255,0.05) 0%,transparent 55%)',
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6">

      {/* Header — uses animate not whileInView (dynamic component fix) */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-block text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">
          &#47;&#47; OUR PROJECTS
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Featured{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Work
          </span>
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Explore our latest projects and innovative solutions that push the boundaries of technology.
        </p>
      </motion.div>

      {/* Cards — animate not whileInView, alternating slide direction */}
      <div className="grid grid-cols-1 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ 
              y: -6, 
              boxShadow: '0 0 40px rgba(122,77,255,0.25), 0 20px 60px rgba(0,0,0,0.4)', 
              borderColor: 'rgba(122,77,255,0.4)' 
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 20,
              duration: 0.7,
              delay: index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`reveal-up`}
            data-delay={index + 1}
          >
            <DiagonalProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: projects.length * 0.12 + 0.2 }}
      >
        <p className="text-slate-400 mb-6">Want to see more of our work?</p>
        <motion.button
          onClick={(e) => { addRipple(e); openModal(); }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(122,77,255,0.5)', y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          View All Projects
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      <ProjectsModal isOpen={isModalOpen} onClose={closeModal} />

    </div>
  </section>
);
};

export default ProjectsSection;
