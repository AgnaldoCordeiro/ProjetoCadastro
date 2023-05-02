import { Request, Response } from "express";
import { RefreshTokenUseUserCase } from "./refreshTokenUserUseCase";

class RefreshTokenUserController {
  async handle(req: Request, res: Response){
    const { refreshToken } = req.body;

    const refreshTokenUseCase = new RefreshTokenUseUserCase();
    const token = await refreshTokenUseCase.execute(refreshToken)

    return res.json(token)
  }
}

export {RefreshTokenUserController}