import { test, expect } from '@playwright/test';

test('Create, Read, Update, Delete Contact', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  page.on('dialog', (dialog) => dialog.accept());

  await page.getByRole('button', { name: 'New' }).click();
  await page.getByPlaceholder('First').click();
  await page.getByPlaceholder('First').fill('Test');
  await page.getByPlaceholder('First').press('Tab');
  await page.getByPlaceholder('Last').fill('User');
  await page.getByPlaceholder('Last').press('Tab');
  await page.getByPlaceholder('@jack').fill('@test');
  await page.getByPlaceholder('@jack').press('Tab');
  await page
    .getByPlaceholder('https://example.com/avatar.jpg')
    .fill(
      'https://sessionize.com/image/5578-400o400o2-BMT43t5kd2U1XstaNnM6Ax.jpg'
    );
  await page.getByLabel('Notes').click();
  await page.getByLabel('Notes').fill('This is a test user!');

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByRole('link', { name: 'Test User' })).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Test User avatar' })
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Test User Add to favorites' })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: '@test' })).toBeVisible();
  await expect(page.getByText('This is a test user!')).toBeVisible();
  await expect(page.getByLabel('Add to favorites')).toBeVisible();

  await page.getByRole('button', { name: 'Edit' }).click();

  const firstName = page.getByLabel('First name');
  await firstName.click();
  await firstName.fill('Testing');
  await firstName.press('Tab');

  const lastName = page.getByLabel('Last name');
  await lastName.fill('USER');
  await lastName.press('Tab');

  const twitterHandle = page.getByLabel('Twitter handle');
  await twitterHandle.fill('@tester');
  await twitterHandle.press('Tab');

  const avatarUrl = page.getByLabel('Avatar URL');
  await avatarUrl.fill(
    'https://sessionize.com/image/a9fc-400o400o2-JHBnWZRoxp7QX74Hdac7AZ.jpg'
  );
  await avatarUrl.press('Tab');

  const notes = page.getByLabel('Notes');
  await notes.fill('This is a test user! Updated now.');

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByRole('link', { name: 'Testing USER' })).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Testing USER avatar' })
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Testing USER Add to favorites' })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: '@tester' })).toBeVisible();
  await expect(
    page.getByText('This is a test user! Updated now.')
  ).toBeVisible();
  await expect(page.getByLabel('Add to favorites')).toBeVisible();

  await page.getByRole('button', { name: 'Delete' }).click();

  await expect(page.getByRole('link', { name: 'Testing USER' })).toBeHidden();
});
