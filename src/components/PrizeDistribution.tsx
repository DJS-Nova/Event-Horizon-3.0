"use client";

import React from 'react';

const PrizeDistribution = () => {
    return (
        <section id="prizes" className="w-full py-32 min-h-screen flex flex-col items-center justify-center bg-transparent text-white relative z-30">
            <h2 className="text-5xl md:text-7xl mb-24 text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-600 uppercase tracking-widest font-thin text-center">
                Prize Distribution
            </h2>
            <div className="w-full max-w-5xl px-8 flex flex-col md:flex-row items-end justify-center gap-6">

                {/* 2nd Place */}
                <div className="w-full md:w-1/3 flex flex-col items-center order-2 md:order-1 select-none">
                    <div className="glass-morphism w-full p-8 rounded-t-3xl border border-gray-400/30 text-center shadow-[0_0_30px_rgba(192,192,192,0.1)] h-64 flex flex-col justify-end relative hover:-translate-y-2 transition-transform duration-500">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl drop-shadow-[0_0_10px_rgba(192,192,192,0.5)]">🥈</div>
                        <div>
                            <h3 className="text-3xl font-thin text-gray-300 mb-2 tracking-widest">2nd Place</h3>
                            <p className="text-gray-500 font-thin uppercase tracking-widest text-sm">Runner up</p>
                        </div>
                        <div className="text-4xl font-thin text-white mt-6">₹xxxxx</div>
                    </div>
                </div>

                {/* 1st Place */}
                <div className="w-full md:w-1/3 flex flex-col items-center order-1 md:order-2 z-10 select-none">
                    <div className="glass-morphism w-full p-8 rounded-t-3xl border border-yellow-500/50 text-center shadow-[0_0_50px_rgba(255,215,0,0.15)] h-80 flex flex-col justify-end relative bg-yellow-500/5 hover:-translate-y-4 transition-transform duration-500">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">👑</div>
                        <div>
                            <h3 className="text-4xl font-thin text-yellow-400 mb-2 tracking-widest">1st Place</h3>
                            <p className="text-yellow-600/70 font-thin uppercase tracking-widest text-sm">Grand Prize</p>
                        </div>
                        <div className="text-6xl font-thin text-white mt-8">₹xxxxx</div>
                    </div>
                </div>

                {/* 3rd Place */}
                <div className="w-full md:w-1/3 flex flex-col items-center order-3 md:order-3 select-none">
                    <div className="glass-morphism w-full p-8 rounded-t-3xl border border-orange-700/30 text-center shadow-[0_0_30px_rgba(205,127,50,0.1)] h-56 flex flex-col justify-end relative hover:-translate-y-2 transition-transform duration-500">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl drop-shadow-[0_0_10px_rgba(205,127,50,0.5)]">🥉</div>
                        <div>
                            <h3 className="text-2xl font-thin text-orange-400 mb-2 tracking-widest">3rd Place</h3>
                            <p className="text-orange-900/80 font-thin uppercase tracking-widest text-sm">Second Runner up</p>
                        </div>
                        <div className="text-3xl font-thin text-white mt-4">₹xxxxx</div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PrizeDistribution;
