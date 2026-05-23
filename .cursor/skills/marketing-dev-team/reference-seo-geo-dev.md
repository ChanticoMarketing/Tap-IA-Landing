# SEO/GEO — checklist para desarrollo

Alinear implementación con estrategia de contenido (`docs/estrategia-seo-geo-tap-ia.md` en Tap-IA). **GEO** = citabilidad en respuestas generativas (estructura, claridad, entidades), no hacks.

## P0 — antes de merge / deploy

- [ ] **Title y meta description** únicos por URL indexable; longitud razonable.
- [ ] **Canonical** correcto; overrides documentados (ej. `CANONICAL_OVERRIDES` en `src/lib/seo.ts`).
- [ ] **robots** coherente: `noindex` en thank-you, legal, mocks, demos si aplica.
- [ ] **Sitemap** incluye solo rutas indexables; excluye noindex.
- [ ] **Un H1** por página; jerarquía H2–H3 lógica.
- [ ] **Schema** adecuado al tipo (Organization, Service, Article, ItemList) sin datos inventados.
- [ ] **Enlaces internos** desde hubs (home, soluciones, blog) hacia money pages.
- [ ] **Open Graph / Twitter** cuando el layout lo soporte.
- [ ] **URLs limpias**, sin parámetros basura en indexables.
- [ ] **Core Web Vitals**: LCP razonable (imágenes con dimensiones, lazy donde aplique, fuentes no bloqueantes).

## GEO / LLMO (técnico)

- [ ] Contenido **respondible**: definiciones, listas, FAQs con preguntas literales de búsqueda.
- [ ] **Datos estructurados** que reflejen hechos reales del negocio.
- [ ] Evitar texto oculto o stuffing; la estrategia de contenido manda el copy.
- [ ] Opcional experimento: `llms.txt` / `llms-full.txt` si el proyecto lo adopta (documentar en README).

## Tap-IA — archivos habituales

| Área | Ubicación |
|------|-----------|
| Rutas indexables | `src/lib/seo.ts` → `INDEXABLE_ROUTES`, `NOINDEX_ROUTES` |
| Sitemap dinámico | `src/pages/sitemap.xml.ts` |
| Robots | `src/pages/robots.txt.ts` |
| Schema components | `src/components/Schema*.astro` |
| Layout meta | `src/layouts/Layout.astro` |

## Validación manual post-cambio

1. View-source: title, canonical, robots meta.
2. `/sitemap.xml` y `/robots.txt` en preview.
3. Rich Results Test (Google) si hay schema nuevo.
4. Una URL noindex devuelve `noindex` en meta o header.
