"use client";

import { useEffect, useState } from "react";

interface Meteor {
    id: number;
    left: string;
    top: string;
    delay: string;
    duration: string;
    size: string;
    opacity: number;
}

const MeteorShower = () => {
    const [meteors, setMeteors] = useState<Meteor[]>([]);

    useEffect(() => {
        // We generate the random values inside useEffect so it only happens 
        // on the client, preventing Next.js hydration mismatches.
        const generateMeteors = () => {
            const newMeteors = Array.from({ length: 5 }).map((_, i) => ({
                id: i,
                // Spawn randomly across the top and far right of the screen
                left: `${Math.random() * 150}vw`,
                top: `${Math.random() * -50 - 10}vh`,
                // Randomize timing so they don't fall all at once
                delay: `${Math.random() * 20}s`,
                duration: `${Math.random() * 3 + 4}s`, // Between 4s and 7s
                // Randomize the length of the tail
                size: `${Math.random() * 150 + 100}px`,
                // Randomize brightness
                opacity: Math.random() * 0.5 + 0.3,
            }));
            setMeteors(newMeteors);
        };

        generateMeteors();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
            {/* Inject custom animation keyframes */}
            <style>{`
                @keyframes shooting-star {
                    0% {
                        transform: translateX(0) translateY(0) rotate(-45deg);
                        opacity: 0;
                    }
                    5% {
                        opacity: 1;
                    }
                    100% {
                        /* Travel a long distance down and left */
                        transform: translateX(-3000px) translateY(3000px) rotate(-45deg);
                        opacity: 0;
                    }
                }
                .animate-shooting-star {
                    animation: shooting-star linear infinite;
                }
            `}</style>

            {meteors.map((meteor) => (
                <div
                    key={meteor.id}
                    className="absolute animate-shooting-star"
                    style={{
                        top: meteor.top,
                        left: meteor.left,
                        animationDelay: meteor.delay,
                        animationDuration: meteor.duration,
                        opacity: meteor.opacity,
                    }}
                >
                    {/* The Meteor */}
                    <div
                        className="relative h-[1px] bg-gradient-to-r from-white via-white/40 to-transparent"
                        style={{ width: meteor.size }}
                    >
                        {/* The glowing head of the meteor */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_15px_2px_rgba(255,255,255,1)]" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MeteorShower;