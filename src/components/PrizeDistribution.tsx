// "use client";

// import React from 'react';

// const PrizeDistribution = () => {
//     return (
//         <section id="prizes" className="w-full py-32 min-h-screen flex flex-col items-center justify-center bg-transparent text-white relative z-30">
//             <h2 className="text-5xl md:text-7xl mb-24 text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-600 uppercase tracking-widest font-thin text-center">
//                 Prize Distribution
//             </h2>
//             <div className="w-full max-w-5xl px-8 flex flex-col md:flex-row items-end justify-center gap-6">

//                 {/* 2nd Place */}
//                 <div className="w-full md:w-1/3 flex flex-col items-center order-2 md:order-1 select-none">
//                     <div className="glass-morphism w-full p-8 rounded-t-3xl border border-gray-400/30 text-center shadow-[0_0_30px_rgba(192,192,192,0.1)] h-64 flex flex-col justify-end relative hover:-translate-y-2 transition-transform duration-500">
//                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl drop-shadow-[0_0_10px_rgba(192,192,192,0.5)]">🥈</div>
//                         <div>
//                             <h3 className="text-3xl font-thin text-gray-300 mb-2 tracking-widest">2nd Place</h3>
//                             <p className="text-gray-500 font-thin uppercase tracking-widest text-sm">Runner up</p>
//                         </div>
//                         <div className="text-4xl font-thin text-white mt-6">₹xxxxx</div>
//                     </div>
//                 </div>

//                 {/* 1st Place */}
//                 <div className="w-full md:w-1/3 flex flex-col items-center order-1 md:order-2 z-10 select-none">
//                     <div className="glass-morphism w-full p-8 rounded-t-3xl border border-yellow-500/50 text-center shadow-[0_0_50px_rgba(255,215,0,0.15)] h-80 flex flex-col justify-end relative bg-yellow-500/5 hover:-translate-y-4 transition-transform duration-500">
//                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">👑</div>
//                         <div>
//                             <h3 className="text-4xl font-thin text-yellow-400 mb-2 tracking-widest">1st Place</h3>
//                             <p className="text-yellow-600/70 font-thin uppercase tracking-widest text-sm">Grand Prize</p>
//                         </div>
//                         <div className="text-6xl font-thin text-white mt-8">₹xxxxx</div>
//                     </div>
//                 </div>

//                 {/* 3rd Place */}
//                 <div className="w-full md:w-1/3 flex flex-col items-center order-3 md:order-3 select-none">
//                     <div className="glass-morphism w-full p-8 rounded-t-3xl border border-orange-700/30 text-center shadow-[0_0_30px_rgba(205,127,50,0.1)] h-56 flex flex-col justify-end relative hover:-translate-y-2 transition-transform duration-500">
//                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl drop-shadow-[0_0_10px_rgba(205,127,50,0.5)]">🥉</div>
//                         <div>
//                             <h3 className="text-2xl font-thin text-orange-400 mb-2 tracking-widest">3rd Place</h3>
//                             <p className="text-orange-900/80 font-thin uppercase tracking-widest text-sm">Second Runner up</p>
//                         </div>
//                         <div className="text-3xl font-thin text-white mt-4">₹xxxxx</div>
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default PrizeDistribution;






// "use client";

// import React, { useEffect, useState, useRef } from 'react';

// // --- 1. TypeScript Interfaces ---
// interface ConstellationSegment {
//     constellation: string;
//     ra1: number;
//     dec1: number;
//     ra2: number;
//     dec2: number;
// }

// interface ConstellationPlotProps {
//     data: ConstellationSegment[];
//     name: string;
//     isVisible: boolean;
//     color?: string;
//     delayOffset?: number;
// }

// // --- 2. Custom Styles for Cinematic Effects ---
// const customStyles = `
// @keyframes slow-drift {
//   0% { transform: translateY(0px) scale(1); }
//   50% { transform: translateY(-8px) scale(1.02); }
//   100% { transform: translateY(0px) scale(1); }
// }
// .animate-drift {
//   animation: slow-drift 6s ease-in-out infinite;
// }
// .smokey-glass {
//   background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.4) 100%);
//   backdrop-filter: blur(8px);
//   border: 1px solid rgba(255,255,255,0.08);
// }
// `;

// // --- 3. Refined Constellation Plot (Thin & Elegant) ---
// const ConstellationPlot: React.FC<ConstellationPlotProps> = ({
//     data,
//     name,
//     isVisible,
//     color = "#fef08a", // Defaulting to the pale cream/yellow from the poster
//     delayOffset = 0
// }) => {
//     if (!data || data.length === 0) return null;

