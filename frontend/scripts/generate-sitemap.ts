/**
 * generate-sitemap.ts
 *
 * Generates sitemap.xml at build time by querying Firestore for all
 * published products and blog posts. Run after `vite build` and
 * before deploying.
 *
 * Prerequisites:
 *   - Firebase Admin SDK OR a service account key
 *   - Since this runs at build time (not in browser), we use the
 *     Firebase REST API with the project ID from env vars.
 *
 * For simplicity, this script uses the Firestore REST API (no Admin SDK needed).
 * Set VITE_FIREBASE_PROJECT_ID in your .env file.
 *
 * Usage:
 *   npx tsx scripts/generate-sitemap.ts
 *
 * Or chain with build:
 *   "build:seo": "vite build && tsx scripts/generate-sitemap.ts && tsx scripts/prerender.ts"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const SITE_URL = 'https://fruitlly.com';

// Read project ID from .env file
function getProjectId(): string {
  const envPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found. Cannot read VITE_FIREBASE_PROJECT_ID.');
    process.exit(1);
  }
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/VITE_FIREBASE_PROJECT_ID=(.+)/);
  if (!match || !match[1].trim()) {
    console.error('❌ VITE_FIREBASE_PROJECT_ID not found in .env');
    process.exit(1);
  }
  return match[1].trim();
}

// Fetch documents from Firestore REST API (no auth needed for public collections)
async function fetchFirestoreCollection(projectId: string, collectionPath: string): Promise<any[]> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionPath}?pageSize=500`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`   ⚠️  Could not fetch ${collectionPath}: ${response.status} ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    return data.documents || [];
  } catch (error: any) {
    console.warn(`   ⚠️  Error fetching ${collectionPath}: ${error.message}`);
    return [];
  }
}

// Extract document ID from Firestore REST API document name
function getDocId(doc: any): string {
  const name: string = doc.name || '';
  return name.split('/').pop() || '';
}

// Static routes that always exist
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/products', changefreq: 'weekly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/recipes', changefreq: 'weekly', priority: '0.7' },
  { path: '/faq', changefreq: 'monthly', priority: '0.6' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-and-conditions', changefreq: 'yearly', priority: '0.3' },
];

function buildUrlEntry(urlPath: string, changefreq: string, priority: string): string {
  return `  <url>
    <loc>${SITE_URL}${urlPath}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generateSitemap() {
  console.log('\n🗺️  Generating sitemap.xml...\n');

  const projectId = getProjectId();
  console.log(`   Project: ${projectId}`);

  const entries: string[] = [];

  // Add static routes
  for (const route of STATIC_ROUTES) {
    entries.push(buildUrlEntry(route.path, route.changefreq, route.priority));
  }
  console.log(`   ✅ ${STATIC_ROUTES.length} static routes added`);

  // Fetch categories (top-level product documents)
  const categories = await fetchFirestoreCollection(projectId, 'products');
  console.log(`   📦 Found ${categories.length} product categories`);

  // Fetch products for each category
  let productCount = 0;
  for (const category of categories) {
    const categoryId = getDocId(category);
    if (!categoryId) continue;

    const products = await fetchFirestoreCollection(projectId, `products/${categoryId}/items`);
    
    for (const product of products) {
      const productId = getDocId(product);
      if (!productId) continue;

      entries.push(buildUrlEntry(`/products/${categoryId}/${productId}`, 'weekly', '0.7'));
      productCount++;
    }
  }
  console.log(`   ✅ ${productCount} product pages added`);

  // Fetch blog posts
  const blogs = await fetchFirestoreCollection(projectId, 'blogs');
  for (const blog of blogs) {
    const blogId = getDocId(blog);
    if (!blogId) continue;
    entries.push(buildUrlEntry(`/blog/${blogId}`, 'monthly', '0.6'));
  }
  console.log(`   ✅ ${blogs.length} blog pages added`);

  // Build sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  // Write to both dist/ and public/ (so next build also has it)
  const distSitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  const publicSitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');

  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(distSitemapPath, sitemap, 'utf-8');
    console.log(`\n   📄 Written to dist/sitemap.xml`);
  }

  fs.writeFileSync(publicSitemapPath, sitemap, 'utf-8');
  console.log(`   📄 Written to public/sitemap.xml`);

  const totalUrls = STATIC_ROUTES.length + productCount + blogs.length;
  console.log(`\n✅ Sitemap generated with ${totalUrls} URLs total.\n`);
}

generateSitemap().catch((err) => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
