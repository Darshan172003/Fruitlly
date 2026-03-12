import type { DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import type { BlogPost } from '../types/blog';
import { slugifyValue } from './productCatalog';

const BLOG_COLOR_PALETTE = [
  'bg-emerald-500',
  'bg-primary',
  'bg-amber-500',
  'bg-blue-500',
  'bg-fuchsia-500',
  'bg-orange-500',
];

export const getBlogPlainText = (value: string) => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export const getBlogCategoryId = (category: string) => slugifyValue(category);

export const getBlogCategoryColor = (categoryId: string) => {
  if (!categoryId) {
    return BLOG_COLOR_PALETTE[0];
  }

  const hash = categoryId.split('').reduce((total, char) => total + char.charCodeAt(0), 0);
  return BLOG_COLOR_PALETTE[hash % BLOG_COLOR_PALETTE.length];
};

export const getBlogReadTime = (content: string) => {
  const wordCount = getBlogPlainText(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 180));
  return `${minutes} MIN READ`;
};

export const getBlogPublishedLabel = (value: Timestamp | Date | null | undefined) => {
  const date = value instanceof Date ? value : value?.toDate?.() ?? null;

  if (!date) {
    return 'DRAFT';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date).toUpperCase();
};

export const mapBlogData = (id: string, data: DocumentData): BlogPost => {
  const category = String(data.category ?? 'General');
  const categoryId = String(data.categoryId ?? getBlogCategoryId(category));
  const content = String(data.content ?? '');

  return {
    id,
    title: String(data.title ?? ''),
    excerpt: String(data.excerpt ?? ''),
    content,
    category,
    categoryId,
    categoryColor: String(data.categoryColor ?? getBlogCategoryColor(categoryId)),
    imageUrl: String(data.imageUrl ?? ''),
    imagePath: String(data.imagePath ?? ''),
    publishedLabel: String(data.publishedLabel ?? getBlogPublishedLabel(data.publishedAt ?? data.createdAt)),
    readTime: String(data.readTime ?? getBlogReadTime(content)),
    sortTitle: String(data.sortTitle ?? id),
  };
};

export const mapBlogDocument = (document: QueryDocumentSnapshot<DocumentData>): BlogPost => {
  return mapBlogData(document.id, document.data());
};

export const getBlogExcerptPreview = (content: string, fallback: string) => {
  if (fallback.trim()) {
    return fallback.trim();
  }

  const text = getBlogPlainText(content);
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= 28) {
    return text;
  }

  return `${words.slice(0, 28).join(' ')}...`;
};