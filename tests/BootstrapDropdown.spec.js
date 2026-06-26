const {test, expect}=require('@playwright/test')

test('Auto suggest dropdown', async ({page}) =>{
    // await page.goto('https://www.redbus.in/')
    // await page.getByRole('combobox', { name: 'From' }).click();
    // await page.locator('#srcinput').fill('Delhi');

    // await page.waitForSelector("//li[contains(@class,'sc-iwsKbI')]/div/text[1]")

    // // select options from dropdown
    // const fromCityOptions=await page.$$("//li[contains(@class,'sc-iwsKbI')]/div/text[1]")
    // for(let option of fromCityOptions)
    // {
    //     const value=await option.textContent();
    //    console.log("value is",value)
    //     if(value.includes('Anand Vihar'))
    //     {
    //         await option.click();
    //         break
    //     }

    // }
  await page.goto('https://www.redbus.in/');
  
  await page.locator('div').filter({ hasText: /^From$/ }).nth(1).click();
  await page.getByRole('combobox', { name: 'From' }).fill('delhi');
  await page.getByRole('heading', { name: 'ISBT Kashmiri Gate, Delhi' }).first().click();
  await page.close();
})