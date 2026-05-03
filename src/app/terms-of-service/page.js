'use client';

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
import { motion } from 'framer-motion';
import { 
  Scale, 
  Copyright, 
  ShieldAlert, 
  AlertCircle, 
  RefreshCcw, 
  Gavel, 
  Mail, 
  Phone, 
  MapPin, 
  Check,
  FileSignature
} from 'lucide-react';

export default function TermsOfService() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50 }
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-200 pt-32 pb-20 px-4 overflow-hidden font-sans selection:bg-violet-500/30">
      
      {/* --- Background Elements --- */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        className="container mx-auto max-w-5xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* --- Header Section --- */}
        <div className="text-center mb-16">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-violet-500/10 border border-violet-500/20 shadow-lg shadow-violet-500/10"
          >
            <Scale size={32} className="text-violet-500" />
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Terms of Service
            </span>
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 text-sm backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Last updated: {currentDate}
          </motion.div>
        </div>

        {/* --- Main Content --- */}
        <div className="space-y-12">

          {/* 1. Introduction */}
          <TermsSection 
            number="01" 
            title="Introduction" 
            icon={<FileSignature size={20} />}
          >
            <p className="text-slate-300 leading-relaxed text-lg">
              Welcome to Velvron Labs. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website and services. 
              By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </TermsSection>

          {/* 2. Intellectual Property Rights */}
          <TermsSection 
            number="02" 
            title="Intellectual Property Rights" 
            icon={<Copyright size={20} />}
          >
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 mb-4">
              <p className="text-slate-300 leading-relaxed">
                The content, features, and functionality of our services are owned by <strong className="text-white">Velvron Labs</strong> and are protected by international copyright, 
                trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </div>
            <p className="text-slate-400 text-sm pl-2 border-l-2 border-violet-500/50">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
              republish, download, store, or transmit any of the material on our website without our prior written consent.
            </p>
          </TermsSection>

          {/* 3. User Responsibilities */}
          <TermsSection 
            number="03" 
            title="User Responsibilities" 
            icon={<ShieldAlert size={20} />}
          >
            <p className="text-slate-300 mb-6">As a user of our services, you agree to adhere to the following guidelines:</p>
            <div className="grid gap-3">
              {[
                "Provide accurate and complete information when using our services",
                "Maintain the security of your account credentials",
                "Not engage in any activity that interferes with or disrupts our services",
                "Comply with all applicable laws and regulations",
                "Not use our services for any illegal or unauthorized purpose"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/30 border border-slate-800 hover:border-violet-500/30 transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400">
                    <Check size={14} />
                  </div>
                  <span className="text-slate-300 text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </TermsSection>

          {/* 4. Limitation of Liability */}
          <TermsSection 
            number="04" 
            title="Limitation of Liability" 
            icon={<AlertCircle size={20} />}
          >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/10 p-6 md:p-8">
              <p className="text-slate-300 leading-relaxed relative z-10">
                In no event will Velvron Labs, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be 
                liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, our services, 
                any websites linked to it, any content on the services, or such other websites, including any direct, indirect, special, incidental, 
                consequential, or punitive damages.
              </p>
            </div>
          </TermsSection>

          {/* 5. Changes & 6. Governing Law (Grid Layout) */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Changes */}
            <motion.section 
              variants={itemVariants}
              className="bg-slate-900/20 border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-violet-500 text-lg opacity-60">05</span>
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <RefreshCcw size={18} className="text-blue-500" /> Changes to Terms
                </h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them. 
                Your continued use of our services following the posting of revised Terms means that you accept and agree to the changes.
              </p>
            </motion.section>

            {/* Governing Law */}
            <motion.section 
              variants={itemVariants}
              className="bg-slate-900/20 border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-violet-500 text-lg opacity-60">06</span>
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Gavel size={18} className="text-blue-500" /> Governing Law
                </h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of <span className="text-white font-semibold">Ghana</span>, without giving effect to any choice or conflict of law provision or rule.
              </p>
              <div className="px-3 py-2 bg-slate-800/50 rounded text-xs text-slate-500 border border-slate-700 inline-block">
                Jurisdiction: Courts of Ghana
              </div>
            </motion.section>
          </div>

          {/* 7. Contact Information */}
          <motion.section variants={itemVariants} className="pt-4">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Questions about the Terms?</h2>
                  <p className="text-slate-400 mb-6">
                    If you have any legal questions regarding these terms, please reach out to our team.
                  </p>
                  <div className="flex gap-4">
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <Mail className="text-violet-400" size={24} />
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <Phone className="text-violet-400" size={24} />
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <MapPin className="text-violet-400" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800 space-y-4">
                  <ContactRow 
                    label="Email Support" 
                    value={siteConfig.contact.email} 
                    href={`mailto:${siteConfig.contact.email}`} 
                  />
                  <div className="h-px bg-slate-800" />
                  <ContactRow 
                    label="Phone Support" 
                    value={siteConfig.contact.phone} 
                    href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} 
                  />
                  <div className="h-px bg-slate-800" />
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-slate-500 text-sm font-medium">Headquarters</span>
                    <span className="text-slate-200 text-sm text-right max-w-[200px]">
                      {siteConfig.contact.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </motion.div>
    </main>
  );
}

/* --- Helper Components --- */

const TermsSection = ({ number, title, icon, children }) => (
  <motion.section 
    className="bg-slate-900/20 border border-slate-800/50 rounded-2xl p-6 md:p-8 hover:border-slate-700/50 transition-colors duration-300"
    variants={{
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    }}
  >
    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
      <span className="font-mono text-violet-500 text-lg opacity-60">{number}</span>
      <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
        <span className="text-blue-500">{icon}</span> {title}
      </h2>
    </div>
    <div className="pl-0 md:pl-2">
      {children}
    </div>
  </motion.section>
);

const ContactRow = ({ label, value, href }) => (
  <div className="flex justify-between items-center gap-4">
    <span className="text-slate-500 text-sm font-medium">{label}</span>
    <a href={href} className="text-violet-400 hover:text-violet-300 hover:underline text-sm transition-colors">
      {value}
    </a>
  </div>
);