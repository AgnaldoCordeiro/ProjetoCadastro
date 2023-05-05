import { Request, Response } from 'express'
import { prisma } from '../prisma'

export class FindByIdClienteController {
  async handle(request: Request, response: Response) { 
    const { cgc_pessoa } =  request.params
    const result = await prisma.formulario_Pessoa.findFirst({
      where: { cgc_pessoa }
     
    })
    return response.json(result)
  }
}