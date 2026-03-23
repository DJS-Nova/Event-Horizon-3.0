// "use client";

// import React, { useState } from 'react';

// const FAQ = () => {
//     const [openIndex, setOpenIndex] = useState<number | null>(null);

//     const faqs = [
//         { question: "What is Event Horizon 3.0?", answer: "Event Horizon 3.0 is a premier 24-hour hackathon bringing together the brightest minds to solve the most pressing challenges in space tech and beyond." },
//         { question: "Who can participate?", answer: "Anyone with a passion for coding, design, or problem-solving. No prior experience is required!" },
//         { question: "Is there a registration fee?", answer: "No, participation in Event Horizon 3.0 is completely free for all accepted attendees." },
//         { question: "How large can a team be?", answer: "Teams can consist of 1 to 4 members. You can form teams before the event or find teammates during the teambuilding session." }
//     ];

//     const toggleFaq = (index: number) => {
//         setOpenIndex(openIndex === index ? null : index);
//     };

//     return (
//         <section id="faq" className="w-full py-32 min-h-screen flex flex-col items-center justify-center bg-transparent text-white relative z-30">
//             <h2 className="text-5xl md:text-7xl mb-16 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 uppercase tracking-widest font-thin">
//                 F.A.Q
//             </h2>
//             <div className="w-full max-w-4xl px-8 flex flex-col gap-6">
//                 {faqs.map((faq, index) => (
//                     <div 
//                         key={index} 
//                         className={`glass-morphism rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.05)] hover:shadow-[0_0_25px_rgba(0,255,255,0.1)] transition-all duration-500 cursor-pointer`}
//                         onClick={() => toggleFaq(index)}
//                     >
//                         <div className="p-6 flex justify-between items-center">
//                             <h3 className="text-xl md:text-2xl text-cyan-300 font-thin tracking-wide">{faq.question}</h3>
//                             <span className="text-cyan-300 font-thin text-3xl">{openIndex === index ? "−" : "+"}</span>
//                         </div>
//                         <div 
//                             className={`px-6 transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
//                         >
//                             <p className="text-gray-300 text-sm md:text-lg font-thin leading-relaxed">{faq.answer}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default FAQ;





"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- 1. Custom Styles for the Terminal Aesthetic ---
const customStyles = `
  @keyframes scan-line {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .hud-line {
    position: relative;
    overflow: hidden;
  }
  .hud-line::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(94, 234, 212, 0.8), transparent);
    animation: scan-line 3s linear infinite;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .group.active .hud-line::after {
    opacity: 1;
  }
  
  /* Smooth Grid Animation for Accordions */
  .accordion-content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
  }
  .accordion-content.open {
    grid-template-rows: 1fr;
  }
`;

// --- 2. Enhanced FAQ Data ---
const faqs = [
    { id: "SYS.REQ.01", question: "What is Event Horizon 3.0?", answer: "Event Horizon 3.0 is a premier 24-hour hackathon bringing together the brightest minds to solve the most pressing challenges in space tech and beyond." },
    { id: "PRT.ELG.02", question: "Who can participate?", answer: "Anyone with a passion for coding, design, or problem-solving. No prior experience is required! We welcome all skill levels to join the mission." },
    { id: "FEE.STS.03", question: "Is there a registration fee?", answer: "No, participation in Event Horizon 3.0 is completely free for all accepted attendees. Your only investment is your time and creativity." },
    { id: "TM.FMT.04", question: "How large can a team be?", answer: "Teams can consist of 1 to 4 members. You can form teams before the event or find teammates during the orbital teambuilding session." }
];

