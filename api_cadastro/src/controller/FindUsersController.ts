import { Request, Response } from 'express'
import { prisma } from '../prisma'

export class FindUserController {
 async handle(request: Request, response: Response) { 
    

    const result = await prisma.uSERS_APP.findMany();

    return response.json(result)
  }
}