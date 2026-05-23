# Plan Fase 4 — Legal, privacidad y cookies (Tap-IA)

> **Objetivo:** alinear textos legales, consentimiento del formulario y señales de confianza con lo que el sitio **realmente hace hoy** (sin analytics de terceros instalados), dejando el proyecto listo para Fase 5 (deploy) sin riesgo legal evidente en soft launch México B2B.

**Precondiciones:** Fases 1, 2 y 3 cerradas.

**Duración estimada:** 2–4 horas (Track A) · 4–6 horas (Track B con banner).

---

## 1. Resumen ejecutivo (tap-cmo)

Hoy `/legal` es breve y **desalineado con la realidad técnica**: menciona “cookies analíticas” pero **no hay** GA4, GTM, Plausible ni pixels en `src/`. El formulario sí recopila datos B2B y los envía (cuando n8n esté activo) a un webhook. Eso exige un aviso de privacidad más completo bajo LFPDPPP (México), sin inventar tracking que no existe.

**Recomendación para pre-launch:** **Track A** — actualizar `legal.astro` + coherencia footer/formulario, **sin** banner de cookies hasta que se instale analytics (Fase 6 o post-launch).

---

## 2. Auditoría del estado actual

### 2.1 Archivos relevantes

| Archivo | Rol |
|---------|-----|
| `src/pages/legal.astro` | Página legal única (`#privacidad`, `#terminos`, `#cookies`, `#uso-ia`) |
| `src/lib/seo.ts` | `/legal` en `NOINDEX_ROUTES` (correcto para legal) |
| `src/components/Footer.astro` | Enlaces a anclas legales |
| `src/components/ContactWizard.astro` | Checkbox consent → `/legal#privacidad` |
| `src/pages/api/submit.ts` | Valida `consent`; payload con datos personales y UTM |
| `src/components/SchemaOrganization.astro` | Tel. `+52-33-2423-9103`, `areaServed: México` |

### 2.2 Hallazgos

| # | Hallazgo | Riesgo |
|---|----------|--------|
| H1 | Política de cookies menciona **cookies analíticas** | Medio — texto falso si no hay analytics |
| H2 | No hay sección **responsable del tratamiento** ni contacto ARCO | Alto — LFPDPPP |
| H3 | No se listan **datos recopilados** del formulario (campos reales) | Alto |
| H4 | No se describe **finalidad**, **retención** ni **transferencias** (n8n, email) | Alto |
| H5 | Fecha “Febrero 2026” desactualizada tras cambios de mayo | Bajo |
| H6 | Footer LinkedIn apunta a `https://linkedin.com` genérico | Bajo — incoherente con schema `linkedin.com/company/tap-ia` |
| H7 | **No hay** scripts de analytics en `Layout.astro` | — confirma Track A |
| H8 | `soluciones/web.astro` menciona “Integración Google Analytics” como **servicio vendido**, no como tracking del sitio | OK — no confundir con cookies del sitio |

### 2.3 Datos que recopila el formulario (fuente: `submit.ts` + `ContactWizard.astro`)

- Identificación: nombre, email, empresa, rol, teléfono (opcional)
- Contexto negocio: obstáculo, propuesta de valor, web actual, servicios, urgencia, presupuesto, herramienta
- Atribución: `source_page`, UTM, `referrer`, plan/servicio/demo
- Consentimiento explícito (checkbox obligatorio)

---

## 3. Decisión de producto (obligatoria antes de implementar)

El ejecutor debe aplicar **una** de estas rutas. Si el usuario no especifica, usar **Track A**.

### Track A — Sin analytics (recomendado pre-launch)

| Aspecto | Decisión |
|---------|----------|
| Cookies | Solo técnicas / estrictamente necesarias (sesión SSR si aplica, preferencias) |
| Banner | **No implementar** |
| Texto legal | Ajustar § cookies: sin mencionar analíticas hasta que existan |
| Esfuerzo | Bajo |

### Track B — Con analytics planificado antes del launch

| Aspecto | Decisión |
|---------|----------|
| Cookies | Técnicas + analíticas (GA4 o alternativa documentada) |
| Banner | Componente mínimo: Aceptar / Rechazar analíticas + enlace a `#cookies` |
| Implementación | Script en `Layout.astro` condicionado a `localStorage` |
| Esfuerzo | Medio — solo si el negocio confirma ID de medición y proveedor |

