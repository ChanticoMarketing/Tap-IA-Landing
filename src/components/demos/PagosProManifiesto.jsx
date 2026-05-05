import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const easeExpo = [0.16, 1, 0.3, 1];

export default function PagosProManifiesto() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#151413] text-white selection:bg-[#8BA888]/20 font-sans overflow-x-hidden scroll-smooth min-h-screen">
            <AnimatePresence>
                {!isReady && (
                    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 bg-[#151413] z-[1000] flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-[#8BA888] border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="fixed top-12 w-full z-[50] px-10 py-8 flex justify-between items-center text-white">
                <a href="/demos/pagos-pro" className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-2.5 h-2.5 bg-[#8BA888] rounded-full group-hover:scale-[3] transition-transform duration-700" />
                    <span className="font-serif font-bold text-2xl tracking-tighter">PagosPro</span>
                </a>
                <div className="hidden md:flex gap-16 text-[10px] uppercase tracking-[0.5em] font-bold">
                    <a href="/demos/pagos-pro/sistema" className="hover:text-[#8BA888] transition-colors">Sistema</a>
                    <span className="text-[#8BA888] border-b border-[#8BA888]/50 pb-1">Manifiesto</span>
                    <a href="/demos/pagos-pro#precios" className="hover:text-[#8BA888] transition-colors">Entrar</a>
                </div>
            </nav>

            <main className="pt-48 pb-32">
                <section className="px-6 md:px-24 mb-32 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: easeExpo }}
                    >
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-12 block text-center">Nuestra Filosofía</span>

                        <div className="space-y-16 font-serif text-3xl md:text-5xl leading-[1.3] text-white/90 tracking-tight">
                            <p>
                                Creemos que el trabajo administrativo es el enemigo silencioso de la <span className="text-[#8BA888] italic">creatividad humana</span>.
                            </p>

                            <p>
                                Cada minuto gastado conciliando facturas, persiguiendo pagos o navegando portales burócratas, es un minuto robado a tu verdadero propósito. Al arte. Al diseño. Al producto.
                            </p>

                            <p>
                                El software financiero moderno no debería requerir un manual, ni generar ansiedad. Debería ser tan claro como el agua y tan <span className="text-[#8BA888] italic">invisible como el aire</span>.
                            </p>

                            <p>
                                Por eso creamos PagosPro. No vendemos una herramienta contable. Vendemos ancho de banda cognitivo. Vendemos <span className="text-[#8BA888] italic">Paz Mental Garantizada.</span>
                            </p>
                        </div>

                        <div className="mt-24 pt-16 border-t border-white/10 flex flex-col items-center">
                            <h3 className="text-[8vw] md:text-[5vw] font-serif leading-[0.8] tracking-tighter text-white mb-12 text-center">
                                Tu tiempo <br />
                                <span className="italic text-[#8BA888]">es la obra</span>.
                            </h3>

                            <a href="/demos/pagos-pro#precios" className="group relative px-14 py-6 bg-white text-[#151413] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl inline-block mt-8">
                                <span className="relative z-10 font-medium text-lg flex items-center gap-3">
                                    Reclamar mi tiempo <ArrowUpRight className="w-5 h-5 text-[#151413]" />
                                </span>
                            </a>
                        </div>

                    </motion.div>
                </section>
            </main>
        </div>
    );
}
