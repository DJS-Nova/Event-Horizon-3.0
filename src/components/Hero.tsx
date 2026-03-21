"use client";

import { Suspense } from 'react';

const Hero = () => {
  const titleText = "EVENT HORIZON 3.0";

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 z-0 overflow-hidden scale-[1.2]">
        <img
          src="/blackhole.png"
          alt="blackhole background"
          className="w-full h-full object-cover opacity-60 object-[center_0%]"
          style={{
            animation: "wobble 20s ease-in-out infinite"
          }}
        />

        <style jsx global>{`
    @keyframes wobble {
      0%, 100% { transform: translateY(10px) scale(1) rotate(0deg); }
      50% { transform: translateY(10px) scale(1.05) rotate(0.5deg); }
    }
  `}</style>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl translate-y-[-10%] mt-34">


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
          <a href="#timeline" className="px-10 py-4 glass-morphism text-white font-bold uppercase tracking-widest rounded-full border-2 border-white/10 hover:border-white/40 transition-all duration-500">
            View Schedule
          </a>
        </div>
      </div>

      {/* Aesthetic bottom vignette */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-linear-to-t from-black to-transparent pointer-events-none z-3" />
    </div>
  );
};

export default Hero;






// "use client";

// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';

// // --- Custom Cinematic Animations ---
// const customStyles = `
//   @keyframes cinematic-pan {
//     0% { transform: scale(1.05) translate(0, 0); }
//     100% { transform: scale(1.25) translate(-1%, 2%); }
//   }
//   @keyframes spin-slow {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }
//   @keyframes spin-slow-reverse {
//     from { transform: rotate(360deg); }
//     to { transform: rotate(0deg); }
//   }
//   @keyframes text-reveal-up {
//     0% { opacity: 0; transform: translateY(40px) scaleY(1.2); filter: blur(10px); }
//     100% { opacity: 1; transform: translateY(0) scaleY(1.2); filter: blur(0px); }
//   }
//   @keyframes fade-in {
//     0% { opacity: 0; }
//     100% { opacity: 1; }
//   }

//   .animate-cinematic {
//     animation: cinematic-pan 40s ease-in-out infinite alternate;
//   }
//   .animate-title-reveal {
//     animation: text-reveal-up 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//   }
//   .animate-fade-delayed {
//     opacity: 0;
//     animation: fade-in 2s ease-out 1.5s forwards;
//   }

//   /* Outline text effect for the poster look */
//   .text-outline {
//     -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
//     color: transparent;
//   }

//   /* High-end glass button */
//   .glass-btn {
//     background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.0) 100%);
//     backdrop-filter: blur(10px);
//     -webkit-backdrop-filter: blur(10px);
//     border: 1px solid rgba(255,255,255,0.15);
//     box-shadow: inset 0 1px 1px rgba(255,255,255,0.2);
//   }
//   .glass-btn:hover {
//     background: rgba(255,255,255,0.1);
//     border-color: rgba(94, 234, 212, 0.5); /* Teal glow */
//     box-shadow: 0 0 20px rgba(94, 234, 212, 0.2), inset 0 1px 1px rgba(255,255,255,0.3);
//   }
// `;

// const Hero = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);

//   // Poster Colors
//   const colorTeal = "#5eead4";
//   const colorCream = "#fef08a";

//   return (
//     <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-white">
//       <style>{customStyles}</style>

//       {/* 1. Cinematic Background Layer */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <img
//           src="/blackhole.png"
//           alt="Event Horizon Singularity"
//           className="w-full h-full object-cover opacity-40 mix-blend-screen animate-cinematic origin-center"
//         />
//         {/* Radial gradient to darken edges and create focus */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050508_80%)]"></div>
//       </div>

//       {/* 2. Orbital Geometry (Tying into the Astral Nexus theme) */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[80vw] h-[120vw] md:h-[80vw] pointer-events-none z-0 opacity-20">
//         <svg className="absolute w-full h-full" viewBox="0 0 100 100" style={{ animation: `spin-slow 60s linear infinite` }}>
//           <circle cx="50" cy="50" r="48" fill="none" stroke={colorTeal} strokeWidth="0.1" strokeDasharray="1 2" />
//         </svg>
//         <svg className="absolute w-full h-full" viewBox="0 0 100 100" style={{ animation: `spin-slow-reverse 80s linear infinite` }}>
//           <circle cx="50" cy="50" r="45" fill="none" stroke={colorCream} strokeWidth="0.05" />
//           <circle cx="50" cy="5" r="0.5" fill={colorCream} />
//         </svg>
//       </div>

//       {/* 3. Main Hero Typography (Poster Match Layout) */}
//       <div className={`relative z-10 flex flex-col w-full max-w-7xl px-6 md:px-12 mt-12 md:mt-24 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

