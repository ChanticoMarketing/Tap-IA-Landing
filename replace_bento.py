import re
import sys

file_path = "src/pages/soluciones/index.astro"

try:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
except FileNotFoundError:
    print(f"Error: {file_path} not found.")
    sys.exit(1)

start_tag = '<div class="flex flex-col gap-16 md:gap-32">'
end_marker = '<!-- SERVICIOS COMPLEMENTARIOS -->'

start_idx = content.find(start_tag)
end_marker_idx = content.find(end_marker)
block_end_idx = content.rfind('</div>\n        </div>\n    </section>', 0, end_marker_idx)

if start_idx == -1 or block_end_idx == -1:
    print("Could not find the target block boundaries.")
    sys.exit(1)

bento_grid_html = """<ul role="list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- 1. Auditoría (Span 2) -->
                <li role="listitem" class="lg:col-span-2 group relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-gold/30 hover:-translate-y-1 shadow-sm hover:shadow-[0_10px_40px_rgba(212,175,55,0.08)] flex flex-col min-h-[380px] reveal-item">
                    <div class="absolute inset-0 z-0 overflow-hidden bg-[#0d0f14]">
                        <div class="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] group-hover:bg-gold/20 transition-colors duration-700"></div>
                        <i class="fa-solid fa-clipboard-check text-[14rem] text-white/5 absolute -bottom-12 -right-4 group-hover:text-gold/10 transition-colors duration-700 -rotate-12" aria-hidden="true"></i>
                    </div>
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="relative z-20 flex flex-col h-full p-8 md:p-12">
                        <div class="text-white/20 font-serif text-4xl italic select-none mb-auto">01.</div>
                        <div class="mt-12 md:mt-24 md:w-4/5">
                            <h3 class="text-2xl md:text-3xl text-white font-light tracking-tight mb-4">Auditoría AI Digital Marketing + SEO/GEO</h3>
                            <p class="text-subtle mb-6 text-base font-light leading-relaxed">Evaluación profunda de su ecosistema digital para identificar fugas de conversión y oportunidades de automatización con IA y posicionamiento de nueva generación.</p>
                            <a href="/auditoria-ia-marketing-seo-geo" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">
                                Ver Auditoría <i class="fa-solid fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </li>

                <!-- 2. Web (Span 1) -->
                <li role="listitem" class="lg:col-span-1 group relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-gold/30 hover:-translate-y-1 shadow-sm hover:shadow-[0_10px_40px_rgba(212,175,55,0.08)] flex flex-col min-h-[380px] reveal-item">
                    <div class="absolute inset-0 z-0 overflow-hidden bg-[#0d0f14]">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-[#0a0b0e]/90 to-[#0a0b0e]/30 z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                        <img src="/images/soluciones/sitios-web.webp" alt="Sitios web orientados a conversión" loading="lazy" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 mix-blend-lighten" />
                    </div>
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="relative z-20 flex flex-col h-full p-8 md:p-10">
                        <div class="text-white/20 font-serif text-4xl italic select-none mb-auto">02.</div>
                        <div class="mt-12">
                            <h3 class="text-2xl text-white font-light tracking-tight mb-4">Páginas Web Estratégicas</h3>
                            <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Sistemas transaccionales de alta velocidad optimizados para captar clientes.</p>
                            <a href="/soluciones/web" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">
                                Ver Servicios <i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </li>

                <!-- 3. SEO/GEO (Span 1) -->
                <li role="listitem" class="lg:col-span-1 group relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-gold/30 hover:-translate-y-1 shadow-sm hover:shadow-[0_10px_40px_rgba(212,175,55,0.08)] flex flex-col min-h-[380px] reveal-item">
                    <div class="absolute inset-0 z-0 overflow-hidden bg-[#0d0f14]">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-[#0a0b0e]/90 to-[#0a0b0e]/30 z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                        <img src="/images/soluciones/seo-geo.webp" alt="Servicio SEO y GEO" loading="lazy" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 mix-blend-lighten" />
                    </div>
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="relative z-20 flex flex-col h-full p-8 md:p-10">
                        <div class="text-white/20 font-serif text-4xl italic select-none mb-auto">03.</div>
                        <div class="mt-12">
                            <h3 class="text-2xl text-white font-light tracking-tight mb-4">SEO / GEO</h3>
                            <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Posicionamiento en buscadores tradicionales y motores generativos (ChatGPT, Claude).</p>
                            <a href="/soluciones/seo-geo" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">
                                Descubrir <i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </li>

                <!-- 4. AI Marketing (Span 1) -->
                <li role="listitem" class="lg:col-span-1 group relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-gold/30 hover:-translate-y-1 shadow-sm hover:shadow-[0_10px_40px_rgba(212,175,55,0.08)] flex flex-col min-h-[380px] reveal-item">
                    <div class="absolute inset-0 z-0 overflow-hidden bg-[#0d0f14]">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-[#0a0b0e]/90 to-[#0a0b0e]/30 z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                        <img src="/images/soluciones/ai-marketing.webp" alt="AI Marketing" loading="lazy" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 mix-blend-lighten" />
                    </div>
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="relative z-20 flex flex-col h-full p-8 md:p-10">
                        <div class="text-white/20 font-serif text-4xl italic select-none mb-auto">04.</div>
                        <div class="mt-12">
                            <h3 class="text-2xl text-white font-light tracking-tight mb-4">AI Digital Marketing</h3>
                            <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Funnels y playbooks de crecimiento basados en datos y potenciados por IA.</p>
                            <a href="/ai-marketing" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">
                                Ver Planes <i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </li>

                <!-- 5. Agentes IA (Span 1) -->
                <li role="listitem" class="lg:col-span-1 group relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-gold/30 hover:-translate-y-1 shadow-sm hover:shadow-[0_10px_40px_rgba(212,175,55,0.08)] flex flex-col min-h-[380px] reveal-item">
                    <div class="absolute inset-0 z-0 overflow-hidden bg-[#0d0f14]">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-[#0a0b0e]/90 to-[#0a0b0e]/30 z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                        <img src="/images/soluciones/agentes-ia.webp" alt="Agentes IA" loading="lazy" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 mix-blend-lighten" />
                    </div>
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="relative z-20 flex flex-col h-full p-8 md:p-10">
                        <div class="text-white/20 font-serif text-4xl italic select-none mb-auto">05.</div>
                        <div class="mt-12">
                            <h3 class="text-2xl text-white font-light tracking-tight mb-4">Agentes IA a medida</h3>
                            <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Asistentes conversacionales para automatizar ventas y soporte técnico 24/7 en su ecosistema.</p>
                            <a href="/agentes-ia-a-medida" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">
                                Explorar <i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </li>

                <!-- 6. WebApps (Span 2) -->
                <li role="listitem" class="lg:col-span-2 group relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-gold/30 hover:-translate-y-1 shadow-sm hover:shadow-[0_10px_40px_rgba(212,175,55,0.08)] flex flex-col min-h-[380px] reveal-item">
                    <div class="absolute inset-0 z-0 overflow-hidden bg-[#0d0f14]">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-[#0a0b0e]/90 to-[#0a0b0e]/30 z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                        <img src="/images/soluciones/webapps-ia.webp" alt="WebApps y Soluciones" loading="lazy" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 mix-blend-lighten" />
                    </div>
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="relative z-20 flex flex-col h-full p-8 md:p-12">
                        <div class="text-white/20 font-serif text-4xl italic select-none mb-auto">06.</div>
                        <div class="mt-12 md:mt-24 md:w-3/4">
                            <h3 class="text-2xl md:text-3xl text-white font-light tracking-tight mb-4">WebApps / Soluciones IA</h3>
                            <p class="text-subtle mb-6 text-base font-light leading-relaxed">Desarrollo de software a medida, dashboards de datos y herramientas impulsadas por inteligencia artificial para optimizar operaciones y flujos de trabajo.</p>
                            <a href="/webapps-ia-a-medida" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">
                                Solicitar WebApp <i class="fa-solid fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </li>

                <!-- 7. Consultoría (Span 1) -->
                <li role="listitem" class="lg:col-span-1 group relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-gold/30 hover:-translate-y-1 shadow-sm hover:shadow-[0_10px_40px_rgba(212,175,55,0.08)] flex flex-col min-h-[380px] reveal-item">
                    <div class="absolute inset-0 z-0 overflow-hidden bg-[#0d0f14]">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-[#0a0b0e]/90 to-[#0a0b0e]/30 z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                        <img src="/images/soluciones/consultoria-ia.webp" alt="Consultoría IA" loading="lazy" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 mix-blend-lighten" />
                    </div>
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="relative z-20 flex flex-col h-full p-8 md:p-10">
                        <div class="text-white/20 font-serif text-4xl italic select-none mb-auto">07.</div>
                        <div class="mt-12">
                            <h3 class="text-2xl text-white font-light tracking-tight mb-4">Consultoría IA</h3>
                            <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Claridad ejecutiva para transformar la IA en roadmaps y decisiones rentables.</p>
                            <a href="/consultoria-inteligencia-artificial" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">
                                Ver Consultoría <i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>"""

new_content = content[:start_idx] + bento_grid_html + content[block_end_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Replacement successful.")
