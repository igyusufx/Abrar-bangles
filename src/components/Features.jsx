import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const DIAGNOSTIC_DATA = [
    "100% Authentic Glass",
    "Master Artisan Forged",
    "Flawless Symmetry",
    "Kiln Fired Brilliance"
];

const TELEMETRY_MESSAGES = [
    "Formulating Crimson Base...",
    "Precision Matching Bridal Tones...",
    "Testing Light Refraction...",
    "Curing at Optimal Temp...",
];

function DiagnosticShuffler() {
    const [items, setItems] = useState([0, 1, 2]);
    const containerRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prev => {
                const next = [...prev];
                next.push((next[next.length - 1] + 1) % DIAGNOSTIC_DATA.length);
                next.shift();
                return next;
            });

            // 3D Flip animation
            if (containerRef.current) {
                gsap.fromTo(containerRef.current.children,
                    { rotationX: 20, opacity: 0, y: 10 },
                    { rotationX: 0, opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' }
                );
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col justify-center">
            <h3 className="font-heading font-bold text-white mb-2 tracking-wide">Diagnostic Shuffler</h3>
            <p className="font-heading text-sm text-white/50 mb-6">Precision-crafted authenticity.</p>

            <div ref={containerRef} className="space-y-3" style={{ perspective: '800px' }}>
                {items.map((dataIndex, i) => (
                    <div key={`${i}-${dataIndex}`} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/10">
                        <span className="font-mono text-xs text-white/70 uppercase tracking-wider">{DIAGNOSTIC_DATA[dataIndex]}</span>
                        <div className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function TelemetryTypewriter() {
    const [text, setText] = useState('');
    const [status, setStatus] = useState('LIVE');
    const msgIndex = useRef(0);
    const charIndex = useRef(0);

    useEffect(() => {
        let timeout;

        const scramble = (callback) => {
            let scrambles = 0;
            setStatus('SCRAMBLING');
            const scrambleInterval = setInterval(() => {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
                const randomStr = Array(15).fill(0).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
                setText(randomStr);
                scrambles++;
                if (scrambles > 10) {
                    clearInterval(scrambleInterval);
                    setStatus('TYPING');
                    setText('');
                    callback();
                }
            }, 40);
        };

        const type = () => {
            const currentMsg = TELEMETRY_MESSAGES[msgIndex.current];
            if (charIndex.current < currentMsg.length) {
                setText(prev => prev + currentMsg.charAt(charIndex.current));
                charIndex.current++;
                timeout = setTimeout(type, 30); // 30ms per char
            } else {
                setStatus('LIVE');
                timeout = setTimeout(() => {
                    charIndex.current = 0;
                    msgIndex.current = (msgIndex.current + 1) % TELEMETRY_MESSAGES.length;
                    scramble(type);
                }, 3000);
            }
        };

        type();

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="h-full flex flex-col justify-between">
            <div>
                <h3 className="font-heading font-bold text-white mb-2 tracking-wide">Telemetry Feed</h3>
                <p className="font-heading text-sm text-white/50 mb-6">Deep, striking color palettes.</p>
            </div>

            <div className="bg-obsidian/80 p-4 rounded-xl border border-white/5 font-mono text-xs text-crimson h-[120px] flex flex-col justify-between">
                <div className="break-words leading-relaxed">
                    {`> ${text}`}
                    <span className="inline-block w-2 h-4 bg-crimson ml-1 animate-pulse align-middle" />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/30 self-end mt-4 uppercase">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    {status}
                </div>
            </div>
        </div>
    );
}

function SignalGraph() {
    const pathRef = useRef(null);

    useEffect(() => {
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

            gsap.to(pathRef.current, {
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: pathRef.current,
                    start: "top 80%",
                }
            });
        }
    }, []);

    return (
        <div className="h-full flex flex-col justify-between">
            <div>
                <h3 className="font-heading font-bold text-white mb-2 tracking-wide">Quality Signal</h3>
                <p className="font-heading text-sm text-white/50 mb-6">Uncompromising packaging durability.</p>
            </div>

            <div className="relative w-full h-[120px] bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden flex items-end px-2 pb-2">
                {/* Grid lines */}
                <div className="absolute inset-x-0 bottom-1/3 h-px bg-white/5" />
                <div className="absolute inset-x-0 bottom-2/3 h-px bg-white/5" />

                <svg viewBox="0 0 200 80" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <path
                        ref={pathRef}
                        d="M 0 70 Q 20 65, 40 40 T 80 50 T 120 20 T 160 30 T 200 10"
                        fill="none"
                        stroke="#DC2626"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                    {/* Glowing dots at data points */}
                    <circle cx="40" cy="40" r="2" fill="#fff" className="animate-pulse shadow-[0_0_10px_#fff]" />
                    <circle cx="80" cy="50" r="2" fill="#fff" className="animate-pulse shadow-[0_0_10px_#fff]" />
                    <circle cx="120" cy="20" r="2" fill="#fff" className="animate-pulse shadow-[0_0_10px_#fff]" />
                    <circle cx="160" cy="30" r="2" fill="#fff" className="animate-pulse shadow-[0_0_10px_#fff]" />
                    <circle cx="200" cy="10" r="2" fill="#fff" className="animate-pulse shadow-[0_0_10px_#fff]" />
                </svg>
            </div>
        </div>
    );
}

export default function Features() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="relative w-full py-24 lg:py-32 bg-obsidian z-20">
            <div
                ref={containerRef}
                className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <div className="feature-card bg-[rgba(17,17,17,0.7)] backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl h-[380px]">
                    <DiagnosticShuffler />
                </div>

                <div className="feature-card bg-[rgba(17,17,17,0.7)] backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl h-[380px] md:mt-12">
                    <TelemetryTypewriter />
                </div>

                <div className="feature-card bg-[rgba(17,17,17,0.7)] backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl h-[380px] md:mt-24">
                    <SignalGraph />
                </div>
            </div>
        </section>
    );
}
