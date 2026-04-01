import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  MdChevronRight,
  MdBusiness,
  MdPerson,
  MdPayments,
  MdDevices,
  MdLock,
  MdVerifiedUser,
  MdGppGood,
  MdMail,
  MdCall
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { getPageSeo } from '../lib/seo';

const tocSections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-collection', label: 'Information Collection' },
  { id: 'use-of-data', label: 'Use of Data' },
  { id: 'security', label: 'B2B Client Security' },
  { id: 'sharing', label: 'Data Sharing' },
  { id: 'contact', label: 'Contact Us' },
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(tocSections[0].id);
  const sectionIds = useMemo(() => tocSections.map((section) => section.id), []);

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

  const handleSectionClick = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActiveSection(id);
    window.history.replaceState(null, '', `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const seo = getPageSeo('privacy');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col flex-1"
    >
      <SeoHead
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogType={seo.ogType}
        schema={seo.schema}
      />
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden border-b border-slate-200 bg-linear-to-b from-white to-accent-green/5">
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 lg:pb-14 lg:pt-16">
          <div className="mb-5 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600">
            Last Updated: {currentMonth} {currentYear}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 max-w-3xl text-base text-slate-600 md:text-lg">
            Learn how Fruitlly by Tulsi Foods protects your corporate data and business information.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Table of Contents</p>
              <nav className="flex flex-col gap-1.5">
                {tocSections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={handleSectionClick(section.id)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeSection === section.id
                        ? 'bg-primary/5 text-primary'
                        : 'text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    <span className="mr-2 text-xs text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="w-full space-y-8 lg:w-3/4">
            <section id="introduction" className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
              <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold text-slate-900">
                <span className="h-8 w-1.5 rounded-full bg-accent-green"></span>
                Our Commitment to Your Privacy
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                <p>
                  At Fruitlly by Tulsi Foods, we value the trust you place in us when sharing your business information. This Privacy Policy describes how we collect, use, and share your business information when you visit or transact on our B2B platform.
                </p>
                <p>
                  We ensure that your data is handled with the highest level of security and professional integrity. Our relationship with our business partners is built on transparency, and we are committed to being clear about what data we collect and why.
                </p>
                <p>
                  This policy is governed by the Information Technology Act, 2000 and applicable Indian data protection laws.
                </p>
              </div>
            </section>

            <section className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8" id="information-collection">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Information Collection</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MdBusiness size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Business Details</h4>
                      <p className="text-sm text-slate-600">Company name, registration number, tax ID, and business address for invoicing.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-green/10 text-accent-green">
                      <MdPerson size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Contact Information</h4>
                      <p className="text-sm text-slate-600">Names of authorized representatives, corporate email addresses, and phone numbers.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MdPayments size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Financial Data</h4>
                      <p className="text-sm text-slate-600">Payment methods and transaction history related to jelly cube wholesale orders.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-green/10 text-accent-green">
                      <MdDevices size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Technical Usage</h4>
                      <p className="text-sm text-slate-600">IP addresses, browser types, and platform interaction logs to improve UX.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="use-of-data" className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">How We Use Your Data</h2>
              <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                <p>We use the collected information to provide and improve our B2B services, including:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Processing and fulfilling bulk orders for sugar-coated jelly cubes.</li>
                  <li>Managing corporate accounts and maintaining communication with procurement teams.</li>
                  <li>Generating invoices and maintaining accurate financial records for audit purposes.</li>
                  <li>Sending relevant updates about new product flavors, wholesale pricing, or supply chain notifications.</li>
                  <li>Ensuring the security of our platform and preventing fraudulent transactions.</li>
                </ul>
              </div>
            </section>

            <section className="relative scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8" id="security">
              <div className="relative z-10">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">B2B Client Security</h2>
                <p className="mb-6 text-slate-600">
                  We implement industry-standard encryption and security protocols to protect your sensitive business data. Our servers are monitored 24/7, and access to client data is strictly restricted to authorized personnel only.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
                    <span className="text-primary"><MdLock size={16} /></span>
                    SSL Encrypted
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
                    <span className="text-primary"><MdVerifiedUser size={16} /></span>
                    IT Act Compliant
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
                    <span className="text-primary"><MdGppGood size={16} /></span>
                    Secure Payments
                  </div>
                </div>
              </div>
            </section>

            <section id="sharing" className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Information Sharing</h2>
              <p className="text-slate-600 mb-4">
                Fruitlly B2B does not sell your business data to third parties. We only share information with service providers that help us operate our business, such as:
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="rounded-xl border border-accent-green/20 bg-accent-green/5 p-4">
                  <h4 className="font-bold text-accent-green mb-2">Logistics Partners</h4>
                  <p className="text-xs text-slate-500">To ensure delivery of your wholesale jelly cube orders.</p>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <h4 className="font-bold text-primary mb-2">Payment Processors</h4>
                  <p className="text-xs text-slate-500">To securely handle B2B financial transactions.</p>
                </div>
                <div className="rounded-xl border border-accent-green/20 bg-accent-green/5 p-4">
                  <h4 className="font-bold text-accent-green mb-2">Legal Compliance</h4>
                  <p className="text-xs text-slate-500">When required by law to comply with regulations or legal requests.</p>
                </div>
              </div>
            </section>

            <section className="scroll-mt-28 rounded-2xl border border-accent-green/20 bg-accent-green/5 p-4 text-center shadow-sm sm:p-8" id="contact">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions about our Privacy Policy?</h2>
              <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                If you have any questions regarding how we handle your business data, please contact our Privacy Contact.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href='mailto:info@fruitlly.com' className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-white hover:bg-primary/90 transition-colors">
                  <MdMail size={20} />
                  Contact Privacy Team
                </a>
                <a href='tel:+919422283890' className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-8 py-3 font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <MdCall size={20} />
                  Request a Call
                </a>
              </div>
            </section>
          </article>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
