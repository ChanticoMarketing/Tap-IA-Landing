import re
import sys

file_path = "src/pages/soluciones/index.astro"

try:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
except FileNotFoundError:
    print(f"Error: {file_path} not found.")
    sys.exit(1)

# Find the start of the section
start_tag = '<!-- SERVICIOS COMPLEMENTARIOS -->'
start_idx = content.find(start_tag)

# Find the end of the section
end_marker = '<!-- PROCESO -->'
end_marker_idx = content.find(end_marker)

if start_idx == -1 or end_marker_idx == -1:
    print("Could not find the target block boundaries.")
    sys.exit(1)

typographic_list_html = """<!-- SERVICIOS COMPLEMENTARIOS (TYPOGRAPHIC LIST) -->
    <section class="py-24 md:py-32 px-6 relative z-10">
        <div class="max-w-7xl mx-auto reveal-item">
            <PremiumSectionHeader
                label="Capacidades Extras"
                title="Soporte y Activos"
                subtitle="Complementos tácticos para escalar y potenciar su sistema digital."
                centered={false}
            />

            <div class="mt-20 flex flex-col w-full border-b border-white/5">
                
                <!-- ROW 1 -->
                <div class="group relative py-12 md:py-16 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between cursor-default overflow-hidden">
                    <!-- Hover Background -->
                    <div class="absolute inset-0 bg-gradient-to-r from-[#161922]/0 via-[#161922]/80 to-[#161922]/0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
                    <div class="absolute left-0 top-0 w-1 h-full bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom z-10"></div>
                    
                    <div class="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 w-full md:w-auto">
                        <div class="flex items-center gap-6">
                            <span class="text-white/20 font-mono text-sm tracking-widest group-hover:text-gold transition-colors duration-500">EXT.01</span>
                            <i class="fa-solid fa-pen-nib text-2xl text-white/10 group-hover:text-gold/60 transition-colors duration-500" aria-hidden="true"></i>
                        </div>
                        <h3 class="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tighter group-hover:translate-x-4 transition-transform duration-700 ease-out">Contenido Estratégico</h3>
                    </div>

                    <div class="relative z-10 mt-8 md:mt-0 md:w-[35%] overflow-hidden">
                        <p class="text-subtle text-lg font-light leading-relaxed md:opacity-0 md:translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-75">
                            Creación escalable y sistemática de activos de contenido optimizados por IA, listos para distribución multicanal y captura de demanda.
                        </p>
                    </div>
                </div>

                <!-- ROW 2 -->
                <div class="group relative py-12 md:py-16 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between cursor-default overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#161922]/0 via-[#161922]/80 to-[#161922]/0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
                    <div class="absolute left-0 top-0 w-1 h-full bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom z-10"></div>
                    
                    <div class="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 w-full md:w-auto">
                        <div class="flex items-center gap-6">
                            <span class="text-white/20 font-mono text-sm tracking-widest group-hover:text-gold transition-colors duration-500">EXT.02</span>
                            <i class="fa-solid fa-chalkboard-user text-2xl text-white/10 group-hover:text-gold/60 transition-colors duration-500" aria-hidden="true"></i>
                        </div>
                        <h3 class="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tighter group-hover:translate-x-4 transition-transform duration-700 ease-out">Capacitación AI</h3>
                    </div>

                    <div class="relative z-10 mt-8 md:mt-0 md:w-[35%] overflow-hidden">
                        <p class="text-subtle text-lg font-light leading-relaxed md:opacity-0 md:translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-75">
                            Entrenamiento corporativo para integrar herramientas generativas en los flujos de su equipo, elevando radicalmente la productividad interna.
                        </p>
                    </div>
                </div>

                <!-- ROW 3 -->
                <div class="group relative py-12 md:py-16 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between cursor-default overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#161922]/0 via-[#161922]/80 to-[#161922]/0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
                    <div class="absolute left-0 top-0 w-1 h-full bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom z-10"></div>
                    
                    <div class="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 w-full md:w-auto">
                        <div class="flex items-center gap-6">
                            <span class="text-white/20 font-mono text-sm tracking-widest group-hover:text-gold transition-colors duration-500">EXT.03</span>
                            <i class="fa-solid fa-user-astronaut text-2xl text-white/10 group-hover:text-gold/60 transition-colors duration-500" aria-hidden="true"></i>
                        </div>
                        <h3 class="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tighter group-hover:translate-x-4 transition-transform duration-700 ease-out">Avatares IA</h3>
                    </div>

                    <div class="relative z-10 mt-8 md:mt-0 md:w-[35%] overflow-hidden">
                        <p class="text-subtle text-lg font-light leading-relaxed md:opacity-0 md:translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-75">
                            Generación de clones digitales hiperrealistas para escalar su presencia en video sin depender de grabaciones de estudio constantes.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </section>

    """

new_content = content[:start_idx] + typographic_list_html + content[end_marker_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Replacement successful.")
