const { test, expect } = require('@playwright/test');

test('Handle dialogs and alerts on demoqa.com', async ({ page }) => {
  await page.goto('https://demoqa.com/alerts');

  const alertDialogPromise = page.waitForEvent('dialog');
  await page.evaluate(() => setTimeout(() => document.querySelector('#alertButton').click(), 0));
  const alertDialog = await alertDialogPromise;
  expect(alertDialog.message()).toBe('You clicked a button');
  await alertDialog.accept();

  const timerDialogPromise = page.waitForEvent('dialog');
  await page.evaluate(() => setTimeout(() => document.querySelector('#timerAlertButton').click(), 0));
  const timerDialog = await timerDialogPromise;
  expect(timerDialog.message()).toContain('This alert appeared after 5 seconds');
  await timerDialog.accept();

  const confirmDialogPromise = page.waitForEvent('dialog');
  await page.evaluate(() => setTimeout(() => document.querySelector('#confirmButton').click(), 0));
  const confirmDialog = await confirmDialogPromise;
  expect(confirmDialog.message()).toBe('Do you confirm action?');
  await confirmDialog.dismiss();
  await expect(page.locator('#confirmResult')).toHaveText('You selected Cancel');

  const promptDialogPromise = page.waitForEvent('dialog');
  await page.evaluate(() => setTimeout(() => document.querySelector('#promtButton').click(), 0));
  const promptDialog = await promptDialogPromise;
  expect(promptDialog.type()).toBe('prompt');
  await promptDialog.accept('Playwright');
  await expect(page.locator('#promptResult')).toContainText('Playwright');
});

test('Handle auto suggestion box on demoqa.com', async ({ page }) => {
  await page.goto('https://demoqa.com/auto-complete');

  const singleInput = page.locator('#autoCompleteSingleInput');
  await singleInput.fill('r');
  await page.waitForSelector('.auto-complete__menu');
  const redOption = page.locator('.auto-complete__option', { hasText: 'Red' }).first();
  await expect(redOption).toBeVisible();
  await redOption.click();
  await expect(singleInput.locator('xpath=ancestor::div[contains(@class, "auto-complete__control")]')).toContainText('Red');

  const multiInput = page.locator('#autoCompleteMultipleInput');
  await multiInput.fill('g');
  await page.waitForSelector('.auto-complete__menu');
  const greenOption = page.locator('.auto-complete__option', { hasText: 'Green' }).first();
  await expect(greenOption).toBeVisible();
  await greenOption.click();
  await expect(page.locator('#autoCompleteMultipleInput').locator('xpath=ancestor::div[contains(@class, "auto-complete__control")]')).toContainText('Green');
});
