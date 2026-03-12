import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MdPlayCircle, MdTimer } from 'react-icons/md';
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col flex-1 bg-slate-50"
    >
      {/* Hero Section */}
      <section className="bg-white py-16 px-4 md:px-10 lg:px-40 border-b border-slate-100">
        <div className="max-w-300 mx-auto flex flex-col gap-6 text-center items-center">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Culinary Inspiration</span>
          <h1 className="text-slate-900 text-4xl md:text-6xl font-black leading-tight tracking-tight font-display">
            Fruitlly Recipe Gallery
          </h1>
          <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            Discover creative ways to incorporate our premium sugar-coated jelly cubes into your menu. Watch our video guides for professional results.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16 px-4 md:px-10 lg:px-40">
        <div className="max-w-300 mx-auto">
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
                Add your first recipe video from the hidden admin panel to publish it on this page.
              </p>
            </div>
          )}

          {!loading && !error && recipes.length > 0 && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe) => (
                  <motion.div
                    key={recipe.id}
                    whileHover={{ y: -5 }}
                    className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl"
                  >
                    <VideoPlayer
                      url={recipe.youtubeUrl}
                      thumbnail={recipe.thumbnail}
                      title={recipe.title}
                    />

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-lg bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                          Video Recipe
                        </span>
                        <div className="flex items-center gap-1 text-slate-400">
                          <MdTimer size={14} />
                          <span className="text-[10px]">{recipe.duration}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold leading-tight text-slate-900 transition-colors hover:text-primary">
                          {recipe.title}
                        </h3>
                        <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
                          {recipe.description}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
                        <span className="text-xs italic text-slate-400">
                          Use the player above to watch the full recipe
                        </span>
                        <span className="text-slate-400 transition-colors hover:text-primary">
                          <MdPlayCircle size={20} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loadingMore ? 'Loading more...' : 'Load More Recipes'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Custom Recipe CTA */}
      <section className="py-20 px-4 md:px-10 lg:px-40 bg-white">
        <div className="max-w-300 mx-auto bg-slate-900 rounded-[40px] p-12 md:p-20 text-center items-center flex flex-col gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-green/20 rounded-full blur-[80px] -ml-32 -mb-32"></div>
          
          <h2 className="text-white text-3xl md:text-5xl font-black font-display relative z-10">Need a Custom Recipe?</h2>
          <p className="text-slate-400 text-lg max-w-150 relative z-10">
            Our culinary team can help you develop exclusive jelly-based products and recipe cards for your private label or retail chain.
          </p>
          <Link
            to="/contact"
            className="relative z-10 rounded-2xl bg-primary px-10 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:bg-red-700"
          >
            Inquire for Custom Development
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Recipes;
