import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
    {
        quote: "The deep crimson set matched my bridal lehenga with absolute perfection. The light reflection is unlike any glass I've ever seen.",
        author: "Sara M.",
        role: "Recent Bride",
        location: "London, UK"
    },
    {
        quote: "A completely different level of craftsmanship. They didn't just feel like accessories, they felt like art pieces on my wrists.",
        author: "Ayesha R.",
        role: "Boutique Owner",
        location: "Dubai, UAE"
    },
    {
        quote: "The velvet box alone told me this was luxury. But wearing them? The weight, the finish, the perfection. Simply breathtaking.",
        author: "Fatima K.",
        role: "Luxury Collector",
        location: "New York, USA"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const textRef = useRef(null);

    const handleNext = () => {
        if (!textRef.current) return;

        // Animate out
        gsap.to(textRef.current, {
            x: -60,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
                // Animate in
                gsap.fromTo(textRef.current,
                    { x: 60, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
                );
            }
        });
    };

    const handlePrev = () => {
        if (!textRef.current) return;

        // Animate out
        gsap.to(textRef.current, {
            x: 60,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
                // Animate in
                gsap.fromTo(textRef.current,
                    { x: -60, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
                );
            }
        });
    };

    const current = TESTIMONIALS[currentIndex];

    return (
        <section className="relative w-full py-32 bg-obsidian overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-16" ref={containerRef}>

                <div className="text-center font-display text-[8rem] text-crimson/20 leading-none h-24 select-none">
                    "
                </div>

                <div className="relative min-h-[300px] flex flex-col items-center justify-center mt-8">
                    <div ref={textRef} className="text-center">
                        <blockquote className="font-heading text-xl md:text-3xl text-white font-light max-w-4xl mx-auto leading-relaxed lg:leading-[1.4]">
                            {current.quote}
                        </blockquote>

                        <div className="mt-12">
                            <p className="font-display text-white text-2xl italic">{current.author}</p>
                            <p className="font-mono text-xs text-white/50 tracking-widest uppercase mt-2">
                                {current.role} • {current.location}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-6 mt-16">
                    <button
                        onClick={handlePrev}
                        className="p-4 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-crimson/50 transition-colors"
                        aria-label="Previous testimonial"
                    >
                        <ArrowLeft strokeWidth={1} />
                    </button>
                    <div className="flex gap-2">
                        {TESTIMONIALS.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-crimson' : 'w-2 bg-white/20'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className="p-4 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-crimson/50 transition-colors"
                        aria-label="Next testimonial"
                    >
                        <ArrowRight strokeWidth={1} />
                    </button>
                </div>
            </div>
        </section>
    );
}
