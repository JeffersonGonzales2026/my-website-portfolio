// src/sections/home/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, BarChart2, Code, ArrowRight, Sparkles, Database, Cpu } from 'lucide-react';
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

  // --- Staggered Entrance Animations ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  // --- 3D Mouse & Touch Tracking Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

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
    <section className="relative min-h-[85vh] flex items-center justify-center py-12 px-6 overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[700px] h-[500px] bg-slate-500 rounded-full blur-[160px] absolute -top-40 -left-20" />
        <div className="w-[600px] h-[600px] bg-zinc-600 rounded-full blur-[180px] absolute -bottom-40 -right-20" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* ================= LEFT COLUMN ================= */}
        <motion.div 
          className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            {/* Binawasan ang text size at pinanipis/pinabagal ang silver shine (15s duration) */}
            <motion.h1 
              animate={{ backgroundPosition: ['200% center', '-200% center'] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="text-4xl sm:text-5xl md:text-[52px] font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-[length:300%_auto]"
              style={{ backgroundImage: 'linear-gradient(110deg, #94a3b8 46%, #ffffff 49%, #ffffff 51%, #94a3b8 54%)' }}
            >
              Designing Creativity.<br />
              Analyzing Data.<br />
              Building with AI.
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-[17px] md:text-[19px] font-medium text-slate-400 leading-relaxed md:leading-normal">
              I'm <span className="text-white font-bold">Jefferson Gonzales</span>, your specialized{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTitleIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-white font-mono font-bold inline-block"
                >
                  {titles[currentTitleIndex]}
                </motion.span>
              </AnimatePresence>
            </p>
          </motion.div>

          <motion.p variants={itemVariants} className="text-base text-slate-400 max-w-xl leading-relaxed">
            A multidisciplinary technology professional passionate about combining creativity, 
            business, analytics, automation, and software engineering to solve real-world problems.
          </motion.p>

          {/* Buttons with Smooth Zoom (1-by-1) Animation */}
          <motion.div variants={itemVariants} className="pt-4 flex flex-col sm:flex-row flex-wrap gap-4">
            
            {/* BUTTON 1: Dream Creations */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}>
              <button 
                onClick={() => navigate('/dream-creations')}
                className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#1095d2]/40 text-[#1095d2] font-medium transition-all shadow-lg cursor-pointer w-full sm:w-auto"
              >
                <Palette size={18} className="text-[#1095d2] group-hover:text-white transition-colors" />
                Dream Creations
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* BUTTON 2: Data Analyst */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}>
              <button 
                onClick={() => navigate('/data-analyst')}
                className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#5bc96d]/40 text-[#5bc96d] font-medium transition-all shadow-lg cursor-pointer w-full sm:w-auto"
              >
                <Database size={18} className="text-[#5bc96d] group-hover:text-white transition-colors" />
                Data Analyst
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* BUTTON 3: AI Developer */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}>
              <button 
                onClick={() => navigate('/ai-developer')}
                className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#a855f7]/40 text-[#a855f7] font-medium transition-all shadow-lg cursor-pointer w-full sm:w-auto"
              >
                <Code size={18} className="text-[#a855f7] group-hover:text-white transition-colors" />
                AI Developer
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN (3D Portrait & Mapped Icons) ================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center items-center relative perspective-[1000px] order-1 lg:order-2 mb-8 lg:mb-0 -mt-6 lg:-mt-12 touch-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleInteractionLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleInteractionLeave}
        >
          {/* Main 3D Container */}
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="w-[75%] sm:w-[60%] lg:w-full max-w-[420px] aspect-[4/5] relative flex items-end justify-center cursor-default"
          >
            
            {/* The Portrait Image (Anchored at Z=0) */}
            {homeData?.profile_image_url ? (
              <img 
                src={homeData.profile_image_url} 
                alt="Jefferson Gonzales" 
                className="w-full h-full object-cover object-top pointer-events-none drop-shadow-2xl relative z-10"
                style={{ 
                  transform: 'translateZ(0px)', 
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)', 
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)' 
                }}
              />
            ) : (
              <div 
                className="w-full h-full bg-zinc-900 flex items-center justify-center relative z-10" 
                style={{ 
                  transform: 'translateZ(0px)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)'
                }}
              >
                 <span className="text-4xl md:text-5xl font-bold text-white tracking-widest font-mono">JG</span>
              </div>
            )}

            {/* --- ICONS POPPING UP FROM BEHIND (Mapped exactly to image_65a1e6.jpg) --- */}
            
            {/* Arrow 1: Palette (Left Shoulder area) */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [20, -20]), y: useTransform(smoothY, [-0.5, 0.5], [15, -15]), translateZ: -80 }}
              className="absolute top-[45%] left-[-5%] md:left-[-12%]"
            >
              <motion.div initial={{ y: 80, opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.4, duration: 1.2, delay: 0.5 }}>
                <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <Palette size={20} className="text-slate-300 drop-shadow-[0_4px_8px_rgba(255,255,255,0.2)]" style={{ transform: 'perspective(200px) rotateX(15deg) rotateY(-15deg)' }} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Arrow 2: Code (Bottom Left area) */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [25, -25]), y: useTransform(smoothY, [-0.5, 0.5], [-15, 15]), translateZ: -70 }}
              className="absolute top-[65%] left-[5%] md:left-[-2%]"
            >
              <motion.div initial={{ y: 100, opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.4, duration: 1.2, delay: 0.65 }}>
                <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                  <Code size={22} className="text-slate-300 drop-shadow-[0_4px_8px_rgba(255,255,255,0.2)]" style={{ transform: 'perspective(200px) rotateX(10deg) rotateY(-20deg)' }} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Arrow 3: Sparkles (Top Left near hat area) */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [15, -15]), y: useTransform(smoothY, [-0.5, 0.5], [25, -25]), translateZ: -75 }}
              className="absolute top-[18%] left-[18%] md:left-[15%]"
            >
              <motion.div initial={{ y: 60, opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.4, duration: 1.2, delay: 0.4 }}>
                <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <Sparkles size={16} className="text-slate-300 drop-shadow-[0_4px_8px_rgba(255,255,255,0.2)]" style={{ transform: 'perspective(200px) rotateZ(15deg)' }} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Arrow 4: Database (Right Shoulder area) */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [-20, 20]), y: useTransform(smoothY, [-0.5, 0.5], [10, -10]), translateZ: -90 }}
              className="absolute top-[42%] right-[-2%] md:right-[-8%]"
            >
              <motion.div initial={{ y: 90, opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.4, duration: 1.2, delay: 0.55 }}>
                <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                  <Database size={18} className="text-slate-300 drop-shadow-[0_4px_8px_rgba(255,255,255,0.2)]" style={{ transform: 'perspective(200px) rotateX(-15deg) rotateY(15deg)' }} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Arrow 5: CPU (Bottom Right area) */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [-25, 25]), y: useTransform(smoothY, [-0.5, 0.5], [-20, 20]), translateZ: -85 }}
              className="absolute top-[65%] right-[-10%] md:right-[-18%]"
            >
              <motion.div initial={{ y: 110, opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.4, duration: 1.2, delay: 0.7 }}>
                <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  <Cpu size={20} className="text-slate-300 drop-shadow-[0_4px_8px_rgba(255,255,255,0.2)]" style={{ transform: 'perspective(200px) rotateX(-20deg) rotateY(10deg)' }} />
                </motion.div>
              </motion.div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}