# Runbook de automatización editorial diaria

Este flujo produce contenido editorial final para `/blog`. El contenido se genera en un bundle aislado y solo se copia a `content/blog` y `public/images/blog` después de la revisión final de Codex. No existe una etapa de borrador publicable.

## Ventana y calendario

- Zona horaria: `America/Mexico_City`.
- Investigación: desde las 06:00 del día anterior hasta las 06:00 del día actual.
- Preparación y revisión de diseño: 06:00.
- Promoción, build, commit, push y verificación de despliegue: 08:30, con objetivo de estar publicado a las 09:00.
- Si una ejecución llega tarde o un gate falla, no se publica contenido parcial ni se compensa automáticamente fuera de la siguiente ventana.

## Diseño para GPT-5.6 Luna

Las automatizaciones usan GPT-5.6 Luna, catalogado en este entorno como un modelo rápido y económico frente a Sol, que está orientado a tareas agentic de frontera. Para conservar calidad con Luna:

- La preparación se divide por fases y por noticia; no se le pide investigar, escribir nueve artículos, revisar diseño y validar todo en una sola operación mental.
- Los scripts son la fuente de verdad para conteos, niveles, rutas, JSON-LD, secretos y gates. Luna debe ejecutarlos y corregir únicamente los errores que reporten.
- La investigación debe conservar un registro breve por noticia: afirmación, fuente primaria, fecha, evidencia y consecuencia editorial. No se permite rellenar huecos con memoria.
- Los artículos se generan por cluster y tipo editorial, guardando cada archivo inmediatamente en el bundle aislado. Después de cada cluster se valida el contrato antes de continuar.
- La publicación de las 08:30 no investiga ni reescribe: verifica manifiesto, promueve archivos autorizados, ejecuta build, valida rutas y publica solo si los gates son verdaderos.
- Ante una decisión ambigua, falta de evidencia o salida de herramienta inesperada, Luna debe detenerse y emitir alerta material; no debe improvisar una solución de arquitectura.

## Selección determinista

Se investigan fuentes primarias y secundarias verificables. Cada noticia se puntúa antes de ordenar el top 3:

| Criterio | Puntos |
| --- | ---: |
| Novedad confirmada dentro de la ventana | 0–2 |
| Autoridad de la fuente primaria | 0–3 |
| Cambio técnico verificable | 0–3 |
| Impacto en negocio, marketing u operación | 0–3 |
| Señal de mercado o adopción | 0–2 |
| Utilidad para la audiencia B2B de TAP-IA | 0–2 |

Clasificación:

- `advanced`: 11–15 puntos y al menos una fuente primaria suficiente. Produce `technical`, `marketing` y `market`.
- `intermediate`: 7–10 puntos y al menos una fuente primaria suficiente. Produce `technical` y `marketing`.
- `basic`: 0–6 puntos con fuente verificable. Produce `combined`.

La clasificación no se rebaja para ocultar la falta de evidencia: si no existe fuente primaria suficiente, la noticia se rechaza. El archivo `scripts/validate-editorial-plan.mjs` comprueba que cada noticia tenga exactamente los tipos editoriales que le corresponden y que el total no supere nueve artículos.

## Contrato de contenido

Cada Markdown vive primero en `var/blog-runs/YYYY-MM-DD/bundle/content/blog/` y debe cumplir el esquema de `src/content.config.ts`. Cada artículo necesita:

- título, descripción, fecha de publicación y sección;
- nivel de importancia, tipo editorial y `newsClusterId`;
- hero original con alt text descriptivo;
- una o más fuentes visibles con URL y fecha cuando exista;
- enlaces internos relevantes y preguntas frecuentes solo si se muestran en HTML;
- `reviewedByCodex: true` únicamente después de la revisión final;
- video de YouTube solo con coincidencia estricta de noticia o modelo, nunca por similitud temática.

Las imágenes deben conservar el lenguaje visual aprobado de TAP-IA: tecnología premium, negro/grafito, blanco, oro/ámbar, composición editorial y sin texto incrustado. La imagen se genera con la capacidad `image_gen` disponible en la ejecución y se copia a `public/images/blog/` únicamente durante la promoción autorizada.

## Antigravity desde CLI

La integración usa el binario local `agy`. La ayuda real de `agy` confirma los flags usados por el wrapper; no se inventan argumentos del proveedor. La configuración por defecto es:

```text
ANTIGRAVITY_BIN=agy
ANTIGRAVITY_MODEL=gemini-3.6-flash-high
agy --print <prompt> --model gemini-3.6-flash-high --effort high --mode accept-edits --output-format json --json-schema config/antigravity-review.schema.json --add-dir <capturas>
```

