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
    profile_image_url: null
  });

  // Fetch live CMS data on load
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const { data, error } = await supabase.from('home_settings').select('*').eq('id', 1).single();
        if (error && error.code !== 'PGRST116') throw error;
        
        if (data) {
          setHomeData(prev => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error('Error fetching home data:', error.message);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 pt-32 pb-24 space-y-32">
        {/* Pass the fetched data into your components as props */}
        <Hero homeData={homeData} />
        <JourneySelector />
        <AboutMe homeData={homeData} />
        <QuickStats />
        <SkillsOverview />
        <CareerTimeline />
      </div>
    </div>
  );
}