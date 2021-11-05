import {PrismaClient, Transactions } from '@prisma/client'
import { ICreateTransactionDTO } from "@modules/Transaction/Dtos/ICreateTransactionDTO";
import { ITransactionRepository } from "@modules/Transaction/IRepositories/ITransactionRepository";
import { updateTotalOnAccountPersistMiddleware } from '@modules/Shared/infra/prisma/middlewares/updateTotalOnAccountPersistMiddleware';

export class TransactionRepository implements ITransactionRepository{
  private ormRepository :PrismaClient

  constructor(){
    this.ormRepository = new PrismaClient()

    updateTotalOnAccountPersistMiddleware({
      prisma: this.ormRepository,
      action: 'create',
      when: 'after'
    })
  }

  async createTransaction({value, type, account_id}: ICreateTransactionDTO): Promise<Transactions>{
    const transactionCredit = await this.ormRepository.transactions.create({
      data:{
        value,
        type,
        account_id
      }
    })

    return transactionCredit
  }

  async findAll(account_id: string): Promise<Transactions[]>{
    const balance = await this.ormRepository.transactions.findMany({
      where:{ account_id },
      orderBy:{
        created_at: 'asc'
      }
    })

    return balance
  }
}
