import { Request, Response } from 'express'
import { prisma } from '../prisma'

export class FindByIdUserController {
  async handle(request: Request, response: Response) { 
    const { id } =  request.params
    const user = await prisma.uSERS_APP.findFirst({
      where: { id }
     
    })
    return response.json(user)
  }
}