//     const subset = data.filter((row) => row.constellation === name);
//     if (subset.length === 0) return null;

//     let minRa = Infinity, maxRa = -Infinity;
//     let minDec = Infinity, maxDec = -Infinity;

//     subset.forEach((row) => {
//         minRa = Math.min(minRa, row.ra1, row.ra2);
//         maxRa = Math.max(maxRa, row.ra1, row.ra2);
//         minDec = Math.min(minDec, row.dec1, row.dec2);
//         maxDec = Math.max(maxDec, row.dec1, row.dec2);
//     });

//     const rangeRa = maxRa - minRa || 1;
//     const rangeDec = maxDec - minDec || 1;

//     const normalizedLines = subset.map((row) => ({
//         x1: 90 - ((row.ra1 - minRa) / rangeRa) * 80,
//         x2: 90 - ((row.ra2 - minRa) / rangeRa) * 80,
//         y1: 90 - ((row.dec1 - minDec) / rangeDec) * 80,
//         y2: 90 - ((row.dec2 - minDec) / rangeDec) * 80,
//     }));

//     const getRandomBlinkDur = () => `${(Math.random() * 3 + 2).toFixed(2)}s`; // Slower, more subtle blink

//     return (
//         <div className="absolute -top-32 md:-top-40 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-drift" style={{ animationDelay: `${delayOffset}s` }}>
//             {/* Soft, smokey background glow behind the constellation */}
//             <div
//                 className="absolute inset-0 rounded-full opacity-30 mix-blend-screen pointer-events-none blur-2xl"
//                 style={{ backgroundColor: color }}
//             ></div>

//             <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible relative z-10">
//                 <defs>
//                     <filter id={`subtle-glow-${name}`} x="-50%" y="-50%" width="200%" height="200%">
//                         <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
//                         <feMerge>
//                             <feMergeNode in="coloredBlur" />
//                             <feMergeNode in="SourceGraphic" />
//                         </feMerge>
//                     </filter>
//                 </defs>

//                 {normalizedLines.map((line, index) => {
//                     const animDelay = delayOffset + (index * 0.15);
//                     return (
//                         <React.Fragment key={index}>
//                             {/* THIN connecting lines */}
//                             <line
//                                 x1={line.x1} y1={line.y1}
//                                 x2={line.x2} y2={line.y2}
//                                 stroke={color}
//                                 strokeWidth="0.3"
//                                 filter={`url(#subtle-glow-${name})`}
//                                 strokeDasharray="150"
//                                 strokeDashoffset={isVisible ? 0 : 150}
//                                 style={{ transition: `stroke-dashoffset 2s ease-in-out ${animDelay}s`, opacity: 0.6 }}
//                             />
//                             {/* TINY star dots */}
//                             <circle
//                                 cx={line.x1} cy={line.y1} r="0.6" fill={color}
//                                 filter={`url(#subtle-glow-${name})`}
//                                 style={{ transition: `opacity 1s ease ${animDelay}s`, opacity: isVisible ? 1 : 0 }}
//                             >
//                                 <animate attributeName="opacity" values="0.8;0.3;0.8" dur={getRandomBlinkDur()} repeatCount="indefinite" />
//                             </circle>
//                             <circle
//                                 cx={line.x2} cy={line.y2} r="0.6" fill={color}
//                                 filter={`url(#subtle-glow-${name})`}
//                                 style={{ transition: `opacity 1s ease ${animDelay + 0.2}s`, opacity: isVisible ? 1 : 0 }}
//                             >
//                                 <animate attributeName="opacity" values="0.8;0.3;0.8" dur={getRandomBlinkDur()} repeatCount="indefinite" />
//                             </circle>
//                         </React.Fragment>
//                     );
//                 })}
//             </svg>
//         </div>
//     );
// };

// // --- 4. Sleek Cinematic Card Component ---
// const PrizeCard = ({
//     title, subtitle, amount, color, delay, isVisible, isGrandPrize = false
// }: any) => {
//     return (
//         <div className={`w-full flex flex-col items-center relative transition-all duration-1000 ease-out 
//             ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
//             style={{ transitionDelay: `${delay}ms` }}
//         >
//             <div className={`w-full ${isGrandPrize ? 'h-72 md:h-80' : 'h-60 md:h-64'} 
//                 smokey-glass flex flex-col justify-end items-center pb-8 relative group overflow-hidden`}
//             >
//                 {/* Subtle top edge highlight */}
//                 <div className="absolute top-0 left-0 w-full h-[1px] opacity-40" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}></div>

