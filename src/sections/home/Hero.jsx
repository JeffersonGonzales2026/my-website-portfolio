// src/sections/home/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, BarChart2, Code, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function Hero({ homeData }) {
  const navigate = useNavigate();
  
  const titles = [
    "Graphic Designer",
    "Owner & Team Manager",
    "Data Analyst",
    "Automation Specialist",
    "AI Assisted Full-Stack Developer",
    "Aspiring Generative AI Engineer",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [titles.length]);

  // --- 3D Mouse & Touch Tracking Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  // Shared handler for both Mouse and Touch events
  const handleInteractionMove = (clientX, clientY, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    const xPct = (clientX - rect.left) / rect.width - 0.5;
    const yPct = (clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseMove = (e) => handleInteractionMove(e.clientX, e.clientY, e.currentTarget);
  const handleTouchMove = (e) => handleInteractionMove(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);

  const handleInteractionLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-12 px-6">
      
      {/* Subtle, Sophisticated Deep Wash Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[700px] h-[500px] bg-slate-500 rounded-full blur-[160px] absolute -top-40 -left-20" />
        <div className="w-[600px] h-[600px] bg-zinc-600 rounded-full blur-[180px] absolute -bottom-40 -right-20" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1">
          <div className="space-y-2">
            
            {/* Single Wave Silver Gradient + Slanted (Italic) Text */}
            <motion.h1 
              animate={{ backgroundPosition: ['200% center', '-200% center'] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-[length:300%_auto] italic pr-4"
              style={{ backgroundImage: 'linear-gradient(to right, #64748b 0%, #ffffff 30%, #e2e8f0 50%, #ffffff 70%, #64748b 100%)' }}
            >
              Designing Creativity.<br />
              Analyzing Data.<br />
              Building with AI.
            </motion.h1>

          </div>

          <div className="h-8 flex items-center">
            <p className="text-[17px] md:text-[19px] font-medium text-slate-400">
              I'm <span className="text-white font-bold">Jefferson Gonzales</span>, your specialized{' '}
              <span className="relative h-8 overflow-hidden inline-flex items-center min-w-[200px] align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTitleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-white transition-all duration-500 font-mono font-bold pb-0.5 absolute left-0 whitespace-nowrap not-italic"
                  >
                    {titles[currentTitleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
          </div>

          <p className="text-base text-slate-400 max-w-xl leading-relaxed">
            A multidisciplinary technology professional passionate about combining creativity, 
            business, analytics, automation, and software engineering to solve real-world problems.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row flex-wrap gap-4">
            <button 
              onClick={() => navigate('/dream-creations')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#1095d2]/40 text-[#1095d2] font-medium transition-all shadow-lg cursor-pointer"
            >
              <Palette size={18} />
              Dream Creations
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => navigate('/data-analyst')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#5bc96d]/40 text-[#5bc96d] font-medium transition-all shadow-lg cursor-pointer"
            >
              <BarChart2 size={18} />
              Data Analyst
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => navigate('/ai-developer')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#a855f7]/40 text-[#a855f7] font-medium transition-all shadow-lg cursor-pointer"
            >
              <Code size={18} />
              AI Developer
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (3D Portrait & Floating Icons) ================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center items-center relative perspective-[1000px] order-1 lg:order-2 mb-8 lg:mb-0 touch-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleInteractionLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleInteractionLeave}
        >
          {/* Main 3D Interactive Container - preserve-3d is crucial for depth */}
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="w-[75%] sm:w-[60%] lg:w-full max-w-[420px] aspect-[4/5] relative flex items-end justify-center cursor-default"
          >
            
            {/* 
              The Portrait Image 
              Tip: Use a transparent PNG here so the icons can go behind you!
            */}
            {homeData?.profile_image_url ? (
              <img 
                src={homeData.profile_image_url} 
                alt="Jefferson Gonzales" 
                className="w-full h-full object-cover object-top pointer-events-none drop-shadow-2xl relative z-10"
                style={{ 
                  transform: 'translateZ(0px)', // Anchor point
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)', 
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)' 
                }}
              />
            ) : (
              <div 
                className="w-full h-full bg-zinc-900 flex items-center justify-center relative z-10" 
                style={{ 
                  transform: 'translateZ(0px)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
                }}
              >
                 <span className="text-4xl md:text-5xl font-bold text-white tracking-widest font-mono">JG</span>
              </div>
            )}

            {/* 
              Floating Icon 1: Design Palette
              translateZ: -60 (This pushes it BEHIND your picture) 
            */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [50, -50]), y: useTransform(smoothY, [-0.5, 0.5], [30, -30]), translateZ: -60 }}
              className="absolute top-[20%] left-[-5%] md:left-[-15%] p-2 flex items-center justify-center opacity-80"
            >
              <Palette size={48} className="text-[#1095d2] drop-shadow-[0_0_15px_rgba(16,149,210,0.5)]" />
            </motion.div>

            {/* 
              Floating Icon 2: Sparkles / AI
              translateZ: 70 (This pushes it IN FRONT of your picture) 
            */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [60, -60]), y: useTransform(smoothY, [-0.5, 0.5], [-40, 40]), translateZ: 70 }}
              className="absolute top-[10%] right-[5%] p-2 flex items-center justify-center"
            >
              <Sparkles size={32} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
            </motion.div>

            {/* 
              Floating Icon 3: Code / Dev
              translateZ: -40 (This pushes it BEHIND your picture) 
            */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [-50, 50]), y: useTransform(smoothY, [-0.5, 0.5], [-30, 30]), translateZ: -40 }}
              className="absolute bottom-[35%] right-[-10%] md:right-[-20%] p-2 flex items-center justify-center opacity-80"
            >
              <Code size={56} className="text-[#a855f7] drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}