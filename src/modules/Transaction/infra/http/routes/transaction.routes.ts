import ensureAuthenticated from '@modules/Shared/infra/http/middlewares/ensureAutentications'
import { celebrate, Segments, Joi } from 'celebrate'
import {Router} from 'express'
import { TransactionsController } from '../controllers/TransactionsController'

export const transactionRoutes = Router()

const transactionsController = new TransactionsController()

transactionRoutes.post('/',
ensureAuthenticated,
celebrate({
  [Segments.BODY]: {
    type: Joi.string().valid('credit', 'debit').required(),
    value: Joi.number().required(),
    account_id: Joi.string().guid(),
    description: Joi.string().required(),
  },
}),
 transactionsController.create)

transactionRoutes.get('/',
ensureAuthenticated,
transactionsController.index)
