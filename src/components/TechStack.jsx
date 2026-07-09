// src/components/TechStack.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, ShieldCheck, Server, Globe2, BarChart3 } from 'lucide-react';

const stackCategories = [
  {
    title: "Frontend Core & Styling",
    icon: <Code2 className="text-blue-400" size={22} />,
    items: ["React", "Vite", "Tailwind CSS", "JavaScript (ES6+)", "Clsx", "Tailwind Merge"]
  },
  {
    title: "Routing & Architecture",
    icon: <Globe2 className="text-cyan-400" size={22} />,
    items: ["React Router", "Framer Motion", "Lucide React", "React Hook Form", "Zod"]
  },
  {
    title: "Database & Storage",
    icon: <Database className="text-emerald-400" size={22} />,
    items: ["Supabase PostgreSQL", "Supabase Storage"]
  },
  {
    title: "Security & Authentication",
    icon: <ShieldCheck className="text-purple-400" size={22} />,
    items: ["Supabase Auth"]
  },
  {
    title: "Cloud Hosting Ecosystem",
    icon: <Server className="text-orange-400" size={22} />,
    items: ["Vercel (Production)", "GitHub Pages (Development)"]
  },
  {
    title: "Telemetry & Analytics",
    icon: <BarChart3 className="text-pink-400" size={22} />,
    items: ["Google Analytics", "Microsoft Clarity"]
  }
];

export default function TechStack() {
  return (
    <section className="py-24 bg-[#09090b] text-slate-200 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-16 max-w-xl">
          <span className="text-xs font-mono tracking-widest text-blue-400 uppercase block mb-3">// Ecosystem</span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Production Technical Stack
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            A comprehensive overview of the modern tools, underlying engines, and cloud services powering this digital portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackCategories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">{cat.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/5 font-mono text-slate-400 hover:text-white hover:border-white/20 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}