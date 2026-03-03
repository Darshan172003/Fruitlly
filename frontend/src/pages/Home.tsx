import React from 'react';
import {
  B2BFocusSection,
  CoreProductSection,
  CtaSection,
  HeroSection,
} from '../components/Home';

const Home = () => {
  return (
    <div className="flex flex-col flex-1 bg-linear-to-b from-white via-white to-primary/5">
      <HeroSection />
      <CoreProductSection />
      <B2BFocusSection />
      <CtaSection />
    </div>
  );
};

export default Home;
