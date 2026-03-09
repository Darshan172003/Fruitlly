import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { ImSpinner8 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { groupProductsByCategory } from '../../lib/productCatalog';

interface ProductListPanelProps {
  products: Product[];
  productsLoading: boolean;
  libraryError: string;
  deletingProductId: string;
  pageIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const ProductListPanel = ({
  products,
  productsLoading,
  libraryError,
  deletingProductId,
  pageIndex,
  hasNextPage,
  hasPreviousPage,
  onEditProduct,
  onDeleteProduct,
  onNextPage,
  onPreviousPage,
}: ProductListPanelProps) => {
  const groupedProducts = groupProductsByCategory(products);
  const getDeleteKey = (product: Product) => `${product.categoryId}/${product.id}`;

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
          {groupedProducts.map((group) => (
            <div key={group.categoryId} className="space-y-4">
              <div className="rounded-2xl bg-slate-100 px-4 py-3">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Category</p>
                <h3 className="mt-1 text-xl font-black text-slate-900">{group.categoryName}</h3>
              </div>

              {group.products.map((product) => (
                <article key={`${product.categoryId}-${product.id}`} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                  <div className="grid gap-0 md:grid-cols-[180px_1fr]">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-full min-h-44 w-full object-cover"
                    />
                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="text-lg font-bold text-slate-900">{product.title}</h4>
                            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
                              {product.id}
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-slate-600 leading-relaxed">{product.shortDescription}</p>
                        </div>

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

                      <div className="mt-4 grid gap-3 text-sm text-slate-500">
                        <p><span className="font-semibold text-slate-700">Ingredients:</span> {product.ingredients}</p>
                        <p><span className="font-semibold text-slate-700">Texture:</span> {product.textureProfile}</p>
                        <p><span className="font-semibold text-slate-700">Packaging:</span> {product.bulkPackaging}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}

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