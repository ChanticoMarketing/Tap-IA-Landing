import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, MapPin, Building2, Leaf, Info, ChevronDown, Maximize, BedDouble, Star, X } from 'lucide-react';

// ==========================================
// 1. HOOKS Y UTILIDADES AVANZADAS (FÍSICAS)
// ==========================================

// Hook para Mouse Position optimizado con throttling básico
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const requestRef = useRef();

    useEffect(() => {
        const updateMousePosition = (e) => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            requestRef.current = requestAnimationFrame(() => {
                setMousePosition({ x: e.clientX, y: e.clientY });
            });
        };
        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);
    return mousePosition;
};

// Componente: Botón Magnético (Awwwards staple)
const MagneticButton = ({ children, primary = true, onClick, className = '' }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 }); // Intensidad magnética
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    const { x, y } = position;
    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onClick={onClick}
            className={`relative overflow-hidden rounded-full group flex items-center justify-center gap-4 px-10 py-5 uppercase tracking-[0.2em] text-xs font-bold transition-colors duration-500 ${primary ? 'bg-stone-900 text-stone-50 hover:bg-black' : 'border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-stone-50'
                } ${className}`}
        >
            <span className="relative z-10 flex items-center gap-3">
                {children} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
        </motion.button>
    );
};

// Componente: Imagen con Parallax y Reveal (Adaptado para Smooth Scroll)
const ParallaxImage = ({ src, alt, height = "h-[70vh]" }) => {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const [scrollRange, setScrollRange] = useState([0, 1000]);

    useEffect(() => {
        const updateRange = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                // Al estar en un contenedor con transform (SmoothScroll), calculamos su top real sumando el scroll actual
                const absoluteTop = rect.top + window.scrollY;
                setScrollRange([absoluteTop - window.innerHeight, absoluteTop + rect.height]);
            }
        };
        setTimeout(updateRange, 100); // Pequeño delay para asegurar render
        window.addEventListener("resize", updateRange);
        return () => window.removeEventListener("resize", updateRange);
    }, []);

    const y = useTransform(scrollY, scrollRange, ["-10%", "10%"]);

    return (
        <div ref={ref} className={`w-full ${height} overflow-hidden relative bg-stone-200`}>
            <motion.div
                initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                viewport={{ once: true, margin: "-10%" }}
                className="w-full h-full"
            >
                <motion.img style={{ y }} src={src} alt={alt} className="w-full h-[120%] object-cover scale-110 grayscale-[30%]" />
                <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply"></div>
            </motion.div>
        </div>
    );
};

// Componente: Revelado de Texto Línea por Línea
const RevealText = ({ text, delay = 0, className = "" }) => {
    const lines = text.split("<br/>");
    return (
        <div className={className}>
            {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: delay + (i * 0.15), ease: [0.76, 0, 0.24, 1] }}
                    >
                        {line}
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

// Componente: Tarjeta Liquid Glass (Eficiente, usando sólo CSS)
const LiquidGlassCard = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay }}
            className="w-full relative group transform-gpu"
        >
            <div
                className="relative rounded-[2.5rem] overflow-hidden will-change-transform shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-stone-100"
            >
                {/* Resplandor líquido ambiental (Hover) - Blur básico CSS */}
                <div className="absolute -inset-4 bg-gradient-to-br from-stone-200/50 to-stone-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                {/* Capa de Cristal Esmerilado - Blur ligero */}
                <div className="relative z-10 h-full bg-white/30 backdrop-blur-md border border-white/60 p-12 transition-colors duration-500 group-hover:bg-white/40">
                    <div className="h-full relative">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Componente: Fondo Ambiental con Patrones Curvos (Jardín Zen Digital) optimizado
