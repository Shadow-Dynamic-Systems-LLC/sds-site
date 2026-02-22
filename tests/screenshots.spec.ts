import { test } from '@playwright/test';

test('Capture screenshots of the SDS homepage', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Wait for canvas to load
  await page.waitForSelector('#canvas-container canvas', { timeout: 10000 });
  await page.waitForTimeout(2000);

  // Take full page screenshot
  await page.screenshot({
    path: 'screenshots/01-homepage-full.png',
    fullPage: true
  });

  // Take viewport screenshot
  await page.screenshot({
    path: 'screenshots/02-homepage-viewport.png'
  });

  // Scroll to services
  await page.evaluate(() => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: 'screenshots/03-services-section.png'
  });

  // Scroll to projects
  await page.evaluate(() => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: 'screenshots/04-projects-section.png'
  });

  // Scroll to about
  await page.evaluate(() => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: 'screenshots/05-about-section.png'
  });

  // Scroll to blog
  await page.evaluate(() => {
    document.querySelector('#blog')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: 'screenshots/06-blog-section.png'
  });

  // Scroll to footer
  await page.evaluate(() => {
    document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: 'screenshots/07-footer-section.png'
  });
});
