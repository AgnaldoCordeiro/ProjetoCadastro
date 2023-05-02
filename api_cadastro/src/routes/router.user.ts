import express from 'express';
import { DeleteUserController } from '../controller/DeleteUserController';
import { FindByIdUserController } from '../controller/FindByIdUserController';
import { FindUserController } from '../controller/FindUsersController';
import { PrismaUserRepositories } from '../repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '../use-cases/user/createUser';
import { FindByCpfUserController } from '../use-cases/user/FindByCpfUserController';
import { UserUpdateData } from '../use-cases/user/updateUser';

const findUserController = new FindUserController()
const findByIdUserController = new FindByIdUserController()
const deleteUserController = new DeleteUserController()
const findByCpfUserController = new FindByCpfUserController()

export const routesUser = express.Router();
//routes.use(ensureAuthenticated)
routesUser.post('/users', async (req, res) => {
  const {email,
  password,
  user,  
  cpf,
  telefone,
role} = req.body;
  const prismaUserRepositories = new PrismaUserRepositories()
  const createUserUseCase = new CreateUserUseCase(prismaUserRepositories)

 if(role === "ADMIN"){
   createUserUseCase.execute({
      email,
   password,
   user, 
   cpf,
   telefone,
   role
 
   })
   return res.status(201).json('Usuário cadastrado com Sucesso')
 }else if(role === "USER"){
  createUserUseCase.execute({
    email,
 password,
 user, 
 cpf,
 telefone,
 role
 })
 return res.status(201).json('Usuário cadastrado com Sucesso')
 }
    return res.status(200).json('Erro ao cadastrar usuário')
 
})


routesUser.put('/users', async (req, res) => {
  const {  id,
  email,
  password,
  user,  
    role,
    cpf,
    telefone,
    update_at  } = req.body;
  const prismaUserRepositories = new PrismaUserRepositories()
  const userUpdateData = new UserUpdateData(prismaUserRepositories)

  if(role === "ADMIN"){
    userUpdateData.execute({
      id,
       email,
    password,
    user, 
    cpf,
    telefone,
    role,
    update_at
  
    })
    return res.status(201).json('Usuário atualizado com Sucesso')
  }else if(role === "USER"){
    userUpdateData.execute({
      id,
     email,
  password,
  user, 
  cpf,
  telefone,
  role,
  update_at
  })
  return res.status(201).json('Usuário atualizado com Sucesso')
  }
  return res.status(200).json('Erro ao atualizado usuário')
  
 
})



routesUser.delete('/users', deleteUserController.handle)
routesUser.get('/users', findUserController.handle)
routesUser.get('/users/:id', findByIdUserController.handle)
routesUser.post('/users/validacao', findByCpfUserController.handle)

