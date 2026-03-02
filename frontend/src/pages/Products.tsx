import React from 'react';
import { motion } from 'motion/react';
import { Package, ShieldCheck, Truck, FlaskConical, Download, Mail, Search } from 'lucide-react';

const Products = () => {
  const productFeatures = [
    {
      title: "Premium Sugar Coating",
      description: "Fine granulated coating for a satisfying crunch and sweet finish.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_TVdlDxCmpzRfddV-x-96rsmPODnqEbT-8-Q1wRHbN0P8OSRX4GQHdoO7123TQNjb5rGeWEx3U5FF-MLbdmJFBvKAoyMtzsoma4fmYZ72COP9Ah-nG14R1DuIawKNnk8GjNOoAunTAvWTCGsb9aMOC7oB-7I2m_KFNZ7Rb9kNmX2T-8P9YVW3dMD9P6D-FxIInLstzN6jjDq_XWb95Rw4ZDgn4hPPkW3znAT85fqdipCPkCyDB6THSLaKmvwoDCVbNsBwQDdWXxwF"
    },
    {
      title: "Multiple Flavors & Colors",
      description: "Available in strawberry, orange, lemon, and lime assortments.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA12WQTi3UJg-rKbX1pMHruMDjdnaywT246pId1_kmkoGGH5KYgd_DWIe-pKJVCgjZEymaBbWw6BJJ7z8y5zoYVHE8hiZEw4L3yCvk6NCdMr2Upj8Pvpxb_oaJD8m2ln-i-roEEpKTstIN0QtIdMJXhKrbptDsOB1vV-HnfymekwHcedMElxqmC_UpyQ-c4GUoMT86mqoKTHMXbCNT1TJvupH7gkEYaLEwlg1UQR5cMuvqxlsAOz3MlPq7zYcifcYpxBDp3UkFhey5"
    },
    {
      title: "B2B Ready Supply",
      description: "Optimized for high-volume orders with consistent batch quality.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXqxFBoHjmleCqNzTq9MfPBkAU3vkr_Zaatwylk-AE8YSHOMwrSGlwqin79OGK_qyjJW8fWZNUdemUxEe8_0P7knJBwgqPz_JLcB6V1BPYnFh2t74J8UPhg3hyzCfGBBA-pcohiYllgixanpV925goiDZBtF8fqagraEWcxIYylHTVgUpXxh8bQ68piAEok-j3Qt93n6_RWUFZVkJkb4Xbx3E07DbWSvMbwyiaI0CsLPBH_JUiwIo1x_zzG9XuBf0bMeVwUsi1alwC"
    },
    {
      title: "Professional FMCG Grade",
      description: "Compliant with international food safety and hygiene standards.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNdtyE0jmHpqbw_iU726iX6LU1bqG1I00wfg1ssgR8pyJ46-iITKV_VNxeY8jYbpk1y6qSm7r9ZM4MJhDET3_4pwFnu1z17Gt_7UCV8bLku6ecnIb4NKmsVbCGWKdlEe20RAaAg1aCa1aZifFI2rGPW9aa0uc2-YRho8s1SdbNXxj4O-5r04rgiq-t5BzxIx0uWrGsHGR8hNYAcLf6l4Kzt6RGzxOKV2DlkXs9uIhhvTqmjzuEeRY9GmfIifMJYmyH0zt0KCJgF6dW"
    }
  ];

  const specs = [
    {
      label: "Ingredients",
      value: "Sugar, Natural Fruit Pulp, Pectin, Citric Acid, Food Grade Stabilizers, Permitted Synthetic Colors"
    },
    {
      label: "Texture Profile",
      value: "Dual-texture: Soft, melt-in-mouth pectin center with a crystal sugar exterior coating."
    },
    {
      label: "Bulk Packaging",
      value: "5kg Laminated Bags, 20kg Master Cartons, Custom Private Labeling (OEM) Options."
    },
    {
      label: "Shelf Life & Storage",
      value: "12 Months from manufacture. Store in cool, dry place away from direct sunlight."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
              Premium Confectionery
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Sugar Coated Jelly Cubes
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Wholesale confectionery supply for retailers and distributors worldwide by Tulsi Foods.
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            Inquire for Bulk Supply
          </motion.button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
              <Package className="text-primary" />
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {specs.map((spec, index) => (
                <div key={index} className="border-t border-slate-100 pt-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    {spec.label}
                  </span>
                  <p className="text-lg font-medium text-slate-800 leading-relaxed">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale Catalog CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-primary/5 rounded-[2rem] p-8 md:p-16 border border-primary/10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl font-bold text-primary mb-6">Request a Wholesale Catalog</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Interested in exploring our full range of confectionery products? Get in touch for our 
              latest product catalog, certifications, and volume-based pricing structures for global 
              distribution.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              <Download size={20} />
              Download PDF
            </button>
            <button className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all">
              <Mail size={20} />
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
