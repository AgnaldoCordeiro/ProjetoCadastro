
import {compare} from 'bcrypt'
import { sign } from "jsonwebtoken";
import { auth } from '../../config/config';
import { AppError } from '../../errors/AppError';
import { prisma } from '../../prisma';
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';
import { UserRepository } from '../../repositories/users-repositories';
import { Role } from '../../types/types';


interface IResponse {
  user: {
    users: string,
    email: string,
    role: Role | string,
  },
  token: string,
  refreshToken: {
    user_id: string,
    expiresIn: number
  }

}

interface AuthenticateUserCaseRequest {
  users: string;
  password: string;
}
 
export class AuthenticateUserCase{
  constructor(
    private userRepository: UserRepository,
  ) { }
  
  async execute(request: AuthenticateUserCaseRequest):Promise<IResponse> {
    const { users, password } = request;
  
    const usuario = await this.userRepository.findByUser(users)
      
    if (!usuario) {
      throw new AppError('Usuário or password incorrect!.')
    }

    const passwordMatch = await compare(password, usuario.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!.')
    }
   
  const generateTokenProvider = new GenerateTokenProvider()
  const token = await  generateTokenProvider.execute(usuario.id)
  
  await prisma.rEFRESH_TOKEN.deleteMany({
    where:{
      user_id: usuario.id,
    }
  })
  const generateRefreshToken = new GenerateRefreshToken();
  const refreshToken = await generateRefreshToken.execute(usuario.id)

 
    const tokenReturn: IResponse = {
      token,
      user: {
        users: usuario.users,
        email: usuario.email,
        role: usuario.role

      },
      refreshToken: {
        user_id: refreshToken.user_id,
        expiresIn: refreshToken.expiresIn
      }    

    }

   

    return tokenReturn
      

    
    
  }
    
}