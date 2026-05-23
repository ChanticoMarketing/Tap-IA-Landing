
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
