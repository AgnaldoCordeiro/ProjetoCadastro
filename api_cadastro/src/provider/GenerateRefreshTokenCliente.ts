import { prisma } from "../prisma"
import dayjs from 'dayjs'


class GenerateRefreshTokenCliente {
  async execute(cliente_id: string){
    const expiresIn = dayjs().add(15, "seconds").unix()
    const generateRefreshToken = await prisma.rEFRESH_TOKEN_CLIENTE.create({
      data: {
        cliente_id,
        expiresIn
      }
    })

    return generateRefreshToken;
  }
}

export {GenerateRefreshTokenCliente}