import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { gsap } from 'gsap';
import { useRef as useReactRef } from 'react';
import * as THREE from 'three';
import { Sparkles } from 'lucide-react';

function RotatingGlassTorus() {
    const meshRef = useReactRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        // Slow, cinematic rotation
        meshRef.current.rotation.x = time * 0.15;
        meshRef.current.rotation.y = time * 0.2;
        // Gentle bobbing effect
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;

        // Slight mouse reactivity (lerped)
        const targetX = (state.pointer.x * Math.PI) / 8;
        const targetY = (state.pointer.y * Math.PI) / 8;

        meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.1;
        meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.1;
    });

    return (
        <mesh ref={meshRef}>
            <torusGeometry args={[1.5, 0.4, 64, 128]} />
            <MeshTransmissionMaterial
                backside
                samples={4}
                thickness={1}
                chromaticAberration={0.4}
                anisotropy={0.3}
                distortion={0.2}
                distortionScale={0.5}
                temporalDistortion={0.1}
                iridescence={0.8}
                iridescenceIOR={1.5}
                iridescenceThicknessRange={[100, 400]}
                color="#881337" // Ruby base color for transmission
                attenuationDistance={2}
                attenuationColor="#DC2626"
            />
        </mesh>
    );
}

export default function Hero() {
    const containerRef = useRef(null);
    const title1Ref = useRef(null);
    const title2Ref = useRef(null);
    const descRef = useRef(null);
    const btnRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial State
            gsap.set([title1Ref.current, title2Ref.current, descRef.current, btnRef.current], {
                opacity: 0,
                y: 50
            });
            gsap.set(canvasRef.current, { opacity: 0 });

            // 2. Load Sequence
            const tl = gsap.timeline({ delay: 0.5 }); // Wait for loader wipe out

            tl.to(canvasRef.current, {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out"
            }, 0);

            tl.to([title1Ref.current, title2Ref.current, descRef.current, btnRef.current], {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out"
            }, 0.5);

        }, containerRef);

        // Magnetic Button Effect
        const btn = btnRef.current;
        let btnHoverAnimation, btnLeaveAnimation;

        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btnHoverAnimation = gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out', overwrite: true });
        };

        const handleMouseLeave = () => {
            if (btnHoverAnimation) btnHoverAnimation.kill();
            btnLeaveAnimation = gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)', overwrite: true });
        };

        if (btn) {
            btn.addEventListener('mousemove', handleMouseMove);
            btn.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            ctx.revert();
            if (btn) {
                btn.removeEventListener('mousemove', handleMouseMove);
                btn.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-[100dvh] flex flex-col justify-center px-6 lg:px-16 overflow-hidden pt-12 pb-32">

            {/* Top Right Bridal Animation sync with design */}
            <div className="absolute top-8 right-8 lg:top-12 lg:right-16 z-30 opacity-70 flex items-center gap-4 pointer-events-none">
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.3em] hidden sm:block">Bridal Ateliers</span>
                <div className="relative w-10 h-10 flex items-center justify-center animate-[spin_15s_linear_infinite]">
                    <div className="absolute w-full h-full border border-crimson/40 rotate-45 rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.2)]"></div>
                    <div className="absolute w-full h-full border border-ruby/40 rotate-[22.5deg] rounded-sm shadow-[0_0_15px_rgba(136,19,55,0.2)]"></div>
                    <Sparkles strokeWidth={1} className="text-white/80 w-4 h-4 animate-pulse" />
                </div>
            </div>

            {/* 3D Background */}
            <div ref={canvasRef} className="absolute inset-0 z-0 select-none pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                    <ambientLight intensity={0.2} />
                    <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={2} color="#DC2626" />
                    <spotLight position={[-5, -10, -5]} angle={0.25} penumbra={1} intensity={2} color="#881337" />
                    <RotatingGlassTorus />
                    <Environment preset="city" />
                </Canvas>
            </div>

            {/* Heavy Red Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-ruby/20 via-transparent to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
                <h2 ref={title1Ref} className="font-display italic font-bold text-3xl sm:text-4xl lg:text-5xl tracking-widest text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] pb-4 lg:pb-6 relative flex flex-col items-center lg:items-start">
                    Abrar Bangles
                    <span className="w-20 h-px bg-crimson mt-4 block shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
                </h2>

                <h1 ref={title2Ref} className="font-display italic font-bold text-5xl sm:text-6xl lg:text-[7.5rem] leading-[1.05] text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    <span className="block text-crimson mb-2 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Precision</span>
                    Illuminated.
                </h1>

                <p ref={descRef} className="mt-8 font-heading text-white max-w-[480px] text-lg lg:text-xl font-medium leading-relaxed drop-shadow-md bg-obsidian/30 backdrop-blur-sm p-2 rounded">
                    An exclusive luxury boutique offering authentic, handcrafted glass designed for modern bridal wear and high-end fashion.
                </p>

                <div ref={btnRef} className="mt-10 lg:mt-16 inline-block">
                    <button
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                        className="group relative cursor-pointer overflow-hidden rounded-full bg-white text-obsidian px-10 py-5 font-heading font-medium tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)]"
                    >
                        <span className="relative z-10 pointer-events-none transition-colors duration-300 group-hover:text-transparent">Explore the Exclusive Collection</span>
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-full bg-gradient-to-r from-crimson to-ruby transition-transform duration-300 ease-out group-hover:scale-100 pointer-events-none" />
                        <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white pointer-events-none">
                            Explore the Exclusive Collection
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
