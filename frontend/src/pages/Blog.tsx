import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { MdArrowForward, MdNotifications } from 'react-icons/md';
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
import { db } from '../lib/firebase';
import { mapBlogDocument } from '../lib/blogs';
import type { BlogPost } from '../types/blog';

const BLOGS_PAGE_SIZE = 6;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  useEffect(() => {
    const loadInitialPosts = async () => {
      setLoading(true);

      try {
        const blogQuery = query(
          collection(db, 'blogs'),
          orderBy('publishedAt', 'desc'),
          limit(BLOGS_PAGE_SIZE + 1),
        );

        const snapshot = await getDocs(blogQuery);
        const hasExtraDocument = snapshot.docs.length > BLOGS_PAGE_SIZE;
        const visibleDocuments = hasExtraDocument ? snapshot.docs.slice(0, BLOGS_PAGE_SIZE) : snapshot.docs;

        setPosts(visibleDocuments.map(mapBlogDocument));
        setHasMore(hasExtraDocument);
        setLastVisible(visibleDocuments.length > 0 ? visibleDocuments[visibleDocuments.length - 1] : null);
        setError('');
      } catch {
        setPosts([]);
        setHasMore(false);
        setLastVisible(null);
        setError('We could not load the blog posts right now.');
      } finally {
        setLoading(false);
      }
    };

    void loadInitialPosts();
  }, []);

  const handleLoadMore = async () => {
    if (!hasMore || !lastVisible || loadingMore) {
      return;
    }

    setLoadingMore(true);

    try {
      const blogQuery = query(
        collection(db, 'blogs'),
        orderBy('publishedAt', 'desc'),
        startAfter(lastVisible),
        limit(BLOGS_PAGE_SIZE + 1),
      );

      const snapshot = await getDocs(blogQuery);
      const hasExtraDocument = snapshot.docs.length > BLOGS_PAGE_SIZE;
      const visibleDocuments = hasExtraDocument ? snapshot.docs.slice(0, BLOGS_PAGE_SIZE) : snapshot.docs;

      setPosts((current) => [...current, ...visibleDocuments.map(mapBlogDocument)]);
      setHasMore(hasExtraDocument);
      setLastVisible(visibleDocuments.length > 0 ? visibleDocuments[visibleDocuments.length - 1] : null);
      setError('');
    } catch {
      setError('We could not load more blog posts right now.');
    } finally {
      setLoadingMore(false);
    }
  };

  const categories = useMemo(() => {
    const nextCategories = new Map<string, string>();

    for (const post of posts) {
      nextCategories.set(post.categoryId, post.category);
    }

    return Array.from(nextCategories.entries()).map(([id, label]) => ({ id, label }));
  }, [posts]);

  const filteredPosts = selectedCategoryId === 'all'
    ? posts
    : posts.filter((post) => post.categoryId === selectedCategoryId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col flex-1"
    >
      <div className="px-4 md:px-10 lg:px-40 flex justify-center py-12 md:py-16">
        <div className="flex flex-col max-w-300 flex-1">
          <div className="flex flex-wrap justify-between items-end gap-6">
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-slate-900 text-5xl font-extrabold leading-tight tracking-tight font-display">Fruit Jelly Industry Insights</h1>
              <p className="text-slate-500 text-lg font-normal leading-normal max-w-2xl">
                Stay updated on jelly manufacturing trends, bulk supply insights, and fruit jelly innovations from Fruitlly by Tulsi Foods.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 min-w-21 cursor-pointer justify-center overflow-hidden rounded-xl h-12 px-6 bg-white text-slate-900 border border-slate-200 text-sm font-bold hover:bg-gray-50 transition-colors">
                <MdNotifications size={20} />
                <span className="truncate">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {!loading && !error && categories.length > 0 && (
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="flex flex-col max-w-300 flex-1">
            <div className="pb-8">
              <div className="flex border-b border-slate-100 px-0 gap-8 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId('all')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pt-4 whitespace-nowrap text-sm font-bold tracking-tight transition-all ${selectedCategoryId === 'all' ? 'border-b-primary text-primary' : 'border-b-transparent text-slate-400 hover:text-primary'}`}
                >
                  All Posts
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`flex flex-col items-center justify-center border-b-[3px] pt-4 whitespace-nowrap text-sm font-bold tracking-tight transition-all ${selectedCategoryId === category.id ? 'border-b-primary text-primary' : 'border-b-transparent text-slate-400 hover:text-primary'}`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 md:px-10 lg:px-40 flex justify-center py-5">
        <div className="max-w-300 w-full">
          {loading && (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-sm">
              Loading blog posts...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-16 text-center text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Blog posts will appear here</h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Publish your first article from the hidden admin panel to show it on this page.
              </p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="space-y-10">
              {filteredPosts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900">No loaded posts in this category yet</h2>
                  <p className="mt-3 text-slate-600">Load more posts or switch to another category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-300 w-full">
                  {filteredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      whileHover={{ y: -5 }}
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
                    >
                      <div className="relative w-full aspect-video overflow-hidden">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className={`absolute top-4 left-4 ${post.categoryColor} text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                          {post.category}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-[10px] text-primary font-bold mb-3">
                          <span>{post.publishedLabel}</span>
                          <span className="size-1 bg-slate-300 rounded-full"></span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-slate-900 text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors font-display">
                          {post.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <Link
                            to={`/blog/${post.id}`}
                            className="text-sm font-bold text-primary flex items-center gap-1 group/btn cursor-pointer"
                          >
                            Read Article
                            <span className="group-hover/btn:translate-x-1 transition-transform">
                              <MdArrowForward size={16} />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {hasMore && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loadingMore ? 'Loading more...' : 'Load More Posts'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 md:px-10 lg:px-40 flex justify-center py-16">
        <div className="flex flex-1 flex-col items-start justify-between gap-8 rounded-2xl border border-slate-100 bg-white p-10 md:p-12 md:flex-row md:items-center shadow-lg max-w-300">
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 text-3xl font-bold leading-tight font-display">Get the Latest B2B Jelly Industry Reports</h4>
            <p className="text-slate-500 text-lg font-normal leading-normal max-w-xl">
              Join distributors receiving updates on fruit jelly trends, manufacturing insights, and new product launches.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
              className="h-14 px-6 rounded-xl border border-slate-200 bg-slate-50 focus:ring-primary focus:border-primary text-base font-medium min-w-70"
              placeholder="Your work email"
              type="email"
            />
            <Link
              to="/contact"
              className="flex min-w-40 items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary text-white text-base font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105"
            >
              <span className="truncate">Join Newsletter</span>
            </Link>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default Blog;
