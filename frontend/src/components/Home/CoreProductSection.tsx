import React from 'react';
import { motion } from 'motion/react';
import { MdCheckCircle } from 'react-icons/md';
import Image2 from '../../assets/Home2.png';

const highlights = [
'Suitable for bulk packaging & distribution',
'Ideal for commercial and industrial use',
'Custom flavors and colors for private label',
'High-volume production capacity'
] as const;

const CoreProductSection = () => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-14 lg:py-20">
      <div className="absolute inset-0 -z-20 bg-linear-to-b from-white via-primary/5 to-white" />
      <div className="absolute -top-20 right-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-accent-green/15 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-7 sm:mb-10 text-center lg:text-left"
        >
          <span className="inline-flex items-center rounded-full border border-primary/15 bg-white/90 px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-primary shadow-sm">
            CORE PRODUCT
          </span>
          <h2 className="mt-4 text-text-dark text-3xl sm:text-4xl font-extrabold tracking-tight">Our Signature Fruit Jelly Product</h2>
        </motion.div>

        <div className="relative overflow-hidden rounded-4xl border border-gray-100 bg-white/95 shadow-2xl">
          <div className="absolute inset-0 -z-10 bg-linear-to-tr from-primary/5 via-transparent to-accent-green/10" />

          <div className="flex flex-col lg:flex-row items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-full lg:w-1/2"
            >
              <div className="h-72 sm:h-96 lg:h-full">
                <img
                  src={Image2}
                  alt="Signature Jelly Cubes"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 rounded-xl bg-white/90 backdrop-blur px-4 py-3 border border-gray-100 shadow-lg">
                <p className="text-xs uppercase text-gray-500 font-semibold">Texture Profile</p>
                <p className="text-xs sm:text-base font-bold text-text-dark">Soft Chew + Sugary Crunch</p>
              </div> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="flex w-full lg:w-1/2 flex-col gap-6 p-6 sm:p-8 lg:p-12"
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-text-dark text-2xl sm:text-3xl font-bold leading-tight">
                  Premium Sugar Coated Jelly Cubes
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Made with advanced processing technology, our fruit jelly cubes deliver consistent texture, vibrant color, and stable shelf life for large-scale distribution.
                </p>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent-green/15 text-accent-green shrink-0">
                      <MdCheckCircle size={16} />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-1 flex flex-col gap-4">
                <button className="flex w-full sm:w-fit min-w-48 cursor-pointer items-center justify-center rounded-xl h-12 px-7 bg-primary text-white text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30">
                  View Product Specifications
                </button>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Available for bulk supply and private labeling.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreProductSection;
