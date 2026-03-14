import React from 'react';
import { motion } from 'motion/react';
import { MdFactory, MdSecurity, MdInventory2, MdCategory } from 'react-icons/md';

const focusItems = [
  {
    title: 'Bulk Manufacturing',
    description:
      'High-capacity automated production lines handling large-scale orders with reliable timelines.',
    icon: MdFactory,
    tone: 'primary',
  },
  {
    title: 'Consistent Taste',
    description:
      'Advanced quality control ensuring uniform flavor, texture, and batch consistency.',
    icon: MdCategory,
    tone: 'accent',
  },
  {
    title: 'Hygiene First',
    description:
      'ISO-compliant facility following international food safety standards.',
    icon: MdSecurity,
    tone: 'primary',
  },
  {
    title: 'Flexible Packaging',
    description:
      'Custom bulk and private label packaging solutions tailored for distributors and brands.',
    icon: MdInventory2,
    tone: 'accent',
  },
] as const;

const B2BFocusSection = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-text-dark text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">B2B Focus & Manufacturing Excellence</h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            We are more than a supplier - we are your strategic manufacturing partner for high-quality, large-scale jelly production.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {focusItems.map((item) => {
            const Icon = item.icon;
            const iconToneClass =
              item.tone === 'primary'
                ? 'bg-primary/10 text-primary'
                : 'bg-accent-green/10 text-accent-green';

            const index = focusItems.indexOf(item);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                className="group bg-white p-5 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-lg"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-110 ${iconToneClass}`}
                >
                  <span className="inline-flex sm:scale-110">
                    <Icon size={24} />
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default B2BFocusSection;
