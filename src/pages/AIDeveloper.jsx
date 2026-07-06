import { motion } from 'framer-motion';
import { Code2, Cpu, Rocket, Layers, GitMerge, Sparkles } from 'lucide-react';

const stack = [
  { name: "React & Vite", category: "Frontend Engine", icon: <Code2 size={18} /> },
  { name: "Tailwind CSS", category: "Styling Architecture", icon: <Layers size={18} /> },
  { name: "Supabase & PostgreSQL", category: "Backend & Database", icon: <GitMerge size={18} /> },
  { name: "AI Acceleration", category: "Workflow Multiplication", icon: <Cpu size={18} /> }
];

export default function AIDeveloper() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 px-6 min-h-[60vh] flex flex-col items-center justify-center text-center">
        
        {/* Cyber/AI Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles size={16} />
            <span>The Current Iteration</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary tracking-tight mb-6">
            AI-Assisted <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Full-Stack Developer</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Fusing visual design expertise and enterprise data logic into modular, highly scalable software. Empowered by artificial intelligence to write, debug, and deploy code at unprecedented speeds.
          </p>
        </motion.div>
      </section>

      {/* ================= THE STACK & CAPABILITIES ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-24">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Engineering at the Speed of Thought</h2>
            <p className="text-text-secondary leading-relaxed text-lg">
              By utilizing AI agents as paired-programming partners, I act as the lead architect—defining the business logic, UI/UX requirements, and data structures—while AI accelerates the granular syntax generation. This allows me to build production-ready applications in a fraction of the traditional timeline.
            </p>
            <div className="flex items-center gap-4 text-sm font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl w-max">
              <Rocket size={20} />
              10x Development Velocity Achieved
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {stack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-5 rounded-2xl bg-glass-card border border-glass-border shadow-lg hover:border-purple-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-background-secondary flex items-center justify-center text-text-primary mb-4 group-hover:text-purple-400 transition-colors">
                  {tech.icon}
                </div>
                <h3 className="font-bold text-text-primary mb-1">{tech.name}</h3>
                <p className="text-xs text-text-muted uppercase tracking-wider">{tech.category}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}