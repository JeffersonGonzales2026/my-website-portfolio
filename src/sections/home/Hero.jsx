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

  // Framer Motion Variants for staggered entrances
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  // --- 3D Mouse Tracking Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

  // Map mouse position to rotation degrees (tilt effect)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate mouse position relative to the center of the container (-0.5 to 0.5)
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
          className="w-[600px] h-[600px] bg-zinc-800 rounded-full blur-[180px] absolute -bottom-40 -right-20" 
        />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* ================= LEFT COLUMN ================= */}
        <motion.div 
          className="lg:col-span-7 space-y-8 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#1095d2] animate-pulse" />
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-300 font-mono">
                Welcome!
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
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/dream-creations')}
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-[#1095d2]/50 text-[#1095d2] font-medium transition-colors shadow-lg cursor-pointer"
            >
              <Palette size={18} /> Dream Creations <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/data-analyst')}
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-[#5bc96d]/50 text-[#5bc96d] font-medium transition-colors shadow-lg cursor-pointer"
            >
              <BarChart2 size={18} /> Data Analyst <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/ai-developer')}
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-[#a855f7]/50 text-[#a855f7] font-medium transition-colors shadow-lg cursor-pointer"
            >
              <Code size={18} /> AI Developer <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN (Interactive 3D Portrait) ================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center relative perspective-[1000px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main 3D Interactive Container */}
          <motion.div 
            style={{ rotateX, rotateY }}
            className="w-full max-w-[450px] aspect-[4/5] relative flex items-end justify-center transform-style-3d cursor-default"
          >
            {/* The Portrait Image (Faded at the bottom to blend seamlessly) */}
            {homeData?.profile_image_url ? (
              <img 
                src={homeData.profile_image_url} 
                alt="Portrait" 
                className="w-full h-full object-cover object-top pointer-events-none drop-shadow-2xl"
                // This mask makes the bottom of the image dissolve into the background perfectly
                style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }}
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center" style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }}>
                 <span className="text-5xl font-bold text-white tracking-widest font-mono">JG</span>
              </div>
            )}

            {/* Floating Element 1: Top Left (Moves in opposite direction to mouse for depth) */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [20, -20]), y: useTransform(smoothY, [-0.5, 0.5], [20, -20]) }}
              className="absolute top-10 -left-6 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl flex items-center gap-3 shadow-2xl"
            >
              <Sparkles size={16} className="text-yellow-500" />
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-mono">Status</p>
                <p className="text-xs font-bold text-white">System Active</p>
              </div>
            </motion.div>

            {/* Floating Element 2: Bottom Right (Code snippet accent) */}
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [-30, 30]), y: useTransform(smoothY, [-0.5, 0.5], [-30, 30]), translateZ: 50 }}
              className="absolute bottom-20 -right-4 px-4 py-3 bg-[#050508]/80 border border-white/5 backdrop-blur-xl rounded-xl shadow-2xl hidden sm:block"
            >
               <div className="font-mono text-[10px] text-zinc-400 leading-tight">
                  <span className="text-purple-400">const</span> <span className="text-blue-400">dev</span> = &#123;<br />
                  &nbsp;&nbsp;focus: <span className="text-green-400">'AI & Code'</span><br />
                  &#125;;
               </div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}