// Production bootstrap for Hostinger Node.js Web App.
// Astro's standalone entry auto-starts the HTTP server when imported.

process.env.PORT = process.env.PORT || process.env.NODE_PORT || process.env.APP_PORT || '3000';
process.env.HOST = process.env.HOST || '0.0.0.0';

await import('./dist/server/entry.mjs');
