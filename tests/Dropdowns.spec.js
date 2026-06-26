const {test,expect} = require('@playwright/test');

test('Dropdowns',async({page})=>{
    await page.goto('http://practice.expandtesting.com/dropdown');
    const dropdown = await page.locator('#country');
    await dropdown.scrollIntoViewIfNeeded();
    //Multiple ways to select dropdown values
    await dropdown.selectOption({label:'Angola'}); // select by label
    await page.screenshot({ path: 'dropdown-selection.png' });
    // await dropdown.selectOption('India');//select by Text
    // await dropdown.selectOption({value:'AG'});//select by value
    // await expect.soft(dropdown).toHaveValue('AG');//assertion to check selected value
    // await dropdown.selectOption({index:3});//select by index

    //assertion
    const options = await page.locator('#country option');
    const optionCount = await options.count();
    console.log('Total options in dropdown: '+optionCount);
    await expect.soft(optionCount).toEqual(252);
   //want to print all the options in dropdown
    for (let i=0;i<optionCount;i++){
        const optionText = await options.nth(i).textContent();
        console.log(optionText);
    }
    //other way to print all the options in dropdown
    const alloptions = await page.$$('#country option');
    console.log('Total options in dropdown: ' + alloptions.length);
    await expect.soft(alloptions.length).toBe(252);
    for (const option of alloptions){
        const optionText = await option.textContent();
        console.log(optionText);
    }
    //assert the country is present in dropdown or not
    let status = false;
    for (const option of alloptions){
        const value = await option.textContent();
        if (value.includes('India')){
            status = true;
            break;
        }
    }
    await expect.soft(status).toBeTruthy();
    const countriesToCheck = ['India', 'United States', 'Australia', 'Canada'];
    for (const country of countriesToCheck){
        let found = false;
        for (const option of alloptions){
            const value = await option.textContent();
            if (value.includes(country)){
                console.log(country + ' is present in dropdown');
                found = true;
                break;
            }
        }
        await expect.soft(found).toBeTruthy();
    }
    await page.close();
})  