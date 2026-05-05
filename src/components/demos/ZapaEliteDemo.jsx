import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ShieldAlert, Fingerprint, Briefcase, ChevronRight } from 'lucide-react';

// ==========================================
// ESTILOS GLOBALES Y FUENTES
// ==========================================
const FontStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
    
    body {
      background-color: #09090b; /* zinc-950 forzado en body */
      color: #f5f5f4; /* stone-100 */
      font-family: 'Inter', sans-serif;
      margin: 0;
      overflow-x: hidden;
    }
    
    h1, h2, h3, h4, .serif-font {
      font-family: 'Playfair Display', serif;
    }

    ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  `}</style>
);

// ==========================================
// COMPONENTE: NAVEGACIÓN GLOBAL (NAVBAR)
// ==========================================
const Navbar = ({ currentRoute, navigate }) => {
    return (
        <motion.nav
            className="fixed top-12 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/80 px-8 py-6 flex justify-between items-center"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div
                className="serif-font tracking-widest text-lg cursor-pointer hover:text-amber-700 transition-colors"
                onClick={() => navigate('/vault')}
            >
                Z<span className="text-amber-700">-</span>E
            </div>

            <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] uppercase text-zinc-400">
                <button onClick={() => navigate('/atrio')} className={`hover:text-white transition-colors ${currentRoute === '/atrio' ? 'text-white border-b border-amber-700/50' : ''}`}>El Atrio</button>
                <button onClick={() => navigate('/vault')} className={`hover:text-white transition-colors ${currentRoute === '/vault' ? 'text-white border-b border-amber-700/50' : ''}`}>La Bóveda</button>
                <button onClick={() => navigate('/cronicas')} className={`hover:text-white transition-colors ${currentRoute === '/cronicas' ? 'text-white border-b border-amber-700/50' : ''}`}>Crónicas Sartoriales</button>
                <button onClick={() => navigate('/protocolo')} className={`hover:text-white transition-colors ${currentRoute === '/protocolo' ? 'text-white border-b border-amber-700/50' : ''}`}>Protocolo</button>
            </div>

            <button
                onClick={() => navigate('/dossier')}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-3 relative group"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase hidden md:block">Dossier</span>
                <Briefcase size={18} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-700 rounded-full group-hover:animate-pulse"></span>
            </button>
        </motion.nav>
    );
};

// ==========================================
// PÁGINA 1: EL VESTÍBULO (INICIO)
// ==========================================
const Inicio = ({ onUnlock }) => {
    const [isPressing, setIsPressing] = useState(false);
    const [progress, setProgress] = useState(0);
    const pressTimer = useRef(null);
    const progressInterval = useRef(null);
    const HOLD_DURATION = 2000;

    const startPress = () => {
        setIsPressing(true);
        let startTime = Date.now();
        progressInterval.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const currentProgress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
            setProgress(currentProgress);
            if (currentProgress >= 100) clearInterval(progressInterval.current);
        }, 16);

        pressTimer.current = setTimeout(() => {
            onUnlock();
        }, HOLD_DURATION);
    };

    const cancelPress = () => {
        setIsPressing(false);
        setProgress(0);
        clearTimeout(pressTimer.current);
        clearInterval(progressInterval.current);
    };

    return (
        <motion.div
            className="h-[100vh] w-full flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            {/* Fondo Premium - Opacidad subida a 40% para que se aprecie la textura de cuero */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1605314841961-9bd2c303f295?q=80&w=2000&auto=format&fit=crop")' }}
            />
            {/* Filtros Superpuestos Oscuros Suavizados */}
            <div className="absolute inset-0 bg-zinc-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />

            <motion.div className="z-10 text-center flex flex-col items-center mt-20">
                <h2 className="text-zinc-500 text-xs tracking-[0.4em] uppercase mb-6">El Pináculo de la Etiqueta Masculina</h2>
                <h1 className="text-6xl md:text-8xl serif-font text-stone-200 mb-20 opacity-90 drop-shadow-2xl">
                    ZAPA<span className="text-amber-700/80">-</span>ELITE
                </h1>

                <div className="relative flex items-center justify-center">
                    <svg className="absolute w-40 h-40 -rotate-90 pointer-events-none">
                        <circle cx="80" cy="80" r="76" stroke="#27272a" strokeWidth="1" fill="none" />
                        <motion.circle
                            cx="80" cy="80" r="76" stroke="#b45309" strokeWidth="2" fill="none"
                            strokeDasharray={477} strokeDashoffset={477 - (477 * progress) / 100}
                            className="transition-all duration-75 ease-linear"
                        />
                    </svg>

                    <motion.button
                        className="w-32 h-32 rounded-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 flex flex-col items-center justify-center text-zinc-400 cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.8)] outline-none select-none"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(24,24,27,0.8)" }}
                        whileTap={{ scale: 0.95 }}
                        onPointerDown={startPress} onPointerUp={cancelPress} onPointerLeave={cancelPress}
                        onTouchStart={startPress} onTouchEnd={cancelPress}
                    >
                        <AnimatePresence mode="wait">
                            {isPressing ? (
                                <motion.div key="finger" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, color: "#b45309" }} exit={{ opacity: 0 }}>
                                    <Fingerprint size={32} strokeWidth={1} />
                                </motion.div>
                            ) : (
                                <motion.div key="lock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2">
                                    <Lock size={24} strokeWidth={1} />
                                    <span className="text-[9px] tracking-widest uppercase text-zinc-500">Desbloquear</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                <motion.p className="mt-12 text-zinc-600 text-[10px] tracking-widest uppercase" animate={{ opacity: isPressing ? 0 : 1 }}>
                    Mantén presionado para acceder a la Bóveda
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

// ==========================================
// PÁGINA 1.5: EL ATRIO (NUEVA PÁGINA DE INICIO / DASHBOARD)
// ==========================================
const Atrio = ({ navigate }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-zinc-950 pt-32 pb-24 px-8 md:px-20 min-h-screen flex flex-col justify-center"
        >
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-20 text-center md:text-left">
                    <h2 className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase mb-4">Bienvenido al Círculo Interno</h2>
                    <h1 className="text-5xl md:text-7xl serif-font text-stone-200 leading-tight mb-8">
                        La excelencia no se busca.<br />
                        <span className="text-amber-700/80">Se hereda.</span>
                    </h1>
                    <p className="text-zinc-400 font-light max-w-xl text-sm leading-relaxed mx-auto md:mx-0">
                        Has cruzado el umbral. Estás en El Atrio, el epicentro de la etiqueta masculina.
                        Desde aquí puedes explorar nuestras colecciones privadas o instruirte en los
                        cánones del buen vestir.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div
                        onClick={() => navigate('/vault')}
                        className="md:col-span-8 group cursor-pointer relative overflow-hidden aspect-video md:aspect-auto md:h-[500px] border border-zinc-800/50"
                    >
                        {/* Filtros reducidos para ver bien los zapatos */}
                        <img
                            src="https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=2000&auto=format&fit=crop"
                            alt="La Bóveda"
                            className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-amber-700/80 text-[10px] tracking-[0.3em] uppercase mb-2">Colección Privada</h3>
                            <h2 className="text-3xl md:text-4xl serif-font text-stone-200 flex items-center gap-4">
                                La Bóveda <ChevronRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                            </h2>
                        </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col gap-8">
                        <div
                            onClick={() => navigate('/cronicas')}
                            className="group cursor-pointer relative overflow-hidden flex-1 border border-zinc-800/50 min-h-[230px]"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop"
                                alt="Crónicas"
                                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-zinc-500 text-[9px] tracking-[0.2em] uppercase mb-1">Tomo Mensual</h3>
                                <h2 className="text-xl serif-font text-stone-200">Crónicas Sartoriales</h2>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/protocolo')}
                            className="group cursor-pointer relative overflow-hidden flex-1 border border-zinc-800/50 bg-zinc-900 min-h-[230px]"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 pointer-events-none" />
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-zinc-500 text-[9px] tracking-[0.2em] uppercase mb-1">Reglas de Asignación</h3>
                                <h2 className="text-xl serif-font text-stone-200">El Protocolo</h2>
                            </div>
                            <Lock className="absolute top-6 right-6 text-zinc-700/50 group-hover:text-amber-700/50 transition-colors duration-500" size={32} strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ==========================================
// COMPONENTE: TARJETA DE PRODUCTO (PARA LA BÓVEDA)
// ==========================================
const ProductCard = ({ title, subtitle, story, price, imageUrl, isLast }) => {
    const [showDossier, setShowDossier] = useState(false);

    return (
        <motion.div
            className={`min-h-screen w-full flex flex-col md:flex-row items-center justify-center p-6 md:p-20 gap-12 lg:gap-24 ${!isLast ? 'border-b border-zinc-900/50' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <div className="w-full md:w-1/2 flex justify-center lg:justify-end relative group">
                <div className="w-full max-w-md aspect-[3/4] rounded-sm overflow-hidden relative border border-zinc-800/30">
                    {/* Eliminado mix-blend-lighten, bajado grayscale y bg-black overlay */}
                    <motion.img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover grayscale-[20%]"
                        whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>
            </div>

            <div className="w-full md:w-1/2 max-w-md flex flex-col space-y-8">
                <div>
                    <h3 className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase mb-3">{subtitle}</h3>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl serif-font text-stone-200 leading-none">{title}</h2>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed font-light text-justify">
                    {story}
                </p>
                <div className="pt-8 border-t border-zinc-900">
                    <AnimatePresence mode="wait">
                        {!showDossier ? (
                            <motion.button
                                key="request-dossier"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}
                                onClick={() => setShowDossier(true)}
                                className="group flex items-center gap-4 text-stone-400 hover:text-white transition-colors uppercase tracking-widest text-[11px]"
                            >
                                <span className="border-b border-amber-700/30 pb-1 group-hover:border-amber-700 transition-colors">Solicitar Dossier Financiero</span>
                            </motion.button>
                        ) : (
                            <motion.div
                                key="dossier-revealed"
                                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="flex flex-col space-y-8"
                            >
                                <div className="flex flex-col space-y-1">
                                    <span className="text-zinc-600 text-[9px] tracking-widest uppercase">Inversión requerida</span>
                                    <span className="text-3xl serif-font text-amber-700/90">{price}</span>
                                </div>
                                <button className="w-full bg-zinc-100 text-zinc-950 py-4 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-white transition-all duration-300 flex items-center justify-center gap-3">
                                    <Briefcase size={14} /> Solicitar Asignación de Par
                                </button>
                                <p className="text-center text-[9px] text-zinc-600 uppercase tracking-widest">Sujeto a disponibilidad en bóveda.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

// ==========================================
// PÁGINA 2: LA BÓVEDA (PRODUCTOS)
// ==========================================
const Vault = () => {
    const products = [
        {
            id: 1,
            title: "El Cardenal",
            subtitle: "Edición Noche Absoluta",
            story: "Forjado a mano por tres generaciones de artesanos en Florencia. El cuero de becerro 'Velo Negro' pasa por un proceso de curtido de 180 días en barricas de roble quemado, otorgándole un acabado mate que absorbe la luz de la habitación.",
            price: "$2,850 USD",
            imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop" // Zapatos clásicos oscuros
        },
        {
            id: 2,
            title: "Ónice Monarca",
            subtitle: "Colección Privada",
            story: "La geometría del silencio. Diseñado sin una sola costura visible, este modelo utiliza técnica de moldeado al vacío sobre hormas de madera de ébano centenario. Un zapato que no hace ruido al caminar, solo impone presencia.",
            price: "$4,200 USD",
            imageUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=1000&auto=format&fit=crop" // Zapatos oxford pulidos
        },
        {
            id: 3,
            title: "Silueta de Obsidiana",
            subtitle: "Corte Imperial",
            story: "Esculpido a partir de un bloque único de cuero cordobán. No posee cordones, sino un sistema de ajuste magnético interno patentado en Suiza. Su brillo se intensifica con los años, como un buen secreto.",
            price: "$5,100 USD",
            imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop" // Textura de cuero elegante
        },
        {
            id: 4,
            title: "El Duque de Alba",
            subtitle: "Reserva Centenaria",
            story: "La suela está infundida con polvo de meteorito para una tracción silenciosa. El interior, forrado en seda de loto salvaje tejida a mano bajo las lunas llenas de Kioto. Solo se forjan tres pares al año.",
            price: "$8,500 USD",
            imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop" // Traje y zapatos
        },
        {
            id: 5,
            title: "Fantasma de Savile",
            subtitle: "Serie de Autor",
            story: "Un homenaje a la sastrería británica. La piel de reserva es tratada con humo de turba escocesa, dándole un aroma inconfundible y un color gris ceniza que cambia de tonalidad bajo la luz de las velas.",
            price: "$12,000 USD",
            imageUrl: "https://images.unsplash.com/photo-1533827432537-70133748f5c8?q=80&w=1000&auto=format&fit=crop" // Zapatos grises/ceniza
        }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-zinc-950 min-h-screen pt-24 pb-12">
            {products.map((product, index) => (
                <ProductCard key={product.id} {...product} isLast={index === products.length - 1} />
            ))}
        </motion.div>
    );
};

// ==========================================
// PÁGINA 3: CRÓNICAS SARTORIALES (BLOG)
// ==========================================
const Cronicas = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-zinc-950 min-h-screen pt-32 px-8 md:px-20">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl serif-font text-stone-200 mb-16 text-center">Crónicas Sartoriales</h1>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-12 group cursor-pointer">
                        <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden relative mb-6">
                            <img
                                src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2000&auto=format&fit=crop"
                                alt="Tuxedo"
                                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                        <h3 className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase mb-2">Tomo I - El Protocolo</h3>
                        <h2 className="text-3xl serif-font text-stone-200 group-hover:text-amber-700 transition-colors">La Muerte de la Corbata y el Renacimiento del Cuello Abierto</h2>
                    </div>

                    <div className="md:col-span-7 group cursor-pointer">
                        <div className="w-full aspect-[4/3] overflow-hidden relative mb-6">
                            <img
                                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop"
                                alt="Luxury Watch"
                                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                        <h2 className="text-2xl serif-font text-stone-200">El Tiempo Medido en Sombras: Relojería y Etiqueta</h2>
                    </div>

                    <div className="md:col-span-5 group cursor-pointer flex flex-col justify-end">
                        <div className="w-full aspect-square overflow-hidden relative mb-6">
                            <img
                                src="https://images.unsplash.com/photo-1581553680321-4fffae59fdda?q=80&w=1000&auto=format&fit=crop"
                                alt="Leather texture"
                                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                        <h2 className="text-2xl serif-font text-stone-200">Anatomía de la Piel de Becerro</h2>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ==========================================
// PÁGINA 4: PROTOCOLO (FAQ TIPO CONCIERGE)
// ==========================================
const Protocolo = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-zinc-950 min-h-screen pt-32 pb-24 px-8 flex justify-center">
            <div className="w-full max-w-2xl bg-zinc-900/10 p-8 md:p-16 border border-zinc-900/50 backdrop-blur-sm relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />

                <h1 className="text-3xl md:text-4xl serif-font text-stone-200 mb-12 text-center">Protocolo de Adquisición</h1>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-amber-700/80 serif-font text-xl mb-4">I. Sobre la Asignación</h2>
                        <p className="text-zinc-400 font-light text-sm leading-relaxed text-justify">
                            En Zapa-Elite no vendemos zapatos; asignamos obras de arte a custodios dignos. Al solicitar un par, usted ingresa a un riguroso proceso de revisión por parte de nuestro Concierge. Nos reservamos el derecho de declinar solicitudes para mantener la privacidad y exclusividad de nuestro círculo.
                        </p>
                    </section>

                    <div className="w-full border-t border-zinc-800/30" />

                    <section>
                        <h2 className="text-amber-700/80 serif-font text-xl mb-4">II. Tiempos de Forja</h2>
                        <p className="text-zinc-400 font-light text-sm leading-relaxed text-justify">
                            La paciencia es la mayor virtud del lujo. Cada par requiere un mínimo de 12 a 16 semanas para su completitud. Nuestros artesanos florentinos no trabajan bajo la tiranía del reloj, sino bajo el mandato de la perfección.
                        </p>
                    </section>

                    <div className="w-full border-t border-zinc-800/30" />

                    <section>
                        <h2 className="text-amber-700/80 serif-font text-xl mb-4">III. Entrega y Custodia</h2>
                        <p className="text-zinc-400 font-light text-sm leading-relaxed text-justify">
                            Su encargo no llegará en un camión de paquetería estándar. La entrega se realiza mediante nuestro servicio de Custodia Privada Internacional, en un maletín climatizado asegurado biométricamente a su nombre.
                        </p>
                    </section>
                </div>

                <div className="mt-20 text-center">
                    <p className="font-light text-zinc-500 italic text-sm">Le saluda atentamente,</p>
                    <p className="serif-font text-stone-300 mt-2 text-lg">El Concierge Mayor</p>
                </div>
            </div>
        </motion.div>
    );
};

