import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/seo';

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap.xml', site ?? SITE_URL);

  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      '# AI Crawlers — Explicitly allowed for GEO',
      'User-agent: OAI-SearchBot',
      'Allow: /',
      '',
      'User-agent: ChatGPT-User',
      'Allow: /',
      '',
      'User-agent: ClaudeBot',
      'Allow: /',
      '',
      'User-agent: PerplexityBot',
      'Allow: /',
      '',
      'User-agent: Google-Extended',
      'Allow: /',
      '',
      'User-agent: Googlebot',
      'Allow: /',
      '',
      `Sitemap: ${sitemapURL.href}`,
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    }
  );
};

