export const SITE_URL = 'https://tap-ia.tech';

/** Token público de Search Console (visible en HTML). Override con PUBLIC_GOOGLE_SITE_VERIFICATION. */
const GOOGLE_SITE_VERIFICATION_DEFAULT = 'UnvzIf5Fe7a61U4AM2dLWfY3khV_64_mMUlG7OCBa0o';

const envVerification = (import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION ?? '').trim();
const GOOGLE_SITE_VERIFICATION_RAW = envVerification || GOOGLE_SITE_VERIFICATION_DEFAULT;

export const GOOGLE_SITE_VERIFICATION_CONTENT = GOOGLE_SITE_VERIFICATION_RAW.replace(
  /^google-site-verification=/i,
  ''
);

const normalizePath = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized === '' ? '/' : normalized;
};

export const INDEXABLE_ROUTES = [
  '/',
  '/soluciones',
  '/soluciones/seo-geo',
  '/soluciones/web',
  '/soluciones/avatares-ia',
  '/consultoria-inteligencia-artificial',
  '/auditoria-ia-marketing-seo-geo',
  '/infraestructura-digital',
  '/ai-marketing',
  '/agentes-ia-a-medida',
  '/webapps-ia-a-medida',
  '/portafolio',
  '/novedades-ia',
  '/novedades-ia/agentes-ia-marketing-2026-openclaw-manus-era-agentica',
  '/novedades-ia/claude-mythos-proyecto-glasswing-2026',
  '/recursos',
  '/recursos/calculadora-roi-ia',
  '/recursos/megaprompts-b2b-marketing',
  '/sobre',
  '/contacto',
] as const;

export const NOINDEX_ROUTES = new Set([
  '/contacto/gracias',
  '/legal',
  '/soluciones/ai-marketing',
  '/soluciones/agentes-ia',
  '/soluciones/webapps',
  '/novedades-ia/noticia-mock',
  '/portafolio/sitios-web',
  '/portafolio/seo-geo',
  '/portafolio/agentes-ia',
  '/portafolio/webapps',
  '/portafolio/ai-marketing',
  '/portafolio/avatares-ia',
  '/demos/zapa-elite',
  '/demos/real-estate',
  '/demos/pagos-pro',
  '/demos/pagos-pro/manifiesto',
  '/demos/pagos-pro/sistema',
]);

export const CANONICAL_OVERRIDES = new Map<string, string>([
  ['/soluciones/ai-marketing', '/ai-marketing'],
  ['/soluciones/agentes-ia', '/agentes-ia-a-medida'],
  ['/soluciones/webapps', '/webapps-ia-a-medida'],
  ['/novedades-ia/noticia-mock', '/novedades-ia'],
  ['/portafolio/sitios-web', '/portafolio'],
  ['/portafolio/seo-geo', '/portafolio'],
  ['/portafolio/agentes-ia', '/portafolio'],
  ['/portafolio/webapps', '/portafolio'],
  ['/portafolio/ai-marketing', '/portafolio'],
  ['/portafolio/avatares-ia', '/portafolio'],
  ['/demos/zapa-elite', '/portafolio/sitios-web'],
  ['/demos/real-estate', '/portafolio/sitios-web'],
  ['/demos/pagos-pro', '/portafolio/sitios-web'],
  ['/demos/pagos-pro/manifiesto', '/portafolio/sitios-web'],
  ['/demos/pagos-pro/sistema', '/portafolio/sitios-web'],
]);

