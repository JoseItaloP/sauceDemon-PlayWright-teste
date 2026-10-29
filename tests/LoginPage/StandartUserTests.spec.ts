import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
import { MakeLogin } from '../../support/Helpers.js';

dotenv.config()

test.describe("Login Page tests", async ()=>{
  
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


test.describe("Inventory Page", async ()=>{
  /*
    O que testar 
     1 - Enumerar ordem de itens
     2 - adicionar e remover itens ao carinho
     3 - entrar dentro da pagina do item
     4 - Dynamic catalog
     5 - click in about page
     6 - logaut
  */
})