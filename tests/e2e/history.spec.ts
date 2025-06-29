import { test, expect } from '@playwright/test';

test.describe('Страница истории', () => {
  test('должна отображать и управлять историей загрузок', async ({ page }) => {
    const fakeHistory = [
      {
        id: '1',
        filename: 'test1.csv',
        uploadDate: '01.01.2024',
        status: 'success' as const,
        report: { total_spend_galactic: 1000, rows_affected: 50 },
      },
      {
        id: '2',
        filename: 'test2.csv',
        uploadDate: '02.01.2024',
        status: 'success' as const,
        report: { total_spend_galactic: 2000, rows_affected: 100 },
      },
    ];

    await page.addInitScript((history) => {
      localStorage.setItem('uploadHistory', JSON.stringify(history));
    }, fakeHistory);

    await page.goto('/history');

    await expect(page.locator('text=test1.csv')).toBeVisible();
    await expect(page.locator('text=test2.csv')).toBeVisible();

    await page.click('text=test1.csv');
    await expect(page.locator('text=1000')).toBeVisible();
    await page.click('button img[alt="close"]');

    await page.locator('button').filter({ hasText: '' }).nth(1).click();

    await expect(page.locator('text=test1.csv')).toBeVisible();
    await expect(page.locator('text=test2.csv')).not.toBeVisible();

    await page.click('button:has-text("Очистить всё")');

    await expect(page.locator('text=История пуста')).toBeVisible();

    const history = await page.evaluate(() => {
      return localStorage.getItem('uploadHistory');
    });

    expect(history).toBeNull();
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
