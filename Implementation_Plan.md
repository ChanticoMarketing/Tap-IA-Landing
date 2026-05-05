# Implementation Plan — Hero: fondo animado más visible sin perder legibilidad del H1

**Objetivo:** aumentar la presencia visual del gradiente líquido (WebGL) en el Hero, manteniendo el contraste y la lectura del titular (H1) en todos los viewports y con `prefers-reduced-motion`.

**Alcance:** `TapIALiquidGradient.astro` (shader/uniforms), estilos del bloque de texto del Hero (`index.astro` y/o `Layout.astro`), sin nuevas dependencias.

---

## 1. Restricciones (no negociables)

- El H1 debe cumplir contraste perceptible sobre el fondo animado (objetivo: equivalente a buena legibilidad en condiciones reales, no solo “se ve el texto”).
- No reintroducir sombras de texto pesadas tipo “glow” en todo el bloque; si se usa refuerzo, debe ser **local y sutil** (ver sección 4).
- Respetar `prefers-reduced-motion: reduce` (el fondo ya puede no animarse; el plan no debe depender solo del movimiento para el impacto).
- Cambios acotados: no refactorizar todo el sitio; solo Hero + componente de fondo.

---

## 2. Estrategia en dos capas (recomendada)

### Capa A — Aumentar señal del fondo (sin tocar tipografía)

Ajustar parámetros del fragment shader en `src/components/TapIALiquidGradient.astro`:

| Parámetro | Rol actual | Dirección sugerida | Riesgo |
|-----------|------------|--------------------|--------|
| `uIntensity` | escala global del color mezclado | subir en pasos pequeños (p. ej. +0.05 a +0.15 por iteración) | puede “lavar” zonas claras del canvas |
| `mix_f` / mezcla con `uBase` | cuánto domina el charcoal vs halos | permitir un poco más de color en zonas medias-altas de brillo | si sube demasiado, baja contraste del texto |
| `uSpeed` | velocidad del movimiento | subir levemente si el fondo se siente “muerto” | movimiento rápido distrae |
| `uGrain` | grano film | opcional: +0.005 si se quiere textura premium sin subir brillo | exceso = suciedad |

**Criterio de parada:** el fondo se percibe claramente en reposo y en movimiento, pero el área central detrás del H1 no supera un brillo medio que compita con el offwhite del texto.

### Capa B — Proteger legibilidad del H1 (sin ensuciar el diseño)

Opciones **ordenadas de menor a mayor invasión** (elegir una; combinar máximo dos):

1. **Scrim vertical muy suave** detrás del stack del Hero (solo en la columna de contenido): un `div` absoluto con `bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-transparent` y `pointer-events-none`, ancho ~`max-w-4xl`, detrás del texto, z-index entre fondo y texto. Refuerza contraste solo donde está el copy.
2. **Backdrop blur mínimo** en un contenedor del texto (`backdrop-blur-[2px]` o `4px`) + fondo `bg-charcoal/10`. Usar con moderación para no “lavar” el fondo.
3. **Sombra de texto mínima** solo en `h1` del Hero (no en párrafos): `text-shadow` corta, baja opacidad (ej. 0.25–0.4), sin spread grande.

**Evitar:** sombras múltiples grandes, outlines agresivos, o fondos opacos que maten el gradiente.

---

## 3. Archivos a tocar

| Archivo | Cambio |
|---------|--------|
| `src/components/TapIALiquidGradient.astro` | Ajuste incremental de `uIntensity`, revisión de `mix_f` y, si aplica, `uSpeed` / `uGrain`. |
| `src/pages/index.astro` | Envolver el bloque del Hero (badge + h1 + p + CTA) en un contenedor `relative` y añadir capa scrim opcional; clases utilitarias solo en Hero. |
| `src/layouts/Layout.astro` | Solo si se centraliza una clase utilitaria reutilizable (ej. `.hero-readable`); preferible mantener cambios en `index.astro` para acotar diff. |

---

## 4. Plan de implementación paso a paso (para el agente)

1. **Baseline:** abrir el Hero en desktop y móvil; capturar sensación de brillo detrás del H1.
2. **Subir `uIntensity` en +0.05**; compilar y revisar H1 sobre las zonas más claras del shader.
3. Si el H1 pierde nitidez: aplicar **solo Capa B.1 (scrim)** en `index.astro` y repetir el paso 2 hasta equilibrio.
4. Si el fondo sigue plano: subir `uIntensity` otro +0.05 o afinar `mix_f` (permitir un poco más de mezcla de color en rangos medios, no en el centro del brillo máximo).
5. **Motion:** si `prefers-reduced-motion`, no depender de animación; el scrim y el contraste del texto siguen siendo válidos.
6. **Regresión:** comprobar que el CTA y el microcopy siguen legibles; comprobar que `overflow-hidden` del section no recorta el scrim.

---

## 5. Verificación (checklist)

- [ ] H1 legible en viewport 375px y 1440px sobre el frame más “claro” del loop del gradiente.
- [ ] Fondo claramente más visible que la versión “minimalista extrema” anterior.
- [ ] Sin banding severo ni parpadeo incómodo (revisar `uGrain` y DPR del canvas).
- [ ] `prefers-reduced-motion`: sin animación o fallback estático aceptable.
- [ ] Lighthouse / acceso rápido: no bloquear interacción (scrim con `pointer-events-none`).

---

## 6. Valores de referencia (punto de partida en repo)

En `TapIALiquidGradient.astro`, valores actuales documentados para iterar:

- `uSpeed`: ~`0.25`
- `uIntensity`: ~`0.55`

**Sugerencia de iteración:** `uIntensity` 0.55 → 0.60 → 0.65, evaluando H1 tras cada paso; si a 0.65 el centro quema, bajar `mix_f` máximo o añadir scrim antes de seguir subiendo.

---

## 7. Identificación para agentes

- **Nombre del documento:** `Implementation_Plan.md` (raíz del repositorio).
- **Palabras clave:** Hero, TapIALiquidGradient, H1, legibilidad, uIntensity, scrim.

---

*Documento generado para alinear implementación futura sin perder el equilibrio entre impacto visual y UX.*
