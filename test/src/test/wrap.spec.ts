import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/wrap');
});

test('true', async ({ page }) => {
  await expect(page.locator('.true')).toHaveCount(7);
  
  for (const trueElement of await page.locator('.true').all()) {
    await expect(trueElement).toHaveText('True')
  }
});

test('false', async ({ page }) => {
  await expect(page.locator('.false')).toHaveCount(0);

  await expect(page.locator('.false-child')).toHaveCount(3);

  for (const falseElement of await page.locator('.false-child').all()) {
    await expect(falseElement).toHaveText('False')
  }
});