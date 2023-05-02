import { prisma } from '../../prisma'
import {USERS_APP} from '@prisma/client'
import { UserCreateData, UserRepository, UserUpdateData  } from '../users-repositories'

export class PrismaUserRepositories implements UserRepository {
  
  async create({
   email,
  password,
  user,  
  cpf,
  telefone,
  role
  }: UserCreateData) { 

   await prisma.uSERS_APP.create({
        data:{        
          email,
          users: user,
          password,
          cpf,
          telefone,
          role
        }
   })  
 
  }

  async update({
    id,
  email,
  password,
  user, 
    role,
    cpf,
    telefone,
    update_at

  }: UserUpdateData) {
    await prisma.uSERS_APP.update({
      where: {
         id: id,      
      },
      data: {         
  email,
  password,
  users: user, 
  role,
  cpf,
  telefone,
  update_at
      }
    })
  }   

  async findByUser(user: string): Promise<USERS_APP> {
    const usuario = await prisma.uSERS_APP.findFirst({
      where:{
        users:user
      }
    })
    console.log(usuario)

    return usuario!;
  } 

 
  async getFindByID(id: string): Promise<USERS_APP> {
    const user = await prisma.uSERS_APP.findUnique({
      where: {id}
    })
    return user!;
  }  
    
}