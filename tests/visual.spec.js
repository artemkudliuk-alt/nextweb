import { test, expect } from '@playwright/test';

test.describe('NextWeb Visual Regression & Layout Overlap Checks', () => {
  
  // Programmatic overlap check: fails if description text collides with card illustrations
  test('services page cards should have no description-image overlaps', async ({ page }) => {
    await page.goto('/services');
    // Allow animations and styles to settle
    await page.waitForTimeout(500);

    const cards = await page.locator('.services__card').all();
    expect(cards.length).toBeGreaterThan(0);

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const titleLocator = card.locator('h3');
      const descLocator = card.locator('.services__card-description');
      const imgLocator = card.locator('.services__card-img:visible');

      if ((await descLocator.count()) > 0 && (await imgLocator.count()) > 0) {
        const cardBox = await card.boundingBox();
        const descBox = await descLocator.boundingBox();
        const titleText = await titleLocator.innerText();

        if (cardBox && descBox) {
          const relativeDescBottom = (descBox.y + descBox.height - cardBox.y) / cardBox.height;
          if (relativeDescBottom > 0.58) {
            console.log(`[OVERLAP DETECTED] Card: "${titleText}"`);
            console.log(`  Card Box: y=${cardBox.y}, height=${cardBox.height}`);
            console.log(`  Description Box: y=${descBox.y}, height=${descBox.height}, bottom=${descBox.y + descBox.height}`);
            console.log(`  Relative bottom: ${relativeDescBottom.toFixed(3)} (Limit is 0.58)`);
          }
          expect(relativeDescBottom).toBeLessThan(0.58);
        }
      }
    }
  });

  // Visual screenshot comparison test
  test('homepage screenshot check', async ({ page, browserName }) => {
    test.skip(true, 'Skip homepage visual checks due to canvas rendering stream timeouts');
    await page.goto('/');
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('homepage.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
      timeout: 15000,
    });
  });

  test('services page screenshot check', async ({ page }) => {
    await page.goto('/services');
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('services-page.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
      timeout: 15000,
    });
  });
});
