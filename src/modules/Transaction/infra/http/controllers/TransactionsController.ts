import { CreateTransactionService } from '@modules/Transaction/service/CreateTransactionService'
import { ListTransactionService } from '@modules/Transaction/service/ListTransactionService'
import {Request, Response} from 'express'
import {container} from 'tsyringe'

export class TransactionsController{
  async create(request: Request, response: Response): Promise<Response>{
    const {type, value, account_id} = request.body

    const createTransaction = container.resolve(CreateTransactionService)

    const transaction = await createTransaction.execute({type, value: Number(value) * 100, account_id})

    return response.json(transaction)
  }

  async index(request: Request, response: Response): Promise<Response>{
    const {account_id} = request.params

    const listTransaction = container.resolve(ListTransactionService)

    const transactions = await listTransaction.execute({account_id})

    return response.json(transactions)
  }
}
