import 'reflect-metadata'
import 'express-async-errors'
import express,{Router, Request, Response, NextFunction} from 'express'
import {errors} from 'celebrate'

import {routes} from './routes'
import '../../container'
import AppError from '@modules/Shared/errors/AppErro'


const app = express()

app.use(express.json())
app.use(routes)
app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen('3333', ()=>{
  console.log('rodando')
})


