import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
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

  return (
    <div className="bg-linear-to-b from-[#fffaf4] via-white to-[#fff4ec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Link to="/products" className="inline-flex text-sm font-semibold text-primary transition hover:text-red-700">
          Back to products
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="overflow-hidden rounded-4xl border border-[#f3e8df] bg-white shadow-[0_18px_45px_rgba(34,24,14,0.08)]">
              <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <span className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-primary font-bold uppercase tracking-[0.25em] text-xs">
              {product.categoryName}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900">{product.title}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{product.shortDescription}</p>

            <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-900">Overview</h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">{product.description}</p>
            </section>

            <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-900">Product Information</h2>
              <div className="mt-4 grid gap-4 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-900">Ingredients:</span> {product.ingredients}</p>
                <p><span className="font-semibold text-slate-900">Texture profile:</span> {product.textureProfile}</p>
                <p><span className="font-semibold text-slate-900">Bulk packaging:</span> {product.bulkPackaging}</p>
                <p><span className="font-semibold text-slate-900">Shelf life and storage:</span> {product.shelfLifeStorage}</p>
              </div>
            </section>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <Mail size={18} />
              Enquire About This Product
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;