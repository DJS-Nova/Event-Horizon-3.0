"use client";

import React, { useEffect, useState, Suspense } from 'react';
import BlackHole from './BlackHole';

const StarBackground = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const starCount = 150;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            // @ts-ignore
            '--twinkle-duration': star.duration,
            '--twinkle-delay': star.delay
          } as React.CSSProperties}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(60,40,120,0.15)_0%,transparent_70%)]" />
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex gap-10 px-10 py-4 glass-morphism rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] items-center">
      {['Home', 'Timeline', 'FAQ', 'Team'].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="text-white/60 hover:text-white text-sm font-semibold tracking-wider transition-all duration-500 relative group"
        >
          {item}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-indigo-500 transition-all duration-500 group-hover:w-full rounded-full" />
        </a>
      ))}
    </nav>
  );
};

const Hero = () => {
  const titleText = "EVENT HORIZON 3.0";

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center text-white">
      {/* <StarBackground /> */}
      <Navbar />

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl translate-y-[-10%]">
        {/* Title with split-shade effect */}
        <h1 className="text-5xl md:text-7xl lg:text-[8vw] font-black tracking-tighter uppercase leading-[1.1] md:leading-[0.85] mb-6 
text-transparent bg-clip-text bg-white/90 
drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] 
[text-shadow:0_0_30px_rgba(255,255,255,0.4)]">
          {titleText}
        </h1>

        {/* Tagline */}
        <p className="text-white/60 text-sm md:text-lg tracking-[0.5em] uppercase font-light mb-12 animate-fade-in-up">
          Beyond the singularity • March 2026
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <button className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-transparent hover:text-white border-2 border-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Register Now
          </button>
          <button className="px-10 py-4 glass-morphism text-white font-bold uppercase tracking-widest rounded-full border-2 border-white/10 hover:border-white/40 transition-all duration-500">
            View Schedule
          </button>
        </div>
      </div>

      {/* Decorative center element (Optional placeholder for model if desired later) */}
      <div className="absolute inset-0 top-[10%] z-0 pointer-events-none opacity-30">
        <Suspense fallback={null}>
          {/* <BlackHole modelPath="/blackhole.glb" scale={1.8} /> */}
        </Suspense>
      </div>

      {/* Aesthetic bottom vignette */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-linear-to-t from-black to-transparent pointer-events-none z-3" />
    </div>
  );
};

export default Hero;
