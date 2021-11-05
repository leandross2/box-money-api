import {container} from 'tsyringe'

import { IAccountRepository } from '@modules/Account/IRepositories/IAccountRepository'
import { AccountRepository } from '@modules/Account/infra/repository/AccountRepository'

import { TransactionRepository } from '@modules/Transaction/infra/repository/TransactionRepository'
import { ITransactionRepository } from '@modules/Transaction/IRepositories/ITransactionRepository'


container.registerSingleton<IAccountRepository>(
  'AccountRepository',
  AccountRepository
)

container.registerSingleton<ITransactionRepository>(
  'TransactionRepository',
  TransactionRepository
)
