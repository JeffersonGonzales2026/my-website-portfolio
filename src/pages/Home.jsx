// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Import your modular sections
import Hero from '../sections/home/Hero';
import AboutMe from '../sections/home/AboutMe';
import JourneySelector from '../sections/home/JourneySelector';
import QuickStats from '../sections/home/QuickStats';
import SkillsOverview from '../sections/home/SkillsOverview';
import CareerTimeline from '../sections/home/CareerTimeline';

export default function Home() {
  const [homeData, setHomeData] = useState({
    hero_title: 'Jefferson Gonzales',
    hero_subtitle: 'Data Analyst & AI Developer',
    about_text: 'A multidisciplinary technology professional...',
    profile_image_url: null,
    quick_stats: [],
    core_skills: [],
    career_timeline: []
  });

  // Fetch live CMS data on load
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Wired perfectly to our new 'home_engine' database table
        const { data, error } = await supabase.from('home_engine').select('*').eq('id', 1).single();
        if (error && error.code !== 'PGRST116') throw error;
        
        if (data) {
          setHomeData(prev => ({ 
            ...prev, 
            profile_image_url: data.hero_photo,
            quick_stats: data.quick_stats || [],
            core_skills: data.core_skills || [],
            career_timeline: data.career_timeline || []
          }));
        }
      } catch (error) {
        console.error('Error fetching home data:', error.message);
      }
    };

    fetchHomeData();
  }, []);

  return (
    // ================= CLASSY MATTED BLACK BACKGROUND =================
    <div className="min-h-screen flex flex-col relative bg-[#121212] text-zinc-300 font-sans overflow-x-hidden selection:bg-zinc-700 selection:text-white">
      
      {/* Subtle Matte Inner Glow (White glow with very low opacity for premium depth) */}
      <div className="absolute top-0 inset-x-0 h-[80vh] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.04),transparent)] pointer-events-none z-0" />
      
      <div className="relative z-10 w-full flex-grow pt-16 pb-24 space-y-32">
        {/* Pass the fetched data into your components as props */}
        <Hero homeData={homeData} />
        <AboutMe homeData={homeData} />
        <QuickStats homeData={homeData} />
        <SkillsOverview homeData={homeData} />
        <CareerTimeline homeData={homeData} />
        <JourneySelector homeData={homeData} />
      </div>
    </div>
  );
}