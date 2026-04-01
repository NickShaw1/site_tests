import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('nav contains all five links', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Projects' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('CV link is present and points to the PDF', async ({ page }) => {
    const cvLink = page.getByRole('link', { name: /My CV/i });
    await expect(cvLink).toBeVisible();
    await expect(cvLink).toHaveAttribute('href', '/NickShawCV.pdf');
  });

  test('skip to content link is present', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeAttached();
  });

  test('Home link navigates to home page', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveTitle(/Nick Shaw - QA & Delivery Lead/i);
    await expect(page.getByRole('heading', { name: /Hey, I'm Nick/i })).toBeVisible();
  });

  test('About link navigates to about page', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveTitle(/About/i);
    await expect(page.getByRole('heading', { name: /I'm Nick/i, level: 1 })).toBeVisible();
  });

  test('Blog link navigates to blog page', async ({ page }) => {
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveTitle(/Blog/i);
    await expect(page.getByRole('heading', { name: 'Blog.', level: 1 })).toBeVisible();
  });

  test('Projects link navigates to projects page', async ({ page }) => {
    await page.getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveTitle(/Projects/i);
    await expect(page.getByRole('heading', { name: 'Projects.', level: 1 })).toBeVisible();
  });

  test('Contact link navigates to contact page', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveTitle(/Contact/i);
    await expect(page.getByRole('heading', { name: 'Contact me.', level: 1 })).toBeVisible();
  });
});
