---
name: marketing-dev
description: Implementador de código experto en páginas web, SEO y GEO técnico para Tap-IA. Evita la sobre-ingeniería aplicando las mejores prácticas de Ponytail. Accionable con /Marketing-Dev.
---

# /Marketing-Dev — Manual Operativo de Implementación Web, SEO y GEO Técnico para Tap-IA

Este manual de skill personalizado define el estándar operativo para la creación, modificación y mantenimiento del sitio web de Tap-IA. Su objetivo es asegurar un desarrollo web ágil, de alta performance, optimizado para indexación tradicional (SEO) y citación por inteligencia artificial (GEO) en 2026, eliminando de raíz la sobre-ingeniería innecesaria.

---

## 1. Filosofía Ponytail: Simplificar y Eliminar el "Óxido"
Para cualquier tarea de implementación, el desarrollador web de marketing digital de Tap-IA debe aplicar la **Ley del Esfuerzo Mínimo Eficaz**:
- **Preguntar si debe existir**: ¿Esta feature o componente añade valor directo de conversión o visibilidad? Si la respuesta es "no", no se crea.
- **Nativo Primero**: Usar las capacidades nativas de la plataforma (HTML5 semántico, CSS Vanilla, APIs nativas del navegador) antes de instalar una dependencia NPM.
- **Estructura Astro Limpia**:
  - Utilizar componentes `.astro` (estáticos y SSR) para la mayor parte del layout.
  - Implementar componentes dinámicos `.tsx` (React) **únicamente** cuando se requiera reactividad del lado del cliente o animaciones complejas de Framer Motion.
- **Sin Redundancia de Estilo**: Seguir strictly las directrices del [DESIGN_SYSTEM.md](file:///Users/tap-ia/Códigos/Tap-IA%20-%20Pa%CC%81gina%20Web/DESIGN_SYSTEM.md). Usar clases utilitarias del tema de Tailwind v4 (`bg-charcoal`, `text-offwhite`, `card-glow`, `matte-card`) y tipografías específicas (`font-playfair` para títulos, `font-jakarta` para el cuerpo).

---

## 2. Directrices de SEO Técnico e Indexabilidad
El SEO tradicional representa el 80% de una estrategia GEO exitosa. Si el contenido no se indexa, la IA no puede recuperarlo.
- **Indexación y Acceso de Bots**:
  - Asegurar que `robots.txt` no bloquee a los agentes de IA críticos: `Googlebot`, `Bingbot`, `GPTBot`, `OAI-Searchbot`, `PerplexityBot`, `ClaudeBot` y `Google-Extended`.
  - Mantener actualizados los sitemaps XML (`src/pages/sitemap.xml.ts`) y la configuración de `robots.txt.ts`.
- **Estructura HTML Semántica**:
  - Un único tag `<h1>` por página, conteniendo la palabra clave principal de alta intención.
  - Títulos jerárquicos (`<h2>`, `<h3>`) limpios y estructurados.
  - Atributos `alt` descriptivos y útiles en todas las imágenes.
- **Schema Markup Completo (JSON-LD)**:
  - Inyectar metadatos enriquecidos en `src/lib/seo.ts` de forma dinámica.
  - Implementar esquemas estructurados de `Organization`, `Person` (Emmanuel Tapia), `Service`, `Article` y `FAQPage`.
  - **Entidades Conectadas**: Incluir la propiedad `sameAs` apuntando a perfiles externos autoritativos (LinkedIn, G2, Capterra, Crunchbase, etc.) para consolidar la red de confianza de la entidad de marca.

---

## 3. Directrices GEO (Generative Engine Optimization) de 2026
El objetivo del GEO es maximizar la **Frecuencia de Citación de IA (AICF)** y el **Prompt Share** en respuestas de Claude, ChatGPT, Perplexity y Gemini.

### A. Estructuración del Contenido para RAG (Retrieval-Augmented Generation)
Los motores de IA no leen como los humanos; extraen fragmentos textuales basados en relevancia conceptual y factual.
- **La Regla del Primer 30% (Direct-Answer Lead)**: Formular la respuesta directa a la consulta del usuario en las primeras 60 a 120 palabras de la página. Evitar introducciones narrativas largas.
- **Densidad Factual**: Añadir como mínimo una estadística verificable, fecha concreta o entidad nombrada reconocible por cada 100 palabras de contenido. Las opiniones sin bases empíricas son descartadas por los LLMs.
- **Citas de Autoridad**: Incluir testimonios, citas literales de expertos y referencias externas validadas. Los LLMs asocian la inyección de citas con fiabilidad y reducción de alucinación.
- **Encabezados Conversacionales**: Nombrar las secciones (`<h2>`, `<h3>`) usando las preguntas literales o prompts que los usuarios hacen a los chatbots de IA (ej. *¿Cómo optimizar mi sitio web para ChatGPT Search?*).
- **Contenido No Mercantilizado**: Crear contenido de valor único basado en datos propios de Tap-IA, casos de estudio detallados, auditorías reales y frameworks propios (evitar copiar conceptos genéricos que el LLM ya conoce de su entrenamiento base).

### B. Mantenimiento y Frescura (Freshness)
- Los LLMs penalizan los datos obsoletos. Realizar ciclos de actualización semántica de los artículos clave de forma periódica.
- Asegurar que la fecha de modificación `lastmod` esté presente de forma precisa en el Sitemap XML.

---

## 4. Medición, UTMs y Captura del "Dark Funnel"
Dado que las analíticas tradicionales (GA4) categorizan erróneamente el tráfico directo desde motores de búsqueda con IA, el programador de marketing debe estructurar la captura de datos:
- **Parámetros de Seguimiento (UTMs)**: Crear y mantener reglas de etiquetado para visitas provenientes de `chatgpt.com`, `perplexity.ai`, `gemini.google.com` y `claude.ai`.
- **Atribución Autodeclarada**: En formularios críticos de contacto y diagnóstico, forzar un campo de texto o selección de atribución: *"¿Cómo nos descubriste?"*, permitiendo a los clientes indicar de forma explícita si llegaron por recomendación de una IA (ChatGPT/Perplexity).
- **Métricas de Éxito GEO**: Monitorear periódicamente los indicadores de visibilidad mediante prompts de prueba mensuales en los motores líderes para evaluar si la marca y soluciones de Tap-IA son citadas o recomendadas.
