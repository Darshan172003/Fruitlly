import React from 'react';
import { motion } from 'motion/react';

const PHONE_NUMBER = '+919422283890';
const PHONE_DIGITS = PHONE_NUMBER.replace(/\D/g, '');
const CATALOG_MESSAGE = encodeURIComponent(
  'Hello Mr. Sunil Patil,\nI am interested in bulk jelly products from Fruitlly (Tulsi Foods). Please share product details, pricing, and minimum order quantity. Thank you.',
);

const CtaSection = () => {
  const whatsappCatalogUrl = `https://wa.me/${PHONE_DIGITS}?text=${CATALOG_MESSAGE}`;
  const callUrl = `tel:+${PHONE_DIGITS}`;

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-primary rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10"
      >
        <div className="flex flex-col gap-4 text-white w-full lg:w-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Ready to Scale Your Bulk Jelly Supply?</h2>
          <p className="text-white/80 text-base sm:text-lg max-w-xl">Join 500+ distribution partners across India who rely on Fruitlly by Tulsi Foods for large-scale sugar coated jelly cubes and fruit jelly manufacturing.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto lg:shrink-0">
          <a
            href={whatsappCatalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg text-center"
          >
            Request Product Catalog
          </a>
          <a
            href={callUrl}
            className="w-full sm:w-auto bg-black/20 text-white border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-black/30 transition-colors text-center"
          >
            Speak to Our Team
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaSection;
