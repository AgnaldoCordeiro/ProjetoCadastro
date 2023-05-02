import {USERS_APP} from '@prisma/client'

import { Role } from '../types/types'

export interface UserCreateData{
  email: string,
  password: string,
  user: string,
  role: Role,
  cpf: string,
  telefone: string
}

export interface UserUpdateData {
  id: string,
  email: string,
  password: string,
  user: string, 
  role: Role,
  cpf: string,
  telefone: string,
  update_at: Date
  
}


export interface UserRepository{
  create: (data: UserCreateData) => Promise<void>
  update: (data: UserUpdateData) => Promise<void>
  findByUser: (user: string) => Promise<USERS_APP>
  getFindByID: (id: string) => Promise<USERS_APP>
  

}