import {Router} from 'express'

import { accountRoutes } from '@modules/Account/infra/http/routes/account.routes'
import { sessionRoutes } from '@modules/Account/infra/http/routes/session.routes'
import { transactionRoutes } from '@modules/Transaction/infra/http/routes/transaction.routes'

export const routes = Router()

routes.use('/accounts', accountRoutes)
routes.use('/sessions', sessionRoutes)
routes.use('/transactions', transactionRoutes)
