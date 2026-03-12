import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { ImSpinner8 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types/blog';

interface BlogListPanelProps {
  blogs: BlogPost[];
  blogsLoading: boolean;
  blogsError: string;
  deletingBlogId: string;
  pageIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onEditBlog: (blog: BlogPost) => void;
  onDeleteBlog: (blog: BlogPost) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const BlogListPanel = ({
  blogs,
  blogsLoading,
  blogsError,
  deletingBlogId,
  pageIndex,
  hasNextPage,
  hasPreviousPage,
  onEditBlog,
  onDeleteBlog,
  onNextPage,
  onPreviousPage,
}: BlogListPanelProps) => {
  return (
    <section className="rounded-[1.75rem] border border-slate-300 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Blog Library</h2>
          <p className="mt-2 text-slate-500">These blog posts are shown live on the public blog page.</p>
        </div>
        <Link
          to="/blog"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          View Public Page
        </Link>
      </div>

      {blogsLoading && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-10 text-center text-slate-500">
          Loading blog posts...
        </div>
      )}

      {!blogsLoading && blogsError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-10 text-center text-red-700">
          {blogsError}
        </div>
      )}

      {!blogsLoading && !blogsError && blogs.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-slate-500">
          No blog posts yet. Create the first one from the blog editor section.
        </div>
      )}

      {!blogsLoading && !blogsError && blogs.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <article key={blog.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white ${blog.categoryColor}`}>
                    {blog.category}
                  </span>
                </div>

                <div className="flex flex-col gap-4 p-5">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-primary">
                    <span>{blog.publishedLabel}</span>
                    <span className="size-1 rounded-full bg-slate-300"></span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900">{blog.title}</h4>
                  <p className="line-clamp-3 text-sm leading-6 text-slate-600">{blog.excerpt}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => onEditBlog(blog)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                    >
                      <HiOutlinePencilSquare size={14} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteBlog(blog)}
                      disabled={deletingBlogId === blog.id}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {deletingBlogId === blog.id ? <span className="inline-flex animate-spin"><ImSpinner8 size={14} /></span> : <HiOutlineTrash size={14} />}
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-500">Page {pageIndex + 1}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onPreviousPage}
                disabled={!hasPreviousPage || blogsLoading}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <HiOutlineChevronLeft size={16} />
                Previous
              </button>
              <button
                type="button"
                onClick={onNextPage}
                disabled={!hasNextPage || blogsLoading}
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

export default BlogListPanel;