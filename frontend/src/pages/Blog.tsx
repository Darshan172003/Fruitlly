import React from 'react';
import { motion } from 'motion/react';
import { 
  MdSearch, 
  MdNotifications, 
  MdArrowForward 
} from 'react-icons/md';

const Blog = () => {
  const posts = [
    {
      id: 1,
      category: 'Market Trend',
      date: 'MAY 12, 2024',
      readTime: '5 MIN READ',
      title: 'The Rise of Sugar Coated Jelly in B2B Confectionery',
      excerpt: 'Exploring how FMCG brands are leveraging jelly-based products to increase shelf-life and consumer engagement in global markets.',
      image: 'https://images.unsplash.com/photo-1582050041567-9cfdd33e3b86?auto=format&fit=crop&q=80&w=800',
      color: 'bg-emerald-500'
    },
    {
      id: 2,
      category: 'Supply Chain',
      date: 'MAY 08, 2024',
      readTime: '8 MIN READ',
      title: 'Optimizing Bulk Jelly Supply for Retail Chains',
      excerpt: 'A comprehensive guide on managing inventory and temperature-controlled logistics for sugar-coated confectionery in tropical climates.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      color: 'bg-primary'
    },
    {
      id: 3,
      category: 'Manufacturing',
      date: 'MAY 01, 2024',
      readTime: '6 MIN READ',
      title: 'Inside Our State-of-the-Art Jelly Production Line',
      excerpt: 'Discover how Tulsi Foods maintains strict quality standards and flavor consistency in every cube of Fruitlly jelly.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      color: 'bg-amber-500'
    },
    {
      id: 4,
      category: 'Innovation',
      date: 'APR 25, 2024',
      readTime: '4 MIN READ',
      title: 'Eco-Friendly Bulk Packaging Solutions for 2024',
      excerpt: 'Reducing plastic waste in bulk supply chains while maintaining product freshness and aroma through innovative barrier films.',
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800',
      color: 'bg-blue-500'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col flex-1"
    >
      {/* Header Section */}
      <div className="px-4 md:px-10 lg:px-40 flex justify-center py-12 md:py-16">
        <div className="flex flex-col max-w-300 flex-1">
          <div className="flex flex-wrap justify-between items-end gap-6">
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-slate-900 text-5xl font-extrabold leading-tight tracking-tight font-display">Industry Insights</h1>
              <p className="text-slate-500 text-lg font-normal leading-normal max-w-2xl">
                Stay updated with the latest trends in the confectionery market, bulk supply logistics, and manufacturing excellence at Fruitlly.
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

      {/* Categories Filter */}
      <div className="px-4 md:px-10 lg:px-40 flex justify-center">
        <div className="flex flex-col max-w-300 flex-1">
          <div className="pb-8">
            <div className="flex border-b border-slate-100 px-0 gap-8 overflow-x-auto no-scrollbar">
              {['All Posts', 'Industry Trends', 'Manufacturing', 'Supply Chain'].map((tab, idx) => (
                <button 
                  key={tab}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-3.25 pt-4 whitespace-nowrap text-sm font-bold tracking-tight transition-all ${idx === 0 ? 'border-b-primary text-primary' : 'border-b-transparent text-slate-400 hover:text-primary'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="px-4 md:px-10 lg:px-40 flex justify-center py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-300 w-full">
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              whileHover={{ y: -5 }}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-4 left-4 ${post.color} text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[10px] text-primary font-bold mb-3">
                  <span>{post.date}</span>
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
                  <span className="text-sm font-bold text-primary flex items-center gap-1 group/btn cursor-pointer">
                    Read Article 
                    <span className="group-hover/btn:translate-x-1 transition-transform">
                      <MdArrowForward size={16} />
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="px-4 md:px-10 lg:px-40 flex justify-center py-16">
        <div className="flex flex-1 flex-col items-start justify-between gap-8 rounded-2xl border border-slate-100 bg-white p-10 md:p-12 md:flex-row md:items-center shadow-lg max-w-300">
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 text-3xl font-bold leading-tight font-display">Get the latest B2B reports</h4>
            <p className="text-slate-500 text-lg font-normal leading-normal max-w-xl">
              Join 500+ distributors receiving our monthly market analysis and product innovation updates.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input 
              className="h-14 px-6 rounded-xl border border-slate-200 bg-slate-50 focus:ring-primary focus:border-primary text-base font-medium min-w-70" 
              placeholder="Your work email" 
              type="email" 
            />
            <button className="flex min-w-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary text-white text-base font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105">
              <span className="truncate">Join Newsletter</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
