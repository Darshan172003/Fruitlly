import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { FaWhatsapp } from 'react-icons/fa6';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2';
import { db } from '../lib/firebase';
import { getProductSeo } from '../lib/seo';
import SeoHead from '../components/SeoHead';
import type { Product } from '../types/product';
import { mapProductData } from '../lib/productCatalog';

const ProductDetails = () => {
  const { categoryId, productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMoq, setSelectedMoq] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  useEffect(() => {
    setSelectedMoq(product?.moqs[0] ?? '');
    setActiveImageIndex(0);
  }, [product]);

  // Dynamic SEO
  const seo = product ? getProductSeo(product) : null;

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
    ...(selectedMoq ? [`Preferred MOQ: ${selectedMoq}`] : []),
    `Product link: ${productUrl}`,
    '',
    'Please share pricing and export details.',
  ].join('\n');
  const whatsappUrl = `https://wa.me/919422283890?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-[#f4f5f7]">
      {seo && (
        <SeoHead
          title={seo.title}
          description={seo.description}
          canonical={seo.canonical}
          ogType={seo.ogType}
          ogImage={product.imageUrls[0]}
          schema={seo.schema}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary"
        >
          <HiOutlineArrowLeft size={18} />
          Back to products
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {/* Main image */}
            <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.07)]">
              <img
                key={activeImageIndex}
                src={product.imageUrls[activeImageIndex] ?? product.imageUrls[0] ?? ''}
                alt={product.title}
                className="w-full h-auto object-contain transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnail strip */}
            {product.imageUrls.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.imageUrls.map((url, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 ${activeImageIndex === index
                        ? 'border-primary shadow-md'
                        : 'border-slate-200 opacity-70 hover:border-slate-400 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={url}
                      alt={`${product.title} view ${index + 1}`}
                      className="h-16 w-20 object-cover sm:h-20 sm:w-24"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <section className="rounded-4xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-primary">
                  {product.categoryName}
                </span>
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
                  {product.moqs.length} MOQ Option{product.moqs.length === 1 ? '' : 's'}
                </span>
              </div>

              <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                {product.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {product.shortDescription}
              </p>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                    Select MOQ
                  </span>
                  <select
                    value={selectedMoq}
                    onChange={(event) => setSelectedMoq(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-primary"
                    disabled={product.moqs.length === 0}
                  >
                    {product.moqs.length === 0 ? (
                      <option value="">MOQ available on request</option>
                    ) : (
                      product.moqs.map((moq) => (
                        <option key={moq} value={moq}>
                          {moq}
                        </option>
                      ))
                    )}
                  </select>
                </label>

                <p className="mt-3 text-sm text-slate-500">
                  {selectedMoq ? `Selected MOQ: ${selectedMoq}` : 'Contact the team for MOQ details.'}
                </p>
              </div>

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
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-white"
                >
                  <HiOutlineArrowRight size={18} />
                  Browse More Products
                </Link>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;