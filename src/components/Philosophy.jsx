import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Philosophy() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background
            gsap.to(bgRef.current, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            // Word-by-word reveal
            const words = textRef.current.querySelectorAll('.word');
            gsap.from(words, {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.04,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Split text into word spans for animation
    const splitText = (text, className = '') => {
        return text.split(' ').map((word, i) => (
            <span key={i} className={`word inline-block ${className}`}>{word}&nbsp;</span>
        ));
    };

    return (
        <section ref={sectionRef} className="relative w-full min-h-[80vh] bg-obsidian flex flex-col items-center justify-center overflow-hidden py-32 px-6 lg:px-16">

            {/* Dark Texture Parallax Background */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 opacity-[0.05]"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1549488344-c28de81f1bcf?q=80&w=2000&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '120%'
                }}
            />

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-32 items-end">

                <div className="w-full lg:w-1/3">
                    <p className="font-heading text-lg lg:text-xl text-white/50 leading-relaxed max-w-[300px]">
                        {splitText("Most jewelry brands focus on mass production and synthetic materials.")}
                    </p>
                </div>

                <div className="w-full lg:w-2/3" ref={textRef}>
                    <h2 className="font-display italic text-4xl sm:text-6xl lg:text-8xl text-white leading-[1.1] tracking-tight">
                        {splitText("We focus on ")}
                        <span className="text-crimson not-italic font-bold">flawless symmetry</span>
                        {splitText(" and ")}
                        <span className="text-ruby not-italic font-bold block mt-2">brilliant glass.</span>
                    </h2>
                </div>

            </div>
        </section>
    );
}
