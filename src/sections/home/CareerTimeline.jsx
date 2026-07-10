// src/sections/home/CareerTimeline.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, Award } from 'lucide-react';

const iconMap = {
  Briefcase: <Briefcase size={14} />,
  GraduationCap: <GraduationCap size={14} />,
  Award: <Award size={14} />
};

const defaultTimelineData = [
  {
    year: "2014",
    title: "Multimedia Graphic Artist",
    icon: "Briefcase",
    company: "Visual Design Core",
    desc: "Began my professional journey crafting visual identities, brand systems, and marketing materials for local businesses and international freelance markets."
  },
  {
    year: "2022",
    title: "BS in Information Technology",
    icon: "GraduationCap",
    company: "Academic Track",
    desc: "Began pursuing formal education in information systems to complement my industry design backgrounds with modern infrastructure, logic, and networking basics."
  },
  {
    year: "2024",
    title: "Founder & Creative Director",
    icon: "Award",
    company: "Dream Creations Studio",
    desc: "Established an independent creative collective. Managed client portfolios, gathered architectural requirements, and handled cross-functional designer team workflows."
  },
  {
    year: "2026",
    title: "Data Analyst Intern",
    icon: "Briefcase",
    company: "S.P. Madrid",
    desc: "Stepped into operations and operational reporting. Managing daily data cleaning, pipeline validation, dashboard assembly, and automated Excel structures."
  },
  {
    year: "2026 (Current)",
    title: "AI Full-Stack Trajectory",
    icon: "Briefcase",
    company: "Software Development",
    desc: "Committed to deep learning loops in interactive web architectures. Designing custom systems using React, Vite, Tailwind CSS, and AI-assisted engineering paradigms."
  }
];

export default function CareerTimeline({ homeData }) {
  const timelineData = homeData?.career_timeline || defaultTimelineData;

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 relative z-10">
      
      {/* Section Headings */}
      <div className="text-center mb-20 space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Professional Evolution
        </h2>
        <div className="w-12 h-[1px] bg-zinc-700 mx-auto" />
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          A chronologically indexed matrix detailing my transition from creative visual frameworks to logic-driven development.
        </p>
      </div>

      {/* Structural Vertical Line Graph */}
      <div className="relative border-l border-zinc-800 ml-4 sm:ml-32 space-y-12">
        {timelineData.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative pl-8 group"
          >
            {/* Timeline Node Ring Indicator */}
            <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-700 group-hover:border-white transition-colors z-20" />
            
            {/* Floating Left Aspect Column (Years) */}
            <div className="sm:absolute sm:left-[-140px] sm:top-0 sm:w-32 sm:text-right text-xs font-mono font-bold text-slate-500 group-hover:text-white transition-colors mb-3 sm:mb-0 pt-1">
              {item.year}
            </div>

            {/* Content Display Panel Block */}
            <div className="p-6 rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm group-hover:border-zinc-800 group-hover:bg-zinc-900/10 transition-all duration-300 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm font-bold text-white tracking-tight">
                  {item.title}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  &middot; {item.company}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}