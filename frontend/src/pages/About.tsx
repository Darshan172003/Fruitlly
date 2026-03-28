import React from 'react';
import SeoHead from '../components/SeoHead';
import { getPageSeo } from '../lib/seo';
import {
  CtaSection,
  GlobalExportSection,
  HeroSection,
  LegacySection,
  ManufacturingSection,
  PillarsSection,
  ValuesSection,
} from '../components/About';

const seo = getPageSeo('about');

const About = () => {
  return (
    <div className="flex flex-col flex-1 bg-linear-to-b from-white via-white to-primary/5">
      <SeoHead
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogType={seo.ogType}
        schema={seo.schema}
      />
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
