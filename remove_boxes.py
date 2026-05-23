import sys

file_path = 'src/pages/soluciones/index.astro'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
except Exception as e:
    print('Error:', e)
    sys.exit(1)

# 1. BLOQUE PROBLEMA (Quitar caja del Ribbon)
old_problem = '<div class="relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-gradient-to-r from-[#161922]/10 via-[#161922]/60 to-[#161922]/10 border-y border-white/5 backdrop-blur-md px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center md:text-left group transition-all duration-700 hover:bg-gradient-to-r hover:from-[#161922]/20 hover:via-[#161922]/80 hover:to-[#161922]/20 shadow-[0_0_40px_rgba(212,175,55,0.02)] hover:shadow-[0_0_50px_rgba(212,175,55,0.05)]">'
new_problem = '<div class="relative py-6 md:py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center md:text-left group transition-all duration-700">'
content = content.replace(old_problem, new_problem)

# Quitar las esquinas/luces extra del viejo Ribbon
content = content.replace('<div class="absolute left-1/2 top-0 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>', '')
content = content.replace('<div class="absolute left-1/2 bottom-0 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"></div>', '')

# 2. MAPA DE RUTAS (Quitar pastillas/pill buttons)
old_ruta = '<div class="flex items-center gap-3 bg-[#161922]/50 border border-white/5 backdrop-blur-sm rounded-full px-6 py-3 hover:border-gold/30 hover:bg-[#161922] transition-all duration-300 cursor-default shadow-sm group">'
new_ruta = '<div class="flex items-center gap-3 px-2 py-1 transition-all duration-300 cursor-default group hover:-translate-y-1">'
content = content.replace(old_ruta, new_ruta)

# 3. QUÉ NO HACEMOS (Quitar caja del footer)
old_no_hacemos = '<div class="max-w-4xl mx-auto relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#12141a]/60 backdrop-blur-xl p-8 text-center reveal-item">'
new_no_hacemos = '<div class="max-w-4xl mx-auto relative p-8 text-center reveal-item border-y border-white/5">'
content = content.replace(old_no_hacemos, new_no_hacemos)

# 4. PROCESO FALLBACK MOBILE (Quitar cajas)
old_mobile_card = '<li role="listitem" class="relative overflow-hidden rounded-[2rem] bg-[#161922]/40 border border-white/5 backdrop-blur-md p-8 md:p-10 reveal-item">'
new_mobile_card = '<li role="listitem" class="relative py-8 border-t border-white/5 reveal-item">'
content = content.replace(old_mobile_card, new_mobile_card)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Boxes removed successfully.')