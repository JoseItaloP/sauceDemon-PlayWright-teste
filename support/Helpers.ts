import type { Page } from "@playwright/test";

const MakeLogin = async (page:Page, UserName: string, Password: string)=>{
    const userBox = page.locator("#user-name")
    const passBox = page.locator("#password")
    const btt = page.locator("#login-button")

    await userBox.fill(UserName)
    await passBox.fill(Password)

    await btt.click()
}

export {MakeLogin}