import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SalesGraph() {
    const containerRef = useRef(null);
    const barsRef = useRef([]);
    const formRef = useRef(null);

    const [formData, setFormData] = useState({ name: '', email: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pinning the section
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: '+=50%', // Reduced scroll distance for faster unpinning
                pin: true,
                scrub: true,
            });

            // Animate bars individually based on scroll
            barsRef.current.forEach((bar, i) => {
                gsap.fromTo(bar,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: `top+=${i * 8}% center`,
                            end: `top+=${(i + 1) * 12}% center`,
                            scrub: 1,
                        }
                    }
                );
            });

            // Reveal Form
            gsap.from(formRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top+=50% center', // Start appearing halfway through the pin
                    toggleActions: 'play none none reverse'
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const data = [20, 45, 30, 80, 50, 95, 60, 110];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            console.log("Signup Data Recorded:", formData);
            setSubmitted(true);
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100vh] bg-white flex flex-col items-center justify-center overflow-hidden py-12 px-6 lg:px-16 z-20"
        >
            {/* Subtle Grid Background for Dashboard feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none opacity-50" />

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

                {/* Left Side: Modern Dashboard Graph */}
                <div className="w-full lg:w-2/3 bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-obsidian tracking-tight">
                                Market <span className="text-crimson italic">Resonance</span>
                            </h2>
                            <p className="font-heading text-gray-500 mt-2 text-sm uppercase tracking-widest">Bridal Collection Q1-Q8</p>
                        </div>
                        {/* Mock Data Badges */}
                        <div className="flex gap-4">
                            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-mono text-sm font-semibold">+ 42.5%</div>
                            <div className="bg-red-50 text-crimson px-4 py-2 rounded-full font-mono text-sm font-semibold shadow-sm">Live</div>
                        </div>
                    </div>

                    <div className="flex items-end justify-between w-full h-[350px] border-b-2 border-gray-100 pb-4 relative">

                        {/* Y Axis Guide Lines - Light Theme */}
                        <div className="absolute inset-x-0 bottom-1/4 h-px bg-gray-100" />
                        <div className="absolute inset-x-0 bottom-2/4 h-px bg-gray-100" />
                        <div className="absolute inset-x-0 bottom-3/4 h-px bg-gray-100" />
                        <div className="absolute inset-x-0 top-0 h-px bg-gray-100" />

                        {/* Bars */}
                        {data.map((val, i) => (
                            <div key={i} className="flex flex-col items-center w-1/12 group z-10">
                                <div className="w-full relative flex items-end justify-center" style={{ height: '300px' }}>
                                    <div
                                        ref={el => barsRef.current[i] = el}
                                        className="w-full sm:w-3/4 bg-gradient-to-t from-crimson to-[#f87171] rounded-t-md shadow-[0_5px_15px_rgba(220,38,38,0.2)] origin-bottom transition-all duration-300 group-hover:shadow-[0_10px_25px_rgba(220,38,38,0.4)] group-hover:w-full cursor-pointer"
                                        style={{ height: `${val}%` }}
                                    />
                                </div>
                                <span className="font-mono text-xs text-gray-400 mt-6 font-medium tracking-widest group-hover:text-crimson transition-colors">
                                    Q{i + 1}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Signup Form */}
                <div ref={formRef} className="w-full lg:w-1/3 bg-obsidian text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                    {/* Red accent flare */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-crimson rounded-full mix-blend-screen filter blur-[80px] opacity-60"></div>

                    <h3 className="font-display text-3xl mb-4 italic leading-tight">Request <br /><span className="not-italic text-crimson font-bold">Priority Access</span></h3>
                    <p className="font-heading text-sm text-gray-400 mb-8 leading-relaxed">
                        Join the registry to secure your allocation for the upcoming bridal release. Volumes are strictly limited.
                    </p>

                    {submitted ? (
                        <div className="bg-green-900/40 border border-green-500/30 rounded-xl p-6 text-center">
                            <svg className="w-12 h-12 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="font-heading font-medium text-white">Access Requested Successfully.</p>
                            <p className="text-sm text-gray-400 mt-2">Our concierge will contact you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                            <div>
                                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Private Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                                    placeholder="jane@example.com"
                                />
                            </div>
                            <button
                                type="submit"
                                className="group relative w-full overflow-hidden rounded-lg bg-white text-obsidian px-6 py-4 mt-4 font-heading font-bold tracking-wide text-sm transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer"
                            >
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Submit Request</span>
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg bg-gradient-to-r from-crimson to-ruby transition-transform duration-300 ease-out group-hover:scale-100" />
                            </button>
                            <p className="text-center text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-2 block">Secure encrypted connection</p>
                        </form>
                    )}
                </div>

            </div>
        </section>
    );
}
