import { test, expect } from '@playwright/test';

test.describe('NAF Lodge Booking Platform', () => {
  test('should load the homepage and show the main title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/NAF Lodge Booking/);
    await expect(page.locator('h1')).toContainText('Commanding');
  });

  test('should navigate to the lodges directory', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Browse Locations');
    await expect(page).toHaveURL(/\/lodges/);
    await expect(page.locator('h1')).toContainText('Operational Assets');
  });

  test('should show the login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1')).toContainText('Welcome Back');
  });
});
