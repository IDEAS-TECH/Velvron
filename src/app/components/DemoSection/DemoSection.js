'use client';

import { useRef } from 'react';
import { useScrollAnimation, useStaggerAnimation } from '../ScrollAnimations/ScrollTriggerProvider';

const DemoSection = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const titleRef = useRef(null);

  // Apply scroll animations
  useScrollAnimation(titleRef, { animation: 'fadeIn', delay: 0.2 });
  useScrollAnimation(sectionRef, { animation: 'fadeUp', delay: 0.3 });
  useStaggerAnimation(itemsRef, { animation: 'scaleIn', stagger: 0.1 });

  const demoItems = [
    { icon: '🚀', title: 'Lightning Fast', desc: 'Optimized performance with cutting-edge tech' },
    { icon: '🎨', title: 'Beautiful Design', desc: 'Ultra-modern UI with your brand colors' },
    { icon: '⚡', title: '3D Effects', desc: 'Immersive 3D experiences with Spline' },
    { icon: '📱', title: 'Responsive', desc: 'Perfect on every device and screen size' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#080D2E] to-[#121940]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16" ref={titleRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Advanced <span className="text-[#977DFF]">Scroll Animations</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience smooth, non-interruptive scroll animations powered by GSAP ScrollTrigger
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {demoItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="bg-gradient-to-br from-[#977DFF]/10 to-[#F2E6EE]/5 backdrop-blur-sm rounded-xl p-6 border border-[#977DFF]/20 hover:border-[#977DFF]/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(151,125,255,0.2)]"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#977DFF] to-[#7A5CE6] rounded-full">
            <span className="text-white font-medium">GSAP ScrollTrigger Active</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
