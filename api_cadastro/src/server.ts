import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors"
import { AppError } from './errors/AppError';
import { routesUser } from './routes/router.user';
import { authenticated } from './routes/router.authenticate';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routesCliente } from './routes/router.cliente';
import { routesBuscas } from './routes/router.buscas';

const app = express();

app.use(express.json({ limit: '250mb' }));
app.use(cors())
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.set("view engine", "ejs");


app.use(express.static("public"));
app.use(authenticated)
app.use(routesUser)
app.use(routesCliente)
app.use(routesBuscas)
app.use(bodyParser.json()); // para analisar JSON
app.use(bodyParser.urlencoded({ extended: true })); // para analisar URL codificado




app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }
  return res.status(500).json({
    status: "error",
    message: `Internal server error = ${err.message}`
  })
})

app.get('/', (req, res) => {
  res.status(200).json({
    status: `${res.statusCode}`,
    message: "Online"
  })
})

app.listen(process.env.PORT || 3333, () => {
  console.log('listening on');
})