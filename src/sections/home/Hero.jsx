// src/sections/home/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, BarChart2, Code, ArrowRight, Sparkles, Database, Cpu, Layers } from 'lucide-react';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

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

  /* =========================================
     PALITAN ANG MGA KULAY DITO (HEX CODES)
  ========================================= */
  const colors = {
    headlineBase: "#94a3b8", // Darker silver para sa base ng title
    headlineShine: "#ffffff", // Kislap ng title
    subText: "#94a3b8", // Kulay ng paragraph sa ilalim
    nameText: "#ffffff", // Kulay ng "Jefferson Gonzales"
    roleText: "#ffffff", // Kulay ng "Owner & Team Manager" etc.
    iconSilver: "#c0c0c0", // Kulay ng maliliit na 3D icons sa picture
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-12 px-6 overflow-hidden">
      
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
            {/* Pinaliit pa ang text size: text-3xl md:text-4xl lg:text-[42px] */}
            <motion.h1 
              animate={{ backgroundPosition: ['200% center', '-200% center'] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="text-[30px] md:text-4xl lg:text-[55px] font-black tracking-tight leading-[1.15] text-transparent bg-clip-text bg-[length:300%_auto]"
              style={{ 
                backgroundImage: `linear-gradient(110deg, ${colors.headlineBase} 46%, ${colors.headlineShine} 49%, ${colors.headlineShine} 51%, ${colors.headlineBase} 54%)` 
              }}
            >
              Designing Creativity.<br />
              Analyzing Data.<br />
              Building with AI.
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-[16px] md:text-[18px] font-medium leading-relaxed md:leading-normal" style={{ color: colors.subText }}>
              I'm <span className="font-bold" style={{ color: colors.nameText }}>Jefferson Gonzales</span>, your specialized{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTitleIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-mono font-bold inline-block"
                  style={{ color: colors.roleText }}
                >
                  {titles[currentTitleIndex]}
                </motion.span>
              </AnimatePresence>
            </p>
          </motion.div>

          <motion.p variants={itemVariants} className="text-[15px] max-w-xl leading-relaxed" style={{ color: colors.subText }}>
            A multidisciplinary technology professional passionate about combining creativity, 
            business, analytics, automation, and software engineering to solve real-world problems.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-4 flex flex-col sm:flex-row flex-wrap gap-4">
            
            {/* BUTTON 1 */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}>
              <button onClick={() => navigate('/dream-creations')} className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#1095d2]/40 text-[#1095d2] text-sm md:text-base font-medium transition-all shadow-lg cursor-pointer w-full sm:w-auto">
                <Palette size={18} className="text-[#1095d2] group-hover:text-white transition-colors" />
                Dream Creations <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* BUTTON 2 */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}>
              <button onClick={() => navigate('/data-analyst')} className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#5bc96d]/40 text-[#5bc96d] text-sm md:text-base font-medium transition-all shadow-lg cursor-pointer w-full sm:w-auto">
                <Database size={18} className="text-[#5bc96d] group-hover:text-white transition-colors" />
                Data Analyst <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* BUTTON 3 */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}>
              <button onClick={() => navigate('/ai-developer')} className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#a855f7]/40 text-[#a855f7] text-sm md:text-base font-medium transition-all shadow-lg cursor-pointer w-full sm:w-auto">
                <Code size={18} className="text-[#a855f7] group-hover:text-white transition-colors" />
                AI Developer <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN (3D Portrait) ================= */}
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
          <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="w-[75%] sm:w-[60%] lg:w-full max-w-[420px] aspect-[4/5] relative flex items-end justify-center cursor-default">
            
            {homeData?.profile_image_url && (
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
            )}

            {/* --- 6 ICONS EXPLODING FROM CENTER CHEST (Based on red arrows) --- */}
            {/* 
                Explanation: 
                x: 180, y: 150 refers to the initial offset (pixels from their final position). 
                Since they are placed around the image, giving them an initial positive/negative 
                X and Y pushes them to start exactly at the V-neck/chest center.
            */}

            {/* 1. Left Arrow (Far Left, Mid-height) */}
            <motion.div style={{ x: useTransform(smoothX, [-0.5, 0.5], [20, -20]), y: useTransform(smoothY, [-0.5, 0.5], [15, -15]), translateZ: -80 }} className="absolute top-[40%] left-[5%]">
              <motion.div initial={{ x: 220, y: 50, opacity: 0, scale: 0 }} animate={{ x: 0, y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 1.5, delay: 0.4 }}>
                <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <Palette size={12} style={{ color: colors.iconSilver, transform: 'perspective(200px) rotateX(15deg) rotateY(-15deg)' }} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 2. Middle Left Arrow (Higher up, near ear) */}
            <motion.div style={{ x: useTransform(smoothX, [-0.5, 0.5], [25, -25]), y: useTransform(smoothY, [-0.5, 0.5], [-15, 15]), translateZ: -70 }} className="absolute top-[40%] left-[20%]">
              <motion.div initial={{ x: 160, y: 120, opacity: 0, scale: 0 }} animate={{ x: 0, y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 1.5, delay: 0.55 }}>
                <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                  <Code size={14} style={{ color: colors.iconSilver, transform: 'perspective(200px) rotateX(10deg) rotateY(-20deg)' }} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 3. Top Left Arrow (Above hat/ear) */}
            <motion.div style={{ x: useTransform(smoothX, [-0.5, 0.5], [15, -15]), y: useTransform(smoothY, [-0.5, 0.5], [25, -25]), translateZ: -75 }} className="absolute top-[25%] left-[20%]">
              <motion.div initial={{ x: 120, y: 180, opacity: 0, scale: 0 }} animate={{ x: 0, y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 1.5, delay: 0.45 }}>
                <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                  <Sparkles size={12} style={{ color: colors.iconSilver, transform: 'perspective(200px) rotateZ(15deg)' }} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 4. Top Right Arrow (Above Tassel) */}
            <motion.div style={{ x: useTransform(smoothX, [-0.5, 0.5], [-15, 15]), y: useTransform(smoothY, [-0.5, 0.5], [20, -20]), translateZ: -80 }} className="absolute top-[28%] right-[12%]">
              <motion.div initial={{ x: -120, y: 180, opacity: 0, scale: 0 }} animate={{ x: 0, y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 1.5, delay: 0.6 }}>
                <motion.div animate={{ y: [3, -3, 3] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
                  <Layers size={14} style={{ color: colors.iconSilver, transform: 'perspective(200px) rotateX(15deg) rotateY(15deg)' }} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 5. Middle Right Arrow (Near neck/shoulder) */}
            <motion.div style={{ x: useTransform(smoothX, [-0.5, 0.5], [-20, 20]), y: useTransform(smoothY, [-0.5, 0.5], [10, -10]), translateZ: -90 }} className="absolute top-[45%] right-[2%]">
              <motion.div initial={{ x: -160, y: 120, opacity: 0, scale: 0 }} animate={{ x: 0, y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 1.5, delay: 0.5 }}>
                <motion.div animate={{ y: [2, -2, 2] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}>
                  <Database size={12} style={{ color: colors.iconSilver, transform: 'perspective(200px) rotateX(-15deg) rotateY(15deg)' }} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 6. Right Arrow (Far Right, Mid-height) */}
            <motion.div style={{ x: useTransform(smoothX, [-0.5, 0.5], [-25, 25]), y: useTransform(smoothY, [-0.5, 0.5], [-20, 20]), translateZ: -85 }} className="absolute top-[58%] right-[-12%]">
              <motion.div initial={{ x: -220, y: 50, opacity: 0, scale: 0 }} animate={{ x: 0, y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.35, duration: 1.5, delay: 0.7 }}>
                <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                  <Cpu size={14} style={{ color: colors.iconSilver, transform: 'perspective(200px) rotateX(-20deg) rotateY(10deg)' }} />
                </motion.div>
              </motion.div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}