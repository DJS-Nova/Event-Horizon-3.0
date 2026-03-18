"use client";

import React, { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { question: "What is Event Horizon 3.0?", answer: "Event Horizon 3.0 is a premier 24-hour hackathon bringing together the brightest minds to solve the most pressing challenges in space tech and beyond." },
        { question: "Who can participate?", answer: "Anyone with a passion for coding, design, or problem-solving. No prior experience is required!" },
        { question: "Is there a registration fee?", answer: "No, participation in Event Horizon 3.0 is completely free for all accepted attendees." },
        { question: "How large can a team be?", answer: "Teams can consist of 1 to 4 members. You can form teams before the event or find teammates during the teambuilding session." }
    ];

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="w-full py-32 min-h-screen flex flex-col items-center justify-center bg-transparent text-white relative z-30">
            <h2 className="text-5xl md:text-7xl mb-16 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 uppercase tracking-widest font-thin">
                F.A.Q
            </h2>
            <div className="w-full max-w-4xl px-8 flex flex-col gap-6">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`glass-morphism rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.05)] hover:shadow-[0_0_25px_rgba(0,255,255,0.1)] transition-all duration-500 cursor-pointer`}
                        onClick={() => toggleFaq(index)}
                    >
                        <div className="p-6 flex justify-between items-center">
                            <h3 className="text-xl md:text-2xl text-cyan-300 font-thin tracking-wide">{faq.question}</h3>
                            <span className="text-cyan-300 font-thin text-3xl">{openIndex === index ? "−" : "+"}</span>
                        </div>
                        <div 
                            className={`px-6 transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                        >
                            <p className="text-gray-300 text-sm md:text-lg font-thin leading-relaxed">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
