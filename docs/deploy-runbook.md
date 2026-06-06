# Runbook de Despliegue (Deploy) - TAP-IA

Este documento detalla los pasos para desplegar la aplicación Astro SSR en un entorno de producción.

## 1. Requisitos de Infraestructura

Dado que la aplicación de TAP-IA utiliza la configuración `output: 'server'` con el adaptador `@astrojs/node` en modo `standalone`, un servidor de archivos estáticos (como GitHub Pages o S3) **no es suficiente**. Se necesita:

*   **Runtime:** Node.js 20 o superior.
*   **Proceso:** Un gestor de procesos (PM2) o un entorno Docker/PaaS que mantenga persistente la ejecución de la aplicación.
*   **Alojamiento (PaaS/VPS sugeridos):** Railway, Render, Fly.io, Heroku, Coolify, o cualquier VPS clásico.

## 2. Comandos de Construcción (Build) e Inicio

1.  **Instalación de dependencias (limpia):**
    ```bash
    npm ci
    ```

2.  **Construcción de la aplicación:**
    ```bash
    npm run build
    ```
    *(Ejecuta `prebuild` → regenera `public/Logo-Favicon.png` y `public/favicon.ico` desde `public/Logo-Favicon.source.png`, luego genera `/dist`. Tras desplegar, **reinicia** el proceso Node para que no sirva assets viejos.)*

    **Local (producción en 4321):** si la página se ve sin estilos (HTML crudo), el proceso Node suele estar desincronizado con `dist/`. Usa `npm run prod:clean` (libera el puerto, borra `dist` + `node_modules/.astro`, build y arranque) en lugar de dejar un `node ./dist/server/entry.mjs` abierto días sin rebuild.

3.  **Arranque del Servidor en Producción:**
    ```bash
    node server.js
    ```
    *(También se puede utilizar el alias de npm: `npm run start:prod`)*

## 3. Variables de Entorno (.env)

Asegúrese de configurar las siguientes variables en su proveedor de alojamiento web:

| Variable | Descripción | Observaciones |
| :--- | :--- | :--- |
| `PORT` | Puerto en el que la aplicación escuchará | Generalmente el PaaS inyecta esta variable (ej. 80 o 443). Por defecto Astro usa el `4321`. |
| `HOST` | Interfaces de red a escuchar | Usualmente `0.0.0.0` para despliegues VPS o Docker. |
| `MAKE_WEBHOOK_URL` | URL del Webhook de Make para recibir leads | **Obligatoria** (o usa el fallback por defecto en el código). |
| `RESEND_API_KEY` | *(Deprecada)* API key de Resend | Ya no se utiliza tras la migración a Make. |
| `RESEND_FROM_EMAIL` | *(Deprecada)* Remitente de Resend | Ya no se utiliza tras la migración a Make. |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Token de verificación para Google Search Console (propiedad **Prefijo de URL**) | Acepta solo el token (`Unvz...`) o el formato completo (`google-site-verification=Unvz...`). Se renderiza en `<meta name="google-site-verification" content="...">` vía `Layout.astro`. Si no se define, el build usa el valor por defecto del repo. |

## 4. Formulario de contacto

POST `/api/submit` envía el lead de manera estructurada al Webhook de **Make** (configurado en `src/lib/lead-email.ts`). Si el Webhook falla o no está disponible, el endpoint devuelve un error 500.

**Hostinger:** define `MAKE_WEBHOOK_URL` en las variables de entorno de la app Node y **reinicia o redeploy** tras guardarla. El código lee `process.env` en runtime (no solo en build).

## 5. Pruebas de Humo (Smoke Test) Post-Deploy

Una vez que el proyecto esté en vivo bajo `https://tap-ia.tech` ejecute la siguiente matriz de pruebas para validar el lanzamiento.

### 5.1. Rutas HTTP y Contenido

| Ruta HTTP | Comprobación Esperada |
| :--- | :--- |
| `/` | HTTP 200. Inicio carga correctamente, Novedades sin links falsos. |
| `/consultoria-inteligencia-artificial`| HTTP 200. Vista "Money Page" correcta. |
| `/soluciones/seo-geo` | HTTP 200. Vista "Money Page" correcta. |
| `/contacto` | HTTP 200. Formulario (Wizard) visible. |
| `/legal` | HTTP 200. Sin placeholders obvios tipo `[COMPLETAR...]`. |
| `/novedades-ia` | HTTP 200. Hub editorial (sólo artículos reales, sin input). |
| `/portafolio` | HTTP 200. Card Avatares muestra la etiqueta 'Próximamente'. |
| `/infraestructura-digital` | HTTP 200. Landing page de ventas premium (calculadora y wizard activos). |

