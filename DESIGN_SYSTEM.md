# TAP-IA: Guía Definitiva de Diseño para Agentes de IA (Design System)

> **[DIRECTIVA PARA AGENTES]**
> Cualquier agente de IA (Cursor, Gemini, Copilot, etc.) que asista en este proyecto DEBE leer y aplicar estrictamente estas reglas antes de crear o modificar componentes, páginas o estilos. El objetivo es mantener una estética premium, oscura, elegante y altamente coherente en todo el ecosistema de TAP-IA.

---

## 🛠️ 1. Stack Tecnológico de Interfaz
- **Framework:** Astro (SSG/SSR) + React (para interactividad compleja).
- **Estilos:** Tailwind CSS v4 (configurado mediante directivas `@theme` en CSS global).
- **Animaciones:** GSAP (cargado globalmente) y Framer Motion (en componentes React).

---

## 🎨 2. Paleta de Colores (Tailwind Tokens)

Utiliza EXCLUSIVAMENTE estos colores definidos en el theme global (`src/styles.css`). Nunca inventes colores hexadecimales sueltos (ej. no uses `#333` o `blue-500`).

| Token Tailwind | Variable CSS | Hex | Uso Obligatorio |
| :--- | :--- | :--- | :--- |
| `bg-charcoal` / `text-charcoal` | `--color-charcoal` | `#0a0b0e` | Fondo principal del sitio. |
| `bg-matte` / `text-matte` | `--color-matte` | `#16191f` | Fondos de tarjetas, modales, secciones secundarias. |
| `bg-gold` / `text-gold` | `--color-gold` | `#d4af37` | **Acento Principal.** Textos destacados, botones clave, bordes sutiles. |
| `bg-royal` / `text-royal` | `--color-royal` | `#2a5a8c` | **Acento Secundario.** Efectos de luz, brillos (glows), detalles de IA. |
| `bg-navy` / `text-navy` | `--color-navy` | `#1a2744` | Fondos alternativos de apoyo. |
| `text-offwhite` | `--color-offwhite` | `#e2e4e9` | Texto principal (Títulos H1, H2, H3). |
| `text-subtle` | `--color-subtle` | `#9ca3af` | Texto de cuerpo (Párrafos, subtítulos, descripciones). |

---

## 🖋️ 3. Tipografía

El sitio utiliza una combinación clásica/moderna para transmitir autoridad y tecnología. Los tamaños ya están configurados de forma responsiva con `clamp()` en el CSS base.

- **Títulos (Headings):** `font-playfair` (Playfair Display, Serif).
  - Usar para: `h1`, `h2`, `h3`.
  - Color: Siempre `text-offwhite`.
  - Estilo: Elegante, pesos entre 400 y 700.
- **Cuerpo y UI:** `font-jakarta` (Plus Jakarta Sans, Sans-serif).
  - Usar para: Párrafos, botones, etiquetas, navegación.
  - Color: `text-subtle` por defecto.

### Clases Tipográficas Predefinidas (¡Úsalas!)
- `.ui-caption`: Texto pequeño, en mayúsculas, espaciado (`letter-spacing`), color sutil. Ideal para overlines o etiquetas de UI.
- `.editorial-label`: Texto pequeño, en mayúsculas, color **oro**, muy espaciado. Ideal para "taglines" encima de los H2.

---

## 💎 4. Componentes Visuales Premium (Clases CSS)

Para mantener la estética "Glassmorphism" y de alta gama, utiliza estas clases globales ya programadas en `styles.css`. No intentes recrear estos efectos con múltiples clases de Tailwind de utilidad si ya existe la clase base.

1. **`.card-glow` (Tarjetas Interactivas - ¡Recomendado!)**
   - **Qué hace:** Aplica un fondo glassmorphism, un borde sutil, sombra, y un efecto de luz radial que sigue al cursor en hover.
   - **Uso:** Tarjetas de servicios, features, perfiles.
2. **`.matte-card` (Tarjetas Estáticas)**
   - **Qué hace:** Aplica un fondo translúcido oscuro sin el efecto hover avanzado.
   - **Uso:** Formularios, modales, contenedores de contenido estático.
3. **`.gold-rule` (Separador)**
   - **Qué hace:** Una línea horizontal muy fina con un degradado dorado a transparente.
   - **Uso:** Separar secciones o debajo de títulos.
4. **`.input-field` (Formularios)**
   - **Qué hace:** Estiliza inputs y textareas con fondo oscuro, borde sutil y glow dorado al enfocar.

---

## 📐 5. Layout y Espaciado Estándar

- **Contenedor Principal:** Usa siempre `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` para alinear el contenido.
- **Respiración (Padding):** Usa paddings generosos entre secciones. Lo estándar es `py-24` en desktop y `py-16` en móvil.
- **Textos de lectura:** Limita el ancho de los párrafos para que sean legibles usando `max-w-2xl` o `max-w-3xl`.

---

## ✨ 6. Efectos Atmosféricos y Animaciones

El sitio no es estático; debe sentirse "vivo".

- **Fondo Global (Automático):** El `Layout.astro` ya incluye `.noise-overlay` (ruido estático) y `.floating-orb` (luces desenfocadas en el fondo). No necesitas agregarlos en cada página.
- **Clases de Animación Disponibles:**
  - `.animate-pulse-slow`: Para hacer que elementos (como brillos) palpiten lentamente.
  - `.animate-sweep`: Entrada rápida hacia arriba.
  - `.animate-marquee`: Para carruseles infinitos de logos o texto.
  - `.cta-animated-bg`: Fondo degradado en constante movimiento (ideal para la sección final de contacto).
- **Sombras de Texto:** Para texto sobre imágenes, usa `.hero-text-shadow` o `.hero-text-shadow-sm` para garantizar legibilidad.

---

## 🚫 7. Lo que NUNCA debes hacer (Antipatrones)

1. **NO usar colores puros o primarios de Tailwind** como `bg-blue-500`, `text-red-500` o fondos completamente blancos `bg-white`. Rompe la estética oscura.
2. **NO usar bordes sólidos gruesos**. Los bordes deben ser tenues (ej. `border border-white/5` o usar `.card-glow`).
3. **NO sobrecargar de texto**. Mantén los copys directos y el diseño limpio.
4. **NO usar fuentes por defecto**. Verifica siempre que Tailwind esté aplicando `font-playfair` o `font-jakarta`.
5. **NO usar `px` (píxeles) duros para tipografía**. El sitio usa `clamp()` en CSS; confía en las etiquetas H1, H2, H3 base o en text-lg, text-xl relativos.

---

> **Nota para Agentes:** Al generar código Astro o JSX, envuelve los componentes lógicos principales en las clases semánticas mencionadas aquí. Prioriza la composición de `.card-glow` para elementos clickeables y usa el token de color `--color-gold` / `text-gold` con mucha sutileza (solo para acentuar).