const DEFAULT_DESCRIPTIONS: Record<string, string> = {
  '/': 'Consultoría e implementación de IA para marketing B2B. SEO/GEO, agentes IA, automatización y estrategia digital con criterio.',
  '/soluciones': 'Explora soluciones de IA para convertir visibilidad, automatización y marketing en resultados de negocio.',
  '/soluciones/seo-geo': 'Servicio de SEO y GEO para hacer tu marca encontrable en Google y citable en respuestas de IA.',
  '/soluciones/web': 'Sitios web de alto rendimiento para captar, explicar y convertir mejor.',
  '/soluciones/avatares-ia': 'Avatares IA para escalar video, formación y comunicación con clones digitales realistas.',
  '/consultoria-inteligencia-artificial': 'Consultoría de IA para empresas que necesitan claridad, estrategia y resultados medibles.',
  '/auditoria-ia-marketing-seo-geo': 'Auditoría integral de IA, marketing y SEO/GEO para detectar fricciones y oportunidades de mejora.',
  '/infraestructura-digital': 'No tengas solo una página web. Diseña una infraestructura digital premium que atraiga clientes, califique leads en piloto automático y te posicione en la era de la inteligencia artificial.',
  '/ai-marketing': 'AI Marketing para aplicar inteligencia artificial a estrategia, contenido y análisis de campañas.',
  '/agentes-ia-a-medida': 'Desarrollo de agentes IA a medida para automatizar procesos reales y mejorar la operación.',
  '/webapps-ia-a-medida': 'Desarrollo de WebApps con IA integrada para sistemas internos, portales y herramientas a medida.',
  '/portafolio': 'Demos y entregables de TAP-IA para ver metodología, arquitectura y calidad de ejecución en distintos frentes de IA.',
  '/portafolio/sitios-web': 'Demos de sitios web pensadas para explicar arquitectura, velocidad y conversión.',
  '/portafolio/seo-geo': 'Demos de SEO-GEO para visibilidad en buscadores y entornos generativos de IA.',
  '/portafolio/agentes-ia': 'Demos de agentes IA para ventas, soporte y automatización operativa.',
  '/portafolio/webapps': 'Demos de WebApps a medida para procesos internos y plataformas complejas.',
  '/portafolio/ai-marketing': 'Demos de AI Marketing con funnels, analítica y workflows automatizados.',
  '/portafolio/avatares-ia': 'Demos de avatares IA para comunicación audiovisual escalable.',
  '/novedades-ia': 'Noticias y análisis de IA filtrados por impacto real en marketing, visibilidad y automatización.',
  '/novedades-ia/agentes-ia-marketing-2026-openclaw-manus-era-agentica': 'Análisis de la transición de chatbots a agentes autónomos en la operativa real de negocio.',
  '/novedades-ia/claude-mythos-proyecto-glasswing-2026':
    'Claude Mythos Preview y Project Glasswing: análisis de Anthropic, acceso restringido e implicaciones para ciberseguridad, marketing y SEO/GEO en 2026.',
  '/recursos': 'Plantillas, playbooks y guías operativas para equipos que quieren aplicar IA con criterio.',
  '/recursos/calculadora-roi-ia': 'Calculadora de ROI interactiva para estimar el ahorro operativo y el retorno de inversión de Agentes de IA conversacionales en ventas y soporte B2B.',
  '/recursos/megaprompts-b2b-marketing': 'Biblioteca de 5 megaprompts premium de Claude y ChatGPT para marketing de contenidos B2B, copywriting y playbooks de objeciones.',
  '/sobre': 'Conoce la visión, experiencia y enfoque de TAP-IA para construir autoridad digital con IA.',
  '/contacto': 'Contacta a TAP-IA para evaluar tu caso de negocio y definir el siguiente paso con criterio.',
  '/contacto/gracias': 'Tu solicitud de diagnóstico fue recibida. TAP-IA te contactará en 1 día hábil.',
  '/legal': 'Aviso legal, privacidad y políticas de uso responsable de TAP-IA.',
  '/novedades-ia/noticia-mock': 'Análisis de Google, AI Overviews y GEO para entender cómo cambia la visibilidad en búsquedas generativas.',
};

export interface SeoDefaults {
  description: string;
  canonical: string;
  noIndex: boolean;
}

export const getSeoDefaults = (pathname: string): SeoDefaults => {
  const normalizedPath = normalizePath(pathname);

  return {
    description:
      DEFAULT_DESCRIPTIONS[normalizedPath] ??
      'Consultoría e implementación de IA para marketing B2B. SEO/GEO, agentes IA, automatización y estrategia digital con criterio.',
    canonical: new URL(CANONICAL_OVERRIDES.get(normalizedPath) ?? normalizedPath, SITE_URL).href,
    noIndex: NOINDEX_ROUTES.has(normalizedPath),
  };
};