### 5.2. Comprobación Técnica Rápida (Consola / Curl)

```bash
# Validar respuesta Base
curl -sI https://tap-ia.tech/

# Verificar robots.txt
curl -sI https://tap-ia.tech/robots.txt

# Verificar que el sitemap excluyó el phantom link, y sí contiene el artículo válido de agentes.
curl -s https://tap-ia.tech/sitemap.xml | findstr /i "agentes"

# Verificar meta de Google Search Console en la home (debe devolver una línea con content="UnvzIf5...")
curl -s https://tap-ia.tech/ | findstr /i "google-site-verification"

# Favicon (debe ser imagen, no HTML)
curl -sI https://tap-ia.tech/favicon.ico | findstr /i "HTTP Content-Type"
curl -sI https://tap-ia.tech/Logo-Favicon.png | findstr /i "HTTP Content-Type"
```

### 5.3. Google Search Console (verificación HTML)

1. En Search Console, crea una propiedad de tipo **Prefijo de URL** con `https://tap-ia.tech/` (no uses propiedad de **Dominio** si eliges el método de etiqueta HTML).
2. Método recomendado: **Etiqueta HTML**. El token debe coincidir con `PUBLIC_GOOGLE_SITE_VERIFICATION` (o el valor por defecto en `src/lib/seo.ts`).
3. Tras desplegar, confirma que la home responde **HTTP 200** (no 403) y que el `curl` anterior encuentra la meta. Si la home devuelve 403, Google no podrá verificar aunque el código sea correcto — revisa la sección 6 (Hostinger Node.js vs estático).
4. Pulsa **Verificar** en Search Console. Puede tardar unos minutos tras un deploy nuevo.

---

## 6. Despliegue en Hostinger (Paso a Paso)

Hostinger ofrece dos esquemas principales para hospedar esta aplicación de Node.js SSR en producción. Elige el que mejor se adapte a tu plan contratado:

### Método A: Alojamiento Administrado Node.js (Planes Business o Cloud en hPanel)
Este es el método **recomendado** si cuentas con hosting compartido premium (Business) o hosting en la nube (Cloud), ya que Hostinger automatiza la administración del servidor y el ciclo de vida de la aplicación.

#### 1. Preparación del Código
Asegúrate de empujar la última versión estable del código a tu repositorio privado o público (GitHub, GitLab o Bitbucket).

#### 2. Configurar la Aplicación en hPanel
1. Inicia sesión en tu **hPanel** de Hostinger.
2. Navega a la sección **Sitios Web** (Websites) y haz clic en **Crear o migrar un sitio web**.
3. Elige la opción **Aplicación Web Node.js** (Node.js Web App).
4. Elige el método de despliegue conectando tu cuenta de **GitHub**:
   - Autoriza a Hostinger y selecciona el repositorio de `Tap-IA-Landing`.
   - Selecciona la rama de producción (generalmente `main`).
5. Configura los parámetros de ejecución en la interfaz gráfica:
   - **Versión de Node.js**: Elige **Node.js 22** o superior (requisito de Astro 5.x).
   - **Comando de Construcción (Build Command)**: `npm run build`
   - **Comando de Inicio (Start Command)**: `npm run start:prod`
   - **Puerto**: Configura el puerto indicado en la UI (generalmente el sistema del hPanel auto-asigna y expone el puerto adecuado).
6. Haz clic en **Desplegar** (Deploy). Hostinger instalará las dependencias en una sandbox segura y ejecutará el build.

#### 2.1. Dominio canónico, DNS y SSL
El dominio canónico del proyecto es `https://tap-ia.tech`. Mantén esta decisión alineada con `astro.config.mjs` y `src/lib/seo.ts`.

Configura:
* `tap-ia.tech` → aplicación Node.js de producción en Hostinger.
* `www.tap-ia.tech` → redirección 301 hacia `https://tap-ia.tech`.
* SSL activo para `tap-ia.tech` y `www.tap-ia.tech`.

#### 2.2. HSTS (auditorías Semrush / seguridad)

Para cerrar avisos de *subdomains don't support HSTS* y reforzar HTTPS:

1. En **Cloudflare** (si el DNS pasa por ahí): SSL/TLS → *Full (strict)*; activar **Always Use HTTPS** y **HSTS** (max-age ≥ 31536000; incluir subdominios si aplica).
2. En **Hostinger hPanel**: confirma certificado Let's Encrypt en apex y `www`; la redirección 301 de `www` → apex debe ser HTTPS→HTTPS.
3. Tras activar HSTS, valida con:
   ```bash
   curl.exe -sI https://tap-ia.tech/ | findstr /i "strict-transport"
   curl.exe -sI https://www.tap-ia.tech/ | findstr /i "strict-transport location"
   ```
