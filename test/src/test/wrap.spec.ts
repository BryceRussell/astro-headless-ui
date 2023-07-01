import { test, expect } from '@playwright/test';

test('wrap', async ({ page }) => {
  await page.goto("http://localhost:3000/wrap");

  // 'true'
  await expect(page.locator('.true')).not.toHaveCount(0);
  
  for (const trueElement of await page.locator('.true').all()) {
    await expect(trueElement).toHaveClass('true')
    await expect(trueElement).toHaveText('True')
  }

  // 'false'
  await expect(page.locator('.false')).toHaveCount(0);
});