import { test, expect } from '@playwright/test';

const EXERCISES = [
  { title: 'ISS Tracker',       slug: 'iss' },
  { title: 'Piano',             slug: 'piano' },
  { title: 'Weather app',       slug: 'weather' },
  { title: 'Holiday Planner',   slug: 'travel' },
  { title: 'Currency converter', slug: 'currency' },
  { title: 'Reviews carousel',  slug: 'carousel' },
  { title: 'Tabs',              slug: 'tabs' },
  { title: 'Accordian',         slug: 'accordian' },
  { title: 'Calculator',        slug: 'calculator' },
  { title: 'Simple modal',      slug: 'modal' },
  { title: 'Colour flipper',    slug: 'colourflipper' },
  { title: 'Counter',           slug: 'counter' },
];

test.describe('Projects page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/projects');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Projects/i);
  });

  test('main heading is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Projects.', level: 1 })).toBeVisible();
  });

  test('tab list renders with all three tabs', async ({ page }) => {
    const tablist = page.getByRole('tablist', { name: 'Project categories' });
    await expect(tablist.getByRole('tab', { name: 'Exercises' })).toBeVisible();
    await expect(tablist.getByRole('tab', { name: 'GitHub' })).toBeVisible();
    await expect(tablist.getByRole('tab', { name: 'Testing' })).toBeVisible();
  });

  test('Exercises tab is selected by default', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Exercises' })).toHaveAttribute('aria-selected', 'true');
  });

  test('all exercise project cards are visible', async ({ page }) => {
    for (const project of EXERCISES) {
      await expect(page.getByRole('heading', { name: project.title, level: 2 })).toBeVisible();
    }
  });

  test('exercise project links point to correct slugs', async ({ page }) => {
    for (const project of EXERCISES) {
      const link = page.getByRole('link', { name: project.title }).first();
      await expect(link).toHaveAttribute('href', `#/projects/${project.slug}`);
    }
  });

  test('GitHub tab can be selected', async ({ page }) => {
    await page.getByRole('tab', { name: 'GitHub' }).click();
    await expect(page.getByRole('tab', { name: 'GitHub' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel', { name: 'GitHub' })).toBeVisible();
  });

  test('Testing tab can be selected', async ({ page }) => {
    await page.getByRole('tab', { name: 'Testing' }).click();
    await expect(page.getByRole('tab', { name: 'Testing' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel', { name: 'Testing' })).toBeVisible();
  });

  test('switching tabs hides Exercises panel', async ({ page }) => {
    await expect(page.getByRole('tabpanel', { name: 'Exercises' })).toBeVisible();
    await page.getByRole('tab', { name: 'GitHub' }).click();
    await expect(page.getByRole('tabpanel', { name: 'Exercises' })).not.toBeVisible();
  });
});
