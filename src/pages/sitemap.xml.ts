import type { APIRoute } from 'astro';
import { INDEXABLE_ROUTES, SITE_URL } from '../lib/seo';

export const GET: APIRoute = () => {
  const urls = INDEXABLE_ROUTES.map((pathname) => {
    const loc = new URL(pathname, SITE_URL).href;

    return `  <url><loc>${loc}</loc></url>`;
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

