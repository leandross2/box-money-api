import { celebrate, Segments, Joi } from 'celebrate'
import {Router} from 'express'
import { TransactionsController } from '../controllers/TransactionsController'

export const transactionRoutes = Router()

const transactionsController = new TransactionsController()

transactionRoutes.post('/',
celebrate({
  [Segments.BODY]: {
    type: Joi.string().valid('credit', 'debit').required(),
    value: Joi.number().required(),
    account_id: Joi.string().guid(),
  },
}),
 transactionsController.create)

transactionRoutes.get('/:account_id',
celebrate({
  [Segments.PARAMS]: {
    account_id: Joi.string().guid(),
  },
}),
 transactionsController.index)
