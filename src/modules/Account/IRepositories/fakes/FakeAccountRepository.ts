import { Accounts } from ".prisma/client";
import {uuid} from 'uuidv4'
import { ICreateAccountDTO } from "@modules/Account/dtos/ICreateAccountDTO";
import { IAccountRepository } from "../IAccountRepository";

export class FakeAccountRepository implements IAccountRepository{
  private accounts: Accounts[] = []
  async createAccount(data: ICreateAccountDTO): Promise<Accounts>{

    const account: Accounts  = {
      ...data,
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
      total: 0
    }

    this.accounts.push(account)

    return account
  }

  async findAccountById(account_id: string): Promise<Accounts | null>{
    const account = this.accounts.find(account => account.id === account_id)

    if(!account) return null

    return account
  }

  async findAccountByUsername(username: string): Promise<Accounts | null>{
    const account = this.accounts.find(account => account.username === username)

    if(!account) return null

    return account
  }
}
