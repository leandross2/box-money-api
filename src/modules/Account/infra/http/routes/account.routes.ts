import {Router} from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import { AccountController } from '../controllers/AccountController'
import ensureAuthenticated from '@modules/Shared/infra/http/middlewares/ensureAutentications'

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

accountRoutes.get('/me', ensureAuthenticated ,accountController.show)
