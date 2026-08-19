import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const arg = (name) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
};

const outputPath = arg('--output');
const promptFile = arg('--prompt-file') || process.env.ANTIGRAVITY_PROMPT_FILE;
const screenshotDir = arg('--screenshot-dir') || process.env.ANTIGRAVITY_SCREENSHOT_DIR;
const previewUrl = arg('--preview-url') || process.env.ANTIGRAVITY_PREVIEW_URL;
const schemaFile = arg('--schema-file') || process.env.ANTIGRAVITY_SCHEMA_FILE || path.resolve('config/antigravity-review.schema.json');
const model = process.env.ANTIGRAVITY_MODEL || 'gemini-3.6-flash-high';
const effort = model.match(/-(high|medium|low)$/)?.[1] || 'high';
const binary = process.env.ANTIGRAVITY_BIN || 'agy';
const argsJson = process.env.ANTIGRAVITY_ARGS_JSON;

const fail = async (message, code = 1) => {
  const result = { status: 'failed', decision: 'rejected', reason: message, exitCode: code };
  if (outputPath) {
    await fs.mkdir(path.dirname(path.resolve(outputPath)), { recursive: true });
    await fs.writeFile(path.resolve(outputPath), `${JSON.stringify(result, null, 2)}\n`);
  }
  console.error(`ANTIGRAVITY_REJECTED: ${message}`);
  process.exit(code);
};

if (!outputPath) await fail('Falta --output para el resultado estructurado.', 2);
if (!previewUrl) await fail('Falta --preview-url o ANTIGRAVITY_PREVIEW_URL.', 2);
if (!screenshotDir) await fail('Falta --screenshot-dir o ANTIGRAVITY_SCREENSHOT_DIR.', 2);
try {
  await fs.access(path.resolve(screenshotDir));
  await fs.access(path.resolve(schemaFile));
} catch {
  await fail('No existe el directorio de capturas o el JSON Schema configurado.', 2);
}

let prompt = `Revisa el preview local ${previewUrl} usando las capturas disponibles en ${path.resolve(screenshotDir)}. Puedes modificar el diseño y los componentes visuales del sitio dentro del workspace para mantener la calidad visual aprobada de TAP-IA en desktop y mobile. No inventes contenido, no cambies fuentes verificables ni elimines datos SEO/GEO. Comprueba navegación, responsive, accesibilidad, imágenes, enlaces y consistencia visual. Al terminar, responde exclusivamente con el JSON que exige el schema configurado, usando decision=approved solo si el preview final es válido.`;
if (promptFile) {
  try {
    prompt = await fs.readFile(path.resolve(promptFile), 'utf8');
  } catch {
    await fail(`No se pudo leer el prompt de Antigravity: ${promptFile}.`, 2);
  }
}

let args;
if (argsJson) {
  try {
    args = JSON.parse(argsJson);
  } catch {
    await fail('ANTIGRAVITY_ARGS_JSON no es JSON válido.', 2);
  }
  if (!Array.isArray(args) || args.some((value) => typeof value !== 'string')) await fail('ANTIGRAVITY_ARGS_JSON debe ser un arreglo de strings.', 2);
} else {
  args = [
    '--print',
    prompt,
    '--model',
    model,
    '--effort',
    effort,
    '--mode',
    'accept-edits',
    '--output-format',
    'json',
    '--json-schema',
    path.resolve(schemaFile),
    '--add-dir',
    path.resolve(screenshotDir),
  ];
}

const values = {
  '{PREVIEW_URL}': previewUrl,
  '{SCREENSHOT_DIR}': path.resolve(screenshotDir),
  '{OUTPUT_JSON}': path.resolve(outputPath),
  '{MODEL}': model,
  '{PROMPT}': prompt,
  '{SCHEMA_FILE}': path.resolve(schemaFile),
};

for (const [placeholder, value] of Object.entries(values)) {
  if (args.some((item) => item.includes(placeholder)) && !value) await fail(`Falta configurar ${placeholder}.`, 2);
}

const resolvedArgs = args.map((item) => Object.entries(values).reduce(
  (resolved, [placeholder, value]) => resolved.replaceAll(placeholder, value ?? placeholder),
  item,
));

const child = spawnSync(binary, resolvedArgs, {
  cwd: process.cwd(),
  encoding: 'utf8',
  shell: false,
  stdio: ['ignore', 'pipe', 'pipe'],
});

if (child.error) await fail(`No se pudo ejecutar ${binary}: ${child.error.message}`, 2);
if (child.status !== 0) await fail(`${binary} terminó con código ${child.status ?? 'desconocido'}.`, child.status || 1);

let rawResult;
try {
  rawResult = JSON.parse(await fs.readFile(path.resolve(outputPath), 'utf8'));
} catch {
  const stdout = (child.stdout ?? '').trim();
  try {
    rawResult = JSON.parse(stdout);
  } catch {
    await fail('Antigravity no produjo un JSON de resultado legible.', 1);
  }
}

if (!rawResult || typeof rawResult !== 'object') await fail('El resultado de Antigravity no es un objeto.', 1);
if (rawResult.decision !== 'approved') await fail('Antigravity no aprobó el preview final.', 1);
if (!Array.isArray(rawResult.filesModified)) await fail('El resultado no incluye filesModified como arreglo.', 1);

const safeResult = {
  status: 'passed',
  decision: 'approved',
  model: process.env.ANTIGRAVITY_MODEL ?? null,
  previewUrl: typeof rawResult.previewUrl === 'string' ? rawResult.previewUrl : previewUrl,
  filesModified: rawResult.filesModified.filter((value) => typeof value === 'string'),
  checks: rawResult.checks && typeof rawResult.checks === 'object' ? rawResult.checks : {},
};

await fs.writeFile(path.resolve(outputPath), `${JSON.stringify(safeResult, null, 2)}\n`);
console.log(JSON.stringify(safeResult, null, 2));
