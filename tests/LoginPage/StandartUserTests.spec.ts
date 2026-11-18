import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
import { MakeLogin } from '../../support/Helpers.js';

dotenv.config()

test.describe("Standart User Login Page", async ()=>{
  
  test.beforeEach('', async ({page})=>{
    await page.goto(process.env.TEST_LINK || "" )
  })

  test("Log In", async ({page})=>{
    await MakeLogin(page, process.env.USER_STANDART || '', process.env.SECRET || '')

    expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

  })

  test("Log in With wrog password", async ({page})=>{
    
    await MakeLogin(page, process.env.USER_STANDART || '', 'WrongPass')
    
    const ErrorBox = page.locator(".error-message-container")
    await expect(ErrorBox).toHaveText("Epic sadface: Username and password do not match any user in this service")

  })

  test("Log in without username", async ({page})=>{
    
      await MakeLogin(page, '', 'WrongPass')

      const ErrorBox = page.locator(".error-message-container")
      await expect(ErrorBox).toHaveText("Epic sadface: Username is required")

  })


test("Log in without password", async ({page})=>{
   
    await MakeLogin(page,process.env.USER_STANDART || '', '')

    const ErrorBox = page.locator(".error-message-container")
    await expect(ErrorBox).toHaveText("Epic sadface: Password is required")

  })


  test("Close error bar", async ({page})=>{
   
    await MakeLogin(page, '', '')

    const ErroBox = page.locator(".error-message-container")
    const ErroBoxCloser = page.locator(".error-button")

    await expect(ErroBox).toHaveText("Epic sadface: Username is required")

    await ErroBoxCloser.click()

    await expect(ErroBoxCloser).not.toBeVisible()
  })

})


