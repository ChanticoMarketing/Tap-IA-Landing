# Plan Fase 5 — Deploy y smoke test (Tap-IA)

> **Objetivo:** publicar el sitio en producción con **Node SSR** (`@astrojs/node` standalone), validar rutas críticas en `https://tap-ia.tech` y dejar documentado el runbook para operación. El formulario de contacto notifica leads vía **Resend** a `emmanuel@tap-ia.tech`.

**Precondiciones:** Fases 1, 2, 3 y 4 aprobadas (Fase 4 con placeholders legales resueltos **antes de tráfico público**).

**Duración estimada:** 2–6 horas (según proveedor de hosting y DNS).

---

## 1. Resumen ejecutivo (tap-cmo)

Tap-IA **no es un sitio estático**: `astro.config.mjs` define `output: 'server'` + adapter Node `standalone`. Un host solo de archivos estáticos (GitHub Pages, S3 sin SSR) **no sirve**. El comando de producción tras build es:

```bash
node ./dist/server/entry.mjs
```

**Formulario:** requiere `RESEND_API_KEY` y remitente verificado en Resend. Sin ellas, `/api/submit` devuelve 500. Los leads llegan a `emmanuel@tap-ia.tech`.

---

## 2. Stack de despliegue (referencia técnica)

| Parámetro | Valor |
|-----------|--------|
| Framework | Astro 5 |
| Modo | SSR (`output: 'server'`) |
| Adapter | `@astrojs/node` → `mode: 'standalone'` |
| Build | `npm run build` → artefactos en `dist/` |
| Start | `node ./dist/server/entry.mjs` |
| `site` / canonical | `https://tap-ia.tech` |
| Puerto | Variable `PORT` (típ. 4321 o la del host) |
| `dist/` | En `.gitignore` — **no commitear**; build en CI o en servidor |

### Variables de entorno

| Variable | Obligatoria | Notas |
|----------|-------------|--------|
| `PORT` | Según host | Muchos PaaS la inyectan automáticamente |
| `HOST` | Opcional | `0.0.0.0` en VPS/Docker |
| `RESEND_API_KEY` | **Sí** (formulario) | Sin ella, `/api/submit` devuelve 500 |
| `RESEND_FROM_EMAIL` | **Sí** (formulario) | Remitente en dominio verificado en Resend |

---

## 3. Checklist pre-deploy (P0)

Completar **antes** de apuntar DNS o anunciar el sitio:

- [ ] **P0.1** Reemplazar placeholders en `src/pages/legal.astro` (`[COMPLETAR: razón social/titular]`, `[COMPLETAR: contacto@tap-ia.tech]`)
- [ ] **P0.2** `npm run build` → exit code 0 en máquina limpia o CI
- [ ] **P0.3** Decidir proveedor (Railway, Render, Fly.io, VPS, Coolify, etc.)
- [ ] **P0.4** Dominio `tap-ia.tech` apuntando al host (A/CNAME + SSL)
- [ ] **P0.5** Confirmar que **no** se despliega solo `dist/client/` (debe correr el servidor Node)

---

## 4. Tareas Fase 5

### 5.0 — Documentación mínima en repo (recomendado)

| ID | Entregable | Archivo |
|----|------------|---------|
| 5.0.1 | `.env.example` con variables documentadas | raíz del repo |
| 5.0.2 | Sección Deploy en README o `docs/deploy-runbook.md` | comandos build/start |

**Contenido `.env.example` mínimo:**

```env
# Puerto del servidor Node (opcional; el host suele definir PORT)
PORT=4321
HOST=0.0.0.0

# Resend — leads del formulario → emmanuel@tap-ia.tech (destino fijo en código)
# RESEND_API_KEY=re_xxxxxxxx
# RESEND_FROM_EMAIL=Tap-IA Contacto <contacto@tap-ia.tech>
```

---

### 5.1 — Build de producción

```bash
npm ci
npm run build
```

**Verificar:**

- Existe `dist/server/entry.mjs`
- Existe `dist/client/` con assets

**Preview local (opcional):**

```bash
npm run preview
# o: node ./dist/server/entry.mjs
```

---

### 5.2 — Configuración del host

**Requisitos del proveedor:**

- Runtime **Node.js 20+** (o LTS actual)
- Proceso persistente (no serverless puro sin adapter compatible, salvo que soporte Astro Node)
- HTTPS terminado en el proxy o en la app
- Variables de entorno configurables

**Comando de inicio típico:**

```bash
node ./dist/server/entry.mjs
```

**Build en plataforma:** comando de build `npm run build`; directorio de salida el que espere el PaaS para Node (a menudo raíz con `dist/` tras build).

