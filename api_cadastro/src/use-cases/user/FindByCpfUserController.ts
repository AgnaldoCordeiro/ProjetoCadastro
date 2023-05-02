import { Request, Response } from 'express'
import { prisma } from '../../prisma'

export class FindByCpfUserController {
  async handle(request: Request, response: Response) { 
    const { cpf } =  request.body
    const result = await prisma.uSERS_APP.findFirst({
      where: { 
        cpf: cpf
       }
     
    })

    if(result){
      return response.json({mensagem : 'CPF já cadastrado'})
    }else {
      return response.json({mensagem : 'false'})

    }    
  }
}