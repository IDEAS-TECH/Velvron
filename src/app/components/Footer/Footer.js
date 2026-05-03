'use client';

import { motion } from 'framer-motion';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Twitter, 
  Linkedin, 
  Github, 
  Heart, 
  Globe,
  Shield,
  FileText
} from 'lucide-react';
import Link from 'next/link';
const siteConfig = {
  contact: {
    email: 'frimpongbrichmond@gmail.com',
    phone: '+233 (0) 54 869 7052',
    location: '8th Floor, One Airport Square, Airport City, Accra, Ghana',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.970104116976!2d-0.1765809241460331!3d5.605333133499402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b7754117b43%3A0xc312450849266b61!2sOne%20Airport%20Square!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh'
  },
  social: {
    github: 'https://github.com/Velvron-Labs',
    twitter: null,
    linkedin: null
  },
  company: {
    name: 'Velvron Labs',
    description: 'Engineering the future, one line of code at a time. We build digital experiences that empower businesses in Ghana and beyond.'
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50 },
    },
  };

  return (
    <footer className="relative bg-slate-950 pt-20 pb-10 overflow-hidden border-t border-slate-800/50">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="container mx-auto px-4 relative z-10 max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Velvron Labs
              </h3>
              <p className="mt-4 text-slate-400 leading-relaxed text-sm">
                {siteConfig.company.description}
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-6">
              <SocialIcon 
                href={siteConfig.social.github} 
                icon={<Github size={20} />} 
                label="GitHub" 
              />
              <div className="relative group">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  No Twitter available yet
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>
                <motion.button
                  className="text-slate-400 hover:text-[#977DFF] transition-colors cursor-not-allowed"
                  disabled
                  whileHover={{ scale: 1.05, color: '#977DFF' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Twitter size={20} />
                </motion.button>
              </div>
              <div className="relative group">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  No LinkedIn available yet
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>
                <motion.button
                  className="text-slate-400 hover:text-[#977DFF] transition-colors cursor-not-allowed"
                  disabled
                  whileHover={{ scale: 1.05, color: '#977DFF' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Linkedin size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Links Column 1: Company */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <Globe size={18} className="text-blue-500" /> Company
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#about">About Us</FooterLink>
              <li className="relative group">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  No careers available yet
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>
                <motion.button
                  className="w-full flex items-center gap-2 text-slate-400 hover:text-[#977DFF] transition-colors cursor-not-allowed text-left text-sm"
                  disabled
                  whileHover={{ scale: 1.05, color: '#977DFF' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <span>Careers</span>
                </motion.button>
              </li>
              <li className="relative group">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  No blogs available yet
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>
                <motion.button
                  className="w-full flex items-center gap-2 text-slate-400 hover:text-[#977DFF] transition-colors cursor-not-allowed text-left text-sm"
                  disabled
                  whileHover={{ scale: 1.05, color: '#977DFF' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <span>Our Blog</span>
                </motion.button>
              </li>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </motion.div>

          {/* Links Column 2: Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <FileText size={18} className="text-violet-500" /> Services
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span>Web Development</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span>Mobile Solutions</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span>AI & Machine Learning</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span>Blockchain Tech</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <MapPin size={18} className="text-blue-500" /> Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm group">
                <div className="mt-1 min-w-[20px] text-blue-500 group-hover:text-blue-400 transition-colors">
                  <MapPin size={18} />
                </div>
                <span>{siteConfig.contact.location}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm group">
                <div className="min-w-[20px] text-blue-500 group-hover:text-blue-400 transition-colors">
                  <Mail size={18} />
                </div>
                <a href="mailto:hello@velvronlabs.com" className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm group">
                <div className="min-w-[20px] text-blue-500 group-hover:text-blue-400 transition-colors">
                  <Phone size={18} />
                </div>
                <a href="tel:+233551234567" className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          variants={itemVariants}
          className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-800 relative group mb-16 shadow-2xl"
        >
          {/* Overlay to style map grayscale until hover */}
          <div className="absolute inset-0 bg-slate-950/20 mix-blend-overlay z-10 pointer-events-none group-hover:bg-transparent transition-all duration-500" />
          <div className="absolute inset-0 bg-slate-900/10 z-0" />
          
          <iframe 
            src={siteConfig.contact.mapEmbedUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(85%)' }} 
            className="group-hover:filter-none transition-all duration-700 ease-in-out"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Velvron Labs Location"
          ></iframe>

          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 shadow-lg">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Based in Accra, Ghana
            </span>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
        >
          <p className="text-slate-500 flex items-center gap-1 text-center md:text-left">
            &copy; {currentYear} Velvron Labs. Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Ghana.
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-slate-500">
            <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <Shield size={14} /> Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <FileText size={14} /> Terms of Service
            </Link>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
};

// Helper Component for Social Icons
const SocialIcon = ({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label={label}
    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:-translate-y-1 transition-all duration-300"
  >
    {icon}
  </a>
);

// Helper Component for Links
const FooterLink = ({ href, children }) => (
  <li>
    <Link 
      href={href} 
      className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-all duration-300 text-sm"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors" />
      <span className="group-hover:translate-x-1 transition-transform">{children}</span>
    </Link>
  </li>
);

export default Footer;