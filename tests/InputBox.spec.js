const { test, expect } = require('@playwright/test');

test('Input Box', async ({page}) => {

    await page.goto('https://practice.expandtesting.com/inputs');

    const InputBox = await page.locator("#input-text");
    await expect(await page.locator("#input-text")).toBeVisible()
    await expect.soft(InputBox).toBeEnabled();
    await expect.soft(InputBox).toBeEmpty();
    await expect.soft(InputBox).toBeEditable();

    await page.locator("#input-text").fill("Diwakar Singh Thakur");
    await page.fill("#input-password", "Test@123");

    await expect.soft(InputBox).toHaveValue("Diwakar Singh Thakur");
    await expect.soft(page.locator("#input-password")).toHaveValue("Test@123");

    await page.close();
} )