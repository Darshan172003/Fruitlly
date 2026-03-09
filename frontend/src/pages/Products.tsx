import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  collection,
  collectionGroup,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { mapCategoryDocument, mapProductDocument } from '../lib/productCatalog';
import type { Product, ProductCategory } from '../types/product';

const getShortDescriptionPreview = (value: string, maxWords = 20) => {
  const words = value.trim().split(/\s+/).filter(Boolean);

  if (words.length <= maxWords) {
    return value.trim();
  }

  return `${words.slice(0, maxWords).join(' ')}...`;
};

const PRODUCTS_PAGE_SIZE = 8;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageCursors, setPageCursors] = useState<Array<QueryDocumentSnapshot<DocumentData> | null>>([null]);
  const [currentLastVisible, setCurrentLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    const categoriesQuery = query(collection(db, 'products'), orderBy('sortName', 'asc'));

    const unsubscribe = onSnapshot(
      categoriesQuery,
      (snapshot) => {
        const nextCategories = snapshot.docs.map(mapCategoryDocument);
        setCategories(nextCategories);
        setSelectedCategoryId((current) => {
          if (current === 'all') {
            return current;
          }

          if (current && nextCategories.some((category) => category.id === current)) {
            return current;
          }

          return 'all';
        });
      },
      () => {
        setError('We could not load the product catalog right now.');
      },
    );

    return () => unsubscribe();
  }, []);

  const loadProductPage = async (
    cursor: QueryDocumentSnapshot<DocumentData> | null,
    nextPageIndex: number,
    categoryId: string,
  ) => {
    setLoading(true);

    try {
      const productsQuery = categoryId === 'all'
        ? cursor
          ? query(
              collectionGroup(db, 'items'),
              orderBy('categorySortName', 'asc'),
              orderBy('productSortName', 'asc'),
              startAfter(cursor),
              limit(PRODUCTS_PAGE_SIZE + 1),
            )
          : query(
              collectionGroup(db, 'items'),
              orderBy('categorySortName', 'asc'),
              orderBy('productSortName', 'asc'),
              limit(PRODUCTS_PAGE_SIZE + 1),
            )
        : cursor
          ? query(
              collection(db, 'products', categoryId, 'items'),
              orderBy('productSortName', 'asc'),
              startAfter(cursor),
              limit(PRODUCTS_PAGE_SIZE + 1),
            )
          : query(
              collection(db, 'products', categoryId, 'items'),
              orderBy('productSortName', 'asc'),
              limit(PRODUCTS_PAGE_SIZE + 1),
            );

      const snapshot = await getDocs(productsQuery);
      const hasExtraDocument = snapshot.docs.length > PRODUCTS_PAGE_SIZE;
      const visibleDocuments = hasExtraDocument ? snapshot.docs.slice(0, PRODUCTS_PAGE_SIZE) : snapshot.docs;

      setProducts(visibleDocuments.map(mapProductDocument));
      setHasNextPage(hasExtraDocument);
      setCurrentLastVisible(visibleDocuments.length > 0 ? visibleDocuments[visibleDocuments.length - 1] : null);
      setPageIndex(nextPageIndex);
      setError('');

      return { visibleCount: visibleDocuments.length };
    } catch {
      setProducts([]);
      setHasNextPage(false);
      setCurrentLastVisible(null);
      setError('We could not load the product catalog right now.');
      return { visibleCount: 0 };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageIndex(0);
    setHasNextPage(false);
    setPageCursors([null]);
    setCurrentLastVisible(null);
    void loadProductPage(null, 0, selectedCategoryId);
  }, [selectedCategoryId]);

  const selectedCategory = selectedCategoryId === 'all'
    ? null
    : categories.find((category) => category.id === selectedCategoryId) ?? null;

  const handleNextPage = async () => {
    if (!hasNextPage || !currentLastVisible) {
      return;
    }

    setPageCursors((current) => {
      const next = [...current];
      next[pageIndex + 1] = currentLastVisible;
      return next;
    });

    await loadProductPage(currentLastVisible, pageIndex + 1, selectedCategoryId);
  };

  const handlePreviousPage = async () => {
    if (pageIndex === 0) {
      return;
    }

    const previousPageIndex = pageIndex - 1;
    const previousCursor = previousPageIndex === 0 ? null : pageCursors[previousPageIndex] ?? null;
    await loadProductPage(previousCursor, previousPageIndex, selectedCategoryId);
  };

  return (
    <div className="bg-[#f7f7f8]">
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24">
          <div className="mb-10 flex flex-col gap-8 md:mb-12 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="mb-4 inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-primary sm:text-xs">
                Fruitlly Catalog
              </span>
              <h1 className="mb-5 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
                Premium jelly products crafted for wholesale and retail shelves.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg md:text-xl md:leading-8">
                Browse the live Fruitlly range with product names, images, and short descriptions. The hero section stays fixed while products update from the admin panel.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 sm:px-8 sm:py-4 sm:text-lg"
              >
                Inquire for Bulk Supply
              </Link>
            </motion.div>
          </div>

          {loading && (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-sm">
              Loading products...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-16 text-center text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Products will appear here</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Add your first product from the hidden admin route to publish the catalog on this page.
              </p>
            </div>
          )}

          {!loading && !error && categories.length > 0 && (
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-8">
                <div className="md:hidden">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                      Category Filter
                    </span>
                    <select
                      value={selectedCategoryId}
                      onChange={(event) => setSelectedCategoryId(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-primary"
                    >
                      <option value="all">All Products</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="hidden flex-wrap gap-3 md:flex">
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryId('all')}
                    className={`rounded-full border px-6 py-3 text-sm font-bold transition ${selectedCategoryId === 'all' ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' : 'border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:text-primary'}`}
                  >
                    All Products
                  </button>

                  {categories.map((category) => {
                    const isActive = category.id === selectedCategoryId;

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedCategoryId(category.id)}
                        className={`rounded-full border px-6 py-3 text-sm font-bold transition ${isActive ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' : 'border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:text-primary'}`}
                      >
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <section className="space-y-6">
                {/* <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="inline-flex rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                      {selectedCategory ? selectedCategory.categoryName : 'All Categories'}
                    </span>
                    <h2 className="mt-4 text-3xl font-black text-slate-900">
                      {selectedCategory ? `${selectedCategory.categoryName} Products` : 'All Products'}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm">
                    Showing {visibleProducts.length} product{visibleProducts.length === 1 ? '' : 's'}
                  </div>
                </div> */}

                {products.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900">
                      {selectedCategory ? `No products found in ${selectedCategory.name}` : 'No products available'}
                    </h2>
                    <p className="mt-3 text-slate-600">
                      {selectedCategory ? 'Try another category or check back later.' : 'Add products from the admin panel to publish them here.'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 min-[840px]:grid-cols-3 sm:gap-6 xl:grid-cols-4 xl:gap-6">
                      {products.map((product, index) => (
                    <motion.div
                      key={`${product.categoryId}-${product.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="h-full"
                    >
                      <Link
                        to={`/products/${product.categoryId}/${product.id}`}
                        className="group flex h-full flex-col overflow-hidden rounded-4xl border border-[#f3e8df] bg-white shadow-[0_18px_45px_rgba(34,24,14,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(34,24,14,0.14)]"
                      >
                        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                          <span className="absolute left-4 top-4 z-10 rounded-2xl bg-white/90 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 shadow-sm sm:left-5 sm:top-5 sm:px-4 sm:text-xs">
                            {product.categoryName}
                          </span>
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
                          <h3 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">{product.title}</h3>
                          <p className="mt-3 flex-1 text-sm leading-6 text-slate-700 sm:text-[15px]">
                            {getShortDescriptionPreview(product.shortDescription)}
                          </p>
                          <div className="mt-5 flex items-center justify-center border-t border-slate-100 pt-5 sm:mt-6">
                            <span className="inline-flex min-w-37 items-center justify-center gap-2 rounded-xl border border-primary bg-white px-5 py-3 text-sm font-bold text-primary transition group-hover:bg-primary group-hover:text-white sm:min-w-40">
                              View Details
                              <ChevronRight size={16} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-medium text-slate-500">Page {pageIndex + 1}</p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handlePreviousPage}
                          disabled={pageIndex === 0 || loading}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <ChevronLeft size={16} />
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={handleNextPage}
                          disabled={!hasNextPage || loading}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Next
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </section>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center justify-between gap-10 rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-12 lg:flex-row lg:gap-12 lg:p-16">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="mb-5 text-2xl font-black text-slate-900 sm:text-3xl">Request a Wholesale Catalog</h2>
            <p className="text-base leading-7 text-slate-700 sm:text-lg sm:leading-relaxed">
              Interested in exploring our full range of confectionery products? Get in touch for our
              latest product catalog, certifications, and volume-based pricing structures for global
              distribution.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-white transition-all hover:bg-primary/90 sm:px-8 sm:text-base"
            >
              <Mail size={20} />
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