// ==========================================
// PÁGINA 5: DOSSIER (CARRITO DE COMPRAS)
// ==========================================
const Dossier = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-zinc-950 min-h-screen pt-32 px-8 md:px-20">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-16 border-b border-zinc-900 pb-8">
                    <Briefcase className="text-amber-700" size={28} strokeWidth={1} />
                    <h1 className="text-4xl md:text-5xl serif-font text-stone-200">Dossier de Asignaciones</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="w-full lg:w-2/3 flex flex-col gap-8">
                        <div className="flex gap-6 items-center bg-zinc-900/20 p-4 border border-zinc-800/50">
                            <div className="w-24 h-24 bg-zinc-900 relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop"
                                    alt="El Cardenal"
                                    className="w-full h-full object-cover grayscale-[20%]"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase mb-1">Edición Noche Absoluta</h3>
                                <h2 className="text-xl serif-font text-stone-200 mb-2">El Cardenal</h2>
                                <p className="text-zinc-500 text-xs">Talla: 42 EU | Ajuste: Bespoke</p>
                            </div>
                            <div className="text-right">
                                <span className="text-amber-700 serif-font text-xl">$2,850</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <div className="bg-zinc-900/30 p-8 border border-zinc-800/50 sticky top-32">
                            <h3 className="text-stone-300 uppercase tracking-widest text-xs mb-8 border-b border-zinc-800 pb-4">Resumen del Encargo</h3>

                            <div className="space-y-4 mb-8 text-sm text-zinc-400 font-light">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>$2,850</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Custodia Privada (Envío)</span>
                                    <span>Cortesía</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-8 border-t border-zinc-800 pt-6">
                                <span className="text-[10px] tracking-widest uppercase text-zinc-500">Inversión Total</span>
                                <span className="text-3xl serif-font text-amber-700">$2,850</span>
                            </div>

                            <button className="w-full group bg-stone-200 text-zinc-950 py-4 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-white transition-all duration-300 flex items-center justify-between px-6">
                                <span>Formalizar Encargo</span>
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="mt-6 text-center text-[9px] text-zinc-600 uppercase tracking-widest font-light">
                                Tus credenciales financieras serán solicitadas por el Concierge posteriormente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ==========================================