4. No fuerces HSTS desde `src/middleware.ts` hasta tener redirects estables; un HSTS mal configurado puede bloquear usuarios si el certificado falla.

**Post-deploy SEO:** tras publicar cambios de `llms.txt`, sitemap y cache, re-ejecuta *Site Audit* en Semrush (48–72 h) y comprueba que `/llms.txt` responde **200**.

#### 3. Variables de Entorno en hPanel
En el menú de administración de la aplicación web en hPanel, navega a la sección de **Variables de Entorno** (Environment Variables) y añade:
* `MAKE_WEBHOOK_URL` = `https://hook.us2.make.com/px6jolmk7ekqxg5lyq9bq4x0l5uaj0ja`
* `HOST` = `0.0.0.0`
* `PUBLIC_GOOGLE_SITE_VERIFICATION` = `UnvzIf5Fe7a61U4AM2dLWfY3khV_64_mMUlG7OCBa0o` (opcional si ya está el valor por defecto en el build desplegado)

Los leads del formulario se envían al webhook de Make especificado. Las variables legacy de Resend ya no son requeridas.

#### 4. Resolución del error "403 Forbidden" (.htaccess generado por Hostinger)
Si tras desplegar la aplicación al ingresar a `https://tap-ia.tech` obtienes un error **403 Forbidden**, revisa primero que el sitio esté configurado como **Node.js Web App** y no como despliegue estático en `public_html`.

No subas un `.htaccess` personalizado desde el repositorio para hacer proxy manual a `127.0.0.1:4321`. Hostinger genera su propio `.htaccess` en `public_html` para enrutar el tráfico hacia la aplicación Node.js. Un proxy fijo a `4321` puede romper el despliegue si hPanel asigna otro puerto o usa un mecanismo interno distinto.

Pasos recomendados:
1. Elimina o renombra cualquier `.htaccess` personalizado que hayas subido manualmente a `public_html`.
2. Vuelve a desplegar la aplicación desde hPanel para que Hostinger regenere su configuración.
3. Configura:
   ```bash
   Build Command: npm run build
   Start Command: npm run start:prod
   ```
4. Verifica que `HOST=0.0.0.0` esté configurado en las variables de entorno.
5. Si el 403 persiste, inspecciona el `.htaccess` generado por Hostinger en `public_html` y confirma que la app Node.js esté activa en el panel.

---

### Método B: Servidor VPS KVM (Planes VPS de Hostinger)
Si tienes un servidor virtual privado (VPS) con sistema operativo Linux (Ubuntu 22.04 LTS o 24.04 LTS recomendado), dispondrás de control absoluto del entorno.

#### 1. Acceso y Preparación del Servidor
Conéctate por SSH utilizando tu dirección IP y tus credenciales de root:
```bash
ssh root@<IP_DE_TU_VPS>
```
Actualiza la paquetería del sistema e instala Node.js (versión 22 LTS) usando NVM o la fuente oficial de NodeSource:
```bash
# Instalar Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. Clonar y Construir la Aplicación
1. Clona tu repositorio en el directorio `/var/www/`:
   ```bash
   git clone <URL_DEL_REPOSITORIO> /var/www/tap-ia
   cd /var/www/tap-ia
   ```
2. Instala dependencias y compila el bundle:
   ```bash
   npm install
   npm run build
   ```

#### 3. Gestionar el Proceso con PM2
Para asegurar que tu aplicación se mantenga corriendo persistentemente y se reinicie en caso de fallos del servidor, instala y configura **PM2**:
```bash
# Instalar PM2 de forma global
npm install -g pm2

# Iniciar la aplicación de Astro
pm2 start npm --name "tap-ia" -- run start

# Configurar PM2 para arrancar en el reinicio del servidor
pm2 startup
pm2 save
```

#### 4. Configurar Servidor Web Reverso (Nginx)
Instala Nginx para servir como proxy reverso de seguridad y gestor de tráfico SSL:
```bash
sudo apt install nginx -y
```
Crea un bloque de servidor virtual editando el archivo `/etc/nginx/sites-available/tap-ia`:
```nginx
server {
    listen 80;
    server_name tap-ia.tech www.tap-ia.tech;

    location / {
        proxy_pass http://127.0.0.1:4321; # Puerto por defecto de Astro
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Habilita el sitio y recarga Nginx:
```bash
ln -s /etc/nginx/sites-available/tap-ia /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### 5. Habilitar SSL con Let's Encrypt (Certbot)
Instala Certbot para inyectar y renovar el certificado SSL gratis automáticamente:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d tap-ia.tech -d www.tap-ia.tech
```
Sigue las indicaciones para forzar todo el tráfico HTTP a HTTPS seguro.
