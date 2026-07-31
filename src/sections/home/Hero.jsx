// src/sections/home/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, BarChart2, Code, ArrowRight } from 'lucide-react';
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

  // Framer Motion Variants for staggered entrances
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  // --- 3D Mouse Tracking Logic for Portrait ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 overflow-hidden">
      
      {/* Subtle Animated Background Glows */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[300px] md:w-[700px] h-[300px] md:h-[500px] bg-slate-500 rounded-full blur-[100px] md:blur-[160px] absolute -top-20 -left-10 md:-top-40 md:-left-20" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-zinc-800 rounded-full blur-[120px] md:blur-[180px] absolute -bottom-20 -right-10 md:-bottom-40 md:-right-20" 
        />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center relative z-10 pt-10 md:pt-0">
        
        {/* ================= LEFT COLUMN (Typography & Text) ================= */}
        <motion.div 
          className="lg:col-span-7 space-y-8 text-left order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline with Descriptive Elements */}
          <div className="space-y-6">
            
            {/* Pillar 1 */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <span className="text-[11px] md:text-xs font-semibold tracking-widest uppercase text-slate-400 font-mono mb-1 md:mb-2">
                // UI & Visual Communication
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
                Designing Creativity.
              </h1>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <span className="text-[11px] md:text-xs font-semibold tracking-widest uppercase text-slate-400 font-mono mb-1 md:mb-2">
                // Insights & Strategy
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
                Analyzing Data.
              </h1>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <span className="text-[11px] md:text-xs font-semibold tracking-widest uppercase text-slate-400 font-mono mb-1 md:mb-2">
                // Automation & Systems
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                {/* Silver Shining Animated Gradient */}
                <motion.span 
                  animate={{ backgroundPosition: ['200% center', '-200% center'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="text-transparent bg-clip-text bg-[length:200%_auto]"
                  style={{ backgroundImage: 'linear-gradient(to right, #94a3b8, #ffffff, #cbd5e1, #94a3b8, #ffffff)' }}
                >
                  Building with AI.
                </motion.span>
              </h1>
            </motion.div>

          </div>

          <motion.div variants={itemVariants} className="h-14 sm:h-10 flex items-center">
            <p className="text-base md:text-[19px] font-medium text-slate-400 flex flex-wrap items-center gap-2 leading-tight md:leading-normal">
              I'm <span className="text-white font-bold">Jefferson Gonzales</span>, your specialized 
              <span className="relative h-8 overflow-hidden inline-flex items-center min-w-[220px]">
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

          <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-400 max-w-xl leading-relaxed">
            A multidisciplinary technology professional passionate about combining creativity, 
            business, analytics, automation, and software engineering to solve real-world problems.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/dream-creations')}
              className="group flex items-center justify-center gap-2 px-5 py-3 md:px-6 md:py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-[#1095d2]/50 text-[#1095d2] text-sm md:text-base font-medium transition-colors shadow-lg w-full sm:w-auto"
            >
              <Palette size={18} /> Dream Creations <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/data-analyst')}
              className="group flex items-center justify-center gap-2 px-5 py-3 md:px-6 md:py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-[#5bc96d]/50 text-[#5bc96d] text-sm md:text-base font-medium transition-colors shadow-lg w-full sm:w-auto"
            >
              <BarChart2 size={18} /> Data Analyst <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/ai-developer')}
              className="group flex items-center justify-center gap-2 px-5 py-3 md:px-6 md:py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-[#a855f7]/50 text-[#a855f7] text-sm md:text-base font-medium transition-colors shadow-lg w-full sm:w-auto"
            >
              <Code size={18} /> AI Developer <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN (Clean 3D Portrait) ================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center items-center relative perspective-[1000px] order-1 lg:order-2 mb-8 lg:mb-0"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main 3D Interactive Container - Removed all floating boxes */}
          <motion.div 
            style={{ rotateX, rotateY }}
            className="w-[75%] sm:w-[60%] lg:w-full max-w-[450px] aspect-[4/5] relative flex items-end justify-center transform-style-3d cursor-default"
          >
            {homeData?.profile_image_url ? (
              <img 
                src={homeData.profile_image_url} 
                alt="Portrait" 
                className="w-full h-full object-cover object-top pointer-events-none drop-shadow-2xl"
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)', 
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)' 
                }}
              />
            ) : (
              <div 
                className="w-full h-full bg-zinc-900 flex items-center justify-center" 
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
                }}
              >
                 <span className="text-4xl md:text-5xl font-bold text-white tracking-widest font-mono">JG</span>
              </div>
            )}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}