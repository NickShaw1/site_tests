import { test, expect } from '@playwright/test';

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/contact');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact/i);
  });

  test('main heading is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Contact me.', level: 1 })).toBeVisible();
  });

  test.describe('Contact form', () => {
    test('Name field is present', async ({ page }) => {
      await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
    });

    test('Email field is present', async ({ page }) => {
      await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
    });

    test('Message field is present', async ({ page }) => {
      await expect(page.getByRole('textbox', { name: 'Message' })).toBeVisible();
    });

    test('Send button is present', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Send' })).toBeVisible();
    });

    test('form fields are interactable', async ({ page }) => {
      await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
      await page.getByRole('textbox', { name: 'Email address' }).fill('test@example.com');
      await page.getByRole('textbox', { name: 'Message' }).fill('This is a test message.');
      await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Test User');
      await expect(page.getByRole('textbox', { name: 'Email address' })).toHaveValue('test@example.com');
      await expect(page.getByRole('textbox', { name: 'Message' })).toHaveValue('This is a test message.');
    });
  });

  test.describe('Social links', () => {
    test('LinkedIn link is present and correct', async ({ page }) => {
      const link = page.getByRole('link', { name: /LinkedIn/i });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/nickshawqa/');
    });

    test('GitHub link is present and correct', async ({ page }) => {
      const link = page.getByRole('link', { name: /GitHub/i });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', 'https://www.github.com/nickshaw1');
    });

    test('X / Twitter link is present and correct', async ({ page }) => {
      const link = page.getByRole('link', { name: /X \/ Twitter/i });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', 'https://www.x.com/nickshawqa');
    });
  });
});
