// src/pages/DreamCreations.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Layout, Image as ImageIcon, MonitorSmartphone } from 'lucide-react';

const services = [
  { id: 1, title: "Brand Identity", icon: <PenTool size={24} />, desc: "Crafting cohesive visual identities, logos, and brand guidelines that resonate with target audiences." },
  { id: 2, title: "UI/UX Design", icon: <Layout size={24} />, desc: "Designing intuitive, user-centric interfaces with a focus on conversion and seamless experiences." },
  { id: 3, title: "Digital Manipulation", icon: <ImageIcon size={24} />, desc: "Advanced photo restoration, color grading, and composite imagery for premium marketing." },
  { id: 4, title: "Marketing Materials", icon: <MonitorSmartphone size={24} />, desc: "High-conversion social media assets, print layouts, and digital campaign aesthetics." },
];

const portfolioPlaceholders = [1, 2, 3, 4, 5, 6];

// 60 Randomized stars with independent twinkling variables
const starsData = Array.from({ length: 60 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 4,
  duration: 1.5 + Math.random() * 2,
  size: Math.random() * 2.5 + 1
}));

// Floating atmospheric night clouds (Visible opacity and predefined movement)
const cloudsData = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  top: `${10 + i * 15}%`,
  delay: -(Math.random() * 30),
  duration: 40 + Math.random() * 20,
  scale: 0.8 + Math.random() * 1.5
}));

export default function DreamCreations() {
  const containerRef = useRef(null);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col min-h-screen text-white overflow-x-hidden relative transition-colors duration-[10000ms] animate-nightSkyCycle"
    >
      
      {/* 6 PM to 4 AM Pure Dark Sky Cycle */}
      <style>{`
        @keyframes nightSkyCycle {
          0%   { background-color: #1e1b4b; } /* 6 PM - Deep Twilight */
          33%  { background-color: #0f172a; } /* 9 PM - Night */
          66%  { background-color: #020617; } /* 2 AM - Pitch Black */
          100% { background-color: #050508; } /* 4 AM - Deep Abyss */
        }
        .animate-nightSkyCycle {
          animation: nightSkyCycle 25s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Twinkling Stars Matrix Field */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        {starsData.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.6)]"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={{ opacity: [0.1, 1, 0.1] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Visible Drifting Night Clouds / Fog */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {cloudsData.map((cloud) => (
          <motion.div
            key={cloud.id}
            className="absolute bg-white/10 blur-[40px] rounded-[100%]"
            style={{
              top: cloud.top,
              width: `${450 * cloud.scale}px`,
              height: `${120 * cloud.scale}px`,
            }}
            animate={{ x: ["110vw", "-50vw"] }}
            transition={{ duration: cloud.duration, repeat: Infinity, delay: cloud.delay, ease: "linear" }}
          />
        ))}
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-20 px-6 min-h-[70vh] flex flex-col items-center justify-center text-center z-10">
        
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          className="absolute top-[40vh] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1095d2]/60 to-transparent -z-10"
        />

        {/* Realistic SVG Procedural Crescent Blue Moon - Flipped to Opposite Side */}
        <motion.div
          initial={{ y: 150, scale: 0.5, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
          className="mb-8"
        >
          <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-[0_0_50px_rgba(16,149,210,0.6)]">
            <defs>
              {/* Procedural SVG Filter for moon texture */}
              <filter id="moon-texture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0" in="noise" result="coloredNoise" />
                <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
                <feBlend mode="multiply" in="texture" in2="SourceGraphic" />
              </filter>
              
              {/* Mask carved on the LEFT side to flip the crescent to face right */}
              <mask id="crescent-mask">
                <circle cx="100" cy="100" r="95" fill="white" />
                {/* Moved black masking circle to the left (cx=70) to reveal opposite face */}
                <circle cx="70" cy="95" r="85" fill="black" />
              </mask>

              {/* Glowing Blue Radial Gradient */}
              <radialGradient id="moon-glow" cx="60%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#cffafe" />
                <stop offset="40%" stopColor="#1095d2" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
            </defs>
            
            {/* Render clipped texture mesh */}
            <g mask="url(#crescent-mask)">
              <circle cx="100" cy="100" r="95" fill="url(#moon-glow)" filter="url(#moon-texture)" />
            </g>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto backdrop-blur-[2px] p-6 rounded-2xl bg-black/10 border border-white/5"
        >
          <h1 className="text-xs font-bold tracking-[0.4em] text-[#1095d2] uppercase mb-4">
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
          <div className="w-16 h-1 bg-[#1095d2] rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-md hover:border-[#1095d2]/30 transition-all duration-300 group"
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
            <div className="w-16 h-1 bg-[#1095d2] rounded-full" />
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
                <span className="text-[#1095d2] text-xs font-bold uppercase tracking-wider mb-1">Production Project</span>
                <h4 className="text-white font-bold text-lg">Creative Asset Archive {item}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}