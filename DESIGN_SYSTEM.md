# TAP-IA DESIGN SYSTEM & GUIDELINES

Este documento define la identidad visual y los estándares de diseño para el proyecto **TAP-IA**. Cualquier cambio o nueva creación debe alinearse estrictamente con estas directrices para mantener la coherencia y la estética premium del sitio.

---

## 🎨 Paleta de Colores

Se utiliza un esquema de colores oscuros con acentos en oro y azul real para transmitir autoridad, sofisticación y tecnología.

| Color | Hexadecimal | Uso Principal |
| :--- | :--- | :--- |
| **Charcoal** | `#0f1115` | Fondo principal del sitio. |
| **Matte** | `#16191f` | Fondos de tarjetas, secciones secundarias, efectos de vidrio. |
| **Gold** | `#d4af37` | Acentos, iconos, bordes destacados, botones secundarios. |
| **Royal** | `#3b82f6` | Resplandores (glows), halos de luz, acentos sutiles de IA. |
| **Offwhite** | `#e2e4e9` | Texto principal, títulos destacados. |
| **Subtle** | `#9ca3af` | Texto secundario, etiquetas, placeholders. |

---

## 🖋️ Tipografía

Las fuentes deben cargarse desde Google Fonts y aplicarse consistentemente.

- **Títulos (Headings):** `Playfair Display`, serif.
  - Uso: H1, H2, H3 para transmitir elegancia y autoridad.
  - Estilo: Regular o Light (300-400), ocasionalmente Italic para énfasis.
- **Cuerpo (Body):** `Plus Jakarta Sans`, sans-serif.
  - Uso: Párrafos, botones, menús, formularios.
  - Estilo: Light (300) o Regular (400) para legibilidad moderna.

---

## ✨ Componentes y Estética

### 1. Efectos Visuales Premium
- **Glassmorphism:** Las tarjetas (`.matte-card`) deben tener un fondo translúcido (`rgba(22, 25, 31, 0.8)`), desenfoque (`backdrop-filter: blur(20px)`) y un borde sutil (`border: 1px solid rgba(255, 255, 255, 0.05)`).
- **Noise Overlay:** Se debe mantener una capa de ruido estático sobre todo el sitio (`.noise-overlay`) con una opacidad muy baja (0.04) para añadir textura.
- **Radiales Glows:** Uso de halos de luz azul (`royal`) o dorado (`gold`) desenfocados (`blur-3xl`) en las esquinas o detrás de elementos clave para generar profundidad.

### 2. Botones y Llamados a la Acción (CTA)
- **Principal:** Fondo blanco o dorado, texto oscuro, bordes redondeados (`rounded-full`), con una sombra suave de resplandor blue/gold al hacer hover.
- **Secundario:** Bordes sutiles (`border-white/10`), fondo transparente, efecto de hover sutil.

### 3. Animaciones (Micro-interactions)
- **Fluidity:** Las transiciones deben ser suaves (`duration-300` o `duration-500`).
- **Pulse:** Uso de animaciones de pulso lento (`animate-pulse-slow`) para los halos de luz de fondo.
- **GSAP:** Para transiciones de página complejas (Preloaders, Scroll Trigger), utilizar la librería GSAP.

---

## 📱 Responsividad y Layout

- **Ancho Máximo:** El contenido principal debe estar contenido en un `max-w-7xl` (aproximadamente 1200px-1280px).
- **Espaciado:** Margen interno generoso (`py-20` o `py-24`) entre secciones para permitir que el diseño "respire".
- **Mobile First:** Asegurar que los formularios multi-paso y los grids se colapsen correctamente en una sola columna en dispositivos móviles.

---

> [!IMPORTANT]
> **Regla de Oro:** Si un nuevo elemento parece "plano" o "genérico" (ej. azul plano, rojo básico), es un error. Siempre debe tener una textura (ruido), un degradado sutil o un efecto de luz para mantener el nivel de calidad premium.