**Ejemplo Dockerfile (opcional, solo si el ejecutor crea uno):**

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=4321
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
```

*No obligatorio si usan PaaS con buildpacks.*

---

### 5.3 — DNS y SSL

- `tap-ia.tech` → host de producción
- `www.tap-ia.tech` → redirect a apex o viceversa (decisión única; coherente con `SITE_URL` en `seo.ts`)
- Certificado TLS válido (Let's Encrypt del proveedor)

---

### 5.4 — Smoke test en producción (obligatorio)

Ejecutar contra **`https://tap-ia.tech`** (no solo localhost).

#### Rutas HTTP 200

| URL | Qué validar |
|-----|-------------|
| `/` | Home carga; sección novedades con artículos reales |
| `/consultoria-inteligencia-artificial` | Money page |
| `/soluciones/seo-geo` | Money page |
| `/contacto` | Wizard visible |
| `/legal` | Sin placeholders `[COMPLETAR]` visibles |
| `/legal#privacidad` | Ancla desde footer |
| `/novedades-ia` | Sin buscador; 2 artículos |
| `/novedades-ia/claude-mythos-proyecto-glasswing-2026` | Artículo |
| `/novedades-ia/agentes-ia-marketing-2026-openclaw-manus-era-agentica` | Artículo + schema |
| `/portafolio` | Card Avatares con “Próximamente” |

#### SEO técnico

| URL | Esperado |
|-----|----------|
| `/robots.txt` | 200; Allow crawlers IA |
| `/sitemap.xml` | 200; **sin** `agentes-autonomos-operativa-real`; **con** slug artículo agentes |

#### Rutas que deben fallar o noindex (verificación)

| URL | Esperado |
|-----|----------|
| `/novedades-ia/agentes-autonomos-operativa-real` | **404** |
| `/novedades-ia/noticia-mock` | 200 pero `noindex` (o no enlazada desde home) |

#### Formulario (Resend)

| Prueba | Resultado esperado |
|--------|-------------------|
| POST `/api/submit` sin `RESEND_API_KEY` | 500 |
| POST `/api/submit` con Resend configurado | 200; correo en `emmanuel@tap-ia.tech` |
| WhatsApp en `/contacto` y hero | Enlace `wa.me/5213324239103` funciona |

#### Regresiones Fases 1–4

```bash
# En repo local (pre-deploy) o inspección manual en prod
# - Home: 0 enlaces a noticia-mock
# - /novedades-ia: 0 input "Buscar noticia"
# - /legal: 0 "[COMPLETAR"
```

---

### 5.5 — Post-deploy operativo

