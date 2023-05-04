import { Request, Response } from 'express'
import { prisma } from '../prisma'

export class FindClienteController {
 async handle(request: Request, response: Response) { 
    

    const result = await prisma.formulario_Pessoa.findMany();

    return response.json(result)
  }
}