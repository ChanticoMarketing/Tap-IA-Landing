import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    CheckCircle2, MessageCircle, RefreshCw,
    ArrowUpRight, Leaf, Zap, ArrowDown,
    Shield, Sparkles, Plus
} from 'lucide-react';

// --- CONFIGURACIÓN DE ANIMACIÓN ---
const easeExpo = [0.16, 1, 0.3, 1];

// --- COMPONENTES ---

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center px-6 md:px-24 bg-[#FDFBF7] overflow-hidden">
            <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: easeExpo }}
                    >
                        <h1 className="text-[11vw] lg:text-[8.5vw] font-serif leading-[0.9] text-[#151413] tracking-tighter">
                            Paz <br />
                            <span className="italic text-[#8BA888] relative">
                                en cada
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "110%" }}
                                    transition={{ delay: 1, duration: 1.5 }}
                                    className="absolute -bottom-2 left-0 h-[2px] bg-[#8BA888]/30"
                                />
                            </span> <br />
                            Documento.
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-16 flex flex-col md:flex-row items-start md:items-center gap-12"
                    >
                        <button className="group relative px-14 py-6 bg-[#151413] text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                            <span className="relative z-10 font-medium text-lg flex items-center gap-3 text-white">
                                Comenzar Ritual <ArrowUpRight className="w-5 h-5 text-white" />
                            </span>
                        </button>
                        <p className="text-xl text-[#151413]/40 max-w-[320px] leading-relaxed font-light italic">
                            Donde la contabilidad se encuentra con la paz mental.
                        </p>
                    </motion.div>
                </div>

                <div className="lg:col-span-4 relative hidden lg:block">
                    <motion.div
                        initial={{ x: 100, opacity: 0, rotate: 5 }}
                        animate={{ x: 0, opacity: 1, rotate: 0 }}
                        transition={{ duration: 1.5, ease: easeExpo }}
                        className="w-full rounded-[1.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] overflow-hidden border border-stone-100"
                    >
                        <img
                            src="/images/demos/pagospro-hero.webp"
                            alt="Dashboard de facturación PagosPro"
                            className="w-full h-auto object-cover"
                            loading="eager"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const HorizontalRitual = () => {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);

    const chapters = [
        {
            id: "01",
            title: "Cero Fricción",
            desc: "El SAT ya no es un laberinto. Hemos simplificado la burocracia para que tu única tarea sea crear con total libertad.",
            Icon: Zap,
            bg: "bg-[#151413]",
            image: "/images/demos/pagospro-ritual-01.webp"
        },
        {
            id: "02",
            title: "Cobro Amable",
            desc: "Recordatorios inteligentes que mantienen tu relación con el cliente intacta. Elegancia y puntualidad.",
            Icon: MessageCircle,
            bg: "bg-[#1C1B1A]",
            image: "/images/demos/pagospro-ritual-02.webp"
        },
        {
            id: "03",
            title: "Claridad Pura",
            desc: "Tus finanzas destiladas en una interfaz que no te pide nada, solo te informa con calma y precisión absoluta.",
            Icon: Leaf,
            bg: "bg-[#0F0F0E]",
            image: "/images/demos/pagospro-ritual-03.webp"
        }
    ];

    return (
        <section id="sistema" ref={targetRef} className="relative h-[300vh] bg-[#151413]">
            {/* sticky top-12 para que se ancle debajo del header de retorno TAP-IA (48px = h-12) */}
            <div className="sticky top-12 h-[calc(100vh-48px)] flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex w-fit">
                    {chapters.map((chapter, i) => (
                        <div
                            key={i}
                            className={`w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-24 ${chapter.bg} border-l border-white/5`}
                        >
                            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-24 items-center">
                                <div className="space-y-12">
                                    <motion.div
                                        whileInView={{ rotate: 360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        className="w-24 h-24 rounded-3xl border border-[#8BA888]/20 flex items-center justify-center bg-white/5 backdrop-blur-sm"
                                    >
                                        <chapter.Icon className="w-10 h-10 text-[#8BA888]" />
                                    </motion.div>
                                    <div className="space-y-6">
                                        <span className="text-[#8BA888] font-serif italic text-3xl">Ritual {chapter.id}</span>
                                        <h2 className="text-7xl md:text-9xl font-serif text-white tracking-tighter leading-none">{chapter.title}</h2>
                                    </div>
                                    <p className="text-xl md:text-3xl text-white/30 font-light leading-relaxed max-w-xl">
                                        {chapter.desc}
                                    </p>
                                </div>
                                <div className="hidden md:flex justify-center relative">
                                    {chapter.image ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 1 }}
                                            className="w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-[#8BA888]/10"
                                        >
                                            <img
                                                src={chapter.image}
                                                alt={`Ritual ${chapter.id}`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 0.15, scale: 1 }}
                                            className="w-full aspect-square border-2 border-[#8BA888] rounded-full flex items-center justify-center"
                                        >
                                            <Plus className="w-20 h-20 text-[#8BA888]" />
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <div className="absolute bottom-12 left-12 right-12 h-[1px] bg-white/10 z-50">
                    <motion.div
                        style={{ scaleX: scrollYProgress }}
                        className="absolute inset-0 bg-[#8BA888] origin-left"
                    />
                </div>
            </div>
        </section>
    );
};

const PricingElite = () => {
    return (
        <section className="py-40 px-6 bg-[#FDFBF7] relative z-30">
            <div className="max-w-7xl mx-auto">
                <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-6 block">Inversión en Libertad</span>
                        <h2 className="text-6xl md:text-8xl font-serif text-[#151413] tracking-tighter leading-none">Precios Zen.</h2>
                    </div>
                    <div className="h-[1px] flex-grow bg-stone-200 mb-8 hidden md:block mx-12 opacity-50" />
                    <p className="text-2xl italic font-serif text-[#151413]/30">Sin fricción.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {[
                        { name: "Creativo Individual", price: "290", features: ["Facturas ilimitadas", "Conexión SAT Real-time", "1 Usuario"] },
                        { name: "Estudio de Diseño", price: "2,900", features: ["Multiusuarios", "Gestión de Equipo", "Soporte VIP"] }
                    ].map((plan, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -20, boxShadow: "0 50px 100px -30px rgba(0,0,0,0.08)" }}
                            className="bg-white p-12 md:p-20 rounded-[4rem] border border-stone-100 transition-all duration-700 flex flex-col justify-between h-[700px]"
                        >
                            <div className="space-y-16">
                                <h3 className="text-4xl font-serif text-[#151413]">{plan.name}</h3>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-9xl font-serif tracking-tighter text-[#151413]">{plan.price}</span>
                                    <span className="text-xs font-bold tracking-[0.3em] text-[#151413]/20 uppercase">MXN / Mes</span>
                                </div>
                                <ul className="space-y-8">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-center gap-6 text-stone-400 font-light text-lg">
                                            <div className="w-2 h-2 bg-[#8BA888] rounded-full" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="w-full py-8 bg-transparent border border-[#151413] rounded-full text-lg font-medium hover:bg-[#151413] hover:text-white transition-all duration-500 transform">
                                Adquirir Calma
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#FDFBF7] text-[#151413] selection:bg-[#8BA888]/20 font-sans scroll-smooth" style={{ overflowX: 'clip' }}>

            <AnimatePresence>
                {!isReady && (
                    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 bg-[#FDFBF7] z-[1000] flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-[#8BA888] border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="fixed top-12 w-full z-[50] px-10 py-8 flex justify-between items-center mix-blend-difference text-white">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-2.5 h-2.5 bg-[#8BA888] rounded-full group-hover:scale-[3] transition-transform duration-700" />
                    <span className="font-serif font-bold text-2xl tracking-tighter">PagosPro</span>
                </div>
                <div className="hidden md:flex gap-16 text-[10px] uppercase tracking-[0.5em] font-bold">
                    <a href="/demos/pagos-pro/sistema" className="hover:text-[#8BA888] transition-colors">Sistema</a>
                    <a href="/demos/pagos-pro/manifiesto" className="hover:text-[#8BA888] transition-colors">Manifiesto</a>
                    <a href="#precios" className="hover:text-[#8BA888] transition-colors border-b border-[#8BA888]/50 pb-1">Entrar</a>
                </div>
            </nav>

            <main>
                <Hero />

                <div className="h-40 flex items-center justify-center bg-[#FDFBF7]">
                    <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                        <ArrowDown className="text-[#8BA888] w-6 h-6 stroke-[1px]" />
                    </motion.div>
                </div>

                <HorizontalRitual />

                <PricingElite />
                <div id="precios"></div>

                <footer id="manifiesto" className="bg-[#0F0F0E] overflow-hidden text-white pt-32 pb-16 px-8 rounded-t-[6rem] relative z-40">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-32 items-end relative z-10">
                        <div className="space-y-16">
                            <h2 className="text-[12vw] md:text-[8vw] font-serif leading-[0.8] tracking-tighter text-white">
                                Tu tiempo <br />
                                <span className="italic text-[#8BA888]">es la obra</span>.
                            </h2>
                            <div className="flex gap-12 text-[10px] uppercase tracking-[0.6em] opacity-30 font-bold text-white">
                                <span>Ciudad de México</span>
                                <span>Estudio Zen 2026</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-16 text-right">
                            <motion.div
                                whileHover={{ rotate: 45 }}
                                className="w-48 h-48 bg-[#151413] rounded-full border border-white/5 flex items-center justify-center text-[10px] uppercase tracking-[0.3em] font-bold text-center p-8 leading-relaxed shadow-inner"
                            >
                                Paz Mental <br /> Garantizada
                            </motion.div>
                            <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">© 2026 PagosPro. Todos los derechos reservados.</p>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -left-10 text-[35vw] font-serif text-white/[0.04] pointer-events-none select-none leading-none">
                        ZEN
                    </div>
                </footer>
            </main>
        </div>
    );
}
