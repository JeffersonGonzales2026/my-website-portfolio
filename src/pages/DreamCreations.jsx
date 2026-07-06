import { motion } from 'framer-motion';
import { PenTool, Layout, Image as ImageIcon, MonitorSmartphone } from 'lucide-react';

const services = [
  { id: 1, title: "Brand Identity", icon: <PenTool size={24} />, desc: "Crafting cohesive visual identities, logos, and brand guidelines that resonate with target audiences." },
  { id: 2, title: "UI/UX Design", icon: <Layout size={24} />, desc: "Designing intuitive, user-centric interfaces with a focus on conversion and seamless experiences." },
  { id: 3, title: "Digital Manipulation", icon: <ImageIcon size={24} />, desc: "Advanced photo restoration, color grading, and composite imagery for premium marketing." },
  { id: 4, title: "Marketing Materials", icon: <MonitorSmartphone size={24} />, desc: "High-conversion social media assets, print layouts, and digital campaign aesthetics." },
];

// Placeholder for the masonry portfolio gallery
const portfolioPlaceholders = [1, 2, 3, 4, 5, 6];

export default function DreamCreations() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary overflow-x-hidden">
      
      {/* ================= HERO & TRANSITION SECTION ================= */}
      <section className="relative pt-32 pb-20 px-6 min-h-[60vh] flex flex-col items-center justify-center text-center">
        
        {/* The Signature "Space Shift" Blue Line Animation */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute top-1/2 left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] -z-10 origin-center"
        />

        {/* Ambient Creative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[400px] bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-[120px] -z-20 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-sm md:text-base font-bold tracking-[0.3em] text-blue-400 uppercase mb-4">
            Creative Agency
          </h1>
          <h2 className="text-5xl md:text-7xl font-extrabold text-text-primary tracking-tight mb-6">
            Dream Creations
          </h2>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Where visual imagination meets business strategy. Transforming abstract ideas into compelling brand identities, digital assets, and unforgettable user experiences.
          </p>
        </motion.div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-24">
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Core Competencies</h3>
          <div className="w-20 h-1 bg-blue-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-glass-card border border-glass-border hover:bg-glass-card/80 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-3">{service.title}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PORTFOLIO GALLERY PREVIEW ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-24 border-t border-glass-border">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Selected Works</h3>
            <div className="w-20 h-1 bg-blue-500 rounded-full" />
          </div>
          <button className="hidden md:block px-6 py-2 rounded-lg bg-glass-card border border-glass-border text-sm font-medium hover:text-blue-400 transition-colors">
            View Full Archive
          </button>
        </div>

        {/* Masonry Layout Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          {portfolioPlaceholders.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl border border-glass-border bg-background-secondary overflow-hidden group relative ${
                index === 0 || index === 3 ? 'md:col-span-2' : ''
              }`}
            >
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-105 transition-transform duration-700" />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-background-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Brand Identity</span>
                <h4 className="text-text-primary font-bold text-xl">Project Title {item}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}