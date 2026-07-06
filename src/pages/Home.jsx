import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Briefcase, BarChart2, Code, Palette } from 'lucide-react';

const titles = [
  "Creative Leader",
  "Data Analyst",
  "AI-Assisted Developer",
  "Problem Solver",
  "Automation Builder"
];

// Fallback seed data in case database is loading or empty
const fallbackAchievements = [
  { id: '1', value: "10+", label: "Years Creative Industry" },
  { id: '2', value: "100+", label: "Projects Orchestrated" },
  { id: '3', value: "50+", label: "Data Automations Configured" },
  { id: '4', value: "1", label: "Flagship SaaS Portfolio Platform" }
];

const fallbackTimeline = [
  {
    tag: "Design Roots",
    title: "Graphic Artist & Creative Professional",
    description: "Laid the foundation of visual balance, UI/UX aesthetics, and user empathy through end-to-end design configurations."
  },
  {
    tag: "Leadership & Agency",
    title: "Owner & Team Manager — Dream Creations",
    description: "Expanded technical skills into business administration, agile management, cross-functional project tracking, and operations architecture."
  },
  {
    tag: "Business Intelligence",
    title: "Data Analyst",
    description: "Transitioned creative tracking metrics into strict empirical data architecture. Specialized in processing complex data sets, ETL workflows, and deploying analytical dashboards."
  },
  {
    tag: "Software Engineering",
    title: "AI-Assisted Full-Stack Developer",
    description: "The present milestone. Fusing visual design, enterprise analytics systems, and modular engineering architectures driven by accelerated AI engineering workflows."
  }
];

// Maps table string entries safely to visual Lucide components
const iconMap = {
  'Design Roots': <Palette size={20} />,
  'Leadership & Agency': <Briefcase size={20} />,
  'Business Intelligence': <BarChart2 size={20} />,
  'Software Engineering': <Code size={20} />
};

export default function Home() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [achievements, setAchievements] = useState(fallbackAchievements);
  const [timeline, setTimeline] = useState(fallbackTimeline);

  // Live Database Fetch Setup
  useEffect(() => {
    async function fetchDatabaseContent() {
      try {
        // Fetch Achievements Array
        const { data: statsData, error: statsError } = await supabase
          .from('achievements')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (!statsError && statsData && statsData.length > 0) {
          setAchievements(statsData);
        }

        // Fetch Timeline Array
        const { data: timelineData, error: timelineError } = await supabase
          .from('career_timeline')
          .select('*')
          .eq('status', 'published')
          .order('display_order', { ascending: true });
        
        if (!timelineError && timelineData && timelineData.length > 0) {
          setTimeline(timelineData);
        }
      } catch (err) {
        console.warn("Using baseline fallback data architecture:", err);
      }
    }

    fetchDatabaseContent();
  }, []);

  // Title Rotation Cycle Loop
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background-primary overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-glass-card border border-glass-border mb-8 shadow-2xl flex items-center justify-center backdrop-blur-md">
             <span className="text-text-muted text-sm font-medium">JG</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tight mb-4">
            Jefferson Gonzales
          </h1>

          <div className="h-12 overflow-hidden mb-6 flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-3xl font-semibold tracking-wide text-blue-400"
              >
                {titles[titleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed">
            Combining deep creative expertise, strict data intelligence, and modern code bases to implement software platforms engineered for true scaling.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              to="/dream-creations"
              className="px-8 py-3 rounded-xl bg-text-primary text-background-primary font-semibold hover:bg-text-secondary transition-all text-center shadow-lg"
            >
              Explore My Journey
            </Link>
            <Link 
              to="/contact"
              className="px-8 py-3 rounded-xl bg-glass-card border border-glass-border text-text-primary font-semibold hover:bg-white/10 transition-colors text-center backdrop-blur-md"
            >
              Download Resume
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= STATS / ACHIEVEMENTS SECTION ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16 border-t border-glass-border bg-background-secondary/30 backdrop-blur-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-glass-card border border-glass-border text-center shadow-sm">
              <span className="text-3xl md:text-4xl font-extrabold text-text-primary mb-2 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-text-muted font-medium uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CAREER TIMELINE SECTION ================= */}
      <section className="max-w-5xl mx-auto w-full px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Evolutionary Professional Path
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto">
            A linear progression where each engineering milestone directly elevates the next capability layer.
          </p>
        </div>

        <div className="relative border-l border-glass-border ml-4 md:ml-32 space-y-12 py-4">
          {timeline.map((event, index) => (
            <motion.div 
              key={event.id || index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-xl bg-background-secondary border border-glass-border flex items-center justify-center text-blue-400 shadow-xl backdrop-blur-md">
                {iconMap[event.tag] || <Code size={20} />}
              </div>

              {/* Box Panel */}
              <div className="p-6 rounded-2xl bg-glass-card border border-glass-border shadow-xl backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 group">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 uppercase tracking-wider">
                  {event.tag}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-text-primary group-hover:text-blue-400 transition-colors mb-2">
                  {event.title}
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}