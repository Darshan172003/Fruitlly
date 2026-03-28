/**
 * SEO metadata configuration for every public page on fruitlly.com.
 *
 * Usage:
 *   import { getPageSeo } from '../lib/seo';
 *   const seo = getPageSeo('home');
 *   // Then pass seo.title, seo.description, seo.canonical, seo.schema to <SeoHead />
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
    ],
  };
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
  // These MUST match the actual FAQ content on the page.
  // Update whenever FAQ entries change.
  const faqs = [
    {
      q: 'What is the shelf life of Fruitlly fruit jelly cubes?',
      a: 'Yes, Fruitlly fruit jelly cubes offer a shelf life of up to 12 months when stored in cool, dry conditions. Every batch undergoes strict quality testing to ensure consistent taste and freshness throughout the shelf life period.',
    },
    {
      q: 'Are Fruitlly jelly colors and flavors natural?',
      a: 'Fruitlly jelly products are made using approved food ingredients and fruit flavors such as mango, strawberry, litchi, and mix fruit for consistent taste and color.',
    },
    {
      q: 'Do sugar coated jelly cubes clump in humidity?',
      a: 'Proper packaging and storage help maintain the texture of jelly cubes. Products should be stored in dry conditions away from moisture and heat.',
    },
    {
      q: 'What is the Minimum Order Quantity (MOQ)?',
      a: 'Bulk orders are supported for distributors and wholesalers, with packaging options designed for large-scale supply and distribution. Contact our sales team for specific MOQ details.',
    },
    {
      q: 'Can we request custom fruit jelly flavors or shapes?',
      a: 'Yes, fruit jelly and confectionery products are available in multiple flavors such as mango, guava, strawberry, and mix fruit. Custom flavors and private label options can be arranged for bulk orders.',
    },
    {
      q: 'What are the standard packaging sizes available?',
      a: 'Products are typically packed in secure boxes or containers suitable for storage, transport, and bulk distribution. Standard options include pouches, jars, and cartons.',
    },
    {
      q: 'Does Fruitlly ship fruit jelly internationally?',
      a: 'Yes, Tulsi Foods supports bulk supply and distribution across different international markets through reliable logistics partners.',
    },
    {
      q: 'Do you provide food safety certificates with shipments?',
      a: 'Yes, production follows strict hygiene and quality standards. Food safety documentation is provided with bulk shipments upon request.',
    },
    {
      q: 'Can you support custom labeling for regulatory markets?',
      a: 'Yes, custom packaging and labeling options can be arranged for distributors and private-label partners to meet regional regulatory requirements.',
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
        addressLocality: 'Jalgaon',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      seller: { '@type': 'Organization', name: 'Fruitlly by Tulsi Foods' },
    },
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };
