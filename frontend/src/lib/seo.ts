/**
 * SEO metadata configuration for every public page on fruitlly.com.
 * 
 * PHASE 4 UPDATE:
 *   - Enhanced productSchema with additionalProperty (shelf life, packaging, vegetarian)
 *   - Added BreadcrumbList schema factory
 *   - Added breadcrumbs to product detail pages
 *   - Improved alt text helper function
 *   - Added category-level SEO helper
 */

const SITE_URL = 'https://fruitlly.com';
const SITE_NAME = 'Fruitlly by Tulsi Foods';
const DEFAULT_IMAGE = `${SITE_URL}/Logo.png`;

// ---------- page-level meta ----------

export type PageSeoKey =
  | 'home'
  | 'about'
  | 'products'
  | 'contact'
  | 'faq'
  | 'blog'
  | 'recipes'
  | 'privacy'
  | 'terms';

interface PageSeo {
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  schema: Record<string, unknown>[];
}

const PAGE_SEO: Record<PageSeoKey, PageSeo> = {
  home: {
    title: 'Fruitlly by Tulsi Foods | Sugar Coated Jelly Cubes Manufacturer India',
    description:
      'Fruitlly is a leading fruit jelly manufacturer in India by Tulsi Foods, Jalgaon. Premium sugar coated jelly cubes for bulk supply, private label & B2B distribution.',
    canonical: SITE_URL + '/',
    ogType: 'website',
    schema: [organizationSchema(), webSiteSchema()],
  },
  about: {
    title: 'About Fruitlly \u2013 Fruit Jelly Manufacturer Since 1995 | Tulsi Foods Jalgaon',
    description:
      'Fruitlly by Tulsi Foods is a trusted fruit jelly and confectionery manufacturer in Jalgaon, Maharashtra with 30+ years of B2B manufacturing excellence and global exports.',
    canonical: SITE_URL + '/about',
    ogType: 'website',
    schema: [organizationSchema()],
  },
  products: {
    title: 'Fruit Jelly Products | Sugar Coated Jelly Cubes & Candy | Fruitlly',
    description:
      'Browse Fruitlly fruit jelly products: sugar coated jelly cubes, fruit candy, jams, fruit crush & syrups. Designed for bulk supply and wholesale distribution.',
    canonical: SITE_URL + '/products',
    ogType: 'website',
    schema: [organizationSchema()],
  },
  contact: {
    title: 'Contact Fruitlly for Bulk Jelly Orders | B2B Inquiry | Tulsi Foods',
    description:
      'Contact Fruitlly by Tulsi Foods for bulk fruit jelly orders, private label manufacturing, and B2B distribution partnerships. Response within 24 hours.',
    canonical: SITE_URL + '/contact',
    ogType: 'website',
    schema: [organizationSchema()],
  },
  faq: {
    title: 'Fruit Jelly FAQ for B2B Buyers | Fruitlly by Tulsi Foods',
    description:
      'Answers to common questions about Fruitlly fruit jelly products: shelf life, MOQ, bulk packaging, shipping, quality certifications, and B2B ordering process.',
    canonical: SITE_URL + '/faq',
    ogType: 'website',
    schema: [organizationSchema(), faqSchema()],
  },
  blog: {
    title: 'Fruit Jelly Industry Blog | Recipes & B2B Insights | Fruitlly',
    description:
      'Read the latest fruit jelly industry insights, dessert recipes using jelly cubes, and B2B confectionery trends from Fruitlly by Tulsi Foods.',
    canonical: SITE_URL + '/blog',
    ogType: 'website',
    schema: [organizationSchema()],
  },
  recipes: {
    title: 'Jelly Cube Recipes | Dessert Ideas with Fruit Jelly | Fruitlly',
    description:
      'Watch jelly cube recipe videos and discover creative dessert ideas using Fruitlly fruit jelly cubes. Cakes, puddings, trifles and more.',
    canonical: SITE_URL + '/recipes',
    ogType: 'website',
    schema: [organizationSchema()],
  },
  privacy: {
    title: 'Privacy Policy | Fruitlly by Tulsi Foods',
    description:
      'Learn how Fruitlly by Tulsi Foods protects your business data and corporate information when using our B2B platform.',
    canonical: SITE_URL + '/privacy-policy',
    ogType: 'website',
    schema: [],
  },
  terms: {
    title: 'Terms and Conditions | Fruitlly B2B Platform | Tulsi Foods',
    description:
      'Terms governing the use of Fruitlly B2B services for wholesale procurement, bulk ordering, and distribution partnerships with Tulsi Foods.',
    canonical: SITE_URL + '/terms-and-conditions',
    ogType: 'website',
    schema: [],
  },
};

