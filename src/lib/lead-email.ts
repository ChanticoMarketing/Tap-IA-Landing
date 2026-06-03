import { Resend } from 'resend';

/** Único destinatario de notificaciones del formulario de contacto. */
const LEAD_NOTIFY_TO = 'emmanuel@tap-ia.tech';

export type LeadPayload = {
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  obstacle: string;
  primary_goal: string;
  value_prop: string;
  has_website: string;
  current_website: string;
  services: string[];
  urgency: string;
  budget: string;
  tool: string;
  source_page: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  plan: string;
  servicio: string;
  problem: string;
  demo: string;
  referrer: string;
};

const OBSTACLE_LABELS: Record<string, string> = {
  invisibility: 'No aparecemos en Google (SEO / visitas)',
  conversion: 'Visitas sin contactos ni ventas',
  trust: 'Web desactualizada frente a la competencia',
  tech: 'La IA no recomienda nuestro negocio (GEO)',
};

const PRIMARY_GOAL_LABELS: Record<string, string> = {
  launch_presence: 'Lanzar mi presencia online',
  get_found_google: 'Que me encuentren en Google',
  ai_visibility: 'Aparecer en respuestas de IA',
  automate_leads: 'Automatizar atención o ventas con IA',
  not_sure: 'No estoy seguro, necesito un diagnóstico',
};

const WEBSITE_LABELS: Record<string, string> = {
  yes: 'Sí, web activa',
  no: 'Sin página web',
  old: 'Web vieja o que no vende',
};

const SERVICE_LABELS: Record<string, string> = {
  web: 'Página web o landing premium',
  seo_geo: 'Posicionamiento Google e IA',
  agents: 'Automatizaciones o agentes de IA',
  webapps: 'Plataforma o software a medida',
  marketing: 'Marketing asistido por IA',
  avatars: 'Avatares IA o videos automatizados',
};

const URGENCY_LABELS: Record<string, string> = {
  asap: 'Lo antes posible (< 2 semanas)',
  soon: 'Próximo mes',
  info: 'Explorando opciones',
};

const BUDGET_LABELS: Record<string, string> = {
  captacion: 'Independiente o validando negocio',
  sistema: 'Equipo pequeño/mediano (2–15 personas)',
  arquitectura: 'Empresa consolidada (+15 personas)',
  evaluar: 'Definir en sesión de diagnóstico',
};

const TOOL_LABELS: Record<string, string> = {
  none: 'No usan Notion ni Taskade',
  taskade: 'Taskade',
  notion: 'Notion',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function label(map: Record<string, string>, key: string): string {
  return map[key] || key || '—';
}

function row(labelText: string, value: string): string {
  const safe = escapeHtml(value || '—');
  return `<tr><td style="padding:8px 12px;color:#888;width:38%;vertical-align:top">${escapeHtml(labelText)}</td><td style="padding:8px 12px;color:#f5f5f5">${safe}</td></tr>`;
}

export function buildLeadEmailContent(payload: LeadPayload): { subject: string; html: string; text: string } {
  const servicesText = payload.services
    .map((s) => label(SERVICE_LABELS, s))
    .join(', ');

  const subject = `[Tap-IA] Nuevo lead: ${payload.name} · ${payload.company}`;

  const html = `<!DOCTYPE html>
<html lang="es">
<body style="margin:0;background:#151413;font-family:system-ui,sans-serif;color:#f5f5f5">
  <div style="max-width:600px;margin:0 auto;padding:24px">
    <p style="color:#c9a227;font-size:12px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 8px">Nuevo diagnóstico web</p>
    <h1 style="font-size:22px;margin:0 0 20px;font-weight:600">${escapeHtml(payload.name)}</h1>
    <table style="width:100%;border-collapse:collapse;background:#1e1d1c;border-radius:8px;overflow:hidden">
      ${row('Empresa', payload.company)}
      ${row('Correo', payload.email)}
      ${row('Cargo', payload.role)}
      ${row('WhatsApp', payload.phone || 'No indicado')}
      ${row('Obstáculo', label(OBSTACLE_LABELS, payload.obstacle))}
      ${row('Objetivo principal', label(PRIMARY_GOAL_LABELS, payload.primary_goal))}
      ${row('Propuesta de valor', payload.value_prop || '—')}
      ${row('Sitio web', label(WEBSITE_LABELS, payload.has_website))}
      ${row('URL actual', payload.current_website || '—')}
      ${row('Servicios', servicesText)}
      ${row('Urgencia', label(URGENCY_LABELS, payload.urgency))}
      ${row('Escala', label(BUDGET_LABELS, payload.budget))}
      ${row('Herramientas', label(TOOL_LABELS, payload.tool))}
      ${row('Página origen', payload.source_page || '—')}
      ${row('UTM', [payload.utm_source, payload.utm_medium, payload.utm_campaign].filter(Boolean).join(' / ') || '—')}
      ${row('Plan', payload.plan || '—')}
      ${row('Servicio URL', payload.servicio || '—')}
      ${row('Demo', payload.demo || '—')}
      ${row('Referrer', payload.referrer || '—')}
    </table>
    <p style="color:#888;font-size:12px;margin-top:20px">Enviado desde el formulario de contacto Tap-IA.</p>
  </div>
</body>
</html>`;

  const text = [
    `Nuevo lead Tap-IA: ${payload.name}`,
    `Empresa: ${payload.company}`,
    `Correo: ${payload.email}`,
    `Cargo: ${payload.role}`,
    `WhatsApp: ${payload.phone || 'No indicado'}`,
    `Obstáculo: ${label(OBSTACLE_LABELS, payload.obstacle)}`,
    `Objetivo principal: ${label(PRIMARY_GOAL_LABELS, payload.primary_goal)}`,
    `Propuesta de valor: ${payload.value_prop || '—'}`,
    `Web: ${label(WEBSITE_LABELS, payload.has_website)}`,
    `URL: ${payload.current_website || '—'}`,
    `Servicios: ${servicesText}`,
    `Urgencia: ${label(URGENCY_LABELS, payload.urgency)}`,
    `Escala: ${label(BUDGET_LABELS, payload.budget)}`,
    `Herramientas: ${label(TOOL_LABELS, payload.tool)}`,
    `Origen: ${payload.source_page || '—'}`,
    `UTM: ${[payload.utm_source, payload.utm_medium, payload.utm_campaign].filter(Boolean).join(' / ') || '—'}`,
  ].join('\n');

  return { subject, html, text };
}

function readServerEnv(name: string): string | undefined {
  // Hostinger/PaaS inyectan secretos en runtime (process.env), no en build.
  const runtime = typeof process !== 'undefined' ? process.env[name] : undefined;
  const built = (import.meta.env as Record<string, string | undefined>)[name];
  const value = runtime ?? built;
  return value?.trim() || undefined;
}

export async function sendLeadNotificationEmail(payload: LeadPayload): Promise<{ id: string }> {
  const apiKey = readServerEnv('RESEND_API_KEY');
  if (!apiKey) {
    throw new Error('RESEND_API_KEY no configurada');
  }

  const from =
    readServerEnv('RESEND_FROM_EMAIL') || 'Tap-IA Contacto <contacto@tap-ia.tech>';

  const resend = new Resend(apiKey);
  const { subject, html, text } = buildLeadEmailContent(payload);

  const { data, error } = await resend.emails.send({
    from,
    to: [LEAD_NOTIFY_TO],
    replyTo: payload.email,
    subject,
    html,
    text,
    tags: [{ name: 'source', value: 'contact-form' }],
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.id) {
    throw new Error('Resend no devolvió ID de envío');
  }

  return { id: data.id };
}
