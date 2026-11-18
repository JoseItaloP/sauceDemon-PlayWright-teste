import {test, expect} from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

test.describe("Visual User Inventory Page", async ()=>{
  /*
    O que testar 
     1 - Primeiro item na pagina com foto de cachorro (mesmo apos mudanças de ordem dos elentos)
     2 - Carrinho icon no lugar errado
     3 - 3 pontinhos do lado esquedo meio torto
     4 - quando reordena a pagina, os itens não ficam na ordenação correta
  */
})

test.describe("Visual User Cart Page", async ()=>{
  /*
    O que testar 
     1 - Checkout element no canto superior direito da pagina
  */
})