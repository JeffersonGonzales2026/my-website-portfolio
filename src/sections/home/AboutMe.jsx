// src/sections/home/AboutMe.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutMe() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 relative overflow-hidden">
      
      {/* 1. Abstract Neural / Network Background */}
      <div className="absolute top-0 left-0 w-full lg:w-[65%] h-full -z-10 opacity-30 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" 
          alt="Neural Tech Network" 
          className="w-full h-full object-cover grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050508]/80 to-[#050508]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#050508] via-transparent to-transparent opacity-60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-5 space-y-6 py-10 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono tracking-widest uppercase backdrop-blur-md">
              <Sparkles size={14} className="text-slate-400" />
              My Narrative
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">My Story</h2>
            <p className="text-base leading-relaxed font-mono text-slate-400">
              // Bridging creativity, data, and code to engineer business solutions.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-slate-400 text-base md:text-lg leading-relaxed lg:pl-10">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            Technology has always fascinated me—not simply because of what it can do, but because of the <span className="text-white font-semibold">problems it can solve.</span> My professional journey started in graphic design, where I discovered the power of visual communication to influence businesses and connect with audiences. Over the years, I worked with startups, corporations, entrepreneurs, and international clients.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            As I gained experience, I became increasingly interested in understanding how businesses operate behind the scenes. This curiosity led me into entrepreneurship, project management, and eventually data analytics. Today, I continue expanding my knowledge into software engineering, using artificial intelligence responsibly as a productivity and learning partner while building real applications that address genuine business challenges.
          </motion.p>
        </div>
      </div>
    </section>
  );
}