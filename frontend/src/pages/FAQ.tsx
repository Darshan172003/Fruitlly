import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  MdInventory2,
  MdShoppingCart,
  MdLocalShipping,
  MdVerified,
  MdExpandMore,
  MdEmail,
  MdPhone,
} from 'react-icons/md';
import type { IconType } from 'react-icons';

type FAQEntry = {
  question: string;
  answer: string;
  open?: boolean;
};

type FAQCategory = {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  items: FAQEntry[];
};

const categories: FAQCategory[] = [
  {
    id: 'product-quality',
    name: 'Product & Quality',
    description: 'Shelf life, ingredients, and consistency details.',
    icon: MdInventory2,
    items: [
      {
        question: 'What is the shelf life of Fruitlly sugar-coated jelly cubes?',
        answer:
          'Our jelly cubes have a guaranteed shelf life of 12 months from the date of manufacture when stored in cool, dry conditions away from direct sunlight. Each batch is stamped with a clear expiry date for your inventory management.',
        open: true,
      },
      {
        question: 'Are the colors and flavors natural?',
        answer:
          'At Tulsi Foods, we prioritize quality. We use FSSAI-approved food-grade ingredients. We offer both standard and premium ranges, including options with fruit pulp and natural extracts for specific B2B requirements.',
      },
      {
        question: 'Do the jelly cubes clump together in humidity?',
        answer:
          'Our unique double-coating process ensures individual jelly cubes remain separated even in moderate humidity. However, for bulk storage, we recommend temperature-controlled environments to maintain the sugar-crust integrity.',
      },
    ],
  },
  {
    id: 'bulk-orders',
    name: 'Bulk Orders',
    description: 'MOQ, custom flavors, and private-label requests.',
    icon: MdShoppingCart,
    items: [
      {
        question: 'What is the Minimum Order Quantity (MOQ)?',
        answer:
          'For standard Fruitlly packaging, the MOQ starts at 50 cartons. For custom white-labeling or bulk loose packaging (20kg bags), the MOQ is 500kg per flavor variant.',
      },
      {
        question: 'Can we request custom flavors or shapes?',
        answer:
          'Yes, Tulsi Foods offers R&D support for large-scale B2B clients. We can develop custom flavor profiles and shapes for orders exceeding 2 metric tons. Contact our sales team for feasibility.',
      },
    ],
  },
  {
    id: 'shipping',
    name: 'Shipping & Logistics',
    description: 'Packaging sizes, shipping regions, and handling.',
    icon: MdLocalShipping,
    items: [
      {
        question: 'What are the standard packaging sizes available?',
        answer:
          'We offer 150g retail pouches, 500g family packs, and 5kg bulk jars. For industrial clients, we provide 20kg moisture-resistant corrugated boxes.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes, we have a dedicated export division that handles logistics for international shipping. We are familiar with global food safety standards and labeling requirements for the Middle East, SE Asia, and Africa.',
      },
    ],
  },
  {
    id: 'compliance',
    name: 'Compliance',
    description: 'Food safety certifications and documentation support.',
    icon: MdVerified,
    items: [
      {
        question: 'Do you provide food safety certificates with shipments?',
        answer:
          'Yes. We provide batch-wise documentation, including relevant quality and compliance records required for wholesale procurement and audits.',
      },
      {
        question: 'Can you support custom labeling for regulatory markets?',
        answer:
          'Yes, our team can support market-specific label requirements for approved bulk orders, including ingredient declarations and export documentation.',
      },
    ],
  },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    categories.forEach((category) => {
      category.items.forEach((item, index) => {
        initialState[`${category.id}-${index}`] = Boolean(item.open);
      });
    });
    return initialState;
  });
  const categoryIds = useMemo(() => categories.map((cat) => cat.id), []);

  useEffect(() => {
    const nodes = categoryIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveCategory(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.15, 0.3, 0.5, 0.75],
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [categoryIds]);

  const handleCategoryClick = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActiveCategory(id);
    window.history.replaceState(null, '', `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleFAQItem = (itemKey: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  return (
    <div className="flex flex-col flex-1">
      <header className="relative overflow-hidden py-20 lg:py-24">
        <div className="absolute inset-0 -z-20 bg-linear-to-b from-primary/15 via-primary/5 to-transparent"></div>
        <div className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="mx-auto max-w-5xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl"
          >
            Answers for Fast B2B Decisions
          </motion.h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Everything your procurement team needs to know about Fruitlly jelly cubes,
            from product quality to logistics and compliance.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              4 Key Categories
            </span>
            <span className="rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              Quick Procurement Clarity
            </span>
            <span className="rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              B2B Support Ready
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-primary/10 bg-white p-4 shadow-lg shadow-primary/5">
              <h3 className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Categories
              </h3>
              <nav className="space-y-1.5">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const Icon = cat.icon;

                  return (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      onClick={handleCategoryClick(cat.id)}
                      className={`group block rounded-xl border px-3 py-3 transition-all ${
                        isActive
                          ? 'border-primary/30 bg-primary/10 text-primary shadow-sm'
                          : 'border-transparent text-slate-600 hover:border-primary/20 hover:bg-primary/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                            isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-primary/15'
                          }`}
                        >
                          <Icon size={18} />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{cat.name}</p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="space-y-14 lg:col-span-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <section key={category.id} id={category.id} className="scroll-mt-28">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-slate-900">{category.name}</h2>
                      <p className="text-sm text-slate-500">{category.description}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {category.items.map((item, index) => {
                      const itemKey = `${category.id}-${index}`;
                      const isOpen = Boolean(openItems[itemKey]);

                      return (
                        <div
                          key={item.question}
                          className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm"
                        >
                          <button
                            type="button"
                            onClick={() => toggleFAQItem(itemKey)}
                            aria-expanded={isOpen}
                            className="flex w-full cursor-pointer items-center justify-between gap-6 p-5 text-left md:p-6"
                          >
                          <span className="pr-4 text-base font-semibold leading-relaxed text-slate-900 md:text-lg">
                            {item.question}
                          </span>
                          <span className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                            <MdExpandMore size={24} />
                          </span>
                          </button>
                          <motion.div
                            initial={false}
                            animate={{
                              height: isOpen ? 'auto' : 0,
                              opacity: isOpen ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-slate-600 md:px-6 md:pb-6 md:pt-4">
                              {item.answer}
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <section className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-primary/20 bg-white p-8 text-center shadow-lg shadow-primary/10 md:p-12">
            <h2 className="mb-3 text-3xl font-black tracking-tight text-slate-900">Still have questions?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-slate-600">
              Our B2B team can help with pricing, custom requirements, and supply planning.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white transition-all hover:shadow-lg"
                href="mailto:support@fruitlly.com"
              >
                <MdEmail size={20} /> Email Support
              </a>
              <a
                className="flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-white px-8 py-4 font-bold text-slate-900 transition-all hover:border-primary"
                href="tel:+1234567890"
              >
                <MdPhone size={20} /> Call Sales Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
