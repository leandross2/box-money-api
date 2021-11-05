import {Router} from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import { AccountController } from '../controllers/AccountController'

export const accountRoutes = Router()

const accountController = new AccountController()

accountRoutes.post('/',
celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    username: Joi.string().required(),
  },
}),
accountController.create)

accountRoutes.get('/:account_id',
  celebrate({
    [Segments.PARAMS]: {
      account_id: Joi.string().guid(),
    },
  }),
accountController.show)
