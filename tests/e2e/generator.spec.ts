import { test, expect } from '@playwright/test';

test.describe('Страница генератора', () => {
  test('должна сгенерировать отчет и скачать файл', async ({ page }) => {
    await page.goto('/generate');
    await expect(page.locator('text=Сгенерируйте готовый csv-файл')).toBeVisible();

    await page.route('**/report?size=0.01&withErrors=off&maxSpend=1000', async (route) => {
      const csvBlob = new Blob(
        [
          'id,civ,developer_id,date,spend\n1,humans,5587074780692,40,279\n2,monsters,5442488793100,170,899',
        ],
        { type: 'text/csv' },
      );
      await route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'text/csv' },
        body: csvBlob,
      });
    });

    await page.click('button:has-text("Начать генерацию")');

    await expect(page.locator('text=идёт процесс генерации')).toBeVisible();

    await expect(page.locator('text=файл сгенерирован!')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Done')).toBeVisible();
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
