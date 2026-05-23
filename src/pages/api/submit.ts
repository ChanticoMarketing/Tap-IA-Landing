import type { APIRoute } from 'astro';

export const prerender = false;

const N8N_WEBHOOK_URL =
  import.meta.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/tap-ia-leads';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    if (data?.bot_field) {
      return new Response(JSON.stringify({ error: 'Solicitud rechazada' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!data?.name || !data?.email || !data?.company) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!EMAIL_RE.test(String(data.email))) {
      return new Response(JSON.stringify({ error: 'Correo electrónico inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!data.consent) {
      return new Response(JSON.stringify({ error: 'Debe aceptar el aviso de privacidad' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const services = Array.isArray(data.services) ? data.services : [];
    if (services.length === 0) {
      return new Response(JSON.stringify({ error: 'Seleccione al menos un servicio' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const payload = {
      name: data.name,
      email: data.email,
      company: data.company,
      role: data.role || 'No especificado',
      phone: data.phone || '',
      obstacle: data.obstacle,
      value_prop: data.value_prop || '',
      has_website: data.has_website,
      current_website: data.current_website || '',
      services,
      urgency: data.urgency,
      budget: data.budget,
      tool: data.tool || 'none',
      source_page: data.source_page || '',
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      plan: data.plan || '',
      servicio: data.servicio || '',
      problem: data.problem || '',
      demo: data.demo || '',
      referrer: data.referrer || '',
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Orquestador N8N respondió con estatus: ${response.status}`);
    }

    const n8nResponse = await response.json().catch(() => ({}));

    return new Response(
      JSON.stringify({
        success: true,
        message: n8nResponse.message || 'Solicitud recibida. Te contactaremos en 1 día hábil.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: unknown) {
    console.error('[SSR Error] Conexión N8N fallida:', err);
    return new Response(
      JSON.stringify({ error: 'No se pudo procesar la solicitud en este momento.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
