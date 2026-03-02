import React from 'react';
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

const PrivacyPolicy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col flex-1"
    >
      {/* Hero Section */}
      <div className="relative h-64 w-full overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12">
          <nav className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="flex items-center">
              <MdChevronRight size={14} />
            </span>
            <span>Legal</span>
          </nav>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Learn how Fruitlly B2B protects and manages your corporate data and business information.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20 w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-28 space-y-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Table of Contents</p>
              <nav className="flex flex-col gap-1">
                <a className="rounded-lg px-3 py-2 text-sm font-medium text-primary bg-primary/5 transition-colors" href="#introduction">Introduction</a>
                <a className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors" href="#information-collection">Information Collection</a>
                <a className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors" href="#use-of-data">Use of Data</a>
                <a className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors" href="#security">B2B Client Security</a>
                <a className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors" href="#sharing">Data Sharing</a>
                <a className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors" href="#contact">Contact Us</a>
              </nav>
              <div className="mt-8 border-t border-slate-100 pt-6">
                <p className="text-xs text-slate-500">Last Updated:</p>
                <p className="text-sm font-semibold text-slate-900">October 24, 2023</p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="w-full lg:w-3/4 space-y-12">
            <section id="introduction">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="h-8 w-1.5 rounded-full bg-primary"></span>
                Our Commitment to Your Privacy
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                <p>
                  At Fruitlly B2B by Tulsi Foods, we value the trust you place in us when sharing your business information. This Privacy Policy describes how Fruitlly collects, uses, and shares your personal and business information when you visit or make a purchase from our B2B platform.
                </p>
                <p>
                  We ensure that your data is handled with the highest level of security and professional integrity. Our relationship with our business partners is built on transparency, and we are committed to being clear about what data we collect and why.
                </p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm" id="information-collection">
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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
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

            <section id="use-of-data">
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

            <section className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 text-white" id="security">
              <div className="relative z-10 lg:w-2/3">
                <h2 className="text-2xl font-bold mb-4">B2B Client Security</h2>
                <p className="text-slate-300 mb-6">
                  We implement industry-standard encryption and security protocols to protect your sensitive business data. Our servers are monitored 24/7, and access to client data is strictly restricted to authorized personnel only.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                    <MdLock size={16} />
                    SSL Encrypted
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                    <MdVerifiedUser size={16} />
                    GDPR Compliant
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                    <MdGppGood size={16} />
                    Secure Payments
                  </div>
                </div>
              </div>
            </section>

            <section id="sharing">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Information Sharing</h2>
              <p className="text-slate-600 mb-4">
                Fruitlly B2B does not sell your business data to third parties. We only share information with service providers that help us operate our business, such as:
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="rounded-xl border border-slate-200 p-4">
                  <h4 className="font-bold text-primary mb-2">Logistics Partners</h4>
                  <p className="text-xs text-slate-500">To ensure delivery of your wholesale jelly cube orders.</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <h4 className="font-bold text-primary mb-2">Payment Processors</h4>
                  <p className="text-xs text-slate-500">To securely handle B2B financial transactions.</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <h4 className="font-bold text-primary mb-2">Legal Compliance</h4>
                  <p className="text-xs text-slate-500">When required by law to comply with regulations or legal requests.</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border-2 border-primary/10 bg-primary/5 p-8 text-center" id="contact">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions about our Privacy Policy?</h2>
              <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                If you have any questions regarding how we handle your business data, please contact our Data Protection Officer.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-white hover:bg-primary/90 transition-colors">
                  <MdMail size={20} />
                  Contact Privacy Team
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-8 py-3 font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <MdCall size={20} />
                  Request a Call
                </button>
              </div>
            </section>
          </article>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
