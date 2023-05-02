import { Request, Response } from 'express'
import { prisma } from '../prisma'

export class FindEstadoSocialController {
  async handle(request: Request, response: Response) { 
    const result = await prisma.estado_Civil.findMany()
    return response.json(result)
  }
}