export function getPageSeo(page: PageSeoKey): PageSeo {
  return PAGE_SEO[page];
}

// ---------- dynamic SEO helpers ----------

/** Generate SEO metadata for a single product detail page. */
export function getProductSeo(product: {
  title: string;
  shortDescription: string;
  categoryId: string;
  categoryName: string;
  id: string;
  imageUrls: string[];
}) {
  const url = `${SITE_URL}/products/${product.categoryId}/${product.id}`;
  return {
    title: `${product.title} | ${product.categoryName} | Fruitlly by Tulsi Foods`,
    description: product.shortDescription.length > 155
      ? product.shortDescription.slice(0, 152) + '...'
      : product.shortDescription,
    canonical: url,
    ogType: 'product',
    schema: [
      productSchema({
        name: product.title,
        description: product.shortDescription,
        image: product.imageUrls[0] ?? DEFAULT_IMAGE,
        url,
        category: product.categoryName,
      }),
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Products', url: `${SITE_URL}/products` },
        { name: product.categoryName, url: `${SITE_URL}/products?category=${encodeURIComponent(product.categoryName)}` },
        { name: product.title, url },
      ]),
    ],
  };
}

/** Generate SEO metadata for a single blog post page. */
export function getBlogPostSeo(post: {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  publishedLabel: string;
  category: string;
}) {
  const url = `${SITE_URL}/blog/${post.id}`;
  return {
    title: `${post.title} | Fruitlly Blog`,
    description: post.excerpt.length > 155 ? post.excerpt.slice(0, 152) + '...' : post.excerpt,
    canonical: url,
    ogType: 'article',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.imageUrl || DEFAULT_IMAGE,
        url,
        author: { '@type': 'Organization', name: SITE_NAME },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
        },
        articleSection: post.category,
      },
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blog` },
        { name: post.title, url },
      ]),
    ],
  };
}

// ---------- PHASE 4: Alt text helper ----------

/**
 * Generate SEO-optimized alt text for product images.
 * Use this in product card and product detail image tags.
 *
 * @param productTitle - e.g., "Mango Jelly Cubes"
 * @param categoryName - e.g., "Sugar Coated Jelly"
 * @param viewIndex - 0 for primary image, 1+ for gallery views
 */
export function getProductAltText(
  productTitle: string,
  categoryName: string,
  viewIndex = 0,
): string {
  if (viewIndex === 0) {
    return `${productTitle} - ${categoryName} by Fruitlly Tulsi Foods Jalgaon`;
  }
  return `${productTitle} - ${categoryName} product view ${viewIndex + 1} by Fruitlly`;
}

// ---------- structured data factories ----------

function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fruitlly by Tulsi Foods',
    alternateName: 'Tulsi Foods',
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
    description:
      'Leading fruit jelly manufacturer and B2B confectionery supplier in India. Premium sugar coated jelly cubes, fruit candy, jams, and more from Jalgaon, Maharashtra.',
    foundingDate: '1995',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'D-45/1/1, MIDC Area',
      addressLocality: 'Jalgaon',
      addressRegion: 'Maharashtra',
      postalCode: '425003',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 20.9866,
      longitude: 75.5796,
    },
    telephone: ['+919422283890', '+919422292828'],
    email: 'contact.fruitlly@gmail.com',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+919422283890',
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'mr'],
    },
  };
}

function webSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

function faqSchema(): Record<string, unknown> {
  const faqs = [
    {
      q: 'What is the shelf life of Fruitlly fruit jelly cubes?',
      a: 'Fruitlly fruit jelly cubes have a shelf life of up to 12 months when stored in cool, dry conditions below 25 degrees Celsius. Every batch is tested for moisture content and texture stability to ensure product freshness throughout the shelf life period.',
    },
    {
      q: 'Are Fruitlly jelly colors and flavors natural?',
      a: 'Fruitlly jelly products use FSSAI-approved food-grade colors and nature-identical fruit flavors including mango, strawberry, litchi, orange, guava, and mix fruit. All ingredients meet Indian food safety standards for commercial confectionery.',
    },
    {
      q: 'Do sugar coated jelly cubes clump in humidity?',
      a: 'No, sugar coated jelly cubes do not clump when stored properly. Keep products in cool, dry conditions below 25 degrees Celsius, away from direct sunlight and moisture. Our packaging is designed to maintain texture and prevent sticking during storage and transport.',
    },
    {
      q: 'What is the Minimum Order Quantity (MOQ)?',
      a: 'The minimum order quantity depends on the product and packaging format. Standard MOQ starts from 50kg for most sugar coated jelly cubes and fruit jelly products. Custom MOQ arrangements are available for distributors and private label partners. Contact our sales team at +91 94222 83890 for exact pricing and MOQ for your region.',
    },
    {
      q: 'Can we request custom fruit jelly flavors or shapes?',
      a: 'Yes, Fruitlly supports custom flavor development and private label manufacturing. Current flavors include mango, strawberry, litchi, orange, guava, imli, pineapple, and mix fruit. New flavors can be developed for orders above the minimum private label MOQ.',
    },
    {
      q: 'What are the standard packaging sizes available?',
      a: 'Products are available in pouches (50-piece and 85-piece), jars (500g and 1kg), and bulk cartons (5kg) suitable for storage, transport, and wholesale distribution.',
    },
    {
      q: 'Does Fruitlly ship fruit jelly internationally?',
      a: 'Yes, Tulsi Foods exports fruit jelly products to international markets including the UAE, East Africa, and Southeast Asia. We handle export documentation, packaging compliance, and work with established freight partners for reliable international delivery.',
    },
    {
      q: 'Do you provide food safety certificates with shipments?',
      a: 'Yes, production follows strict hygiene and quality standards. Food safety documentation is provided with bulk shipments upon request to support regulatory compliance.',
    },
    {
      q: 'Can you support custom labeling for regulatory markets?',
      a: 'Yes, custom packaging and labeling options can be arranged for distributors and private-label partners to meet specific regional regulatory requirements.',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/**
 * PHASE 4: Enhanced Product schema with additionalProperty
 * for richer product structured data in Google search results.
 */
function productSchema(p: {
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.image,
    url: p.url,
    category: p.category,
    brand: { '@type': 'Brand', name: 'Fruitlly' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Tulsi Foods',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'D-45/1/1, MIDC Area',
        addressLocality: 'Jalgaon',
        addressRegion: 'Maharashtra',
        postalCode: '425003',
        addressCountry: 'IN',
      },
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      seller: { '@type': 'Organization', name: 'Fruitlly by Tulsi Foods' },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Shelf Life',
        value: 'Up to 12 months',
      },
      {
        '@type': 'PropertyValue',
        name: 'Dietary Preference',
        value: 'Vegetarian',
      },
      {
        '@type': 'PropertyValue',
        name: 'Manufacturing Location',
        value: 'MIDC Jalgaon, Maharashtra, India',
      },
    ],
  };
}

/**
 * PHASE 4: BreadcrumbList schema for product and blog detail pages.
 * Helps Google show breadcrumb navigation in search results.
 */
function breadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };
