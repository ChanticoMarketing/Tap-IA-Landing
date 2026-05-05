import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Zap, Target, ShieldCheck, Activity } from 'lucide-react';

const easeExpo = [0.16, 1, 0.3, 1];

const FeatureShowcase = ({ number, title, desc, features, invert, image }) => (
    <div className={`py-32 px-6 md:px-24 ${invert ? 'bg-[#151413] text-white' : 'bg-[#FDFBF7] text-[#151413]'}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div className={`${invert ? 'order-2 md:order-1' : ''}`}>
                <span className={`text-[10px] uppercase tracking-[0.5em] font-bold ${invert ? 'text-[#8BA888]' : 'text-[#8BA888]'} mb-6 block`}>
                    Ritual {number}
                </span>
                <h2 className="text-5xl md:text-7xl font-serif tracking-tighter leading-none mb-8">{title}</h2>
                <p className={`text-xl font-light leading-relaxed mb-12 ${invert ? 'text-white/50' : 'text-[#151413]/50'}`}>
                    {desc}
                </p>
                <ul className="space-y-6">
                    {features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-4 text-lg">
                            <div className="mt-1"><ShieldCheck className="w-5 h-5 text-[#8BA888]" /></div>
                            <span>{feat}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`${invert ? 'order-1 md:order-2' : ''} relative`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: easeExpo }}
                    className={`aspect-square rounded-[3rem] overflow-hidden border ${invert ? 'border-white/10' : 'border-[#151413]/10'} flex items-center justify-center p-1 relative`}
                >
                    <div className="absolute inset-0 bg-[#8BA888]/5 backdrop-blur-3xl" />
                    {image ? (
                        <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover rounded-[2.8rem] relative z-10" />
                    ) : invert ? (
                        <Activity className="w-48 h-48 text-[#8BA888] opacity-20 relative z-10" />
                    ) : (
                        <Target className="w-48 h-48 text-[#8BA888] opacity-20 relative z-10" />
                    )}
                </motion.div>
            </div>
        </div>
    </div>
);

export default function PagosProSistema() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#FDFBF7] text-[#151413] selection:bg-[#8BA888]/20 font-sans overflow-x-hidden scroll-smooth">
            <AnimatePresence>
                {!isReady && (
                    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 bg-[#FDFBF7] z-[1000] flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-[#8BA888] border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="fixed top-12 w-full z-[50] px-10 py-8 flex justify-between items-center mix-blend-difference text-white">
                <a href="/demos/pagos-pro" className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-2.5 h-2.5 bg-[#8BA888] rounded-full group-hover:scale-[3] transition-transform duration-700" />
                    <span className="font-serif font-bold text-2xl tracking-tighter">PagosPro</span>
                </a>
                <div className="hidden md:flex gap-16 text-[10px] uppercase tracking-[0.5em] font-bold">
                    <span className="text-[#8BA888] border-b border-[#8BA888]/50 pb-1">Sistema</span>
                    <a href="/demos/pagos-pro/manifiesto" className="hover:text-[#8BA888] transition-colors">Manifiesto</a>
                    <a href="/demos/pagos-pro#precios" className="hover:text-[#8BA888] transition-colors">Entrar</a>
                </div>
            </nav>

            <main className="pt-48">
                <section className="px-6 md:px-24 mb-32 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: easeExpo }}
                    >
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-6 block">Arquitectura del Software</span>
                        <h1 className="text-6xl md:text-9xl font-serif text-[#151413] tracking-tighter leading-none mb-10">
                            Mecánica <br /><span className="italic text-[#8BA888]">Invisible.</span>
                        </h1>
                        <p className="text-2xl text-[#151413]/50 max-w-2xl font-light leading-relaxed">
                            PagosPro no es solo un software de facturación. Es un motor de crecimiento diseñado para operar en las sombras, eliminando fricción y recuperando horas de ancho de banda cognitivo para tu equipo creativo.
                        </p>
                    </motion.div>
                </section>

                <FeatureShowcase
                    number="01"
                    title="Facturación Háptica"
                    desc="Transformamos el proceso tributario del SAT en una experiencia de un solo toque. Reducción del 85% en el tiempo de emisión de comprobantes fiscales, con validación en tiempo real."
                    features={[
                        "Timbrado instantáneo y masivo CFDI 4.0",
                        "Auto-completado inteligente de datos fiscales",
                        "Sincronización bidireccional con el SAT"
                    ]}
                    invert={true}
                    image="/images/demos/pagospro-sistema-01.webp"
                />

                <FeatureShowcase
                    number="02"
                    title="Gestión Silk-Road"
                    desc="Un pipeline de cuentas por cobrar hiper-optimizado. Los recordatorios automáticos mantienen la cordialidad mientras aseguran un flujo de caja constante. ROI inmediato en cobranza recuperada."
                    features={[
                        "Secuencias de correo personalizadas y amables",
                        "Pasarelas de pago integradas (Stripe, SPEI)",
                        "Conciliación bancaria impulsada por IA"
                    ]}
                    invert={false}
                    image="/images/demos/pagospro-sistema-02.webp"
                />

                <FeatureShowcase
                    number="03"
                    title="Dashboard Zen"
                    desc="Toma de decisiones ejecutivas en segundos. Tu liquidez, proyecciones y estado tributario destilados en una interfaz prístina que elimina el ruido de los números crudos."
                    features={[
                        "Métricas clave en tiempo real (Cash Runway)",
                        "Proyección predictiva de impuestos",
                        "Reportes contables listos para auditoría"
                    ]}
                    invert={true}
                    image="/images/demos/pagospro-sistema-03.webp"
                />

                <section className="py-32 px-6 flex justify-center bg-[#FDFBF7]">
                    <a href="/demos/pagos-pro#precios" className="group relative px-14 py-6 bg-[#151413] text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl inline-block">
                        <span className="relative z-10 font-medium text-lg flex items-center gap-3 text-white">
                            Ver Planes <ArrowUpRight className="w-5 h-5 text-white" />
                        </span>
                    </a>
                </section>

            </main>
        </div>
    );
}
