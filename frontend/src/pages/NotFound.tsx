import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center"
    >
      <p className="text-sm font-bold uppercase tracking-widest text-primary">Error 404</p>
      <h1 className="mt-3 text-4xl font-extrabold text-slate-900 md:text-5xl">Page Not Found</h1>
      <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700"
      >
        Back to Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
