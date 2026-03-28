import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MdArrowBack } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getBlogPostSeo } from '../lib/seo';
import SeoHead from '../components/SeoHead';
import { mapBlogData } from '../lib/blogs';
import type { BlogPost } from '../types/blog';

const BlogDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const articleContentClassName =
    'max-w-none text-[17px] leading-8 text-slate-700 [&_p]:my-5 [&_p]:text-[17px] [&_p]:leading-8 [&_p]:text-slate-700 [&_a]:font-semibold [&_a]:text-blue-600 [&_a]:underline-offset-4 hover:[&_a]:text-blue-700 [&_strong]:font-black [&_strong]:text-slate-900 [&_h1]:mt-12 [&_h1]:mb-5 [&_h1]:text-5xl [&_h1]:font-black [&_h1]:leading-tight [&_h1]:tracking-tight [&_h1]:text-slate-950 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-4xl [&_h2]:font-black [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2]:text-slate-900 [&_h3]:mt-9 [&_h3]:mb-4 [&_h3]:text-3xl [&_h3]:font-black [&_h3]:leading-snug [&_h3]:text-slate-900 [&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:text-2xl [&_h4]:font-extrabold [&_h4]:leading-snug [&_h4]:text-slate-900 [&_h5]:mt-7 [&_h5]:mb-3 [&_h5]:text-xl [&_h5]:font-bold [&_h5]:uppercase [&_h5]:tracking-[0.08em] [&_h5]:text-slate-800 [&_h6]:mt-6 [&_h6]:mb-2 [&_h6]:text-sm [&_h6]:font-bold [&_h6]:uppercase [&_h6]:tracking-[0.18em] [&_h6]:text-slate-500 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5 [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-amber-300 [&_blockquote]:bg-amber-50 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:text-slate-800 [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-3xl [&_pre]:bg-slate-950 [&_pre]:p-5 [&_pre]:text-sm [&_pre]:leading-7 [&_pre]:text-slate-100 [&_code]:rounded-md [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.92em] [&_hr]:my-10 [&_hr]:border-slate-200';

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) {
        setError('Blog post not found.');
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const snapshot = await getDoc(doc(db, 'blogs', postId));

        if (!snapshot.exists()) {
          setPost(null);
          setError('Blog post not found.');
          return;
        }

        setPost(mapBlogData(snapshot.id, snapshot.data()));
        setError('');
      } catch {
        setPost(null);
        setError('We could not load this blog post right now.');
      } finally {
        setLoading(false);
      }
    };

    void loadPost();
  }, [postId]);

  const seo = post ? getBlogPostSeo(post) : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 flex-col bg-slate-50"
    >
      {seo && (
        <SeoHead
          title={seo.title}
          description={seo.description}
          canonical={seo.canonical}
          ogType={seo.ogType}
          ogImage={post?.imageUrl}
          schema={seo.schema}
        />
      )
      }
      <div className="px-4 py-10 md:px-10 lg:px-40">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <MdArrowBack size={18} />
            Back to blog
          </Link>
        </div>
      </div>

      <div className="px-4 pb-16 md:px-10 lg:px-40">
        <div className="mx-auto max-w-5xl">
          {loading && (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-sm">
              Loading article...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-16 text-center text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && post && (
            <article className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
              <div className="mb-6 overflow-hidden rounded-3xl">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-65 w-full object-cover md:h-90"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                <span className={`rounded-full px-3 py-1 text-white ${post.categoryColor}`}>{post.category}</span>
                <span>{post.publishedLabel}</span>
                <span>{post.readTime}</span>
              </div>

              <h1 className="mb-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">{post.title}</h1>
              <p className="mb-8 text-lg leading-8 text-slate-600">{post.excerpt}</p>

              <div className="border-t border-slate-100 pt-8 md:px-4">
                <div
                  className={articleContentClassName}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetails;