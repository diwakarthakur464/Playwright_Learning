const { test, expect } = require('@playwright/test');

test('Home Page',async ({page})=>{

  // Open the URL
  await page.goto('https://practice.expandtesting.com/');
  await page.waitForLoadState('networkidle'); // Wait for the page to load completely

  // 1) Page has URL
  await expect.soft(page).toHaveURL('https://practice.expandtesting.com/');

  // 2) Page has title
  await expect.soft(page).toHaveTitle('Automation Testing Practice Website for QA and Developers | UI and API');
  
  // 3) Element is enabled
  const aboutLink =await page.getByRole('link', { name: 'About' });
  await expect.soft(aboutLink).isVisible; 
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
  await page.getByRole('link', { name: 'SUT' }).click();
  await page.getByRole('link', { name: 'Check Boxes' }).click();
  const adFrame = page.locator('iframe[name="aswift_11"]');
  if (await adFrame.count() > 0 && await adFrame.isVisible()) {
    await page.frameLocator('iframe[name="aswift_11"]').getByRole('button', { name: 'Close ad' }).click();
  }
  await page.getByRole('checkbox', { name: 'Checkbox 1' }).check();
  const newsletterCheckbox = await page.locator('#Newsletter');
  await expect.soft(newsletterCheckbox).toBeChecked()

//6 Element matches text
  await expect.soft(await page.getByText('Checkbox 1')).toHaveText('Checkbox 1');

  //7 Element contains text
  await expect.soft(await page.getByText('Checkbox 1')).toContainText('checkbox');

//8 Input element has value
  await page.getByRole('link', { name: 'SUT' }).click();
  await page.getByRole('link', { name: 'Web inputs' }).click();
const TextInput = await page.getByRole('textbox', { name: 'Input: Text' });
  await TextInput.fill('Diwakar Singh Thakur');
  await expect.soft(TextInput ).toHaveValue('Diwakar Singh Thakur');

  await page.close();

} )
