import { prisma } from "../../prisma"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"
import dayjs from "dayjs"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"


class RefreshTokenUseUserCase {
  async execute(refresh_token: string){
    const refreshToken = await prisma.rEFRESH_TOKEN.findFirst({ 
      where: {
        user_id: refresh_token
      }
    })

    if(!refreshToken){
      throw new Error("Refresh Token Invalid")
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(refreshToken.user_id)
  

    if(refreshTokenExpired){
      await prisma.rEFRESH_TOKEN.deleteMany({
        where: {
          user_id: refreshToken.user_id
        }
      })
      const generateRefreshTokenProvider = new GenerateRefreshToken();
      const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.user_id)

      return {token, refreshToken: newRefreshToken }
    }

  
  return { token };
  }

}

export {RefreshTokenUseUserCase}