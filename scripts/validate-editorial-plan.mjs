import fs from 'node:fs/promises';
import path from 'node:path';

const arg = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};

const inputPath = arg('--input');
if (!inputPath) {
  console.error('Uso: npm run validate:editorial-plan -- --input ruta/al/plan.json');
  process.exit(2);
}

const fail = (message) => {
  console.error(`EDITORIAL_PLAN_REJECTED: ${message}`);
  process.exitCode = 1;
};

let plan;
try {
  plan = JSON.parse(await fs.readFile(path.resolve(inputPath), 'utf8'));
} catch (error) {
  fail(`No se pudo leer JSON: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}

const news = Array.isArray(plan.selectedNews) ? plan.selectedNews : [];
const articles = Array.isArray(plan.articles) ? plan.articles : [];
const levels = new Set(['basic', 'intermediate', 'advanced']);
const requiredTypes = {
  basic: ['combined'],
  intermediate: ['technical', 'marketing'],
  advanced: ['technical', 'marketing', 'market'],
};

if (news.length !== 3) fail(`Se requieren exactamente 3 noticias; se recibieron ${news.length}.`);
if (articles.length > 9) fail(`El máximo diario es 9 artículos; se recibieron ${articles.length}.`);

const newsIds = new Set();
for (const item of news) {
  if (!item || typeof item !== 'object') {
    fail('Cada noticia seleccionada debe ser un objeto.');
    continue;
  }
  if (!item.id || newsIds.has(item.id)) fail('Las noticias deben tener IDs únicos.');
  newsIds.add(item.id);
  if (!levels.has(item.importance)) fail(`Nivel inválido para ${item.id ?? 'noticia sin ID'}.`);
  if (!Array.isArray(item.sources) || item.sources.length < 1) fail(`Falta fuente para ${item.id ?? 'noticia sin ID'}.`);
}

for (const item of news) {
  if (!item?.id || !levels.has(item.importance)) continue;
  const clusterArticles = articles.filter((article) => article.newsClusterId === item.id);
  const expected = requiredTypes[item.importance];
  const actualTypes = clusterArticles.map((article) => article.editorialType).sort();
  if (clusterArticles.length !== expected.length || JSON.stringify(actualTypes) !== JSON.stringify([...expected].sort())) {
    fail(`${item.id} (${item.importance}) requiere: ${expected.join(', ')}; recibió: ${actualTypes.join(', ') || 'ninguno'}.`);
  }
}

for (const article of articles) {
  if (!article?.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) fail(`Slug inválido: ${article?.slug ?? '(vacío)'}.`);
  if (!newsIds.has(article.newsClusterId)) fail(`Artículo ${article.slug ?? '(sin slug)'} apunta a una noticia inexistente.`);
  if (!['technical', 'marketing', 'market', 'combined'].includes(article.editorialType)) fail(`Tipo editorial inválido en ${article.slug ?? '(sin slug)'}.`);
}

if (!process.exitCode) {
  console.log(JSON.stringify({ status: 'valid', selectedNews: news.length, articles: articles.length }, null, 2));
}