const AmbientBackground = () => (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#F4F4F0]">
        {/* Usar CSS radial gradients en lugar de divs animados con full blur (99% más rápido para GPU/CPU) */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_0%_0%,_#e5e7eb_0%,_transparent_40%),radial-gradient(circle_at_100%_100%,_#d6d3d1_0%,_transparent_50%)]" />

        {/* Patrón de Olas Zen - Opacidad reducida y mix-blend multiply suavizado */}
        <div
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='24' viewBox='0 0 120 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12 Q 30 0, 60 12 T 120 12' fill='none' stroke='%231c1917' stroke-width='1.5' stroke-opacity='0.2'/%3E%3C/svg%3E")`,
                backgroundSize: '120px 24px',
                transform: 'rotate(-4deg) scale(1.2)',
                maskImage: 'radial-gradient(ellipse at 50% 50%, black 10%, transparent 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 10%, transparent 65%)'
            }}
        />
    </div>
);

// Componente: Modal Flotante de Planos (Lightbox Premium)
const PlanoModal = ({ plano, onClose }) => {
    // Evitamos que al hacer clic dentro del modal se cierre (propagación)
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8 bg-stone-900/80 backdrop-blur-xl"
            onClick={onClose} // Cierra si haces clic en el fondo oscuro
        >
            <motion.div
                initial={{ y: "10vh", scale: 0.9, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: "5vh", scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()} // Detiene el clic para no cerrar
                className="w-full max-w-6xl h-[85vh] bg-[#F4F4F0] rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative"
            >
                {/* Botón de Cierre Flotante */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white hover:scale-105 transition-all duration-300"
                >
                    <X size={20} />
                </button>

                {/* Lado Izquierdo: Imagen del Plano Arquitectónico */}
                <div className="md:w-3/5 h-1/2 md:h-full bg-stone-200 relative overflow-hidden group">
                    <img
                        src={plano.planoImg}
                        alt={`Plano de ${plano.title}`}
                        className="w-full h-full object-cover opacity-90 grayscale mix-blend-multiply group-hover:scale-110 transition-transform duration-[2s] ease-out"
                    />
                    <div className="absolute inset-0 border-[1px] border-stone-400/30 m-8 pointer-events-none"></div>
                </div>

                {/* Lado Derecho: Especificaciones Técnicas */}
                <div className="md:w-2/5 p-8 md:p-16 flex flex-col h-1/2 md:h-full justify-between bg-white relative">
                    <div>
                        <h4 className="text-stone-400 uppercase tracking-widest text-xs font-bold mb-4">Esquema Técnico</h4>
                        <h3 className="font-serif text-4xl text-stone-900 mb-8">{plano.title}</h3>

                        <div className="space-y-6">
                            <div className="border-b border-stone-200 pb-4">
                                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mb-1">Área Total</span>
                                <span className="font-mono text-lg text-stone-900">{plano.specs[0].label}</span>
                            </div>
                            <div className="border-b border-stone-200 pb-4">
                                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mb-1">Distribución</span>
                                <span className="font-mono text-lg text-stone-900">{plano.specs[1].label}</span>
                            </div>
                            <div className="border-b border-stone-200 pb-4">
                                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mb-1">Amenidad Privada</span>
                                <span className="font-mono text-lg text-stone-900">{plano.specs[2].label}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <MagneticButton className="w-full" primary={true}>Descargar PDF</MagneticButton>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ==========================================
// 2. VISTAS PRINCIPALES (PÁGINAS)
// ==========================================

const HomeView = ({ setView }) => {
    return (
        <div className="pt-40 pb-32">
            {/* Hero Cinematográfico */}
            <section className="mb-40 flex flex-col justify-end min-h-[50vh]">
                <RevealText
                    text="MÁS ALLÁ<br/>DEL HABITAR."
                    className="text-[12vw] leading-[0.85] font-serif tracking-tighter text-stone-900 uppercase"
                />
                <div className="grid grid-cols-1 md:grid-cols-12 mt-12 gap-8 items-end">
                    <div className="md:col-span-4 md:col-start-9">
                        <motion.p
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 1 }}
                            className="text-stone-600 text-sm leading-relaxed tracking-wide font-medium"
                        >
                            (01) / INVERSIÓN VANGUARDISTA <br /><br />
                            Arquitectura que desafía el tiempo. Un ecosistema diseñado quirúrgicamente para mentes que exigen plusvalía y aislamiento sensorial absoluto.
                        </motion.p>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8">
                            <MagneticButton onClick={() => setView('coleccion')}>Explorar Colección</MagneticButton>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Media Gigante con Parallax - URL CORREGIDA */}
            <ParallaxImage src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop" alt="Fachada exterior" height="h-[80vh]" />

            {/* Sección de Datos Crudos (GEO Hack) - AHORA CON LIQUID GLASS */}
            <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Building2, title: "Autoría", desc: "Alturas de 4.5m, mármol travertino y maderas endémicas. Diseñado para envejecer con dignidad." },
                    { icon: Leaf, title: "Santuario", desc: "Aislamiento acústico militar. Amenidades que operan como un club privado exclusivo para residentes." },
                    { icon: MapPin, title: "Yield", desc: "Ubicación hipercentral. Proyección algorítmica de plusvalía del 12% anual. Dinero inteligente." }
                ].map((item, idx) => (
                    <LiquidGlassCard key={idx} delay={idx * 0.15}>
                        <div className="w-16 h-16 rounded-full bg-stone-900/5 flex items-center justify-center mb-8 border border-white/40">
                            <item.icon size={28} className="text-stone-700 group-hover:text-stone-900 group-hover:scale-110 transition-all duration-500" />
                        </div>
                        <h3 className="font-serif text-3xl mb-4 text-stone-900">{item.title}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed font-medium">{item.desc}</p>
                    </LiquidGlassCard>
                ))}
            </section>
        </div>
    );
};

