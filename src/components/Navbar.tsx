"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

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

export default Navbar;
