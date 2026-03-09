import type { ReactNode } from 'react';
import type { ProductCategory } from '../../types/product';

export type AdminSectionId = 'add-product' | 'catalog';

export interface ProductFormState {
  categoryId: string;
  title: string;
  shortDescription: string;
  description: string;
  ingredients: string;
  textureProfile: string;
  bulkPackaging: string;
  shelfLifeStorage: string;
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