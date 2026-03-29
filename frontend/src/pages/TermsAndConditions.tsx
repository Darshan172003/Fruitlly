import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  MdCalendarToday,
  MdExpandMore,
  MdMail
} from 'react-icons/md';
import SeoHead from '../components/SeoHead';
import { getPageSeo } from '../lib/seo';

type Clause = {
  id: string;
  title: string;
  body: string;
  open?: boolean;
};

const clauses: Clause[] = [
  {
    id: 'bulk-supply-ordering',
    title: 'Bulk Supply & Ordering',
    body: 'All bulk orders for Fruitlly fruit jelly products are subject to availability and confirmation by Tulsi Foods. Minimum order quantities (MOQ) apply for B2B pricing tiers. We reserve the right to limit quantities supplied to any single customer to ensure fair distribution during peak demand.',
    open: true,
  },
  {
    id: 'pricing-payment',
    title: 'Pricing and Payment',
    body: 'B2B pricing is confidential and available upon request or through verified accounts. All prices are exclusive of applicable taxes unless stated otherwise. Standard payment terms are Net 30 for approved credit accounts. Late payments may incur interest at 2% per month.',
  },
  {
    id: 'shipping-delivery',
    title: 'Shipping and Delivery',
    body: 'Delivery timelines are estimates and not guaranteed. Tulsi Foods uses third-party logistics partners for fulfillment. Risk of loss transfers to the buyer upon carrier pickup. Damaged shipments must be reported within 48 hours of receipt with photographic evidence for claims.',
  },
  {
    id: 'ip-rights',
    title: 'Intellectual Property Rights',
    body: '"Fruitlly" and all associated logos, branding, and proprietary formulations are the exclusive property of Tulsi Foods. B2B partners receive a limited, non-exclusive license to use provided marketing materials solely for reselling products in their original packaging.',
  },
  {
    id: 'limitation-liability',
    title: 'Limitation of Liability',
    body: 'To the maximum extent permitted by law, Tulsi Foods shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our products or services. Our total liability for any claim shall not exceed the amount paid for the specific order giving rise to the claim.',
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    body: 'These terms are governed by the laws of Maharashtra, India, where Tulsi Foods is headquartered. Any disputes shall be subject to the exclusive jurisdiction of the courts in Jalgaon, Maharashtra.',
  },
];

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    clauses.forEach((clause) => {
      initialState[clause.id] = Boolean(clause.open);
    });
    return initialState;
  });

  const tocItems = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      { id: 'clauses', label: 'Terms Clauses' },
      { id: 'details', label: 'Detailed Service Terms' },
      { id: 'contact', label: 'Contact Legal Team' },
    ],
    []
  );
  const sectionIds = useMemo(() => tocItems.map((item) => item.id), [tocItems]);

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();


  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
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
  }, [sectionIds]);

  const handleTocClick = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActiveSection(id);
    window.history.replaceState(null, '', `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleClause = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const seo = getPageSeo('terms');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 flex-col"
    >
      <SeoHead
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogType={seo.ogType}
        schema={seo.schema}
      />
      <header className="border-b border-slate-200 bg-linear-to-b from-white to-accent-green/5">
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-12 lg:pb-14 lg:pt-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600">
            <MdCalendarToday size={14} />
            <span>Last Revised: {currentMonth} {currentYear}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Terms and Conditions - Fruitlly B2B Platform
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-600 md:text-lg">
            These terms govern your use of Fruitlly B2B services for wholesale procurement, bulk ordering, and distribution partnerships.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Table of Contents
              </p>
              <nav className="flex flex-col gap-1.5">
                {tocItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleTocClick(item.id)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeSection === item.id
                      ? 'bg-primary/5 text-primary'
                      : 'text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <span className={`mr-2 text-xs font-bold ${activeSection === item.id ? 'text-primary' : 'text-slate-400'}`}>{String(index + 1).padStart(2, '0')}</span>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="w-full space-y-8 lg:w-3/4">
            <section id="overview" className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900">
                <span className="h-7 w-1.5 rounded-full bg-primary"></span>
                Agreement Overview
              </h2>
              <p className="leading-relaxed text-slate-600">
                Welcome to the Fruitlly B2B platform, operated by Tulsi Foods, Jalgaon. These Terms and Conditions govern your use of our bulk procurement services for fruit jelly products and confectionery. By placing an order or using our services, you agree to these terms.
              </p>
            </section>

            <section id="clauses" className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">Terms Clauses</h2>
              <div className="space-y-4">
                {clauses.map((clause, index) => {
                  const isOpen = Boolean(openItems[clause.id]);

                  return (
                    <div
                      key={clause.id}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => toggleClause(clause.id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-6 p-5 text-left"
                      >
                        <h3 className="flex items-center gap-3 text-base font-bold text-slate-900 md:text-lg">
                          <span className="rounded bg-accent-green/15 px-2 py-1 text-xs font-semibold text-accent-green">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {clause.title}
                        </h3>
                        <span className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-green' : 'text-slate-400'}`}>
                          <MdExpandMore size={24} />
                        </span>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-slate-600">
                          {clause.body}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section id="details" className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
                <span className="h-7 w-1.5 rounded-full bg-accent-green"></span>
                Detailed Terms of Service
              </h2>
              <div className="prose prose-slate max-w-none space-y-4 text-slate-600">
                <p>
                  Fruitlly by Tulsi Foods maintains the highest standards of food safety and B2B service. Our fruit jelly products are manufactured in ISO-compliant facilities following strict hygiene protocols. Partners must store products in cool, dry environments to maintain quality and shelf life.
                </p>
                <p>
                  We reserve the right to update these Terms and Conditions at any time. Significant changes will be communicated via email to registered B2B accounts. Continued platform use after updates constitutes acceptance of the revised terms.
                </p>
              </div>
            </section>

            <section id="contact" className="scroll-mt-28 rounded-2xl border border-accent-green/20 bg-accent-green/5 p-4 text-center shadow-sm sm:p-8">
              <h3 className="mb-2 text-xl font-bold text-slate-900">Have questions about these terms?</h3>
              <p className="mx-auto mb-6 max-w-xl text-slate-600">
                Our legal and support teams are here to clarify your B2B partnership terms.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:info@fruitlly.com" className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-white transition-all hover:bg-primary/90">
                  <MdMail size={18} />
                  Contact Legal Team
                </a>
              </div>
            </section>
          </article>
        </div>
      </main>
    </motion.div>
  );
};

export default TermsAndConditions;
