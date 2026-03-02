import React from 'react';
import { motion } from 'motion/react';
import { 
  MdSend, 
  MdLocationOn, 
  MdCorporateFare 
} from 'react-icons/md';

const Contact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1200px] mx-auto px-6 py-12 md:py-20"
    >
      <div className="mb-12">
        <h1 className="text-text-dark text-5xl font-black leading-tight tracking-tight mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg max-w-2xl">Get in touch with Tulsi Foods for premium bulk jelly cube inquiries and customized corporate orders.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Contact Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="text-primary"><MdCorporateFare size={24} /></span>
              Corporate Information
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Company Name</p>
                <p className="text-text-dark text-lg font-semibold">Tulsi Foods</p>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Phone</p>
                <p className="text-text-dark text-lg font-semibold">+91 98765 43210</p>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Email</p>
                <p className="text-text-dark text-lg font-semibold">sales@fruitlly.com</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Office Address</p>
                <p className="text-text-dark text-lg font-semibold leading-relaxed">
                  Plot No. 123, Industrial Area Phase II, <br/>
                  Ahmedabad, Gujarat 380001, India
                </p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden h-64 shadow-md relative group">
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center z-10">
              <div className="text-primary/40 group-hover:scale-110 transition-transform duration-500">
                <MdLocationOn size={64} />
              </div>
            </div>
            <img 
              alt="Map location" 
              className="w-full h-full object-cover opacity-80" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0lk-TbEA6HxQoWv5lAptNxPVuaMGGCfQ0DIECisq4TpO_zBzFhm-GgZQhzDDxOW5KmSjNrEWSs5mzPMurGbMfUq7DZ5NdEPh3QgQBuOoJsHqqaT_yFbqCLCZStqV7AGnivltgOrj4xKKMqBFn2h8oGuBHGsAQ3w6KuqarbAXnZzLt72fTwatv0RRxiqi5aqKzrIzhPnovsvac3S2hmOTlXLOLEutNn8XsIOWgTrH9JmGOZ5dZ-Mziq6kBMHyQlK5xK6NICOQbqj5"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Side: B2B Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-text-dark mb-2">B2B Inquiry Form</h2>
              <p className="text-gray-600">Fill out the form below and our procurement team will contact you within 24 hours.</p>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-text-dark">Company Name</label>
                <input className="w-full h-14 rounded-xl border-gray-200 bg-gray-50 text-text-dark focus:border-primary focus:ring-primary" placeholder="e.g. Reliance Retail" type="text"/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-text-dark">Contact Person</label>
                <input className="w-full h-14 rounded-xl border-gray-200 bg-gray-50 text-text-dark focus:border-primary focus:ring-primary" placeholder="Your Full Name" type="text"/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-text-dark">Phone Number</label>
                <input className="w-full h-14 rounded-xl border-gray-200 bg-gray-50 text-text-dark focus:border-primary focus:ring-primary" placeholder="+91 00000 00000" type="tel"/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-text-dark">Email Address</label>
                <input className="w-full h-14 rounded-xl border-gray-200 bg-gray-50 text-text-dark focus:border-primary focus:ring-primary" placeholder="work@company.com" type="email"/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-text-dark">City</label>
                <input className="w-full h-14 rounded-xl border-gray-200 bg-gray-50 text-text-dark focus:border-primary focus:ring-primary" placeholder="e.g. Mumbai" type="text"/>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-text-dark">Monthly Requirement (in Kgs)</label>
                <select className="w-full h-14 rounded-xl border-gray-200 bg-gray-50 text-text-dark focus:border-primary focus:ring-primary">
                  <option>Less than 500 Kg</option>
                  <option>500 - 2,000 Kg</option>
                  <option>2,000 - 10,000 Kg</option>
                  <option>More than 10,000 Kg</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-text-dark">Message / Custom Requirements</label>
                <textarea className="w-full rounded-xl border-gray-200 bg-gray-50 text-text-dark focus:border-primary focus:ring-primary p-4" placeholder="Tell us more about your specific needs..." rows={4}></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <button className="w-full bg-primary hover:bg-red-700 text-white h-14 rounded-xl text-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2" type="submit">
                  <span>Submit Inquiry</span>
                  <MdSend size={18} />
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">By submitting, you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
