import {Router} from 'express'
import {celebrate, Joi, Segments} from 'celebrate'

import { SessionController } from '../controllers/SessionController'

export const sessionRoutes = Router()

const sessionController= new SessionController()

sessionRoutes.post('/',
celebrate({
  [Segments.BODY]: {
    username: Joi.string().required(),
  },
}),
sessionController.create)