//                 <h3 className={`font-thin uppercase tracking-[0.4em] mb-2 ${isGrandPrize ? 'text-2xl md:text-3xl' : 'text-xl'}`} style={{ color: color }}>
//                     {title}
//                 </h3>

//                 <p className="text-white/40 font-thin uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8">
//                     {subtitle}
//                 </p>

//                 <div className={`font-light text-white transition-all duration-1000 ease-out tracking-wider
//                     ${isGrandPrize ? 'text-4xl md:text-5xl' : 'text-3xl'}
//                     ${isVisible ? 'opacity-100 blur-none' : 'opacity-0 blur-md'}`}
//                     style={{ transitionDelay: `${delay + 600}ms` }}
//                 >
//                     ₹xxxxx
//                 </div>
//             </div>
//         </div>
//     );
// }

// // --- 5. Main Component ---
// const PrizeDistribution: React.FC = () => {
//     const [isVisible, setIsVisible] = useState<boolean>(false);
//     const [csvData, setCsvData] = useState<ConstellationSegment[]>([]);
//     const sectionRef = useRef<HTMLElement | null>(null);

//     useEffect(() => {
//         const fetchConstellations = async () => {
//             try {
//                 const response = await fetch('/constellation_segments.csv');
//                 const text = await response.text();
//                 const lines = text.trim().split('\n');
//                 const headers = lines[0].split(',').map(h => h.trim());

//                 const parsed: ConstellationSegment[] = lines.slice(1).map(line => {
//                     const values = line.split(',');
//                     const row: Record<string, any> = {};
//                     headers.forEach((header, index) => {
//                         const val = values[index]?.trim();
//                         row[header] = isNaN(Number(val)) ? val : parseFloat(val);
//                     });
//                     return row as ConstellationSegment;
//                 });
//                 setCsvData(parsed);
//             } catch (error) {
//                 console.error("Failed to load constellation data:", error);
//             }
//         };
//         fetchConstellations();
//     }, []);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setIsVisible(true);
//                     observer.unobserve(entry.target);
//                 }
//             },
//             { threshold: 0.15 }
//         );

//         if (sectionRef.current) observer.observe(sectionRef.current);
//         return () => observer.disconnect();
//     }, []);

//     // Colors extracted from the "Event Horizon" Poster
//     const colorCream = "#fef08a"; // From "HORI" and helmet glow
//     const colorTeal = "#5eead4";  // From "ZON" and helmet shadows
//     const colorSlate = "#cbd5e1"; // Neutral suit color

//     return (
//         <section
//             id="prizes"
//             ref={sectionRef}
//             className="w-full py-32 md:py-40 min-h-screen flex flex-col items-center justify-center text-white relative z-30 overflow-hidden bg-transparent"
//         >
//             <style>{customStyles}</style>

//             {/* Typography matching the tall, tracked-out style of the poster */}
//             <div className="flex flex-col items-center mb-32 md:mb-40 z-10">
//                 <p className={`text-white/50 uppercase tracking-[0.6em] text-xs md:text-sm font-thin mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
//                     Event Rewards
//                 </p>
//                 <h2 className={`text-5xl md:text-7xl lg:text-8xl font-thin uppercase tracking-[0.1em] text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
//                     style={{
//                         background: `linear-gradient(90deg, ${colorCream} 0%, ${colorTeal} 100%)`,
//                         WebkitBackgroundClip: 'text',
//                         WebkitTextFillColor: 'transparent',
//                         transform: 'scaleY(1.1)' // Gives it that slightly taller "HORIZON" feel
//                     }}>
//                     Prize Pool
//                 </h2>
//             </div>

//             <div className="w-full max-w-6xl px-6 md:px-8 flex flex-col md:flex-row items-end justify-center gap-24 md:gap-8 lg:gap-12 relative mt-8">

//                 {/* ================= 2ND PLACE ================= */}
//                 <div className="w-full md:w-1/3 flex flex-col items-center order-2 md:order-1 relative z-10">
//                     <ConstellationPlot data={csvData} name="Cygnus" isVisible={isVisible} color={colorTeal} delayOffset={0.5} />
//                     <PrizeCard
//                         title="2nd Place" subtitle="Runner Up" amount="₹xxxxx" color={colorTeal}
//                         delay={400} isVisible={isVisible}
//                     />
//                 </div>

//                 {/* ================= 1ST PLACE ================= */}
//                 <div className="w-full md:w-1/3 flex flex-col items-center order-1 md:order-2 relative z-20 mb-12 md:mb-0">
//                     <ConstellationPlot data={csvData} name="Scorpius" isVisible={isVisible} color={colorCream} delayOffset={0.8} />
//                     <PrizeCard
//                         title="1st Place" subtitle="Grand Prize" amount="₹xxxxx" color={colorCream}
//                         delay={200} isVisible={isVisible} isGrandPrize={true}
//                     />
//                 </div>

