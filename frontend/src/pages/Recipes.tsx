import React from 'react';
import { motion } from 'motion/react';
import { MdRestaurantMenu, MdTimer, MdBarChart } from 'react-icons/md';
import VideoPlayer from '../components/VideoPlayer';

const recipes = [
  {
    id: '1',
    title: 'Gourmet Jelly Dessert Cups',
    description: 'Learn how to create stunning layered jelly dessert cups using Fruitlly sugar-coated cubes and fresh seasonal fruits.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC3rtQa4Jz_BZHDKB9clnn5ZXU-7rd0e_EyIfKrjENx8VcjapYJWgUQRKS6xmeDwZs5Q2i2fYjm8C-wpZJejL1zYvO2RH0mcItEKAm3xaTkPVgz0wC8IOp8Rf3TPW0DqBIaWCyQvncQVin-fmPU4vI7xCBpG2EpgkPt7XONj_I_LR_uBQxSoM8vNKVshXEaw6aFteKbgVCoZKyiqXX7QCIrjRSmZDJV2r6VsT0KprX8ksSYgEnXMGKVgxv3eTPrxFPtN0GN0c1l6R9',
    duration: '15 mins',
    difficulty: 'Easy',
    category: 'Desserts'
  },
  {
    id: '2',
    title: 'Premium Ice Cream Toppings',
    description: 'Elevate your ice cream parlor menu by incorporating Fruitlly jelly cubes as a crunchy, colorful, and high-margin topping.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANoVvrm955kHbmvsjdoXJ7TCrZ0l_5EimdtKk4bpB_ACwXIEUhpw5whhzrt9EYkknsMHwujgB256PaUOfBEfQNvgNPeUB-woIBZKLez4-UyGAMZaAmsmP1_oWJcfrFV9bbGVlpvDjJ0yrN2vbx6T-ueXszhcL8lllCymh-MYEOZl3QYtPKzK_bRRNizFdo8GMDmArit9wKQUW3PLZJ04CahOG8rYLy1UX_qIStFhxOaztZDYGJH_Y_BYfrQlBD7zb7AePH5ianuIca',
    duration: '5 mins',
    difficulty: 'Quick',
    category: 'Toppings'
  },
  {
    id: '3',
    title: 'Signature Party Jelly Mix',
    description: 'A guide for event planners on creating the perfect bulk assorted mix for large-scale celebrations and corporate events.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbrVBXyPLTUXcp7JB8IrlTWD_i2DzaVIGhZLDd2TPDn9mUPqGZwwI82pXDF1f-BhM4wlbo_MTTCmFnpfSXCQRs6YGMHg8NBP_A0FaXGzzRfO1PtQgn_GorpMHpe_iHKHBzuHFoL2zN2mrxbPVrN1MWLhWIoG1F5diT4hukJnbgEUUiNYYOpbsPgQpT_vKl4xGGTM62g_obO22Z8ApXEwwQ_VMpcgazMEy4MlO1IafJSJ7_a6Rb3z6ysfF-9r5JMrSAH009OzpXYHec',
    duration: '10 mins',
    difficulty: 'Bulk',
    category: 'Party Mix'
  },
  {
    id: '4',
    title: 'Kids Playful Dessert Bowls',
    description: 'Creative and fun ways to present jelly treats for children\'s retail sections and family-friendly restaurants.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9QkBM2WBBxxAcV0GYEUZ5z4Yzva8OjL1TuLXhajibyQsdAM5EeKPrJ575HwPkoxuxh9sHIz-OrQfqPsApf2WFrJxRWdlnqx3mrriioEzEdmsAHa5mrGsNbUKDToB29P1xTtYcIrPdfELp2m_tM0mZFMe8eeeN5Wm0Fj8TajkTIq0SFZ1uAb2piCGxPXuyXTC0iUQpZxog4zhs_ijpeAvC4DajBAUEeilVTll7QUz2hV4_FzbTS3YpsIY72sXibELXOg8HkD3MFMaY',
    duration: '20 mins',
    difficulty: 'Fun',
    category: 'Retail'
  },
  {
    id: '5',
    title: 'Sparkling Jelly Mocktails',
    description: 'Add a pop of color and texture to your beverage menu with these refreshing sparkling mocktails featuring Fruitlly cubes.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/fruitlly-mocktail/800/600',
    duration: '8 mins',
    difficulty: 'Creative',
    category: 'Beverages'
  },
  {
    id: '6',
    title: 'Artisanal Pastry Garnish',
    description: 'Professional tips for pastry chefs on using sugar-coated jelly cubes as a sophisticated garnish for cakes and tarts.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/fruitlly-pastry/800/600',
    duration: '12 mins',
    difficulty: 'Pro',
    category: 'Pastry'
  }
];

const Recipes = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col flex-1 bg-slate-50"
    >
      {/* Hero Section */}
      <section className="bg-white py-16 px-4 md:px-10 lg:px-40 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6 text-center items-center">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Culinary Inspiration</span>
          <h1 className="text-slate-900 text-4xl md:text-6xl font-black leading-tight tracking-tight font-display">
            Fruitlly Recipe Gallery
          </h1>
          <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            Discover creative ways to incorporate our premium sugar-coated jelly cubes into your menu. Watch our video guides for professional results.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16 px-4 md:px-10 lg:px-40">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <motion.div 
                key={recipe.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col h-full"
              >
                {/* Custom Video Player */}
                <VideoPlayer 
                  url={`https://www.youtube.com/watch?v=${recipe.youtubeId}`}
                  thumbnail={recipe.thumbnail}
                  title={recipe.title}
                />

                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg">
                      {recipe.category}
                    </span>
                    <div className="flex gap-3 text-slate-400">
                      <div className="flex items-center gap-1">
                        <MdTimer size={14} />
                        <span className="text-[10px]">{recipe.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdBarChart size={14} />
                        <span className="text-[10px]">{recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <h3 className="text-slate-900 text-xl font-bold leading-tight hover:text-primary transition-colors cursor-pointer">
                      {recipe.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {recipe.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-slate-400 text-xs italic">
                      Watch the video above for the full guide
                    </span>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <MdRestaurantMenu size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Recipe CTA */}
      <section className="py-20 px-4 md:px-10 lg:px-40 bg-white">
        <div className="max-w-[1200px] mx-auto bg-slate-900 rounded-[40px] p-12 md:p-20 text-center items-center flex flex-col gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-green/20 rounded-full blur-[80px] -ml-32 -mb-32"></div>
          
          <h2 className="text-white text-3xl md:text-5xl font-black font-display relative z-10">Need a Custom Recipe?</h2>
          <p className="text-slate-400 text-lg max-w-[600px] relative z-10">
            Our culinary team can help you develop exclusive jelly-based products and recipe cards for your private label or retail chain.
          </p>
          <button className="bg-primary hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 relative z-10">
            Inquire for Custom Development
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default Recipes;
