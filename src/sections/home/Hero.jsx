// src/sections/home/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, BarChart2, Code, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Framer Motion Variants for staggered entrances
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-12 px-6 overflow-hidden">
      
      {/* Subtle Animated Background Glows */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[700px] h-[500px] bg-slate-500 rounded-full blur-[160px] absolute -top-40 -left-20" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-[600px] h-[600px] bg-zinc-600 rounded-full blur-[180px] absolute -bottom-40 -right-20" 
        />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column Structure (Staggered Animation) */}
        <motion.div 
          className="lg:col-span-7 space-y-8 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-300 font-mono">
                System Online
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Designing Creativity.<br />
              Analyzing Data.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">
                Building with AI.
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="h-10 flex items-center">
            <p className="text-[17px] md:text-[19px] font-medium text-slate-400 flex flex-wrap items-center gap-2">
              I'm <span className="text-white font-bold">Jefferson Gonzales</span>, your specialized 
              <span className="relative h-8 overflow-hidden inline-flex items-center min-w-[200px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTitleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-white font-mono font-bold absolute left-0 whitespace-nowrap"
                  >
                    {titles[currentTitleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
          </motion.div>

          <motion.p variants={itemVariants} className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
            A multidisciplinary technology professional passionate about combining creativity, 
            business, analytics, automation, and software engineering to solve real-world problems.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row flex-wrap gap-4">
            {/* Dream Creations Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/dream-creations')}
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-[#1095d2]/50 text-[#1095d2] font-medium transition-colors shadow-lg cursor-pointer"
            >
              <Palette size={18} />
              Dream Creations
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Data Analyst Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/data-analyst')}
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-[#5bc96d]/50 text-[#5bc96d] font-medium transition-colors shadow-lg cursor-pointer"
            >
              <BarChart2 size={18} />
              Data Analyst
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* AI Developer Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/ai-developer')}
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-[#a855f7]/50 text-[#a855f7] font-medium transition-colors shadow-lg cursor-pointer"
            >
              <Code size={18} />
              AI Developer
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column Structure (Floating Card Animation) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center relative"
        >
          <motion.div 
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-[400px] aspect-square rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-md flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group hover:border-zinc-700 transition-colors shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="absolute top-6 left-6 font-mono text-[10px] text-zinc-500 select-none text-left leading-relaxed hidden sm:block">
              const profile = &#123;<br />
              &nbsp;&nbsp;exp: '10+ Years',<br />
              &nbsp;&nbsp;status: 'Developing'<br />
              &#125;;
            </div>

            {/* Dynamically Wired Avatar Input Only */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {homeData?.profile_image_url ? (
                <img 
                  src={homeData.profile_image_url} 
                  alt="Jefferson Gonzales" 
                  className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-zinc-800 shadow-2xl z-10 relative mb-6" 
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 z-10 relative shadow-2xl">
                  <span className="text-3xl font-bold text-white tracking-widest font-mono">JG</span>
                </div>
              )}
            </motion.div>
            
            <h4 className="text-white font-bold tracking-tight text-xl relative z-10">
              Jefferson Gonzales
            </h4>
            <p className="text-xs text-slate-500 mt-2 max-w-[240px] relative z-10 leading-normal font-mono">
              // Portfolio Core System Active
            </p>
            
            <div className="mt-6 text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-black/50 px-4 py-1.5 rounded-full border border-white/5 relative z-10 backdrop-blur-sm">
              System Live &middot; 2026
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}