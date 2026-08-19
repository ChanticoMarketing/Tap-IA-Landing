import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sourceSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  publishedAt: z.string().optional(),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const mediaSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

const youtubeSchema = z.object({
  videoId: z.string().regex(/^[A-Za-z0-9_-]{11}$/),
  title: z.string().min(1),
  description: z.string().min(1),
  thumbnailUrl: z.string().url().optional(),
});

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdoc,mdx}',
    base: './content/blog',
    retainBody: true,
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(320),
    author: z.string().default('Emmanuel Tapia'),
    datePublished: z.string().datetime({ offset: true }),
    dateModified: z.string().datetime({ offset: true }).optional(),
    articleSection: z.string().min(1),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    importance: z.enum(['basic', 'intermediate', 'advanced']),
    editorialType: z.enum(['technical', 'marketing', 'market', 'combined']),
    newsClusterId: z.string().min(1),
    heroImage: z.string().min(1),
    heroAlt: z.string().min(1),
    infographic: mediaSchema.optional(),
    youtube: youtubeSchema.optional(),
    sources: z.array(sourceSchema).min(1),
    faq: z.array(faqSchema).default([]),
    relatedSlugs: z.array(z.string()).default([]),
    schemaType: z.enum(['Article', 'NewsArticle', 'BlogPosting']).default('NewsArticle'),
    published: z.boolean().default(true),
    reviewedByCodex: z.boolean().default(false),
  }),
});

export const collections = { blog };
