import {RefreshToken} from '@prisma/client'

export interface RefreshTokenData{
    expiresIn: number;   
    user_id: string
}

export interface RefreshTokenRepository{
  create: (data: RefreshTokenData) => Promise<void> 
  getFindByRefreshToken: (token: string) => Promise<RefreshToken>

}