import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/Logo.png';

const Footer = () => {
  const CurrentYear = new Date().getFullYear();

  return (
  <footer className="bg-white py-10 sm:py-12 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:flex-wrap gap-10 sm:gap-12">
      <div className="flex flex-col gap-4 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2.25rem)]">
        <Link to="/" className="inline-flex items-center">
          <img
            src={LogoImage}
            alt="Fruitlly logo"
            className="h-10 w-auto sm:h-12"
            referrerPolicy="no-referrer"
          />
        </Link>
        <p className="text-sm text-gray-500">Premium sugar coated jelly manufacturer by Tulsi Foods. Quality in every bite.</p>
        <p className="text-sm text-gray-500">GSTIN: 27AANFT0134D1ZF</p>
      </div>
      <div className="flex flex-col gap-4 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2.25rem)]">
        <h4 className="font-bold">Quick Links</h4>
        <ul className="text-sm text-gray-500 space-y-2">
          <li><Link to="/process" className="hover:text-primary">Our Process</Link></li>
          <li><Link to="/bulk" className="hover:text-primary">Bulk Orders</Link></li>
          <li><Link to="/export" className="hover:text-primary">Export Inquiry</Link></li>
          <li><Link to="/certifications" className="hover:text-primary">Certifications</Link></li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2.25rem)]">
        <h4 className="font-bold">Products</h4>
        <ul className="text-sm text-gray-500 space-y-2">
          <li><Link to="/products/jelly-cubes" className="hover:text-primary">Fruit Jelly Candy</Link></li>
          <li><Link to="/products/fruit-bites" className="hover:text-primary">Jelly Cubes</Link></li>
          <li><Link to="/products/gummy-mixes" className="hover:text-primary">Jams</Link></li>
          <li><Link to="/products/custom" className="hover:text-primary">Fruit Crush</Link></li>
          <li><Link to="/products/custom" className="hover:text-primary">Fruit Syrup</Link></li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2.25rem)]">
        <h4 className="font-bold">Contact Details</h4>
        <ul className="text-sm text-gray-500 space-y-3">
          <li>
            <span className="block text-xs font-semibold uppercase tracking-wide text-text-dark mb-1">Email</span>
            <div className="flex flex-col gap-1">
              <a href="mailto:contact.fruitlly@gmail.com" className="hover:text-primary break-all">contact.fruitlly@gmail.com</a>
              <a href="mailto:tulsifoods@yahoo.com" className="hover:text-primary break-all">tulsifoods@yahoo.com</a>
            </div>
          </li>
          <li>
            <span className="block text-xs font-semibold uppercase tracking-wide text-text-dark mb-1">Mobile</span>
            <div className="flex flex-col gap-1">
              <a href="tel:+919422283890" className="hover:text-primary break-all">+91 94222 83890</a>
              <a href="tel:+919422292828" className="hover:text-primary break-all">+91 94222 92828</a>
            </div>
          </li>
          <li>
            <span className="block text-xs font-semibold uppercase tracking-wide text-text-dark mb-1">Address</span>
            <a href="https://maps.app.goo.gl/ycWrZgHxGRroWHCa8?g_st=aw" target="_blank" rel="noopener noreferrer" className="hover:text-primary break-all">Tulsi Foods, D-45/1/1, MIDC Area, <br /> Jalgaon – 425003, Maharashtra, India</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 mt-10 border-t border-gray-100 text-center text-xs text-gray-400">
      © {CurrentYear} Fruitlly by Tulsi Foods. All rights reserved.
    </div>
  </footer>
  )
};

export default Footer;
