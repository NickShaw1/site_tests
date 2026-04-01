import { test, expect } from '@playwright/test';

test.describe('About page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/about');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/About/i);
  });

  test('main heading is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /I'm Nick/i, level: 1 })).toBeVisible();
  });

  test('all section headings are present', async ({ page }) => {
    for (const heading of ['About', 'Learning', 'Outside Work', 'Adventures', 'Travel snaps']) {
      await expect(page.getByRole('heading', { name: heading, level: 2 })).toBeVisible();
    }
  });

  test('profile image is visible', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'Nick' })).toBeVisible();
  });

  test('Pippin image is visible', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'Pippin' })).toBeVisible();
  });

  test('blog link in Learning section works', async ({ page }) => {
    const blogLink = page.getByRole('link', { name: 'blog' });
    await expect(blogLink).toBeVisible();
    await expect(blogLink).toHaveAttribute('href', '#/blog');
  });

  test.describe('Travel carousel', () => {
    test('first slide image is visible', async ({ page }) => {
      await expect(page.getByRole('img', { name: 'Big Sur, California' })).toBeVisible();
    });

    test('Previous and Next buttons are present', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    });

    test('has 10 slide indicator buttons', async ({ page }) => {
      for (let i = 1; i <= 10; i++) {
        await expect(page.getByRole('button', { name: `Slide ${i}`, exact: true })).toBeVisible();
      }
    });

    test('Next button advances the carousel', async ({ page }) => {
      const firstSlide = page.getByRole('img', { name: 'Big Sur, California' });
      await expect(firstSlide).toBeVisible();
      await page.getByRole('button', { name: 'Next' }).click();
      await expect(firstSlide).not.toBeVisible();
    });

    test('clicking a slide indicator changes the slide', async ({ page }) => {
      const firstSlide = page.getByRole('img', { name: 'Big Sur, California' });
      await expect(firstSlide).toBeVisible();
      await page.getByRole('button', { name: 'Slide 5' }).click();
      await expect(firstSlide).not.toBeVisible();
    });
  });
});
