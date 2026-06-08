import type { APIRoute } from 'astro';
import { INDEXABLE_ROUTES, SITE_URL } from '../lib/seo';

export const GET: APIRoute = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  const urls = INDEXABLE_ROUTES.map((pathname) => {
    const loc = new URL(pathname, SITE_URL).href;
    
    // Determinamos prioridades básicas por tipo de página
    let priority = '0.5';
    let changefreq = 'monthly';
    
    if (pathname === '/') {
      priority = '1.0';
      changefreq = 'weekly';
    } else if (pathname.startsWith('/soluciones') || pathname === '/consultoria-inteligencia-artificial' || pathname === '/ai-marketing' || pathname === '/agentes-ia-a-medida' || pathname === '/webapps-ia-a-medida') {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (pathname.startsWith('/novedades-ia')) {
      priority = '0.7';
      changefreq = 'weekly';
    } else if (pathname.startsWith('/recursos')) {
      priority = '0.7';
      changefreq = 'weekly';
    }

    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${currentDate}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>'
    ].join('\n');
  }).join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    }
  );
};