//                 {/* ================= 3RD PLACE ================= */}
//                 <div className="w-full md:w-1/3 flex flex-col items-center order-3 md:order-3 relative z-10">
//                     <ConstellationPlot data={csvData} name="Cancer" isVisible={isVisible} color={colorSlate} delayOffset={0.5} />
//                     <PrizeCard
//                         title="3rd Place" subtitle="2nd Runner Up" amount="₹xxxxx" color={colorSlate}
//                         delay={600} isVisible={isVisible}
//                     />
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default PrizeDistribution;


// "use client";

// import React, { useEffect, useState, useRef } from 'react';

// // --- 1. TypeScript Interfaces ---
// interface ConstellationSegment {
//     constellation: string;
//     ra1: number;
//     dec1: number;
//     ra2: number;
//     dec2: number;
// }

// // --- 2. Advanced CSS Animations (The Secret Sauce) ---
// const customStyles = `
//   @keyframes float-slow {
//     0% { transform: translateY(0px); }
//     50% { transform: translateY(-12px); }
//     100% { transform: translateY(0px); }
//   }
//   @keyframes orbit-ring {
//     0% { transform: rotateX(75deg) rotateY(-10deg) rotateZ(0deg); }
//     100% { transform: rotateX(75deg) rotateY(-10deg) rotateZ(360deg); }
//   }
//   @keyframes orbit-ring-reverse {
//     0% { transform: rotateX(70deg) rotateY(15deg) rotateZ(360deg); }
//     100% { transform: rotateX(70deg) rotateY(15deg) rotateZ(0deg); }
//   }
//   @keyframes pulse-glow {
//     0%, 100% { opacity: 0.4; filter: blur(8px); }
//     50% { opacity: 0.8; filter: blur(12px); }
//   }
//   .animate-float {
//     animation: float-slow 7s ease-in-out infinite;
//   }
//   .glass-monolith {
//     background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.0) 100%);
//     backdrop-filter: blur(12px);
//     -webkit-backdrop-filter: blur(12px);
//     border: 1px solid rgba(255,255,255,0.05);
//     box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
//   }
//   .hud-bracket {
//     position: absolute;
//     width: 20px;
//     height: 20px;
//     border-color: rgba(255,255,255,0.4);
//     transition: all 0.5s ease;
//   }
//   .group:hover .hud-bracket {
//     width: 30px;
//     height: 30px;
//     border-color: rgba(255,255,255,0.8);
//   }
// `;

// // --- 3. Refined Constellation Background (Now deeper in the background) ---
// const ConstellationBackground: React.FC<{ data: ConstellationSegment[], name: string, color: string }> = ({ data, name, color }) => {
//     if (!data || data.length === 0) return null;
//     const subset = data.filter((row) => row.constellation === name);
//     if (subset.length === 0) return null;

//     let minRa = Infinity, maxRa = -Infinity, minDec = Infinity, maxDec = -Infinity;
//     subset.forEach((row) => {
//         minRa = Math.min(minRa, row.ra1, row.ra2); maxRa = Math.max(maxRa, row.ra1, row.ra2);
//         minDec = Math.min(minDec, row.dec1, row.dec2); maxDec = Math.max(maxDec, row.dec1, row.dec2);
//     });

//     const rangeRa = maxRa - minRa || 1; const rangeDec = maxDec - minDec || 1;
//     const normalizedLines = subset.map((row) => ({
//         x1: 90 - ((row.ra1 - minRa) / rangeRa) * 80, x2: 90 - ((row.ra2 - minRa) / rangeRa) * 80,
//         y1: 90 - ((row.dec1 - minDec) / rangeDec) * 80, y2: 90 - ((row.dec2 - minDec) / rangeDec) * 80,
//     }));

//     return (
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 z-0 scale-125 md:scale-150">
//             {/* Ambient core glow */}
//             <div className="absolute w-32 h-32 rounded-full mix-blend-screen animate-[pulse-glow_4s_ease-in-out_infinite]" style={{ backgroundColor: color }}></div>

//             <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
//                 {normalizedLines.map((line, index) => (
//                     <React.Fragment key={index}>
//                         <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke={color} strokeWidth="0.15" opacity="0.5" />
//                         <circle cx={line.x1} cy={line.y1} r="0.4" fill={color} opacity="0.8" />
//                         <circle cx={line.x2} cy={line.y2} r="0.4" fill={color} opacity="0.8" />
//                     </React.Fragment>
//                 ))}
//             </svg>
//         </div>
//     );
// };

