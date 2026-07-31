// src/sections/home/AboutMe.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutMe() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 relative overflow-hidden">
      
      {/* ================= BACKGROUND: Matte & Silver Tech Atmosphere ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-start">
        {/* Silver Ambient Glow */}
        <div className="absolute left-[-10%] top-[-10%] w-[600px] h-[600px] bg-slate-400/10 blur-[150px] rounded-full" />
        {/* Subtle Futuristic Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* ================= LEFT: Glassmorphism Matte Silver Panel ================= */}
        <div className="lg:col-span-5 relative group">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            // Matte Glassmorphism Container
            className="relative z-10 p-10 lg:p-12 rounded-3xl bg-zinc-950/40 backdrop-blur-2xl border border-slate-400/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Interactive Silver Gleam Effect (Appears on Hover) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-300/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="space-y-6 relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/40 border border-slate-500/30 text-slate-300 text-xs font-mono tracking-widest uppercase shadow-inner">
                <Sparkles size={14} className="text-slate-400" />
                My Narrative
              </div>
              
              {/* Metallic Text Gradient */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-300 to-slate-500 tracking-tight pb-2">
                My Story
              </h2>

              {/* Minimalist Separator */}
              <div className="w-12 h-1 bg-slate-600/50 rounded-full" />
              
              <p className="text-sm md:text-base leading-relaxed font-mono text-slate-400">
                // Bridging creativity, data, and code to engineer business solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ================= RIGHT: Narrative Text Block ================= */}
        <div className="lg:col-span-7 space-y-6 text-slate-400 text-base md:text-lg leading-relaxed lg:pl-6 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Technology has always fascinated me—not simply because of what it can do, 
            but because of the <span className="text-slate-200 font-semibold">problems it can solve.</span> My professional journey started in graphic design, where I discovered the power of visual communication to influence businesses and connect with audiences. Over the years, I worked with startups, corporations, entrepreneurs, and international clients.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            As I gained experience, I became increasingly interested in understanding how businesses operate behind the scenes. This curiosity led me into entrepreneurship, project management, and eventually data analytics. Today, I continue expanding my knowledge into software engineering, using artificial intelligence responsibly as a productivity and learning partner while building real applications that address genuine business challenges.
          </motion.p>
        </div>

      </div>
    </section>
  );
}