//         {/* Top Label */}
//         <div className="flex items-center gap-4 mb-8 md:mb-12 animate-fade-delayed">
//           <div className="w-12 h-[1px] bg-teal-300/50"></div>
//           <p className="text-teal-100/60 text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase font-thin">
//             An Event By DJS Nova
//           </p>
//         </div>

//         {/* The Core Title Block */}
//         <div className="relative flex flex-col items-start w-full">

//           {/* "EVENT" - Stacked on top left */}
//           <h2 className="text-3xl md:text-5xl lg:text-6xl font-thin tracking-[0.3em] text-white/80 ml-1 md:ml-2 mb-[-1rem] md:mb-[-2rem] z-20 animate-fade-delayed">
//             EVENT
//           </h2>

//           {/* "HORIZON" - Massive, stretched, filling width */}
//           <div className="relative w-full overflow-visible flex items-end top-6 -left-2">
//             <h1 className="text-[18vw] md:text-[14vw] font-thin uppercase tracking-tighter leading-none animate-title-reveal"
//               style={{
//                 background: `linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%)`,
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 transformOrigin: 'bottom left'
//               }}>
//               HORIZON
//             </h1>

//             {/* "3.0" - Tucked into the bottom right */}
//             <span className="absolute bottom-[10%] md:bottom-[15%] right-0 md:right-[5%] text-4xl md:text-6xl lg:text-7xl font-light text-teal-200/80 tracking-widest animate-fade-delayed">
//               3.0
//             </span>
//           </div>

//         </div>

//         {/* Tagline & Info Data block */}
//         <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-start md:items-end justify-between w-full animate-fade-delayed gap-10">

//           {/* Event Details Terminal style */}
//           <div className="flex flex-col gap-2 border-l border-white/20 pl-4">
//             <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-mono">Date.Time</p>
//             <p className="text-white/80 text-sm md:text-base tracking-widest font-thin uppercase">25th March 2026</p>
//             <p className="text-teal-300/70 text-xs md:text-sm tracking-[0.2em] font-light uppercase mt-1">Seminar Hall</p>
//           </div>

//           {/* Call to Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
//             <button className="relative overflow-hidden px-8 md:px-12 py-4 bg-white/90 text-black font-semibold uppercase tracking-[0.2em] text-xs md:text-sm rounded-none hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] group">
//               <span className="relative z-10">Register Now</span>
//               {/* Button Hover Sweep */}
//               <div className="absolute inset-0 w-full h-full bg-teal-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
//             </button>

//             <a href="#timeline" className="px-8 md:px-12 py-4 glass-btn text-white font-light uppercase tracking-[0.2em] text-xs md:text-sm rounded-none transition-all duration-500 flex items-center justify-center gap-3 group">
//               <span>View Coordinates</span>
//               <div className="w-2 h-2 rounded-full border border-white group-hover:border-teal-300 group-hover:bg-teal-300/20 transition-all"></div>
//             </a>
//           </div>

//         </div>
//       </div>

//       {/* Aesthetic bottom vignette */}
//       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none z-20" />
//     </div>
//   );
// };

// export default Hero;


// "use client";

// import React, { useEffect, useState } from 'react';

// // --- Custom Cinematic Animations ---
// const customStyles = `
//   @keyframes cinematic-pan {
//     0% { transform: scale(1.05) translate(0, 0); }
//     100% { transform: scale(1.25) translate(-1%, 2%); }
//   }
//   @keyframes spin-slow {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }
//   @keyframes spin-slow-reverse {
//     from { transform: rotate(360deg); }
//     to { transform: rotate(0deg); }
//   }
//   @keyframes text-reveal-up {
//     0% { opacity: 0; transform: translateY(40px) scaleY(1.2); filter: blur(10px); }
//     100% { opacity: 1; transform: translateY(0) scaleY(1.2); filter: blur(0px); }
//   }
//   @keyframes fade-in {
//     0% { opacity: 0; }
//     100% { opacity: 1; }
//   }

//   .animate-cinematic {
//     animation: cinematic-pan 40s ease-in-out infinite alternate;
//   }
//   .animate-title-reveal {
//     animation: text-reveal-up 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//   }
//   .animate-fade-delayed {
//     opacity: 0;
//     animation: fade-in 2s ease-out 1.5s forwards;
//   }

//   /* Outline text effect for the poster look */
//   .text-outline {
//     -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
//     color: transparent;
//   }
  
//   /* High-end glass button */
//   .glass-btn {
//     background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.0) 100%);
//     backdrop-filter: blur(10px);
//     -webkit-backdrop-filter: blur(10px);
//     border: 1px solid rgba(255,255,255,0.15);
//     box-shadow: inset 0 1px 1px rgba(255,255,255,0.2);
//   }
//   .glass-btn:hover {
//     background: rgba(255,255,255,0.1);
//     border-color: rgba(94, 234, 212, 0.5); /* Teal glow */
//     box-shadow: 0 0 20px rgba(94, 234, 212, 0.2), inset 0 1px 1px rgba(255,255,255,0.3);
//   }
// `;

