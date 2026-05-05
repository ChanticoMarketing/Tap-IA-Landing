import type { APIRoute } from 'astro';

// Se debe asegurar que esta ruta no se genere estáticamente (requiere SSR Mode)
export const prerender = false; 

// ⚠️ Esta URL debe corresponder a tu webhook de n8n local o productivo.
// Por defecto el webhook de pruebas de n8n es /webhook-test/ y el de producción es /webhook/
const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/tap-ia-leads";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // 1. Filtro de seguridad perimetral (Evita procesar basura si bots atacan directamente el endpoint)
    if (!data || !data.email || !data.name) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Puente Seguro: Transmisión oculta hacia N8N
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
      // signal: AbortSignal.timeout(5000) // Recomendado si Node version > 16
    });

    if (!response.ok) {
      // Si N8N responde con error (ej. 500)
      throw new Error(`Orquestador N8N respondió con estatus: ${response.status}`);
    }

    // Leemos la respuesta personalizada del nodo "Responder a Astro" (Webhook Response Node)
    const n8nResponse = await response.json().catch(() => ({}));

    return new Response(JSON.stringify({ 
      success: true, 
      message: n8nResponse.message || "Lead derivado exitosamente y en proceso." 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
    
  } catch (err: any) {
    console.error("[SSR Error] Conexión N8N fallida:", err);
    // Retornamos un 500 elegante sin reventar el cliente
    return new Response(JSON.stringify({ error: "No se pudo procesar la solicitud en este momento." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
    });
  }
}
