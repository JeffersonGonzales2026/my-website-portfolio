// src/sections/home/AboutMe.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutMe() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Aspect: Glitch Header & Aesthetic Image */}
        <div className="lg:col-span-4 flex flex-col">
          
          {/* Option 6: The Cyber-Narrative Glitch Header */}
          <div className="space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-[11px] font-mono tracking-widest uppercase">
              <Sparkles size={14} className="text-slate-500" />
              My Narrative
            </div>
            
            {/* Chromatic Aberration Text Effect */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter relative z-10 [text-shadow:-3px_0_0_rgba(0,200,255,0.7),3px_0_0_rgba(255,100,0,0.7)]">
              My Story
            </h2>
            
            <p className="text-sm md:text-base leading-relaxed font-mono text-[#4a7c97] max-w-[90%]">
              // Bridging creativity, data, and code to engineer business solutions.
            </p>
          </div>

          {/* Option 5: A Single, Tasteful Aesthetic Image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl"
          >
            {/* 
              TIPS: Palitan ang src link na ito ng sarili mong image URL! 
              Maganda kung black & white or dark picture ng workspace mo, camera, o ikaw mismo. 
            */}
            <img 
              src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop" 
              alt="My Workspace" 
              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
            />
            
            {/* Subtle overlay gradients para mas smooth ang transition at blend sa background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1095d2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
          </motion.div>

        </div>

        {/* Right Aspect: Narrative Text Block */}
        <div className="lg:col-span-8 space-y-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl lg:pt-8">
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