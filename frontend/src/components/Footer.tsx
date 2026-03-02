import React from 'react';
import { MdSend } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-white py-12 border-t border-gray-100">
    <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
              <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-text-dark text-lg font-bold">Fruitlly</h2>
        </div>
        <p className="text-sm text-gray-500">Premium sugar coated jelly manufacturer by Tulsi Foods. Quality in every bite.</p>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-bold">Support</h4>
        <ul className="text-sm text-gray-500 space-y-2">
          <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
          <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
          <li><Link to="/products" className="hover:text-primary">Products</Link></li>
          <li><Link to="/recipes" className="hover:text-primary">Recipes</Link></li>
          <li><Link to="/shipping" className="hover:text-primary">Shipping</Link></li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-bold">Legal</h4>
        <ul className="text-sm text-gray-500 space-y-2">
          <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
          <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-bold">Newsletter</h4>
        <p className="text-sm text-gray-500">Get updates on new product launches.</p>
        <div className="flex gap-2">
          <input className="bg-gray-100 border-none rounded-lg px-4 py-2 text-sm w-full" placeholder="Email address" type="email"/>
          <button className="bg-primary text-white p-2 rounded-lg">
            <MdSend size={16} />
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-[1200px] mx-auto px-6 pt-12 mt-12 border-t border-gray-100 text-center text-xs text-gray-400">
      © 2024 Fruitlly by Tulsi Foods. All rights reserved.
    </div>
  </footer>
);

export default Footer;
