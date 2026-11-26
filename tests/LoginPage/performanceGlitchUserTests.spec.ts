import {test, expect} from '@playwright/test';
import dotenv from 'dotenv'
import { MakeLogin } from '../../support/Helpers.js';

dotenv.config()


test.describe("Performance Glitch User Tests", ()=>{

    test.beforeEach('', async ({page})=>{ 
      await page.goto(process.env.TEST_LINK || "")
      await MakeLogin(page, process.env.USER_GLITCH || '', process.env.SECRET || '')

      await page.waitForURL("**/inventory.html");
      
     })


    test("the wait to load inventory page", async ({page})=>{
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

        const shopCard = page.locator(".shopping_cart_link")
        await shopCard.click()

        const continueShop = page.locator("#continue-shopping")
        await continueShop.click()
        await page.waitForURL("**/inventory.html")
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    })
})