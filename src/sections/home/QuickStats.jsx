// src/sections/home/QuickStats.jsx
import React from 'react';

const statsData = [
  { value: "10+", label: "Years of Experience" },
  { value: "15+", label: "Professional Roles" },
  { value: "20+", label: "Companies Worked With" },
  { value: "200+", label: "Projects Completed" },
  { value: "10+", label: "Industries Served" },
  { value: "25+", label: "Learning Technologies" },
];

export default function QuickStats() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
        {statsData.map((stat, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col items-center justify-center p-6 rounded-xl border border-glass-border bg-glass-card/20 backdrop-blur-sm text-center transition-all duration-300 hover:border-zinc-700 hover:bg-background-secondary/40 shadow-sm"
          >
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-white group-hover:text-aiDeveloper-neonCyan transition-colors duration-300">
              {stat.value}
            </span>
            <span className="text-xs font-medium text-text-secondary mt-2 tracking-wide uppercase max-w-[120px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-6 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
}