// const Hero = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);

//   // Poster Colors
//   const colorTeal = "#5eead4";
//   const colorCream = "#fef08a";

//   return (
//     <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center text-white">
//       <style>{customStyles}</style>

//       {/* 1. Cinematic Background Layer */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <img
//           src="/blackhole.png"
//           alt="Event Horizon Singularity"
//           className="w-full h-full object-cover opacity-40 mix-blend-screen animate-cinematic origin-center"
//         />
//         {/* Radial gradient to darken edges and create focus */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050508_80%)]"></div>
//       </div>

//       {/* 2. Orbital Geometry */}
//       {/* w-[150vw] ensures the rings are large enough to look good on mobile screens */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] md:w-[80vw] h-[150vw] md:h-[80vw] pointer-events-none z-0 opacity-20">
//         <svg className="absolute w-full h-full" viewBox="0 0 100 100" style={{ animation: `spin-slow 60s linear infinite` }}>
//           <circle cx="50" cy="50" r="48" fill="none" stroke={colorTeal} strokeWidth="0.1" strokeDasharray="1 2" />
//         </svg>
//         <svg className="absolute w-full h-full" viewBox="0 0 100 100" style={{ animation: `spin-slow-reverse 80s linear infinite` }}>
//           <circle cx="50" cy="50" r="45" fill="none" stroke={colorCream} strokeWidth="0.05" />
//           <circle cx="50" cy="5" r="0.5" fill={colorCream} />
//         </svg>
//       </div>

//       {/* 3. Main Hero Typography */}
//       <div className={`relative z-10 flex flex-col w-full max-w-7xl px-5 md:px-12 mt-4 md:mt-24 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

//         {/* Top Label */}
//         <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-12 animate-fade-delayed">
//           <div className="w-8 md:w-12 h-[1px] bg-teal-300/50"></div>
//           <p className="text-teal-100/60 text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.6em] uppercase font-thin">
//             An Event By DJS Nova
//           </p>
//         </div>

//         {/* The Core Title Block */}
//         <div className="relative flex flex-col items-start w-full">

//           {/* "EVENT" */}
//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-[0.3em] text-white/80 ml-0 md:ml-2 mb-[-0.5rem] md:mb-[-2rem] z-20 animate-fade-delayed">
//             EVENT
//           </h2>

//           {/* "HORIZON" */}
//           {/* Removed negative left margin on mobile, kept it for desktop */}
//           <div className="relative w-full overflow-visible flex items-end top-2 md:top-6 left-0 md:-left-2">
//             <h1 className="text-[17vw] md:text-[14vw] font-thin uppercase tracking-tighter leading-none animate-title-reveal"
//               style={{
//                 background: `linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%)`,
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 transformOrigin: 'bottom left'
//               }}>
//               HORIZON
//             </h1>

//             {/* "3.0" */}
//             <span className="absolute bottom-[5%] md:bottom-[15%] right-2 md:right-[5%] text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-teal-200/80 tracking-widest animate-fade-delayed">
//               3.0
//             </span>
//           </div>

//         </div>

//         {/* Tagline & Info Data block */}
//         <div className="mt-12 md:mt-24 flex flex-col md:flex-row items-start md:items-end justify-between w-full animate-fade-delayed gap-8 md:gap-10">

//           {/* Event Details Terminal style */}
//           <div className="flex flex-col gap-1.5 md:gap-2 border-l border-white/20 pl-3 md:pl-4">
//             <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-mono">Date.Time</p>
//             <p className="text-white/80 text-xs sm:text-sm md:text-base tracking-widest font-thin uppercase">xxth March 2026</p>
//             <p className="text-teal-300/70 text-[10px] sm:text-xs md:text-sm tracking-[0.2em] font-light uppercase mt-1">Seminar Hall</p>
//           </div>

//           {/* Call to Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full md:w-auto mt-4 md:mt-0">
//             <button className="relative overflow-hidden w-full sm:w-auto px-6 md:px-12 py-4 bg-white/90 text-black font-semibold uppercase tracking-[0.2em] text-[10px] md:text-sm rounded-none hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] group flex justify-center items-center">
//               <span className="relative z-10">Register Now</span>
//               {/* Button Hover Sweep */}
//               <div className="absolute inset-0 w-full h-full bg-teal-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
//             </button>

//             <a href="#timeline" className="w-full sm:w-auto px-6 md:px-12 py-4 glass-btn text-white font-light uppercase tracking-[0.2em] text-[10px] md:text-sm rounded-none transition-all duration-500 flex items-center justify-center gap-3 group">
//               <span>View Coordinates</span>

//             </a>
//           </div>

//         </div>
//       </div>

//       {/* Aesthetic bottom vignette */}
//       <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none z-20" />
//     </div>
//   );
// };

// export default Hero;