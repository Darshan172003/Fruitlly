import React from 'react';
import { motion } from 'motion/react';

const CtaSection = () => {
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Ready to Partner with Fruitlly?</h2>
          <p className="text-white/80 text-base sm:text-lg max-w-xl">Join our B2B partner network and supply premium fruit jelly products to your market.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto lg:shrink-0">
          <button className="w-full sm:w-auto bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg text-center">
            Contact Sales
          </button>
          <button className="w-full sm:w-auto bg-black/20 text-white border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-black/30 transition-colors text-center">
            Download Brochure
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaSection;
