import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Image1 from '../../assets/Home1.png';
import { Link } from 'react-router-dom';

const metrics = [
  { value: '500+', label: 'Distribution Partners' },
  { value: '20+', label: 'Product Variants' },
  { value: 'ISO', label: 'Compliant Facility' },
] as const;

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-10 sm:py-16">
      <div className="absolute inset-0 -z-20 bg-linear-to-b from-primary/5 via-white to-accent-green/6" />
      <div className="absolute -top-28 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl -z-10" />
      <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-accent-green/20 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur px-4 py-2 border border-primary/10 shadow-sm w-fit">
              <span className="h-2 w-2 rounded-full bg-accent-green mr-2" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-primary">
                INDIA’S LEADING FRUIT JELLY MANUFACTURER
              </span>
            </div>

            <h1 className="mt-5 text-text-dark text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.2]">Premium Sugar Coated Jelly Cubes
              <span className="text-primary"> Engineered for Large-Scale Bulk Supply</span>
            </h1>

            <p className="mt-5 text-gray-600 text-base sm:text-lg max-w-xl">
              Fruitlly by Tulsi Foods is a leading B2B fruit jelly manufacturer in India, delivering consistent taste, scalable production, and strict quality assurance for distributors, wholesalers, and private label brands.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Link to="/products">
                <button className="group flex w-full sm:w-auto min-w-44 cursor-pointer items-center justify-center rounded-xl h-12 sm:h-14 px-7 bg-primary text-white text-sm sm:text-base font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30">
                  View Products
                </button>
              </Link>
              <Link to="/contact">
                <button
                  className="group flex w-full sm:w-auto min-w-44 cursor-pointer items-center justify-center rounded-xl h-12 sm:h-14 px-7 bg-accent-green text-white text-sm sm:text-base font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-accent-green/30"
                >
                  Request Bulk Orders
                </button>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {metrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-gray-100 bg-white/90 backdrop-blur px-4 py-4 shadow-sm"
                >
                  <p className="text-2xl font-bold text-primary leading-none">{item.value}</p>
                  <p className="mt-2 text-[11px] sm:text-xs uppercase tracking-[0.12em] text-gray-500 font-semibold">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-4xl sm:rounded-[2.6rem] bg-linear-to-tr from-primary/20 to-accent-green/20 blur-md" />
              <div className="relative w-full aspect-4/3 sm:aspect-square overflow-hidden rounded-[1.8rem] sm:rounded-[2.4rem] border border-white/70 shadow-2xl bg-white">
                <img
                  src={Image1}
                  alt="Jelly cubes for bulk manufacturing"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* <div className="absolute bottom-4 left-4 sm:left-6 rounded-xl bg-white/95 border border-gray-100 shadow-lg px-4 py-3 backdrop-blur">
                <p className="text-xs uppercase text-gray-500 font-semibold">Manufacturing</p>
                <p className="text-xs sm:text-base font-bold text-text-dark">Reliable Batch Consistency</p>
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

