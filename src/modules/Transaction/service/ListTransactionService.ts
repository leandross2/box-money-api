import { Transactions } from '.prisma/client';
import { IAccountRepository } from '@modules/Account/IRepositories/IAccountRepository';
import AppError from '@modules/Shared/errors/AppErro';
import {inject, injectable} from 'tsyringe'
import { ITransactionRepository } from '../IRepositories/ITransactionRepository';


interface IResponseDTO{
  transactions: Transactions[]
  totals:{
    total: number
    credits: number
    debits: number
  }
}

@injectable()
export class ListTransactionService{
  constructor(
    @inject('TransactionRepository') private transactionRepository: ITransactionRepository,
    @inject('AccountRepository') private accountRepository: IAccountRepository,
  ){}

  async execute(account_id: string): Promise<IResponseDTO>{

    const accountExist = await this.accountRepository.findAccountById(account_id)

    if(!accountExist){
      throw new AppError('Account not found')
    }

    const transactions = await this.transactionRepository.findAll(account_id)

    const total = transactions.reduce((acc, transaction)=>{
       return transaction.type === 'credit' ? acc + transaction.value  : acc - transaction.value
    }, 0)

    const credits = transactions.reduce((acc, transaction)=>{
       return transaction.type === 'credit' ? acc + transaction.value : acc + 0
    }, 0)

    const debits = transactions.reduce((acc, transaction)=>{
       return transaction.type === 'debit' ? acc + transaction.value : acc + 0
    }, 0)

    const transactionsFormated = transactions.map(transaction => ({
      ...transaction,
      value: transaction.value/100
    }))

    return {
      transactions:transactionsFormated,
      totals:{
        total: total/100,
        credits: credits / 100,
        debits: debits / 100
      }
    }
  }
}
