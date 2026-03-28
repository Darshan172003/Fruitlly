import React from 'react';
import { motion } from 'motion/react';
import SeoHead from '../components/SeoHead';
import { getPageSeo } from '../lib/seo';
import { B2BInquiryForm, ContactDetails, ContactHeader } from '../components/Contact';

const seo = getPageSeo('contact');

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative max-w-7xl mx-auto px-6 py-12 md:py-20"
    >
      <SeoHead
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogType={seo.ogType}
        schema={seo.schema}
      />
      <div className="pointer-events-none absolute -top-8 left-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-24 right-0 w-64 h-64 bg-accent-green/15 rounded-full blur-3xl" />

      <div className="relative">
        <ContactHeader />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <ContactDetails />
          <B2BInquiryForm />
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
