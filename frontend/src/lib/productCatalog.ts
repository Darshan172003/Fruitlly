import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import type { Product, ProductCategory, ProductCategoryGroup } from '../types/product';

const mapMoqValues = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item ?? '').trim())
      .filter(Boolean);
  }

  if (typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }

  return [];
};

export const slugifyValue = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
};

export const mapCategoryDocument = (document: QueryDocumentSnapshot<DocumentData>): ProductCategory => ({
  id: document.id,
  name: String(document.data().name ?? document.id),
  sortName: String(document.data().sortName ?? document.id),
});

const mapImageUrls = (data: DocumentData): string[] => {
  if (Array.isArray(data.imageUrls) && data.imageUrls.length > 0) {
    return data.imageUrls.map((v: unknown) => String(v ?? '')).filter(Boolean);
  }
  // Backward-compat: old single imageUrl field
  const legacy = String(data.imageUrl ?? '');
  return legacy ? [legacy] : [];
};

const mapImagePaths = (data: DocumentData): string[] => {
  if (Array.isArray(data.imagePaths) && data.imagePaths.length > 0) {
    return data.imagePaths.map((v: unknown) => String(v ?? '')).filter(Boolean);
  }
  // Backward-compat: old single imagePath field
  const legacy = String(data.imagePath ?? '');
  return legacy ? [legacy] : [];
};

export const mapProductData = (id: string, data: DocumentData, parentCategoryId: string): Product => {
  return {
    id,
    categoryId: parentCategoryId,
    categoryName: String(data.categoryName ?? parentCategoryId),
    categorySortName: String(data.categorySortName ?? parentCategoryId),
    productSortName: String(data.productSortName ?? id),
    title: String(data.title ?? ''),
    shortDescription: String(data.shortDescription ?? ''),
    imageUrls: mapImageUrls(data),
    imagePaths: mapImagePaths(data),
    moqs: mapMoqValues(data.moqs),
  };
};

export const mapProductDocument = (document: QueryDocumentSnapshot<DocumentData>): Product => {
  const parentCategoryId = document.ref.parent.parent?.id ?? String(document.data().categoryId ?? 'uncategorized');
  return mapProductData(document.id, document.data(), parentCategoryId);
};

export const groupProductsByCategory = (products: Product[]): ProductCategoryGroup[] => {
  const groups = new Map<string, ProductCategoryGroup>();

  for (const product of products) {
    if (!groups.has(product.categoryId)) {
      groups.set(product.categoryId, {
        categoryId: product.categoryId,
        categoryName: product.categoryName,
        products: [],
      });
    }

    groups.get(product.categoryId)?.products.push(product);
  }

  return Array.from(groups.values());
};