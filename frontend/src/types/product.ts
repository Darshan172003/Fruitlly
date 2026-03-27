export interface ProductCategory {
  id: string;
  name: string;
  sortName: string;
}

export interface Product {
  id: string;
  categoryId: string;
  categoryName: string;
  categorySortName: string;
  productSortName: string;
  title: string;
  shortDescription: string;
  imageUrls: string[];
  imagePaths: string[];
  moqs: string[];
}

export interface ProductCategoryGroup {
  categoryId: string;
  categoryName: string;
  products: Product[];
}