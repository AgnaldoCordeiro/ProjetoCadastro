import { Request, Response } from 'express'
import { prisma } from '../prisma'


export class FindByCepController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      console.log(`Buscando CEP ${id}...`);
      const result = await prisma.cORREIOS_ONLINE.findFirst({
        where: {
          cep_numero: id,
        },
      });

      if (!result) {
        console.log(`CEP ${id} não encontrado.`);
        return response.status(404).json({ message: 'CEP não encontrado' });
      }

      console.log(`CEP ${id} encontrado:`, result);
      return response.json(result);
    } catch (error) {
      console.log(`Erro ao buscar CEP `, error);
      return response.status(500).json({ message: 'Erro ao buscar CEP' });
    } finally {
      await prisma.$disconnect();
    }
  }
}