import { test, expect } from '@playwright/test';

test.describe('NextWeb Responsive Checks', () => {
  const viewports = [
    { name: 'Desktop Large', width: 1920, height: 1080 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Mobile Small', width: 375, height: 667 }
  ];

  for (const vp of viewports) {
    test(`render correctly on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:5174/');

      // Verify title and page element loads
      await expect(page).toHaveTitle(/NEXTWEB/i);

      // Verify main container or grid layout adapts without breaking
      const gridContainer = page.locator('.grid-container').first();
      await expect(gridContainer).toBeVisible();

      // Verify navigation fits within the page
      const navbar = page.locator('nav.navbar, nav.navbar-sticky').first();
      await expect(navbar).toBeVisible();
    });
  }
});
