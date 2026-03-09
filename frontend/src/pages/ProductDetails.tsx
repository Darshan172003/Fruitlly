import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { FaWhatsapp } from 'react-icons/fa6';
import { db } from '../lib/firebase';
import type { Product } from '../types/product';
import { mapProductData } from '../lib/productCatalog';

const ProductDetails = () => {
  const { categoryId, productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!productId || !categoryId) {
      setError('This product could not be found.');
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'products', categoryId, 'items', productId),
      (snapshot) => {
        if (!snapshot.exists()) {
          setProduct(null);
          setError('This product could not be found.');
          setLoading(false);
          return;
        }

        setProduct(mapProductData(snapshot.id, snapshot.data(), categoryId));
        setError('');
        setLoading(false);
      },
      () => {
        setProduct(null);
        setError('We could not load this product right now.');
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [categoryId, productId]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-sm">
          Loading product details...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-16 text-center text-red-700 shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  const productPath = `/products/${categoryId}/${productId}`;
  const productUrl = typeof window !== 'undefined' ? `${window.location.origin}${productPath}` : productPath;
  const whatsappMessage = [
    'Hello Fruitlly team,',
    '',
    `I am interested in this product: ${product.title}.`,
    `Category: ${product.categoryName}`,
    `Product link: ${productUrl}`,
    '',
    'Please share pricing, MOQ, packaging options, and export details.',
  ].join('\n');
  const whatsappUrl = `https://wa.me/919422283890?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-[#f4f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <Link
          to="/products"
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary"
        >
          Back to products
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.07)]">
              <div className="aspect-4/3 bg-slate-100">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
{/* 
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Category</p>
                <p className="mt-3 text-lg font-bold text-slate-900">{product.categoryName}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Product</p>
                <p className="mt-3 text-lg font-bold text-slate-900">{product.title}</p>
              </div>
            </div> */}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <section className="rounded-4xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">
              <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                {product.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {product.shortDescription}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  <FaWhatsapp size={18} />
                  Enquire On WhatsApp
                </a>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-white"
                >
                  Browse More Products
                </Link>
              </div>
            </section>
          </motion.div>
        </div>

        <div className="mt-8 space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-4xl border border-slate-200 bg-white p-7 shadow-sm md:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-black text-slate-900">Overview</h2>
              <span className="rounded-full bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                Product Summary
              </span>
            </div>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {product.description}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-4xl border border-slate-200 bg-white p-7 shadow-sm md:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-black text-slate-900">Product Information</h2>
              <span className="rounded-full bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                Technical Details
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Ingredients</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{product.ingredients}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Texture Profile</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{product.textureProfile}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Bulk Packaging</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{product.bulkPackaging}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Shelf Life And Storage</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{product.shelfLifeStorage}</p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;