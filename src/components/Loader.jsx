import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const tableRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Disable scrolling while loading
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = '';
                    onComplete();
                }
            });

            // Simulate loading progress
            const progressObj = { value: 0 };
            tl.to(progressObj, {
                value: 100,
                duration: 2.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    setProgress(Math.round(progressObj.value));
                }
            }, 0);

            // Table Graphics / Structural Grid Animation
            tl.fromTo('.grid-line-h',
                { scaleX: 0, transformOrigin: 'left' },
                { scaleX: 1, duration: 1.5, stagger: 0.1, ease: 'power3.inOut' },
                0
            );
            tl.fromTo('.grid-line-v',
                { scaleY: 0, transformOrigin: 'top' },
                { scaleY: 1, duration: 1.5, stagger: 0.1, ease: 'power3.inOut' },
                0.2
            );

            // Data cells lighting up
            tl.fromTo('.data-cell',
                { opacity: 0 },
                { opacity: 1, duration: 0.1, stagger: { each: 0.05, from: "random" }, ease: 'none' },
                1
            );

            // Final wipe out
            tl.to(textRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, 2.8);
            tl.to(tableRef.current, { opacity: 0, scale: 0.95, duration: 0.5, ease: 'power2.in' }, 2.9);
            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: 'power3.inOut'
            }, 3.1);

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[50000] bg-obsidian flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Table Graphics Background */}
            <div ref={tableRef} className="absolute inset-0 opacity-20 pointer-events-none flex flex-col justify-center items-center">
                <div className="w-[80vw] h-[60vh] relative border border-white/10 flex flex-col">
                    {/* Horizontal Lines */}
                    <div className="grid-line-h absolute top-1/4 w-full h-px bg-white/20"></div>
                    <div className="grid-line-h absolute top-2/4 w-full h-px bg-white/20"></div>
                    <div className="grid-line-h absolute top-3/4 w-full h-px bg-white/20"></div>

                    {/* Vertical Lines */}
                    <div className="grid-line-v absolute left-1/4 h-full w-px bg-white/20"></div>
                    <div className="grid-line-v absolute left-2/4 h-full w-px bg-white/20"></div>
                    <div className="grid-line-v absolute left-3/4 h-full w-px bg-white/20"></div>

                    {/* Matrix Data Simulation */}
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="flex flex-col p-4 justify-end">
                                <span className="data-cell text-white/30 font-mono text-[10px] uppercase tracking-widest block">
                                    DATA_{i.toString(16).padStart(4, '0')}
                                </span>
                                <span className="data-cell text-crimson/40 font-mono text-[10px] block mt-1">
                                    [SYS_OK]
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div ref={textRef} className="relative z-10 flex flex-col items-center text-center">
                <h1 className="font-display italic text-2xl lg:text-4xl text-white tracking-wider mb-2">
                    Abrar Bangles
                </h1>
                <div className="font-mono text-xs text-white/50 tracking-[0.3em] uppercase flex items-center gap-4">
                    <span>Initializing Sequence</span>
                    <span className="w-12 text-right text-crimson">{progress}%</span>
                </div>
                <div className="w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-crimson to-ruby transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