// --- NUEVA VISTA: DEPARTAMENTOS ---
const DepartamentosView = ({ onOpenPlano }) => {
    const modelos = [
        {
            id: "01",
            title: "Garden House",
            desc: "Una transición fluida entre el refugio interior y la naturaleza. Diseñado con un patio perimetral privado que baña los espacios de luz zenital, ideal para quienes exigen privacidad absoluta sin sacrificar la conexión orgánica.",
            specs: [
                { icon: Maximize, label: "145 m² Totales" },
                { icon: BedDouble, label: "2 Habitaciones Core" },
                { icon: Star, label: "Jardín Privado de 40 m²" }
            ],
            img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
            planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: "02",
            title: "Loft Urbano",
            desc: "Minimalismo vertical. Un volumen de doble altura (4.5m) que actúa como un lienzo en blanco para el diseño interior. Ventanales de piso a techo que enmarcan el skyline de la ciudad como una obra de arte viva.",
            specs: [
                { icon: Maximize, label: "85 m² Eficientes" },
                { icon: BedDouble, label: "1 Habitación + Mezzanine" },
                { icon: Star, label: "Doble Altura Monumental" }
            ],
            img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop",
            planoImg: "https://images.unsplash.com/photo-1541888087922-8d7d96675406?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: "03",
            title: "Penthouse Signature",
            desc: "El pináculo de la colección. Una residencia que domina el entorno con vistas panorámicas ininterrumpidas de 360 grados. Incluye un rooftop privado con piscina de borde infinito y domótica de grado militar.",
            specs: [
                { icon: Maximize, label: "220 m² de Autor" },
                { icon: BedDouble, label: "3 Habitaciones Suite" },
                { icon: Star, label: "Rooftop & Smart Home" }
            ],
            img: "https://images.unsplash.com/photo-1600607688127-1cb239f2800c?q=80&w=1200&auto=format&fit=crop",
            planoImg: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=1200&auto=format&fit=crop"
        }
    ];

    return (
        <div className="pt-40 pb-32">
            <header className="mb-24 flex flex-col justify-end min-h-[30vh]">
                <RevealText
                    text="COLECCIÓN<br/>SINGULAR."
                    className="text-[8vw] leading-[0.85] font-serif tracking-tighter text-stone-900 uppercase"
                />
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}
                    className="text-stone-600 text-sm leading-relaxed tracking-wide font-medium max-w-xl mt-8"
                >
                    Tres tipologías irrepetibles. Cada unidad es concebida como una pieza de colección, maximizando la espacialidad, la incidencia solar y la aislación térmica.
                </motion.p>
            </header>

            <div className="space-y-16">
                {modelos.map((modelo, idx) => (
                    <LiquidGlassCard key={modelo.id} delay={idx * 0.2}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            {/* Imagen con Overflow Oculto y Escala (Awwwards Style) */}
                            <div className={`lg:col-span-7 h-[50vh] overflow-hidden rounded-[1.5rem] bg-stone-300 relative ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                                <img
                                    src={modelo.img}
                                    alt={modelo.title}
                                    className="w-full h-full object-cover grayscale-[15%] hover:scale-105 hover:grayscale-0 transition-all duration-1000 ease-[0.22,1,0.36,1]"
                                />
                                <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply pointer-events-none"></div>
                                <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-stone-900">
                                    Vol. {modelo.id}
                                </div>
                            </div>

                            {/* Contenido / Copywriting */}
                            <div className={`lg:col-span-5 flex flex-col justify-center ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                                <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">{modelo.title}</h2>
                                <p className="text-stone-600 text-sm leading-relaxed font-medium mb-10">
                                    {modelo.desc}
                                </p>

                                <ul className="space-y-4 mb-12">
                                    {modelo.specs.map((spec, i) => (
                                        <li key={i} className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-stone-700 border-b border-white/40 pb-4">
                                            <spec.icon size={16} className="text-stone-900" />
                                            {spec.label}
                                        </li>
                                    ))}
                                </ul>

                                <div>
                                    <button
                                        onClick={() => onOpenPlano(modelo)}
                                        className="group flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-stone-900 hover:text-stone-500 transition-colors"
                                    >
                                        Ver Planos Arquitectónicos <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </LiquidGlassCard>
                ))}
            </div>
        </div>
    );
};

