# Rúbrica de validación — Marketing-Dev-Team

Marcar **PASS** / **FAIL** antes de entregar al usuario.

## P0 (bloqueante)

| # | Criterio | PASS si |
|---|----------|---------|
| 1 | Alcance | Solo cambios pedidos; sin refactors colaterales |
| 2 | Build | `npm run build` (o equivalente) exitoso |
| 3 | Rutas críticas | Sin 404 en paths acordados |
| 4 | Secretos | Ningún token en código ni commit |
| 5 | SEO técnico (si tocó web) | Canonical/robots/sitemap coherentes |
| 6 | Deploy (si tocó prod) | Comando start documentado y compatible con adapter |
| 7 | Formularios (si aplica) | Env documentado o fallback explícito |
| 8 | Estrategia Tap-IA (si aplica) | Alineado con `docs/estrategia-seo-geo-tap-ia.md` |

**Entrega de código:** 8/8 P0 PASS (o excepción documentada con acuerdo del usuario).

## P1 (recomendado, no bloqueante salvo petición)

| # | Criterio |
|---|----------|
| 9 | Lighthouse performance ≥ 80 en mobile (página tocada) |
| 10 | a11y: focus visible, labels en formularios |
| 11 | Imágenes: alt descriptivo, formatos modernos donde aplique |
| 12 | Observabilidad: errores de API logueados sin filtrar PII |

## Informe de bloqueo (si FAIL persistente)

Incluir: qué ítem falló, evidencia (log/comando), opciones (A/B), recomendación del Director.
