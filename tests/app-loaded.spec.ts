import test, { expect } from '@playwright/test';

test.describe('App Loaded', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Remix Contacts/);
  });

  test('has logo', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Remix Contacts' })
    ).toBeVisible();
  });

  test('has search', async ({ page }) => {
    await expect(page.getByPlaceholder('Search')).toBeVisible();
  });

  test('has ability to create contact', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'New' })).toBeVisible();
  });

  test('has contact navigation', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Alex Anderson' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Shane Walker' })
    ).toBeVisible();
  });

  test('has welcome', async ({ page }) => {
    await expect(
      page.getByText(
        'This is a demo for Remix.Check out the docs at remix.run.'
      )
    ).toBeVisible();
  });
});
