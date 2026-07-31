// src/sections/home/Certifications.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Certifications({ homeData }) {
  const certs = homeData?.certifications || [];

  if (certs.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 relative z-10">
      
      {/* Header - Professional & Clean */}
      <div className="mb-12 flex flex-col items-center text-center md:items-start md:text-left">
        <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">Licenses & Certifications</h3>
        <div className="w-12 h-[1px] bg-zinc-700 mx-auto" />
      </div>

      {/* Grid Layout for Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/50 transition-all group flex flex-col h-full overflow-hidden"
          >
            {/* Elegant Image Banner */}
            {cert.image_url && (
              <div className="w-full h-44 bg-black/60 relative overflow-hidden border-b border-slate-800/50">
                <img 
                  src={cert.image_url} 
                  alt={cert.title} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                {/* Subtle gradient overlay to blend into the card */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
              </div>
            )}

            <div className={`p-6 flex flex-col flex-grow ${cert.image_url ? 'pt-4' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                {/* Fallback Icon if NO Image */}
                {!cert.image_url && (
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border border-blue-500/20">
                    <Award size={20} />
                  </div>
                )}
                
                {/* Date Badge */}
                {cert.date && (
                  <span className={`text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded-md border border-slate-800 ${cert.image_url ? 'ml-auto' : ''}`}>
                    {cert.date}
                  </span>
                )}
              </div>

              <h4 className="text-lg font-bold text-slate-200 mb-1 leading-tight group-hover:text-blue-400 transition-colors">
                {cert.title}
              </h4>
              <p className="text-xs font-semibold text-slate-400 mb-4 flex items-center gap-1.5 uppercase tracking-wider">
                <ShieldCheck size={12} className="text-emerald-500" /> {cert.issuer}
              </p>

              <div className="mt-auto pt-5 border-t border-slate-800/50">
                {cert.link ? (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 w-fit"
                  >
                    Verify Credential <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-500 italic">Credential ID available upon request</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}