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
    *(Este comando generará los artefactos en el directorio `/dist`)*

3.  **Arranque del Servidor en Producción:**
    ```bash
    node ./dist/server/entry.mjs
    ```
    *(También se puede utilizar el alias de npm: `npm run start:prod`)*

## 3. Variables de Entorno (.env)

Asegúrese de configurar las siguientes variables en su proveedor de alojamiento web:

| Variable | Descripción | Observaciones |
| :--- | :--- | :--- |
| `PORT` | Puerto en el que la aplicación escuchará | Generalmente el PaaS inyecta esta variable (ej. 80 o 443). Por defecto Astro usa el `4321`. |
| `HOST` | Interfaces de red a escuchar | Usualmente `0.0.0.0` para despliegues VPS o Docker. |
| `N8N_WEBHOOK_URL` | URL del Webhook de n8n para recolectar leads | **Crucial para Fase 6**. Sin esta variable configurada, los envíos del formulario de `/contacto` fallarán. |

## 4. Advertencia de Funcionalidad: Formulario de Contacto

Hasta que no se implemente la Fase 6 (Integración n8n), las solicitudes enviadas a la ruta POST `/api/submit` van a fallar (devolviendo potencialmente un error HTTP 500) si la variable de entorno `N8N_WEBHOOK_URL` no está definida. Como solución temporal, comunique a los usuarios que deben usar el contacto directo por WhatsApp.

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

### 5.2. Comprobación Técnica Rápida (Consola / Curl)

```bash
# Validar respuesta Base
curl -sI https://tap-ia.tech/

# Verificar robots.txt
curl -sI https://tap-ia.tech/robots.txt

# Verificar que el sitemap excluyó el phantom link, y sí contiene el artículo válido de agentes.
curl -s https://tap-ia.tech/sitemap.xml | findstr /i "agentes"
```

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
   - **Comando de Inicio (Start Command)**: `node ./dist/server/entry.mjs`
   - **Puerto**: Configura el puerto indicado en la UI (generalmente el sistema del hPanel auto-asigna y expone el puerto adecuado).
6. Haz clic en **Desplegar** (Deploy). Hostinger instalará las dependencias en una sandbox segura y ejecutará el build.

#### 3. Variables de Entorno en hPanel
En el menú de administración de la aplicación web en hPanel, navega a la sección de **Variables de Entorno** (Environment Variables) y añade:
* `N8N_WEBHOOK_URL` = `<tu-webhook-de-n8n>`
* `HOST` = `0.0.0.0`

#### 4. Resolución del error "403 Forbidden" (Reverse Proxy y .htaccess)
Si tras desplegar la aplicación al ingresar a `https://tap-ia.tech` obtienes un error **403 Forbidden**, se debe a que el servidor web Apache/LiteSpeed de Hostinger intercepta las peticiones buscando un archivo index estático (`index.html` o `index.php`) en vez de delegar el tráfico al proceso Node.js en ejecución.

Para solucionarlo utilizando el archivo `.htaccess` provisto:
1. Hemos creado un archivo de configuración listo para producción en [public/.htaccess](file:///C:/Users/Departamento%20AI/OneDrive/Documents/C%C3%B3digos/P%C3%A1gina%20web%20prueba/public/.htaccess).
2. Al ejecutar la compilación (`npm run build`), Astro copiará este archivo automáticamente a la carpeta de salida del cliente (`dist/client/.htaccess`).
3. Abre el **Administrador de Archivos** en el hPanel de tu sitio web en Hostinger.
4. Asegúrate de colocar este archivo `.htaccess` en la carpeta raíz del dominio (generalmente `public_html/` o la carpeta donde está configurada tu Node.js Web App).
5. Abre el archivo `.htaccess` desde el editor de hPanel y edita la última regla para verificar que apunte al puerto local exacto que Hostinger le asignó a tu aplicación Node.js (el puerto se indica en la interfaz del dashboard de Node.js, por ejemplo `3000`, `3001` o `4321`):
   ```apache
   RewriteRule ^(.*)$ http://127.0.0.1:PUERTO_ASIGNADO/$1 [P,L]
   ```
   *(Reemplaza `PUERTO_ASIGNADO` por el número de puerto que te muestre Hostinger, por ejemplo: `http://127.0.0.1:3000/$1`)*
6. Guarda los cambios en el editor y accede a `https://tap-ia.tech` para verificar que el sitio carga correctamente.

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