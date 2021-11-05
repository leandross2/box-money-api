import {Transactions} from '@prisma/client'

import {ICreateTransactionDTO} from '../Dtos/ICreateTransactionDTO'

export interface ITransactionRepository{
  createTransaction(data: ICreateTransactionDTO): Promise<Transactions>
  findAll(account_id: string): Promise<Transactions[]>
}
