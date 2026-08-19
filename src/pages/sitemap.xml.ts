import type { APIRoute } from 'astro';
import { getPublishedBlogEntries } from '../lib/blog';
import { INDEXABLE_ROUTES, SITE_URL } from '../lib/seo';

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = async () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const generatedEntries = await getPublishedBlogEntries();
  const routes = [...new Set([
    ...INDEXABLE_ROUTES,
    ...generatedEntries.map((entry) => `/blog/${entry.slug}`),
  ])];

  const urls = routes.map((pathname) => {
    const loc = new URL(pathname, SITE_URL).href;
    
    // Determinamos prioridades básicas por tipo de página
    let priority = '0.5';
    let changefreq = 'monthly';
    
    if (pathname === '/') {
      priority = '1.0';
      changefreq = 'weekly';
    } else if (pathname.startsWith('/servicios') || pathname === '/consultoria-inteligencia-artificial' || pathname === '/ai-marketing' || pathname === '/agentes-ia-a-medida' || pathname === '/webapps-ia-a-medida') {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (pathname.startsWith('/blog')) {
      priority = '0.7';
      changefreq = 'weekly';
    } else if (pathname.startsWith('/recursos')) {
      priority = '0.7';
      changefreq = 'weekly';
    }

    const generatedEntry = generatedEntries.find((entry) => `/blog/${entry.slug}` === pathname);
    const lastmod = generatedEntry
      ? new Date(generatedEntry.data.dateModified ?? generatedEntry.data.datePublished).toISOString().split('T')[0]
      : currentDate;

    return [
      '  <url>',
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
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