**No mezclar tracks:** si se elige A, no dejar código de banner muerto ni texto sobre GA4 en `/legal`.

---

## 4. Tareas por fase

### Fase 4.0 — Preparación (usuario / tap-cmo)

| ID | Tarea | Responsable |
|----|--------|-------------|
| 4.0.1 | Confirmar Track A o B | Usuario |
| 4.0.2 | Proveer email ARCO (ej. `contacto@tap-ia.tech` o el que usen) | Usuario |
| 4.0.3 | Confirmar razón social / titular (ej. Emmanuel Tapia / TAP-IA) si debe figurar | Usuario |
| 4.0.4 | Si Track B: ID GA4 o herramienta elegida | Usuario |

*Si faltan datos, el ejecutor usa placeholders claros `[COMPLETAR: email ARCO]` y los lista en el reporte.*

---

### Fase 4.1 — Reescritura de `legal.astro` (obligatorio)

**Archivo:** `src/pages/legal.astro`

Expandir contenido manteniendo estructura de anclas existentes (`#privacidad`, `#terminos`, `#cookies`, `#uso-ia`) para no romper footer ni formulario.

#### Sección 1 — Privacidad (`#privacidad`)

Incluir como mínimo:

1. **Identidad del responsable** (TAP-IA + contacto)
2. **Datos personales recopilados** (lista alineada con formulario)
3. **Finalidades** (responder solicitudes, diagnóstico comercial, mejora de propuesta; no venta de datos)
4. **Base legal / consentimiento** (consentimiento al enviar formulario)
5. **Transferencias** — mencionar procesamiento vía automatización (n8n/webhook) y proveedores de hosting cuando se conozcan; redacción prudente: “proveedores que actúan por nuestra cuenta”
6. **Conservación** — plazo razonable (ej. 24 meses leads inactivos o “mientras dure relación comercial”)
7. **Derechos ARCO** — acceso, rectificación, cancelación, oposición; email de contacto
8. **Revocación del consentimiento**
9. **Menores** — no dirigido a menores
10. **Cambios al aviso**

#### Sección 2 — Términos (`#terminos`)

Ampliar ligeramente:

- Naturaleza informativa del sitio y diagnóstico sin obligación de contratación
- Propiedad intelectual del contenido
- Limitación de responsabilidad por información de terceros (novedades IA)
- Ley aplicable / jurisdicción (México)

#### Sección 3 — Cookies (`#cookies`)

**Track A:**

- Solo cookies estrictamente necesarias
- Explicitar que **no** se usan cookies de analítica ni publicidad de terceros en este sitio en la fecha de actualización
- Si Astro/Node usa cookies de sesión técnicas, mencionarlas genéricamente

**Track B:**

- Tipología: necesarias vs analíticas
- Tabla o lista: nombre, finalidad, duración, proveedor
- Cómo gestionar preferencias (banner + navegador)

#### Sección 4 — Uso de IA (`#uso-ia`)

Mantener espíritu actual; añadir:

- Datos del cliente no se usan para entrenar modelos públicos sin acuerdo
- Herramientas de IA en entregables sujetas a contrato/NDA

#### Metadatos de página

```astro
<Layout
  title="Políticas y Legal | TAP-IA"
  description="Aviso de privacidad, términos, cookies y uso responsable de IA de TAP-IA. Derechos ARCO y tratamiento de datos B2B."
>
```

Actualizar: **Última actualización: Mayo 2026** (o fecha real del deploy).

---

### Fase 4.2 — Coherencia formulario y footer (obligatorio)

| ID | Archivo | Acción |
|----|---------|--------|
| 4.2.1 | `ContactWizard.astro` | Verificar que el enlace de consentimiento sigue siendo `/legal#privacidad`; copy puede decir “aviso de privacidad y tratamiento de datos” |
| 4.2.2 | `Footer.astro` | Corregir LinkedIn a `https://www.linkedin.com/company/tap-ia` (o URL real) |
| 4.2.3 | `Footer.astro` | Opcional: enlace “Aviso legal” a `/legal` además de anclas |

**No modificar** lógica de validación en `submit.ts` salvo que se añada segundo checkbox para cookies (solo Track B).

---

### Fase 4.3 — Banner de cookies (solo Track B)

**Nuevos archivos sugeridos:**

