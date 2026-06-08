import { defineMiddleware } from 'astro:middleware';

const LONG_CACHE = 'public, max-age=31536000, immutable';

const isLongCachePath = (pathname: string) =>
  pathname.startsWith('/_astro/') ||
  pathname.startsWith('/images/') ||
  pathname.startsWith('/fonts/') ||
  /\.(webp|png|jpg|jpeg|gif|svg|ico|woff2?|otf|ttf|css|js)$/i.test(pathname);

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  if (isLongCachePath(context.url.pathname)) {
    response.headers.set('Cache-Control', LONG_CACHE);
  }

  // HSTS Security Header
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  return response;
});
