import {test, expect} from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

test.describe('locked Out user test', async ()=>{
    test.beforeEach('', async ({page})=>{
        await page.goto(process.env.TEST_LINK || "" )
    })

    test("Erro locked out user", async ({page})=>{
        
        const UserName = page.locator('#user-name')
        const password = page.locator("#password")
        const btt = page.locator("#login-button")

        await UserName.fill(process.env.USER_LOCKED_OUT || '')
        await password.fill(process.env.SECRET || '')
        await btt.click()

        const erroBox = page.locator(".error-message-container")

        await expect(erroBox).toHaveText("Epic sadface: Sorry, this user has been locked out.")

    })
})