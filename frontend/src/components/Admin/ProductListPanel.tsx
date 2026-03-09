import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { ImSpinner8 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import type { CategoryOption } from './types';

interface ProductListPanelProps {
  products: Product[];
  categories: CategoryOption[];
  productsLoading: boolean;
  libraryError: string;
  deletingProductId: string;
  pageIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  selectedCategoryId: string;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onCategoryChange: (categoryId: string) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const ProductListPanel = ({
  products,
  categories,
  productsLoading,
  libraryError,
  deletingProductId,
  pageIndex,
  hasNextPage,
  hasPreviousPage,
  selectedCategoryId,
  onEditProduct,
  onDeleteProduct,
  onCategoryChange,
  onNextPage,
  onPreviousPage,
}: ProductListPanelProps) => {
  const getDeleteKey = (product: Product) => `${product.categoryId}/${product.id}`;
  const selectedCategory = selectedCategoryId === 'all'
    ? null
    : categories.find((category) => category.id === selectedCategoryId) ?? null;

  return (
    <section className="rounded-[1.75rem] border border-slate-300 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Product Library</h2>
          <p className="mt-2 text-slate-500">These products are shown live on the public products page.</p>
        </div>
        <Link
          to="/products"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          View Public Page
        </Link>
      </div>

      <div className="mb-6 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Category Filter</p>
            <h3 className="mt-1 text-lg font-black text-slate-900">
              {selectedCategory ? selectedCategory.name : 'All Categories'}
            </h3>
          </div>

          <p className="text-sm font-medium text-slate-500">
            Showing {products.length} product{products.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onCategoryChange('all')}
            className={`rounded-full border px-5 py-3 text-sm font-bold transition ${selectedCategoryId === 'all' ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' : 'border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:text-primary'}`}
          >
            All Categories
          </button>

          {categories.map((category) => {
            const isActive = selectedCategoryId === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className={`rounded-full border px-5 py-3 text-sm font-bold transition ${isActive ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' : 'border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:text-primary'}`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {productsLoading && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-10 text-center text-slate-500">
          Loading products...
        </div>
      )}

      {!productsLoading && libraryError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-10 text-center text-red-700">
          {libraryError}
        </div>
      )}

      {!productsLoading && !libraryError && products.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-slate-500">
          No products yet. Create the first one from the Add Product section.
        </div>
      )}

      {!productsLoading && !libraryError && products.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={`${product.categoryId}-${product.id}`} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 shadow-sm">
                    {product.categoryName}
                  </span>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col items-center justify-between gap-4 p-5">
                  <h4 className="text-lg font-bold text-slate-900">{product.title}</h4>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onEditProduct(product)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                    >
                      <HiOutlinePencilSquare size={14} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteProduct(product)}
                      disabled={deletingProductId === getDeleteKey(product)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {deletingProductId === getDeleteKey(product) ? <ImSpinner8 className="animate-spin" size={14} /> : <HiOutlineTrash size={14} />}
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-500">Page {pageIndex + 1}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onPreviousPage}
                disabled={!hasPreviousPage || productsLoading}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <HiOutlineChevronLeft size={16} />
                Previous
              </button>
              <button
                type="button"
                onClick={onNextPage}
                disabled={!hasNextPage || productsLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <HiOutlineChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductListPanel;