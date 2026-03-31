import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'motion/react';
import LogoImage from '../assets/Logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const menuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-controls="mobile-nav"]')
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    // { name: 'Recipes', path: '/recipes' },
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
            {isMenuOpen ? "" : <MdMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0  z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        {isMenuOpen && (
          <motion.div 
            ref={menuRef}
            key="menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            id="mobile-nav"
            className="fixed top-0 left-0 h-screen w-[75vw] max-w-sm bg-white z-50 shadow-2xl flex flex-col md:hidden overflow-y-auto"
          >
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <img src={LogoImage} alt="Fruitlly logo" className="h-8 w-auto" />
                <button onClick={() => setIsMenuOpen(false)} className="text-text-dark p-1">
                  <MdClose size={24} />
                </button>
              </div>
              <div className="px-6 py-6 flex flex-col gap-4 grow">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `text-left text-lg font-medium py-2 transition-colors ${isActive ? 'text-primary' : 'text-text-dark hover:text-primary'}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="pt-6">
                  <button className="w-full bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md">
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
