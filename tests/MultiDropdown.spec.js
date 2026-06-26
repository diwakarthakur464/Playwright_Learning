const {test, expect}=require('@playwright/test')

test("Handle dropdowns",async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    //Select multiple options from multi select dropdown
    await page.locator('#colors').scrollIntoViewIfNeeded();
    await page.selectOption('#colors',['Blue', 'Red', 'Yellow'])

    //Assertions
    // 1) check number of options in dropdown
    const options=await page.locator('#colors option')
    await expect(options).toHaveCount(7);

    // 2) check number of options in dropdown using JS array
    const colorOptions=await page.$$('#colors option')
    console.log("Number of options:",colorOptions.length)
    await expect(colorOptions.length).toBe(7);

    //3) check presence of value in the dropdown
    const content=await page.locator('#colors').textContent()
    await expect(content.includes('Red')).toBeTruthy();
    await expect(content.includes('Black')).toBeFalsy();

})