// ==========================================
// 3. ESTRUCTURA GLOBAL Y PRELOADER
// ==========================================

export default function App() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentView, setCurrentView] = useState('home');
    const { x, y } = useMousePosition();
    const [isHovering, setIsHovering] = useState(false); // Para mutar el cursor

    // NUEVO: Estado global para el Modal de Planos elevado a la raíz
    const [planoAbierto, setPlanoAbierto] = useState(null);

    // Al cambiar de vista, forzamos el scroll al top suavemente
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentView]);

    // Preloader Logic
    useEffect(() => {
        let timer;
        if (progress < 100) {
            timer = setTimeout(() => setProgress(p => p + Math.floor(Math.random() * 15) + 5), 100);
        } else {
            setTimeout(() => setLoading(false), 800);
        }
        return () => clearTimeout(timer);
    }, [progress]);

    // Manejo de hover global para enlaces/botones
    useEffect(() => {
        const handleMouseOver = (e) => {
            if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('button')) setIsHovering(true);
            else setIsHovering(false);
        };
        window.addEventListener('mouseover', handleMouseOver);
        return () => window.removeEventListener('mouseover', handleMouseOver);
    }, []);

    return (
        <div className="bg-[#F4F4F0] min-h-screen text-[#1A1A1A] selection:bg-stone-900 selection:text-white cursor-none overflow-x-hidden">

            {/* TEXTURA DE RUIDO GLOBAL (Film Grain) */}
            <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* FONDO AMBIENTAL DE PATRONES CURVOS */}
            <AmbientBackground />

            {/* CUSTOM CURSOR */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-stone-900 mix-blend-difference pointer-events-none z-[100] flex items-center justify-center"
                animate={{
                    x: x - 8, y: y - 8,
                    scale: isHovering ? 4 : 1,
                    opacity: loading ? 0 : 1
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
            >
                {isHovering && <div className="w-[2px] h-[2px] bg-white rounded-full opacity-80"></div>}
            </motion.div>

            <AnimatePresence>
                {loading ? (
                    // PANTALLA DE CARGA (PRELOADER AWWWARDS)
                    <motion.div
                        key="preloader"
                        className="fixed inset-0 z-[60] bg-stone-900 text-stone-50 flex flex-col items-center justify-center"
                        exit={{ y: "-100%" }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: "easeOut" }}
                                className="font-serif text-4xl md:text-6xl uppercase tracking-[0.2em] mb-8"
                            >
                                Reserva Singular
                            </motion.h1>
                        </div>
                        <div className="w-48 h-[1px] bg-stone-800 relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-stone-50"
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>
                        <div className="mt-4 font-mono text-sm tracking-widest text-stone-500">
                            {Math.min(progress, 100)}% / GEO_OPTIMIZED
                        </div>
                    </motion.div>
                ) : (
                    // CONTENIDO PRINCIPAL
                    <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>

                        {/* NAVEGACIÓN - AHORA COMO PÍLDORA LIQUID Glass (Push down para no chocar con el header de retorno) */}
                        <nav className="fixed top-[72px] left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-40 bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm rounded-full px-8 py-4 flex justify-between items-center text-stone-900">
                            <div className="font-serif tracking-[0.2em] uppercase text-xs md:text-sm font-bold cursor-pointer" onClick={() => setCurrentView('home')}>
                                Reserva Singular
                            </div>
                            <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase">
                                {[
                                    { id: 'home', label: 'Inicio' },
                                    { id: 'coleccion', label: 'Departamentos' },
                                    { id: 'entorno', label: 'Ubicación' },
                                    { id: 'inteligencia', label: 'Información' }
                                ].map((item) => (
                                    <button
                                        key={item.id} onClick={() => setCurrentView(item.id)}
                                        className={`transition-colors duration-300 ${currentView === item.id ? 'text-stone-900 border-b border-stone-900 pb-1' : 'text-stone-500 hover:text-stone-900'}`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </nav>

                        {/* ROUTER MANUAL (ANIMADO) */}
                        <div className="relative z-10 flex flex-col w-full">
                            <main className="px-8 md:px-16 max-w-[1800px] mx-auto min-h-screen w-full">
                                <AnimatePresence mode="wait">
                                    {currentView === 'home' && <motion.div key="home" exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}><HomeView setView={setCurrentView} /></motion.div>}
                                    {currentView === 'coleccion' && <motion.div key="coleccion" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}><DepartamentosView onOpenPlano={setPlanoAbierto} /></motion.div>}
                                    {(currentView !== 'home' && currentView !== 'coleccion') && (
                                        <motion.div key="wip" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-60 pb-32 min-h-screen flex items-center justify-center text-center">
                                            <div>
                                                <h1 className="text-6xl font-serif mb-6 uppercase">Vista en <br />Construcción</h1>
                                                <p className="text-stone-500 tracking-widest text-sm uppercase">Módulo {currentView} aislando físicas de animación...</p>
                                                <MagneticButton onClick={() => setCurrentView('home')} className="mt-12 mx-auto" primary={false}>Volver al Hub</MagneticButton>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </main>

                            {/* FOOTER MINIMALISTA */}
                            <footer className="bg-stone-900 text-stone-50 pt-32 pb-16 px-8 md:px-16 w-full">
                                <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-end border-b border-stone-800 pb-16 mb-16">
                                    <RevealText text="EXCLUSIVIDAD<br/>CODIFICADA." className="text-[8vw] leading-[0.85] font-serif tracking-tighter" />
                                    <div className="mt-12 md:mt-0">
                                        <MagneticButton>Agendar Visita</MagneticButton>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between text-xs tracking-widest text-stone-500 uppercase font-bold max-w-[1800px] mx-auto w-full">
                                    <p>© 2026 RESERVA SINGULAR</p>
                                    <p className="mt-4 md:mt-0">DISEÑO UX/UI DE ÉLITE</p>
                                </div>
                            </footer>
                        </div>
                        {/* RENDERIZADO DEL MODAL: Fuera del SmoothScroll para anclarse a la pantalla real */}
                        <AnimatePresence>
                            {planoAbierto && (
                                <PlanoModal plano={planoAbierto} onClose={() => setPlanoAbierto(null)} />
                            )}
                        </AnimatePresence>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
