import { test, expect } from '@playwright/test';

const POSTS = [
  { title: 'Claude Code: AI and Agent Skills', slug: '008' },
  { title: 'CSPO: Product Owner',              slug: '007' },
  { title: /Back from Japan/,                  slug: '006' },
  { title: 'Site redesign',                    slug: '004' },
  { title: 'JavaScript and TypeScript',        slug: '003' },
  { title: /Setting up Playwright/,            slug: '002' },
  { title: 'Getting started',                  slug: '001' },
];

test.describe('Blog page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/blog');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog/i);
  });

  test('main heading is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Blog.', level: 1 })).toBeVisible();
  });

  test('all post titles are listed', async ({ page }) => {
    for (const post of POSTS) {
      await expect(page.getByRole('heading', { name: post.title, level: 2 })).toBeVisible();
    }
  });

  test('all post links point to correct slugs', async ({ page }) => {
    await expect(page.getByRole('article').first()).toBeVisible();
    for (const post of POSTS) {
      const link = page.getByRole('link', { name: post.title }).first();
      await expect(link).toHaveAttribute('href', `#/blog/${post.slug}`);
    }
  });

  test('clicking a post navigates to that post', async ({ page }) => {
    await page.getByRole('link', { name: 'Claude Code: AI and Agent Skills' }).first().click();
    await expect(page).toHaveURL(/#\/blog\/008/);
  });

  test('each article has a publication date', async ({ page }) => {
    const dates = page.getByRole('article').locator('time');
    await expect(dates).toHaveCount(POSTS.length);
  });
});