// // --- 4. 3D Orbital Rings (For 1st Place) ---
// const OrbitalRings = ({ color }: { color: string }) => (
//     <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20" style={{ perspective: '1000px' }}>
//         {/* Outer Ring */}
//         <div className="absolute w-[140%] md:w-[160%] aspect-square rounded-full border-[0.5px] border-dashed" 
//              style={{ borderColor: color, animation: 'orbit-ring 15s linear infinite', opacity: 0.6 }}>
//              {/* Orbiting Moon/Star */}
//              <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: color, transform: 'translate(-50%, -50%)' }}></div>
//         </div>
//         {/* Inner Ring */}
//         <div className="absolute w-[110%] md:w-[130%] aspect-square rounded-full border-[0.5px] border-solid" 
//              style={{ borderColor: color, animation: 'orbit-ring-reverse 10s linear infinite', opacity: 0.3 }}>
//              <div className="absolute bottom-0 left-1/4 w-1 h-1 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: color, transform: 'translate(-50%, 50%)' }}></div>
//         </div>
//     </div>
// );

// // --- 5. The "Data Monolith" Card ---
// const PrizeMonolith = ({ title, subtitle, amount, color, delay, isVisible, isGrandPrize = false, constellationData, constellationName }: any) => {
//     return (
//         <div className={`relative w-full flex flex-col items-center justify-center transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1)
//             ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}
//             ${isGrandPrize ? 'z-30 order-1 md:order-2 mt-8 md:mt-0' : 'z-20 order-2 md:order-1 mt-16 md:mt-0'}`}
//             style={{ transitionDelay: `${delay}ms` }}
//         >
//             {/* Background Constellation tied to this specific prize */}
//             <ConstellationBackground data={constellationData} name={constellationName} color={color} />

//             {/* 3D Rings only for Grand Prize */}
//             {isGrandPrize && <OrbitalRings color={color} />}

//             {/* The Monolith Slab */}
//             <div className={`group glass-monolith animate-float relative flex flex-col items-center justify-center w-full max-w-[280px] md:max-w-xs
//                 ${isGrandPrize ? 'h-[400px] md:h-[480px]' : 'h-[320px] md:h-[380px]'}`}
//                 style={{ animationDelay: `${delay}ms` }}
//             >
//                 {/* HUD Brackets (Corner UI elements) */}
//                 <div className="hud-bracket top-0 left-0 border-t border-l"></div>
//                 <div className="hud-bracket top-0 right-0 border-t border-r"></div>
//                 <div className="hud-bracket bottom-0 left-0 border-b border-l"></div>
//                 <div className="hud-bracket bottom-0 right-0 border-b border-r"></div>

//                 {/* Vertical Targeting Line */}
//                 <div className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent left-1/2 -translate-x-1/2 z-0"></div>

//                 {/* Content */}
//                 <div className="relative z-10 flex flex-col items-center text-center px-6">
//                     <p className="text-white/40 font-thin uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4">
//                         {subtitle}
//                     </p>

//                     <h3 className={`font-thin uppercase tracking-[0.3em] mb-12 ${isGrandPrize ? 'text-3xl md:text-4xl' : 'text-2xl'}`} 
//                         style={{ color: color, textShadow: `0 0 20px ${color}40` }}>
//                         {title}
//                     </h3>

//                     {/* Technical decorative element */}
//                     <div className="flex gap-2 mb-12 opacity-50">
//                         <span className="w-1 h-1 bg-white/50 rounded-full"></span>
//                         <span className="w-8 h-1 bg-white/20"></span>
//                         <span className="w-1 h-1 bg-white/50 rounded-full"></span>
//                     </div>

//                     <div className={`font-light text-white transition-all duration-1000 ease-out tracking-widest
//                         ${isGrandPrize ? 'text-4xl md:text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'text-3xl'}
//                         ${isVisible ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-md translate-y-4'}`}
//                         style={{ transitionDelay: `${delay + 800}ms` }}
//                     >
//                         ₹xxxxx
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- 6. Main Assembly ---
// const PrizeDistribution: React.FC = () => {
//     const [isVisible, setIsVisible] = useState<boolean>(false);
//     const [csvData, setCsvData] = useState<ConstellationSegment[]>([]);
//     const sectionRef = useRef<HTMLElement | null>(null);

//     useEffect(() => {
//         const fetchConstellations = async () => {
//             try {
//                 const response = await fetch('/constellation_segments.csv');
//                 const text = await response.text();
//                 const lines = text.trim().split('\n');
//                 const headers = lines[0].split(',').map(h => h.trim());

