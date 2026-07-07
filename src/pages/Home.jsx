// src/pages/Home.jsx
import React from 'react';
import Hero from '../sections/home/Hero';
import QuickStats from '../sections/home/QuickStats';

export default function Home() {
  return (
    <div className="space-y-16 pb-24 overflow-hidden">
      <Hero />
      <QuickStats />
    </div>
  );
}