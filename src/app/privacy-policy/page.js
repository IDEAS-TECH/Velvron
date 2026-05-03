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
  Shield, 
  Lock, 
  Eye, 
  Server, 
  UserCheck, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2,
  Fingerprint
} from 'lucide-react';

export default function PrivacyPolicy() {
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
    <main className="relative min-h-screen bg-slate-950 text-slate-200 pt-32 pb-20 px-4 overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- Background Elements --- */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
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
            className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-lg shadow-blue-500/10"
          >
            <Shield size={32} className="text-blue-500" />
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Privacy Policy
            </span>
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 text-sm backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Last updated: {currentDate}
          </motion.div>
        </div>

        {/* --- Main Content --- */}
        <div className="space-y-12">

          {/* 1. Introduction */}
          <PolicySection 
            number="01" 
            title="Introduction" 
            icon={<FileText size={20} />}
          >
            <p className="text-slate-300 leading-relaxed text-lg">
              Welcome to Velvron Labs. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </PolicySection>

          {/* 2. Information We Collect (Grid Layout) */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-blue-500 text-lg opacity-60">02</span>
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <Fingerprint size={20} className="text-violet-500" /> Information We Collect
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard 
                title="Identity Data" 
                desc="First name, last name, username, or similar identifiers used to verify your identity."
              />
              <InfoCard 
                title="Contact Data" 
                desc="Email address, telephone numbers, and billing addresses for communication."
              />
              <InfoCard 
                title="Technical Data" 
                desc="IP address, browser type/version, time zone setting, operating system, and platform."
              />
              <InfoCard 
                title="Usage Data" 
                desc="Information about how you use our website, products, and services."
              />
            </div>
          </motion.section>

          {/* 3. How We Use Data */}
          <PolicySection 
            number="03" 
            title="How We Use Your Data" 
            icon={<Server size={20} />}
          >
            <p className="text-slate-300 mb-6">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
              <ul className="space-y-3">
                {[
                  "To provide and maintain our service",
                  "To notify you about changes to our service",
                  "To allow you to participate in interactive features",
                  "To provide customer support",
                  "To gather analysis to improve our service"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </PolicySection>

          {/* 4. Data Security */}
          <PolicySection 
            number="04" 
            title="Data Security" 
            icon={<Lock size={20} />}
          >
            <p className="text-slate-300 leading-relaxed">
              We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. 
              We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
          </PolicySection>

          {/* 5. Legal Rights */}
          <PolicySection 
            number="05" 
            title="Your Legal Rights" 
            icon={<UserCheck size={20} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                "Request access to your personal data",
                "Request correction of your data",
                "Request erasure of your data",
                "Object to processing",
                "Request restriction of processing",
                "Request transfer of your data",
                "Right to withdraw consent"
              ].map((right, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors border border-transparent hover:border-slate-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <span className="text-slate-300">{right}</span>
                </div>
              ))}
            </div>
          </PolicySection>

          {/* 6. Contact Us (Highlighted Card) */}
          <motion.section variants={itemVariants} className="pt-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
                  <p className="text-slate-400 mb-6">
                    If you have any questions about this Privacy Policy, our team is ready to help you understand your rights.
                  </p>
                  <div className="flex gap-4">
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <Mail className="text-blue-400" size={24} />
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <Phone className="text-blue-400" size={24} />
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <MapPin className="text-blue-400" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800 space-y-4">
                  <ContactRow 
                    label="Email Us" 
                    value={siteConfig.contact.email} 
                    href={`mailto:${siteConfig.contact.email}`} 
                  />
                  <div className="h-px bg-slate-800" />
                  <ContactRow 
                    label="Call Us" 
                    value={siteConfig.contact.phone} 
                    href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} 
                  />
                  <div className="h-px bg-slate-800" />
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-slate-500 text-sm font-medium">Visit Us</span>
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

/* --- Helper Components for Clean Code --- */

const PolicySection = ({ number, title, icon, children }) => (
  <motion.section 
    className="bg-slate-900/20 border border-slate-800/50 rounded-2xl p-6 md:p-8 hover:border-slate-700/50 transition-colors duration-300"
    variants={{
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    }}
  >
    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
      <span className="font-mono text-blue-500 text-lg opacity-60">{number}</span>
      <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
        <span className="text-violet-500">{icon}</span> {title}
      </h2>
    </div>
    <div className="pl-0 md:pl-2">
      {children}
    </div>
  </motion.section>
);

const InfoCard = ({ title, desc }) => (
  <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300">
    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
      <Eye size={16} className="text-blue-400" /> {title}
    </h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const ContactRow = ({ label, value, href }) => (
  <div className="flex justify-between items-center gap-4">
    <span className="text-slate-500 text-sm font-medium">{label}</span>
    <a href={href} className="text-blue-400 hover:text-blue-300 hover:underline text-sm transition-colors">
      {value}
    </a>
  </div>
);