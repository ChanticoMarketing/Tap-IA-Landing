/**
 * Smoke test Resend (local o CI).
 * Uso:
 *   $env:RESEND_API_KEY="re_..."; $env:RESEND_FROM_EMAIL="Tap-IA Contacto <contacto@tap-ia.tech>"
 *   node scripts/verify-resend.mjs
 */
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY?.trim();
const from =
  process.env.RESEND_FROM_EMAIL?.trim() || 'Tap-IA Contacto <contacto@tap-ia.tech>';
const to = process.env.LEAD_NOTIFY_TO?.trim() || 'emmanuel@tap-ia.tech';

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

if (!apiKey) fail('RESEND_API_KEY no definida en el entorno.');
if (!apiKey.startsWith('re_')) fail('RESEND_API_KEY no tiene formato re_*.');

const resend = new Resend(apiKey);
const { data, error } = await resend.emails.send({
  from,
  to: [to],
  subject: '[Tap-IA] Smoke test Resend (verify-resend.mjs)',
  html: '<p>Prueba de verificación de integración. Puedes ignorar este correo.</p>',
  text: 'Prueba de verificación de integración. Puedes ignorar este correo.',
  tags: [{ name: 'source', value: 'verify-script' }],
});

if (error) {
  fail(error.message);
}

console.log(`OK: correo encolado. Resend id: ${data.id}`);
console.log(`  from: ${from}`);
console.log(`  to:   ${to}`);
console.log('Revisa Resend Dashboard → Logs y la bandeja de entrada.');