//                 const parsed: ConstellationSegment[] = lines.slice(1).map(line => {
//                     const values = line.split(',');
//                     const row: Record<string, any> = {};
//                     headers.forEach((header, index) => {
//                         const val = values[index]?.trim();
//                         row[header] = isNaN(Number(val)) ? val : parseFloat(val);
//                     });
//                     return row as ConstellationSegment;
//                 });
//                 setCsvData(parsed);
//             } catch (error) {
//                 console.error("Failed to load constellation data");
//             }
//         };
//         fetchConstellations();
//     }, []);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setIsVisible(true);
//                     observer.unobserve(entry.target);
//                 }
//             },
//             { threshold: 0.2 }
//         );

//         if (sectionRef.current) observer.observe(sectionRef.current);
//         return () => observer.disconnect();
//     }, []);

//     // Poster Colors
//     const colorCream = "#fef08a"; // Center/Glow
//     const colorTeal = "#5eead4";  // Left
//     const colorSlate = "#cbd5e1"; // Right

//     return (
//         <section
//             id="prizes"
//             ref={sectionRef}
//             className="w-full py-24 md:py-40 min-h-screen flex flex-col items-center justify-center text-white relative z-30 overflow-hidden bg-transparent"
//         >
//             <style>{customStyles}</style>

//             {/* Cinematic Header */}
//             <div className="flex flex-col items-center mb-24 md:mb-32 z-10">
//                 <div className={`w-[1px] h-16 bg-gradient-to-b from-transparent to-white/30 mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 h-24' : 'opacity-0'}`}></div>
//                 <p className={`text-white/40 uppercase tracking-[0.5em] text-[10px] md:text-xs font-thin mb-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
//                     An Event By DJS Nova
//                 </p>
//                 <h2 className={`text-6xl md:text-8xl lg:text-9xl font-thin uppercase tracking-widest text-center transition-all duration-[1500ms] transform 
//                     ${isVisible ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 -translate-y-12 blur-sm'}`} 
//                     style={{ 
//                         background: `linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.3) 100%)`, 
//                         WebkitBackgroundClip: 'text', 
//                         WebkitTextFillColor: 'transparent',
//                         transform: 'scaleY(1.15)' 
//                     }}>
//                     Rewards
//                 </h2>
//             </div>

//             {/* The Data Monoliths Array */}
//             <div className="w-full max-w-[1400px] px-4 md:px-8 flex flex-col md:flex-row items-center justify-center md:items-center gap-12 md:gap-8 lg:gap-16 relative">

//                 <PrizeMonolith 
//                     title="2nd Place" subtitle="System Alignment" amount="₹xxxxx" color={colorTeal}
//                     delay={400} isVisible={isVisible} constellationData={csvData} constellationName="Cygnus"
//                 />

//                 <PrizeMonolith 
//                     title="1st Place" subtitle="Event Horizon" amount="₹xxxxx" color={colorCream}
//                     delay={100} isVisible={isVisible} isGrandPrize={true} constellationData={csvData} constellationName="Scorpius"
//                 />

//                 <div className="order-3 z-10 mt-16 md:mt-0 w-full flex justify-center">
//                     <PrizeMonolith 
//                         title="3rd Place" subtitle="Orbital Decay" amount="₹xxxxx" color={colorSlate}
//                         delay={600} isVisible={isVisible} constellationData={csvData} constellationName="Cancer"
//                     />
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default PrizeDistribution;



"use client";

import React, { useEffect, useState, useRef } from 'react';

// --- 1. TypeScript Interfaces ---
interface ConstellationSegment {
    constellation: string;
    ra1: number;
    dec1: number;
    ra2: number;
    dec2: number;
}

// --- 2. Advanced CSS for Orbital Mechanics & Glass Lenses ---
const customStyles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spin-slow-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes float-ethereal {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-15px) scale(1.02); }
  }
  @keyframes pulse-starlight {
    0%, 100% { opacity: 0.3; filter: blur(4px); }
    50% { opacity: 0.7; filter: blur(8px); }
  }
  
  /* The core glass lens effect */
  .astral-lens {
    background: radial-gradient(130% 130% at 30% 20%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.6) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 
      0 30px 60px rgba(0,0,0,0.6), 
      inset 0 0 30px rgba(255,255,255,0.05),
      inset 0 1px 1px rgba(255,255,255,0.3);
  }
  
  .animate-float-ethereal {
    animation: float-ethereal 8s ease-in-out infinite;
  }
