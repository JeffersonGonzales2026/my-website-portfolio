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

// This sub-component handles the performance-optimized number scrolling animation
function Counter({ num, suffix }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      // Animates from 0 to the target number over 2.5 seconds
      const controls = animate(0, num, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            // Mutates the layout node instantly without heavy state re-renders
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
      className="text-3xl md:text-4xl font-extrabold tracking-tight text-white group-hover:text-[#ffffff] transition-colors duration-300"
    >
      0{suffix}
    </span>
  );
}

export default function QuickStats({ homeData }) {
  // Pull dynamic matrix array if provided via CMS configs, otherwise fallback to default parameters
  const statsData = homeData?.quick_stats || defaultStatsData;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
      {/* Underlying subtle border lines */}
      <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
        {statsData.map((stat, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group flex flex-col items-center justify-center p-6 rounded-xl border border-glass-border bg-glass-card/20 backdrop-blur-sm text-center transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/40 shadow-sm"
          >
            {/* Using our custom animated counter component here */}
            <Counter num={stat.num} suffix={stat.suffix} />
            
            <span className="text-xs font-medium text-text-secondary mt-2 tracking-wide uppercase max-w-[120px]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-x-6 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
}