- [ ] Enviar sitemap en Google Search Console (opcional P2)
- [ ] Probar OG en [opengraph.xyz](https://www.opengraph.xyz/) o similar (P2)
- [ ] Verificar recepción de lead de prueba en `emmanuel@tap-ia.tech`

---

## 5. Criterios de aceptación (Definition of Done)

- [ ] **AC1:** Sitio accesible en `https://tap-ia.tech` con HTTPS válido
- [ ] **AC2:** Proceso Node SSR corriendo (no solo carpeta estática)
- [ ] **AC3:** `npm run build` documentado y reproducible
- [ ] **AC4:** `.env.example` (o runbook) en repo
- [ ] **AC5:** Smoke test: todas las rutas de §5.4 → 200 (excepto 404 esperado)
- [ ] **AC6:** `sitemap.xml` en prod sin URL fantasma; con artículo agentes
- [ ] **AC7:** `robots.txt` accesible en prod
- [ ] **AC8:** `/legal` sin placeholders `[COMPLETAR]` en producción
- [ ] **AC9:** Regresiones Fases 1–3 verificadas en prod
- [ ] **AC10:** Formulario con Resend documentado (`RESEND_*` en runbook)

---

## 6. Fuera de alcance (Fase 5)

- Auto-respuesta al lead por correo (solo notificación interna vía Resend)
- GA4, banner cookies Track B
- CI/CD completo (opcional P2)
- Commitear carpeta `dist/`

---

## 7. Leads del formulario (actualizado)

Los leads se envían solo por **Resend** a `emmanuel@tap-ia.tech`. No se usa n8n desde `/api/submit`.

Checklist operativo:

1. Dominio `tap-ia.tech` verificado en Resend
2. `RESEND_API_KEY` y `RESEND_FROM_EMAIL` en el host
3. Prueba E2E: formulario → `/contacto/gracias` → correo recibido

---

## 8. Prompt para agente ejecutor (copiar desde aquí)

> **Nota:** Parte de esta fase requiere **acceso al proveedor de hosting**, DNS y secretos. El agente prepara repo + runbook + verificaciones locales; el **usuario** ejecuta deploy en su PaaS/VPS salvo que el agente tenga credenciales.

```markdown
# Rol y contexto

Eres un **agente de DevOps / implementación** en el proyecto Astro SSR **Tap-IA** (`https://tap-ia.tech`).

**Objetivo:** completar la **Fase 5 — Deploy y smoke test** según `docs/plan-fase-5-deploy.md`.

**Precondiciones:**
- Fases 1–4 cerradas en código
- Usuario debe resolver placeholders legales **antes** de considerar AC8 en producción

**Fuera de alcance:**
- Integraciones CRM adicionales (n8n, Zapier) salvo que se pidan aparte
- Cambios en contenido editorial, SEO (`seo.ts`), legal (salvo aviso al usuario sobre placeholders)
- Commitear `dist/` o `node_modules/`

---

# Parte A — Repo y documentación (agente)

## T5.1 — Crear `.env.example` en la raíz

Variables mínimas documentadas (ver plan §5.0). Sin secretos reales.

## T5.2 — Crear `docs/deploy-runbook.md`

Incluir:

1. Requisitos (Node 20+, SSR, no estático)
2. Comandos: `npm ci`, `npm run build`, `node ./dist/server/entry.mjs`
3. Variables `PORT`, `HOST`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
4. Nota: formulario falla sin `RESEND_API_KEY`; destino fijo `emmanuel@tap-ia.tech`
5. Tabla smoke test §5.4 del plan
6. Comando curl de ejemplo para `robots.txt` y `sitemap.xml` en prod

## T5.3 — Verificar build local

```bash
npm run build
```

Exit code 0. Confirmar existencia de `dist/server/entry.mjs`.

## T5.4 — (Opcional) Añadir script en `package.json`

Solo si no existe:

```json
"start:prod": "node ./dist/server/entry.mjs"
```

Cambio mínimo; no refactorizar otros scripts.

---

# Parte B — Deploy (usuario + agente si hay acceso)

## T5.5 — Desplegar en host Node

- Build en CI o en servidor
- Start: `node ./dist/server/entry.mjs`
- SSL + dominio `tap-ia.tech`
- **No** desplegar como sitio estático

Si el agente **no** tiene acceso al host: documentar pasos exactos para Railway/Render/VPS genérico y marcar en reporte "Deploy pendiente de usuario".

---

# Parte C — Smoke test producción

Ejecutar checklist §5.4 contra `https://tap-ia.tech`.

Para cada URL: código HTTP y nota breve.

**curl de referencia:**

```bash
curl -sI https://tap-ia.tech/
curl -sI https://tap-ia.tech/sitemap.xml
curl -sI https://tap-ia.tech/robots.txt
curl -sI https://tap-ia.tech/novedades-ia/agentes-autonomos-operativa-real
curl -s https://tap-ia.tech/sitemap.xml | findstr /i "agentes"
```

En sitemap **no** debe aparecer `agentes-autonomos-operativa-real`.
**Sí** debe aparecer `agentes-ia-marketing-2026-openclaw-manus-era-agentica`.

Inspeccionar `/legal` en prod: **cero** ocurrencias de `[COMPLETAR`.

---

# Criterios de aceptación

Marcar ✅/❌: AC1–AC10 del plan §5.

---

# Formato de respuesta obligatorio

```
## Fase 5 — Reporte de ejecución

### Entregables en repo
- [archivos creados/modificados]

### Build local
- Comando y resultado

### Deploy producción
- Proveedor: [nombre / pendiente usuario]
- URL final: [https://tap-ia.tech / pendiente]
- Comando start usado

### Smoke test (producción o local preview)
| URL | HTTP | Nota |
|-----|------|------|
| ... | ... | ... |

### sitemap / robots
- Fantasma en sitemap: [sí/no]
- Artículo agentes en sitemap: [sí/no]

### Legal en prod
- Placeholders [COMPLETAR]: [0 / N]

### Formulario
- /api/submit + Resend: [200 + correo recibido / error]

### Criterios AC1–AC10
- [lista ✅/❌]

### Bloqueadores para go-live público
- [lista]

### Recomendación
- [Listo soft launch / Fase 6 primero / bloqueado por DNS]
```
```

---

## 9. Validación del orquestador

Al recibir el reporte:

1. Confirmar `.env.example` + runbook en repo
2. Si prod live: reproducir 3–5 curls del smoke test
3. Verificar `/legal` sin placeholders
4. Aprobar **soft launch** si AC1–AC9 OK; AC10 = Resend configurado en prod

---

## 10. Estado del plan global

| Fase | Estado |
|------|--------|
| 1–4 | ✅ Cerradas (legal: placeholders P0 usuario) |
| **5 Deploy** | ⏭️ En curso |
| 6 n8n (leads) | Cancelado — sustituido por Resend |

---

*Documento generado para el plan pre-lanzamiento Tap-IA.*
