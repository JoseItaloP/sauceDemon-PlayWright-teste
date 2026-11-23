import {test, expect} from '@playwright/test'
import dotenv from 'dotenv'
import { MakeLogin } from '../../support/Helpers.js'

dotenv.config()

test.describe("Erro User Inventory Page",async ()=>{

  test.beforeEach('', async ({page})=>{ 
      await page.goto(process.env.TEST_LINK || "")
      await MakeLogin(page, process.env.USER_ERROR || '', process.env.SECRET || '')

      expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
     })

  test("adding the item to cart and cant remove it", async ({page})=>{
    //add-to-cart-sauce-labs-backpack
    const addButt = page.locator("#add-to-cart-sauce-labs-backpack")
    await addButt.click()
    //shopping_cart_badge 1 
    const cartBadge = page.locator(".shopping_cart_badge")

    expect(cartBadge).toHaveText('1')

    //remove-sauce-labs-backpack
    const removeButt = page.locator("#remove-sauce-labs-backpack")
    await removeButt.click()

    expect(cartBadge).toHaveText('1')


  })

  test("after clink in the item name not see description", async ({page})=>{
    //item_4_title_link
    const itemLink = page.locator("#item_4_title_link")
    await itemLink.click()
    //inventory_details_desc
    const description =  page.locator(".inventory_details_desc")
    expect(description).not.toBeAttached()

  })

  test("erro after try to change the order in page", async ({page})=>{
    let mensageErro  = ''

    page.on('dialog', async (mensage)=>{
      mensageErro = mensage.message()
      await mensage.accept()
    })

    const selectorChange = page.locator(".product_sort_container")
    await selectorChange.selectOption('lohi')

    expect(mensageErro).toBe("Sorting is broken! This error has been reported to Backtrace.")
  })

})


test.describe("Error User Cart Page", async ()=>{
  /*
    O que testar 
     1 - Check-out step one page
        Last Name não digitavel
        Continuar com o pedido mesmo sem o last name
     2 - erro ao tentar finalizar pedido
  */
})