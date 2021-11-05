import {PrismaClient, Accounts } from '@prisma/client'
import { IAccountRepository } from '@modules/Account/IRepositories/IAccountRepository';
import { ICreateAccountDTO } from '@modules/Account/dtos/ICreateAccountDTO';

export class AccountRepository implements IAccountRepository{
  private ormRepository :PrismaClient

  constructor(){
    this.ormRepository = new PrismaClient()
  }

  async createAccount({name, username}: ICreateAccountDTO):Promise<Accounts>{
    console.log({name, username})
    const account = this.ormRepository.accounts.create({
      data:{
        name,
        username
      }
    })

    return account
  }
  async findAccountById(account_id: string):Promise<Accounts | null>{
    const account = await this.ormRepository.accounts.findFirst({
      where: {
        id: account_id
      }
    })

    return account
  }

  async findAccountByUsername(username: string):Promise<Accounts | null>{
    const account = await this.ormRepository.accounts.findFirst({
      where: {
        username: username
      }
    })

    return account
  }


}
