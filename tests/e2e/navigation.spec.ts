import { test, expect } from '@playwright/test';

test.describe('Навигация', () => {
  test('должна корректно переходить между страницами', async ({ page }) => {
    await page.goto('/');

    await page.click('text=CSV Генератор');
    await expect(page).toHaveURL('/generate');

    await page.click('text=История');
    await expect(page).toHaveURL('/history');

    await page.goto('/history');
    await expect(page).toHaveURL('/history');

    await page.click('text=CSV Аналитик');
    await expect(page).toHaveURL('/');

    await page.goto('/not-found');
    await expect(page.locator('body')).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    try {
      await page.evaluate(() => {
        localStorage.clear();
      });
    } catch (error) {}
  });
});

export default test;
