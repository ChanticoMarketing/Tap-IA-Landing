import re
import sys

file_path = "src/pages/soluciones/index.astro"

try:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
except FileNotFoundError:
    print(f"Error: {file_path} not found.")
    sys.exit(1)

# Find the start of the section to replace
start_tag = '<!-- SERVICIOS PRINCIPALES (BENTO GRID) -->'
start_idx = content.find(start_tag)

# Find the end of the section
end_marker = '<!-- SERVICIOS COMPLEMENTARIOS -->'
end_marker_idx = content.find(end_marker)

if start_idx == -1 or end_marker_idx == -1:
    print("Could not find the target block boundaries.")
    sys.exit(1)

interactive_sticky_html = """<!-- SERVICIOS PRINCIPALES (STICKY SYSTEM VIEW) -->
    <section id="soluciones" class="py-24 md:py-32 px-6 relative z-10">
        <div class="max-w-7xl mx-auto">
            <div class="mb-16 md:mb-24 reveal-item">
                <PremiumSectionHeader
                    label="Infraestructura"
                    title="Módulos del Sistema"
                    subtitle="Desplegamos soluciones tecnológicas diseñadas para operar con autonomía y precisión."
                    centered={true}
                />
            </div>

            <!-- DESKTOP: STICKY INTERACTIVE VIEW -->
            <div class="hidden lg:flex items-start gap-12 relative">
                
                <!-- LEFT: Sticky Visualizer Canvas -->
                <div class="w-1/2 sticky top-32 h-[calc(100vh-16rem)] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0b0e] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center justify-center group">
                    <div class="absolute inset-0 bg-noise opacity-[0.03] z-20 pointer-events-none"></div>

                    <!-- Images Stack -->
                    <div id="vis-1" class="svc-vis absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 opacity-100 scale-100">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-[#0a0b0e]/30 z-10"></div>
                        <img src="/images/holograma_datos_premium.webp" alt="Auditoría AI" class="w-full h-full object-cover mix-blend-lighten opacity-80" />
                    </div>
                    <div id="vis-2" class="svc-vis absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 opacity-0 scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-[#0a0b0e]/30 z-10"></div>
                        <img src="/images/soluciones/sitios-web.webp" alt="Páginas Web Estratégicas" class="w-full h-full object-cover mix-blend-lighten opacity-80" />
                    </div>
                    <div id="vis-3" class="svc-vis absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 opacity-0 scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-[#0a0b0e]/30 z-10"></div>
                        <img src="/images/soluciones/seo-geo.webp" alt="SEO y GEO" class="w-full h-full object-cover mix-blend-lighten opacity-80" />
                    </div>
                    <div id="vis-4" class="svc-vis absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 opacity-0 scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-[#0a0b0e]/30 z-10"></div>
                        <img src="/images/soluciones/ai-marketing.webp" alt="AI Marketing" class="w-full h-full object-cover mix-blend-lighten opacity-80" />
                    </div>
                    <div id="vis-5" class="svc-vis absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 opacity-0 scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-[#0a0b0e]/30 z-10"></div>
                        <img src="/images/soluciones/agentes-ia.webp" alt="Agentes IA" class="w-full h-full object-cover mix-blend-lighten opacity-80" />
                    </div>
                    <div id="vis-6" class="svc-vis absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 opacity-0 scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-[#0a0b0e]/30 z-10"></div>
                        <img src="/images/soluciones/webapps-ia.webp" alt="WebApps" class="w-full h-full object-cover mix-blend-lighten opacity-80" />
                    </div>
                    <div id="vis-7" class="svc-vis absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 opacity-0 scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-[#0a0b0e]/30 z-10"></div>
                        <img src="/images/soluciones/consultoria-ia.webp" alt="Consultoría" class="w-full h-full object-cover mix-blend-lighten opacity-80" />
                    </div>

                    <!-- UI Overlay (Terminal aesthetic) -->
                    <div class="absolute inset-0 z-30 pointer-events-none border-[1px] border-white/5 m-6 rounded-xl flex flex-col justify-between p-6">
                        <div class="flex justify-between items-start">
                            <div class="flex items-center gap-3">
                                <span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                                <span class="text-xs text-gold/80 font-mono tracking-widest uppercase" id="sys-status">SYS.ACTIVE</span>
                            </div>
                            <span class="text-xs text-subtle/50 font-mono tracking-widest" id="sys-id">MOD.01</span>
                        </div>
                        <div class="flex justify-between items-end">
                            <div class="w-32 h-[1px] bg-gradient-to-r from-gold/50 to-transparent"></div>
                            <i class="fa-solid fa-expand text-white/20 text-sm"></i>
                        </div>
                        <!-- Tech corners -->
                        <div class="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/40 -translate-x-[1px] -translate-y-[1px] rounded-tl-xl"></div>
                        <div class="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/40 translate-x-[1px] -translate-y-[1px] rounded-tr-xl"></div>
                        <div class="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/40 -translate-x-[1px] translate-y-[1px] rounded-bl-xl"></div>
                        <div class="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/40 translate-x-[1px] translate-y-[1px] rounded-br-xl"></div>
                    </div>
                </div>

                <!-- RIGHT: Scrolling Modules -->
                <div class="w-1/2 pb-[40vh]">
                    <div class="relative border-l border-white/10 pl-12 ml-6 space-y-[40vh] pt-[10vh]">
                        
                        <!-- Track Line active state -->
                        <div class="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent -translate-x-[1px]"></div>

                        <!-- Mod 1 -->
                        <div class="svc-module relative opacity-100" data-target="vis-1" data-id="MOD.01">
                            <div class="svc-node absolute -left-[3.25rem] top-4 w-3 h-3 rounded-full bg-gold shadow-[0_0_15px_rgba(212,175,55,0.8)] border border-white/20 transition-all duration-500 z-10"></div>
                            <div class="text-gold font-serif text-6xl italic select-none mb-6 opacity-40">01.</div>
                            <h3 class="text-3xl md:text-4xl text-white font-light tracking-tight mb-6">Auditoría AI Digital Marketing + SEO/GEO</h3>
                            <div class="flex flex-wrap gap-2 mb-6">
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[DIAGNÓSTICO]</span>
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[MÉTRICAS]</span>
                            </div>
                            <p class="text-subtle mb-8 text-lg font-light leading-relaxed">Evaluación profunda de su ecosistema digital para identificar fugas de conversión y oportunidades de automatización con IA y posicionamiento de nueva generación.</p>
                            <a href="/auditoria-ia-marketing-seo-geo" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">Ver Auditoría <i class="fa-solid fa-arrow-right ml-3"></i></a>
                        </div>

                        <!-- Mod 2 -->
                        <div class="svc-module relative opacity-30" data-target="vis-2" data-id="MOD.02">
                            <div class="svc-node absolute -left-[3.25rem] top-4 w-3 h-3 rounded-full bg-[#0a0b0e] border border-white/20 transition-all duration-500 z-10"></div>
                            <div class="text-white/20 font-serif text-6xl italic select-none mb-6">02.</div>
                            <h3 class="text-3xl md:text-4xl text-white font-light tracking-tight mb-6">Páginas Web Estratégicas</h3>
                            <div class="flex flex-wrap gap-2 mb-6">
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[UI/UX]</span>
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[SISTEMAS]</span>
                            </div>
                            <p class="text-subtle mb-8 text-lg font-light leading-relaxed">Sistemas transaccionales de alta velocidad optimizados para captar clientes. No hacemos arte decorativo, construimos infraestructura de conversión.</p>
                            <a href="/soluciones/web" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">Ver Servicios Web <i class="fa-solid fa-arrow-right ml-3"></i></a>
                        </div>

                        <!-- Mod 3 -->
                        <div class="svc-module relative opacity-30" data-target="vis-3" data-id="MOD.03">
                            <div class="svc-node absolute -left-[3.25rem] top-4 w-3 h-3 rounded-full bg-[#0a0b0e] border border-white/20 transition-all duration-500 z-10"></div>
                            <div class="text-white/20 font-serif text-6xl italic select-none mb-6">03.</div>
                            <h3 class="text-3xl md:text-4xl text-white font-light tracking-tight mb-6">SEO / GEO</h3>
                            <div class="flex flex-wrap gap-2 mb-6">
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[POSICIONAMIENTO]</span>
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[LLMs]</span>
                            </div>
                            <p class="text-subtle mb-8 text-lg font-light leading-relaxed">Optimización dual: para motores de búsqueda tradicionales (SEO) y Generative Engine Optimization (GEO) para ser citado por ChatGPT, Perplexity y Claude.</p>
                            <a href="/soluciones/seo-geo" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">Descubrir SEO-GEO <i class="fa-solid fa-arrow-right ml-3"></i></a>
                        </div>

                        <!-- Mod 4 -->
                        <div class="svc-module relative opacity-30" data-target="vis-4" data-id="MOD.04">
                            <div class="svc-node absolute -left-[3.25rem] top-4 w-3 h-3 rounded-full bg-[#0a0b0e] border border-white/20 transition-all duration-500 z-10"></div>
                            <div class="text-white/20 font-serif text-6xl italic select-none mb-6">04.</div>
                            <h3 class="text-3xl md:text-4xl text-white font-light tracking-tight mb-6">AI Digital Marketing</h3>
                            <div class="flex flex-wrap gap-2 mb-6">
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[ESTRATEGIA]</span>
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[FUNNELS]</span>
                            </div>
                            <p class="text-subtle mb-8 text-lg font-light leading-relaxed">Funnels y playbooks de crecimiento basados en datos y potenciados por inteligencia artificial para dominar su segmento B2B o de servicios.</p>
                            <a href="/ai-marketing" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">Ver Planes <i class="fa-solid fa-arrow-right ml-3"></i></a>
                        </div>

                        <!-- Mod 5 -->
                        <div class="svc-module relative opacity-30" data-target="vis-5" data-id="MOD.05">
                            <div class="svc-node absolute -left-[3.25rem] top-4 w-3 h-3 rounded-full bg-[#0a0b0e] border border-white/20 transition-all duration-500 z-10"></div>
                            <div class="text-white/20 font-serif text-6xl italic select-none mb-6">05.</div>
                            <h3 class="text-3xl md:text-4xl text-white font-light tracking-tight mb-6">Agentes IA a medida</h3>
                            <div class="flex flex-wrap gap-2 mb-6">
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[AUTOMATIZACIÓN]</span>
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[24/7]</span>
                            </div>
                            <p class="text-subtle mb-8 text-lg font-light leading-relaxed">Asistentes conversacionales para automatizar ventas, soporte técnico y cualificación de leads 24/7. Integrados nativamente en Web, WhatsApp o CRM.</p>
                            <a href="/agentes-ia-a-medida" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">Explorar Agentes <i class="fa-solid fa-arrow-right ml-3"></i></a>
                        </div>

                        <!-- Mod 6 -->
                        <div class="svc-module relative opacity-30" data-target="vis-6" data-id="MOD.06">
                            <div class="svc-node absolute -left-[3.25rem] top-4 w-3 h-3 rounded-full bg-[#0a0b0e] border border-white/20 transition-all duration-500 z-10"></div>
                            <div class="text-white/20 font-serif text-6xl italic select-none mb-6">06.</div>
                            <h3 class="text-3xl md:text-4xl text-white font-light tracking-tight mb-6">WebApps / Soluciones IA</h3>
                            <div class="flex flex-wrap gap-2 mb-6">
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[SOFTWARE]</span>
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[OPERACIONES]</span>
                            </div>
                            <p class="text-subtle mb-8 text-lg font-light leading-relaxed">Desarrollo de software a medida, dashboards de datos y herramientas internas impulsadas por inteligencia artificial para optimizar radicalmente sus operaciones.</p>
                            <a href="/webapps-ia-a-medida" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">Solicitar WebApp <i class="fa-solid fa-arrow-right ml-3"></i></a>
                        </div>

                        <!-- Mod 7 -->
                        <div class="svc-module relative opacity-30" data-target="vis-7" data-id="MOD.07">
                            <div class="svc-node absolute -left-[3.25rem] top-4 w-3 h-3 rounded-full bg-[#0a0b0e] border border-white/20 transition-all duration-500 z-10"></div>
                            <div class="text-white/20 font-serif text-6xl italic select-none mb-6">07.</div>
                            <h3 class="text-3xl md:text-4xl text-white font-light tracking-tight mb-6">Consultoría estratégica en IA</h3>
                            <div class="flex flex-wrap gap-2 mb-6">
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[ROADMAP]</span>
                                <span class="text-xs text-subtle px-3 py-1 rounded-full border border-white/10 bg-white/5 uppercase tracking-widest">[EJECUTIVO]</span>
                            </div>
                            <p class="text-subtle mb-8 text-lg font-light leading-relaxed">Para empresas que requieren claridad. Traducimos la complejidad técnica de la IA en roadmaps estratégicos y decisiones ejecutivas rentables.</p>
                            <a href="/consultoria-inteligencia-artificial" class="inline-flex items-center text-gold hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-widest focus-visible:outline-none">Ver Consultoría <i class="fa-solid fa-arrow-right ml-3"></i></a>
                        </div>

                    </div>
                </div>
            </div>

            <!-- MOBILE FALLBACK: STACKED GLASS CARDS -->
            <ul role="list" class="flex flex-col gap-6 lg:hidden">
                <!-- Data here is simplified for the fallback -->
                <li role="listitem" class="relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md p-8 md:p-10 reveal-item">
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="text-gold font-serif text-4xl italic select-none mb-8 opacity-40">01.</div>
                    <h3 class="text-2xl text-white font-light tracking-tight mb-4">Auditoría AI Digital Marketing + SEO/GEO</h3>
                    <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Evaluación profunda de su ecosistema digital para identificar fugas de conversión y oportunidades de automatización.</p>
                    <a href="/auditoria-ia-marketing-seo-geo" class="inline-flex items-center text-gold hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">Ver Auditoría <i class="fa-solid fa-arrow-right ml-2"></i></a>
                </li>
                
                <li role="listitem" class="relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md p-8 md:p-10 reveal-item">
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="text-white/20 font-serif text-4xl italic select-none mb-8">02.</div>
                    <h3 class="text-2xl text-white font-light tracking-tight mb-4">Páginas Web Estratégicas</h3>
                    <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Sistemas transaccionales de alta velocidad optimizados para captar clientes.</p>
                    <a href="/soluciones/web" class="inline-flex items-center text-gold hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">Ver Servicios <i class="fa-solid fa-arrow-right ml-2"></i></a>
                </li>

                <li role="listitem" class="relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md p-8 md:p-10 reveal-item">
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="text-white/20 font-serif text-4xl italic select-none mb-8">03.</div>
                    <h3 class="text-2xl text-white font-light tracking-tight mb-4">SEO / GEO</h3>
                    <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Posicionamiento en buscadores tradicionales y motores generativos.</p>
                    <a href="/soluciones/seo-geo" class="inline-flex items-center text-gold hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">Descubrir <i class="fa-solid fa-arrow-right ml-2"></i></a>
                </li>

                <li role="listitem" class="relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md p-8 md:p-10 reveal-item">
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="text-white/20 font-serif text-4xl italic select-none mb-8">04.</div>
                    <h3 class="text-2xl text-white font-light tracking-tight mb-4">AI Digital Marketing</h3>
                    <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Funnels y playbooks de crecimiento potenciados por IA.</p>
                    <a href="/ai-marketing" class="inline-flex items-center text-gold hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">Ver Planes <i class="fa-solid fa-arrow-right ml-2"></i></a>
                </li>

                <li role="listitem" class="relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md p-8 md:p-10 reveal-item">
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="text-white/20 font-serif text-4xl italic select-none mb-8">05.</div>
                    <h3 class="text-2xl text-white font-light tracking-tight mb-4">Agentes IA a medida</h3>
                    <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Asistentes conversacionales para automatizar ventas y soporte técnico 24/7.</p>
                    <a href="/agentes-ia-a-medida" class="inline-flex items-center text-gold hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">Explorar <i class="fa-solid fa-arrow-right ml-2"></i></a>
                </li>

                <li role="listitem" class="relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md p-8 md:p-10 reveal-item">
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="text-white/20 font-serif text-4xl italic select-none mb-8">06.</div>
                    <h3 class="text-2xl text-white font-light tracking-tight mb-4">WebApps / Soluciones IA</h3>
                    <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Desarrollo de software a medida y dashboards de datos para optimizar operaciones.</p>
                    <a href="/webapps-ia-a-medida" class="inline-flex items-center text-gold hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">Solicitar WebApp <i class="fa-solid fa-arrow-right ml-2"></i></a>
                </li>

                <li role="listitem" class="relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md p-8 md:p-10 reveal-item">
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
                    <div class="text-white/20 font-serif text-4xl italic select-none mb-8">07.</div>
                    <h3 class="text-2xl text-white font-light tracking-tight mb-4">Consultoría IA</h3>
                    <p class="text-subtle mb-6 text-sm font-light leading-relaxed">Claridad ejecutiva para transformar la IA en roadmaps y decisiones rentables.</p>
                    <a href="/consultoria-inteligencia-artificial" class="inline-flex items-center text-gold hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">Ver Consultoría <i class="fa-solid fa-arrow-right ml-2"></i></a>
                </li>
            </ul>

        </div>
    </section>
"""

new_content = content[:start_idx] + interactive_sticky_html + content[end_marker_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Replacement successful.")
