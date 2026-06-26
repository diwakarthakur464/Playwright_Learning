const { test, expect } = require('@playwright/test');

test('Handle hidden dropdown items on demoqa.com', async ({ page }) => {
  await page.goto('https://demoqa.com/select-menu');

  // Open the custom React dropdown using built-in selector
  const dropdown = page.locator('#withOptGroup');
  await dropdown.click();

  // Select a hidden option from the group list using a built-in locator
  const option = page.locator('div[id^="react-select-2-option-"]', { hasText: 'Group 1, option 1' });
  await expect(option).toBeVisible();
  await option.click();

  // Verify the selected value is shown in the dropdown control
  await expect(dropdown).toContainText('Group 1, option 1');
});

test('Handle dialogs and alerts on demoqa.com', async ({ page }) => {
  await page.goto('https://demoqa.com/alerts');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('You clicked a button');
    await dialog.accept();
  });
  await page.locator('#alertButton').click();

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Do you confirm action?');
    await dialog.dismiss();
  });
  await page.locator('#confirmButton').click();
  await expect(page.locator('#confirmResult')).toHaveText('You selected Cancel');

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('prompt');
    await dialog.accept('Playwright');
  });
  await page.locator('#promtButton').click();
  await expect(page.locator('#promptResult')).toContainText('Playwright');
});
