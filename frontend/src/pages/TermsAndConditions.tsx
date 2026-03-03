import React from 'react';
import { motion } from 'motion/react';
import { 
  MdChevronRight, 
  MdCalendarToday, 
  MdExpandMore, 
  MdMail 
} from 'react-icons/md';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 justify-center py-12 px-6"
    >
      <div className="flex flex-col max-w-200 flex-1">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 text-sm font-medium">
          <Link to="/" className="text-slate-500 hover:text-primary transition-colors">Home</Link>
          <span className="text-slate-400">
            <MdChevronRight size={16} />
          </span>
          <span className="text-slate-900">Terms and Conditions</span>
        </nav>

        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-slate-900 text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">Terms and Conditions</h1>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <MdCalendarToday size={14} />
            <p className="text-sm">Last Revised: October 24, 2023</p>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="mb-12 p-8 bg-white rounded-xl border border-slate-100 shadow-sm">
          <p className="text-slate-600 leading-relaxed">
            Welcome to the Fruitlly B2B platform, operated by Tulsi Foods. These Terms and Conditions govern your use of our bulk procurement services for sugar-coated jelly cubes. By placing an order or using our services, you agree to be bound by these terms.
          </p>
        </section>

        {/* Accordion Legal Sections */}
        <div className="flex flex-col gap-1">
          <details className="group bg-white rounded-lg border border-slate-100 mb-4" open>
            <summary className="flex cursor-pointer items-center justify-between gap-6 p-6 select-none">
              <h3 className="text-primary text-lg font-bold flex items-center gap-3">
                <span className="bg-primary/10 px-2 py-1 rounded text-sm">01</span>
                Bulk Supply & Ordering
              </h3>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <MdExpandMore size={24} />
              </span>
            </summary>
            <div className="px-6 pb-6 pt-0">
              <div className="h-px bg-slate-50 mb-4"></div>
              <p className="text-slate-600 text-base leading-relaxed">
                All bulk orders for Fruitlly sugar-coated jelly cubes are subject to availability and confirmation by Tulsi Foods. Minimum order quantities (MOQ) apply for B2B pricing tiers. We reserve the right to limit the quantity of products supplied to any single customer or entity to ensure fair distribution during peak demand periods.
              </p>
            </div>
          </details>

          <details className="group bg-white rounded-lg border border-slate-100 mb-4">
            <summary className="flex cursor-pointer items-center justify-between gap-6 p-6 select-none">
              <h3 className="text-primary text-lg font-bold flex items-center gap-3">
                <span className="bg-primary/10 px-2 py-1 rounded text-sm">02</span>
                Pricing and Payment
              </h3>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <MdExpandMore size={24} />
              </span>
            </summary>
            <div className="px-6 pb-6 pt-0">
              <div className="h-px bg-slate-50 mb-4"></div>
              <p className="text-slate-600 text-base leading-relaxed">
                B2B prices are confidential and provided upon request or through verified accounts. All prices are exclusive of applicable taxes unless stated otherwise. Standard payment terms are Net 30 days for approved credit accounts. Late payments may incur interest charges at 2% per month.
              </p>
            </div>
          </details>

          <details className="group bg-white rounded-lg border border-slate-100 mb-4">
            <summary className="flex cursor-pointer items-center justify-between gap-6 p-6 select-none">
              <h3 className="text-primary text-lg font-bold flex items-center gap-3">
                <span className="bg-primary/10 px-2 py-1 rounded text-sm">03</span>
                Shipping and Delivery
              </h3>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <MdExpandMore size={24} />
              </span>
            </summary>
            <div className="px-6 pb-6 pt-0">
              <div className="h-px bg-slate-50 mb-4"></div>
              <p className="text-slate-600 text-base leading-relaxed">
                Delivery timelines are estimates and not guaranteed. Tulsi Foods utilizes third-party logistics partners for fulfillment. Risk of loss passes to the buyer upon delivery to the carrier. Any damaged shipments must be reported within 48 hours of receipt with photographic evidence for claim processing.
              </p>
            </div>
          </details>

          <details className="group bg-white rounded-lg border border-slate-100 mb-4">
            <summary className="flex cursor-pointer items-center justify-between gap-6 p-6 select-none">
              <h3 className="text-primary text-lg font-bold flex items-center gap-3">
                <span className="bg-primary/10 px-2 py-1 rounded text-sm">04</span>
                Intellectual Property Rights
              </h3>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <MdExpandMore size={24} />
              </span>
            </summary>
            <div className="px-6 pb-6 pt-0">
              <div className="h-px bg-slate-50 mb-4"></div>
              <p className="text-slate-600 text-base leading-relaxed">
                "Fruitlly" and all associated logos, branding, and proprietary recipes are the exclusive property of Tulsi Foods. B2B partners are granted a limited, non-exclusive license to use marketing materials provided by us for the sole purpose of reselling the products in their original packaging.
              </p>
            </div>
          </details>

          <details className="group bg-white rounded-lg border border-slate-100 mb-4">
            <summary className="flex cursor-pointer items-center justify-between gap-6 p-6 select-none">
              <h3 className="text-primary text-lg font-bold flex items-center gap-3">
                <span className="bg-primary/10 px-2 py-1 rounded text-sm">05</span>
                Limitation of Liability
              </h3>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <MdExpandMore size={24} />
              </span>
            </summary>
            <div className="px-6 pb-6 pt-0">
              <div className="h-px bg-slate-50 mb-4"></div>
              <p className="text-slate-600 text-base leading-relaxed">
                To the maximum extent permitted by law, Tulsi Foods shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our products or services. Our total liability for any claim shall not exceed the amount paid for the specific order giving rise to the claim.
              </p>
            </div>
          </details>

          <details className="group bg-white rounded-lg border border-slate-100 mb-4">
            <summary className="flex cursor-pointer items-center justify-between gap-6 p-6 select-none">
              <h3 className="text-primary text-lg font-bold flex items-center gap-3">
                <span className="bg-primary/10 px-2 py-1 rounded text-sm">06</span>
                Governing Law
              </h3>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <MdExpandMore size={24} />
              </span>
            </summary>
            <div className="px-6 pb-6 pt-0">
              <div className="h-px bg-slate-50 mb-4"></div>
              <p className="text-slate-600 text-base leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Tulsi Foods is headquartered. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the local courts of that region.
              </p>
            </div>
          </details>
        </div>

        {/* Detailed Text Section */}
        <div className="mt-12">
          <h2 className="text-slate-900 text-2xl font-bold mb-6">Detailed Terms of Service</h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              Fruitlly B2B is committed to maintaining the highest standards of food safety and customer service. Our jelly cubes are manufactured in state-of-the-art facilities following strict hygiene protocols. B2B partners are expected to store the products in cool, dry environments to maintain quality and shelf life.
            </p>
            <p>
              We reserve the right to update these Terms and Conditions at any time. Significant changes will be communicated via email to registered B2B accounts. Continued use of the platform after such changes constitutes acceptance of the new terms.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-10 bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 flex flex-col items-center text-center">
          <h3 className="text-slate-900 text-xl font-bold mb-2">Have questions about these terms?</h3>
          <p className="text-slate-600 mb-6">Our legal and support teams are here to help you understand your B2B partnership.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2">
              <MdMail size={18} />
              Contact Legal Team
            </button>
            <button className="bg-white text-slate-900 border border-slate-200 font-bold py-3 px-8 rounded-lg hover:bg-slate-50 transition-all">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsAndConditions;
