// src/pages/DreamCreations.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Layout, Image as ImageIcon, MonitorSmartphone, Rocket } from 'lucide-react';

const services = [
  { id: 1, title: "Brand Identity", icon: <PenTool size={24} />, desc: "Crafting cohesive visual identities, logos, and brand guidelines that resonate with target audiences." },
  { id: 2, title: "UI/UX Design", icon: <Layout size={24} />, desc: "Designing intuitive, user-centric interfaces with a focus on conversion and seamless experiences." },
  { id: 3, title: "Digital Manipulation", icon: <ImageIcon size={24} />, desc: "Advanced photo restoration, color grading, and composite imagery for premium marketing." },
  { id: 4, title: "Marketing Materials", icon: <MonitorSmartphone size={24} />, desc: "High-conversion social media assets, print layouts, and digital campaign aesthetics." },
];

const portfolioPlaceholders = [1, 2, 3, 4, 5, 6];

// Star coordinate generators for the twinkling background effect
const stars = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 3,
  size: Math.random() * 2 + 1
}));

export default function DreamCreations() {
  return (
    // Dynamic Sky Cycle Background Transitioning smoothly from Sunset -> Night -> Dawn
    <div className="flex flex-col min-h-screen text-white overflow-x-hidden relative transition-colors duration-[10000ms] animate-skyCycle">
      
      {/* Dynamic Keyframe Injection for PRD Sky Sequence colors */}
      <style>{`
        @keyframes skyCycle {
          0%   { background-color: #FDBA74; } /* Sunset Beginning */
          15%  { background-color: #F97316; } 
          30%  { background-color: #F472B6; } /* Shift to twilight */
          45%  { background-color: #A78BFA; } 
          60%  { background-color: #7C3AED; } 
          75%  { background-color: #1E3A8A; } /* Deep Night sky */
          85%  { background-color: #0B1026; } 
          90%  { background-color: #312E81; } 
          95%  { background-color: #60A5FA; } /* Bukang-liwayway Dawn break */
          98%  { background-color: #BAE6FD; }
          100% { background-color: #FDE68A; }
        }
        .animate-skyCycle {
          animation: skyCycle 30s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Twinkling Star Matrix Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </div>

      {/* Gentle Floating Spaceships Animations */}
      <motion.div 
        className="absolute text-blue-300/30 top-1/4 left-10 z-10 pointer-events-none hidden md:block"
        animate={{ y: [0, -25, 0], x: [0, 15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Rocket size={32} className="transform -rotate-45" />
      </motion.div>

      <motion.div 
        className="absolute text-purple-300/20 top-2/3 right-12 z-10 pointer-events-none hidden md:block"
        animate={{ y: [0, 30, 0], x: [0, -20, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Rocket size={24} className="transform rotate-12" />
      </motion.div>

      {/* ================= HERO & TRANSITION SECTION ================= */}
      <section className="relative pt-40 pb-20 px-6 min-h-[70vh] flex flex-col items-center justify-center text-center z-10">
        
        {/* Smooth Pop-up Moon Animation Component Element */}
        <motion.div
          initial={{ y: 150, scale: 0.5, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
          className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-100 to-amber-300 shadow-[0_0_50px_rgba(253,230,138,0.6)] mb-8 border border-amber-200/40 relative overflow-hidden"
        >
          {/* Subtle Moon craters details graphic visual pattern */}
          <div className="absolute top-4 left-6 w-5 h-5 rounded-full bg-amber-400/20 shadow-inner" />
          <div className="absolute bottom-6 left-12 w-7 h-7 rounded-full bg-amber-400/20 shadow-inner" />
          <div className="absolute top-12 right-4 w-4 h-4 rounded-full bg-amber-400/10 shadow-inner" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto backdrop-blur-[2px] p-6 rounded-2xl bg-black/10 border border-white/5"
        >
          <h1 className="text-xs font-bold tracking-[0.4em] text-amber-200 uppercase mb-4">
            Creative Agency Experience
          </h1>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Let's make your dream a reality.
          </h2>
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            For over a decade Dream Creations has helped businesses, entrepreneurs, organizations, 
            and professionals transform ideas into compelling visual experiences.
          </p>
        </motion.div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative">
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Core Competencies</h3>
          <div className="w-16 h-1 bg-white/40 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-md hover:border-white/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{service.title}</h4>
              <p className="text-xs text-white/70 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PORTFOLIO GALLERY PREVIEW ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative border-t border-white/10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Selected Works</h3>
            <div className="w-16 h-1 bg-white/40 rounded-full" />
          </div>
          <button className="px-5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold hover:bg-white/20 transition-all">
            View Full Archive
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
          {portfolioPlaceholders.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`rounded-2xl border border-white/10 bg-black/20 overflow-hidden group relative ${
                index === 0 || index === 3 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/20 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-amber-200 text-xs font-bold uppercase tracking-wider mb-1">Production Project</span>
                <h4 className="text-white font-bold text-lg">Creative Asset Archive {item}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}