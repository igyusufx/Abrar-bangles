export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-obsidian pt-16 pb-8 px-6 lg:px-16 rounded-t-[3.5rem] border-t border-white/5 mt-auto relative z-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">

                {/* Brand Column */}
                <div className="flex flex-col max-w-xs">
                    <h2 className="font-display italic text-3xl text-white mb-4">Abrar Bangles</h2>
                    <p className="font-heading text-sm text-white/50 leading-relaxed">
                        Authentic, handcrafted glass bangles for modern bridal wear and high-end fashion.
                    </p>

                    <div className="mt-8 flex items-center gap-3">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                            <div className="relative w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
                            Workshop Operational
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <div className="grid grid-cols-2 gap-12 sm:gap-24">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-heading font-bold text-white tracking-widest uppercase text-xs mb-2">Collection</h3>
                        <a href="#" className="font-heading text-sm text-white/60 hover:text-crimson transition-colors">Bridal Exclusives</a>
                        <a href="#" className="font-heading text-sm text-white/60 hover:text-crimson transition-colors">Evening Wear</a>
                        <a href="#" className="font-heading text-sm text-white/60 hover:text-crimson transition-colors">Wholesale</a>
                        <a href="#" className="font-heading text-sm text-white/60 hover:text-crimson transition-colors">Custom Orders</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-heading font-bold text-white tracking-widest uppercase text-xs mb-2">Company</h3>
                        <a href="#" className="font-heading text-sm text-white/60 hover:text-white transition-colors">Our Story</a>
                        <a href="#" className="font-heading text-sm text-white/60 hover:text-white transition-colors">Craftsmanship</a>
                        <a href="#" className="font-heading text-sm text-white/60 hover:text-white transition-colors">Contact</a>
                        <a href="#" className="font-heading text-sm text-white/60 hover:text-white transition-colors">FAQ</a>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-heading text-xs text-white/40">
                    &copy; {currentYear} Abrar Bangles. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <a href="#" className="font-heading text-xs text-white/40 hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="font-heading text-xs text-white/40 hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
