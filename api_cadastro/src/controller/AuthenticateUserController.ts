import { Request, Response } from "express";
import { PrismaUserRepositories } from "../repositories/prisma/prisma-users-repository";
import { CreateSessionDTO } from "../types/types";
import { AuthenticateUserCase } from "../use-cases/auth/authenticateUser";



class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { users, password } = request.body as CreateSessionDTO;
     const prismaUserRepositories = new PrismaUserRepositories()
    const authenticateUserCase = new AuthenticateUserCase(prismaUserRepositories)
    
    const token = await authenticateUserCase.execute({ users, password })
    
    return response.json(token)
  }
}

export {AuthenticateUserController}