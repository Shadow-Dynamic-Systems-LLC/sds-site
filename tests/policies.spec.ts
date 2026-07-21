import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Shared regression suite for the Privacy Policy and Terms of Service pages.
 *
 * These were previously rendered inside an in-page modal. They are now first-class
 * routed pages (/privacy, /terms) — the spec's "preferred" MODAL-09 architecture:
 * real links, bookmarkable, openable in a new tab, reachable without JavaScript.
 * One suite verifies both instances, since they share the LegalDocumentPage layout.
 */
const policies = [
  {
    name: 'Privacy Policy',
    url: '/privacy',
    closeName: 'Close privacy policy',
    effectiveDate: 'July 13, 2026',
  },
  {
    name: 'Terms of Service',
    url: '/terms',
    closeName: 'Close terms of service',
    effectiveDate: 'July 6, 2025',
  },
];

for (const policy of policies) {
  test.describe(`${policy.name} page`, () => {
    test('is directly reachable by URL and announces its identity', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));

      await page.goto(policy.url);

      // Exactly one h1, and it matches the policy name.
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.getByRole('heading', { level: 1, name: policy.name })).toBeVisible();

      expect(consoleErrors).toEqual([]);
      expect(pageErrors).toEqual([]);
    });

    test('shows the effective date and an accessible contact mailto', async ({ page }) => {
      await page.goto(policy.url);

      await expect(page.getByText(`Effective ${policy.effectiveDate}`)).toBeVisible();

      const mail = page.getByRole('link', { name: 'hello@shadowdynamicsystems.com' });
      await expect(mail).toBeVisible();
      await expect(mail).toHaveAttribute('href', 'mailto:hello@shadowdynamicsystems.com');
    });

    test('descends headings coherently (h1 then h2, no skipped levels)', async ({ page }) => {
      await page.goto(policy.url);

      // No h3/h4/h5/h6 should appear — the layout only uses h1 (title) + h2 (sections).
      await expect(page.getByRole('heading', { level: 3 })).toHaveCount(0);
      await expect(page.getByRole('heading', { level: 4 })).toHaveCount(0);
      await expect(page.getByRole('heading', { level: 5 })).toHaveCount(0);
      await expect(page.getByRole('heading', { level: 6 })).toHaveCount(0);

      // Every section is an h2 sitting under the single h1.
      const sections = page.getByRole('heading', { level: 2 });
      const count = await sections.count();
      expect(count).toBeGreaterThan(0);
    });

    test('has no horizontal overflow at 320px width', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 700 });
      await page.goto(policy.url);
      await page.waitForLoadState('networkidle');

      const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test('has no horizontal overflow at 200% browser zoom', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(policy.url);
      await page.evaluate(() => {
        (document.body.style as unknown as { zoom: string }).zoom = '2';
      });
      await page.waitForLoadState('networkidle');

      const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test('back link returns to the site', async ({ page }) => {
      await page.goto(policy.url);

      const back = page.getByRole('link', { name: /Back to Site/i });
      await expect(back).toBeVisible();
      await back.click();

      // Lands on the home route (path is "/", optionally with a hash target).
      await expect(page).toHaveURL(/^http:\/\/localhost:5173\/($|#)/);
    });

    test('is reachable from the footer link', async ({ page }) => {
      await page.goto('/');
      await page.locator('footer').scrollIntoViewIfNeeded();

      const triggerName = policy.name;
      await page.getByRole('link', { name: triggerName }).click();

      await expect(page).toHaveURL(policy.url);
      await expect(page.getByRole('heading', { level: 1, name: triggerName })).toBeVisible();
    });

    test('passes an Axe accessibility scan of the whole document', async ({ page }) => {
      await page.goto(policy.url);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  });
}