// --- 3. Main Component ---
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    // Scroll reveal effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Colors matching the poster aesthetic
    const colorTeal = "#5eead4";

    return (
        <section
            id="faq"
            ref={sectionRef}
            className="scroll-mt-32 w-full py-4 md:py-40 flex flex-col items-center justify-center bg-transparent text-white relative z-30 overflow-hidden"
        >
            <style>{customStyles}</style>

            {/* Background Ambient Ring to tie into the Prize section */}
            <div className={`absolute top-0 right-0 w-[150vw] md:w-[80vw] h-[150vw] md:h-[80vw] rounded-full border-[0.5px] border-white/5 translate-x-1/3 -translate-y-1/3 pointer-events-none transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Cinematic Header */}
            <div className="flex flex-col items-center mb-12 md:mb-24 z-10 w-full px-4">
                <p className={`text-white/40 uppercase tracking-[0.4em] sm:tracking-[0.6em] md:tracking-[0.8em] text-[9px] sm:text-[10px] md:text-xs font-thin mb-4 transition-all duration-1000 delay-300 text-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    Knowledge Base
                </p>
                <h2 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin uppercase tracking-[0.15em] text-center transition-all duration-[1500ms] transform 
                    ${isVisible ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 -translate-y-8 blur-sm'}`}
                    style={{
                        background: `linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.3) 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        transform: 'scaleY(1.15)'
                    }}>
                    F.A.Q
                </h2>
            </div>

            {/* Terminal Data List */}
            <div className="w-full max-w-4xl px-4 md:px-8 flex flex-col relative z-10">

                {/* Top Border HUD line */}
                <div className={`w-full h-[1px] bg-white/10 mb-6 md:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 w-full' : 'opacity-0 w-0'}`}></div>

                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    const animDelay = 300 + (index * 150);

                    return (
                        <div
                            key={index}
                            className={`group border-b border-white/10 relative transition-all duration-[800ms] ease-out
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                ${isOpen ? 'active pb-4 md:pb-6' : 'hover:bg-white/[0.02]'}`}
                            style={{ transitionDelay: isVisible ? `${animDelay}ms` : '0ms' }}
                        >
                            {/* The Question Bar - Forced flex-row on mobile so icon stays on the right */}
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full py-5 md:py-6 flex flex-row items-center justify-between text-left focus:outline-none cursor-pointer relative z-10"
                            >
                                <div className="flex items-center gap-3 md:gap-8 pr-4">
                                    {/* Question Text - Scaled for mobile */}
                                    <h3 className={`text-base sm:text-lg md:text-2xl font-thin tracking-wider uppercase transition-colors duration-500 leading-snug
                                        ${isOpen ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-white/70 group-hover:text-white'}`}>
                                        {faq.question}
                                    </h3>
                                </div>

                                {/* High-tech Crosshair Toggle - Changed from 'hidden' to 'flex' and added 'shrink-0' so it doesn't compress */}
                                <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 relative opacity-70 md:opacity-50 group-hover:opacity-100 transition-opacity duration-500 shrink-0">
                                    <div className={`absolute w-[1px] h-full bg-current transition-transform duration-500 ${isOpen ? 'rotate-90 bg-teal-300' : 'bg-white'}`}></div>
                                    <div className={`absolute w-full h-[1px] bg-current transition-colors duration-500 ${isOpen ? 'bg-teal-300' : 'bg-white'}`}></div>
                                </div>
                            </button>

                            {/* The Answer */}
                            <div className={`accordion-content ${isOpen ? 'open opacity-100' : 'opacity-0'}`}>
                                <div className="overflow-hidden">
                                    {/* HUD Scanning Line */}
                                    <div className="hud-line w-full"></div>

                                    {/* Adjusted padding for mobile text */}
                                    <div className="pt-3 pb-2 md:pt-4 md:pl-[1rem] md:pr-4">
                                        {/* Minimalist divider */}
                                        <div className="w-6 md:w-8 h-[1px] mb-3 md:mb-4 opacity-40" style={{ backgroundColor: colorTeal }}></div>

                                        <p className="text-slate-300 text-sm md:text-base font-light tracking-wide leading-relaxed"
                                            style={{ transform: isOpen ? 'translateY(0)' : 'translateY(-10px)', transition: 'transform 0.5s ease-out' }}>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FAQ;