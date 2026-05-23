# Prompt para agente ejecutor — Fase 3 (UX honesta)

> Copia y pega el bloque siguiente (desde «Rol y contexto» hasta el final del formato de respuesta) al agente implementador. Al terminar, comparte su reporte para validación del orquestador.

---

## Prompt (copiar desde aquí)

```markdown
# Rol y contexto

Eres un **agente de implementación frontend** en el sitio Astro SSR **Tap-IA** (marketing B2B + IA).

**Objetivo único:** completar la **Fase 3 — UX honesta** del plan pre-lanzamiento. La interfaz no debe simular funciones que no existen (filtros, búsqueda, paginación) ni confundir al usuario con CTAs mal etiquetados.

**Precondiciones (no revertir):**
- Fase 1: home y `/novedades-ia` sin enlaces a `noticia-mock`
- Fase 2: `INDEXABLE_ROUTES` con artículos reales; artículo agentes con `SchemaArticle`

**Fuera de alcance (no tocar):**
- `src/lib/seo.ts`, sitemap, n8n, `/api/submit.ts`
- Contenido editorial (cards, artículos, títulos de posts)
- `legal.astro`, cookies, deploy
- Renombrar masivamente `CtaWhatsApp.astro` → otro archivo (evitar romper imports en 15+ páginas)
- Implementar búsqueda real, filtros por categoría o paginación
- `noticia-mock.astro`

**Principios:**
- Cambios quirúrgicos; conservar estilos Tailwind y patrones del diseño
- Preferir **ocultar o desactivar** UI falsa antes que implementar lógica nueva
- Español en copy visible
- `npm run build` → exit code 0

---

# Estado actual (baseline)

## `src/pages/novedades-ia/index.astro`

| Elemento | Líneas aprox. | Problema |
|----------|---------------|----------|
| Buscador | 27–32 | `<input>` sin JS ni backend — parece funcional |
| Filtros categorías | 36–48 | 5 `<a href="/novedades-ia">` idénticos — parecen filtros reales |
| “Cargar más” | 101–105 | HTML comentado — limpiar del DOM |
| Layout | 8 | Solo `title`; opcional añadir `description` |

## `src/pages/portafolio/avatares-ia/index.astro`

- Ya dice “Demos Interactivas Próximamente” (L23) — **aceptable**
- El hub `src/pages/portafolio/index.astro` (card Avatares ~L115–127) promete “Ver demos” sin indicar que aún no hay demos públicas

## `src/components/CtaWhatsApp.astro`

- Nombre sugiere WhatsApp; **default `href="/contacto"`** (L15)
- WhatsApp real del negocio: `https://wa.me/5213324239103` (usado en `contacto.astro`, `ContactWizard.astro`)
- Usos con anchor interno correctos: `index.astro` → `href="#diagnostico"` (hero y sección metodología)
- La mayoría de usos van a `/contacto` por defecto — **comportamiento correcto**, naming/confusión en comentarios

---

# Tareas (ejecutar en orden)

## Tarea 3.1 — Filtros de categorías (novedades)

**Archivo:** `src/pages/novedades-ia/index.astro` (~L36–48)

**Acción (elegir implementación A; no implementar filtros reales):**

**Opción A (recomendada):** Eliminar toda la sección `<!-- CATEGORÍAS & FILTROS -->` y su `<section>`.

**Opción B (si prefieres mantener jerarquía visual):** Sustituir los `<a>` por un único indicador estático:

```html
<span class="px-4 py-2 bg-gold text-charcoal font-medium rounded-full text-sm">Top semanal</span>
<span class="px-4 py-2 border border-white/10 text-subtle/50 rounded-full text-sm cursor-not-allowed" aria-disabled="true" title="Próximamente">Modelos</span>
<!-- igual para Herramientas, Agentes, IA en Marketing — spans, NO enlaces -->
```

**No** dejar `<a href="/novedades-ia">` duplicados que simulen filtrado.

---

## Tarea 3.2 — Buscador sin funcionalidad (novedades)

**Archivo:** `src/pages/novedades-ia/index.astro` (~L27–32)

**Acción:** Eliminar el bloque del `<input type="text" placeholder="Buscar noticia...">` y su icono.

**Opcional:** En su lugar, nada (recomendado) o una línea sutil debajo del subtítulo del hero:

```html
<p class="text-subtle/60 text-sm mt-2 hidden md:block">Archivo en crecimiento — búsqueda por categorías próximamente.</p>
```

Solo si mejora claridad sin ruido visual.

---

## Tarea 3.3 — Eliminar “Cargar más” comentado

**Archivo:** `src/pages/novedades-ia/index.astro` (~L101–105)

**Acción:** Borrar por completo el bloque HTML comentado del botón “Cargar más actualizaciones”. No dejar comentarios muertos.

---

## Tarea 3.4 — Portafolio avatares: expectativas claras

### 3.4a — Página avatares (verificación mínima)

**Archivo:** `src/pages/portafolio/avatares-ia/index.astro`

- Si el copy actual ya comunica “próximamente” y CTA a `/contacto`, **no reescribir** salvo un ajuste menor de accesibilidad.
- Opcional: añadir `aria-label` descriptivo al CTA “Ver Demo en Sesión Privada”.

### 3.4b — Card en hub portafolio (obligatorio)

**Archivo:** `src/pages/portafolio/index.astro` (~L115–127)

**Acción:**

1. Añadir badge visible **antes** del título, por ejemplo:

   ```html
   <span class="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border border-gold/30 text-gold mb-3">Próximamente</span>
   ```

2. Cambiar el hover “Ver demos” por copy honesto, p. ej. **“Solicitar sesión privada”** o **“En preparación”** (sin prometer demos públicas listas).

3. Mantener el enlace a `/portafolio/avatares-ia` (la página explica el estado).

