import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/seo';

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap.xml', site ?? SITE_URL);

  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /demos/',
      '',
      '# AI & Engine Crawlers — Explicitly allowed for GEO and Search',
      'User-agent: Bingbot',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /demos/',
      '',
      'User-agent: OAI-SearchBot',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /demos/',
      '',
      'User-agent: ChatGPT-User',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /demos/',
      '',
      'User-agent: ClaudeBot',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /demos/',
      '',
      'User-agent: PerplexityBot',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /demos/',
      '',
      'User-agent: Google-Extended',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /demos/',
      '',
      'User-agent: Googlebot',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /demos/',
      '',
      `Sitemap: ${sitemapURL.href}`,
      '',
      '# GEO: https://tap-ia.tech/llms.txt',
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    }
  );
};

