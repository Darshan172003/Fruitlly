import React from 'react';
import { motion } from 'motion/react';
import { MdEco, MdGroups, MdHandshake, MdScience } from 'react-icons/md';

const values = [
  { icon: MdHandshake, color: 'text-primary', title: 'Integrity', desc: 'Transparent and ethical business practices in every partnership.' },
  { icon: MdScience, color: 'text-accent-green', title: 'Innovation', desc: 'Continuous improvement in flavour development, coating technology, and product quality.' },
  { icon: MdGroups, color: 'text-primary', title: 'Partnership', desc: 'Building long-term relationships with distributors, retailers, and private label clients across India.' },
  { icon: MdEco, color: 'text-accent-green', title: 'Sustainability', desc: 'Responsible sourcing and efficient manufacturing practices.' },
];

const ValuesSection = () => {
  return (
    <section className="relative flex flex-1 justify-center py-20 px-4 md:px-10 lg:px-40 overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-linear-to-b from-white via-primary/4 to-accent-green/8" />
      <div className="flex flex-col max-w-300 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h2 className="text-text-dark text-3xl font-bold font-display mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-150">The principles that guide our decisions and define our culture every day.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className={`size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center ${val.color} border border-slate-100`}>
                  <Icon size={32} />
                </div>
                <h4 className="text-text-dark font-bold">{val.title}</h4>
                <p className="text-gray-600 text-sm">{val.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
