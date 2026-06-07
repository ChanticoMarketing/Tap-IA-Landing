# Registro de Cambios (Changelog) — TAP-IA

Este archivo registra el historial de cambios, optimizaciones y correcciones realizadas en la infraestructura y diseño de la página web de Tap-IA.

---

## [2026-06-07]

### 1. Corrección de Contraste en Badge "Más Popular"
* **Descripción:** Se detectó que la etiqueta `"Más Popular"` ubicada sobre la tarjeta del plan *Sistema Web Inteligente* en la sección de precios de la página principal era casi invisible sobre el fondo dorado debido a la clase global `.ui-caption` que aplicaba un tono de texto gris claro (`#9ca3af`).
* **Cambios realizados:**
  * Archivo: [src/pages/index.astro](file:///C:/Users/Departamento%20AI/OneDrive/Documents/C%C3%B3digos/P%C3%A1gina%20Web%20-%20Tap-IA/src/pages/index.astro#L473)
  * Se removió la clase `text-white` y se forzó el color del texto mediante estilo en línea al color carbón oscuro oficial de la marca: `style="color: var(--color-charcoal);"`.
  * Se aplicó la clase `font-bold` para darle mayor grosor y visibilidad.
* **Autor:** Agente UI/Contraste

### 2. Flujo de Formulario con Éxito Inline (Remoción de Landing `/contacto/gracias`)
* **Descripción:** Se eliminó el flujo con redirección física externa para evitar la fricción mental en prospectos B2B y ceguera de redirección. La confirmación del envío ahora ocurre en caliente de forma dinámica y fluida sobre el mismo wizard de contacto.
* **Cambios realizados:**
  * **Componente Wizard:** [src/components/ContactWizard.astro](file:///C:/Users/Departamento%20AI/OneDrive/Documents/C%C3%B3digos/P%C3%A1gina%20Web%20-%20Tap-IA/src/components/ContactWizard.astro#L26-L55)
    * Se añadió el marcado HTML para el letrero inline utilizando el contenedor `.matte-card` estilizado en tonos oscuros con acento de oro, y botones dinámicos para WhatsApp y Volver al inicio.
    * Se incorporó inyección sanitizada del nombre del prospecto vía `.textContent` y actualización automática de la cadena de consulta para pre-configurar el mensaje de chat por WhatsApp.
    * Se implementó accesibilidad WCAG 2.1 AA: contenedor de éxito con `tabindex="-1"`, `role="status"` y `aria-live="polite"`, y redirección programática del foco de teclado mediante `.focus()` al recibir la respuesta HTTP 200 de la API.
    * Se inyectó el lanzamiento del evento sintético de JS `lead_converted` para la captación y analítica de GTM/GA4/Pixels sin redirecciones.
  * **Limpieza de SEO:** [src/lib/seo.ts](file:///C:/Users/Departamento%20AI/OneDrive/Documents/C%C3%B3digos/P%C3%A1gina%20Web%20-%20Tap-IA/src/lib/seo.ts#L43)
    * Se removió la ruta `/contacto/gracias` del listado de no indexables y del diccionario de descripciones meta.
  * **Eliminación Física:** Se borró el archivo `src/pages/contacto/gracias.astro` y su subdirectorio contenedor.
* **Autor:** Web-Design-Team (Director, UX, Motion, Frontend)

### 3. Remoción del Marco de la Ilustración y Máscara Radial Transparente
* **Descripción:** Se removió la tarjeta contenedora rígida (`.vp-card`) que rodeaba la ilustración principal de la propuesta de valor en la sección "La mayoría ya usa IA", integrando el gráfico fluidamente sobre el fondo oscuro general.
* **Cambios realizados:**
  * **Estructura HTML:** [src/pages/index.astro](file:///C:/Users/Departamento%20AI/OneDrive/Documents/C%C3%B3digos/P%C3%A1gina%20Web%20-%20Tap-IA/src/pages/index.astro#L335)
    * Se removió la envoltura `.vp-card` con bordes blancos y fondos mate y se simplificó el marcado para permitir que la ilustración flote directamente.
  * **Estilos CSS:** [src/pages/index.astro](file:///C:/Users/Departamento%20AI/OneDrive/Documents/C%C3%B3digos/P%C3%A1gina%20Web%20-%20Tap-IA/src/pages/index.astro#L1098)
    * Se eliminó el pseudo-elemento `.vp-visual::after` que simulaba transparencia con un fondo gris plano (Matte), el cual causaba parches de color al cambiar el viewport.
    * Se configuró una máscara de degradado radial pura compatible con Safari en iOS (`-webkit-mask-image` / `mask-image`) y se promovió la capa visual al compositor de la GPU (`translate3d`) para prevenir caídas de frames en el scroll.
  * **Interacción (GSAP Script):** [src/pages/index.astro](file:///C:/Users/Departamento%20AI/OneDrive/Documents/C%C3%B3digos/P%C3%A1gina%20Web%20-%20Tap-IA/src/pages/index.astro#L780)
    * Se dividió la animación de scroll de la sección de propuesta de valor en un timeline secuencial (staggered): primero el título y texto explicativo ascienden, y posteriormente la ilustración entra con un zoom-out de escala (`1.08` a `1`) y recupera foco progresivamente (de blur `12px` a `0px`).
* **Autor:** Web-Design-Team (Director, Visual-UI, Motion)

### 4. Migración de Notificación de Leads de Resend a Webhook de Make
* **Descripción:** Se reemplazó la integración directa con el SDK de Resend por un webhook nativo en Make para centralizar el flujo de prospectación y automatización del CRM.
* **Cambios realizados:**
  * **Módulo de Envío:** `src/lib/lead-email.ts`
    * Se deprecó el cliente de Resend y se sustituyó por una llamada asíncrona de `fetch` nativo al webhook de Make.
    * Se estructuró el payload de envío en 11 campos de datos clave en español.
  * **Endpoint API:** `src/pages/api/submit.ts`
    * Se actualizó la llamada para consumir el módulo de webhook.
  * **Runbook:** `docs/deploy-runbook.md`
    * Se marcaron como deprecated las variables `RESEND_API_KEY` y `RESEND_FROM_EMAIL` y se añadió la documentación correspondiente para `MAKE_WEBHOOK_URL`.
* **Autor:** Dirección Técnica (Adrián Emmanuel Tapia Sánchez)