- `src/components/CookieConsent.astro` — barra fija inferior, accesible
- Integración en `src/layouts/Layout.astro` antes de `</body>`

**Comportamiento mínimo:**

- Primera visita: mostrar barra
- “Aceptar” → `localStorage.setItem('tap_cookie_consent', 'all')` + cargar script analytics
- “Solo necesarias” → `essential` + no cargar analytics
- Enlace “Más información” → `/legal#cookies`
- Respetar `prefers-reduced-motion` en animación de entrada

**Estilo:** línea Luxury Tech (fondo `charcoal`, borde `gold/20`, tipografía existente).

---

### Fase 4.4 — Verificación y build (obligatorio)

```bash
npm run build
grep -i "cookies analíticas" src/pages/legal.astro   # Track A → 0 coincidencias
grep -i "gtag\|GTM-\|googletagmanager" src/          # Track A → 0 en src
```

Smoke test manual:

1. `/legal` — anclas `#privacidad`, `#cookies` funcionan desde footer
2. `/contacto` — checkbox obligatorio; enlace abre privacidad
3. Track B: banner aparece, persistencia tras refresh

---

## 5. Criterios de aceptación (Definition of Done)

### Todos los tracks

- [ ] **AC1:** `legal.astro` incluye responsable, datos, finalidades, ARCO, conservación, transferencias
- [ ] **AC2:** Texto de cookies **coherente** con tracking real del sitio
- [ ] **AC3:** Fecha de actualización coherente (2026)
- [ ] **AC4:** `Layout` en legal con `description` específica
- [ ] **AC5:** Footer LinkedIn corregido (si URL confirmada)
- [ ] **AC6:** Consent del formulario sigue enlazando a `#privacidad`
- [ ] **AC7:** `npm run build` exit code 0
- [ ] **AC8:** Fases 1–3 sin regresión (grep rápido mock, seo slug, buscador novedades)

### Solo Track A

- [ ] **AC9A:** No existe componente banner ni scripts analytics en `Layout`
- [ ] **AC10A:** No se afirma uso de cookies analíticas en `/legal`

### Solo Track B

- [ ] **AC9B:** Banner visible en primera visita; analytics solo tras aceptar
- [ ] **AC10B:** `#cookies` documenta cookies que el script instala

---

## 6. Archivos esperados en el diff

| Archivo | Track A | Track B |
|---------|---------|---------|
| `src/pages/legal.astro` | ✅ | ✅ |
| `src/components/Footer.astro` | ✅ | ✅ |
| `src/components/ContactWizard.astro` | opcional | opcional |
| `src/components/CookieConsent.astro` | — | ✅ |
| `src/layouts/Layout.astro` | — | ✅ |

---

## 7. Riesgos y mitigación

| Riesgo | Mitigación |
|--------|------------|
| Texto legal sin revisión abogado | Añadir disclaimer al inicio: “Documento informativo; revisión legal recomendada” |
| n8n aún no en prod | Mencionar “proveedores de automatización” sin nombrar vendor si no está confirmado |
| Placeholders sin completar | Listar en reporte P0 antes de launch público |

---

## 8. Relación con fases siguientes

| Fase | Dependencia de Fase 4 |
|------|------------------------|
| **5 Deploy** | Legal listo antes de tráfico público |
| **6 n8n** | Actualizar § transferencias cuando webhook esté en prod |
| **Analytics futuro** | Si se elige Track A ahora, abrir mini-fase “4B” al instalar GA4 |

---

## 9. Prompt para agente ejecutor (copiar desde aquí)

> Pegar el bloque siguiente a un agente en **Agent mode**. Por defecto: **Track A**.

```markdown
# Rol y contexto

Eres un **agente de implementación** en el sitio Astro SSR **Tap-IA** (México, B2B, marketing + IA).

**Objetivo único:** completar la **Fase 4 — Legal, privacidad y cookies** según el plan en `docs/plan-fase-4-legal-cookies.md`.

**Track por defecto: A (sin analytics, sin banner)** — salvo que el usuario indique Track B explícitamente.

**Precondiciones (no revertir):**
- Fases 1–3 cerradas
- No tocar `seo.ts`, novedades, portafolio UX, n8n (`submit.ts` solo si copy de consent)

**Fuera de alcance:**
- Implementar GA4/GTM (Track B solo si se pide)
- Asesoría legal vinculante — redactar textos claros y prudentes, no “certificación legal”
- Cambios en demos, blog, money pages copy de servicios

**Datos de referencia del proyecto:**
- Sitio: `https://tap-ia.tech`
- Teléfono schema: `+52-33-2423-9103`
- WhatsApp: `https://wa.me/5213324239103`
- LinkedIn schema: `https://linkedin.com/company/tap-ia`
- Formulario: campos en `src/pages/api/submit.ts` (payload)
- Hoy **no hay** analytics en `src/layouts/Layout.astro`

