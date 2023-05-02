import { Request, Response } from "express";
import { PrismaClientesRepositories } from "../repositories/prisma/prisma-clientes-repository";
import { CreateSessionClienteDTO } from "../types/types";
import { AuthenticateClienteCase } from "../use-cases/auth/authenticateCliente";




class AuthenticateClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cgc_pessoa } = request.body as CreateSessionClienteDTO;
     const prismaClientesRepositories = new PrismaClientesRepositories()
    const authenticateClienteCase = new AuthenticateClienteCase(prismaClientesRepositories)
    
    const token = await authenticateClienteCase.execute({ cgc_pessoa })
    
    return response.json(token)
  }
}

export {AuthenticateClienteController}