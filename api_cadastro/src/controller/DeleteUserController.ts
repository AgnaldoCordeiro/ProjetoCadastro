import { Request, Response } from "express";
import { prisma } from "../prisma";


export class DeleteUserController {
  async handle(request: Request, response: Response) {
     const { id } = request.body
    const result = await prisma.uSERS_APP.delete({
      where: {
        id: id,
      }
    })  
  
    return response.json("Deletado com sucesso")
  }
}