El wrapper `scripts/run-antigravity-review.mjs` ejecuta `agy` con `shell: false`, entrega el preview y las capturas, fuerza el JSON Schema de `config/antigravity-review.schema.json` y exige un resultado con esta forma mínima:

```json
{
  "decision": "approved",
  "previewUrl": "http://localhost:4321/blog",
  "filesModified": ["src/pages/blog/index.astro"],
  "checks": { "desktop": true, "mobile": true }
}
```

Si `agy` no existe, no puede abrir sus recursos locales, termina con error o devuelve `rejected`, el flujo se detiene. `ANTIGRAVITY_ARGS_JSON` continúa disponible como override explícito cuando una versión concreta de `agy` requiera argumentos adicionales.

## Última revisión de Codex

Después de que Antigravity termine, Codex debe inspeccionar su diff y asumir la autoridad final. Debe verificar o corregir directamente:

- layout desktop/mobile, navegación, enlaces, accesibilidad y carga de imágenes;
- `Organization`, `Person`, `WebSite`, `BreadcrumbList`, `Article`/`NewsArticle`/`BlogPosting`, `FAQPage`, `VideoObject`, `ImageObject` e `ItemList` solo cuando corresponda al HTML visible;
- title, description, canonical, robots, Open Graph, Twitter Cards, H1, encabezados, alt text, enlaces internos, sitemap, robots.txt y `llms.txt`;
- afirmaciones, fechas, fuentes y consistencia entre contenido visible y JSON-LD.

La salida se marca `ready_to_publish` solo con el gate `codexFinalReview.status = passed`. Entonces se ejecuta `npm run promote:blog-run`, `npm run build` y `npm run validate:blog`. El validador requiere un servidor local para revisar cada URL nueva.

## Promoción y publicación

El manifiesto se guarda en `var/blog-runs/YYYY-MM-DD/manifest.json` y registra noticias, puntuaciones, fuentes, artículos, imágenes, video, Antigravity, revisión final de Codex, build, archivos autorizados, commit, push y despliegue. `var/blog-runs/` está ignorado para que los artefactos operativos no contaminen el commit.

La automatización nunca ejecuta `git add -A`. Solo promociona los archivos declarados en `authorizedFiles`, verifica que el árbol no tenga cambios ajenos, ejecuta build y validación, y entonces puede hacer commit y push a `main`. Hostinger debe confirmar el despliegue; si no existe confirmación verificable, el gate falla y no se continúa.

## Prompt operativo de las automatizaciones

### Preparación 06:00

Lee `AGENTS.md`, `docs/estrategia-seo-geo-tap-ia.md` y este runbook. Trabaja en el proyecto actual. Verifica `git status --porcelain`; si hay cambios no relacionados, detente y escribe una alerta material en `var/blog-runs/YYYY-MM-DD/manifest.json` sin tocar archivos publicables. Investiga con navegador y fuentes primarias/secundarias la ventana 06:00–06:00 de `America/Mexico_City`, selecciona exactamente tres noticias, puntúalas, clasifícalas y ejecuta `npm run validate:editorial-plan`. Genera el bundle final de hasta nueve artículos, imágenes originales y videos únicamente con coincidencia estricta. Ejecuta el preview local, captura desktop/mobile y llama a `npm run review:antigravity` con el binario y argumentos configurados en el entorno. Después de Antigravity, realiza la revisión final completa de Codex, corrige SEO/GEO y JSON-LD, ejecuta `npm run build` y deja un manifiesto `ready_to_publish` únicamente si todos los gates pasan. No hagas commit ni push en esta fase.

### Publicación 08:30

Lee el manifiesto del día y todos los documentos de gobierno. Si no existe un manifiesto `ready_to_publish`, si Antigravity no está aprobado, si el árbol tiene cambios ajenos o si falta evidencia de Hostinger, detente sin commit/push. Vuelve a inspeccionar el diff de Antigravity y ejecuta la revisión final de Codex; cualquier corrección debe quedar registrada antes de promover. Ejecuta `npm run promote:blog-run`, `npm run build`, inicia el servidor de producción o preview, y ejecuta `npm run validate:blog -- --manifest var/blog-runs/YYYY-MM-DD/manifest.json --base-url <preview-local>`. Verifica todas las URLs, JSON-LD, sitemap, robots.txt, `llms.txt` y ausencia de secretos. Solo entonces agrega los archivos autorizados, commit en `main`, push y comprueba el despliegue público de Hostinger. Actualiza el manifiesto con cada resultado. Ante cualquier fallo, no publiques ni uses archivos parciales.
