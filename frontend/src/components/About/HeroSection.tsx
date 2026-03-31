import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import AboutImg from '../../assets/About1.webp'

const HeroSection = () => {
  return (
    <section className="relative flex flex-1 justify-center py-12 px-4 md:px-10 lg:px-40 overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-linear-to-b from-primary/5 via-white to-accent-green/8" />
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl -z-10" />
      <div className="absolute -bottom-16 -right-12 h-56 w-56 rounded-full bg-accent-green/15 blur-3xl -z-10" />
      <div className="flex flex-col max-w-300 flex-1">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-2xl shadow-lg lg:w-1/2"
            style={{ backgroundImage: `url(${AboutImg})` }}
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.22 }}
            className="flex flex-col gap-6 lg:w-1/2 lg:pl-12"
          >
            <div className="flex flex-col gap-3">

              <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur px-4 py-2 border border-primary/10 shadow-sm w-fit">
                <span className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                <span className="text-accent-green text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase">Our Story</span>
              </div>
              <h1 className="text-text-dark text-4xl font-black leading-tight tracking-tight md:text-5xl font-display">
                About Fruitlly - Trusted Fruit Jelly Manufacturer in India
              </h1>
              <p className="text-gray-600 text-lg font-normal leading-relaxed">
                Fruitlly is the fruit jelly brand of <span className="text-primary font-bold">Tulsi Foods</span>, a B2B confectionery manufacturer based in Jalgaon, Maharashtra. We specialize in sugar-coated jelly cubes and fruit candies, offering bulk supply, private labelling, and consistent quality for distributors, wholesalers, and brands across India.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <button className="flex min-w-35 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-tight hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                  View Products
                </button>
              </Link>
              <Link to="/contact">
                <button className="flex min-w-35 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-accent-green text-white text-base font-bold leading-normal tracking-tight hover:scale-105 transition-transform shadow-lg shadow-accent-green/20">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
