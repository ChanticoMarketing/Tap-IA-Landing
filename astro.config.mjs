import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    site: 'https://tap-ia.tech',
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
    integrations: [react()],
    redirects: {
        '/sobre': {
            status: 301,
            destination: '/nosotros',
        },
        '/sobre/emmanuel-tapia': {
            status: 301,
            destination: '/nosotros/emmanuel-tapia',
        },
        '/soluciones': {
            status: 301,
            destination: '/servicios',
        },
        '/soluciones/seo-geo': {
            status: 301,
            destination: '/servicios/seo-geo',
        },
        '/soluciones/web': {
            status: 301,
            destination: '/servicios/web',
        },
        '/soluciones/avatares-ia': {
            status: 301,
            destination: '/servicios/avatares-ia',
        },
        '/soluciones/ai-marketing': {
            status: 301,
            destination: '/ai-marketing',
        },
        '/soluciones/agentes-ia': {
            status: 301,
            destination: '/agentes-ia-a-medida',
        },
        '/soluciones/webapps': {
            status: 301,
            destination: '/webapps-ia-a-medida',
        },
        '/novedades-ia': {
            status: 301,
            destination: '/blog',
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
});