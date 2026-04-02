/**
 * prerender.ts — PHASE 9 FIX v2
 *
 * Root cause of the /products and /blog timeout:
 *   The Products page uses onSnapshot() which creates a persistent
 *   WebSocket connection to Firestore. The "networkidle0" wait strategy
 *   waits for ZERO open connections, which never happens because the
 *   WebSocket stays open. Result: 30s timeout.
 *
 * Fix: Use "networkidle2" (allows 2 open connections) for pages that
 *   use Firestore real-time listeners, and wait for content selectors.
 *
 * Usage:
 *   cd frontend
 *   npm run build:seo
 */

import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

const ROUTES: Array<{
  path: string;
  usesFirestore?: boolean;
  readySelector?: string;
  contentCheck?: string;
  minOccurrences?: number;
  maxWait?: number;
}> = [
    // Static pages — no Firestore, networkidle0 is fine
    { path: '/' },
    { path: '/about' },
    { path: '/contact' },
    { path: '/faq' },
    { path: '/privacy-policy' },
    { path: '/terms-and-conditions' },

    // Firestore-dependent pages — use networkidle2 + smart selectors
    {
      path: '/products',
      usesFirestore: true,
      readySelector: 'a[href^="/products/"] img',
      contentCheck: 'href="/products/',
      minOccurrences: 4,
      maxWait: 15000,
    },
    {
      path: '/blog',
      usesFirestore: true,
      readySelector: 'a[href^="/blog/"]',
      contentCheck: 'href="/blog/',
      minOccurrences: 3,
      maxWait: 15000,
    },
    {
      path: '/recipes',
      usesFirestore: true,
      readySelector: 'iframe, video, [class*="grid"] > div > div',
      maxWait: 10000,
    },
  ];

const PORT = 4173;

function createStaticServer(): http.Server {
  return http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url || '/');

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
      '.woff': 'font/woff',
      '.ttf': 'font/ttf',
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
  let puppeteer: any;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    console.error(
      '\n\u274c Puppeteer not found. Install it:\n\n' +
      '   npm install -D puppeteer\n\n'
    );
    process.exit(1);
  }

  if (!fs.existsSync(DIST_DIR)) {
    console.error('\u274c dist/ directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  console.log('\n\ud83d\udd27 Starting prerender for Fruitlly SEO (v2 \u2014 networkidle2 fix)...\n');

  const server = createStaticServer();
  await new Promise<void>((resolve) => server.listen(PORT, resolve));
  console.log(`   Static server running on http://localhost:${PORT}`);

  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results: { route: string; status: string }[] = [];

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route.path}`;
    const maxWait = route.maxWait || 5000;
    const page = await browser.newPage();

    try {
      // KEY FIX: Use networkidle2 for Firestore pages.
      // onSnapshot() keeps a WebSocket open permanently,
      // so networkidle0 (zero connections) will NEVER resolve.
      // networkidle2 allows up to 2 open connections.
      const waitStrategy = route.usesFirestore ? 'networkidle2' : 'networkidle0';

      console.log(`   \u23f3 ${route.path} \u2014 navigating (${waitStrategy})...`);
      await page.goto(url, { waitUntil: waitStrategy, timeout: 30000 });

      if (route.readySelector) {
        // Wait for Firestore data to render into the DOM
        console.log(`   \u23f3 ${route.path} \u2014 waiting for data...`);

        const selectorFound = await page.waitForSelector(route.readySelector, {
          timeout: maxWait,
        }).then(() => true).catch(() => false);

        if (selectorFound) {
          // Give React a moment to finish re-rendering
          await new Promise((resolve) => setTimeout(resolve, 1500));
          console.log(`   \u2705 ${route.path} \u2014 data loaded successfully`);
        } else {
          console.warn(`   \u26a0\ufe0f  ${route.path} \u2014 data selector not found within ${maxWait}ms`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } else {
        // Static page \u2014 brief wait for React/Helmet
        await page.waitForSelector('title', { timeout: 5000 }).catch(() => { });
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      // Capture HTML
      const html = await page.content();

      // Validate content
      let validationStatus = 'valid';
      if (route.contentCheck && route.minOccurrences) {
        const occurrences = (html.match(new RegExp(route.contentCheck, 'g')) || []).length;
        if (occurrences < route.minOccurrences) {
          validationStatus = 'partial';
          console.warn(`   \u26a0\ufe0f  ${route.path} \u2014 found ${occurrences}x "${route.contentCheck}" (need ${route.minOccurrences}+)`);
        }
      }

      // Write output — save as BOTH formats for Firebase compatibility
      // 1. products/index.html (for directory-style serving)
      // 2. products.html (for cleanUrls resolution)
      const outputDir = route.path === '/'
        ? DIST_DIR
        : path.join(DIST_DIR, route.path);

      if (route.path !== '/') {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Save as directory/index.html
      const outputFile = path.join(outputDir, 'index.html');
      fs.writeFileSync(outputFile, html, 'utf-8');

      // Also save as name.html for Firebase cleanUrls
      if (route.path !== '/') {
        const flatFile = path.join(DIST_DIR, route.path + '.html');
        fs.writeFileSync(flatFile, html, 'utf-8');
      }

      if (validationStatus === 'valid') {
        results.push({ route: route.path, status: '\u2705 Prerendered' });
        console.log(`   \u2705 ${route.path} \u2192 ${path.relative(DIST_DIR, outputFile)}`);
      } else {
        results.push({ route: route.path, status: '\u26a0\ufe0f  Partial content' });
        console.log(`   \u26a0\ufe0f  ${route.path} \u2192 ${path.relative(DIST_DIR, outputFile)} (partial)`);
      }

    } catch (error: any) {
      results.push({ route: route.path, status: `\u274c Failed: ${error.message}` });
      console.error(`   \u274c ${route.path} \u2192 ${error.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log('\n\ud83d\udcca Prerender Summary:');
  console.log(`   Total routes: ${ROUTES.length}`);
  console.log(`   \u2705 Success: ${results.filter(r => r.status.startsWith('\u2705')).length}`);
  console.log(`   \u26a0\ufe0f  Partial: ${results.filter(r => r.status.startsWith('\u26a0\ufe0f')).length}`);
  console.log(`   \u274c Failed:  ${results.filter(r => r.status.startsWith('\u274c')).length}`);

  const failures = results.filter(r => r.status.startsWith('\u274c'));
  if (failures.length > 0) {
    console.log('\n   Troubleshooting failed pages:');
    console.log('   1. Check internet connection (Firestore needs network)');
    console.log('   2. Verify Firestore rules allow public reads');
    console.log('   3. Try running build:seo again');
  }

  console.log('\n\u2705 Prerendering complete. Deploy dist/ to Firebase Hosting.\n');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
