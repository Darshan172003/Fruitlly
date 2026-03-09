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
  description: string;
  imageUrl: string;
  imagePath: string;
  ingredients: string;
  textureProfile: string;
  bulkPackaging: string;
  shelfLifeStorage: string;
}

export interface ProductCategoryGroup {
  categoryId: string;
  categoryName: string;
  products: Product[];
}