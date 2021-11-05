import {Accounts} from '@prisma/client'
import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';

export interface IAccountRepository{
  createAccount(data: ICreateAccountDTO): Promise<Accounts>
  findAccountById(account_id: string): Promise<Accounts | null>
  findAccountByUsername(username: string): Promise<Accounts | null>
}
