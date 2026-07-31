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
        
        {/* Left Aspect: Section Header & Minimalist Timeline */}
        <div className="lg:col-span-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono tracking-wider uppercase">
            <Sparkles size={12} />
            My Narrative
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            My Story
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed font-mono">
            // Bridging creativity, data, and code to engineer business solutions.
          </p>

          {/* Minimalist Vertical Timeline (The Journey Line) */}
          <div className="pt-10 pb-4 relative">
            
            {/* Background Track Line */}
            <div className="absolute left-[3px] top-12 bottom-4 w-px bg-white/10" />

            {/* Animated Gradient Line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "calc(100% - 4rem)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-[3px] top-12 w-px bg-gradient-to-b from-[#1095d2] via-[#5bc96d] to-[#a855f7] origin-top"
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
                    style={{ boxShadow: `0 0 10px ${item.glowColor}` }}
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