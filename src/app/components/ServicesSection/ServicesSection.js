'use client';

import { motion } from 'framer-motion';
import {
  Globe,
  Server,
  Database,
  Box,
  Zap,
  ArrowRight,
  Cpu,
  Code2,
  Rocket,
  FileCode,
  Palette,
  Triangle,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { GradientTracing } from '../ui/gradient-tracing';

// ==================================================================================
// 3. THE ORBITAL NODE - FRONTEND
// ==================================================================================
const OrbitalSkill = () => {
    const [hoveredTech, setHoveredTech] = useState(null);

    const techStack = [
      { name: 'React', icon: Code2, color: 'text-cyan-300', position: '-top-3 left-1/2 -translate-x-1/2' },
      { name: 'Next.js', icon: Rocket, color: 'text-white', position: 'top-3 right-0' },
      { name: 'TypeScript', icon: FileCode, color: 'text-blue-400', position: 'bottom-3 left-0' },
      { name: 'Tailwind CSS', icon: Palette, color: 'text-teal-300', position: 'bottom-3 right-0' },
      { name: 'Vue.js', icon: Triangle, color: 'text-green-400', position: 'top-3 left-0' }
    ];

    return (
        <div className="group relative w-64 h-64 flex items-center justify-center">
            
            {/* Orbits Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-neutral-800/50 group-hover:border-neutral-700/50 transition-colors duration-700 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-dashed border-neutral-800/50 group-hover:border-neutral-700/50 transition-colors duration-700 animate-[spin_15s_linear_infinite_reverse]" />

            {/* Central Core */}
            <div className="relative z-10 w-20 h-20 bg-neutral-900 rounded-full border border-neutral-800 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-shadow">
                <Globe className="w-8 h-8 text-blue-500" />
            </div>

            {/* Orbiting Tech Stack */}
            {techStack.map((tech, index) => (
              <motion.div 
                  key={tech.name}
                  className={`absolute ${tech.position} p-2 bg-neutral-900 border border-neutral-700 rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 cursor-pointer hover:scale-110 hover:border-neutral-500`}
                  style={{ transitionDelay: `${75 + index * 75}ms` }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
              >
                  <tech.icon className={`w-4 h-4 ${tech.color}`} />

                  {/* Tooltip */}
                  {hoveredTech === tech.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg border border-neutral-700"
                    >
                      {tech.name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-800 rotate-45 border-r border-b border-neutral-700" />
                    </motion.div>
                  )}
              </motion.div>
            ))}

            <span className="absolute bottom-0 translate-y-8 text-sm font-bold text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">Frontend</span>
        </div>
    )
}

// ==================================================================================
// 2. THE COMMAND LINE - BACKEND
// ==================================================================================
const TerminalSkill = () => {
  return (
    <div className="group w-80 bg-black rounded-lg overflow-hidden border border-neutral-800 font-mono text-sm relative shadow-lg">
      
      {/* Terminal Header */}
      <div className="h-8 bg-neutral-900 border-b border-neutral-800 flex items-center px-3 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-2 text-neutral-500 text-xs">backend.sh</span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-48 flex flex-col justify-between">
        <div className="space-y-2 text-neutral-400">
          <div className="flex gap-2">
            <span className="text-green-500">➜</span>
            <span className="text-neutral-300">init infrastructure</span>
          </div>
          
          <div className="group-hover:block hidden">
            <div className="flex gap-2 text-yellow-500/80">
              <span>⚠</span>
              <span>Loading modules...</span>
            </div>
            <div className="pl-4 pt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-neutral-300">
                <span>[✓] Node.js</span>
                <span>[✓] K8s</span>
                <span>[✓] AWS</span>
                <span>[✓] Docker</span>
            </div>
          </div>
          
          {/* Blinking Cursor */}
          <div className="group-hover:hidden flex gap-2">
             <span className="text-green-500">➜</span>
             <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-green-500 block" 
             />
          </div>
        </div>

        <div className="text-xs text-neutral-600 border-t border-neutral-900 pt-2 flex justify-between items-center">
            <span>Uptime: 99.99%</span>
            <Zap className="w-3 h-3 text-yellow-600" />
        </div>
      </div>
    </div>
  )
};

// ==================================================================================
// 1. THE INFINITE DECK - UX/UI DESIGN
// ==================================================================================
const CardDeckSkill = () => {
  return (
    <div className="group relative h-64 w-60 [perspective:1000px]">
      {/* Back Card (Tool 3) */}
      <div className="absolute inset-0 rounded-2xl bg-neutral-800 border border-neutral-700 shadow-xl transition-all duration-500 ease-out group-hover:translate-x-12 group-hover:-translate-y-4 group-hover:rotate-12 flex items-center justify-center">
         <Box className="w-10 h-10 text-neutral-600" />
      </div>

      {/* Middle Card (Tool 2) */}
      <div className="absolute inset-0 rounded-2xl bg-neutral-800 border border-neutral-600 shadow-xl transition-all duration-500 ease-out group-hover:translate-x-6 group-hover:-translate-y-8 group-hover:rotate-6 flex items-center justify-center">
         <Database className="w-10 h-10 text-neutral-500" />
      </div>

      {/* Front Card (Main Skill) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl transition-all duration-500 group-hover:-translate-y-12">
        <div className="p-4 bg-indigo-500/10 rounded-full mb-4">
            <Server className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold text-white">UX/UI Design</h3>
        <p className="text-xs text-neutral-400 mt-2">User Experience</p>

        {/* Hidden List revealed on hover */}
        <div className="absolute bottom-4 left-0 w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <div className="flex justify-center gap-2">
                {['Figma', 'Sketch', 'XD'].map(t => (
                    <span key={t} className="text-[10px] uppercase font-bold bg-neutral-800 px-2 py-1 rounded text-neutral-300 border border-neutral-700">{t}</span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

// ==================================================================================
// SERVICE CARD WITH CTA
// ==================================================================================
const ServiceCard = ({ 
  title, 
  description, 
  component: Component 
}) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Interactive Component */}
      <div className="mb-6">
        <Component />
      </div>

      {/* Service Info */}
      <div className="text-center max-w-xs">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-neutral-400 text-sm mb-4">{description}</p>
        
        <motion.button
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg"
          whileHover={{ scale: 1.06, boxShadow: '0 0 20px rgba(151,125,255,0.3)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          onClick={() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Book Us Now
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// ==================================================================================
// SERVICES SECTION
// ==================================================================================
const ServicesSection = () => {
  const services = [
    {
      title: 'Frontend Development',
      description: 'Modern, responsive interfaces built with cutting-edge frameworks and best practices.',
      component: OrbitalSkill
    },
    {
      title: 'Backend Development',
      description: 'Scalable server architecture, APIs, and infrastructure that power your applications.',
      component: TerminalSkill
    },
    {
      title: 'UX/UI Design',
      description: 'User-centered design solutions that create intuitive and engaging experiences.',
      component: CardDeckSkill
    }
  ];

  return (
    <section id="services" className="relative w-full py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/20 via-transparent to-purple-900/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">&#47;&#47; OUR SERVICES</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What We <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Build</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From concept to deployment, we deliver comprehensive technology solutions that drive innovation and accelerate your business growth.
          </p>
        </motion.div>

        {/* Gradient Tracing Background Decoration */}
        <div className="absolute left-0 right-0 top-[300px] h-[600px] pointer-events-none opacity-40 overflow-hidden">
          <GradientTracing
            width={1200}
            height={600}
            path="M0,100 Q300,50 600,300 T1200,200"
            gradientColors={["rgba(139,92,246,0)", "rgba(139,92,246,0.8)", "rgba(139,92,246,0)"]}
            animationDuration={4}
            strokeWidth={3}
          />
          <div className="absolute top-0 right-0">
            <GradientTracing
              width={800}
              height={400}
              path="M800,300 Q500,200 200,350 T0,150"
              gradientColors={["rgba(56,189,248,0)", "rgba(56,189,248,0.6)", "rgba(56,189,248,0)"]}
              animationDuration={5}
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Services Grid with CTAs */}
        <div className="relative flex flex-wrap justify-center items-start gap-16 lg:gap-20 mb-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              component={service.component}
            />
          ))}
        </div>

        {/* Hover Instruction */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-slate-400 text-sm italic">
            Hover over each service to learn more
          </p>
        </motion.div>

        {/* CTA Section - Purple Gradient with Shake Animation */}
        <motion.div
          className="relative text-center overflow-hidden rounded-3xl p-10 md:p-12 group cursor-pointer"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ 
            scale: 1.03,
            transition: { type: 'spring', stiffness: 300, damping: 15 }
          }}
          onHoverStart={() => {}}
          onClick={() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={{
            background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.9) 0%, rgba(67, 56, 202, 0.85) 50%, rgba(88, 28, 135, 0.9) 100%)',
            border: '1px solid rgba(167, 139, 250, 0.3)',
            boxShadow: '0 20px 60px rgba(88, 28, 135, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          {/* Animated Background Glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.3) 0%, transparent 70%)'
            }}
          />
          
          {/* Floating Particles on Hover */}
          <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-violet-300 rounded-full"
                initial={{ 
                  x: `${20 + i * 15}%`, 
                  y: '100%',
                  opacity: 0 
                }}
                animate={{ 
                  y: '-20%',
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut'
                }}
              />
            ))}
          </motion.div>

          <div className="relative z-10">
            <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Ready to Start Your Project?
            </motion.h3>
            <p className="text-violet-100 mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Let&apos;s discuss how we can bring your vision to life with our expertise and innovation.
            </p>
            
            {/* Animated Button with Shake */}
            <motion.button
              className="relative bg-white text-violet-700 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.08,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              style={{
                animation: 'none'
              }}
            >
              {/* Button Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              
              <span className="relative z-10 flex items-center gap-2">
                Get Started Today
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </div>

          {/* Smooth Shake Animation Keyframes */}
          <style>{`
            @keyframes smoothShake {
              0%, 100% { transform: translateX(0) rotate(0deg); }
              10% { transform: translateX(-2px) rotate(-0.5deg); }
              20% { transform: translateX(2px) rotate(0.5deg); }
              30% { transform: translateX(-3px) rotate(-0.5deg); }
              40% { transform: translateX(3px) rotate(0.5deg); }
              50% { transform: translateX(-2px) rotate(-0.3deg); }
              60% { transform: translateX(2px) rotate(0.3deg); }
              70% { transform: translateX(-1px) rotate(-0.2deg); }
              80% { transform: translateX(1px) rotate(0.2deg); }
              90% { transform: translateX(-0.5px) rotate(-0.1deg); }
            }
            .group:hover {
              animation: smoothShake 0.8s ease-in-out;
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;