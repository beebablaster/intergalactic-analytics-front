import { test, expect } from '@playwright/test';

test.describe('Страница загрузки', () => {
  test('должна загрузить файл и показать прогресс', async ({ page }) => {
    await page.goto('/');

    await page.route('**/aggregate?rows=10000', async (route) => {
      await route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: `{"rowsProcessed":25,"total_spend_galactic":1500}\n{"rowsProcessed":50,"average_spend_galactic":45.5}\n{"rowsProcessed":75,"big_spent_civ":"monsters"}\n{"rowsProcessed":100,"done":true,"rows_affected":100}\n`,
      });
    });

    await page.click('button:has-text("Загрузить файл")');

    await page.setInputFiles('input[type=file]', 'tests/fixtures/small.csv');

    await page.waitForSelector('button:has-text("Отправить")');
    await page.click('button:has-text("Отправить")');

    await expect(page.locator('text=1500')).toBeVisible();
    await expect(page.locator('text=45.5')).toBeVisible();
    await expect(page.locator('text=monsters')).toBeVisible();
    await expect(page.locator('text=100')).toBeVisible();

    const uploadHistory = await page.evaluate(() => {
      const history = localStorage.getItem('uploadHistory');
      return history ? JSON.parse(history) : [];
    });

    expect(uploadHistory).toHaveLength(1);
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
