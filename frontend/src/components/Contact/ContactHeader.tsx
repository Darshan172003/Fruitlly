import React from 'react';

const ContactHeader = () => {
  return (
    <div className="mb-12 md:mb-14">
      <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-bold tracking-[0.14em] uppercase">
        B2B PARTNERSHIP
      </span>
      <h1 className="mt-4 text-text-dark text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
        Strengthen Your 
        <span className="block bg-linear-to-r from-primary to-accent-green bg-clip-text text-transparent">Fruit Jelly Supply Chain</span>
      </h1>
      <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mt-4">
        Connect with Tulsi Foods for bulk fruit jelly products, private labeling, and large-scale manufacturing inquiries.
      </p>
    </div>
  );
};

export default ContactHeader;
