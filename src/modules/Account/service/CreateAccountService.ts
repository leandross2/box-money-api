import {inject, injectable} from 'tsyringe'
import { Accounts } from ".prisma/client";
import { IAccountRepository } from '../IRepositories/IAccountRepository';
import AppError from '@modules/Shared/errors/AppErro';

interface IRequestDTO{
  name: string
  username: string
}
@injectable()
export class CreateAccountService{
  constructor(
    @inject('AccountRepository') private AccountRepository: IAccountRepository
  ){}

  async execute({name, username}: IRequestDTO): Promise<Accounts>{

    const usernameExist = await this.AccountRepository.findAccountByUsername(username)

    if(usernameExist){
      throw new AppError('username already exists')
    }

    const account = await this.AccountRepository.createAccount({name, username})
    return account
  }
}
