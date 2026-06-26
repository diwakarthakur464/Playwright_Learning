const {test,expect, chromium} = require('@playwright/test');

test('Handling Browser',async ()=>{
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page1 =await context.newPage();
    await page1.goto('https://www.demoblaze.com/index.html');
    await expect.soft(page1).toHaveTitle('STORE');
    const page2 = await context.newPage();
    await page2.goto('https://practice.expandtesting.com/inputs');
    await expect.soft(page2).toHaveTitle('Web inputs page for Automation Testing Practice');
    await expect.soft(page2).toHaveURL('https://practice.expandtesting.com/inputs');
    await page2.close();
    await page1.close();
})

    test('Handle multiple Pages/Windows', async () => {
    // Launch the browser
    const browser = await chromium.launch({ headless: false });
    // Create a new context and open a new page
    const context = await browser.newContext();
    // Open a new page
    const page1 = await context.newPage();
    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    console.log(await page1.title());
    await expect(page1).toHaveTitle('OrangeHRM')
    const pagePromise = context.waitForEvent('page');
    await page1.locator('//a[normalize-space()="OrangeHRM, Inc"]').click();
    const newPage = await pagePromise;
    console.log(await newPage.title());
    await expect(newPage).toHaveTitle('OrangeHRM: All in One HR Software for Businesses | OrangeHRM')
    await browser.close();
    })