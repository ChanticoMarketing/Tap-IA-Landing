import fs from 'node:fs/promises';
import path from 'node:path';

const arg = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};

const manifestPath = arg('--manifest');
const baseUrl = arg('--base-url') || process.env.BLOG_BASE_URL || 'http://localhost:4321';
const siteUrl = arg('--site-url') || process.env.BLOG_SITE_URL || 'https://tap-ia.tech';
if (!manifestPath) {
  console.error('Uso: npm run validate:blog -- --manifest var/blog-runs/YYYY-MM-DD/manifest.json --base-url http://localhost:4321');
  process.exit(2);
}

const failures = [];
const fail = (message) => failures.push(message);
const root = process.cwd();
const manifest = JSON.parse(await fs.readFile(path.resolve(root, manifestPath), 'utf8'));
const cleanBase = baseUrl.replace(/\/$/, '');
const secretPattern = /(sk-[A-Za-z0-9_-]{10,}|AIza[0-9A-Za-z_-]{20,}|ghp_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|Bearer\s+[A-Za-z0-9._-]{10,})/;

if (manifest.status !== 'ready_to_publish') fail(`Manifest status inválido: ${manifest.status ?? '(ausente)'}.`);
if (!Array.isArray(manifest.articles) || manifest.articles.length === 0) fail('El manifiesto no tiene artículos.');
if (manifest.articles?.length > 9) fail('El manifiesto supera el máximo de 9 artículos.');
if (manifest.gates?.sources !== true) fail('El gate de fuentes no está aprobado.');
if (manifest.gates?.antigravity?.decision !== 'approved') fail('Antigravity no está aprobado.');
if (manifest.gates?.codexFinalReview?.status !== 'passed') fail('La revisión final de Codex no está aprobada.');
if (manifest.gates?.build !== true) fail('El gate de build no está aprobado.');

const articles = Array.isArray(manifest.articles) ? manifest.articles : [];
const slugs = new Set();
const articleUrls = [];
const hasType = (value, type) => {
  if (!value || typeof value !== 'object') return false;
  if (Array.isArray(value)) return value.some((item) => hasType(item, type));
  if (value['@type'] === type || (Array.isArray(value['@type']) && value['@type'].includes(type))) return true;
  return Object.values(value).some((item) => item && typeof item === 'object' && hasType(item, type));
};
const extractJsonLd = (html) => [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => {
  try { return JSON.parse(match[1]); } catch { return null; }
});
const htmlText = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const attr = (html, tag, name) => {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*\\b${name}=["']([^"']+)["']`, 'i'));
  return match?.[1] ?? '';
};
const canonicalFrom = (html) => html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["']/i)?.[1]
  ?? html.match(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\brel=["']canonical["']/i)?.[1]
  ?? '';

for (const article of articles) {
  if (!article || typeof article !== 'object') { fail('Artículo inválido en el manifiesto.'); continue; }
  if (!article.slug || slugs.has(article.slug)) fail(`Slug ausente o repetido: ${article.slug ?? '(ausente)'}.`);
  slugs.add(article.slug);
  const urlPath = article.url || `/blog/${article.slug}`;
  articleUrls.push(urlPath);
  const url = new URL(urlPath, cleanBase).href;
  let response;
  let html = '';
  try {
    response = await fetch(url);
    html = await response.text();
  } catch (error) {
    fail(`No se pudo abrir ${url}: ${error instanceof Error ? error.message : String(error)}`);
    continue;
  }
  if (response.status !== 200) fail(`${url} devolvió HTTP ${response.status}.`);
  const canonical = canonicalFrom(html);
  const expectedCanonical = new URL(urlPath, siteUrl).href;
  if (canonical !== expectedCanonical) fail(`Canonical incorrecto en ${url}: ${canonical || '(ausente)'}. Esperado: ${expectedCanonical}.`);
  if (!/<h1\b[^>]*>[\s\S]*?\S[\s\S]*?<\/h1>/i.test(html)) fail(`Falta H1 en ${url}.`);
  if (!/<img\b[^>]*\balt=["'][^"']+[^"']["']/i.test(html)) fail(`Falta alt text en imágenes de ${url}.`);
  if (!/<a\b[^>]*href=["']\/blog(?:[/?#]|["'])/i.test(html)) fail(`Falta enlace interno de blog en ${url}.`);
  if (!/<meta\b[^>]*property=["']og:type["'][^>]*content=["']article["']/i.test(html)) fail(`og:type article ausente en ${url}.`);
  if (!/<meta\b[^>]*name=["']twitter:image["'][^>]*content=["'][^"']+["']/i.test(html)) fail(`Twitter Card sin imagen en ${url}.`);
  if (article.heroImage && !html.includes(article.heroImage)) fail(`La imagen hero declarada no aparece en ${url}.`);

  const jsonLd = extractJsonLd(html);
  if (jsonLd.some((value) => value === null)) fail(`JSON-LD inválido en ${url}.`);
  for (const type of ['Organization', 'WebSite', 'BreadcrumbList', article.schemaType || 'NewsArticle', 'ImageObject']) {
    if (!jsonLd.some((value) => hasType(value, type))) fail(`Falta ${type} en JSON-LD de ${url}.`);
  }
  if (article.faqCount > 0 && !jsonLd.some((value) => hasType(value, 'FAQPage'))) fail(`Falta FAQPage en ${url}.`);
  if (article.youtubeVideoId && !jsonLd.some((value) => hasType(value, 'VideoObject'))) fail(`Falta VideoObject en ${url}.`);
  if (secretPattern.test(html)) fail(`Se detectó un patrón de secreto en ${url}.`);
}

for (const route of ['/blog', '/sitemap.xml', '/robots.txt', '/llms.txt']) {
  const url = new URL(route, cleanBase).href;
  try {
    const response = await fetch(url);
    const body = await response.text();
    if (response.status !== 200) fail(`${route} devolvió HTTP ${response.status}.`);
    if (route === '/blog' && !/<h1\b/i.test(body)) fail('El índice del blog no tiene H1.');
    if (route === '/blog' && !extractJsonLd(body).some((value) => hasType(value, 'ItemList'))) fail('El índice del blog no tiene ItemList.');
    if (route === '/sitemap.xml' && articleUrls.some((articleUrl) => !body.includes(new URL(articleUrl, cleanBase).pathname))) fail('El sitemap no contiene todas las URLs nuevas.');
    if (route === '/robots.txt' && !/Sitemap:\s*https?:\/\//i.test(body)) fail('robots.txt no declara el sitemap.');
  } catch (error) {
    fail(`No se pudo abrir ${url}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const serializedManifest = JSON.stringify(manifest);
if (secretPattern.test(serializedManifest)) fail('Se detectó un patrón de secreto en el manifiesto.');

if (failures.length) {
  console.error(JSON.stringify({ status: 'failed', failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ status: 'passed', articles: articles.length, baseUrl: cleanBase }, null, 2));
