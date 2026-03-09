import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import type { Product, ProductCategory, ProductCategoryGroup } from '../types/product';

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

export const mapProductData = (id: string, data: DocumentData, parentCategoryId: string): Product => {
  return {
    id,
    categoryId: parentCategoryId,
    categoryName: String(data.categoryName ?? parentCategoryId),
    categorySortName: String(data.categorySortName ?? parentCategoryId),
    productSortName: String(data.productSortName ?? id),
    title: String(data.title ?? ''),
    shortDescription: String(data.shortDescription ?? ''),
    description: String(data.description ?? ''),
    imageUrl: String(data.imageUrl ?? ''),
    imagePath: String(data.imagePath ?? ''),
    ingredients: String(data.ingredients ?? ''),
    textureProfile: String(data.textureProfile ?? ''),
    bulkPackaging: String(data.bulkPackaging ?? ''),
    shelfLifeStorage: String(data.shelfLifeStorage ?? ''),
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