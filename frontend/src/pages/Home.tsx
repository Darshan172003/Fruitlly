import React from 'react';
import SeoHead from '../components/SeoHead';
import { getPageSeo } from '../lib/seo';
import {
  B2BFocusSection,
  CoreProductSection,
  CtaSection,
  HeroSection,
} from '../components/Home';

const seo = getPageSeo('home');

const Home = () => {
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
      <CoreProductSection />
      <B2BFocusSection />
      <CtaSection />
    </div>
  );
};

export default Home;
