// src/sections/home/AboutMe.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutMe() {
  const timelineData = [
    {
      year: "2014 – Present",
      title: "Visual Design & Creative Direction",
      dotColor: "bg-[#1095d2]",
      glowColor: "rgba(16,149,210,0.5)",
    },
    {
      year: "2021 – Present",
      title: "Data Analytics & Automation",
      dotColor: "bg-[#5bc96d]",
      glowColor: "rgba(91,201,109,0.5)",
    },
    {
      year: "2024 – Beyond",
      title: "Software Engineering & Applied AI",
      dotColor: "bg-[#a855f7]",
      glowColor: "rgba(168,85,247,0.5)",
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Aspect: Glitch Header & Minimalist Timeline */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Option 6: The Cyber-Narrative Glitch Header (From your image) */}
          <div className="space-y-4">
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

          {/* Option 1: Minimalist Vertical Timeline */}
          <div className="pt-8 pb-4 relative">
            
            {/* Background Track Line */}
            <div className="absolute left-[3px] top-10 bottom-4 w-px bg-white/5" />

            {/* Animated Gradient Line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "calc(100% - 2.5rem)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-[3px] top-10 w-px bg-gradient-to-b from-[#1095d2] via-[#5bc96d] to-[#a855f7] origin-top"
            />

            <div className="space-y-10">
              {timelineData.map((item, index) => (
                <div key={index} className="relative pl-8 group">
                  {/* Glowing Dot */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.4 + 0.2, type: "spring" }}
                    className={`absolute left-[1px] top-1.5 w-1.5 h-1.5 rounded-full ${item.dotColor} z-10`}
                    style={{ boxShadow: `0 0 12px ${item.glowColor}` }}
                  />
                  
                  {/* Timeline Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.4 + 0.3, duration: 0.5 }}
                  >
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-1">
                      {item.year}
                    </span>
                    <h4 className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

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