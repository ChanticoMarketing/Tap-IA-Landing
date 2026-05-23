import sys

file_path = "src/pages/soluciones/index.astro"

try:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
except FileNotFoundError:
    print(f"Error: {file_path} not found.")
    sys.exit(1)

# Find the start of the section
start_tag = '<!-- PROCESO -->'
start_idx = content.find(start_tag)

# Find the end of the section
end_marker = '<!-- QUÉ NO HACEMOS -->'
end_marker_idx = content.find(end_marker)

if start_idx == -1 or end_marker_idx == -1:
    print("Could not find the target block boundaries.")
    sys.exit(1)

timeline_html = """<!-- PROCESO (SCROLL TIMELINE INTERACTIVA) -->
    <section class="py-16 md:py-24 px-6 relative z-10 bg-[#0a0b0e]">
        <div class="max-w-7xl mx-auto reveal-item">
            <PremiumSectionHeader 
                label="Desglose de Trabajo" 
                title="Nuestro Proceso" 
                subtitle="Ingeniería operativa: cinco etapas para garantizar alineación absoluta con su negocio."
                centered={true}
            />

            <div class="mt-16 md:mt-24 relative flex flex-col md:flex-row gap-12">
                
                <!-- Columna Izquierda: Sticky Timeline Track -->
                <div class="hidden md:block w-1/3 relative">
                    <div class="sticky top-1/3 h-[50vh] flex justify-center">
                        <!-- Pista base oscura -->
                        <div class="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 z-0"></div>
                        <!-- Línea dorada que crecerá con el scroll -->
                        <div id="timeline-progress" class="absolute left-1/2 top-0 w-[3px] bg-gradient-to-b from-gold/80 via-gold to-transparent -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(212,175,55,0.5)] origin-top scale-y-0"></div>
                        
                        <!-- Puntos de anclaje fijos (se encenderán por JS) -->
                        <div class="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#161922] border border-white/20 z-20 timeline-dot" data-step="0"></div>
                        <div class="absolute left-1/2 top-1/4 -translate-x-1/2 w-4 h-4 rounded-full bg-[#161922] border border-white/20 z-20 timeline-dot" data-step="1"></div>
                        <div class="absolute left-1/2 top-2/4 -translate-x-1/2 w-4 h-4 rounded-full bg-[#161922] border border-white/20 z-20 timeline-dot" data-step="2"></div>
                        <div class="absolute left-1/2 top-3/4 -translate-x-1/2 w-4 h-4 rounded-full bg-[#161922] border border-white/20 z-20 timeline-dot" data-step="3"></div>
                        <div class="absolute left-1/2 top-full -translate-x-1/2 w-4 h-4 rounded-full bg-[#161922] border border-white/20 z-20 timeline-dot" data-step="4"></div>
                    </div>
                </div>

                <!-- Columna Derecha: Contenido que hace scroll -->
                <div class="w-full md:w-2/3 space-y-24 md:space-y-[30vh] pb-[10vh]">
                    
                    {[
                        { step: '01', title: 'Diagnóstico', desc: 'Auditoría en profundidad. Analizamos su operación actual, ecosistema de datos, cuellos de botella y viabilidad técnica antes de trazar una línea de código.', icon: 'fa-stethoscope' },
                        { step: '02', title: 'Ruta Estratégica', desc: 'Diseñamos la arquitectura de la solución. Seleccionamos el stack tecnológico, definimos los modelos de IA a utilizar y establecemos los KPIs que medirán el éxito.', icon: 'fa-route' },
                        { step: '03', title: 'Diseño de Sistemas', desc: 'Plasmamos la estructura visual y funcional. Desde interfaces de usuario (UI/UX) hasta flujos conversacionales de agentes, todo documentado y aprobado.', icon: 'fa-pen-ruler' },
                        { step: '04', title: 'Implementación', desc: 'Construcción pura. Desarrollo Frontend/Backend, entrenamiento de modelos, conexión de APIs e integración segura en sus servidores o plataformas actuales.', icon: 'fa-code-commit' },
                        { step: '05', title: 'Optimización Continua', desc: 'Despliegue y monitoreo. Acompañamiento post-lanzamiento, analítica de uso, corrección de desviaciones y ajustes en caliente para maximizar el ROI.', icon: 'fa-chart-line' }
                    ].map((item, index) => (
                        <div class="timeline-step group relative flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center opacity-30 transition-opacity duration-500" data-index={index}>
                            <!-- Mobile only dot & line -->
                            <div class="md:hidden absolute left-6 top-12 bottom-[-4rem] w-[1px] bg-white/10 z-0"></div>
                            
                            <div class="flex flex-col items-center gap-4 relative z-10 md:w-1/4 shrink-0">
                                <span class="text-white/20 font-serif text-5xl italic group-[.is-active]:text-gold transition-colors duration-700">{item.step}</span>
                                <div class="w-16 h-16 rounded-2xl bg-[#161922] border border-white/10 flex items-center justify-center group-[.is-active]:border-gold/40 group-[.is-active]:bg-gold/5 group-[.is-active]:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-700">
                                    <i class={`fa-solid ${item.icon} text-2xl text-white/30 group-[.is-active]:text-gold transition-colors duration-700`} aria-hidden="true"></i>
                                </div>
                            </div>
                            
                            <div class="md:w-3/4 pl-16 md:pl-0 relative z-10 group-[.is-active]:translate-x-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                <h4 class="text-white font-light text-2xl md:text-3xl tracking-tight mb-4">{item.title}</h4>
                                <p class="text-base md:text-lg text-subtle font-light leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>

    """

new_content = content[:start_idx] + timeline_html + content[end_marker_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Replacement successful.")