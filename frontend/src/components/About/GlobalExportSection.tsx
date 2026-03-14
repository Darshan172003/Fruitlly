import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { IconType } from 'react-icons';
import { MdGroups, MdLanguage, MdPublic, MdVerifiedUser } from 'react-icons/md';

type StatItem = {
  icon: IconType;
  value: number;
  label: string;
  suffix?: string;
};

const stats: StatItem[] = [
  { icon: MdLanguage, value: 15, suffix: '+', label: 'Countries' },
  { icon: MdGroups, value: 200, suffix: '+', label: 'B2B Partners' },
  { icon: MdPublic, value: 3, label: 'Continents' },
  { icon: MdVerifiedUser, value: 100, suffix: '%', label: 'Export Grade' },
];

const CountUp = ({ value, suffix = '', start }: { value: number; suffix?: string; start: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    const duration = 1400;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [start, value]);

  return (
    <>
      {displayValue.toLocaleString('en-IN')}
      {suffix}
    </>
  );
};

const GlobalExportSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section ref={sectionRef} className="flex flex-1 justify-center py-20 px-4 md:px-10 lg:px-40 bg-linear-to-r from-primary to-accent-green text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-white rounded-full blur-[120px]"></div>
      </div>
      <div className="flex flex-col max-w-300 flex-1 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col items-center text-center gap-6 mb-12"
        >
          <span className="text-white/80 font-bold text-sm uppercase tracking-widest">Global Export Network</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display">Connecting Sweetness Worldwide</h2>
          <p className="text-white/80 text-lg max-w-180">
            From our central manufacturing facility in Jalgaon, Fruitlly products reach multiple domestic and international markets. Our efficient supply chain supports reliable bulk distribution while maintaining product quality during transportation.
          </p>
        </motion.div>
        <div className="grid min-[450px]:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: stats.indexOf(stat) * 0.1 }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3 py-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
              >
                <span className="mb-1 rounded-full bg-white/15 p-2.5">
                  <Icon size={28} />
                </span>
                <p className="text-2xl font-bold leading-none">
                  <CountUp value={stat.value} suffix={stat.suffix} start={isInView} />
                </p>
                <p className="text-xs sm:text-sm text-white/75 uppercase tracking-widest text-center">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GlobalExportSection;
