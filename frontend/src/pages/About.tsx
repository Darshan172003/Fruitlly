import React from 'react';
import { motion } from 'motion/react';
import {
  CtaSection,
  GlobalExportSection,
  HeroSection,
  LegacySection,
  ManufacturingSection,
  PillarsSection,
  ValuesSection,
} from '../components/About';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col flex-1"
    >
      <HeroSection />
      <LegacySection />
      <ManufacturingSection />
      <GlobalExportSection />
      <PillarsSection />
      <ValuesSection />
      <CtaSection />
    </motion.div>
  );
};

export default About;
