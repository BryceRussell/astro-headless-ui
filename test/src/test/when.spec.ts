import { test, expect } from '@playwright/test';

test('true', async ({ page }) => {
  await page.goto("http://localhost:3000/when");

  await expect(page.locator('.true')).toHaveCount(3);
});

test('false', async ({ page }) => {
  await page.goto("http://localhost:3000/when");

  await expect(page.locator('.no-show')).toHaveCount(0);
});

test('conditional', async ({ page }) => {
  await page.goto("http://localhost:3000/when");

  await expect(page.locator('.conditional-true .result')).toHaveText('True');

  await expect(page.locator('.conditional-false .result')).toHaveText('False');
});