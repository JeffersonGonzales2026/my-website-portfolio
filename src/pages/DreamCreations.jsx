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

// Floating atmospheric night clouds (Higher opacity and negative delays so they appear immediately)
const cloudsData = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  top: `${10 + i * 15}%`,
  delay: -(Math.random() * 30), // Starts animation midway so they are already on screen
  duration: 40 + Math.random() * 20,
  scale: 0.8 + Math.random() * 1.5
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
      className="flex flex-col min-h-screen text-white overflow-x-hidden relative transition-colors duration-[10000ms] animate-nightSkyCycle"
    >
      
      {/* 6 PM to 4 AM Sky Cycle */}
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
            // Increased opacity and blur to make them clearly visible as cloud banks
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

      {/* Scroll-Bound Animated Single-Color Astronaut Spaceship */}
      <motion.div 
        style={{ x: spaceshipX, y: spaceshipY, rotate: spaceshipRotate }}
        className="fixed w-28 h-28 z-20 pointer-events-none drop-shadow-[0_10px_20px_rgba(16,149,210,0.25)]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#1095d2]" fill="currentColor">
          <path d="M25,50 C40,25 65,25 88,50 C65,75 40,75 25,50 Z" />
          <path d="M35,34 C25,18 15,22 26,38 Z" opacity="0.85" />
          <path d="M35,66 C25,82 15,78 26,62 Z" opacity="0.85" />
          <path d="M76,42 C82,50 82,50 76,58 C72,53 72,47 76,42 Z" fill="#020617" opacity="0.4" />
          <circle cx="56" cy="50" r="13" fill="#020617" opacity="0.5" />
          <circle cx="56" cy="48" r="8" fill="white" opacity="0.9" />
          <rect x="51" y="54" width="10" height="7" rx="2" fill="white" opacity="0.9" />
          <path d="M22,50 C12,44 6,46 2,50 C6,54 12,56 22,50 Z" className="text-purple-400/50" />
        </svg>
      </motion.div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-20 px-6 min-h-[70vh] flex flex-col items-center justify-center text-center z-10">
        
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          className="absolute top-[40vh] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1095d2]/60 to-transparent -z-10"
        />

        {/* Realistic Div-Based Crescent Blue Moon */}
        <motion.div
          initial={{ y: 150, scale: 0.5, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
          className="w-32 h-32 relative mb-8 flex items-center justify-center drop-shadow-[0_0_35px_rgba(16,149,210,0.5)]"
        >
          {/* This div uses the exact same crater logic as your original orange moon. 
            The 'maskImage' CSS cuts out the left side to create the perfect crescent, 
            allowing the stars and background to shine straight through the missing half!
          */}
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-100 via-[#1095d2] to-blue-900 overflow-hidden"
            style={{
              WebkitMaskImage: "radial-gradient(circle at 25% 50%, transparent 48%, black 50%)",
              maskImage: "radial-gradient(circle at 25% 50%, transparent 48%, black 50%)"
            }}
          >
            {/* The Realistic Craters */}
            <div className="absolute top-6 right-8 w-6 h-6 rounded-full bg-blue-950/40 shadow-inner" />
            <div className="absolute bottom-8 right-12 w-8 h-8 rounded-full bg-blue-950/30 shadow-inner" />
            <div className="absolute top-14 right-4 w-4 h-4 rounded-full bg-blue-950/20 shadow-inner" />
          </div>
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