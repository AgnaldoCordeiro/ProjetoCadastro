import { prisma } from "../../prisma"
import dayjs from "dayjs"
import { GenerateRefreshTokenCliente } from "../../provider/GenerateRefreshTokenCliente"
import { GenerateTokenProviderCliente } from "../../provider/GenerateTokenProviderCliente"


class RefreshTokenUseClienteCase {
  async execute(refresh_token: string){
    const refreshToken = await prisma.rEFRESH_TOKEN_CLIENTE.findFirst({ 
      where: {
        cliente_id: refresh_token
      }
    })

    if(!refreshToken){
      throw new Error("Refresh Token Invalid")
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    const generateTokenProvider = new GenerateTokenProviderCliente()
    const token = await generateTokenProvider.execute(refreshToken.cliente_id)
  

    if(refreshTokenExpired){
      await prisma.rEFRESH_TOKEN_CLIENTE.deleteMany({
        where: {
          cliente_id: refreshToken.cliente_id
        }
      })
      const generateRefreshTokenProvider = new GenerateRefreshTokenCliente();
      const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.cliente_id)

      return {token, refreshToken: newRefreshToken }
    }

  
  return { token };
  }

}

export {RefreshTokenUseClienteCase}