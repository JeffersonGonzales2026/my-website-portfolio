// src/sections/home/AboutMe.jsx
import React from 'react';
import { Sparkles, Palette, BarChart2, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutMe() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Aspect: Section Header & Visual Pillars */}
        <div className="lg:col-span-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono tracking-wider uppercase">
            <Sparkles size={12} />
            My Narrative
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            My Story
          </h2>
          <p className="text-sm leading-relaxed font-mono text-slate-500">
            // Bridging creativity, data, and code to engineer business solutions.
          </p>

          {/* Visual Career DNA / Pillars */}
          <div className="pt-8 flex flex-col gap-3 relative">
            
            {/* Subtle background glow */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-32 h-48 bg-[#1095d2]/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Pillar 1: Design */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.1 }} 
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#1095d2]/30 hover:bg-[#1095d2]/[0.05] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#1095d2]/10 flex items-center justify-center text-[#1095d2] shrink-0 group-hover:scale-110 transition-transform">
                <Palette size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5 group-hover:text-[#1095d2] transition-colors">Creative Origins</h4>
                <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">10+ Years Visual Design</p>
              </div>
            </motion.div>

            {/* Pillar 2: Data */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.2 }} 
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#5bc96d]/30 hover:bg-[#5bc96d]/[0.05] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#5bc96d]/10 flex items-center justify-center text-[#5bc96d] shrink-0 group-hover:scale-110 transition-transform">
                <BarChart2 size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5 group-hover:text-[#5bc96d] transition-colors">Analytical Shift</h4>
                <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">Data & Automation</p>
              </div>
            </motion.div>

            {/* Pillar 3: AI / Code */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.3 }} 
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#a855f7]/30 hover:bg-[#a855f7]/[0.05] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] shrink-0 group-hover:scale-110 transition-transform">
                <Code size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5 group-hover:text-[#a855f7] transition-colors">The Next Frontier</h4>
                <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">AI & Software Eng.</p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Right Aspect: Narrative Text Block */}
        <div className="lg:col-span-8 space-y-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl lg:pt-16">
          <p>
            Technology has always fascinated me—not simply because of what it can do, 
            but because of the <span className="text-white font-semibold">problems it can solve.</span> My professional journey started in graphic design, where I discovered the power of visual communication to influence businesses and connect with audiences. Over the years, I worked with startups, corporations, entrepreneurs, and international clients.
          </p>
          <p>
            As I gained experience, I became increasingly interested in understanding how businesses operate behind the scenes. This curiosity led me into entrepreneurship, project management, and eventually data analytics. Today, I continue expanding my knowledge into software engineering, using artificial intelligence responsibly as a productivity and learning partner while building real applications that address genuine business challenges.
          </p>
        </div>

      </div>
    </section>
  );
}