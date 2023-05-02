
import {compare} from 'bcrypt'
import { sign } from "jsonwebtoken";
import { auth } from '../../config/config';
import { AppError } from '../../errors/AppError';
import { prisma } from '../../prisma';
import { GenerateRefreshTokenCliente } from '../../provider/GenerateRefreshTokenCliente';
import { GenerateTokenProviderCliente } from '../../provider/GenerateTokenProviderCliente';

import { ClienteRepository } from '../../repositories/cliente-repositories';



interface IResponse {
  cliente: {
    cgc_pessoa: string;
  },
  token: string,
  refreshToken: {
    cliente_id: string,
    expiresIn: number
  }

}

interface AuthenticateClienteCaseRequest {
  cgc_pessoa: string;
}
 
export class AuthenticateClienteCase{
  constructor(
    private clienteRepository: ClienteRepository,
  ) { }
  
  async execute(request: AuthenticateClienteCaseRequest):Promise<IResponse> {
    const { cgc_pessoa } = request;
  
    const cliente = await this.clienteRepository.findByCliente(cgc_pessoa)
      
    if (!cliente) {
      throw new AppError('Usuário incorrect!.')
    }     
   
  const generateTokenProvider = new GenerateTokenProviderCliente()
  const token = await  generateTokenProvider.execute(cliente.cgc_pessoa)
  
  await prisma.rEFRESH_TOKEN_CLIENTE.deleteMany({
    where:{
      cliente_id: cliente.cgc_pessoa,
    }
  })
  const generateRefreshToken = new GenerateRefreshTokenCliente();
  const refreshToken = await generateRefreshToken.execute(cliente.cgc_pessoa)

 
    const tokenReturn: IResponse = {
      token,
      cliente: {
        cgc_pessoa: cliente.cgc_pessoa,
      },
      refreshToken: {
        cliente_id: refreshToken.cliente_id,
        expiresIn: refreshToken.expiresIn
      }    

    }

   

    return tokenReturn
      

    
    
  }
    
}