const Navbar = () => {
    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex gap-10 px-10 py-4 glass-morphism rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] items-center">
            {['Home', 'Timeline', 'FAQ', 'Team'].map((item) => (
                <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-white/60 hover:text-white text-sm font-semibold tracking-wider transition-all duration-500 relative group"
                >
                    {item}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-indigo-500 transition-all duration-500 group-hover:w-full rounded-full" />
                </a>
            ))}
        </nav>
    );
};

export default Navbar;
