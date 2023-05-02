import { prisma } from "../prisma"
import dayjs from 'dayjs'


class GenerateRefreshToken {
  async execute(user_id: string){
    const expiresIn = dayjs().add(15, "seconds").unix()
    const generateRefreshToken = await prisma.rEFRESH_TOKEN.create({
      data: {
        user_id,
        expiresIn
      }
    })

    return generateRefreshToken;
  }
}

export {GenerateRefreshToken}