import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/ratio");
});

test('slots', async ({ page }) => {
  await expect(page.locator('.slots span')).toHaveCount(11);
  await expect(page.locator('.slots .is')).toHaveCount(6);
  await expect(page.locator('.slots .between')).toHaveCount(1);
  await expect(page.locator('.slots .of')).toHaveCount(4);
});

test('slot-functions:shared-index', async ({ page }) => {
  const children = page.locator('.slot-functions-shared-index .result')

  await expect(children).toHaveCount(10);

  let i = 0
  for (const child of await children.all()) {
    await expect(child).toHaveText(''+i);
    i = i + 1
  }
});

test('slot-functions:index', async ({ page }) => {
  let i = 0

  const isChildren = page.locator('.slot-functions-index .result.is')
  
  await expect(isChildren).toHaveCount(6);
  for (const child of await isChildren.all()) {
    await expect(child).toHaveText(''+i);
    i = i + 1
  }

  const ofChildren = page.locator('.slot-functions-index .result.of')

  await expect(ofChildren).toHaveCount(4);
  i = 0
  for (const child of await ofChildren.all()) {
    await expect(child).toHaveText(''+i);
    i = i + 1
  }
});