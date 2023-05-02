
import { hash } from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { UserRepository } from '../../repositories/users-repositories';
import { Role } from '../../types/types';


interface CreateUserUseCaseRequest {
   email: string,
  password: string,
  user: string,
  role: Role, 
  cpf: string,
  telefone: string
}
 
export class CreateUserUseCase{
  constructor(
    private userRepository: UserRepository,
  ) { }
  
  async execute(request: CreateUserUseCaseRequest) {
    const { email, password, user, role, cpf, telefone } = request;

    if (!user) {
      throw new AppError('Usuario is required.')
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
   
   
    const passwordHash = await hash(password, 8)
   
    const userAlreadyExists = await this.userRepository.findByUser(user)   
 
    if (userAlreadyExists) {
      throw new AppError('Usuario already exists')
    }   

   
    await this.userRepository.create({
      user,
      email,
      password: passwordHash,     
      role,
      cpf,
      telefone,     
    })
  }
}