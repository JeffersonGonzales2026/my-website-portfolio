// src/sections/home/JourneySelector.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, BarChart2, Cpu, ArrowRight } from 'lucide-react';

const journeys = [
  {
    title: "Dream Creations",
    subtitle: "Creative Agency Experience",
    desc: "Branding, Graphic Design, Motion Graphics, Photography, Visual Communication, Client Work, and Entrepreneurship.",
    path: "/dream-creations",
    colorClass: "from-[#1095d2]/20 to-purple-600/10 hover:border-[#1095d2]/50",
    
    // SOLID BLUE BACKGROUND WITH WHITE TEXT
    btnColor: "bg-[#1095d2] text-white hover:bg-opacity-90",
    icon: <Moon size={22} className="text-[#1095d2] animate-pulse" />
  },
  {
    title: "Data Analyst",
    subtitle: "Corporate Analytics Experience",
    desc: "Dashboards, Reports, Automation, Business Intelligence, Case Studies, and Data-Driven Decision Making.",
    path: "/data-analyst",
    colorClass: "from-[#5bc96d]/10 to-blue-900/10 hover:border-[#5bc96d]/50",
    
    // SOLID GREEN BACKGROUND WITH DARK TEXT FOR MAXIMUM READABILITY
    btnColor: "bg-[#5bc96d] text-zinc-950 font-bold hover:bg-opacity-90",
    icon: <BarChart2 size={22} className="text-[#5bc96d]" />
  },
  {
    title: "AI-Assisted Full-Stack Developer",
    subtitle: "Technology & Software Engineering Experience",
    desc: "Modern Web Development, AI-Assisted Development, React, Automation, Software Architecture, and Continuous Learning.",
    path: "/ai-developer",
    colorClass: "from-purple-600/20 to-cyan-600/10 hover:border-cyan-500/50",
    
    // FULL VIBRANT GRADIENT SHAPE BACKGROUND WITH WHITE TEXT
    btnColor: "bg-gradient-to-r from-[#a855f7] via-[#7c3aed] to-[#2563eb] text-white shadow-lg border-0 hover:opacity-90",
    icon: <Cpu size={22} className="text-[#a855f7]" />
  }
];

export default function JourneySelector() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">
      
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Explore My Professional Journey
        </h2>
        <p className="text-sm text-text-secondary max-w-xl mx-auto">
          Select a specialized pathway below to step directly into an immersive digital ecosystem tailored to each career chapter.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {journeys.map((journey, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`group p-8 rounded-3xl border border-glass-border bg-gradient-to-br ${journey.colorClass} backdrop-blur-md flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-black/40`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner">
                {journey.icon}
              </div>

              <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">
                {journey.subtitle}
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight mt-1 mb-4">
                {journey.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed mb-8">
                {journey.desc}
              </p>
            </div>

            <button
              onClick={() => navigate(journey.path)}
              className={`group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${journey.btnColor}`}
            >
              Explore {journey.title === "AI-Assisted Full-Stack Developer" ? "AI Developer" : journey.title}
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}