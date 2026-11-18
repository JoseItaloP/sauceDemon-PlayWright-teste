import {test, expect} from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

test.describe("Erro User Inventory Page",async ()=>{
    
    /* 
        O que testar
        1 - add to cart erro
        2 - remove to cart error
        3 - click no item do invetario e não tem descrição (error componente)
        4 - ao mudar ordem de elemento: Sorting is broken! This error has been reported to Backtrace.
    */

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