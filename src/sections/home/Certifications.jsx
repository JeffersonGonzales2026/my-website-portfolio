// src/sections/home/Certifications.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, X, ZoomIn, ZoomOut } from 'lucide-react';

const defaultCertifications = [
  {
    title: "Certificate of Completion: Van-Aralan Basic Computer Literacy Training",
    issuer: "TESDA / MUNICIPALITY OF RODRIGUEZ, RIZAL",
    date: "Jan 2017",
    link: "",
    image_url: "/Home/3 Certificates/TESDA Certificate.jpg" // Local Fallback Path
  },
  {
    title: "Academic Excellence Award: Top 1 in Class",
    issuer: "KASIGLAHAN VILLAGE SENIOR HIGH SCHOOL / DEPED",
    date: "Nov 2018",
    link: "",
    image_url: "/Home/3 Certificates/Top 1 in Class.jpg" // Local Fallback Path
  },
  {
    title: "Engineering Seminar: Innovate & Elevate",
    issuer: "ICCT COLLEGES - COLLEGE OF ENGINEERING & DIGITAL TECHNOLOGY",
    date: "Mar 2024",
    link: "",
    image_url: "/Home/3 Certificates/Engineering Seminar.png" // Local Fallback Path
  },
  {
    title: "Certificate of Participation: The Rudiments and Basic Principles of Database Administration and Design",
    issuer: "ICCT COLLEGES - SAN MATEO",
    date: "Oct 2024",
    link: "",
    image_url: "/Home/3 Certificates/Database  Certificate.png" // Local Fallback Path
  }
];

export default function Certifications({ homeData }) {
  const certs = (homeData?.certifications && homeData.certifications.length > 0) 
    ? homeData.certifications 
    : defaultCertifications;

  // 1. IDAGDAG ITO: State para sa Lightbox
  const [selectedCert, setSelectedCert] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

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
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 cursor-pointer"
                  
                  // 2. PALITAN ANG ONCLICK NITO:
                  onClick={() => {
                    // Kukunin nito ang source ng image (local man o Supabase) para ipasa sa Modal
                    const imgSrc = cert.image_url; 
                    setSelectedCert(imgSrc);
                    setIsZoomed(false); // Reset zoom pagkabukas
                  }}
                  
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultCertifications[index]?.image_url || "/images/cert-placeholder.jpg";
                  }}
                />
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
      {/* ================= LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
            // Kapag nag-click ka sa madilim na background, mag-e-exit ang modal
            onClick={() => {
              setSelectedCert(null);
              setIsZoomed(false);
            }}
          >
            {/* Close / Exit Button */}
            <button 
              className="absolute top-6 right-6 sm:top-10 sm:right-10 z-50 p-2 bg-white/10 hover:bg-red-500 rounded-full text-white transition-colors"
              onClick={() => {
                setSelectedCert(null);
                setIsZoomed(false);
              }}
            >
              <X size={24} />
            </button>

            {/* Image Container (Gumagamit ng overflow-auto para maka-scroll kapag naka-zoom) */}
            <div 
              className={`relative w-full h-full flex items-center justify-center overflow-auto ${isZoomed ? 'items-start justify-start md:items-center md:justify-center' : ''}`}
              // Pinipigilan nitong mag-close ang modal kapag sa mismong picture ka pumindot
              onClick={(e) => e.stopPropagation()} 
            >
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={selectedCert}
                alt="Certificate Fullscreen"
                // Kapag kinlick ang picture, mag-to-toggle ang zoom state
                onClick={() => setIsZoomed(!isZoomed)}
                className={`transition-all duration-300 ${
                  isZoomed 
                    ? 'min-w-[150vw] sm:min-w-[150%] md:min-w-[120%] h-auto cursor-zoom-out' 
                    : 'max-w-full max-h-full object-contain cursor-zoom-in shadow-2xl'
                }`}
              />
            </div>
            
            {/* Zoom Instruction/Hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 text-white/90 px-4 py-2 rounded-full text-sm font-medium pointer-events-none">
              {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
              <span>{isZoomed ? "Click to Zoom Out" : "Click to Zoom In"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
