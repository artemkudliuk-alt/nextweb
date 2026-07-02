import { test, expect } from '@playwright/test';

test.describe('NextWeb Layout Checks', () => {
  test('homepage loads and displays hero header', async ({ page }) => {
    await page.goto('/');
    
    // Check page title contains NEXTWEB
    await expect(page).toHaveTitle(/NEXTWEB/i);
    
    // Check navigation bar is present
    const navbar = page.locator('nav.navbar, nav.navbar-sticky').first();
    await expect(navbar).toBeVisible();
  });

  test('responsive check - mobile menu is clickable', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Toggle menu
    const menuBtn = page.locator('.menu-btn').first();
    await expect(menuBtn).toBeVisible();
    
    // Wait for preloader to be hidden so it doesn't intercept clicks
    await page.waitForSelector('.preloader.hidden', { state: 'attached', timeout: 5000 });
    
    await menuBtn.click({ force: true });
    
    // Mobile drawer should open
    const drawer = page.locator('.mobile-drawer');
    await expect(drawer).toHaveClass(/open/);
  });
});
