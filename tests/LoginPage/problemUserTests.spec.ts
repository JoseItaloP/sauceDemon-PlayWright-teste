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

     // o que testar no problem User: 
    /*
        1 - Ordem de itens na page invetory não funciona
        2 - add to cart não funciona em todos os elemento
        3 - apos add to cart, não consegue remover
        4 - clicar em about resulta em pagina 404
        5 - Ao clicar em item no invetario verificar que item no display é diferente ou não existe
    */

})