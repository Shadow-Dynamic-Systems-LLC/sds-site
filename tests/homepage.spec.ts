import { test, expect } from '@playwright/test';

test.describe('SDS Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    // Wait for the page to load and animations to settle
    await page.waitForTimeout(1000);
  });

  test('should display the homepage correctly', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Shadow Dynamic Systems/);

    // Take full page screenshot
    await page.screenshot({ path: 'screenshots/01-homepage-full.png', fullPage: true });

    // Check navbar elements
    await expect(page.locator('.navbar-logo')).toBeVisible();
    await expect(page.locator('.nav-links a', { hasText: 'Services' })).toBeVisible();
    await expect(page.locator('.nav-links a', { hasText: 'Projects' })).toBeVisible();
    await expect(page.locator('.nav-links a', { hasText: 'About' })).toBeVisible();
    await expect(page.locator('.nav-links a', { hasText: 'Blog' })).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    // Check hero content
    await expect(page.locator('#hero h1')).toContainText('Intelligence');
    await expect(page.locator('#hero h1')).toContainText('Reimagined');

    // Take screenshot of hero section
    await page.locator('#hero').screenshot({ path: 'screenshots/02-hero-section.png' });
  });

  test('should navigate to Services section', async ({ page }) => {
    // Click Services link
    await page.locator('.nav-links a', { hasText: 'Services' }).click();
    await page.waitForTimeout(1000);

    // Check if Services section is visible
    await expect(page.locator('#services h2')).toContainText('Current Research & Focus Areas');

    // Take screenshot
    await page.locator('#services').screenshot({ path: 'screenshots/03-services-section.png' });

    // Check service cards
    await expect(page.locator('.service-card')).toHaveCount(6);
  });

  test('should navigate to Projects section', async ({ page }) => {
    // Click Projects link
    await page.locator('.nav-links a', { hasText: 'Projects' }).click();
    await page.waitForTimeout(1000);

    // Check if Projects section is visible
    await expect(page.locator('#projects h2')).toContainText('Our Research & Development');

    // Take screenshot
    await page.locator('#projects').screenshot({ path: 'screenshots/04-projects-section.png' });
  });

  test('should navigate to About section', async ({ page }) => {
    // Click About link
    await page.locator('.nav-links a', { hasText: 'About' }).click();
    await page.waitForTimeout(1000);

    // Check if About section is visible
    await expect(page.locator('#about h2')).toContainText('Our Philosophy');

    // Take screenshot
    await page.locator('#about').screenshot({ path: 'screenshots/05-about-section.png' });
  });

  test('should navigate to Blog section', async ({ page }) => {
    // Click Blog link
    await page.locator('.nav-links a', { hasText: 'Blog' }).click();
    await page.waitForTimeout(1000);

    // Check if Blog section is visible
    await expect(page.locator('#blog h2')).toContainText('From The Lab');

    // Take screenshot
    await page.locator('#blog').screenshot({ path: 'screenshots/06-blog-section.png' });
  });

  test('should navigate to Privacy Policy page from footer', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Click Privacy Policy link (now a real route, not a modal)
    await page.locator('.footer-links a', { hasText: 'Privacy Policy' }).click();
    await page.waitForTimeout(500);

    // Verify navigation to the policy page
    await expect(page).toHaveURL(/\/privacy$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'screenshots/07-privacy-page.png' });
  });

  test('should navigate to Terms of Service page from footer', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Click Terms of Service link (now a real route, not a modal)
    await page.locator('.footer-links a', { hasText: 'Terms of Service' }).click();
    await page.waitForTimeout(500);

    // Verify navigation to the policy page
    await expect(page).toHaveURL(/\/terms$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Terms of Service' })).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'screenshots/08-terms-page.png' });
  });

  test('should display shader background', async ({ page }) => {
    // Check canvas container exists
    await expect(page.locator('#canvas-container')).toBeVisible();

    // Check canvas element exists
    await expect(page.locator('#canvas-container canvas')).toBeVisible();

    // Take viewport screenshot to show background
    await page.screenshot({ path: 'screenshots/09-shader-background.png' });
  });
});
