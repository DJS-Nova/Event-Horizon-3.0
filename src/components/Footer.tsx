"use client";

import Image from 'next/image';
import React from 'react';

const Contact = () => {
    return (
        <footer id="contact" className="scroll-mt-32 w-full bg-black/50 backdrop-blur-xl border-t border-white/10 text-white mt-20 relative z-30 overflow-hidden">

            {/* ===== TOP SECTION ===== */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Brand */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl uppercase tracking-[0.3em] font-bold mb-4">
                        Event Horizon <span className="text-neutral-500">3.0</span>
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm">
                        Exploring the cosmos through curiosity, knowledge, and the evolution of space technology.
                    </p>
                </div>

                {/* Contact */}
                <div className="flex flex-col items-center md:items-start justify-center gap-4 text-neutral-400 text-sm tracking-widest font-medium">
                    <h2>Contact Us</h2>
                    <a href="mailto:djsnova09@gmail.com" className="hover:text-white transition flex items-center gap-3">
                        <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        djsnova09@gmail.com
                    </a>

                    <a href="tel:+919372727422" className="hover:text-white transition flex items-center gap-3">
                        <Image src="/icons/phone.png" alt="Phone" width={20} height={20} className="w-5 h-5 opacity-70" />
                        +91  7977127291
                    </a>
                </div>

                {/* Social */}
                <div className="flex flex-col md:items-end items-center gap-4 text-sm uppercase tracking-widest font-medium">
                    <h2>Social Media</h2>
                    {[
                        { name: 'X', url: 'https://x.com/djsnova04' },
                        { name: 'Instagram', url: 'https://www.instagram.com/djs.nova/' },
                        { name: 'LinkedIn', url: 'https://www.linkedin.com/company/djs-nova' }
                    ].map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-neutral-400 hover:text-white transition relative group"
                        >
                            <Image
                                src={`/icons/${link.name}.png`}
                                alt={link.name}
                                width={30}
                                height={30}
                                className="w-6 h-6 object-contain"
                            />
                            <span>{link.name}</span>

                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>
            </div>

            {/* ===== MAP SECTION ===== */}
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-[0_0_30px_rgba(255,255,255,0.02)] relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d942.5008219338905!2d72.8365954!3d19.1075117!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c676018b43%3A0x75f29a4205098f99!2sSVKM&#39;s%20Dwarkadas%20J.%20Sanghvi%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1773916574534!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale invert contrast-125 opacity-80 hover:opacity-100 transition duration-500"
                    />


                    <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
                </div>
            </div>

            {/* ===== BOTTOM SECTION ===== */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 mt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600 uppercase tracking-widest font-light">
                <p>&copy; {new Date().getFullYear()} Event Horizon. Built for the stars.</p>

                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-white transition">Privacy</a>
                    <span>|</span>
                    <a href="#" className="hover:text-white transition">Terms</a>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
