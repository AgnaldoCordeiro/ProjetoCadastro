import express from 'express';
import { AuthenticateClienteController } from '../controller/AuthenticateClienteController';
import { AuthenticateUserController } from '../controller/AuthenticateUserController';
import { RefreshTokenClienteController } from '../use-cases/refreshToken/refreshTokenClienteController';
import { RefreshTokenUserController } from '../use-cases/refreshToken/refreshTokenUserController';

export const authenticated = express.Router();

const authenticateClienteController = new AuthenticateClienteController();
const refreshTokenClienteController = new RefreshTokenClienteController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();



authenticated.post('/sessions-colaborador', authenticateUserController.handle)
authenticated.post('/refresh-token', refreshTokenUserController.handle)
authenticated.post('/sessions-cliente', authenticateClienteController.handle)
authenticated.post('/refresh-token-cliente', refreshTokenClienteController.handle)