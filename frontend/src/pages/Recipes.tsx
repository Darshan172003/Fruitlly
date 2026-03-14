import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MdPlayCircle, MdTimer } from 'react-icons/md';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import VideoPlayer from '../components/VideoPlayer';
import { db } from '../lib/firebase';
import { mapRecipeDocument } from '../lib/recipes';
import type { Recipe } from '../types/recipe';

const RECIPES_PAGE_SIZE = 6;

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    const loadInitialRecipes = async () => {
      setLoading(true);

      try {
        const recipesQuery = query(
          collection(db, 'recipes'),
          orderBy('sortName', 'asc'),
          limit(RECIPES_PAGE_SIZE + 1),
        );

        const snapshot = await getDocs(recipesQuery);
        const hasExtraDocument = snapshot.docs.length > RECIPES_PAGE_SIZE;
        const visibleDocuments = hasExtraDocument ? snapshot.docs.slice(0, RECIPES_PAGE_SIZE) : snapshot.docs;

        setRecipes(visibleDocuments.map(mapRecipeDocument));
        setHasMore(hasExtraDocument);
        setLastVisible(visibleDocuments.length > 0 ? visibleDocuments[visibleDocuments.length - 1] : null);
        setError('');
      } catch {
        setRecipes([]);
        setHasMore(false);
        setLastVisible(null);
        setError('We could not load the recipe videos right now.');
      } finally {
        setLoading(false);
      }
    };

    void loadInitialRecipes();
  }, []);

  const handleLoadMore = async () => {
    if (!hasMore || !lastVisible || loadingMore) {
      return;
    }

    setLoadingMore(true);

    try {
      const recipesQuery = query(
        collection(db, 'recipes'),
        orderBy('sortName', 'asc'),
        startAfter(lastVisible),
        limit(RECIPES_PAGE_SIZE + 1),
      );

      const snapshot = await getDocs(recipesQuery);
      const hasExtraDocument = snapshot.docs.length > RECIPES_PAGE_SIZE;
      const visibleDocuments = hasExtraDocument ? snapshot.docs.slice(0, RECIPES_PAGE_SIZE) : snapshot.docs;

      setRecipes((current) => [...current, ...visibleDocuments.map(mapRecipeDocument)]);
      setHasMore(hasExtraDocument);
      setLastVisible(visibleDocuments.length > 0 ? visibleDocuments[visibleDocuments.length - 1] : null);
      setError('');
    } catch {
      setError('We could not load more recipe videos right now.');
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-[#f7f7f8]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="max-w-3xl text-center flex flex-col items-center"
          >
            <span className="mb-4 inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-primary sm:text-xs">
              Culinary Inspiration
            </span>
            <h1 className="mb-5 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Fruitlly Recipe Gallery
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg md:text-xl md:leading-8">
              Discover creative dessert ideas using Fruitlly jelly cubes and fruit jelly products. Watch recipe videos and learn how to use premium jelly in cakes, desserts, and refreshing sweet treats.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-sm">
              Loading recipe videos...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-16 text-center text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && recipes.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Recipe videos will appear here</h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Add your first recipe video from the admin panel to publish it on this page.
              </p>
            </div>
          )}

          {!loading && !error && recipes.length > 0 && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 3) * 0.1 }}
                    className="group flex h-full flex-col overflow-hidden rounded-4xl border border-[#f3e8df] bg-white shadow-[0_18px_45px_rgba(34,24,14,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(34,24,14,0.14)]"
                  >
                    <div className="relative overflow-hidden">
                      <VideoPlayer
                        url={recipe.youtubeUrl}
                        thumbnail={recipe.thumbnail}
                        title={recipe.title}
                      />
                      <span className="absolute left-4 top-4 z-10 rounded-2xl bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 shadow-sm">
                        Video Recipe
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                          <MdPlayCircle size={12} />
                          Fruitlly Recipe
                        </span>
                        {recipe.duration && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                            <MdTimer size={13} />
                            {recipe.duration}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-primary transition-colors">
                        {recipe.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 line-clamp-3">
                        {recipe.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="flex justify-center"
                >
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loadingMore ? 'Loading more...' : 'Load More Recipes'}
                    {!loadingMore && <HiOutlineArrowRight size={17} />}
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-2xl sm:rounded-[2.5rem] px-8 py-14 md:px-16 md:py-20 flex flex-col items-center text-center gap-8 relative overflow-hidden bg-linear-to-br from-primary to-accent-green"
        >
          <span className="relative z-10 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/85">
            Work With Us
          </span>
          <h2 className="relative z-10 text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Need a Custom Recipe?
          </h2>
          <p className="relative z-10 text-white/90 text-lg max-w-2xl leading-relaxed">
            Our team can help develop jelly-based desserts, confectionery ideas, and recipe concepts for distributors, food brands, and retail partners.
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="rounded-2xl bg-white px-8 py-4 font-bold text-primary shadow-xl transition-all hover:bg-slate-50"
            >
              Inquire for Custom Development
            </Link>
            <Link
              to="/products"
              className="rounded-2xl bg-white/15 border border-white/30 px-8 py-4 font-bold text-white transition-all hover:bg-white/25"
            >
              Browse Products
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Recipes;
