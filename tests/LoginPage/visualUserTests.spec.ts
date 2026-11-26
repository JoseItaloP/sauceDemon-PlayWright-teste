import {test, expect} from '@playwright/test'
import dotenv from 'dotenv'
import { MakeLogin } from '../../support/Helpers.js'

dotenv.config()

test.describe("Visual User Inventory Page", async ()=>{

    test.beforeEach('', async ({page})=>{ 
      await page.goto(process.env.TEST_LINK || "")
      await MakeLogin(page, process.env.USER_VISUAL || '', process.env.SECRET || '')

      expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
     })

     test("icons from card and burger options in wrong place", async ({page})=>{
      await page.locator(".bm-burger-button").click()
      await page.locator("#logout_sidebar_link").click()

      await MakeLogin(page, process.env.USER_STANDART || '', process.env.SECRET || '')
      await page.waitForURL("**/inventory.html");

      const icon = page.locator(".shopping_cart_container")
      const burgerBtt = page.locator(".bm-burger-button")
      const boxIcon = await icon.boundingBox()
      const boxburgerBtt = await burgerBtt.boundingBox()

      
      await page.locator(".bm-burger-button").click()
      await page.locator("#logout_sidebar_link").click()
      await page.waitForURL("https://www.saucedemo.com/");


      await MakeLogin(page, process.env.USER_VISUAL || '', process.env.SECRET || '')
      await page.waitForURL("**/inventory.html");

      const iconWrong = page.locator(".shopping_cart_container")
      const burgerBttWrong = page.locator(".bm-burger-button")
      const boxIconWrong = await iconWrong.boundingBox()
      const boxBurgerBttWrong = await burgerBttWrong.boundingBox()

      expect(boxIcon).not.toBe(boxIconWrong)
      expect(boxburgerBtt).not.toBe(boxBurgerBttWrong)

     })


     test("the first item always have the dog photo and the randomizer values of itens after change the order", async ({page})=>{

      // /assets/sl-404-Cq1a9k9X.jpg
      const imageFirstItem = page.locator(".inventory_item_img").first()

      await expect(imageFirstItem).toHaveJSProperty('src', "/assets/sl-404-Cq1a9k9X.jpg")
     })


})

test.describe("Visual User Cart Page", async ()=>{
  /*
    O que testar 
     1 - Checkout element no canto superior direito da pagina
  */
})