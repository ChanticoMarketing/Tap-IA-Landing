# Auditoría SEO/GEO de TAP-IA

## 1) Inventario de URLs indexables por intención

### Home / Hubs
- `/`
- `/soluciones`
- `/portafolio`
- `/novedades-ia`
- `/recursos`

### Servicios (money pages)
- `/consultoria-inteligencia-artificial`
- `/soluciones/seo-geo`
- `/ai-marketing`
- `/agentes-ia-a-medida`
- `/webapps-ia-a-medida`
- `/auditoria-ia-marketing-seo-geo`
- `/soluciones/web`
- `/soluciones/agentes-ia`
- `/soluciones/ai-marketing`
- `/soluciones/webapps`
- `/soluciones/avatares-ia`

### Confianza / institucional
- `/sobre`
- `/contacto`
- `/legal`

### Portafolio (evidencia social)
- `/portafolio/sitios-web`
- `/portafolio/seo-geo`
- `/portafolio/agentes-ia`
- `/portafolio/webapps`
- `/portafolio/ai-marketing`
- `/portafolio/avatares-ia`

### Editorial / recursos
- `/novedades-ia/noticia-mock`

### Demos técnicas
- `/demos/zapa-elite`
- `/demos/real-estate`
- `/demos/pagos-pro`
- `/demos/pagos-pro/manifiesto`
- `/demos/pagos-pro/sistema`

## 2) Auditoría técnica SEO/GEO (metadatos, canonical, schema, señales de entidad)

### Lo que está bien
- `src/layouts/Layout.astro` centraliza:
  - `meta description`
  - `robots=index,follow`
  - `canonical` absoluto con `Astro.url.pathname`
  - Open Graph y Twitter cards
  - `SchemaOrganization` global
- `src/components/SchemaOrganization.astro` define entidad de marca con `knowsAbout`, `sameAs`, contacto y catálogo de oferta.
- `src/components/SchemaService.astro` se usa correctamente en páginas BOFU principales.
- Hay `FAQPage` en páginas clave:
  - `src/pages/soluciones/seo-geo.astro`
  - `src/pages/consultoria-inteligencia-artificial.astro`
  - `src/pages/ai-marketing.astro`
  - `src/pages/agentes-ia-a-medida.astro`
- `public/robots.txt` permite rastreo de bots tradicionales y bots de IA.

### Riesgos y gaps detectados
- `astro.config.mjs` importa `@astrojs/sitemap` pero no lo activa en `integrations`, por lo que el sitemap no está automatizado.
- `public/sitemap.xml` es manual y parcial (faltan múltiples rutas indexables actuales).
- Muchas páginas usan solo `title` y heredan `description` default (baja diferenciación semántica):
  - varios `src/pages/soluciones/*.astro`
  - varios `src/pages/portafolio/**/*.astro`
  - `src/pages/novedades-ia/index.astro`
  - `src/pages/novedades-ia/noticia-mock.astro`
  - `src/pages/recursos/index.astro`
  - `src/pages/legal.astro`
- No se usan props `keywords` ni `ogImage` específicas por página.
- Falta schema en páginas que por intención deberían tenerlo:
  - `Service` en varias páginas de `/soluciones/*`
  - `FAQPage` en `soluciones/web.astro` (tiene FAQ visual pero no marcado)
  - `Article/NewsArticle` en `novedades-ia/noticia-mock.astro`
  - `ItemList` en hubs de listados
  - `BreadcrumbList` en páginas profundas
- Las páginas de `src/pages/demos/**` no usan `Layout`, por lo que quedan sin canonical/OG/Twitter/schema.

## 3) Canibalización y conflictos de intención

### Pares con alta superposición temática
- `/ai-marketing` vs `/soluciones/ai-marketing`
- `/agentes-ia-a-medida` vs `/soluciones/agentes-ia`
- `/webapps-ia-a-medida` vs `/soluciones/webapps`

### Riesgo
- Cada URL se auto-canoniza, por lo que no existe señal explícita de página principal por tema.
- Se fragmenta autoridad de enlaces internos y relevancia semántica entre dos URLs para la misma intención comercial.

### Decisión recomendada (arquitectura)
- Mantener una sola money page por tema y la otra convertirla en:
  - redirección 301, o
  - página de apoyo claramente diferenciada por intención (ej. comparativa, pricing o metodología avanzada).

