import { prisma } from '../../prisma'
import {REFRESH_TOKEN} from '@prisma/client'

import { RefreshTokenData, RefreshTokenRepository } from '../refreshToken-repositories'

export class PrismaRefreshTokenRepositories implements RefreshTokenRepository {
  async create({
    expiresIn,
    user_id    

  }: RefreshTokenData) { 
   await prisma.rEFRESH_TOKEN.create({
        data:{       
          expiresIn,
          user_id          
        }
   })  
 
  }
  async getFindByRefreshToken(token: string): Promise<REFRESH_TOKEN> {
    const refreshToken = await prisma.rEFRESH_TOKEN.findFirst({ 
      where: {
        user_id: token
      }
    })
   
    return refreshToken!
  }  
    
}