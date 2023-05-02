import { Request, Response } from "express";
import { RefreshTokenUseClienteCase } from "./refreshTokenClienteUseCase";


class RefreshTokenClienteController {
  async handle(req: Request, res: Response){
    const { refreshToken } = req.body;

    const refreshTokenUseCase = new RefreshTokenUseClienteCase();
    const token = await refreshTokenUseCase.execute(refreshToken)

    return res.json(token)
  }
}

export {RefreshTokenClienteController}