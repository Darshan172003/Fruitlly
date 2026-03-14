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
    <div className="flex flex-col flex-1 bg-linear-to-b from-white via-white to-primary/5">
      <HeroSection />
      <LegacySection />
      <ManufacturingSection />
      <GlobalExportSection />
      <PillarsSection />
      <ValuesSection />
      <CtaSection />
    </div>
  );
};

export default About;
