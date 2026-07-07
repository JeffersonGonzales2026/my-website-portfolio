// src/pages/DreamCreations.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

// Floating cloud tracking parameters
const cloudsData = Array.from({ length: 4 }).map((_, i) => ({
  id: i,
  top: `${8 + i * 22}%`,
  delay: i * 6,
  duration: 40 + Math.random() * 15,
  scale: 0.7 + Math.random() * 0.6
}));

export default function DreamCreations() {
  const containerRef = useRef(null);
  
  // Hook directly into browser scroll progression metrics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Maps the scroll progression to drive the spaceship slant flight path dynamically
  const spaceshipX = useTransform(scrollYProgress, [0, 1], ["-15vw", "105vw"]);
  const spaceshipY = useTransform(scrollYProgress, [0, 1], ["65vh", "-10vh"]);
  const spaceshipRotate = useTransform(scrollYProgress, [0, 1], [-20, -10]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col min-h-screen text-white overflow-x-hidden relative transition-colors duration-[10000ms] animate-darkSpaceCycle"
    >
      
      {/* Premium Dark Space Sky Cycle Keyframes - Completely removed bright tones */}
      <style>{`
        @keyframes darkSpaceCycle {
          0%   { background-color: #050508; } /* Ultra deep space black */
          33%  { background-color: #0b1026; } /* Official agency deep blue */
          66%  { background-color: #0f111a; } /* Midnight zinc tint */
          100% { background-color: #0b1026; } 
        }
        .animate-darkSpaceCycle {
          animation: darkSpaceCycle 25s ease-in-out infinite alternate;
        }
      `}</style>

      {/* BACKGROUND LAYER 1: Twinkling Stars Matrix Field */}
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

      {/* BACKGROUND LAYER 2: Gentle Drifting Clouds */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {cloudsData.map((cloud) => (
          <motion.div
            key={cloud.id}
            className="absolute bg-gradient-to-r from-transparent via-white/[0.03] to-transparent rounded-full blur-xl"
            style={{
              top: cloud.top,
              width: `${380 * cloud.scale}px`,
              height: `${110 * cloud.scale}px`,
            }}
            animate={{ x: ["105vw", "-40vw"] }}
            transition={{ duration: cloud.duration, repeat: Infinity, delay: cloud.delay, ease: "linear" }}
          />
        ))}
      </div>

      {/* INTERACTIVE LAYER 3: Scroll-Bound Animated Single-Color Astronaut Spaceship */}
      <motion.div 
        style={{ x: spaceshipX, y: spaceshipY, rotate: spaceshipRotate }}
        className="fixed w-28 h-28 z-20 pointer-events-none drop-shadow-[0_10px_20px_rgba(16,149,210,0.25)]"
      >
        {/* Customized sharp single-color SVG mirroring your astronaut reference image */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#1095d2]" fill="currentColor">
          {/* Main Rocket Pod Frame structure */}
          <path d="M25,50 C40,25 65,25 88,50 C65,75 40,75 25,50 Z" />
          {/* Upper slanted stabilizer stabilizer wing */}
          <path d="M35,34 C25,18 15,22 26,38 Z" opacity="0.85" />
          {/* Lower slanted stabilizer stabilizer wing */}
          <path d="M35,66 C25,82 15,78 26,62 Z" opacity="0.85" />
          {/* Front nose guidance shell panel */}
          <path d="M76,42 C82,50 82,50 76,58 C72,53 72,47 76,42 Z" fill="#050508" opacity="0.3" />
          {/* Circular Cockpit Helmet Shield bubble */}
          <circle cx="56" cy="50" r="13" fill="#050508" opacity="0.45" />
          {/* Astronaut helmet suit highlight visors */}
          <circle cx="56" cy="48" r="8" fill="white" opacity="0.9" />
          <rect x="51" y="54" width="10" height="7" rx="2" fill="white" opacity="0.9" />
          {/* Rear velocity engine burner emission tail particles */}
          <path d="M22,50 C12,44 6,46 2,50 C6,54 12,56 22,50 Z" className="text-purple-500/40" />
        </svg>
      </motion.div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-20 px-6 min-h-[70vh] flex flex-col items-center justify-center text-center z-10">
        
        {/* Dynamic Horizon Space-Shift Line */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          className="absolute top-[40vh] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1095d2]/60 to-transparent -z-10"
        />

        {/* Semi-Realistic Crescent Waxing Blue Moon with Embedded Crater Masks */}
        <motion.div
          initial={{ y: 100, scale: 0.6, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.5 }}
          className="mb-8 relative"
        >
          <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-[0_0_35px_rgba(16,149,210,0.45)]">
            <defs>
              {/* Mask layer facing left to output a clean right-illuminated crescent moon */}
              <mask id="reverse-waxing-crescent">
                <circle cx="50" cy="50" r="46" fill="white" />
                <circle cx="34" cy="50" r="44" fill="black" />
              </mask>
              <linearGradient id="moon-surface-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1095d2" />
                <stop offset="100%" stopColor="#050814" />
              </linearGradient>
            </defs>
            
            {/* Moon Body group clipped directly by the structural layout masking bounds */}
            <g mask="url(#reverse-waxing-crescent)">
              <circle cx="50" cy="50" r="46" fill="url(#moon-surface-blue)" />
              {/* Detailed semi-realistic crater coordinates */}
              <circle cx="70" cy="36" r="7" fill="#050508" opacity="0.25" />
              <circle cx="74" cy="42" r="4" fill="#050508" opacity="0.2" />
              <circle cx="66" cy="64" r="10" fill="#050508" opacity="0.25" />
              <circle cx="58" cy="54" r="5" fill="#050508" opacity="0.2" />
              <circle cx="78" cy="58" r="4" fill="#050508" opacity="0.15" />
            </g>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-3xl mx-auto backdrop-blur-[1px] p-6 rounded-2xl bg-black/5"
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
              className="p-6 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md hover:border-[#1095d2]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 text-white flex items-center justify-center mb-5 group-hover:scale-110 group-hover:text-[#1095d2] transition-all">
                {service.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{service.title}</h4>
              <p className="text-xs text-white/70 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PORTFOLIO GALLERY PREVIEW ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative border-t border-white/5">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Selected Works</h3>
            <div className="w-16 h-1 bg-[#1095d2] rounded-full" />
          </div>
          <button className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold hover:bg-black/40 hover:text-[#1095d2] hover:border-[#1095d2]/30 transition-all">
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
              className={`rounded-2xl border border-white/5 bg-black/30 overflow-hidden group relative ${
                index === 0 || index === 3 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
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