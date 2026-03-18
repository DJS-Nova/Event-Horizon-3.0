"use client";

import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-16 px-8 flex flex-col items-center justify-center bg-transparent border-t border-white/10 text-white relative z-30 mt-20">
            <div className="max-w-6xl w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                <div className="text-left font-thin">
                    <h2 className="text-3xl uppercase tracking-[0.3em] text-white">Event Horizon <span className="text-cyan-400">3.0</span></h2>
                    <p className="text-gray-400 mt-4 text-base max-w-sm leading-relaxed">
                        Pioneering the future of technology through collaborative problem solving and cosmic innovation. Join us to shape tomorrow.
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-8 font-thin text-base uppercase tracking-widest">
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors drop-shadow-md">Twitter</a>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors drop-shadow-md">Discord</a>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors drop-shadow-md">Instagram</a>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors drop-shadow-md">GitHub</a>
                </div>
            </div>
            
            <div className="w-full max-w-6xl mt-16 pt-8 border-t border-white/5 flex flex-col justify-center items-center text-sm text-gray-500 font-thin tracking-widest">
                <p>&copy; {new Date().getFullYear()} Event Horizon. Built for the stars.</p>
            </div>
        </footer>
    );
};

export default Footer;
