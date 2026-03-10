
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Intro = dynamic(() => import("@/components/Intro"), {
  ssr: false,
});

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="relative min-h-screen bg-black text-white">
      {showIntro && (
        <Intro onComplete={() => setShowIntro(false)} />
      )}

      <div
        className={`transition-opacity duration-1000 ${showIntro ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          }`}
      >
        <div className="container mx-auto p-10 pt-20">
          <h1 className="text-4xl font-bold">
            Welcome to the Main Page
          </h1>

          <p className="mt-4 text-gray-400">
            The galaxy intro has finished, and now you can explore.
          </p>
        </div>
      </div>
    </main>
  );
}