**Si faltan email ARCO o razón social:** usar `[COMPLETAR: contacto@tap-ia.tech]` y listar en reporte.

---

# Tareas Track A (ejecutar en orden)

## T4.1 — Reescribir `src/pages/legal.astro`

1. Mantener anclas: `#privacidad`, `#terminos`, `#cookies`, `#uso-ia`
2. Expandir § Privacidad: responsable, datos del formulario, finalidades, consentimiento, transferencias (automatización/hosting), conservación, derechos ARCO, revocación, cambios
3. § Cookies: **solo necesarias**; declarar que no hay cookies analíticas ni publicidad de terceros en el sitio
4. § Términos y § Uso IA: ampliar según plan (jurisdicción México, PI, limitación responsabilidad)
5. `Layout` con `title` + `description` específicos
6. **Última actualización: Mayo 2026**

Estilo: párrafos claros, listas donde ayuden; clases existentes (`text-subtle`, `font-serif` en h2).

## T4.2 — Footer

**Archivo:** `src/components/Footer.astro`

- Cambiar enlace LinkedIn a `https://www.linkedin.com/company/tap-ia` (o la URL en `SchemaOrganization.astro`)

## T4.3 — Formulario (verificación)

**Archivo:** `src/components/ContactWizard.astro`

- Confirmar enlace consent → `/legal#privacidad`
- Opcional: micro-copy “tratamiento de datos” si mejora claridad (1 línea)

## T4.4 — Build y regresión

```bash
npm run build
grep -i "cookies analíticas" src/pages/legal.astro
grep "noticia-mock" src/pages/index.astro src/pages/novedades-ia/index.astro
grep "agentes-autonomos-operativa-real" src/lib/seo.ts
grep "Buscar noticia" src/pages/novedades-ia/index.astro
```

---

# Tareas Track B (solo si el usuario pidió analytics + banner)

Además de T4.1–T4.4:

## T4.5 — `CookieConsent.astro` + `Layout.astro`

- Banner accesible, localStorage `tap_cookie_consent`
- Cargar script analytics solo si `all`
- Documentar cookies en `#cookies` con proveedor real

---

# Criterios de aceptación

Marcar ✅/❌ en reporte: AC1–AC8 (todos) + AC9A/AC10A (Track A) o AC9B/AC10B (Track B).

---

# Formato de respuesta obligatorio

```
## Fase 4 — Reporte de ejecución

### Track aplicado
- A / B

### Archivos modificados
- [lista]

### Cambios por tarea
- T4.1: [resumen]
- T4.2: [resumen]
- T4.3: [resumen]
- T4.4: [build + greps]
- T4.5: [solo Track B]

### Placeholders pendientes del cliente
- [lista o ninguno]

### Criterios de aceptación
- AC1–AC10: ✅/❌

### Pendientes legales (revisión humana/abogado)
- [lista]

### Recomendación orquestador
- [Listo para Fase 5 / bloqueado por placeholders]
```
```

---

## 10. Validación del orquestador

Tras el reporte del agente, verificar:

1. Lectura humana de `/legal` — ¿suena a lo que el sitio hace?
2. Grep Track A — sin “cookies analíticas” si no hay GA4
3. Footer LinkedIn — URL correcta
4. Build OK
5. Sin regresión Fases 1–3

**Aprobación Fase 4** → autorizar **Fase 5 (Deploy + smoke test)**.

---

## 11. Checklist rápido pre-Fase 5

- [ ] Fase 4 aprobada
- [ ] Placeholders `[COMPLETAR]` resueltos por el cliente
- [ ] Decisión n8n documentada (aunque implementación sea Fase 6)
- [ ] `npm run build` en rama de release

---

*Documento generado para el plan pre-lanzamiento Tap-IA. Orquestador: Tap-Team + Equipo Software Senior.*
