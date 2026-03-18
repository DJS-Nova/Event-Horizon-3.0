"use client";

import React from 'react';
import Starfield from '@/components/Starfield';
import { Canvas } from '@react-three/fiber';

export default function StarsPage() {
    return (
        <main className="relative min-h-screen w-full bg-black">
            {/* Background Image with 90% opacity */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'url("/image2.jpg")',
                    backgroundSize: '100% auto',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'repeat',
                    opacity: 0.40
                }}
            />

            {/* Content / Overlay */}
            <div className="relative z-10 w-full h-[200vh]">


                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <h1 className="text-6xl font-black tracking-tighter text-white uppercase opacity-80">
                        Cosmic Horizon
                    </h1>
                    <p className="text-white/50 mt-4 tracking-widest uppercase text-sm">
                        Exploring the depths of the universe
                    </p>
                </div>
            </div>

            {/* Bottom vignette */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
        </main>
    );
}
