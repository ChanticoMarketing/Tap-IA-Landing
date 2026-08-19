import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_URL } from './seo';

export type GeneratedBlogEntry = CollectionEntry<'blog'>;

export const getPublishedBlogEntries = async () => {
  const entries = await getCollection('blog', ({ data }) => data.published && data.reviewedByCodex);

  return entries.sort(
    (a, b) => new Date(b.data.datePublished).getTime() - new Date(a.data.datePublished).getTime(),
  );
};

export const getBlogEntryUrl = (slug: string) => new URL(`/blog/${slug}`, SITE_URL).href;

export const formatBlogDate = (value: string) =>
  new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'long',
    timeZone: 'America/Mexico_City',
  }).format(new Date(value));

export const getBlogIndexItems = (entries: GeneratedBlogEntry[]) =>
  entries.map((entry) => ({
    name: entry.data.title,
    url: getBlogEntryUrl(entry.slug),
    description: entry.data.description,
  }));
