/**
 * prerender.ts
 *
 * Run AFTER `vite build`. This script:
 *   1. Spins up a local static server serving the built dist/
 *   2. Uses Puppeteer to visit each public route
 *   3. Waits for React to render, then saves the full HTML
 *   4. Overwrites dist/index.html for each route with prerendered HTML
 *
 * The result: Googlebot gets fully rendered HTML with meta tags, schema,
 * content — no JavaScript execution needed on their end.
 *
 * Usage:
 *   cd frontend
 *   npm run build
 *   npx tsx scripts/prerender.ts
 *
 * Or add to package.json scripts:
 *   "build:seo": "vite build && tsx scripts/prerender.ts"
 */

import { execSync } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

// All public routes to prerender.
// Product detail and blog detail pages are dynamic — handled separately
// via the Firestore-based sitemap generator (Phase 3).
const STATIC_ROUTES = [
  '/',
  '/about',
  '/products',
  '/contact',
  '/blog',
  '/recipes',
  '/faq',
  '/privacy-policy',
  '/terms-and-conditions',
];

const PORT = 4173;

// Simple static file server for the dist directory
function createStaticServer(): http.Server {
  return http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url || '/');

    // SPA fallback: if the path doesn't match a real file, serve index.html
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.woff2': 'font/woff2',
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
}

async function prerender() {
  // Check if Puppeteer is available
  let puppeteer: any;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    console.error(
      '\n❌ Puppeteer not found. Install it:\n\n' +
      '   npm install -D puppeteer\n\n' +
      'Then run this script again.\n'
    );
    process.exit(1);
  }

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  console.log('\n🔧 Starting prerender for Fruitlly SEO...\n');

  // Start local server
  const server = createStaticServer();
  await new Promise<void>((resolve) => server.listen(PORT, resolve));
  console.log(`   Static server running on http://localhost:${PORT}`);

  // Launch headless browser
  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results: { route: string; status: string }[] = [];

  for (const route of STATIC_ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    const page = await browser.newPage();

    try {
      // Navigate and wait for network to settle
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Wait a bit for React to finish rendering (helmet, dynamic content)
      await page.waitForSelector('title', { timeout: 5000 }).catch(() => {});
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Get the full rendered HTML
      const html = await page.content();

      // Determine output path
      const outputDir = route === '/'
        ? DIST_DIR
        : path.join(DIST_DIR, route);

      // Create directory if needed
      if (route !== '/') {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const outputFile = path.join(outputDir, 'index.html');
      fs.writeFileSync(outputFile, html, 'utf-8');

      results.push({ route, status: '✅ Prerendered' });
      console.log(`   ✅ ${route} → ${path.relative(DIST_DIR, outputFile)}`);

    } catch (error: any) {
      results.push({ route, status: `❌ Failed: ${error.message}` });
      console.error(`   ❌ ${route} → ${error.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log('\n📊 Prerender Summary:');
  console.log(`   Total routes: ${STATIC_ROUTES.length}`);
  console.log(`   Successful:   ${results.filter(r => r.status.startsWith('✅')).length}`);
  console.log(`   Failed:       ${results.filter(r => r.status.startsWith('❌')).length}`);
  console.log('\n✅ Prerendering complete. Deploy dist/ to Firebase Hosting.\n');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
