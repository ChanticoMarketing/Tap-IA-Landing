import fs from 'node:fs/promises';
import path from 'node:path';

const arg = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};

const manifestPath = arg('--manifest');
if (!manifestPath) {
  console.error('Uso: npm run promote:blog-run -- --manifest var/blog-runs/YYYY-MM-DD/manifest.json');
  process.exit(2);
}

const repoRoot = process.cwd();
const manifestAbsolute = path.resolve(repoRoot, manifestPath);
const manifest = JSON.parse(await fs.readFile(manifestAbsolute, 'utf8'));

const reject = (message) => {
  console.error(`BLOG_PROMOTION_REJECTED: ${message}`);
  process.exit(1);
};

if (manifest.status !== 'ready_to_publish') reject('El manifiesto no está en ready_to_publish.');
if (manifest.gates?.codexFinalReview?.status !== 'passed') reject('La revisión final de Codex no pasó.');
if (manifest.gates?.antigravity?.decision !== 'approved') reject('Antigravity no aprobó el diseño.');
if (!Array.isArray(manifest.authorizedFiles) || manifest.authorizedFiles.length === 0) reject('No hay archivos autorizados para promover.');

const runRoot = path.dirname(manifestAbsolute);
const isInside = (candidate, parent) => candidate === parent || candidate.startsWith(`${parent}${path.sep}`);
const allowedDestinations = [path.join(repoRoot, 'content', 'blog'), path.join(repoRoot, 'public', 'images', 'blog')];
const promoted = [];

for (const file of manifest.authorizedFiles) {
  if (!file || typeof file.source !== 'string' || typeof file.destination !== 'string') reject('authorizedFiles tiene un elemento inválido.');
  const source = path.resolve(runRoot, file.source);
  const destination = path.resolve(repoRoot, file.destination);
  if (!isInside(source, runRoot)) reject(`Origen fuera del run: ${file.source}`);
  if (!allowedDestinations.some((directory) => isInside(destination, directory))) reject(`Destino no autorizado: ${file.destination}`);
  await fs.access(source);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(source, destination);
  promoted.push(file.destination);
}

console.log(JSON.stringify({ status: 'promoted', files: promoted }, null, 2));
