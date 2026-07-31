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

  // Button pop-in animations
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: 'spring', bounce: 0.4 } },
  };

  // --- 3D Mouse & Touch Tracking Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

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
            {/* Single Wave Silver Gradient with Slanted Shine (110deg) - NO italic */}
            <motion.h1 
              animate={{ backgroundPosition: ['200% center', '-200% center'] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-[length:300%_auto]"
              style={{ backgroundImage: 'linear-gradient(110deg, #64748b 10%, #ffffff 40%, #cbd5e1 50%, #ffffff 60%, #64748b 90%)' }}
            >
              Designing Creativity.<br />
              Analyzing Data.<br />
              Building with AI.
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            {/* Wrapped naturally, removed absolute/whitespace-nowrap so long text doesn't cut off */}
            <p className="text-[17px] md:text-[19px] font-medium text-slate-400 leading-relaxed md:leading-normal">
              I'm <span className="text-white font-bold">Jefferson Gonzales</span>, your specialized{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTitleIndex}
                  // Fade effect only (walang paakyat)
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

          <motion.div variants={itemVariants} className="pt-4 flex flex-col sm:flex-row flex-wrap gap-4">
            {/* BUTTON 1 */}
            <motion.button 
              variants={buttonVariants}
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }} 
              onClick={() => navigate('/dream-creations')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#1095d2]/40 text-[#1095d2] font-medium transition-colors shadow-lg cursor-pointer"
            >
              <Palette size={18} />
              Dream Creations
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* BUTTON 2 */}
            <motion.button 
              variants={buttonVariants}
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }} 
              onClick={() => navigate('/data-analyst')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#5bc96d]/40 text-[#5bc96d] font-medium transition-colors shadow-lg cursor-pointer"
            >
              <Database size={18} />
              Data Analyst
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* BUTTON 3 */}
            <motion.button 
              variants={buttonVariants}
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }} 
              onClick={() => navigate('/ai-developer')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#a855f7]/40 text-[#a855f7] font-medium transition-colors shadow-lg cursor-pointer"
            >
              <Code size={18} />
              AI Developer
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN (3D Portrait & Floating Minimal Icons) ================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center items-center relative perspective-[1000px] order-1 lg:order-2 mb-8 lg:mb-0 touch-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleInteractionLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleInteractionLeave}
        >
          {/* Main 3D Container (preserve-3d is required for Z-depth of icons) */}
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

            {/* --- MINIMAL ICONS (Popping up from behind & constantly floating) --- */}

            {/* Icon 1: Palette (Design) - Back Left */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [30, -30]), y: useTransform(smoothY, [-0.5, 0.5], [20, -20]), translateZ: -50 }}
              className="absolute top-[20%] left-[-2%] md:left-[-10%]"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6, y: [-4, 4, -4] }}
                transition={{ scale: { delay: 0.5, type: 'spring' }, opacity: { delay: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              >
                <Palette size={22} className="text-[#1095d2]" />
              </motion.div>
            </motion.div>

            {/* Icon 2: Database (Data Analytics) - Back Right */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [-30, 30]), y: useTransform(smoothY, [-0.5, 0.5], [10, -10]), translateZ: -60 }}
              className="absolute top-[35%] right-[-5%] md:right-[-12%]"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5, y: [4, -4, 4] }}
                transition={{ scale: { delay: 0.7, type: 'spring' }, opacity: { delay: 0.7 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
              >
                <Database size={20} className="text-[#5bc96d]" />
              </motion.div>
            </motion.div>

            {/* Icon 3: Code (AI Dev) - Back Bottom Left */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [40, -40]), y: useTransform(smoothY, [-0.5, 0.5], [-20, 20]), translateZ: -40 }}
              className="absolute bottom-[25%] left-[5%] md:left-[-5%]"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6, y: [-5, 5, -5] }}
                transition={{ scale: { delay: 0.6, type: 'spring' }, opacity: { delay: 0.6 }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
              >
                <Code size={24} className="text-[#a855f7]" />
              </motion.div>
            </motion.div>

            {/* Icon 4: CPU (Automation/Systems) - Back Bottom Right */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [-40, 40]), y: useTransform(smoothY, [-0.5, 0.5], [-30, 30]), translateZ: -45 }}
              className="absolute bottom-[15%] right-[0%] md:right-[-8%]"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5, y: [5, -5, 5] }}
                transition={{ scale: { delay: 0.8, type: 'spring' }, opacity: { delay: 0.8 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
              >
                <Cpu size={22} className="text-rose-400" />
              </motion.div>
            </motion.div>

            {/* Icon 5: Sparkles - (Pushed slightly in front to give layer contrast) */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [50, -50]), y: useTransform(smoothY, [-0.5, 0.5], [-15, 15]), translateZ: 30 }}
              className="absolute top-[10%] left-[15%]"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8, y: [-3, 3, -3] }}
                transition={{ scale: { delay: 0.9, type: 'spring' }, opacity: { delay: 0.9 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
              >
                <Sparkles size={16} className="text-yellow-400" />
              </motion.div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}