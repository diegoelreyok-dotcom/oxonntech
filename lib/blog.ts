import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import type { BlogPost, BlogCategory, TOCItem } from '@/types';
import { getTeamMemberById } from '@/content/team';

const INSIGHTS_DIR = path.join(process.cwd(), 'content/insights');

/* ── In-memory cache ── */
let cachedPosts: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = process.env.NODE_ENV === 'production' ? 60_000 : 0; // 60s prod, none in dev


/** Sanitization schema: default + ids/classes for headings & code blocks */
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] ?? []), 'id', 'className'],
    a: [...(defaultSchema.attributes?.['a'] ?? []), 'href', 'target', 'rel'],
    code: [...(defaultSchema.attributes?.['code'] ?? []), 'className'],
    pre: [...(defaultSchema.attributes?.['pre'] ?? []), 'className'],
  },
};

function markdownToHtml(markdown: string): string {
  const result = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .processSync(markdown);

  return String(result);
}

function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    items.push({ id, text, level });
  }

  return items;
}

export function getAllPosts(): BlogPost[] {
  const now = Date.now();
  if (cachedPosts && CACHE_TTL > 0 && now - cacheTimestamp < CACHE_TTL) {
    return cachedPosts;
  }

  if (!fs.existsSync(INSIGHTS_DIR)) return [];

  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files
    .map((filename) => {
      const filepath = path.join(INSIGHTS_DIR, filename);
      const fileContent = fs.readFileSync(filepath, 'utf-8');
      const { data, content } = matter(fileContent);

      if (data.status !== 'published') return null;

      const authorMember = getTeamMemberById(data.author as string);

      const post: BlogPost = {
        id: data.slug || filename.replace('.mdx', ''),
        title: data.title,
        slug: data.slug || filename.replace('.mdx', ''),
        excerpt: data.excerpt || '',
        body: markdownToHtml(content),
        category: data.category as BlogCategory,
        tags: data.tags || [],
        featuredImage: data.featuredImage || {
          src: '/images/insights/placeholder-blog.svg',
          alt: data.title,
          width: 1200,
          height: 630,
        },
        author: {
          ref: data.author,
          name: authorMember?.name || 'OXONN Team',
          avatar: authorMember?.image.src || '/images/team/placeholder-avatar.svg',
        },
        seoMeta: data.seoMeta || {},
        publishDate: data.publishDate,
        updatedDate: data.updatedDate,
        status: data.status,
        readingTime: Math.ceil(readingTime(content).minutes),
        tableOfContents: extractTOC(content),
      };

      return post;
    })
    .filter((p): p is BlogPost => p !== null)
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );

  cachedPosts = posts;
  cacheTimestamp = Date.now();
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getRelatedPosts(
  currentSlug: string,
  category: BlogCategory,
  limit = 3
): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
