import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/switch");
});

test('when switch', async ({ page }) => {
  await expect(page.locator('.when-switch .result')).toHaveText('Two');
  await expect(page.locator('.when-switch-default .result')).toHaveText('Default');
  await expect(page.locator('.when-switch-custom-default .result')).toHaveText('Default');
});

test('name switch', async ({ page }) => {
  await expect(page.locator('.name-switch .result')).toHaveText('Two');
  await expect(page.locator('.name-switch-default .result-1')).toHaveText('Default');
  await expect(page.locator('.name-switch-default .result-2')).toHaveText('Default');
  await expect(page.locator('.name-switch-custom-default .result')).toHaveText('Default');
  await expect(page.locator('.name-switch-slot-functions .result')).toHaveText('Two');
  await expect(page.locator('.name-switch-slot-function-custom-default .result')).toHaveText('Default');
  await expect(page.locator('.name-switch-slot-function-custom-default-and-key .result')).toHaveText('Default');
});

test('incorrect render', async ({ page }) => {
  await expect(page.locator('.no-show')).toHaveCount(0);
});