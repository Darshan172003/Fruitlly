import type { ReactNode } from 'react';
import type { ProductCategory } from '../../types/product';

export type AdminSectionId = 'add-product' | 'catalog' | 'add-recipe' | 'recipe-library' | 'add-blog' | 'blog-library';

export interface ProductFormState {
  categoryId: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  imagePath: string;
  moqs: string[];
}

export interface RecipeFormState {
  title: string;
  description: string;
  youtubeUrl: string;
  duration: string;
}

export interface BlogFormState {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imagePath: string;
}

export interface AdminSidebarItem {
  id: AdminSectionId;
  label: string;
  description: string;
  icon: ReactNode;
}

export interface CategoryFormState {
  name: string;
}

export interface CategoryOption extends ProductCategory {}