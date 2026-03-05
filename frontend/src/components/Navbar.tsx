import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'motion/react';
import LogoImage from '../assets/Logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link 
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={LogoImage}
            alt="Fruitlly logo"
            className="h-10 w-auto sm:h-12"
            referrerPolicy="no-referrer"
          />
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
          <Link to="/contact" className="hidden sm:inline-block">  
          <button className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-md">
            Get a Quote
          </button>
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            className="md:hidden text-text-dark p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
            id="mobile-nav"
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

              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="pt-2">
                <button className="w-full bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-md">
                  Get a Quote
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
