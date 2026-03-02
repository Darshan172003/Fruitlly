import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  MdFactory, 
  MdSecurity, 
  MdInventory2, 
  MdCheckCircle, 
  MdCategory 
} from 'react-icons/md';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto w-full px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8 order-2 lg:order-1"
          >
            <div className="flex flex-col gap-4">
              <span className="text-primary font-bold tracking-widest text-sm uppercase">By Tulsi Foods</span>
              <h1 className="text-text-dark text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                Sugar Coated Jelly Cubes for <span className="text-primary">Bulk Supply</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                Fruitlly by Tulsi Foods – Your reliable B2B jelly manufacturer providing premium quality, consistent taste, and worldwide distribution.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold shadow-lg hover:brightness-110 transition-all">
                View Products
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-accent-green text-white text-base font-bold shadow-lg hover:brightness-110 transition-all"
              >
                Contact for Bulk Orders
              </button>
            </div>
            <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">500+</span>
                <span className="text-xs text-gray-500 uppercase font-semibold">Bulk Clients</span>
              </div>
              <div className="w-[1px] h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">20+</span>
                <span className="text-xs text-gray-500 uppercase font-semibold">Flavors</span>
              </div>
              <div className="w-[1px] h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">ISO</span>
                <span className="text-xs text-gray-500 uppercase font-semibold">Certified</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-[2.5rem] shadow-2xl z-10 relative overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvWCH6rfjHZRKDQhulR9UQmT7-UApNE1kNjh3_8A8exAspvy7639Pg42KMZo05f-zznIShvgzTyT7C0dN3Gxc3HEF_Mxg1eq4ro8UfkTLWKoTb40m3Nxw-JC02zhkTxsNM8_Qj6NPgfF-753RkPqxj8kiYbA-3BklenZQ1FUx0aDuL41z2rDjdtlNLb-lQfBYbKM0kTHz6-tm6-TnoUYI4Xn_vvxcfXycfSrxwZxcLGH4U1jKhQ1fA_nZXjkjF47S2x1RxmGLcbYK4" 
                  alt="Jelly Cubes" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-green/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Product Section */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col gap-2 mb-10">
            <h2 className="text-text-dark text-3xl font-bold tracking-tight">Our Core Product</h2>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          </div>
          <div className="flex flex-col lg:flex-row items-center rounded-[2rem] overflow-hidden shadow-xl bg-white border border-gray-100">
            <div className="w-full lg:w-1/2 aspect-video bg-center bg-no-repeat bg-cover">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxK8xezJWXTuNTQs6ACB0pxRw20QD2RlSXRgGZkLrujZ8oMeYEi1tuQa4fKhwD4E-vvkeql2fwEVSlhtzOT03HAxLqRpR5nb6_r4GZXTMuWtvJgTNpGVBe0riVHtCRhZixAIoD_IyfYEwQPq5_P5HH3igDVK4PtyAIt5fVNdirYEtiSs565TMKWH9nXH-TZs5VDCYCebGMDWiqwgH3ZKdB-hNyFTZiT3UxvWos2X9yDmOkLG3VGxp3yzDlGag7KkAdi4cqD9pwnC3_" 
                alt="Signature Jelly Cubes" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex w-full lg:w-1/2 flex-col gap-6 p-8 lg:p-12">
              <div className="flex flex-col gap-3">
                <h3 className="text-text-dark text-2xl lg:text-3xl font-bold leading-tight">Signature Sugar Coated Jelly Cubes</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Experience the perfect blend of sweetness and texture. Our signature recipe ensures a soft, chewy center with a satisfying sugary crunch on the outside.
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-accent-green"><MdCheckCircle size={20} /></span>
                  Ideal for retail packaging & confectionery mixes
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-accent-green"><MdCheckCircle size={20} /></span>
                  Premium dessert toppings for commercial use
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-accent-green"><MdCheckCircle size={20} /></span>
                  Customizable colors and flavors for bulk orders
                </li>
              </ul>
              <button className="flex w-fit min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-primary text-white text-sm font-bold shadow-md hover:brightness-110 transition-all">
                Learn More Product Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Focus Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <h2 className="text-text-dark text-3xl md:text-4xl font-bold tracking-tight">B2B Focus & Manufacturing Excellence</h2>
            <p className="text-gray-600 max-w-2xl">
              We pride ourselves on being more than just a supplier; we are your strategic manufacturing partner for high-quality jelly confections.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <MdFactory size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">Bulk Manufacturing</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                High-capacity production lines capable of handling large-scale orders with consistent lead times.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center text-accent-green mb-6">
                <MdCategory size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">Consistent Taste</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Advanced quality control ensuring every batch matches your specific flavor profile and texture requirements.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <MdSecurity size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">Hygiene First</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                State-of-the-art facility following international food safety standards (ISO/HACCP certified).
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center text-accent-green mb-6">
                <MdInventory2 size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">Flexible Packaging</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Custom wholesale packaging options from bulk cartons to private label retail-ready solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1200px] mx-auto w-full px-6 py-16">
        <div className="bg-primary rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col gap-4 text-white">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to scale your supply?</h2>
            <p className="text-white/80 text-lg max-w-md">Join hundreds of retail partners worldwide who trust Fruitlly for their confectionery needs.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Request Wholesale Catalog
            </button>
            <button className="bg-black/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-black/30 transition-colors">
              Speak to an Agent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
