import {Router} from 'express'

import { accountRoutes } from '@modules/Account/infra/http/routes/account.routes'
import { transactionRoutes } from '@modules/Transaction/infra/http/routes/transaction.routes'

export const routes = Router()

routes.use('/accounts', accountRoutes)
routes.use('/transactions', transactionRoutes)
