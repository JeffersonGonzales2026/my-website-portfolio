// src/pages/Home.jsx
import React from 'react';
import Hero from '../sections/home/Hero';
import QuickStats from '../sections/home/QuickStats';
import AboutMe from '../sections/home/AboutMe';
import CareerTimeline from '../sections/home/CareerTimeline';
import SkillsOverview from '../sections/home/SkillsOverview';
// The component below will be built next:
// import JourneySelector from '../sections/home/JourneySelector';

export default function Home() {
  return (
    <div className="space-y-16 pb-24 overflow-hidden">
      <Hero />
      <QuickStats />
      <AboutMe />
      <CareerTimeline />
      <SkillsOverview />
      {/* <JourneySelector /> */}
    </div>
  );
}