/**
 * Automated screenshot capture using Puppeteer
 * Run: npx puppeteer browsers install chrome && node docs/capture-screenshots.mjs
 */
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'screenshots');

const ROUTES = [
  { name: '01-home',           path: '/',                 title: 'Home — Quick Track Portal' },
  { name: '02-shipments-list', path: '/shipments',        title: 'Shipments Listing Dashboard' },
  { name: '03-shipment-detail',path: '/shipments/MFX-2026-BKC-00142', title: 'Shipment Detail & POD' },
  { name: '04-booking-form',   path: '/book',             title: 'Multi-Step Booking Form' },
  { name: '05-profile',        path: '/profile',          title: 'User Profile & Preferences' },
  { name: '06-admin-hub',      path: '/admin',            title: 'Admin Hub Operations' },
];

async function run() {
  const browser = await puppeteer.launch({ headless: 'shell' });
  const page = await browser.newPage();

  // Desktop screenshots
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  for (const route of ROUTES) {
    await page.goto(`http://localhost:4173${route.path}`, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.waitForSelector('main', { timeout: 5000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 1000)); // let animations finish
    await page.screenshot({ path: path.join(outDir, `${route.name}-desktop.png`), fullPage: true });
    console.log(`✅ ${route.name} (desktop)`);
  }

  // Mobile screenshots
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  for (const route of ROUTES) {
    await page.goto(`http://localhost:4173${route.path}`, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.waitForSelector('main', { timeout: 5000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, `${route.name}-mobile.png`), fullPage: true });
    console.log(`✅ ${route.name} (mobile)`);
  }

  // Dark mode screenshot
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await page.waitForSelector('main', { timeout: 5000 }).catch(() => {});
  // Try to click dark mode toggle
  const toggleBtn = await page.$('button[aria-label*="dark" i], button[aria-label*="theme" i], button[title*="dark" i], button[title*="theme" i]');
  if (toggleBtn) {
    await toggleBtn.click();
    await new Promise(r => setTimeout(r, 500));
  }
  await page.screenshot({ path: path.join(outDir, '07-dark-mode.png'), fullPage: true });
  console.log('✅ dark-mode');

  await browser.close();
  console.log(`\n📸 All screenshots saved to ${outDir}`);
}

run().catch(err => { console.error(err); process.exit(1); });
