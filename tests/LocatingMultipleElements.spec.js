const { test, expect } = require('@playwright/test');

test('LocateElements', async ({ page }) => {
    
    await page.goto('https://www.demoblaze.com/index.html')


    //Locate all the products displayed on home page
    const products = await page.$$("//div[@id='tbodyid']//h4/a")
    for (const product of products) {
        const prodName = await product.textContent();
        console.log(prodName);
    }

 });