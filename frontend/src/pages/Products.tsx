import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collectionGroup, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { groupProductsByCategory, mapProductDocument } from '../lib/productCatalog';
import type { Product, ProductCategoryGroup } from '../types/product';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<ProductCategoryGroup[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const productsQuery = query(collectionGroup(db, 'items'), orderBy('categorySortName', 'asc'), orderBy('productSortName', 'asc'));

    const unsubscribe = onSnapshot(
      productsQuery,
      (snapshot) => {
        const nextProducts = snapshot.docs.map(mapProductDocument);
        const nextGroupedProducts = groupProductsByCategory(nextProducts);

        setProducts(nextProducts);
        setGroupedProducts(nextGroupedProducts);
        setSelectedCategoryId((current) => {
          if (current === 'all') {
            return current;
          }

          if (current && nextGroupedProducts.some((group) => group.categoryId === current)) {
            return current;
          }

          return 'all';
        });
        setLoading(false);
        setError('');
      },
      () => {
        setLoading(false);
        setError('We could not load the product catalog right now.');
      },
    );

    return () => unsubscribe();
  }, []);

  const selectedCategory = selectedCategoryId === 'all'
    ? null
    : groupedProducts.find((group) => group.categoryId === selectedCategoryId) ?? null;

  const visibleProducts = selectedCategory
    ? selectedCategory.products
    : products;

  return (
    <div className="bg-linear-to-b from-[#fffaf4] via-white to-[#fff4ec]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,#ffd7c5_0%,rgba(255,255,255,0)_68%)]" />
        <div className="pointer-events-none absolute right-0 top-12 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-accent-green/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-primary font-bold uppercase tracking-[0.25em] text-xs mb-5">
                Fruitlly Catalog
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                Premium jelly products crafted for wholesale and retail shelves.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
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
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
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

          {!loading && !error && groupedProducts.length > 0 && (
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-8">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryId('all')}
                    className={`rounded-full border px-6 py-3 text-sm font-bold transition ${selectedCategoryId === 'all' ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' : 'border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:text-primary'}`}
                  >
                    All Products
                  </button>

                  {groupedProducts.map((group) => {
                    const isActive = group.categoryId === selectedCategoryId;

                    return (
                      <button
                        key={group.categoryId}
                        type="button"
                        onClick={() => setSelectedCategoryId(group.categoryId)}
                        className={`rounded-full border px-6 py-3 text-sm font-bold transition ${isActive ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' : 'border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:text-primary'}`}
                      >
                        {group.categoryName}
                      </button>
                    );
                  })}
                </div>
              </div>

              <section className="space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
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
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
                  {visibleProducts.map((product, index) => (
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
                          <span className="absolute left-5 top-5 z-10 rounded-2xl bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-900 shadow-sm">
                            {product.categoryName}
                          </span>
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                        <div className="flex flex-1 flex-col p-6 md:p-7">
                          <h3 className="text-2xl font-bold text-slate-900 leading-tight">{product.title}</h3>
                          <p className="mt-3 flex-1 text-base text-slate-700 leading-relaxed">{product.shortDescription}</p>
                          <div className="mt-6 border-t border-slate-100 pt-5">
                            <span className="inline-flex items-center text-base font-bold text-primary transition group-hover:translate-x-1">
                              View Details
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center justify-between gap-12 rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-16 lg:flex-row">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="mb-6 text-3xl font-black text-slate-900">Request a Wholesale Catalog</h2>
            <p className="text-lg leading-relaxed text-slate-700">
              Interested in exploring our full range of confectionery products? Get in touch for our
              latest product catalog, certifications, and volume-based pricing structures for global
              distribution.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-primary/90"
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