---

## Tarea 3.5 — Clarificar `CtaWhatsApp` (sin renombrar archivo)

**Archivo:** `src/components/CtaWhatsApp.astro`

**Acción:**

1. Actualizar comentario del archivo: indicar que es el **CTA primario de conversión** (diagnóstico/contacto), no exclusivo de WhatsApp.

2. Mantener `href` default `"/contacto"`.

3. Añadir soporte opcional para enlaces externos:
   - Si `href` empieza por `http` (p. ej. `wa.me`), el `<a>` debe llevar `target="_blank"` y `rel="noopener noreferrer"`.
   - Si `href` es ruta interna o `#anchor`, sin `target="_blank"`.

4. **No** cambiar los `href` de los 15+ consumidores salvo que el texto del botón diga explícitamente “WhatsApp” (hoy ninguno lo dice — verificar con grep).

**Verificación de usos críticos (no modificar si ya correcto):**

- `src/pages/index.astro`: `href="#diagnostico"` en hero — **mantener**
- Artículos y money pages: default `/contacto` — **correcto**

---

## Tarea 3.6 — (Opcional recomendado) Meta del hub novedades

**Archivo:** `src/pages/novedades-ia/index.astro`

Cambiar:

```astro
<Layout title="Novedades IA | TAP-IA">
```

a:

```astro
<Layout
  title="Novedades IA | TAP-IA"
  description="Noticias y análisis de IA filtrados por impacto real en marketing, visibilidad y automatización."
>
```

(Reutilizar texto de `DEFAULT_DESCRIPTIONS['/novedades-ia']` en `seo.ts`.)

---

# Criterios de aceptación (Definition of Done)

- [ ] **AC1:** En `novedades-ia/index.astro` no hay `<input>` de búsqueda
- [ ] **AC2:** No hay `<a href="/novedades-ia">` repetidos simulando filtros (sección eliminada o spans deshabilitados)
- [ ] **AC3:** No queda HTML comentado de “Cargar más”
- [ ] **AC4:** Card Avatares en `portafolio/index.astro` muestra badge “Próximamente” y copy sin prometer demos listas
- [ ] **AC5:** `CtaWhatsApp.astro` documentado; enlaces `http*` abren en nueva pestaña con `rel` seguro
- [ ] **AC6:** `npm run build` exit code 0
- [ ] **AC7:** Regresión Fase 1: `grep noticia-mock` en `index.astro` + `novedades-ia/index.astro` → 0
- [ ] **AC8:** Regresión Fase 2: `grep agentes-autonomos-operativa-real src/lib/seo.ts` → 0
- [ ] **AC9:** Solo archivos de alcance modificados (máx. 4–5 archivos listados abajo)

**Archivos esperados en el diff:**

- `src/pages/novedades-ia/index.astro` (obligatorio)
- `src/pages/portafolio/index.astro` (obligatorio)
- `src/components/CtaWhatsApp.astro` (obligatorio)
- `src/pages/portafolio/avatares-ia/index.astro` (solo si hubo cambio menor)

---

# Verificación (ejecutar tú)

```bash
grep -n "Buscar noticia" src/pages/novedades-ia/index.astro
# → 0 resultados

grep -n 'href="/novedades-ia"' src/pages/novedades-ia/index.astro
# → 0 en sección filtros (puede haber enlaces en artículos — OK)

grep -n "Cargar más" src/pages/novedades-ia/index.astro
# → 0 resultados

grep -n "Próximamente" src/pages/portafolio/index.astro
# → al menos 1 (badge avatares)

grep "noticia-mock" src/pages/index.astro src/pages/novedades-ia/index.astro
grep "agentes-autonomos-operativa-real" src/lib/seo.ts

npm run build
```

**Smoke test manual (documentar en reporte):**

1. `/novedades-ia` — sin buscador ni pills clicables falsas; 2 artículos visibles
2. `/portafolio` — card Avatares con badge “Próximamente”
3. `/` — CTA hero sigue llevando a `#diagnostico`
4. Cualquier money page — CTA lleva a `/contacto`

---

# Anti-patrones

- No añadir JavaScript de filtrado/búsqueda “placeholder”
- No cambiar slugs, SEO ni contenido de artículos
- No renombrar `CtaWhatsApp.astro` ni actualizar todos los imports en esta fase
- No poner `wa.me` como default global del componente (el funnel principal es `/contacto` y formulario)
- No eliminar la sección de artículos reales en novedades

---

# Formato de respuesta obligatorio

```
## Fase 3 — Reporte de ejecución

### Archivos modificados
- [lista]

### Cambios por tarea
- 3.1: [A eliminada / B spans — cuál]
- 3.2: [eliminado buscador / texto opcional]
- 3.3: [limpieza cargar más]
- 3.4a: [sin cambios / detalle]
- 3.4b: [badge + copy hover]
- 3.5: [comentario + target blank]
- 3.6: [hecho / omitido]

### Criterios de aceptación
- AC1–AC9: ✅/❌ cada uno

### Salida grep
- Buscar noticia: [0/N]
- href filtros duplicados: [0/N]
- Cargar más: [0/N]
- Próximamente portafolio: [sí/no]
- Regresiones Fase 1/2: [OK/FAIL]

### Build
- Resultado: [éxito / error]

### Smoke test manual
- [4 bullets]

### Pendientes
- [ninguno / listar]
```
```

---

## Después de Fase 3

| Fase | Tema |
|------|------|
| **Fase 4** | Legal y cookies (alinear texto con analytics real) |
| **Fase 5** | Deploy Node + smoke test producción |
| **Fase 6** | n8n + formulario E2E |

---

## Validación (orquestador)

Cuando el agente entregue el reporte, el orquestador validará AC1–AC9 contra el repositorio.
