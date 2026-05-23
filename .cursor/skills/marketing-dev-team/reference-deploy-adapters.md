# Adaptación a despliegue — matriz por stack

El Director identifica el modo del proyecto **antes** de proponer hosting.

## Detección rápida

| Señal en repo | Modo probable | Artefacto / start |
|---------------|---------------|-------------------|
| `output: 'static'` (Astro) | SSG | `dist/` estático → CDN |
| `output: 'server'` + `@astrojs/node` | SSR Node | `node ./dist/server/entry.mjs` |
| `output: 'hybrid'` | Mixto | Revisar rutas prerender vs server |
| Next `next start` | Node SSR/ISR | `npm run build && npm start` |
| Vite SPA sin SSR | Static | `dist/` → CDN |
| `vercel.json` / adapter Vercel | Serverless | Seguir docs del adapter |

## Reglas universales

1. **No commitear** `dist/`, `.env`, secretos.
2. Documentar en `.env.example` todas las variables que el código lee.
3. **Build en CI o en servidor** con `npm ci` (lockfile committed).
4. Tras deploy: **smoke test** de rutas críticas + formulario + sitemap.

## Tap-IA (referencia)

| Parámetro | Valor |
|-----------|--------|
| Framework | Astro 5, `output: 'server'` |
| Adapter | `@astrojs/node` standalone |
| Build | `npm run build` |
| Start | `node ./dist/server/entry.mjs` |
| Site URL | `https://tap-ia.tech` |
| Error conocido sin Fase 6 | POST `/api/submit` → 500 sin `N8N_WEBHOOK_URL` |

Runbook: `docs/deploy-runbook.md`. Plan: `docs/plan-fase-5-deploy.md`.

## Hosting — criterios de elección

| Necesidad | Opciones típicas |
|-----------|------------------|
| SSR Node simple | Railway, Render, Fly.io, Coolify, VPS + PM2 |
| Solo estático | Cloudflare Pages, Netlify, S3+CloudFront |
| Edge + serverless | Vercel, Netlify (según adapter) |
| Docker propio | Dockerfile multi-stage: build → run node |

## Checklist adaptación a proyecto nuevo

- [ ] Leer `package.json` scripts (`build`, `start`, `preview`).
- [ ] Leer config framework (`astro.config.*`, `next.config.*`).
- [ ] Listar env vars usadas en código (`grep` / `import.meta.env`).
- [ ] Confirmar si hay API routes / server endpoints.
- [ ] Escribir o actualizar runbook mínimo (build, start, env, smoke).
- [ ] Verificar que el host elegido soporta el **runtime** requerido.

## Smoke test mínimo (plantilla)

- [ ] Home 200
- [ ] Una money page 200
- [ ] `/robots.txt` y `/sitemap.xml` 200
- [ ] Formulario o CTA principal (éxito o fallback documentado)
- [ ] SSL y redirect www/non-www según política
- [ ] Una página noindex no aparece en sitemap
