"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Starfield from "@/components/Starfield";
import MeteorShower from "@/components/MeteorShower";
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
            <MeteorShower />
            {/* </div> */}
            <Navbar />

            {/* 2. Hero Section - z-index 20 covers the timeline canvas beneath it while at the top of the page */}
            <div className="relative z-20 bg-transparent min-h-screen w-full">
                <Hero />
                {/* Other sections can be added here later */}
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



const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = ['Home', 'Timeline', 'FAQ', 'Contact'];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [mobileMenuOpen]);

    return (
        <>
            <header className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 w-[95%] sm:w-[85%] max-w-5xl ${isScrolled ? 'top-4' : 'top-6 md:top-8'}`}>
                <nav className="flex items-center justify-between px-6 py-3 md:py-4 backdrop-blur-xl bg-black/50 border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

                    {/* Brand */}
                    <div className="text-white font-bold tracking-widest uppercase text-sm flex items-center gap-2 select-none">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        EH<span className="text-neutral-500">3.0</span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-neutral-400 hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300">
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <button className="px-5 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transition-all duration-300">
                            Register Now
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-white p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />}
                        </svg>
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-[90] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col gap-8 items-center text-center w-full px-6">
                    {navLinks.map((item, index) => (
                        <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} style={{ transitionDelay: `${index * 50}ms` }} className={`text-3xl font-light text-white tracking-[0.2em] uppercase transition-all duration-500 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            {item}
                        </a>
                    ))}
                    <button className={`mt-8 w-full max-w-[250px] px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all duration-500 delay-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        Register Now
                    </button>
                </div>
            </div>
        </>
    );
};

const Hero = () => {
    return (
        <div className="relative w-full min-h-screen bg-transparent flex flex-col items-center justify-center pt-20 pb-10 px-4 z-10">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="/blackhole.png"
                    alt="blackhole background"
                    className="w-full h-full object-cover opacity-60"
                    style={{
                        animation: "wobble 20s ease-in-out infinite"
                    }}
                />

                <style jsx global>{`
    @keyframes wobble {
      0%, 100% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(1.05) rotate(0.5deg); }
    }
  `}</style>
            </div>

            {/* Main Hero Content */}
            <div className="flex flex-col items-center text-center max-w-5xl relative z-10 w-full">

                {/* Event Status Badge */}
                <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span className="text-white/80 text-xs font-medium tracking-[0.2em] uppercase">Registration Open</span>
                </div>

                {/* Layered Typography */}
                <div className="relative mb-8">
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase leading-[0.9] text-white">
                        EVENT HORIZON
                    </h1>
                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tighter uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-neutral-600 mt-2">
                        EDITION 3.0
                    </h2>
                </div>

                <p className="text-neutral-400 text-sm md:text-lg font-light max-w-2xl leading-relaxed mb-10">
                    A premier 24-hour hackathon bringing together the brightest minds to solve the most pressing challenges in space tech, software, and beyond.
                </p>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-neutral-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                        Secure Your Spot
                    </button>
                    <button className="px-8 py-4 bg-transparent text-white font-bold uppercase tracking-widest text-sm rounded-xl border border-white/20 hover:border-white hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex justify-center items-center gap-2">
                        View Schedule <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
            </div>

            {/* Event Stats / Ticker (Adds that "Event Website" feel) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/10 pt-8">
                {[
                    { label: "Date", value: "Mar 15-16, 2026" },
                    { label: "Duration", value: "24 Hours" },
                    { label: "Location", value: "In-Person & Virtual" },
                    { label: "Prize Pool", value: "$5,000+" }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="text-white/40 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-1">{stat.label}</span>
                        <span className="text-white text-sm md:text-lg font-bold tracking-wider">{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { question: "What is Event Horizon 3.0?", answer: "Event Horizon 3.0 is a premier 24-hour hackathon bringing together the brightest minds to solve the most pressing challenges in space tech and beyond." },
        { question: "Who can participate?", answer: "Anyone with a passion for coding, design, or problem-solving. No prior experience is required! We welcome students, professionals, and space enthusiasts." },
        { question: "Is there a registration fee?", answer: "No, participation in Event Horizon 3.0 is completely free for all accepted attendees. We provide meals, swag, and infrastructure." },
        { question: "How large can a team be?", answer: "Teams can consist of 1 to 4 members. You can form teams before the event or find teammates during our dedicated teambuilding session." }
    ];

    return (
        <section id="faq" className="w-full py-24 md:py-32 flex flex-col items-center justify-center px-4 z-30 relative">
            <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12 lg:gap-24">

                {/* Section Header */}
                <div className="w-full md:w-1/3 flex flex-col">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
                        Mission <br className="hidden md:block" />Briefing
                    </h2>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        Everything you need to know before liftoff. Can't find your answer? Reach out to our comms team on Discord.
                    </p>
                </div>

                {/* Sleek Accordion */}
                <div className="w-full md:w-2/3 flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`group border rounded-2xl transition-all duration-300 cursor-pointer backdrop-blur-sm ${openIndex === index ? 'border-white/40 bg-white/5' : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'}`}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <div className="p-6 md:p-8 flex justify-between items-center gap-4">
                                <h3 className={`text-base md:text-lg font-medium tracking-wide transition-colors ${openIndex === index ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                    {faq.question}
                                </h3>
                                <div className={`relative w-6 h-6 shrink-0 transition-transform duration-500 rounded-full border border-white/20 flex items-center justify-center ${openIndex === index ? 'rotate-180 bg-white text-black border-white' : 'rotate-0 text-white'}`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                            <div className={`px-6 md:px-8 transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 pb-8 opacity-100' : 'max-h-0 opacity-0 overflow-hidden pb-0'}`}>
                                <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed pt-2">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PrizeDistribution = () => {
    return (
        <section id="prizes" className="w-full py-24 md:py-32 flex flex-col items-center justify-center px-4 z-30 relative">
            <div className="text-center mb-16 md:mb-24">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
                    Bounty Pool
                </h2>
                <p className="text-neutral-400 text-sm tracking-[0.2em] uppercase">Over $5,000 in prizes and hardware</p>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

                {/* 2nd Place */}
                <div className="order-2 md:order-1 relative group rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 text-center hover:border-white/30 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md">
                    <div className="mx-auto w-16 h-16 rounded-full bg-black border border-white/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        <span className="text-2xl font-bold text-neutral-300">2nd</span>
                    </div>
                    <h3 className="text-lg font-medium text-neutral-300 uppercase tracking-widest mb-1">Orbit Tier</h3>
                    <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-6">Runner Up</p>
                    <div className="text-4xl font-black text-white">₹xxxx</div>
                </div>

                {/* 1st Place - Emphasized */}
                <div className="order-1 md:order-2 relative group rounded-3xl border border-white/40 bg-gradient-to-b from-white/[0.08] to-transparent p-10 text-center hover:border-white transition-all duration-500 hover:-translate-y-4 backdrop-blur-md md:-mt-8 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)] rounded-3xl pointer-events-none" />
                    <div className="relative mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        <span className="text-3xl font-black text-black">1st</span>
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-1 relative">Supernova</h3>
                    <p className="text-xs text-neutral-400 uppercase tracking-[0.2em] mb-8 relative">Grand Prize</p>
                    <div className="text-6xl font-black text-white relative drop-shadow-md">₹xxxxx</div>
                </div>

                {/* 3rd Place */}
                <div className="order-3 md:order-3 relative group rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-8 text-center hover:border-white/30 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md">
                    <div className="mx-auto w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6">
                        <span className="text-xl font-bold text-neutral-500">3rd</span>
                    </div>
                    <h3 className="text-lg font-medium text-neutral-400 uppercase tracking-widest mb-1">Rover Tier</h3>
                    <p className="text-xs text-neutral-600 uppercase tracking-[0.2em] mb-6">Second Runner Up</p>
                    <div className="text-4xl font-black text-neutral-300">₹xxxxx</div>
                </div>

            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="w-full bg-black/80 backdrop-blur-2xl border-t border-white/10 text-white relative z-30 pt-20 pb-10">
            <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">

                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
                    See you in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">Orbit.</span>
                </h2>

                <button className="mb-20 px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-neutral-200 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                    Register For Event Horizon
                </button>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/10 pt-10 text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-xl font-bold tracking-widest uppercase mb-4">EH<span className="text-neutral-500">3.0</span></div>
                        <p className="text-neutral-500 text-xs font-light max-w-xs text-center md:text-left leading-relaxed">
                            Pioneering the future of technology through collaborative problem solving and cosmic innovation.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-3">
                        <span className="text-white font-bold text-xs uppercase tracking-widest mb-2">Connect</span>
                        {['Twitter', 'Discord', 'Instagram', 'GitHub'].map(link => (
                            <a key={link} href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">{link}</a>
                        ))}
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-3">
                        <span className="text-white font-bold text-xs uppercase tracking-widest mb-2">Legal</span>
                        <a href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="text-neutral-400 text-sm hover:text-white transition-colors">Code of Conduct</a>
                    </div>
                </div>

                <div className="w-full mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-neutral-600 uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} Event Horizon.</p>
                    <p className="mt-2 md:mt-0">Designed for the Stars.</p>
                </div>
            </div>
        </footer>
    );
};
