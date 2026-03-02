import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#f4f1f1]">
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between">
        <Link 
          to="/"
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="size-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
              <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-text-dark text-xl font-bold leading-tight tracking-tight">Fruitlly</h2>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-text-dark hover:text-primary'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-md">
            Get a Quote
          </button>
          <button className="md:hidden text-text-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => 
                    `text-left text-sm font-medium py-2 transition-colors ${isActive ? 'text-primary' : 'text-text-dark'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
