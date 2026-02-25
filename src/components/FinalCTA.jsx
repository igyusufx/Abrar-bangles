import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FinalCTA() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(containerRef.current, {
                scale: 0.95,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="relative w-full py-24 lg:py-48 bg-obsidian px-6 lg:px-16 flex justify-center">
            <div
                ref={containerRef}
                className="w-full max-w-7xl rounded-[3rem] overflow-hidden relative flex flex-col items-center justify-center text-center py-24 lg:py-32 px-6"
            >
                {/* Intense Red Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-crimson via-[#B91C1C] to-ruby z-0" />

                {/* Subtle noise over the gradient */}
                <div className="absolute inset-0 z-0 mix-blend-overlay opacity-30 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="font-display italic text-5xl sm:text-7xl lg:text-9xl text-white leading-none tracking-tight">
                        Discover Perfection.
                    </h2>
                    <p className="mt-8 font-heading text-white/90 text-lg lg:text-xl max-w-lg mb-12">
                        Your piece of flawless, handcrafted art awaits. Explore the full bridal and exclusivity collections today.
                    </p>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group overflow-hidden rounded-full bg-obsidian text-white px-10 py-5 font-heading font-medium tracking-wide text-sm transition-transform duration-300 hover:scale-105 active:scale-95 shadow-2xl relative cursor-pointer"
                    >
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                            Shop the Collection
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
