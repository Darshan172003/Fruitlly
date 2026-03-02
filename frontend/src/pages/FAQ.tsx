import React from 'react';
import { motion } from 'motion/react';
import { 
  MdSearch, 
  MdInventory2, 
  MdShoppingCart, 
  MdLocalShipping, 
  MdVerified, 
  MdExpandMore, 
  MdEmail, 
  MdPhone 
} from 'react-icons/md';

const FAQ = () => {
  const categories = [
    { id: 'product-quality', name: 'Product & Quality', icon: <MdInventory2 /> },
    { id: 'bulk-orders', name: 'Bulk Orders', icon: <MdShoppingCart /> },
    { id: 'shipping', name: 'Shipping & Logistics', icon: <MdLocalShipping /> },
    { id: 'compliance', name: 'Compliance', icon: <MdVerified /> },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* Hero / Search Section */}
      <header className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            How can we help your business?
          </motion.h1>
          <p className="text-lg text-slate-600 mb-10">Find answers to common questions about our wholesale sugar-coated jelly cubes and B2B services.</p>
          <div className="relative max-w-2xl mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <MdSearch size={24} />
            </span>
            <input
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-primary/10 focus:border-primary focus:ring-0 bg-white transition-all shadow-sm"
              placeholder="Search for questions (e.g., MOQ, shelf life, shipping)..." type="text" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 space-y-2">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 mb-4 px-2">Categories</h3>
              {categories.map((cat, idx) => (
                <a 
                  key={cat.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${idx === 0 ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-600 hover:bg-primary/5'}`}
                  href={`#${cat.id}`}
                >
                  <span className="text-sm">{cat.icon}</span> {cat.name}
                </a>
              ))}
            </div>
          </aside>

          {/* FAQ Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Category: Product & Quality */}
            <section id="product-quality">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MdInventory2 size={24} />
                </div>
                <h2 className="text-2xl font-bold">Product & Quality</h2>
              </div>
              <div className="space-y-4">
                <details className="group bg-white rounded-xl border border-primary/5 shadow-sm overflow-hidden" open>
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <span className="font-semibold text-lg pr-4">What is the shelf life of Fruitlly sugar-coated jelly cubes?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">
                      <MdExpandMore size={24} />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    Our jelly cubes have a guaranteed shelf life of 12 months from the date of manufacture when stored in cool, dry conditions away from direct sunlight. Each batch is stamped with a clear expiry date for your inventory management.
                  </div>
                </details>
                <details className="group bg-white rounded-xl border border-primary/5 shadow-sm overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <span className="font-semibold text-lg pr-4">Are the colors and flavors natural?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">
                      <MdExpandMore size={24} />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    At Tulsi Foods, we prioritize quality. We use FSSAI-approved food-grade ingredients. We offer both standard and premium ranges, including options with fruit pulp and natural extracts for specific B2B requirements.
                  </div>
                </details>
                <details className="group bg-white rounded-xl border border-primary/5 shadow-sm overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <span className="font-semibold text-lg pr-4">Do the jelly cubes clump together in humidity?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">
                      <MdExpandMore size={24} />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    Our unique double-coating process ensures individual jelly cubes remain separated even in moderate humidity. However, for bulk storage, we recommend temperature-controlled environments to maintain the sugar-crust integrity.
                  </div>
                </details>
              </div>
            </section>

            {/* Category: Bulk Orders & Supply */}
            <section id="bulk-orders">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MdShoppingCart size={24} />
                </div>
                <h2 className="text-2xl font-bold">Bulk Orders & Supply</h2>
              </div>
              <div className="space-y-4">
                <details className="group bg-white rounded-xl border border-primary/5 shadow-sm overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <span className="font-semibold text-lg pr-4">What is the Minimum Order Quantity (MOQ)?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">
                      <MdExpandMore size={24} />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    For standard Fruitlly packaging, the MOQ starts at 50 cartons. For custom white-labeling or bulk loose packaging (20kg bags), the MOQ is 500kg per flavor variant.
                  </div>
                </details>
                <details className="group bg-white rounded-xl border border-primary/5 shadow-sm overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <span className="font-semibold text-lg pr-4">Can we request custom flavors or shapes?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">
                      <MdExpandMore size={24} />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    Yes, Tulsi Foods offers R&D support for large-scale B2B clients. We can develop custom flavor profiles and shapes for orders exceeding 2 metric tons. Contact our sales team for feasibility.
                  </div>
                </details>
              </div>
            </section>

            {/* Category: Shipping & Logistics */}
            <section id="shipping">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MdLocalShipping size={24} />
                </div>
                <h2 className="text-2xl font-bold">Shipping & Logistics</h2>
              </div>
              <div className="space-y-4">
                <details className="group bg-white rounded-xl border border-primary/5 shadow-sm overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <span className="font-semibold text-lg pr-4">What are the standard packaging sizes available?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">
                      <MdExpandMore size={24} />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    We offer 150g retail pouches, 500g family packs, and 5kg bulk jars. For industrial clients, we provide 20kg moisture-resistant corrugated boxes.
                  </div>
                </details>
                <details className="group bg-white rounded-xl border border-primary/5 shadow-sm overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <span className="font-semibold text-lg pr-4">Do you ship internationally?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">
                      <MdExpandMore size={24} />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    Yes, we have a dedicated export division that handles logistics for international shipping. We are familiar with global food safety standards and labeling requirements for the Middle East, SE Asia, and Africa.
                  </div>
                </details>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Support Section */}
      <section className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">Can't find the answer you're looking for? Our B2B support team is ready to help you with personalized assistance.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                href="mailto:support@fruitlly.com">
                <MdEmail size={20} /> Email Support
            </a>
            <a className="flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold border border-primary/20 hover:border-primary transition-all"
                href="tel:+1234567890">
                <MdPhone size={20} /> Call Sales Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
