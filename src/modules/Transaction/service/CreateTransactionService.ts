import { IAccountRepository } from '@modules/Account/IRepositories/IAccountRepository';
import AppError from '@modules/Shared/errors/AppErro';
import {inject, injectable} from 'tsyringe'
import { ITransactionRepository } from '../IRepositories/ITransactionRepository';

interface IRequestDTO{
  account_id: string
  value: number
  type: 'credit' | 'debit'
  description: string
}

@injectable()
export class CreateTransactionService{
  constructor(
    @inject('TransactionRepository') private transactionRepository: ITransactionRepository,
    @inject('AccountRepository') private accountRepository: IAccountRepository
  ){}

  async execute({account_id, value, type, description}:IRequestDTO){
    const accountExist = await this.accountRepository.findAccountById(account_id)

    if(!accountExist){
      throw new AppError('Account not found')
    }

    if(type === 'debit' && value > accountExist.total){
      throw new AppError('Balance unavailable')
    }

    const transaction = await this.transactionRepository.createTransaction({account_id, value, type, description})

    return {
      ...transaction,
      value: transaction.value / 100
    }
  }
}
