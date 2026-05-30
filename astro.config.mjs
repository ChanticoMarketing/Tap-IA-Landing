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
    },
    vite: {
        plugins: [tailwindcss()],
    },
});