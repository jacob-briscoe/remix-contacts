import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

test.describe('Search Contacts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('no matches', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('zzz');
    await expect(page.getByText('No contacts')).toBeVisible();
  });

  test('has matches', async ({ page }) => {
    searchWithResults(page);

    await expect(page.getByRole('status')).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Alex Anderson' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Alexandra Spalato' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Giovanni Benussi' })
    ).toBeHidden();
    await expect(page.getByRole('status')).not.toBeVisible();
  });

  test('clear shows all matches', async ({ page }) => {
    searchWithResults(page);
    await expect(
      page.getByRole('link', { name: 'Alex Anderson' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Alexandra Spalato' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Giovanni Benussi' })
    ).toBeHidden();

    const search = page.getByPlaceholder('Search');

    await search.fill('');
    await expect(search).toBeEmpty();

    await expect(
      page.getByRole('link', { name: 'Alex Anderson' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Giovanni Benussi' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Shane Walker' })
    ).toBeVisible();
  });

  const searchWithResults = async (page: Page) => {
    await page.getByPlaceholder('Search').fill('alex');
  };
});
