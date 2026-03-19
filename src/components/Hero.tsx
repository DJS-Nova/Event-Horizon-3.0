"use client";

import { Suspense } from 'react';

const Hero = () => {
  const titleText = "EVENT HORIZON 3.0";

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/blackhole.png"
          alt="blackhole background"
          className="w-full h-full object-cover opacity-60"
          style={{
            animation: "wobble 20s ease-in-out infinite"
          }}
        />

        <style jsx global>{`
    @keyframes wobble {
      0%, 100% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(1.05) rotate(0.5deg); }
    }
  `}</style>
      </div>

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

      {/* Aesthetic bottom vignette */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-linear-to-t from-black to-transparent pointer-events-none z-3" />
    </div>
  );
};

export default Hero;
