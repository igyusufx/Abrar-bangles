import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Eagerly load Loader and Hero for instant first-paint
import Loader from './components/Loader';
import Hero from './components/Hero';

// Lazy-load all below-the-fold components to unblock initial render
const SalesGraph = lazy(() => import('./components/SalesGraph'));
const Features = lazy(() => import('./components/Features'));
const Philosophy = lazy(() => import('./components/Philosophy'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Login = lazy(() => import('./components/Login'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));
const Footer = lazy(() => import('./components/Footer'));

gsap.registerPlugin(ScrollTrigger);

function App() {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // --- Smooth Scroll: new Lenis v1 API ---
        const lenis = new Lenis({
            duration: 0.9,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.5,
            infinite: false,
        });

        lenis.on('scroll', ScrollTrigger.update);

        // Tie Lenis to GSAP ticker for perfect frame sync
        const updateLenis = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        // --- Custom Cursor: GPU-only, no RAF loop ---
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
            if (cursorRingRef.current) cursorRingRef.current.style.display = 'none';
        } else {
            // Dot follows the mouse instantly (no lag)
            const handleMouseMove = (e) => {
                if (cursorDotRef.current) {
                    cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
                }
                // Ring follows with GSAP lerp — smooth and uses GPU
                gsap.to(cursorRingRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5,
                    ease: 'power3.out',
                    overwrite: true,
                });
            };

            const handleMouseDown = () => {
                gsap.to(cursorDotRef.current, { scale: 0.5, duration: 0.15, ease: 'power2.out' });
                gsap.to(cursorRingRef.current, { scale: 1.5, opacity: 0.5, duration: 0.15, ease: 'power2.out' });
            };

            const handleMouseUp = () => {
                gsap.to(cursorDotRef.current, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
                gsap.to(cursorRingRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
            };

            window.addEventListener('mousemove', handleMouseMove, { passive: true });
            window.addEventListener('mousedown', handleMouseDown, { passive: true });
            window.addEventListener('mouseup', handleMouseUp, { passive: true });

            window.__cursorCleanup = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }

        return () => {
            lenis.destroy();
            gsap.ticker.remove(updateLenis);
            if (window.__cursorCleanup) window.__cursorCleanup();
        };
    }, []);

    return (
        <>
            {/* Custom Cursor (Desktop Only) */}
            <div
                ref={cursorDotRef}
                style={{ willChange: 'transform' }}
                className="fixed top-0 left-0 w-2.5 h-2.5 -ml-1.5 -mt-1.5 rounded-full bg-gradient-to-tr from-crimson to-ruby z-[10000] pointer-events-none mix-blend-exclusion"
            />
            <div
                ref={cursorRingRef}
                style={{ willChange: 'transform' }}
                className="fixed top-0 left-0 w-9 h-9 -ml-4.5 -mt-4.5 rounded-full border border-crimson/50 z-[9999] pointer-events-none"
            />

            {loading && <Loader onComplete={() => setLoading(false)} />}

            {!loading && (
                <main className="relative w-full overflow-hidden bg-obsidian selection:bg-crimson/30 selection:text-white">
                    <Hero />
                    <Suspense fallback={null}>
                        <SalesGraph />
                        <Features />
                        <Philosophy />
                        <Testimonials />
                        <Login />
                        <FinalCTA />
                        <Footer />
                    </Suspense>
                </main>
            )}
        </>
    );
}

export default App;
