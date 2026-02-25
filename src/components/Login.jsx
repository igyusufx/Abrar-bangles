import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.from(containerRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%"
            }
        });
    }, []);

    return (
        <section className="relative w-full py-24 lg:py-32 bg-obsidian px-6 lg:px-16 flex justify-center overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-ruby rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none" />

            <div ref={containerRef} className="w-full max-w-md relative z-10">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
                    <div className="text-center mb-10">
                        <h2 className="font-display italic text-3xl sm:text-4xl text-white mb-2">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="font-heading text-white/50 text-sm">
                            {isLogin
                                ? "Access your exclusive Abrar Bangles portfolio."
                                : "Join the registry for priority collection access."}
                        </p>
                    </div>

                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        {!isLogin && (
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                                    placeholder="Jane Doe"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                                placeholder="jane@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-lg bg-white text-obsidian px-6 py-4 mt-2 font-heading font-bold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_40px_-5px_rgba(220,38,38,0.8)] hover:-translate-y-1 cursor-pointer"
                        >
                            <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-12">
                                {isLogin ? "Sign In" : "Register"}
                            </span>
                            <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-12 transition-transform duration-300 group-hover:translate-y-0 text-white font-bold">
                                {isLogin ? "Sign In" : "Register"}
                            </span>
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg bg-gradient-to-r from-crimson to-ruby transition-transform duration-500 ease-in-out group-hover:scale-100" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="font-heading text-sm text-white/50">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-2 text-white hover:text-crimson transition-colors font-semibold"
                            >
                                {isLogin ? "Register" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
