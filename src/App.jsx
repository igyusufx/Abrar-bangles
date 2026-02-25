import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Components
import Loader from './components/Loader';
import Hero from './components/Hero';
import SalesGraph from './components/SalesGraph';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Testimonials from './components/Testimonials';
import Login from './components/Login';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const [loading, setLoading] = useState(true);

    // Global Interaction System: Lenis & Custom Cursor
    useEffect(() => {
        // Scroll Setup
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Custom Cursor Logic
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
            if (cursorRingRef.current) cursorRingRef.current.style.display = 'none';
            return;
        }

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }
        };

        const handleMouseDown = () => {
            if (cursorDotRef.current) {
                gsap.to(cursorDotRef.current, { scale: 0.6, duration: 0.2, ease: "power2.out" });
            }
        };

        const handleMouseUp = () => {
            if (cursorDotRef.current) {
                gsap.to(cursorDotRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
            }
        };

        // Render loop for the trailing ring
        const render = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            if (cursorRingRef.current) {
                cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            }
            requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        requestAnimationFrame(render);

        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-gradient-to-tr from-crimson to-ruby z-[10000] pointer-events-none mix-blend-exclusion"
            />
            <div
                ref={cursorRingRef}
                className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-crimson/30 z-[9999] pointer-events-none transition-transform duration-75"
            />

            {loading && <Loader onComplete={() => setLoading(false)} />}

            {!loading && (
                <main className="relative w-full overflow-hidden bg-obsidian selection:bg-crimson">
                    {/* Brand Brain / Business Intelligence
            <!-- BRAND BRAIN -->
            Business Profile: Luxury bridal accessories, B2C, high consideration.
            Customer Archetype: Modern bride seeking precision color-matching, high-end exclusive feeling, worried about quality/breakage.
            Psychological Lever: Scarcity / Exclusivity & Identity / Aspiration.
            Trust Signals: Master artisan storytelling, luxury packaging guarantee.
            Copy Tone: Serious, precise, zero exclamation marks, focus on symmetry and light.
            Animation Intensity: Dark & Cinematic (Moderate, smooth fades, elegant reveals).
          */}
                    <Hero />
                    <SalesGraph />
                    <Features />
                    <Philosophy />
                    <Testimonials />
                    <Login />
                    <FinalCTA />
                    <Footer />
                </main>
            )}
        </>
    );
}

export default App;
