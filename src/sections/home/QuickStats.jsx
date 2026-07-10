// src/sections/home/QuickStats.jsx
import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const defaultStatsData = [
  { num: 10, suffix: "+", label: "Years of Experience" },
  { num: 15, suffix: "+", label: "Professional Roles" },
  { num: 20, suffix: "+", label: "Companies Worked With" },
  { num: 200, suffix: "+", label: "Projects Completed" },
  { num: 10, suffix: "+", label: "Industries Served" },
  { num: 25, suffix: "+", label: "Learning Technologies" },
];

// Sub-component handling the performance-optimized layout engine
function Counter({ num, suffix }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, num, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            // Instantly updates text node without triggering massive layout re-renders
            nodeRef.current.textContent = Math.round(value) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, num, suffix]);

  return (
    <span 
      ref={nodeRef} 
      className="text-3xl md:text-4xl font-black tracking-tight text-white transition-colors duration-300"
    >
      0{suffix}
    </span>
  );
}

export default function QuickStats({ homeData }) {
  // Reads dynamic items array passed from CMS if it exists, otherwise falls back to defaults
  const statsData = homeData?.quick_stats || defaultStatsData;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
      {/* Sleek, Subtle Border Separators */}
      <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
        {statsData.map((stat, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group flex flex-col items-center justify-center p-6 rounded-xl border border-zinc-900 bg-zinc-950/20 backdrop-blur-sm text-center transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-900/30 shadow-sm"
          >
            <Counter num={stat.num} suffix={stat.suffix} />
            
            <span className="text-[10px] font-bold text-slate-500 mt-2 tracking-widest uppercase max-w-[120px] group-hover:text-slate-400 transition-colors">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-x-6 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
}