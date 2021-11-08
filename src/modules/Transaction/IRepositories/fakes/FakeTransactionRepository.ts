import { Transactions } from ".prisma/client";
import { ICreateTransactionDTO } from "@modules/Transaction/Dtos/ICreateTransactionDTO";

import { uuid } from "uuidv4";
import { ITransactionRepository } from "../ITransactionRepository";


export class FakeTransactionRepository implements ITransactionRepository{
  private transactions: Transactions[] = []

  async createTransaction(data:ICreateTransactionDTO):Promise<Transactions>{
    const newTransaction: Transactions = {
      ...data,
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date()
    }

    this.transactions.push(newTransaction)

    return newTransaction
  }
  async findAll(account_id: string): Promise<Transactions[]>{
    const transactions = this.transactions.filter(transaction => transaction.account_id === account_id)

    return transactions
  }
}