`;

// --- 3. Constellation Plotter ---
const LensConstellation: React.FC<{ data: ConstellationSegment[], name: string, color: string }> = ({ data, name, color }) => {
    if (!data || data.length === 0) return null;
    const subset = data.filter((row) => row.constellation === name);
    if (subset.length === 0) return null;

    let minRa = Infinity, maxRa = -Infinity, minDec = Infinity, maxDec = -Infinity;
    subset.forEach((row) => {
        minRa = Math.min(minRa, row.ra1, row.ra2); maxRa = Math.max(maxRa, row.ra1, row.ra2);
        minDec = Math.min(minDec, row.dec1, row.dec2); maxDec = Math.max(maxDec, row.dec1, row.dec2);
    });

    const rangeRa = maxRa - minRa || 1; const rangeDec = maxDec - minDec || 1;
    const normalizedLines = subset.map((row) => ({
        x1: 90 - ((row.ra1 - minRa) / rangeRa) * 80, x2: 90 - ((row.ra2 - minRa) / rangeRa) * 80,
        y1: 90 - ((row.dec1 - minDec) / rangeDec) * 80, y2: 90 - ((row.dec2 - minDec) / rangeDec) * 80,
    }));

    return (
        <div className="absolute inset-0 flex items-center justify-center opacity-60 scale-125 mix-blend-screen pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {normalizedLines.map((line, index) => (
                    <React.Fragment key={index}>
                        <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke={color} strokeWidth="0.2" opacity="0.6" />
                        <circle cx={line.x1} cy={line.y1} r="0.6" fill={color} opacity="0.9" />
                        <circle cx={line.x2} cy={line.y2} r="0.6" fill={color} opacity="0.9" />
                    </React.Fragment>
                ))}
            </svg>
        </div>
    );
};

// --- 4. Rotating Geometric UI Rings ---
const OrbitalGeometry = ({ color, duration1, duration2 }: { color: string, duration1: string, duration2: string }) => (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center scale-110">
        {/* Inner dashed ring */}
        <svg className="absolute w-[105%] h-[105%] opacity-40" viewBox="0 0 100 100" style={{ animation: `spin-slow ${duration1} linear infinite` }}>
            <circle cx="50" cy="50" r="49" fill="none" stroke={color} strokeWidth="0.2" strokeDasharray="2 4" />
            <circle cx="50" cy="1" r="1.5" fill={color} />
        </svg>
        {/* Outer segmented ring */}
        <svg className="absolute w-[115%] h-[115%] opacity-20" viewBox="0 0 100 100" style={{ animation: `spin-slow-reverse ${duration2} linear infinite` }}>
            <circle cx="50" cy="50" r="49" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="30 10" />
            <path d="M 50 0 L 52 4 L 48 4 Z" fill={color} />
        </svg>
    </div>
);

// --- 5. The "Astral Portal" Component ---
const AstralPortal = ({ title, subtitle, amount, color, delay, isVisible, isGrandPrize = false, constellationData, constellationName, positionClasses = "" }: any) => {

    // Dynamic sizing: Decreased heavily for mobile, kept large for desktop
    const sizeClasses = isGrandPrize
        ? "w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[450px] lg:h-[450px]"
        : "w-[200px] h-[200px] md:w-[240px] md:h-[240px] lg:w-[320px] lg:h-[320px]";

    return (
        <div className={`relative flex flex-col items-center justify-center transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1)
            ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-24'}
            ${positionClasses}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* The Lens */}
            <div className={`relative rounded-full astral-lens animate-float-ethereal flex flex-col items-center justify-center overflow-hidden group ${sizeClasses}`}
                style={{ animationDelay: `${delay}ms` }}>

                {/* Constellation trapped in the lens */}
                <LensConstellation data={constellationData} name={constellationName} color={color} />

                {/* Content inside the lens */}
                <div className="relative z-10 flex flex-col items-center text-center">
                    <p className="text-white/60 font-thin uppercase tracking-[0.5em] text-[8px] md:text-[10px] lg:text-xs mb-2">
                        {subtitle}
                    </p>

                    {/* Scaled text for mobile */}
                    <h3 className={`font-thin uppercase tracking-[0.2em] mb-3 md:mb-4 lg:mb-6 
                        ${isGrandPrize ? 'text-2xl md:text-3xl lg:text-5xl' : 'text-lg md:text-xl lg:text-2xl'}`}
                        style={{ color: color, textShadow: `0 0 20px ${color}80` }}>
                        {title}
                    </h3>

                    <div className="w-10 h-[1px] mb-3 md:mb-4 lg:mb-6 opacity-30" style={{ backgroundColor: color }}></div>

                    {/* Scaled amounts for mobile */}
                    <div className={`font-light text-white transition-all duration-1000 ease-out tracking-widest
                        ${isGrandPrize ? 'text-3xl md:text-4xl lg:text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'text-xl md:text-2xl lg:text-4xl'}
                        ${isVisible ? 'opacity-100 blur-none' : 'opacity-0 blur-md'}`}
                        style={{ transitionDelay: `${delay + 600}ms` }}
                    >
                        {amount}
                    </div>
                </div>
            </div>

            {/* External Geometry Rings */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClasses} pointer-events-none`}>
                <OrbitalGeometry
                    color={color}
                    duration1={isGrandPrize ? "25s" : "20s"}
                    duration2={isGrandPrize ? "35s" : "28s"}
                />
            </div>
        </div>
    );
};

// --- 6. Main Assembly ---
const PrizeDistribution: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [csvData, setCsvData] = useState<ConstellationSegment[]>([]);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const fetchConstellations = async () => {
            try {
                const response = await fetch('/constellation_segments.csv');
                const text = await response.text();
                const lines = text.trim().split('\n');
                const headers = lines[0].split(',').map(h => h.trim());

                const parsed: ConstellationSegment[] = lines.slice(1).map(line => {
                    const values = line.split(',');
                    const row: Record<string, any> = {};
                    headers.forEach((header, index) => {
                        const val = values[index]?.trim();
                        row[header] = isNaN(Number(val)) ? val : parseFloat(val);
                    });
                    return row as ConstellationSegment;
                });
                setCsvData(parsed);
            } catch (error) {
                console.error("Failed to load constellation data");
            }
        };
        fetchConstellations();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15 } // Slightly lowered for mobile friendliness
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Poster Colors
    const colorCream = "#fef08a"; // Center/Glow (1st Place)
    const colorTeal = "#5eead4";  // Left (2nd Place)
    const colorSlate = "#cbd5e1"; // Right (3rd Place)

    return (
        <section
            id="prizes"
            ref={sectionRef}
            className="scroll-mt-32 w-full py-24 md:py-40 min-h-screen flex flex-col items-center justify-center text-white relative z-30 overflow-hidden bg-transparent"
        >
            <style>{customStyles}</style>

            {/* Background Master Ring */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] md:w-[120vw] md:h-[120vw] rounded-full border-[0.5px] border-white/5 transition-opacity duration-[3000ms] pointer-events-none ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Cinematic Header */}
            <div className="flex flex-col items-center mb-16 lg:mb-24 z-10">
                <p className={`text-white/40 uppercase tracking-[0.6em] md:tracking-[0.8em] text-[10px] md:text-xs font-thin mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    Mission Bounties
                </p>
                <h2 className={`text-5xl md:text-8xl lg:text-9xl font-thin uppercase tracking-[0.15em] text-center transition-all duration-[1500ms] transform 
                    ${isVisible ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 -translate-y-12 blur-sm'}`}
                    style={{
                        background: `linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.2) 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        transform: 'scaleY(1.2)'
                    }}>
                    Prize Pool
                </h2>
            </div>

            {/* The Astral Lenses Array */}
            <div className="w-full max-w-[1600px] px-4 flex flex-col lg:flex-row items-center justify-center relative">

                {/* 2ND PLACE - Order 2 on mobile, Order 1 on Desktop (Left) */}
                <AstralPortal
                    title="2nd Place" subtitle="Orbital Velocity" amount="₹4,500" color={colorTeal}
                    delay={400} isVisible={isVisible} constellationData={csvData} constellationName="Cygnus"
                    positionClasses="z-20 order-2 lg:order-1 mt-8 lg:mt-32"
                />

                {/* 1ST PLACE - Order 1 on mobile (Top), Order 2 on Desktop (Center) */}
                <AstralPortal
                    title="1st Place" subtitle="Event Horizon" amount="₹7,500" color={colorCream}
                    delay={100} isVisible={isVisible} isGrandPrize={true} constellationData={csvData} constellationName="Scorpius"
                    positionClasses="z-30 order-1 lg:order-2 mx-0 lg:-mx-8"
                />

                {/* 3RD PLACE - Order 3 on mobile (Bottom), Order 3 on Desktop (Right) */}
                <AstralPortal
                    title="3rd Place" subtitle="System Alignment" amount="₹3,000" color={colorSlate}
                    delay={700} isVisible={isVisible} constellationData={csvData} constellationName="Cancer"
                    positionClasses="z-10 order-3 lg:order-3 mt-8 lg:mt-32"
                />

            </div>
        </section>
    );
};

export default PrizeDistribution;