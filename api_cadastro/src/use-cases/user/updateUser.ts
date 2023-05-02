import { AppError } from "../../errors/AppError";

import { UserRepository } from "../../repositories/users-repositories";
import { hash } from 'bcrypt';
import dayjs from "dayjs";
import { Role } from "../../types/types";


interface UserUpdateDataRequest {
  id: string,
  email: string,
  password: string,
  user: string,  
  role: Role,
  cpf: string,
  telefone: string,
  update_at: Date
 
}
 
export class UserUpdateData{
  constructor(
    private userRepository: UserRepository,
  ) { }
  
  async execute(request: UserUpdateDataRequest) {
    const { id, email, password, user, role, cpf, telefone, update_at } = request;

    if (!user) {
      throw new AppError('user is required.')
    }
    if (!email) {
      throw new AppError('email is required.')
    }
    if (!password) {
      throw new AppError('password is required.')
    }    
   
    if (!role) {
      throw new AppError('Role is required.')
    }
   
    if (!cpf) {
      throw new AppError('CPF is required.')
    }
    if (!telefone) {
      throw new AppError('Telefone is required.')
    }
    const passwordHash = await hash(password, 8)
    const dataAtualizada = new Date()
   
    await this.userRepository.update({
      id,
      user,
      email,
      password: passwordHash,      
      role,
      cpf,
      telefone,
      update_at: dataAtualizada
    })
  }
}