// COMPONENTE PRINCIPAL (ENRUTADOR FALSO)
// ==========================================
export default function App() {
    const [currentRoute, setCurrentRoute] = useState('/');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentRoute]);

    const renderRoute = () => {
        switch (currentRoute) {
            case '/': return <Inicio key="inicio" onUnlock={() => setCurrentRoute('/atrio')} />;
            case '/atrio': return <Atrio key="atrio" navigate={setCurrentRoute} />;
            case '/vault': return <Vault key="vault" />;
            case '/cronicas': return <Cronicas key="cronicas" />;
            case '/protocolo': return <Protocolo key="protocolo" />;
            case '/dossier': return <Dossier key="dossier" />;
            default: return <Inicio key="inicio" onUnlock={() => setCurrentRoute('/vault')} />;
        }
    };

    return (
        <div className="bg-zinc-950 min-h-screen w-full text-stone-200 font-sans selection:bg-amber-700/30 selection:text-white relative">
            <FontStyles />

            <AnimatePresence>
                {currentRoute !== '/' && (
                    <Navbar currentRoute={currentRoute} navigate={setCurrentRoute} />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {renderRoute()}
            </AnimatePresence>

            {currentRoute !== '/' && (
                <footer className="py-12 flex justify-center items-center border-t border-zinc-900/50 bg-zinc-950">
                    <span className="text-zinc-700 text-[10px] tracking-widest uppercase">La discreción es el verdadero lujo.</span>
                </footer>
            )}
        </div>
    );
}
