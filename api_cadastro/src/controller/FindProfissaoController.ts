import { Request, Response } from 'express'
import { prisma } from '../prisma'

export class FindProfissaoController {
  async handle(request: Request, response: Response) { 
    const result = await prisma.profissao.findMany()
    return response.json(result)
  }
}