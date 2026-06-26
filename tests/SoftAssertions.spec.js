const { test, expect } = require('@playwright/test');

test('SoftAssertions demo',async ({page})=>{

   await page.goto('https://www.demoblaze.com/index.html');

   //Soft assertions
   await expect.soft(page).toHaveTitle('STORE');
   await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
   await expect.soft(page.locator('.navbar-brand')).toBeVisible();

} )
