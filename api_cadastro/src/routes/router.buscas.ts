import express from 'express';
import { FindByCepController } from '../controller/FindByCepController';
import { FindEstadoSocialController } from '../controller/FindEstadoSocialController';
import { FindProfissaoController } from '../controller/FindProfissaoController';


const findByCepController = new FindByCepController()
const findEstadoSocialController = new FindEstadoSocialController()
const findProfissaoController = new FindProfissaoController()


export const routesBuscas = express.Router();
//routes.use(ensureAuthenticated)
routesBuscas.get('/buscas/cep/:id', findByCepController.handle)
routesBuscas.get('/buscas/estadosocial', findEstadoSocialController.handle)
routesBuscas.get('/buscas/profissao', findProfissaoController.handle)

