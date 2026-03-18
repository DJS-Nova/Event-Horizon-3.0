
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Starfield from "@/components/Starfield";
import FAQ from "@/components/FAQ";
import PrizeDistribution from "@/components/PrizeDistribution";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
const EventHorizon = dynamic(() => import('@/components/TimeLine'), { ssr: false });

const Intro = dynamic(() => import("@/components/Intro"), {
  ssr: false,
});

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative min-h-screen w-full bg-black">
      {showIntro && (
        <Intro onComplete={() => setShowIntro(false)} />
      )}
      {/* 1. Global Starfield Background at the lowest z-index */}
      {/* <div className="fixed inset-0 z-0 pointer-events-none"> */}
      <Starfield />
      {/* </div> */}

      {/* 2. Hero Section - z-index 20 covers the timeline canvas beneath it while at the top of the page */}
      <div className="bg-transparent min-h-screen w-full">
        <Hero />
        {/* Other sections can be added here later */}
      </div>

      {/* 3. Timeline Section - z-index 10. Its internal fixed canvas will wait under the hero section until scrolled. */}
      <div className="relative z-10 w-full bg-black/0">
        <EventHorizon />
      </div>

      {/* 4. Post-timeline Sections */}
      <div className="relative z-10 w-full bg-transparent flex flex-col items-center">
        <FAQ />
        <PrizeDistribution />
        <Footer />
      </div>
    </div>
  );
}