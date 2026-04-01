import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Nick Shaw - QA & Delivery Lead/i);
  });

  test('hero headings are present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Hey, I'm Nick/i, level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /QA & Delivery Lead/i, level: 2 })).toBeVisible();
  });

  test('hero profile image is visible', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'Nick' })).toBeVisible();
  });

  test('Contact me CTA link is present', async ({ page }) => {
    const cta = page.getByRole('link', { name: 'Contact me' });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '#/contact');
  });

  test('Credentials section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Credentials.' })).toBeVisible();
    await expect(page.getByText('ISTQB Certified Tester')).toBeVisible();
    await expect(page.getByText('CSM Certified ScrumMaster')).toBeVisible();
    await expect(page.getByText('CSPO Certified Product Owner')).toBeVisible();
  });

  test('"Use at work" skills section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Use at work.' })).toBeVisible();
    await expect(page.getByText('Test Strategy')).toBeVisible();
    await expect(page.getByText('Playwright')).toBeVisible();
    await expect(page.getByText('Azure DevOps')).toBeVisible();
  });

  test('"Use for fun" skills section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Use for fun.' })).toBeVisible();
    await expect(page.getByText('React')).toBeVisible();
    await expect(page.getByText('TypeScript')).toBeVisible();
    await expect(page.getByText('Claude')).toBeVisible();
  });
});
