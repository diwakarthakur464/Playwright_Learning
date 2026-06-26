const { test, expect } = require('@playwright/test');

test('Radio Button',async ({page})=>{
    await page.goto('https://practice.expandtesting.com/radio-buttons');
    await page.getByLabel('Basketball').check();
    await expect.soft(page.getByLabel('Basketball')).toBeChecked();
    await expect.soft(await page.getByLabel('Basketball').isChecked()).toBeTruthy();
    await expect.soft(await page.getByLabel('Football').isChecked()).toBeFalsy();
    await page.close();
})

test('Checkbox',async ({page})=>{
    await page.goto('https://practice.expandtesting.com/checkboxes');
    await page.getByLabel('Checkbox 1').check();
    await expect.soft(page.getByLabel('Checkbox 1')).toBeChecked();
    await expect.soft(await page.getByLabel('Checkbox 1').isChecked()).toBeTruthy();
    if (await page.getByLabel('Checkbox 2').isChecked()){
        await page.getByLabel('Checkbox 2').uncheck();
    }
    await expect.soft(await page.getByLabel('Checkbox 2').isChecked()).toBeFalsy();

    //multiple checkboxes
    const checkboxes = [page.getByLabel('Checkbox 1'), page.getByLabel('Checkbox 2')];
    for (const checkbox of checkboxes){
        await checkbox.check();
        await expect.soft(checkbox).toBeChecked();
    }
    for (const checkbox of checkboxes){
        if(await checkbox.isChecked()){
        await checkbox.uncheck();
        await expect.soft(await checkbox.isChecked()).toBeFalsy();
        }
    }
    await page.close();
})