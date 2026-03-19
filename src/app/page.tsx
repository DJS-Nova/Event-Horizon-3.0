
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Starfield from "@/components/Starfield";
import FAQ from "@/components/FAQ";
import PrizeDistribution from "@/components/PrizeDistribution";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
const EventHorizon = dynamic(() => import('@/components/TimeLine'), { ssr: false });

const Intro = dynamic(() => import("@/components/Intro"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black z-200"></div>,
});

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      {/* Base black layer set to z-[-2] so it sits precisely behind the Starfield z-[-1] canvas */}
      <div className="fixed inset-0 bg-black z-[-2] pointer-events-none" />
      {showIntro && (
        <Intro onComplete={() => setShowIntro(false)} />
      )}
      {/* 1. Global Starfield Background at the lowest z-index */}
      {/* <div className="fixed inset-0 z-0 pointer-events-none"> */}
      <Starfield />
      {/* </div> */}

      <Navbar />

      {/* 2. Hero Section - z-index 20 covers the timeline canvas beneath it while at the top of the page */}
      <div className="relative z-20 bg-transparent min-h-screen w-full">
        <Hero />
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