test.describe("Standart User Inventory Page", async ()=>{
  
     test.beforeEach('', async ({page})=>{ 
      await page.goto(process.env.TEST_LINK || "")
      await MakeLogin(page, process.env.USER_STANDART || '', process.env.SECRET || '')

      expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
     })

    test("the order of itens in page on Low to Hight", async({page})=>{
      const selectOrder = page.locator(".product_sort_container")
      await selectOrder.selectOption("lohi")

      const inventoryItens = page.locator(".inventory_item_price")//pega todos os valores de itens
      const prices = await inventoryItens.allTextContents()//pega todo o texto e em um array
      const pricesAsNumbers = prices.map(price => parseFloat(price.replace('$','')));//remove os '$', ficando so os numeros

      const sortedPrices = [...pricesAsNumbers].sort((a,b)=>a-b)//organiza os numero do menor ao maior

      expect(pricesAsNumbers).toEqual(sortedPrices)

    })

    test("the order of itens in page on Z to A", async ({page})=>{
      const selectOrder = page.locator(".product_sort_container")
      await selectOrder.selectOption("za")

      const inventorynames = page.locator("inventory_item_name")
      const nameList = await inventorynames.allTextContents()

      const orderNameList = [...nameList].sort((a,b) => b.localeCompare(a)) //organizar versão em ordem de z-a
      expect(nameList).toEqual(orderNameList)
    })

    test("to add and remove items from cart", async({page})=>{
      const addButt = page.locator("#add-to-cart-sauce-labs-backpack")
      await addButt.click()

      const badgetCartIcon = page.locator(".shopping_cart_badge")
      await expect(badgetCartIcon).toHaveText("1")
      await expect(badgetCartIcon).toBeVisible()

      const removeButt = page.locator("#remove-sauce-labs-backpack")
      await removeButt.click()
      expect(badgetCartIcon).not.toBeVisible()

    })

    test("to enter in the item page and go back", async({page})=>{
      const itemHeaderLink = page.locator(".inventory_item_name").first()
    
      await itemHeaderLink.click()

      expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=4")

      const goBackBtt = page.locator("#back-to-products")
      await goBackBtt.click()

      expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test("the dynamic catalog - Lazy Load", async({page})=>{
      //test the infinit roll page
      const sideBar = page.locator("#react-burger-menu-btn")
      await sideBar.click()

      const dynamicSideBar = page.locator("#dynamic_catalog_sidebar_link")
      await dynamicSideBar.click()

      const LazyBtt = page.locator("#dynamic_catalog_lazy_load_link")
      await LazyBtt.click()

      await expect(page).toHaveURL("https://www.saucedemo.com/dynamic-catalog-lazy-load.html")

      const items = page.locator(".dynamic_catalog_card")
      const initialCount = await items.count()

      await page.evaluate(()=> window.scrollTo(0, document.body.scrollHeight))

      const secondCount = await items.count()

      expect(secondCount).toBeGreaterThan(initialCount)

    })

    test("the dynamic catalog - Slider", async({page})=>{
      // test the circles that indicate the images
      const sideBar = page.locator("#react-burger-menu-btn")
      await sideBar.click()

      const dynamicSideBar = page.locator("#dynamic_catalog_sidebar_link")
      await dynamicSideBar.click()
      
      const sliderBtt = page.locator("#dynamic_catalog_slider_link")
      await sliderBtt.click()

      await expect(page).toHaveURL("https://www.saucedemo.com/dynamic-catalog-slider.html")
    
      const slidersBtt = page.locator(".dynamic_catalog_slider_dot").last()
      const cardName = page.locator(".dynamic_catalog_card_name")

      await slidersBtt.click()
      await expect(cardName).toHaveText("Sauce Labs Fleece Jacket")


    })

    test("the wait in dynamic catalog - Spinner", async({page})=>{
      const sideBar = page.locator("#react-burger-menu-btn")
      await sideBar.click()

      const dynamicSideBar = page.locator("#dynamic_catalog_sidebar_link")
      await dynamicSideBar.click()

      const spinerBtt = page.locator("#dynamic_catalog_spinner_link")
      await spinerBtt.click()

      await expect(page.locator(".dynamic_catalog_spinner")).toBeVisible()

      await expect(page).toHaveURL("https://www.saucedemo.com/dynamic-catalog-spinner.html")

      const cardName = page.locator(".dynamic_catalog_card_name").first()
      await cardName.click()

      await expect(page).toHaveURL("https://www.saucedemo.com/dynamic-catalog-spinner.html")
    
    })

    test("open and close the side bar'", async({page})=>{
      const sideBar = page.locator("#react-burger-menu-btn")
      await sideBar.click()

      const inventorySideBar = page.locator("#inventory_sidebar_link")
      const dynamicSideBar = page.locator("#dynamic_catalog_sidebar_link")
      const aboutSideBar = page.locator("#about_sidebar_link")
      const logoutSideBar = page.locator("#logout_sidebar_link")
      const resetSideBar = page.locator("#reset_sidebar_link")

      const closeSideBar = page.locator("#react-burger-cross-btn")

      await expect(inventorySideBar).toBeVisible()
      await expect(dynamicSideBar).toBeVisible()
      await expect(aboutSideBar).toBeVisible()
      await expect(logoutSideBar).toBeVisible()
      await expect(resetSideBar).toBeVisible()

      await closeSideBar.click()

      await expect(inventorySideBar).not.toBeVisible()
      await expect(dynamicSideBar).not.toBeVisible()
      await expect(aboutSideBar).not.toBeVisible()
      await expect(logoutSideBar).not.toBeVisible()
      await expect(resetSideBar).not.toBeVisible()

    })

    test("click in the 'about page'", async({page})=>{
        const sideBar = page.locator("#react-burger-menu-btn")
        await sideBar.click()

        const aboutSideBar = page.locator("#about_sidebar_link")
        await aboutSideBar.click()

        await expect(page).toHaveURL("https://saucelabs.com/")

    })

    test("make logout", async({page})=>{
        const sideBar = page.locator("#react-burger-menu-btn")
        await sideBar.click()
      
        const logoutSideBar = page.locator("#logout_sidebar_link")
        await logoutSideBar.click()

        await expect(page).toHaveURL("https://www.saucedemo.com/")

    })


})

test.describe("Standart User Cart Page", async ()=>{
  /*
    O que testar 
     1 - Finalizar checkout com item
     2 - Remover item do cart 
     3 - Check-out step one page
      Erro: First Name required
      Error: Last Name is required
      Error: Postal Code is required
     4 - Check-out step two page: verificar se é o mesmo item passado
     5 - Generate PDF order
  */
})