## 4) Enlazado interno y arquitectura de clusters

### Estado actual
- Arquitectura principal tipo hub-and-spoke correcta:
  - Home -> servicios
  - Hub `soluciones` -> verticales
  - Hub `portafolio` -> categorías demo
- Problema principal: enlazado muy vertical hacia `/contacto`.
- Baja malla lateral entre servicios, novedades y recursos.
- `novedades-ia` tiene filtros que no abren categorías reales (enlaces autoreferenciales).
- `recursos` no empuja autoridad hacia páginas de servicio concretas.

### Propuesta de interlinking objetivo
- Cada página de servicio debe enlazar mínimo a:
  - 2 servicios hermanos relacionados
  - 1 activo de evidencia (`/portafolio/...`)
  - 1 activo editorial (`/novedades-ia/...` o `/recursos/...`)
  - CTA de conversión (`/contacto`)
- Cada pieza editorial debe enlazar a:
  - 1 servicio principal
  - 1 servicio secundario
  - 1 recurso o checklist
- Footer expandido con enlaces estratégicos de servicio (no solo legal).

## 5) Cobertura sitemap vs URLs reales

### Sí aparecen en sitemap manual actual
- `/`
- `/soluciones`
- `/consultoria-inteligencia-artificial`
- `/soluciones/seo-geo`
- `/ai-marketing`
- `/agentes-ia-a-medida`
- `/webapps-ia-a-medida`
- `/auditoria-ia-marketing-seo-geo`
- `/portafolio`
- `/novedades-ia`
- `/sobre`
- `/contacto`
- `/soluciones/web`
- `/demos/zapa-elite`
- `/demos/real-estate`
- `/demos/pagos-pro`

### No aparecen (pero hoy son indexables)
- `/legal`
- `/recursos`
- `/soluciones/agentes-ia`
- `/soluciones/ai-marketing`
- `/soluciones/webapps`
- `/soluciones/avatares-ia`
- `/portafolio/sitios-web`
- `/portafolio/seo-geo`
- `/portafolio/agentes-ia`
- `/portafolio/webapps`
- `/portafolio/ai-marketing`
- `/portafolio/avatares-ia`
- `/novedades-ia/noticia-mock`
- `/demos/pagos-pro/manifiesto`
- `/demos/pagos-pro/sistema`

## 6) Priorización P1 / P2 / P3 (impacto vs esfuerzo)

### P1 (impacto alto, urgencia alta)
1. Definir URL canónica única por vertical para eliminar canibalización raíz vs `/soluciones/*`.
2. Activar sitemap automático con `@astrojs/sitemap` o mantener el manual pero alineado 100% con rutas indexables.
3. Completar metadatos únicos (`title`, `description`, `ogImage`) en todas las páginas indexables.
4. Añadir schema faltante mínimo:
   - `Service` en páginas de solución sin marcado
   - `Article/NewsArticle` en novedades
   - `BreadcrumbList` en páginas profundas

### P2 (impacto alto, urgencia media)
1. Rediseñar malla de interlinking contextual entre servicios, portafolio, novedades y recursos.
2. Convertir `novedades-ia` en cluster real (categorías con URLs, artículos no-mock, fuentes y autoría).
3. Enriquecer páginas de portafolio con evidencia citable (proceso, métricas, stack, resultados).

### P3 (impacto medio, optimización continua)
1. Extender entidad con `@id` consistente entre `Organization`, `Service` y páginas.
2. Definir taxonomía editorial GEO (glosario, frameworks, comparativas, FAQs por intención long-tail).
3. Medición GEO operativa:
   - porcentaje de páginas con schema completo
   - porcentaje con metadatos únicos
   - ratio de páginas con al menos 4 enlaces contextuales salientes internos
   - menciones/citaciones en motores generativos

## 7) Resumen ejecutivo de estado

La estrategia SEO/GEO de TAP-IA está bien orientada en narrativa y estructura comercial, pero todavía no está consolidada a nivel de arquitectura de indexación y grafo semántico. El mayor potencial inmediato está en: unificar URLs por intención, cerrar cobertura técnica (sitemap + metadatos + schema) y transformar la malla interna para distribuir autoridad hacia páginas profundas y contenido citable.
