const { test, expect } = require('@playwright/test');

test('Assertions',async ({page})=>{

  // Open the URL
  await page.goto('https://practice.expandtesting.com/');
  // await page.waitForLoadState('networkidle'); // Wait for the page to load completely

  // 1) Page has URL
  await expect.soft(page).toHaveURL('https://practice.expandtesting.com/');

  // 2) Page has title
  await expect.soft(page).toHaveTitle('Automation Testing Practice Website for QA and Developers | UI and API');
  
  // 3) Element is enabled
  const aboutLink = await page.locator('a.nav-link.p-2', { hasText: 'About' });
  await expect.soft(aboutLink).toBeVisible();
  //Negative assertion - to check element is disabled
  //await expect.soft(aboutLink).toBeDisabled();

  // 4) Element is visible 
  const logoElement = await page.getByRole('link', { name: 'Free ISTQB Mock Exams' })
  await expect.soft(logoElement).toBeVisible(); 

  // // 5) Radio/checkbox is checked: 
  
  // //radio button -yellow radio button
  // await page.getByRole('link', { name: 'Radio Buttons' }).click();
  // const yellowColor=await page.getByRole('radio', { name: 'Yellow' })
  // await yellowColor.click(); // select yellow radio button
  // await expect.soft(yellowColor).toBeChecked()

  //Check box  - News letter checkbox
  await page.goto('https://practice.expandtesting.com/checkboxes');
  const checkbox1 = page.getByLabel('Checkbox 1');
  await checkbox1.click();
  await expect.soft(checkbox1).toBeChecked();

//6 Element matches text
  await expect.soft(page.getByText('Checkbox 1')).toHaveText('Checkbox 1');

  //7 Element contains text
  await expect.soft(page.getByText('Checkbox 1')).toContainText('Checkbox');

//8 Input element has value
  await page.goto('https://practice.expandtesting.com/inputs');
  const TextInput = await page.getByRole('textbox', { name: 'Input: Text' });
  await TextInput.fill('Diwakar Singh Thakur');
  await expect.soft(TextInput).toHaveValue('Diwakar Singh Thakur');

  await page.close();

} )
