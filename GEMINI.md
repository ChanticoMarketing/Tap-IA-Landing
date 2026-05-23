# Reglas de Proyecto: TAP-IA (Página Web)

## 🎨 Arquitectura de Diseño y Estilo
Este proyecto tiene un sistema de diseño altamente estricto ("Premium, oscuro, elegante"). 

**REGLA DE ORO:** Antes de crear nuevas interfaces, componentes o modificar los estilos existentes, **DEBES** leer y seguir estrictamente las reglas definidas en el archivo `DESIGN_SYSTEM.md` ubicado en la raíz del proyecto.

### Resumen Rápido (Ver `DESIGN_SYSTEM.md` para detalles):
- **Tailwind v4:** Usa únicamente las variables del theme: `bg-charcoal`, `text-offwhite`, `text-gold`, `text-subtle`, `bg-matte`. **NUNCA uses colores por defecto de Tailwind (ej. blue-500, gray-800).**
- **Tipografía:** `font-playfair` para H1, H2, H3. `font-jakarta` para cuerpo y UI.
- **Tarjetas:** Usa SIEMPRE la clase `.card-glow` para tarjetas interactivas (aplica fondo, borde, sombra y glow al hover) o `.matte-card` para estáticas. No intentes recrear el glassmorphism desde cero.
- **Componentes:** Si ves que estás escribiendo mucho CSS inline o clases de Tailwind repetitivas para bordes/fondos oscuros, detente y usa `.card-glow`, `.matte-card`, `.ui-caption` o `.editorial-label`.

## 🛠️ Reglas de Código
- **Astro + React:** Usa componentes `.astro` para el layout y renderizado estático. Usa componentes `.tsx` (React) dentro de `src/components/` únicamente cuando necesites estado del lado del cliente o animaciones complejas con Framer Motion.
- **Animaciones:** Usa GSAP para el scroll y Framer Motion para microinteracciones en React.
- **Limpieza:** No dejes código comentado ni variables sin usar.