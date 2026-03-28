import React from 'react';
import { motion } from 'motion/react';
import { MdRocketLaunch, MdVisibility } from 'react-icons/md';
import VisionImg from '../../assets/Our_Vision.webp'
import MissionImg from '../../assets/Our_Mission.webp'

const PillarsSection = () => {
  return (
    <section className="relative flex flex-1 justify-center py-20 px-4 md:px-10 lg:px-40 overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-linear-to-b from-white via-primary/5 to-white" />
      <div className="flex flex-col max-w-300 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center mb-12"
        >
          <span className="text-accent-green font-bold text-sm mb-2 uppercase tracking-widest">Driven by Purpose</span>
          <h2 className="text-text-dark text-3xl font-bold leading-tight text-center font-display">Our Core Pillars</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="flex flex-col gap-6 p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-2xl shadow-inner"
              style={{ backgroundImage: `url(${MissionImg})` }}
            ></div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="text-primary">
                  <MdRocketLaunch size={28} />
                </div>
                <h3 className="text-text-dark text-2xl font-bold leading-normal">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-base font-normal leading-relaxed">
                To manufacture high-quality fruit jelly and confectionery products that support B2B partners through reliable production and consistent quality.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-6 p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-2xl shadow-inner"
              style={{ backgroundImage: `url(${VisionImg})` }}
            ></div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="text-accent-green">
                  <MdVisibility size={28} />
                </div>
                <h3 className="text-text-dark text-2xl font-bold leading-normal">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-base font-normal leading-relaxed">
                To become a trusted global fruit jelly manufacturer known for innovation, quality, and strong distribution partnerships.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
