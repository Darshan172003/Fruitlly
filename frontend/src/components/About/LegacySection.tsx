import React from 'react';
import { motion } from 'motion/react';
import { MdFactory, MdPublic, MdVerifiedUser } from 'react-icons/md';

const cards = [
  {
    icon: MdFactory,
    color: 'text-primary',
    bg: 'bg-primary/10',
    title: 'Industry Expertise',
    desc: 'Over 20 years of excellence in high-volume confectionery manufacturing and supply chain management.',
  },
  {
    icon: MdPublic,
    color: 'text-accent-green',
    bg: 'bg-accent-green/10',
    title: 'Global Reach',
    desc: 'Supplying premium jelly treats and snacks to B2B partners across 15+ countries worldwide.',
  },
  {
    icon: MdVerifiedUser,
    color: 'text-primary',
    bg: 'bg-primary/10',
    title: 'Quality Assurance',
    desc: 'Strict adherence to ISO and HACCP international food safety standards for every batch.',
  },
];

const LegacySection = () => {
  return (
    <section className="relative flex flex-1 justify-center py-16 px-4 md:px-10 lg:px-40 overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-linear-to-b from-white via-primary/5 to-accent-green/6" />
      <div className="flex flex-col max-w-300 flex-1">
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="flex flex-col gap-4 max-w-180"
          >
            <h2 className="text-text-dark text-3xl font-bold leading-tight md:text-4xl md:font-black tracking-tight font-display">
              The Legacy of Tulsi Foods
            </h2>
            <p className="text-gray-600 text-base font-normal leading-relaxed">
              With decades of expertise in the confectionery industry, Tulsi Foods is committed to delivering quality and taste across the globe. Our parent company serves as the backbone of innovation and ethical sourcing for every Fruitlly product.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`${card.color} p-3 ${card.bg} rounded-xl w-fit`}>
                    <Icon size={32} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-text-dark text-lg font-bold leading-tight">{card.title}</h3>
                    <p className="text-gray-600 text-sm font-normal leading-normal">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
