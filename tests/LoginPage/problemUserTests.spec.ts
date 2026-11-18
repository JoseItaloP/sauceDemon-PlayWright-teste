import {test, expect} from '@playwright/test'
import dotenv from 'dotenv'
import { MakeLogin } from '../../support/Helpers.js'

dotenv.config()

test.describe('Problem User Test Login page', async ()=>{
//Loga normalmente, problema na imagem dos itens na pagina inventario. Imagem de cachorro
//Como identificar que é outra imagem? os id/class (localizadores) são os mesmos.
//1. o tamanho da imagem é diferente
//2. em network, o status code da imagem que chega é 304 Not Modifed
// localizar meios melhores de diferentes para definir que a imagem está errada
// 

    test.beforeEach(async ({page})=>{
        await page.goto(process.env.TEST_LINK || '')
    })
    
    test('Login Problem user and verify with url', async ({page})=>{ 

        await MakeLogin(page, process.env.USER_PROBLEM || '', process.env.SECRET || '')

        const imgDog = page.locator('.inventory_item_img img').first()

        await expect(imgDog).toHaveAttribute('src', "/assets/sl-404-Cq1a9k9X.jpg")

    })

    test('Login Problem User and verify the URL with the Image addres', async ({page})=>{
        const imgURL: string[] = []

        page.on('response', response =>{
            if(response.request().resourceType() === 'image'){
                imgURL.push(response.url())
            }
        })

        await MakeLogin(page, process.env.USER_PROBLEM || '', process.env.SECRET || '')

        // 1. Aguarda a página de inventário carregar
        await page.waitForURL('**/inventory.html')
    
        // 2. Aguarda que pelo menos uma imagem do produto esteja visível
        await page.locator('.inventory_item_img img').first().waitFor()


        const LoadedProgblemImg = imgURL.some(url=> url.includes('sl-404'))
        expect(LoadedProgblemImg).toBe(true)
    })
})

test.describe("Problem User Inventory Page", async ()=>{

    test.beforeEach('', async ({page})=>{ 
      await page.goto(process.env.TEST_LINK || "")
      await MakeLogin(page, process.env.USER_PROBLEM || '', process.env.SECRET || '')

      expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
     })


     test("test the order not changing from itens", async({page})=>{
        const selectOrder =  page.locator('.product_sort_container')
        

        await selectOrder.selectOption('lohi')
        const itensInventoryPrice = page.locator('.inventory_item_price')
        const pricess = await itensInventoryPrice.allTextContents()
        const pricessNumber = pricess.map(price=>parseFloat(price.replace('$', '')))
        const sortedPricess = [...pricessNumber].sort((a,b)=>a-b)


        expect(sortedPricess).not.toEqual(pricessNumber)

        
     })

     test("add to cart not working in each element", async({page})=>{
    
        const addLabsBackpack = page.locator("#add-to-cart-sauce-labs-backpack")
        const addLabsBoltTShirt = page.locator("#add-to-cart-sauce-labs-bolt-t-shirt")
        
        await addLabsBackpack.click()

        const CartNumber = page.locator(".shopping_cart_badge")

        await expect(CartNumber).toHaveText("1")

        await addLabsBoltTShirt.click()

        await expect(CartNumber).toHaveText("1")

     })

     test("after adding item to cart, you can't remove it", async({page})=>{
        
        const addLabsBackpack = page.locator("#add-to-cart-sauce-labs-backpack")
     
        await addLabsBackpack.click()

        const CartNumber = page.locator(".shopping_cart_badge")

        await expect(CartNumber).toHaveText("1")
        
        const removeLabsBackpack = page.locator("#remove-sauce-labs-backpack")

        await removeLabsBackpack.click()

        await expect(CartNumber).toHaveText("1")

     })

     test("click in 'about' page result in 404 error", async({page})=>{
        
        const sideBar = page.locator("#react-burger-menu-btn")
        await sideBar.click()

        const aboutSideBar = page.locator("#about_sidebar_link")
        await aboutSideBar.click()

        await expect(page).toHaveURL("https://saucelabs.com/error/404")

     })

     test("different item in inventory after click in it", async({page})=>{
        //Sauce Labs Fleece Jacket e 
        const firstItem = page.locator(".inventory_item_name ").first()
        await firstItem.click()

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=5")

        const itemName = page.locator(".inventory_details_name")

        await expect(itemName).toHaveText("Sauce Labs Fleece Jacket")
     })


})

test.describe("Problem User Cart Page", async ()=>{
  /*
    O que testar 
     1 - Check-out step one page
        First name com apenas 1 character
        Last Name não digitavel
        Não conseguir continuar sem o last name
  */
})