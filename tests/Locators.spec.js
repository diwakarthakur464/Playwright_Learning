//const { test, expect } = require('@playwright/test');
import {test, expect} from '@playwright/test'

test('Login', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html')
  
    await page.click("id=login2");
    
    // Fill the login form
    await page.fill('#loginusername', 'pavanol') 
      
    await page.fill('#loginpassword', 'test@123') 
    
    
    // Click on the login button 
    await page.click("button[onclick='logIn()']"); 
     
    // Verify successful login by checking the presence of the logout button
    const logoutLink=await page.locator('//a[normalize-space()="Log out"]') 
    await expect(logoutLink).toBeVisible(); 

   await page.close();
 
 });
 
