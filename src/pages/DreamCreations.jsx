// src/pages/DreamCreations.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Info, LayoutGrid, Eye, Mail, Palette } from 'lucide-react';

export default function DreamCreations() {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Interactive Spaceshift Cursor effect mouse tracking logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        // Set coordinates relative to the Hero section box bounds
        heroRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
        heroRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Quick action helper to jump clean to lower page divisions smoothly
  const scrollToSection = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white overflow-x-hidden relative bg-[#050508]">
      
      {/* ================= 22. LANDING HERO ================= */}
      <section 
        ref={heroRef}
        className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden spaceshift-cursor-glow"
      >
        {/* Slow-moving gradient atmosphere canvas layer (6PM - 4AM framework) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#0f172a] to-[#1e1b4b] animate-slowGradient -z-20" />

        {/* Animated portfolio collage background preview simulation (Floating Artwork Previews) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 -z-10">
          <motion.div 
            animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[8%] w-48 h-48 rounded-2xl border border-[#1095d2]/20 bg-gradient-to-br from-[#1095d2]/10 to-transparent backdrop-blur-sm flex items-center justify-center"
          >
            <Palette size={40} className="text-[#1095d2]/40" />
          </motion.div>
          <motion.div 
            animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[10%] w-64 h-40 rounded-2xl border border-purple-500/10 bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur-sm"
          />
          <motion.div 
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[25%] right-[15%] w-36 h-36 rounded-full border border-cyan-500/10 bg-black/40 blur-[2px]"
          />
        </div>

        {/* Core Layout Text Container */}
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-[#1095d2] bg-[#1095d2]/5 border border-[#1095d2]/10 px-4 py-1.5 rounded-full"
            >
              Creative Agency Experience
            </motion.span>
            
            {/* Hero Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white leading-tight"
            >
              Let’s make your <span className="text-[#1095d2]">dream</span> a reality.
            </motion.h1>
          </div>

          {/* Hero Description */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-4 text-base md:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed text-center font-medium"
          >
            <p>
              For over a decade Dream Creations has helped businesses, entrepreneurs, organizations, and professionals transform ideas into compelling visual experiences.
            </p>
            <p className="text-zinc-400 text-sm md:text-base">
              Inspired by my former team manager, I started building my own team of graphic designers with a vision to empower more dreamers (clients) and creators (designers). 
              From branding and digital marketing to print production and motion graphics, every project is crafted with creativity, precision, and purpose.
            </p>
          </motion.div>

          {/* Primary Buttons Group linking across destinations */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-4"
          >
            {/* 1. About Dream Creations */}
            <button 
              onClick={() => scrollToSection('about-statement')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white text-sm font-semibold transition-all shadow-md group"
            >
              <Info size={16} className="text-[#1095d2]" />
              About Dream Creations
            </button>

            {/* 2. Our Services */}
            <button 
              onClick={() => scrollToSection('services-directory')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#1095d2]/40 text-zinc-200 text-sm font-semibold transition-all shadow-md"
            >
              <LayoutGrid size={16} className="text-[#1095d2]" />
              Our Services
            </button>

            {/* 3. View Creations */}
            <button 
              onClick={() => scrollToSection('creations-showcase')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1095d2] hover:bg-[#0c7ab0] text-white text-sm font-semibold transition-all shadow-lg shadow-[#1095d2]/20"
            >
              <Eye size={16} />
              View Creations
            </button>

            {/* 4. Contact Us */}
            <button 
              onClick={() => scrollToSection('contact-frame')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-zinc-300 text-sm font-semibold transition-all"
            >
              <Mail size={16} />
              Contact Us
            </button>
          </motion.div>

        </div>
      </section>

      {/* Temporary placeholders for downstream anchor scrolling verification targets */}
      <div id="about-statement" className="h-20 border-t border-zinc-900" />
      <div id="services-directory" className="h-20" />
      <div id="creations-showcase" className="h-20" />
      <div id="contact-frame" className="h-20" />

    </div>
  );
}