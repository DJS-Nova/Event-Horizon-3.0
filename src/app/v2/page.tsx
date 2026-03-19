"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Starfield from "@/components/Starfield";
import MeteorShower from "@/components/MeteorShower";
import Image from "next/image";
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

            {/* 3. Timeline Section - z-index 10. Its internal fixed canvas will wait under the hero section until scrolled. */}
            <div className="relative z-10 w-full bg-black/0">
                <EventHorizon />
            </div>

            {/* 4. Post-timeline Sections */}
            <div className="relative z-10 w-full bg-transparent flex flex-col items-center">
                <FAQ />
                <PrizeDistribution />
                <Contact />
            </div>
        </div>
    );
}

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = ['Home', 'Timeline', 'FAQ', 'Prizes', 'Contact'];

    // Optional: Adds a subtle shrink effect when the user scrolls down
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    return (
        <>
            {/* Desktop & Mobile Header Wrapper */}
            <header className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 w-[95%] sm:w-[90%] max-w-6xl ${isScrolled ? 'top-2 md:top-4' : 'top-4 md:top-8'}`}>
                <nav className="flex items-center justify-between px-6 py-2 md:px-8 md:py-3 backdrop-blur-md bg-black/40 border border-white/10 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.3)]">

                    {/* Brand / Logo (Left) */}
                    <div className="text-white font-black tracking-[0.2em] uppercase text-sm md:text-base select-none">
                        <Image src="/nova_logo.png" alt="Logo" width={50} height={50} />
                    </div>

                    {/* Desktop Links (Center) */}
                    <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-neutral-400 hover:text-white text-xs lg:text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300 relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Desktop Register Button (Right) */}
                    <div className="hidden md:block">
                        <button className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-neutral-300 hover:scale-105 transition-all duration-300">
                            Register Now
                        </button>
                    </div>

                    {/* Mobile Menu Toggle (Hamburger Icon) */}
                    <button
                        className="md:hidden text-white p-2 focus:outline-none hover:text-neutral-300 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                            )}
                        </svg>
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Full-Screen Overlay */}
            <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col gap-8 items-center text-center w-full px-6">
                    {navLinks.map((item, index) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ transitionDelay: `${index * 50}ms` }}
                            className={`text-2xl md:text-3xl font-light text-neutral-300 hover:text-white tracking-[0.2em] uppercase transition-all duration-500 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            {item}
                        </a>
                    ))}

                    <button
                        className={`mt-8 w-full max-w-[250px] px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all duration-500 delay-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        Register Now
                    </button>
                </div>
            </div>
        </>
    );
};

const Hero = () => {
    const titleText = "EVENT HORIZON 3.0";

    return (
        <div id="home" className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center text-white">
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
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl translate-y-[-5%]">

                {/* Title with sleek metallic/monochrome gradient */}
                <h1 className="text-5xl md:text-7xl lg:text-[8vw] font-black tracking-tighter uppercase leading-[1.1] md:leading-[0.9] mb-6
                    text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-500
                    drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                    {titleText}
                </h1>

                {/* Tagline */}
                <p className="text-neutral-400 text-sm md:text-xl tracking-[0.4em] uppercase font-light mb-12">
                    Beyond the singularity • <span className="text-white font-medium">March 2026</span>
                </p>

                {/* Call to Action Buttons - High Contrast */}
                <div className="flex flex-col sm:flex-row gap-6 items-center w-full sm:w-auto px-6">
                    <button className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 hover:bg-neutral-200 transition-all duration-300">
                        Register Now
                    </button>
                    <button className="w-full sm:w-auto px-10 py-4 bg-transparent text-white font-bold uppercase tracking-widest rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all duration-300">
                        View Schedule
                    </button>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-xs tracking-[0.3em] uppercase font-light">Descend</span>
                <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </div>

            {/* Aesthetic bottom vignette blending into the pure black */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-3" />
        </div>
    );
};

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
            <h2 className="text-4xl md:text-6xl lg:text-7xl mb-16 text-white uppercase tracking-[0.2em] font-black text-center px-4">
                Mission Briefing
            </h2>
            <div className="w-full max-w-4xl px-4 md:px-8 flex flex-col gap-4 md:gap-6">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`backdrop-blur-md rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer group
                            ${openIndex === index ? 'border-white/40 bg-white/10' : 'border-white/10 hover:border-white/30 hover:bg-white/[0.03]'}`}
                        onClick={() => toggleFaq(index)}
                    >
                        <div className="p-6 md:p-8 flex justify-between items-center gap-4">
                            <h3 className={`text-lg md:text-2xl font-light tracking-wide transition-colors duration-300 ${openIndex === index ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                                {faq.question}
                            </h3>
                            <div className={`relative w-6 h-6 shrink-0 transition-transform duration-500 ${openIndex === index ? 'rotate-180 text-white' : 'rotate-0 text-neutral-500'}`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                        <div
                            className={`px-6 md:px-8 transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 pb-8 opacity-100' : 'max-h-0 opacity-0 overflow-hidden pb-0'}`}
                        >
                            <p className="text-neutral-300 text-sm md:text-lg font-light leading-relaxed border-t border-white/10 pt-4">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const PrizeDistribution = () => {
    return (
        <section id="prizes" className="w-full py-32 min-h-screen flex flex-col items-center justify-center bg-transparent text-white relative z-30">
            <h2 className="text-4xl md:text-6xl lg:text-7xl mb-24 text-white uppercase tracking-[0.2em] font-black text-center px-4">
                Bounty Pool
            </h2>

            <div className="w-full max-w-6xl px-4 md:px-8 flex flex-col md:flex-row items-center md:items-end justify-center gap-8 md:gap-6">

                {/* 2nd Place - Silver Tier */}
                <div className="w-full max-w-[300px] md:w-1/3 flex flex-col items-center order-2 md:order-1 select-none hover:-translate-y-4 transition-transform duration-500">
                    <div className="w-full p-8 rounded-3xl border border-white/20 text-center shadow-[0_0_30px_rgba(255,255,255,0.02)] h-[300px] flex flex-col justify-end relative bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-4 bg-black rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            <svg className="w-10 h-10 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-light text-neutral-200 mb-1 tracking-[0.2em] uppercase">2nd Place</h3>
                            <p className="text-neutral-500 font-medium uppercase tracking-[0.3em] text-xs">Orbit</p>
                        </div>
                        <div className="text-5xl font-black text-white mt-6">
                            $1,500
                        </div>
                    </div>
                </div>

                {/* 1st Place - Pure White Tier */}
                <div className="w-full max-w-[340px] md:w-1/3 flex flex-col items-center order-1 md:order-2 z-10 select-none hover:-translate-y-6 transition-transform duration-500">
                    <div className="w-full p-8 rounded-3xl border border-white/50 text-center shadow-[0_0_50px_rgba(255,255,255,0.08)] h-[360px] flex flex-col justify-end relative bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md">
                        {/* Subtle pure white glow Behind Icon */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 p-5 bg-black rounded-full border border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-3xl font-light text-white mb-1 tracking-[0.2em] uppercase">1st Place</h3>
                            <p className="text-neutral-400 font-medium uppercase tracking-[0.3em] text-sm">Supernova</p>
                        </div>
                        <div className="text-6xl font-black text-white mt-8">
                            $3,000
                        </div>
                    </div>
                </div>

                {/* 3rd Place - Dark Space Tier */}
                <div className="w-full max-w-[300px] md:w-1/3 flex flex-col items-center order-3 md:order-3 select-none hover:-translate-y-4 transition-transform duration-500">
                    <div className="w-full p-8 rounded-3xl border border-white/10 text-center h-[280px] flex flex-col justify-end relative bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-sm">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 p-4 bg-black rounded-full border border-white/10">
                            <svg className="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-light text-neutral-400 mb-1 tracking-[0.2em] uppercase">3rd Place</h3>
                            <p className="text-neutral-600 font-medium uppercase tracking-[0.3em] text-xs">Rover</p>
                        </div>
                        <div className="text-4xl font-black text-neutral-300 mt-6">
                            $500
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <footer id="contact" className="w-full bg-black/50 backdrop-blur-xl border-t border-white/10 text-white mt-20 relative z-30 overflow-hidden">

            {/* ===== TOP SECTION ===== */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Brand */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl uppercase tracking-[0.3em] font-bold mb-4">
                        Event Horizon <span className="text-neutral-500">3.0</span>
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm">
                        Pioneering the future of technology through collaborative problem solving and cosmic innovation. Build the future, line by line.
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
                        +91 9372727422
                    </a>
                </div>

                {/* Social */}
                <div className="flex flex-col md:items-end items-center gap-4 text-sm uppercase tracking-widest font-medium">
                    <h2>Social Media</h2>
                    {['X', 'Instagram', 'LinkedIn'].map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="flex items-center gap-3 text-neutral-400 hover:text-white transition relative group"
                        >
                            <Image
                                src={`/icons/${link}.png`}
                                alt={link}
                                width={30}
                                height={30}
                                className="w-6 h-6 object-contain"
                            />
                            <span className="hidden md:inline">{link}</span>

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